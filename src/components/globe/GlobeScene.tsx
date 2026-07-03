"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Line, Html } from "@react-three/drei";
import * as THREE from "three";
import {
  LOCATIONS,
  CONNECTIONS,
  GLOBE_RADIUS,
  latLngToVector3,
  makeArc,
  locationActive,
  arcVisible,
  type Region,
} from "./globeData";

type Hub = { id: string; h3: string; p: string; city: string };

const ACTIVE = "#f4ede0";
const DIM = "#54689e";

// Shared geometries and materials (one GPU object reused by every pin/pulse
// instead of ~35 separate instances) — "share across meshes" guideline.
const UNIT_SPHERE_GEO = new THREE.SphereGeometry(1, 16, 16);
const PULSE_GEO = new THREE.SphereGeometry(0.011, 8, 8);
const ACTIVE_MAT = new THREE.MeshBasicMaterial({ color: ACTIVE, toneMapped: false });
const DIM_MAT = new THREE.MeshBasicMaterial({ color: DIM, toneMapped: false });
const PULSE_MAT = new THREE.MeshBasicMaterial({ color: "#fff3dd", toneMapped: false });

/** The globe group's fixed tilt; the sun vector must live in the same space. */
const GROUP_EULER = new THREE.Euler(0.22, 0, 0.16);

/**
 * Sun direction from the real clock (UTC): subsolar point from solar
 * declination (day of year) + hour angle (sun sits over lng 0 at 12:00 UTC).
 */
function sunLocal(date: Date, out: THREE.Vector3) {
  const h =
    date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const doy = (date.getTime() - start) / 86400000;
  const decl = -23.44 * Math.cos(((2 * Math.PI) / 365) * (doy + 10));
  const lng = -15 * (h - 12);
  const p = latLngToVector3(decl, lng, 1);
  return out.copy(p).normalize();
}

const EARTH_VERT = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vPosW;
  void main() {
    vUv = uv;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vPosW = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const EARTH_FRAG = /* glsl */ `
  uniform sampler2D uDay;
  uniform sampler2D uNight;
  uniform sampler2D uWater;
  uniform vec3 uSun;
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vPosW;

  void main() {
    vec3 dayTex = texture2D(uDay, vUv).rgb;
    float water = texture2D(uWater, vUv).r; // verified: 1 = ocean, 0 = land
    float lum = dot(dayTex, vec3(0.299, 0.587, 0.114));

    // Day side: platinum landmasses, deep clean ocean.
    vec3 platinum = vec3(0.80, 0.82, 0.86) * (0.38 + lum * 1.55);
    platinum = min(platinum, vec3(1.0));
    vec3 ocean = mix(vec3(0.015, 0.07, 0.20), vec3(0.05, 0.17, 0.40), lum * 1.6);
    vec3 dayCol = mix(platinum, ocean, water);

    // Metallic specular sheen from the sun.
    vec3 viewDir = normalize(cameraPosition - vPosW);
    vec3 halfV = normalize(viewDir + uSun);
    float spec = pow(max(dot(vNormalW, halfV), 0.0), 48.0);
    dayCol += spec * mix(vec3(0.55, 0.56, 0.60), vec3(0.18, 0.30, 0.55), water);

    // Night side must NOT be pitch black: continent outlines and topography
    // stay clearly readable (land brighter than ocean, detailed by the day
    // texture's luminance), with a soft blue-grey ambient.
    vec3 nightLand = vec3(0.10, 0.11, 0.135) * (0.45 + lum * 1.25);
    vec3 nightOcean = vec3(0.014, 0.022, 0.048) * (0.55 + lum * 0.6);
    vec3 nightBase = mix(nightLand, nightOcean, water);

    // High-visibility city lights: amber/gold halos with white-hot cores.
    // smoothstep floor suppresses the texture's desert haze so only real
    // settlements glow (verified: cities ~0.3, haze ~0.2, ocean ~0.07).
    float nLum = dot(texture2D(uNight, vUv).rgb, vec3(0.333));
    float lights = pow(smoothstep(0.10, 0.45, nLum), 1.05);
    vec3 lightCol = mix(vec3(1.0, 0.66, 0.30), vec3(1.0, 0.96, 0.88),
      smoothstep(0.5, 0.9, lights));
    vec3 nightCol = nightBase + lightCol * lights * 3.2;

    // Real-time terminator.
    float sunDot = dot(vNormalW, uSun);
    float dayF = smoothstep(-0.08, 0.18, sunDot);
    vec3 lit = dayCol * (0.32 + 0.68 * max(sunDot, 0.0));
    vec3 col = mix(nightCol, lit, dayF);

    // Faint warm band along the terminator (dawn/dusk).
    float term = pow(1.0 - abs(sunDot), 8.0) * 0.5;
    col += vec3(0.95, 0.45, 0.18) * term * (1.0 - dayF);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Earth({
  earthRef,
  sun,
  onHoverIn,
  onHoverOut,
}: {
  earthRef: React.RefObject<THREE.Mesh | null>;
  sun: THREE.Vector3;
  onHoverIn: () => void;
  onHoverOut: () => void;
}) {
  const [day, night, water] = useLoader(THREE.TextureLoader, [
    "/textures/earth-blue-marble.jpg",
    "/textures/earth-night.jpg",
    "/textures/earth-water.png",
  ]);

  useMemo(() => {
    day.colorSpace = THREE.SRGBColorSpace;
    night.colorSpace = THREE.SRGBColorSpace;
    [day, night, water].forEach((t) => {
      t.anisotropy = 4;
      t.needsUpdate = true;
    });
  }, [day, night, water]);

  // uSun holds the shared, live-updated vector instance (mutated per frame).
  const uniforms = useMemo(
    () => ({
      uDay: { value: day },
      uNight: { value: night },
      uWater: { value: water },
      uSun: { value: sun },
    }),
    [day, night, water, sun]
  );

  return (
    <mesh
      ref={earthRef}
      onPointerOver={(e) => {
        if (e.pointerType === "mouse") onHoverIn();
      }}
      onPointerOut={(e) => {
        if (e.pointerType === "mouse") onHoverOut();
      }}
    >
      <sphereGeometry args={[GLOBE_RADIUS, 96, 96]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={EARTH_VERT}
        fragmentShader={EARTH_FRAG}
      />
    </mesh>
  );
}

/**
 * Additive backside fresnel shell — layered aura without postprocessing.
 * When `sun` is provided, the glow concentrates along the terminator
 * (atmospheric refraction hugging the day/night boundary).
 */
function Aura({
  scale,
  color,
  power,
  intensity,
  sun,
  termBoost = 0,
}: {
  scale: number;
  color: string;
  power: number;
  intensity: number;
  sun?: THREE.Vector3;
  termBoost?: number;
}) {
  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(color) },
      uPower: { value: power },
      uIntensity: { value: intensity },
      uSun: { value: sun ?? new THREE.Vector3(1, 0, 0) },
      uUseSun: { value: sun ? 1 : 0 },
      uBoost: { value: termBoost },
    }),
    [color, power, intensity, sun, termBoost]
  );
  return (
    <mesh scale={scale}>
      <sphereGeometry args={[GLOBE_RADIUS, 48, 48]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={`
          varying vec3 vNormalW;
          varying vec3 vPosW;
          void main() {
            vNormalW = normalize(mat3(modelMatrix) * normal);
            vec4 wp = modelMatrix * vec4(position, 1.0);
            vPosW = wp.xyz;
            gl_Position = projectionMatrix * viewMatrix * wp;
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          uniform float uPower;
          uniform float uIntensity;
          uniform vec3 uSun;
          uniform float uUseSun;
          uniform float uBoost;
          varying vec3 vNormalW;
          varying vec3 vPosW;
          void main() {
            vec3 n = normalize(vNormalW);
            vec3 viewDir = normalize(cameraPosition - vPosW);
            float fresnel = pow(1.0 - abs(dot(n, viewDir)), uPower);
            float w = 1.0;
            if (uUseSun > 0.5) {
              float t = 1.0 - abs(dot(n, normalize(uSun)));
              w = 0.22 + uBoost * pow(t, 3.0);
            }
            gl_FragColor = vec4(uColor, fresnel * uIntensity * w);
          }
        `}
      />
    </mesh>
  );
}

/**
 * Non-interactive marker: a glowing dot plus a persistent floating label.
 * No tooltips by design; the left-side text panel carries all context.
 * Labels anchor exactly at the pin (same visibility as the pin) and are
 * offset in screen space, alternating above/below to de-clutter Europe.
 */
function Pin({
  position,
  active,
  text,
  hub,
  flip,
  earthRef,
}: {
  position: THREE.Vector3;
  active: boolean;
  text: string;
  hub?: Hub;
  flip: boolean;
  earthRef: React.RefObject<THREE.Mesh | null>;
}) {
  return (
    <group position={position}>
      <mesh
        geometry={UNIT_SPHERE_GEO}
        material={active ? ACTIVE_MAT : DIM_MAT}
        scale={hub ? 0.02 : 0.014}
      />
      <Html
        center
        zIndexRange={[40, 0]}
        occlude={[earthRef as React.RefObject<THREE.Object3D>]}
        pointerEvents="none"
      >
        <div
          className={`globe-city ${active ? "" : "globe-city--dim"}`}
          style={{ transform: `translateY(${flip ? "-22px" : "16px"})` }}
        >
          {text}
        </div>
      </Html>
    </group>
  );
}

/** Glowing great-circle data stream: soft wide halo + bright core + pulse. */
function Arc({
  arc,
  offset,
  reduced,
}: {
  arc: ReturnType<typeof makeArc>;
  offset: number;
  reduced: boolean;
}) {
  const pulse = useRef<THREE.Mesh>(null);
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (!pulse.current) return;
    // prefers-reduced-motion: no traveling pulses.
    if (reduced) {
      pulse.current.visible = false;
      return;
    }
    const t = (state.clock.elapsedTime * 0.13 + offset) % 1;
    pulse.current.position.copy(arc.pointAt(t, tmp));
    pulse.current.visible = true;
  });

  return (
    <group>
      {/* Soft glow underlay. depthWrite is off on both lines: they share the
          exact same points, and writing depth made the two passes z-fight,
          which rendered as an ugly dashed/stippled artifact. */}
      <Line
        points={arc.points}
        color="#f0c987"
        lineWidth={4.5}
        transparent
        opacity={0.16}
        toneMapped={false}
        depthWrite={false}
        renderOrder={1}
      />
      {/* bright core */}
      <Line
        points={arc.points}
        color="#ffd9a0"
        lineWidth={1.4}
        transparent
        opacity={0.95}
        toneMapped={false}
        depthWrite={false}
        renderOrder={2}
      />
      <mesh ref={pulse} geometry={PULSE_GEO} material={PULSE_MAT} />
    </group>
  );
}

/** Subtle deep-space starfield surrounding the scene. */
function Stars() {
  const tex = useLoader(THREE.TextureLoader, "/textures/stars.jpg");
  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
  }, [tex]);
  return (
    <mesh scale={9}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial
        map={tex}
        side={THREE.BackSide}
        transparent
        opacity={0.5}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

function GlobeGroup({
  region,
  labels,
  hubs,
  reduced,
  onPauseChange,
}: {
  region: Region;
  labels: string[];
  hubs: Hub[];
  reduced: boolean;
  onPauseChange: (paused: boolean) => void;
}) {
  const earthRef = useRef<THREE.Mesh>(null);
  // Resting the cursor on the globe gently pauses the rotation.
  const [globeHover, setGlobeHover] = useState(false);

  // One live sun vector shared by the earth shader and the terminator aura.
  const sunVec = useMemo(() => new THREE.Vector3(1, 0, 0), []);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    sunLocal(new Date(), tmp).applyEuler(GROUP_EULER);
    sunVec.copy(tmp);
  });

  useEffect(() => {
    onPauseChange(globeHover);
  }, [globeHover, onPauseChange]);

  const hubById = useMemo(
    () => new Map(hubs.map((h) => [h.id, h])),
    [hubs]
  );

  const pins = useMemo(
    () =>
      LOCATIONS.map((l, i) => ({
        id: l.id,
        label: labels[i] ?? l.id.toUpperCase(),
        pos: latLngToVector3(l.lat, l.lng, GLOBE_RADIUS * 1.012),
      })),
    [labels]
  );

  const arcs = useMemo(() => {
    const posById = new Map(
      LOCATIONS.map((l) => [l.id, latLngToVector3(l.lat, l.lng, GLOBE_RADIUS * 1.012)])
    );
    return CONNECTIONS.map(([a, b], i) => ({
      a,
      b,
      arc: makeArc(posById.get(a)!, posById.get(b)!),
      offset: i * 0.31,
    }));
  }, []);

  return (
    <group rotation={GROUP_EULER}>
      <Earth
        earthRef={earthRef}
        sun={sunVec}
        onHoverIn={() => setGlobeHover(true)}
        onHoverOut={() => setGlobeHover(false)}
      />

      {/* Layered aura: orange refraction hugging the terminator + blue outer */}
      <Aura
        scale={1.055}
        color="#e06a35"
        power={4.5}
        intensity={1.1}
        sun={sunVec}
        termBoost={1.0}
      />
      <Aura scale={1.17} color="#3554e8" power={3.2} intensity={0.5} />

      {/* Arcs are strictly tab-driven: only the active region's routes render
          (Global renders all). Switching tabs mounts/unmounts them. */}
      {arcs
        .filter((a) => arcVisible(region, a.b))
        .map((a) => (
          <Arc key={a.b} arc={a.arc} offset={a.offset} reduced={reduced} />
        ))}

      {pins.map((p, i) => (
        <Pin
          key={p.id}
          position={p.pos}
          text={hubById.get(p.id)?.city ?? p.label}
          hub={hubById.get(p.id)}
          flip={i % 2 === 1}
          earthRef={earthRef}
          active={locationActive(region, p.id)}
        />
      ))}
    </group>
  );
}

/** Eases the auto-rotation speed toward its target instead of hard-stopping,
 * so pause/resume feels damped and premium ("lerp for smooth" guideline). */
function RotationEase({
  ctrl,
  paused,
  reduced,
}: {
  ctrl: React.RefObject<React.ElementRef<typeof OrbitControls> | null>;
  paused: boolean;
  reduced: boolean;
}) {
  useFrame((_, delta) => {
    const c = ctrl.current;
    if (!c) return;
    const target = paused || reduced ? 0 : 0.4;
    c.autoRotateSpeed = THREE.MathUtils.damp(c.autoRotateSpeed, target, 3.5, delta);
  });
  return null;
}

export default function GlobeScene({
  activeRegion,
  labels,
  hubs,
  ariaLabel,
}: {
  activeRegion: Region;
  labels: string[];
  hubs: Hub[];
  ariaLabel: string;
}) {
  // Resting the cursor on the globe eases the auto-rotation to a stop.
  const [paused, setPaused] = useState(false);
  const controlsRef = useRef<React.ElementRef<typeof OrbitControls>>(null);

  // Accessibility: honor prefers-reduced-motion (no auto-spin, no pulses).
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.25, 3.15], fov: 42, near: 0.1, far: 20 }}
      gl={{ antialias: true, powerPreference: "high-performance", stencil: false }}
      role="img"
      aria-label={ariaLabel}
    >
      <color attach="background" args={["#06070b"]} />
      <Suspense fallback={null}>
        <Stars />
        <GlobeGroup
          region={activeRegion}
          labels={labels}
          hubs={hubs}
          reduced={reduced}
          onPauseChange={setPaused}
        />
      </Suspense>
      {/* Zoom and pan are locked so the page scroll is never hijacked. */}
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        autoRotate={!reduced}
        autoRotateSpeed={0.4}
        rotateSpeed={0.4}
        enableDamping
        dampingFactor={0.08}
        minPolarAngle={Math.PI * 0.28}
        maxPolarAngle={Math.PI * 0.72}
      />
      <RotationEase ctrl={controlsRef} paused={paused} reduced={reduced} />
    </Canvas>
  );
}
