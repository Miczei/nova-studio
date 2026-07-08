import type { Metadata } from "next";
import LabClient from "./LabClient";

/**
 * Design lab: private preview of the Couders pivot (fluid-morph hero + bento
 * capabilities). Not linked from navigation, excluded from the sitemap, and
 * marked noindex. Append ?p=0..1 to freeze the morph at a fixed progress.
 */
export const metadata: Metadata = {
  title: "Couders Lab",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <LabClient />;
}
