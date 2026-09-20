import type { Metadata } from "next";
import HeroBanner from "@/components/hero/HeroBanner";
import SectionHeading from "@/components/ui/SectionHeading";
import CTABanner from "@/components/ui/CTABanner";
import ProcessSteps from "@/components/sections/ProcessSteps";
import VideoCard from "@/components/cards/VideoCard";
import JsonLd from "@/components/seo/JsonLd";
import { webPageSchema, serviceSchema, videoObjectSchema } from "@/lib/schema";
import { getWPSafetyVideos, getWPSafetyVideosPage, getWPSettings } from "@/lib/wordpress";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Safety Training Videos",
  description:
    "Watch our premium HSE and workplace safety training videos — covering construction, oil & gas, PPE, fire safety, working at heights, and more. Available in 40+ languages.",
  alternates: { canonical: "/safety-videos" },
  openGraph: {
    title: "Safety Training Videos | People Pulse Media",
    description: "Cinematic safety training videos for enterprise workforces in 40+ languages.",
    url: "/safety-videos",
  },
};

export default async function SafetyVideosPage() {
  const [videos, page, settings] = await Promise.all([
    getWPSafetyVideos(),
    getWPSafetyVideosPage(),
    getWPSettings(),
  ]);

  const schemas = [
    webPageSchema({
      name: "Safety Training Videos",
      description: "Premium workplace safety training videos in 40+ languages.",
      url: absoluteUrl("/safety-videos"),
      breadcrumbs: [
        { name: "Home", url: absoluteUrl("/") },
        { name: "Safety Videos", url: absoluteUrl("/safety-videos") },
      ],
    }),
    serviceSchema({
      name: "Safety Video Production",
      description: "Professional safety training video production for enterprise workforces.",
      url: absoluteUrl("/safety-videos"),
    }),
    ...videos.slice(0, 5).map((v) =>
      videoObjectSchema({
        name: v.title,
        description: v.description,
        thumbnailUrl: v.thumbnailUrl,
        uploadDate: v.publishedAt,
        embedUrl: `https://www.youtube.com/embed/${v.id}`,
      })
    ),
  ];

  const categories = page?.categories ?? [];

  return (
    <>
      <JsonLd data={schemas} />

      <HeroBanner
        eyebrow={page?.hero_eyebrow ?? ""}
        title={page?.hero_title ?? ""}
        description={page?.hero_description ?? ""}
        cta={{ label: page?.hero_cta_label ?? "", href: page?.hero_cta_href ?? "" }}
        breadcrumbs={[{ label: "Safety Videos" }]}
      />

      {/* Production features */}
      <section className="py-20 bg-white" aria-labelledby="production-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Approach"
            title="What Makes Our Safety Videos Different"
            description="We don't make talking-head training videos. We make content that genuinely changes behaviour."
            className="mb-14"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(page?.production_features ?? []).map((f) => (
              <div key={f.title} className="bg-[#FAFAF8] rounded-2xl p-6 border border-gray-100">
                <div className="w-2 h-8 bg-[#E8521A] rounded-full mb-5" aria-hidden="true" />
                <h3 className="font-bold text-[#0A0A0A] mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video library */}
      <section className="py-20 bg-[#FAFAF8]" aria-labelledby="video-library-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Video Library"
            title="Browse Our Safety Videos"
            description="A selection from our library of workplace safety training content."
            className="mb-10"
          />

          {/* Categories — decorative only, no taxonomy behind these yet */}
          <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Video categories">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  cat === "All"
                    ? "bg-[#E8521A] text-white border-[#E8521A]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#E8521A] hover:text-[#E8521A]"
                }`}
                aria-pressed={cat === "All"}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              // Keyed by post position, not video.id: that's the YouTube video ID used
              // for embedding, and two different posts can legitimately link the same
              // video (as the current placeholder sample data does).
              <VideoCard key={`${video.id}-${index}`} video={video} />
            ))}
          </div>
        </div>
      </section>

      {/* Production Process */}
      <ProcessSteps
        eyebrow={settings?.process_steps_eyebrow}
        title={settings?.process_steps_title}
        description={settings?.process_steps_description}
        steps={settings?.process_steps}
      />

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
