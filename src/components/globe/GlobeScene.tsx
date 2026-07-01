"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Line, Html } from "@react-three/drei";
import * as THREE from "three";
import {
  LOCATIONS,
  CONNECTIONS,
  GLOBE_RADIUS,
  latLngToVector3,
  buildArc,
  locationActive,
  arcActive,
  type Region,
} from "./globeData";

const ACTIVE = "#eaf1ff";
const DIM = "#54689e";
const ACCENT = "#4a63e0";
const OCEAN = "#070910";
// Land in earth-dark.jpg is ~0 (black); ocean is ~13-16 (grey). Threshold cleanly separates.
const LAND_THRESHOLD = 10;

/** Soft round sprite used for continent dots and the small pin glow. */
function makeGlowTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(210,224,255,0.55)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/** Sample the dark earth map → dot positions on land (continents). */
function useLandDots() {
  const [positions, setPositions] = useState<Float32Array | null>(null);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const W = 520;
      const H = 260;
      const canvas = document.createElement("canvas");
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, W, H);
      const data = ctx.getImageData(0, 0, W, H).data;

      const pts: number[] = [];
      const latStep = 1.3;
      for (let lat = -84; lat <= 84; lat += latStep) {
        const cos = Math.cos((lat * Math.PI) / 180);
        const lngStep = Math.max(1.3, 1.3 / Math.max(0.06, cos));
        for (let lng = -180; lng < 180; lng += lngStep) {
          const u = (lng + 180) / 360;
          const v = (90 - lat) / 180;
          const x = Math.min(W - 1, (u * W) | 0);
          const y = Math.min(H - 1, (v * H) | 0);
          const idx = (y * W + x) * 4;
          const b = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
          if (b < LAND_THRESHOLD) {
            const jLat = lat + (Math.random() - 0.5) * latStep * 0.55;
            const jLng = lng + (Math.random() - 0.5) * lngStep * 0.55;
            const p = latLngToVector3(jLat, jLng, GLOBE_RADIUS);
            pts.push(p.x, p.y, p.z);
          }
        }
      }
      if (!cancelled) setPositions(new Float32Array(pts));
    };
    img.src = "/textures/earth-dark.jpg";
    return () => {
      cancelled = true;
    };
  }, []);

  return positions;
}

function Continents({ texture }: { texture: THREE.Texture }) {
  const positions = useLandDots();
  if (!positions) return null;
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        size={0.02}
        sizeAttenuation
        transparent
        depthWrite={false}
        opacity={0.85}
        color={"#b9c6f7"}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Static backside fresnel shell → thin atmospheric rim (no animation). */
function Atmosphere() {
  const uniforms = useMemo(() => ({ uColor: { value: new THREE.Color(ACCENT) } }), []);
  return (
    <mesh scale={1.12}>
      <sphereGeometry args={[GLOBE_RADIUS, 48, 48]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={`
          varying vec3 vNormal;
          varying vec3 vView;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vView = mv.xyz;
            gl_Position = projectionMatrix * mv;
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          varying vec3 vNormal;
          varying vec3 vView;
          void main() {
            vec3 viewDir = normalize(-vView);
            float fresnel = pow(1.0 - abs(dot(vNormal, viewDir)), 4.0);
            gl_FragColor = vec4(uColor, fresnel * 0.55);
          }
        `}
      />
    </mesh>
  );
}

/** Static pin (no pulsing). Tooltip shows only on hover. */
function Pin({
  position,
  active,
  label,
  hovered,
  onOver,
  onOut,
  texture,
  earthRef,
}: {
  position: THREE.Vector3;
  active: boolean;
  label: string;
  hovered: boolean;
  onOver: () => void;
  onOut: () => void;
  texture: THREE.Texture;
  earthRef: React.RefObject<THREE.Mesh | null>;
}) {
  const color = active ? ACTIVE : DIM;
  return (
    <group position={position}>
      {/* solid dot */}
      <mesh>
        <sphereGeometry args={[0.015, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      {/* subtle static glow (no bloom, no animation) */}
      <sprite scale={active ? 0.07 : 0.04}>
        <spriteMaterial
          map={texture}
          color={color}
          transparent
          depthWrite={false}
          opacity={active ? 0.85 : 0.4}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </sprite>
      {/* invisible larger hit area for easy hovering */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          onOver();
        }}
        onPointerOut={() => onOut()}
      >
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {/* simple hover tooltip — centered, high z-index, occluded behind the globe */}
      {hovered && (
        <Html
          position={[0, 0.05, 0]}
          center
          zIndexRange={[100, 0]}
          occlude={[earthRef as React.RefObject<THREE.Object3D>]}
          pointerEvents="none"
        >
          <div className="globe-label">{label}</div>
        </Html>
      )}
    </group>
  );
}

function GlobeGroup({
  region,
  labels,
  texture,
}: {
  region: Region;
  labels: string[];
  texture: THREE.Texture;
}) {
  const earthRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [hovered]);

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
    return CONNECTIONS.map(([a, b]) => ({
      a,
      b,
      points: buildArc(posById.get(a)!, posById.get(b)!).getPoints(64),
    }));
  }, []);

  return (
    <group rotation={[0.22, 0, 0.16]}>
      {/* Opaque occluder — clearly smaller than the r=1.0 dot layer → no z-fighting */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[GLOBE_RADIUS * 0.985, 64, 64]} />
        <meshBasicMaterial color={OCEAN} />
      </mesh>

      <Continents texture={texture} />
      <Atmosphere />

      {arcs.map((arc, i) => (
        <Line
          key={i}
          points={arc.points}
          color={arcActive(region, arc.a, arc.b) ? "#8ba0ff" : "#28325a"}
          lineWidth={arcActive(region, arc.a, arc.b) ? 1.2 : 0.6}
          transparent
          opacity={arcActive(region, arc.a, arc.b) ? 0.7 : 0.22}
          toneMapped={false}
        />
      ))}

      {pins.map((p) => (
        <Pin
          key={p.id}
          position={p.pos}
          label={p.label}
          texture={texture}
          earthRef={earthRef}
          active={locationActive(region, p.id)}
          hovered={hovered === p.id}
          onOver={() => setHovered(p.id)}
          onOut={() => setHovered((h) => (h === p.id ? null : h))}
        />
      ))}
    </group>
  );
}

export default function GlobeScene({
  activeRegion,
  labels,
}: {
  activeRegion: Region;
  labels: string[];
}) {
  const texture = useMemo(() => makeGlowTexture(), []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.25, 3.15], fov: 42, near: 0.1, far: 20 }}
      gl={{ antialias: true, powerPreference: "high-performance", stencil: false }}
    >
      <color attach="background" args={["#06070b"]} />
      <GlobeGroup region={activeRegion} labels={labels} texture={texture} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.45}
        rotateSpeed={0.4}
        enableDamping
        dampingFactor={0.08}
        minPolarAngle={Math.PI * 0.28}
        maxPolarAngle={Math.PI * 0.72}
      />
    </Canvas>
  );
}
