/**
 * A single soft cinematic light blob: low-opacity radial gradient + heavy
 * blur, meant to sit behind section content on a pure-black background.
 * Shared across Hero/Bento/ROI sections to keep the "studio lighting" look
 * consistent instead of each section inventing its own gradient.
 */
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
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }}
    />
  );
}
