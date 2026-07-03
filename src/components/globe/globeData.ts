import * as THREE from "three";

export type Region = "dach" | "na" | "apac" | "global";
export type LocationRegion = Exclude<Region, "global">;

export type GlobeLocation = {
  id: string;
  lat: number;
  lng: number;
  region: LocationRegion;
  hub?: boolean;
};

export const GLOBE_RADIUS = 1;

/** Featured client locations. `pl` is the home base (hub) and is always active. */
export const LOCATIONS: GlobeLocation[] = [
  { id: "pl", lat: 52.23, lng: 21.01, region: "dach", hub: true }, // Warsaw
  { id: "de", lat: 52.52, lng: 13.405, region: "dach" }, // Berlin
  { id: "at", lat: 48.21, lng: 16.37, region: "dach" }, // Vienna
  { id: "ch", lat: 47.37, lng: 8.54, region: "dach" }, // Zurich
  { id: "us", lat: 40.71, lng: -74.0, region: "na" }, // New York
  { id: "ca", lat: 43.65, lng: -79.38, region: "na" }, // Toronto
  { id: "gb", lat: 51.51, lng: -0.13, region: "dach" }, // London (European hub)
  // Key hubs: always active regardless of the selected region tab.
  { id: "jp", lat: 35.6762, lng: 139.6503, region: "apac", hub: true }, // Tokyo
  { id: "au", lat: -33.8688, lng: 151.2093, region: "apac", hub: true }, // Sydney
];

/** Hub-and-spoke: every destination connects back to the Warsaw HQ.
 * Which arcs actually render is driven by the active region tab (arcVisible). */
export const CONNECTIONS: [string, string][] = [
  ["pl", "de"], // Warsaw -> Berlin (DACH)
  ["pl", "at"], // Warsaw -> Vienna (DACH)
  ["pl", "ch"], // Warsaw -> Zurich (DACH)
  ["pl", "us"], // Warsaw -> New York (North America)
  ["pl", "ca"], // Warsaw -> Toronto (North America)
  ["pl", "jp"], // Warsaw -> Tokyo (Asia-Pacific)
  ["pl", "au"], // Warsaw -> Sydney (Asia-Pacific)
];

const REGION_OF: Record<string, LocationRegion> = Object.fromEntries(
  LOCATIONS.map((l) => [l.id, l.region])
);
const HUB_OF: Record<string, boolean> = Object.fromEntries(
  LOCATIONS.map((l) => [l.id, !!l.hub])
);

/** Convert lat/lng (degrees) to a point on a sphere of the given radius. */
export function latLngToVector3(
  lat: number,
  lng: number,
  radius = GLOBE_RADIUS
): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/**
 * Great-circle arc with an altitude profile.
 *
 * The path is a spherical slerp between the two surface directions, with the
 * radius peaking mid-route — so unlike a single-control-point bezier (whose
 * chord cuts through the planet on long hauls like Warsaw–Sydney), this arc
 * mathematically cannot dip below the surface at any distance.
 */
export function makeArc(a: THREE.Vector3, b: THREE.Vector3, segments = 80) {
  const pa = a.clone().normalize();
  const pb = b.clone().normalize();
  const angle = pa.angleTo(pb);
  const sinA = Math.max(Math.sin(angle), 1e-6);
  const base = GLOBE_RADIUS * 1.012;
  // Longer routes fly higher, like real flight paths.
  const peak = 0.1 + 0.28 * (angle / Math.PI);

  const pointAt = (t: number, out = new THREE.Vector3()): THREE.Vector3 => {
    const w1 = Math.sin((1 - t) * angle) / sinA;
    const w2 = Math.sin(t * angle) / sinA;
    out.copy(pa).multiplyScalar(w1).addScaledVector(pb, w2).normalize();
    return out.multiplyScalar(base + Math.sin(Math.PI * t) * peak);
  };

  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) points.push(pointAt(i / segments));

  return { pointAt, points };
}

export function locationActive(region: Region, id: string): boolean {
  if (region === "global") return true;
  if (HUB_OF[id]) return true;
  return REGION_OF[id] === region;
}

/** Arc visibility is driven strictly by the active region tab: an arc renders
 * only when its destination belongs to that region (Global shows all). */
export function arcVisible(region: Region, destination: string): boolean {
  if (region === "global") return true;
  return REGION_OF[destination] === region;
}
