import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Crumb } from "@/components/ui/Breadcrumbs";

interface HeroBannerProps {
  eyebrow?: string;
  title: string;
  description?: string;
  cta?: { label: string; href: string };
  breadcrumbs?: Crumb[];
  compact?: boolean;
}

export default function HeroBanner({
  eyebrow,
  title,
  description,
  cta,
  breadcrumbs,
  compact = false,
}: HeroBannerProps) {
  return (
    <section
      className="relative overflow-hidden bg-[#272727]"
      aria-label="Page hero"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8521A]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden="true" />

      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${compact ? "py-24" : "py-28 lg:py-36"}`}>
        {breadcrumbs && (
          <div className="mb-8">
            {/* Light breadcrumbs on dark bg */}
            <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-sm">
              <Link href="/" className="text-white/40 hover:text-white transition-colors">Home</Link>
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <span className="text-white/20" aria-hidden="true">/</span>
                  {crumb.href && i < breadcrumbs.length - 1 ? (
                    <Link href={crumb.href} className="text-white/40 hover:text-white transition-colors">{crumb.label}</Link>
                  ) : (
                    <span className="text-white/80" aria-current="page">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          </div>
        )}

        {eyebrow && (
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="w-6 h-0.5 bg-[#E8521A]" aria-hidden="true" />
            <span className="text-[#E8521A] text-xs font-bold uppercase tracking-[0.2em]">
              {eyebrow}
            </span>
          </div>
        )}

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-6xl">
          {title}
        </h1>

        {description && (
          <p className="mt-5 text-lg text-white/60 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}

        {cta && (
          <div className="mt-8">
            <Link
              href={cta.href}
              className="inline-flex items-center gap-2 bg-[#E8521A] text-white font-bold px-7 py-3.5 rounded-full hover:bg-[#C43F0E] transition-all group"
            >
              {cta.label}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
