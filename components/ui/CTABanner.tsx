import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CTABannerProps {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  dark?: boolean;
}

export default function CTABanner({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  dark = true,
}: CTABannerProps) {
  return (
    <section
      className={
        dark
          ? "bg-[#1C1C1C] py-20 lg:py-28"
          : "bg-[#E8521A] py-20 lg:py-28"
      }
      aria-labelledby="cta-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="w-6 h-0.5 bg-white/40" aria-hidden="true" />
            <span className="text-white/60 text-xs font-bold uppercase tracking-[0.2em]">
              {eyebrow}
            </span>
            <div className="w-6 h-0.5 bg-white/40" aria-hidden="true" />
          </div>
        )}
        <h2
          id="cta-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
        >
          {title}
        </h2>
        {description && (
          <p className="mt-5 text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        )}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center gap-2 bg-[#E8521A] text-white font-bold px-8 py-4 rounded-full hover:bg-[#C43F0E] transition-all text-base group"
          >
            {primaryCta.label}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white font-bold px-8 py-4 rounded-full hover:border-white hover:bg-white hover:text-[#0A0A0A] transition-all text-base"
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
