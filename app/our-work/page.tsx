import type { Metadata } from "next";
import HeroBanner from "@/components/hero/HeroBanner";
import SectionHeading from "@/components/ui/SectionHeading";
import CTABanner from "@/components/ui/CTABanner";
import CaseStudyCard from "@/components/cards/CaseStudyCard";
import JsonLd from "@/components/seo/JsonLd";
import { webPageSchema } from "@/lib/schema";
import { getWPCaseStudies, getWPOurWorkPage, getWPSettings } from "@/lib/wordpress";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Our Work — Case Studies & Projects",
  description:
    "Explore People Pulse Media's portfolio of safety video productions, onboarding solutions, and digital content projects across oil & gas, construction, manufacturing, and more.",
  alternates: { canonical: "/our-work" },
  openGraph: {
    title: "Our Work | People Pulse Media",
    description: "Case studies and projects from People Pulse Media — safety video production and PULSYON onboarding.",
    url: "/our-work",
  },
};

export default async function OurWorkPage() {
  const [caseStudies, page, settings] = await Promise.all([
    getWPCaseStudies(),
    getWPOurWorkPage(),
    getWPSettings(),
  ]);

  const schema = webPageSchema({
    name: "Our Work — Case Studies",
    description: "Portfolio of safety video productions and PULSYON onboarding projects.",
    url: absoluteUrl("/our-work"),
    breadcrumbs: [
      { name: "Home", url: absoluteUrl("/") },
      { name: "Our Work", url: absoluteUrl("/our-work") },
    ],
  });

  return (
    <>
      <JsonLd data={schema} />

      <HeroBanner
        eyebrow={page?.hero_eyebrow ?? ""}
        title={page?.hero_title ?? ""}
        description={page?.hero_description ?? ""}
        breadcrumbs={[{ label: "Our Work" }]}
      />

      {/* Filters + grid */}
      <section className="py-20 bg-[#FAFAF8]" aria-labelledby="portfolio-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Portfolio"
            title="Case Studies & Projects"
            description="A selection from our growing portfolio of enterprise projects."
            className="mb-10"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((cs) => (
              <CaseStudyCard key={cs.slug} caseStudy={cs} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white border-y border-gray-100" aria-label="Portfolio statistics">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {(page?.stats ?? []).map(({ value, label }) => (
              <div key={label}>
                <div className="text-4xl lg:text-5xl font-bold text-[#E8521A] mb-2">{value}</div>
                <div className="text-gray-500 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
