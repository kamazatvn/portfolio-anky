import type { Metadata } from "next";
import PortfolioHero from "../components/projects/PortfolioHero";
import VideoCatalog   from "../components/projects/VideoCatalog";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Full catalogue of Anky's productions, co-productions, original tracks, and remixes — multi-genre music producer and DJ based in Prague.",
  openGraph: {
    title: "Portfolio | Anky — Music Producer & DJ",
    description:
      "Full catalogue of Anky's productions, co-productions, original tracks, and remixes — multi-genre music producer and DJ.",
    images: [{ url: "/anky1.jpg", width: 1200, height: 630, alt: "Anky — Music Producer & DJ" }],
  },
};

export default function PortfolioPage() {
  return (
    <main>
      <PortfolioHero />
      <VideoCatalog />
    </main>
  );
}
