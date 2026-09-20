import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroVideo from "@/components/hero/HeroVideo";
import ServicesSection from "@/components/sections/ServicesSection";
import ProblemSolutionSection from "@/components/sections/ProblemSolutionSection";
import ProcessSteps from "@/components/sections/ProcessSteps";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/ui/CTABanner";
import SectionHeading from "@/components/ui/SectionHeading";
import FAQAccordion from "@/components/faq/FAQAccordion";
import NewsletterForm from "@/components/forms/NewsletterForm";
import JsonLd from "@/components/seo/JsonLd";
import { webPageSchema, faqSchema } from "@/lib/schema";
import { getWPFaqs, getWPHomePage, getWPSettings, getWPTestimonials } from "@/lib/wordpress";
import { absoluteUrl } from "@/lib/utils";
import { getIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "People Pulse Media — Safety Videos & PULSYON Onboarding Platform",
  description:
    "We produce premium safety training videos and power workforce onboarding with PULSYON — our multilingual assessment platform trusted by enterprises across the region.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "People Pulse Media — Safety Videos & PULSYON",
    description:
      "Premium safety video production and PULSYON — the multilingual onboarding & assessment platform for enterprise workforces.",
    url: "/",
  },
};

export default async function HomePage() {
  const [faqs, home, settings, testimonials] = await Promise.all([
    getWPFaqs(),
    getWPHomePage(),
    getWPSettings(),
    getWPTestimonials(),
  ]);

  const pageSchema = webPageSchema({
    name: "People Pulse Media — Safety Videos & PULSYON",
    description: "Premium safety video production and multilingual onboarding platform.",
    url: absoluteUrl("/"),
  });

  const faqStructuredData = faqSchema(faqs.map((f) => ({ question: f.question, answer: f.answer })));

  const aboutHeading = home?.about_heading ?? "";
  const aboutHighlight = home?.about_heading_highlight ?? "";
  const aboutHeadingPrefix = aboutHighlight && aboutHeading.includes(aboutHighlight)
    ? aboutHeading.slice(0, aboutHeading.lastIndexOf(aboutHighlight))
    : aboutHeading;

  const aboutFeatures = home?.about_features ?? [];

  return (
    <>
      <JsonLd data={[pageSchema, faqStructuredData]} />

      {/* Hero */}
      <HeroVideo
        subtitle={home?.hero_subtitle ?? ""}
        title={home?.hero_title ?? ""}
        description={home?.hero_description ?? ""}
        primaryCta={{
          label: home?.hero_primary_cta_label ?? "",
          href: home?.hero_primary_cta_href ?? "",
        }}
        secondaryCta={{
          label: home?.hero_secondary_cta_label ?? "",
          href: home?.hero_secondary_cta_href ?? "",
        }}
        youtubeUrl={home?.hero_youtube_url}
      />

      {/* About */}
      <section className="py-24 lg:py-32 bg-white" aria-labelledby="about-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-5">
                <div className="w-6 h-0.5 bg-[#E8521A]" aria-hidden="true" />
                <span className="text-[#E8521A] text-xs font-bold uppercase tracking-[0.2em]">{home?.about_eyebrow}</span>
              </div>
              <h2 id="about-heading" className="text-4xl lg:text-5xl font-bold text-[#0A0A0A] leading-tight mb-6">
                {aboutHeadingPrefix}<span className="text-[#E8521A]">{aboutHighlight}</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                {home?.about_paragraph_1}
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                {home?.about_paragraph_2}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[#E8521A] font-bold hover:text-[#C43F0E] group"
              >
                {home?.about_cta_label}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {aboutFeatures.map((feature) => {
                const Icon = getIcon(feature.icon);
                return (
                  <div key={feature.title} className="bg-[#FAFAF8] rounded-2xl p-6 border border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-[#E8521A]/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-[#E8521A]" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-[#0A0A0A] mb-1">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <ServicesSection />

      {/* Problems & Solutions */}
      <ProblemSolutionSection
        eyebrow={home?.problem_solution_eyebrow}
        title={home?.problem_solution_title}
        description={home?.problem_solution_description}
        problems={settings?.problem_solution_pairs}
      />

      {/* Process */}
      <ProcessSteps
        eyebrow={settings?.process_steps_eyebrow}
        title={settings?.process_steps_title}
        description={settings?.process_steps_description}
        steps={settings?.process_steps}
      />

      {/* Testimonials */}
      <Testimonials
        eyebrow={home?.testimonials_eyebrow}
        title={home?.testimonials_title}
        description={home?.testimonials_description}
        testimonials={testimonials ?? undefined}
      />

      {/* FAQ */}
      <section className="py-24 lg:py-32 bg-white" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={home?.faq_section_eyebrow ?? ""}
            title={home?.faq_section_title ?? ""}
            description={home?.faq_section_description ?? ""}
            className="mb-12"
          />
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-[#FAFAF8] border-t border-gray-100" aria-labelledby="newsletter-heading">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="newsletter-heading" className="text-2xl font-bold text-[#0A0A0A] mb-3">
            {home?.newsletter_heading}
          </h2>
          <p className="text-gray-500 mb-8">
            {home?.newsletter_description}
          </p>
          <NewsletterForm />
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        eyebrow={settings?.final_cta.eyebrow ?? ""}
        title={settings?.final_cta.title ?? ""}
        description={settings?.final_cta.description ?? ""}
        primaryCta={{
          label: settings?.final_cta.primary_cta_label ?? "",
          href: settings?.final_cta.primary_cta_href ?? "",
        }}
        secondaryCta={{
          label: settings?.final_cta.secondary_cta_label ?? "",
          href: settings?.final_cta.secondary_cta_href ?? "",
        }}
      />
    </>
  );
}
