import { Quote } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import type { WPTestimonial } from "@/lib/wordpress";

interface TestimonialsProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  testimonials?: WPTestimonial[];
}

export default function Testimonials({
  eyebrow = "",
  title = "",
  description = "",
  testimonials = [],
}: TestimonialsProps) {
  return (
    <section className="py-24 lg:py-32 bg-[#0A0A0A]" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          light
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-colors"
            >
              <Quote className="w-8 h-8 text-[#E8521A] mb-6 fill-current opacity-60" aria-hidden="true" />
              <blockquote className="text-white/80 leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E8521A]/20 flex items-center justify-center shrink-0">
                  <span className="text-[#E8521A] font-bold text-sm">{t.author.charAt(0)}</span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.author}</div>
                  <div className="text-white/40 text-xs">{t.role} · {t.company}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
