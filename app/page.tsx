import HeroIntro   from "./components/HeroIntro";
import ArtistsGrid  from "./components/book/ArtistsGrid";
import BookingForm  from "./components/contact/BookingForm";
import StackSection from "./components/StackSection";

export default function HomePage() {
  return (
    <main>
      <HeroIntro />
      <StackSection>
        <ArtistsGrid />
        <BookingForm />
      </StackSection>
    </main>
  );
}
