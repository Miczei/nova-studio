"use client";

import { useEffect, useState } from "react";
import CoudersHero from "@/components/couders/CoudersHero";
import ImpactTelemetry from "@/components/couders/ImpactTelemetry";
import { getCouders } from "@/i18n/couders";

export default function LabClient() {
  const [debugProgress, setDebugProgress] = useState<number | undefined>();
  const [ready, setReady] = useState(false);
  const couders = getCouders("en");

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("p");
    if (p !== null && !Number.isNaN(Number(p))) {
      setDebugProgress(Math.min(1, Math.max(0, Number(p))));
    }
    setReady(true);
  }, []);

  if (!ready) return <div className="relative z-10 min-h-screen bg-black" />;

  return (
    <div className="relative z-10 bg-black">
      <CoudersHero content={couders.hero} debugProgress={debugProgress} />
      <ImpactTelemetry content={couders.telemetry} />
    </div>
  );
}
