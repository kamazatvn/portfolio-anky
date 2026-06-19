import type { Metadata } from "next";
import BookingForm   from "../components/contact/BookingForm";
import ContactDetails from "../components/contact/ContactDetails";

export const metadata: Metadata = {
  title: "Contact — Anky",
  description:
    "Studio location, booking enquiries, and contact details for Anky. Based in Praha, Czech Republic.",
};

export default function ContactPage() {
  return (
    <main>
      <BookingForm />
      <ContactDetails />
    </main>
  );
}
