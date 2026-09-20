import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { getWPCaseStudies, getWPOurWorkPage, getWPSettings } from "@/lib/wordpress";
import CTABanner from "@/components/ui/CTABanner";
import JsonLd from "@/components/seo/JsonLd";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const caseStudies = await getWPCaseStudies();
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseStudies = await getWPCaseStudies();
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return { title: "Case Study Not Found" };
  return {
    title: cs.title,
    description: cs.description,
    alternates: { canonical: `/our-work/${slug}` },
    openGraph: {
      title: `${cs.title} | People Pulse Media`,
      description: cs.description,
      url: `/our-work/${slug}`,
      ...(cs.imageSrc ? { images: [{ url: cs.imageSrc, width: 1200, height: 630, alt: cs.title }] } : {}),
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const [caseStudies, page, settings] = await Promise.all([
    getWPCaseStudies(),
    getWPOurWorkPage(),
    getWPSettings(),
  ]);
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();

  const otherCases = caseStudies.filter((c) => c.slug !== slug).slice(0, 2);

  const schemas = [
    webPageSchema({
      name: cs.title,
      description: cs.description,
      url: absoluteUrl(`/our-work/${slug}`),
    }),
    breadcrumbSchema([
      { name: "Home", url: absoluteUrl("/") },
      { name: "Our Work", url: absoluteUrl("/our-work") },
      { name: cs.title, url: absoluteUrl(`/our-work/${slug}`) },
    ]),
  ];

  return (
    <>
      <JsonLd data={schemas} />

      {/* Hero */}
      <div className="relative min-h-[50vh] flex items-end bg-[#0A0A0A] overflow-hidden">
        {cs.imageSrc && (
          <Image
            src={cs.imageSrc}
            alt={cs.title}
            fill
            className="object-cover opacity-40"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/50 to-transparent" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32 w-full">
          <div className="mb-6">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-white/40">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/our-work" className="hover:text-white transition-colors">Our Work</Link>
              <span aria-hidden="true">/</span>
              <span className="text-white/80" aria-current="page">{cs.title}</span>
            </nav>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-[#E8521A] text-white text-xs font-bold px-3 py-1 rounded-full">{cs.industry}</span>
            {cs.tags.map((tag) => (
              <span key={tag} className="bg-white/10 text-white/70 text-xs font-medium px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl">{cs.title}</h1>
          {cs.results && (
            <div className="mt-6 inline-flex items-center gap-2 bg-[#E8521A]/20 border border-[#E8521A]/30 rounded-xl px-5 py-3">
              <CheckCircle2 className="w-5 h-5 text-[#E8521A]" aria-hidden="true" />
              <span className="text-white font-semibold text-sm">{cs.results}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="py-16 bg-[#FAFAF8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 lg:p-12 border border-gray-100 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 pb-10 border-b border-gray-100">
              {[
                { label: "Client", value: cs.client },
                { label: "Industry", value: cs.industry },
                { label: "Services", value: cs.tags.join(", ") },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</div>
                  <div className="font-semibold text-[#0A0A0A]">{value}</div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">Project Overview</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-8">{cs.description}</p>

            {cs.challenge && (
              <>
                <h3 className="text-xl font-bold text-[#0A0A0A] mb-4">The Challenge</h3>
                <p className="text-gray-600 leading-relaxed mb-8">{cs.challenge}</p>
              </>
            )}

            {cs.approach && (
              <>
                <h3 className="text-xl font-bold text-[#0A0A0A] mb-4">Our Approach</h3>
                <p className="text-gray-600 leading-relaxed mb-8">{cs.approach}</p>
              </>
            )}

            {cs.results && (
              <div className="bg-[#E8521A]/5 border border-[#E8521A]/20 rounded-2xl p-6">
                <div className="text-xs font-bold text-[#E8521A] uppercase tracking-widest mb-2">Results</div>
                <p className="text-[#0A0A0A] font-bold text-xl">{cs.results}</p>
              </div>
            )}
          </div>

          {/* Back link */}
          <div className="mt-10 flex items-center justify-between">
            <Link href="/our-work" className="flex items-center gap-2 text-gray-500 hover:text-[#E8521A] transition-colors font-medium text-sm">
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Back to Our Work
            </Link>
            <Link href="/contact#book" className="inline-flex items-center gap-2 bg-[#E8521A] text-white font-bold px-6 py-3 rounded-full hover:bg-[#C43F0E] transition-colors text-sm group">
              Start Your Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* More projects */}
      {otherCases.length > 0 && (
        <section className="py-16 bg-white border-t border-gray-100" aria-labelledby="more-work-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="more-work-heading" className="text-2xl font-bold text-[#0A0A0A] mb-8">More Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherCases.map((oc) => (
                <Link
                  key={oc.slug}
                  href={`/our-work/${oc.slug}`}
                  className="group flex gap-5 rounded-2xl p-5 border border-gray-100 hover:border-[#E8521A]/20 hover:shadow-md transition-all"
                >
                  {oc.imageSrc && (
                    <div className="relative w-24 h-20 rounded-xl overflow-hidden shrink-0">
                      <Image src={oc.imageSrc} alt={oc.title} fill className="object-cover" />
                    </div>
                  )}
                  <div>
                    <div className="text-[#E8521A] text-xs font-bold mb-1">{oc.industry}</div>
                    <h3 className="font-bold text-[#0A0A0A] text-sm leading-snug group-hover:text-[#E8521A] transition-colors">{oc.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner
        eyebrow={page?.single_cta_eyebrow ?? ""}
        title={page?.single_cta_title ?? ""}
        description={page?.single_cta_description ?? ""}
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
