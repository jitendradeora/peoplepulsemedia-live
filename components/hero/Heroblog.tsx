import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Crumb } from "@/components/ui/Breadcrumbs";

interface HeroBlogProps {
  eyebrow?: string;
  description?: string;
  compact?: boolean;
}

export default function HeroBlog({
  eyebrow,
  description,
  compact = true,
}: HeroBlogProps) {
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

      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${compact ? "py-24 pb-10" : "py-20 lg:py-24"}`}>
        {eyebrow && (
          <div className="inline-flex items-center gap-2">
            <div className="w-6 h-0.5 bg-[#E8521A]" aria-hidden="true" />
            <span className="text-[#E8521A] text-xs font-bold uppercase tracking-[0.2em]">
              {eyebrow}
            </span>
          </div>
        )}
        {description && (
          <p className="mt-4 mb-0 text-lg text-white/60 max-w-5xl leading-relaxed">
            {description}
          </p>
        )}    
      </div>
    </section>
  );
}
