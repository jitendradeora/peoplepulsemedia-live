import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";
import { extractYouTubeId, getYouTubeBackgroundEmbedUrl } from "@/lib/youtube";

interface HeroVideoProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  videoSrc?: string;
  posterSrc?: string;
  youtubeUrl?: string;
  stats?: Array<{ value: string; label: string }>;
}

export default function HeroVideo({
  title,
  subtitle,
  description,
  primaryCta = { label: "Book a Meeting", href: "/contact#book" },
  secondaryCta,
  videoSrc,
  posterSrc,
  youtubeUrl,
  stats,
}: HeroVideoProps) {
  const youtubeId = extractYouTubeId(youtubeUrl);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 w-full h-full bg-[#1C1C1C] overflow-hidden">
        {youtubeId ? (
          <iframe
            src={getYouTubeBackgroundEmbedUrl(youtubeId)}
            title="Background video"
            allow="autoplay; encrypted-media"
            tabIndex={-1}
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none border-0"
            style={{ width: "100vw", height: "56.25vw", minWidth: "177.78vh", minHeight: "100vh" }}
          />
        ) : videoSrc ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster={posterSrc}
            aria-hidden="true"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <div
            className="w-full h-full bg-gradient-to-br from-[#272727] via-gray-900 to-[#1a1a1a] bg-[#272727]"
            aria-hidden="true"
          />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" aria-hidden="true" />
        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        {subtitle && (
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-6 h-0.5 bg-[#E8521A]" aria-hidden="true" />
            <span className="text-[#E8521A] text-xs font-bold uppercase tracking-[0.25em]">
              {subtitle}
            </span>
            <div className="w-6 h-0.5 bg-[#E8521A]" aria-hidden="true" />
          </div>
        )}

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-5xl mx-auto">
          {title}
        </h1>

        {description && (
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            {description}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center gap-2 bg-[#E8521A] text-white font-bold px-8 py-4 rounded-full hover:bg-[#C43F0E] transition-all text-base group shadow-lg shadow-[#E8521A]/25"
          >
            {primaryCta.label}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-bold px-8 py-4 rounded-full hover:border-white hover:bg-white/10 transition-all text-base"
            >
              <Play className="w-4 h-4 fill-current" />
              {secondaryCta.label}
            </Link>
          )}
        </div>     
      </div>
 
    </section>
  );
}
