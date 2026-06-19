import type { Metadata } from "next";
import PortfolioHero from "../components/projects/PortfolioHero";
import VideoCatalog   from "../components/projects/VideoCatalog";

export const metadata: Metadata = {
  title: "Portfolio — Anky",
  description:
    "Full catalogue of Anky's productions, co-productions, original tracks, and remixes. Multi-genre music producer and DJ based in Prague.",
};

export default function PortfolioPage() {
  return (
    <main>
      <PortfolioHero />
      <VideoCatalog />
    </main>
  );
}
