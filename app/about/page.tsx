import type { Metadata } from "next";
import AboutHero from "../components/about/AboutHero";

export const metadata: Metadata = {
  title: "About",
  description:
    "Background, sound philosophy, and career highlights of Anky — music producer and DJ based in Prague, Czech Republic.",
  openGraph: {
    title: "About Anky | Music Producer & DJ",
    description:
      "Background, sound philosophy, and career highlights of Anky — music producer and DJ based in Prague, Czech Republic.",
    images: [{ url: "/anky1.jpg", width: 1200, height: 630, alt: "Anky — Music Producer & DJ" }],
  },
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
    </main>
  );
}
