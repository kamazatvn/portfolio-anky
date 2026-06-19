import type { Metadata } from "next";
import BookingForm   from "../components/contact/BookingForm";
import ContactDetails from "../components/contact/ContactDetails";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Booking enquiries and contact details for Anky — music producer and DJ based in Prague, Czech Republic. Available for studio sessions, live sets, and collaborations.",
  openGraph: {
    title: "Contact Anky | Book a Session or DJ Set",
    description:
      "Booking enquiries and contact details for Anky — music producer and DJ. Available for studio sessions, live sets, and collaborations.",
    images: [{ url: "/anky1.jpg", width: 1200, height: 630, alt: "Anky — Music Producer & DJ" }],
  },
};

export default function ContactPage() {
  return (
    <main>
      <BookingForm />
      <ContactDetails />
    </main>
  );
}
