import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  description: string;
  imageSrc?: string;
  tags: string[];
  results?: string;
}

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const href = `/our-work/${caseStudy.slug}`;
  return (
    <article className="group relative rounded-3xl overflow-hidden bg-[#0A0A0A] aspect-[4/5] flex flex-col justify-end hover:shadow-2xl transition-all duration-300">
      {/* Background image */}
      {caseStudy.imageSrc ? (
        <Image
          src={caseStudy.imageSrc}
          alt={caseStudy.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8521A]/30 to-[#0A0A0A]" aria-hidden="true" />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 p-6 lg:p-8">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs font-bold text-[#E8521A] bg-[#E8521A]/10 border border-[#E8521A]/20 px-2.5 py-1 rounded-full">
            {caseStudy.industry}
          </span>
        </div>

        <h3 className="text-lg lg:text-xl font-bold text-white leading-snug mb-2">
          <Link
            href={href}
            className="after:absolute after:inset-0 hover:text-[#E8521A] transition-colors"
            aria-label={`Case study: ${caseStudy.title}`}
          >
            {caseStudy.title}
          </Link>
        </h3>

        <p className="text-white/60 text-sm mb-4 leading-relaxed line-clamp-2">{caseStudy.description}</p>

        {caseStudy.results && (
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2.5 mb-4">
            <p className="text-white text-xs font-semibold">{caseStudy.results}</p>
          </div>
        )}

        <div className="flex items-center gap-2 text-[#E8521A] font-semibold text-sm group-hover:gap-3 transition-all">
          View case study
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </div>
      </div>
    </article>
  );
}
