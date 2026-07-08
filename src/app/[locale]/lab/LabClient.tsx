"use client";

import { useEffect, useState } from "react";
import CoudersHero from "@/components/couders/CoudersHero";
import CapabilitiesBento from "@/components/couders/CapabilitiesBento";

export default function LabClient() {
  const [debugProgress, setDebugProgress] = useState<number | undefined>();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("p");
    if (p !== null && !Number.isNaN(Number(p))) {
      setDebugProgress(Math.min(1, Math.max(0, Number(p))));
    }
    setReady(true);
  }, []);

  // Wait one tick so a ?p= freeze applies from the first paint.
  if (!ready) return <div className="relative z-10 min-h-screen bg-black" />;

  return (
    <div className="relative z-10 bg-black">
      <CoudersHero debugProgress={debugProgress} />
      <CapabilitiesBento />
    </div>
  );
}
