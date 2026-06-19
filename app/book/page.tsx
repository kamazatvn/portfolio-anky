import type { Metadata } from "next";
import BookHero      from "../components/book/BookHero";
import ArtistsGrid   from "../components/book/ArtistsGrid";
import EventsTimeline from "../components/book/EventsTimeline";

export const metadata: Metadata = {
  title: "Book — Anky",
  description:
    "Book Anky for DJ sets and music production. Hip-hop DJ in Prague and music producer working with artists across Vietnam and the Czech Republic.",
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
