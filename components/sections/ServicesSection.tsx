import Link from "next/link";
import { Video, MonitorPlay, Clapperboard, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const services = [
  {
    Icon: Video,
    title: "Safety Video Production",
    description:
      "Cinematic-quality safety training videos that engage workers and drive real behavioural change. From scripting to delivery — in 40+ languages.",
    href: "/safety-videos",
    cta: "Watch Safety Videos",
    highlights: ["40+ languages", "Industrial locations", "Regulatory compliant"],
  },
  {
    Icon: MonitorPlay,
    title: "PULSYON — Onboarding & Assessment",
    description:
      "Our flagship multilingual platform digitises your entire onboarding and compliance assessment process for enterprise workforces worldwide.",
    href: "/onboarding-assessment",
    cta: "Book a PULSYON Demo",
    highlights: ["Multilingual AI", "Real-time analytics", "LMS integration"],
    featured: true,
  },
  {
    Icon: Clapperboard,
    title: "Digital Content Creation",
    description:
      "Beyond safety — we create compelling digital content that tells your brand story, showcases your expertise, and drives measurable business outcomes.",
    href: "/our-work",
    cta: "View Our Work",
    highlights: ["Brand films", "Case studies", "Corporate content"],
  },
];

export default function ServicesSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#FAFAF8]" aria-labelledby="services-heading">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What We Do"
          title="Services Built for Enterprise Impact"
          description="Three core offerings. One mission: making your workforce safer, smarter, and more capable."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className={`relative group rounded-3xl p-8 flex flex-col transition-all duration-300 ${
                service.featured
                  ? "bg-[#0A0A0A] text-white shadow-2xl shadow-black/20 scale-[1.02]"
                  : "bg-white border border-gray-100 hover:border-[#E8521A]/20 hover:shadow-xl hover:shadow-[#E8521A]/5"
              }`}
            >
              {service.featured && (
                <div className="absolute -top-3 left-8">
                  <span className="bg-[#E8521A] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                    Flagship Product
                  </span>
                </div>
              )}

              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                  service.featured ? "bg-[#E8521A]" : "bg-[#E8521A]/10"
                }`}
              >
                <service.Icon
                  className={`w-6 h-6 ${service.featured ? "text-white" : "text-[#E8521A]"}`}
                />
              </div>

              <h3
                className={`text-xl font-bold mb-3 ${
                  service.featured ? "text-white" : "text-[#0A0A0A]"
                }`}
              >
                {service.title}
              </h3>
              <p
                className={`text-sm leading-relaxed mb-6 flex-1 ${
                  service.featured ? "text-white/65" : "text-gray-500"
                }`}
              >
                {service.description}
              </p>

              <ul className="space-y-2 mb-8">
                {service.highlights.map((h) => (
                  <li
                    key={h}
                    className={`flex items-center gap-2 text-xs font-medium ${
                      service.featured ? "text-white/70" : "text-gray-500"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8521A] shrink-0" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>

              <Link
                href={service.href}
                className={`inline-flex items-center gap-2 font-semibold text-sm group/link ${
                  service.featured
                    ? "text-[#E8521A] hover:text-[#F47A4E]"
                    : "text-[#E8521A] hover:text-[#C43F0E]"
                }`}
                aria-label={`${service.cta} — ${service.title}`}
              >
                {service.cta}
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
