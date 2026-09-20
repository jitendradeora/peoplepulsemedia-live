import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms that govern use of the People Pulse Media website and related enquiries, meetings, and service discussions.",
  alternates: { canonical: "/terms" },
};

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of Service"
      description="These terms govern your use of our website and any enquiry you send through it. Project work is covered by a separate agreement."
      updated="18 September 2026"
      sections={[
        {
          heading: "Agreement",
          paragraphs: [
            `These terms apply to your use of peoplepulsemedia.com, operated by People Pulse Media LLC, ${contact.address}. By using the site you agree to these terms. If you do not agree, please do not use the site.`,
          ],
        },
        {
          heading: "Our services",
          paragraphs: [
            "The website describes safety video production, the PULSYON onboarding platform, and related content services. Information on the site is for general information and does not form a binding offer. A project starts only when both parties sign a separate statement of work, proposal, or contract.",
          ],
        },
        {
          heading: "Enquiries and meetings",
          paragraphs: [
            "Contact forms, preferred meeting times, and demo requests are invitations to talk. Submitting a form does not create a contract or guarantee availability at the time you suggest. We will confirm any meeting separately.",
          ],
        },
        {
          heading: "Acceptable use",
          paragraphs: [
            "You agree not to misuse the site, attempt unauthorised access, submit unlawful or harmful content, or use our materials, trademarks, or videos without permission.",
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            "Site content, branding, and software descriptions belong to People Pulse Media or our licensors. Client work remains subject to the licence or ownership terms in that project’s contract.",
          ],
        },
        {
          heading: "Disclaimer",
          paragraphs: [
            "The site is provided “as is”. We do not warrant that it will be uninterrupted or error-free. To the extent permitted by UAE law, People Pulse Media is not liable for indirect or consequential loss arising from use of the website. This does not limit liability that cannot be excluded by law.",
          ],
        },
        {
          heading: "Changes",
          paragraphs: [
            "We may update these terms from time to time. The date at the top of this page shows the latest version. Continued use of the site after a change means you accept the updated terms.",
          ],
        },
        {
          heading: "Governing law",
          paragraphs: [
            `These terms are governed by the laws of the United Arab Emirates. Courts of Sharjah have jurisdiction, without limiting any non-waivable rights you may have. Questions: ${contact.email}.`,
          ],
        },
      ]}
    />
  );
}
