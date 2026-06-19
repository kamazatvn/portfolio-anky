import type { Metadata } from "next";
import BookHero      from "../components/book/BookHero";
import ArtistsGrid   from "../components/book/ArtistsGrid";
import EventsTimeline from "../components/book/EventsTimeline";

export const metadata: Metadata = {
  title: "Book",
  description:
    "Book Anky for DJ sets, live performances, or studio production sessions. Prague-based hip-hop DJ and music producer working with artists across Europe and Vietnam.",
  openGraph: {
    title: "Book Anky | DJ Sets & Music Production",
    description:
      "Book Anky for DJ sets, live performances, or studio production sessions. Available worldwide.",
    images: [{ url: "/anky1.jpg", width: 1200, height: 630, alt: "Anky — Music Producer & DJ" }],
  },
};

export default function BookPage() {
  return (
    <main>
      <BookHero />
      <ArtistsGrid />
      <EventsTimeline />
    </main>
  );
}
