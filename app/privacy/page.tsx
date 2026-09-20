import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How People Pulse Media collects, uses, and protects personal information when you visit our website or contact our team.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="This policy explains what information we collect, why we collect it, and how you can contact us about your data."
      updated="18 September 2026"
      sections={[
        {
          heading: "Who we are",
          paragraphs: [
            `People Pulse Media LLC (“People Pulse Media”, “we”, “us”) is registered at ${contact.address}. This policy applies to peoplepulsemedia.com and related pages, forms, and communications.`,
          ],
        },
        {
          heading: "Information we collect",
          paragraphs: [
            "We collect information you choose to send us and limited technical data needed to operate the website.",
          ],
          bullets: [
            "Contact details such as your name, email address, phone or WhatsApp number, company, and preferred meeting time.",
            "Project information you include in a message, enquiry, or newsletter subscription.",
            "Technical data such as IP address, browser type, device, and pages visited, collected through cookies or similar tools where used.",
          ],
        },
        {
          heading: "How we use information",
          paragraphs: [
            "We use personal information to respond to enquiries, book meetings, send requested newsletters, improve the site, and meet legal or contractual obligations. We do not sell your personal information.",
          ],
        },
        {
          heading: "Sharing",
          paragraphs: [
            "We may share information with service providers who help us operate email, hosting, analytics, or communications, and only as needed to provide those services. We may also disclose information if required by law.",
          ],
        },
        {
          heading: "Retention and security",
          paragraphs: [
            "We keep personal information only as long as needed for the purposes above, then delete or anonymise it unless a longer period is required by law. We use reasonable technical and organisational measures to protect data, but no online transmission is completely secure.",
          ],
        },
        {
          heading: "Your choices",
          paragraphs: [
            "You may ask us to access, correct, or delete personal information we hold about you, or to stop sending marketing emails. Newsletter emails include an unsubscribe option.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            `For privacy questions, email ${contact.email} or write to People Pulse Media LLC, ${contact.address}.`,
          ],
        },
      ]}
    />
  );
}
