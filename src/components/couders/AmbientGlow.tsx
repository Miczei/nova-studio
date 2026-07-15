/**
 * A single cinematic light blob: radial gradient + heavy blur, meant to sit
 * behind section content on a pure-black background. Shared across
 * Hero/Bento/ROI sections so the "studio lighting" dual-tone (warm terracotta
 * vs. cool cobalt) stays consistent instead of each section hand-tuning its
 * own gradient.
 */
export const GLOW_TERRACOTTA = "rgba(192,108,76,0.3)";
export const GLOW_COBALT = "rgba(37,99,235,0.26)";

export default function AmbientGlow({
  className,
  color,
}: {
  className: string;
  color: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-[120px] ${className}`}
      style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }}
    />
  );
}
