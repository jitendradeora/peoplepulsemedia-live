import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MessageSquare, MapPin, Calendar, MonitorPlay } from "lucide-react";
import { SocialIcon } from "@/components/ui/SocialIcons";
import { contact, socialLinks } from "@/lib/site";
import HeroBanner from "@/components/hero/HeroBanner";
import ContactForm from "@/components/forms/ContactForm";
import JsonLd from "@/components/seo/JsonLd";
import { webPageSchema, organizationSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with People Pulse Media. Book a meeting, request a PULSYON demo, or send us a message about your safety video or onboarding project.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us | People Pulse Media",
    description: "Book a meeting, request a demo, or send us a message about your project.",
    url: "/contact",
  },
};

const contactDetails = [
  {
    Icon: Mail,
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    Icon: Phone,
    label: "Phone",
    value: contact.phoneDisplay,
    href: `tel:${contact.phoneTel}`,
  },
  {
    Icon: MessageSquare,
    label: "WhatsApp",
    value: "Chat on WhatsApp",
    href: contact.whatsappUrl,
  },
  {
    Icon: MapPin,
    label: "Location",
    value: contact.address,
    href: contact.mapsUrl,
  },
];

export default function ContactPage() {
  const schemas = [
    webPageSchema({
      name: "Contact People Pulse Media",
      description: "Get in touch with our team about safety videos, PULSYON, or any other enquiry.",
      url: absoluteUrl("/contact"),
      breadcrumbs: [
        { name: "Home", url: absoluteUrl("/") },
        { name: "Contact", url: absoluteUrl("/contact") },
      ],
    }),
    organizationSchema(),
  ];

  return (
    <>
      <JsonLd data={schemas} />

      <HeroBanner
        eyebrow="Get in Touch"
        title="Let's Talk About Your Project"
        description="Whether you need a safety video, a PULSYON demo, or just want to explore how we can help — our team is ready to talk."
        breadcrumbs={[{ label: "Contact" }]}
        compact
      />

      <section className="py-20 bg-[#FAFAF8]" aria-labelledby="contact-main-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 id="contact-main-heading" className="text-2xl font-bold text-[#0A0A0A] mb-2">
                  Contact Information
                </h2>
                <p className="text-gray-500 leading-relaxed">
                  Reach us by email, phone, WhatsApp, or send a meeting request with your preferred time.
                </p>
              </div>

              <ul className="space-y-4" aria-label="Contact details">
                {contactDetails.map(({ Icon, label, value, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-start gap-4 group"
                      aria-label={`${label}: ${value}`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#E8521A]/10 flex items-center justify-center shrink-0 group-hover:bg-[#E8521A] transition-colors">
                        <Icon className="w-5 h-5 text-[#E8521A] group-hover:text-white transition-colors" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">{label}</div>
                        <div className="text-[#0A0A0A] font-medium group-hover:text-[#E8521A] transition-colors">{value}</div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Social */}
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Follow Us</div>
                <div className="flex gap-3">
                  {socialLinks.map(({ label, href, network }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#E8521A] flex items-center justify-center transition-colors group"
                    >
                      <SocialIcon network={network} className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Book buttons */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Quick Actions</div>
                <a
                  href="#book"
                  className="flex items-center gap-3 bg-[#0A0A0A] text-white font-bold px-5 py-4 rounded-xl hover:bg-[#E8521A] transition-colors group"
                  aria-label="Book a meeting with People Pulse Media"
                >
                  <Calendar className="w-5 h-5" aria-hidden="true" />
                  Book a Meeting
                </a>
                <Link
                  href="/onboarding-assessment#demo"
                  className="flex items-center gap-3 border-2 border-[#E8521A] text-[#E8521A] font-bold px-5 py-4 rounded-xl hover:bg-[#E8521A] hover:text-white transition-colors"
                  aria-label="Book a PULSYON demo"
                >
                  <MonitorPlay className="w-5 h-5" aria-hidden="true" />
                  Book a PULSYON Demo
                </Link>
              </div>
            </div>

            {/* Right column — form */}
            <div className="lg:col-span-3">
              <div id="book" className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-sm scroll-mt-28">
                <h2 className="text-xl font-bold text-[#0A0A0A] mb-2">Send Us a Message</h2>
                <p className="text-gray-500 text-sm mb-8">
                  We respond to all enquiries within 1 business day.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
