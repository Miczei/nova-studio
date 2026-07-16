import type { Locale } from "./config";

/**
 * Content for the dedicated Contact page: a 2-column split (copy + form
 * card), separate from the homepage's #contact CTA anchor. Bilingual,
 * enterprise/elite tone to match About/Engine/Security.
 */
export type ContactContent = {
  slug: string; // "contact"
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  breadcrumb: string;
  h1: string;
  lead: string;
  formH2: string;
  firstNameLabel: string;
  lastNameLabel: string;
  emailLabel: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
  sendingLabel: string;
  successMessage: string;
  errorMessage: string;
};

const en: ContactContent = {
  slug: "contact",
  metaTitle: "Contact Couders: Book an AI Implementation Consultation | Couders",
  metaDescription:
    "Get a price quote, discuss an autonomous agent integration, or request a platform demo. Message the Couders team and we will reply within one business day.",
  keywords: [
    "contact AI agency",
    "enterprise AI consultation",
    "book an AI demo",
    "AI implementation quote",
    "autonomous agent integration",
  ],
  breadcrumb: "Contact",
  h1: "Let’s connect",
  lead: "Looking for a price quote? A chatbot partner? A platform demo? Drop us a line, and we’ll get back to you in one business day.",
  formH2: "Schedule Your Free Consultation",
  firstNameLabel: "First Name*",
  lastNameLabel: "Last Name*",
  emailLabel: "Business Email*",
  messageLabel: "Message*",
  messagePlaceholder: "Tell us a few words about your project...",
  submitLabel: "Send Message ➔",
  sendingLabel: "Sending...",
  successMessage:
    "Thank you! Your message has been sent. We will get back to you within 24 hours.",
  errorMessage: "Something went wrong. Please try again, or email us directly.",
};

const pl: ContactContent = {
  slug: "contact",
  metaTitle: "Kontakt z Couders: Umów konsultację wdrożenia AI | Couders",
  metaDescription:
    "Potrzebujesz wyceny, integracji autonomicznego agenta lub demo naszej platformy? Napisz do zespołu Couders, odpowiadamy w ciągu jednego dnia roboczego.",
  keywords: [
    "kontakt agencja AI",
    "konsultacja wdrożenia AI",
    "umów demo AI",
    "wycena wdrożenia AI",
    "integracja autonomicznych agentów",
  ],
  breadcrumb: "Kontakt",
  h1: "Porozmawiajmy o Twoim wdrożeniu AI",
  lead: "Szukasz wyceny? Chcesz zintegrować autonomicznego agenta lub zobaczyć demo naszej platformy? Napisz do nas – analizujemy zapytania i odpowiadamy w ciągu jednego dnia roboczego.",
  formH2: "Zaplanuj darmową konsultację",
  firstNameLabel: "Imię*",
  lastNameLabel: "Nazwisko*",
  emailLabel: "E-mail służbowy*",
  messageLabel: "Wiadomość*",
  messagePlaceholder: "Napisz kilka słów o swoim projekcie lub problemie do rozwiązania...",
  submitLabel: "Wyślij wiadomość ➔",
  sendingLabel: "Wysyłanie...",
  successMessage:
    "Dziękujemy! Twoja wiadomość została wysłana. Skontaktujemy się w ciągu 24 godzin.",
  errorMessage: "Coś poszło nie tak. Spróbuj ponownie lub napisz do nas bezpośrednio.",
};

const CONTACT: Record<Locale, ContactContent> = { en, pl };

export const getContact = (locale: Locale): ContactContent => CONTACT[locale] ?? en;
