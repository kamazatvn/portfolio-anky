import type { Metadata } from "next";
import AboutHero from "../components/about/AboutHero";

export const metadata: Metadata = {
  title: "About — Anky",
  description:
    "Background, sound philosophy, and career highlights of Anky — music producer and DJ.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
    </main>
  );
}
