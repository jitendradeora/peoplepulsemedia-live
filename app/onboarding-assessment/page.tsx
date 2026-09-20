import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Globe, BarChart3, CheckCircle2, Layers, Shield, Zap, Users, MonitorPlay, Database, Smartphone } from "lucide-react";
import HeroBanner from "@/components/hero/HeroBanner";
import SectionHeading from "@/components/ui/SectionHeading";
import ProblemSolutionSection from "@/components/sections/ProblemSolutionSection";
import CTABanner from "@/components/ui/CTABanner";
import JsonLd from "@/components/seo/JsonLd";
import { webPageSchema, serviceSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "PULSYON — Multilingual Onboarding & Assessment Platform",
  description:
    "PULSYON is the enterprise multilingual onboarding and assessment platform for diverse workforces. Deliver training in 40+ languages, track completion, and ensure compliance.",
  alternates: { canonical: "/onboarding-assessment" },
  openGraph: {
    title: "PULSYON | People Pulse Media",
    description: "Multilingual workforce onboarding and assessment platform trusted by enterprise clients.",
    url: "/onboarding-assessment",
  },
};

const capabilities = [
  { Icon: Globe, title: "40+ Languages", desc: "AI-powered translation with human review — ensuring accuracy and cultural appropriateness for every workforce." },
  { Icon: BarChart3, title: "Real-Time Analytics", desc: "Live dashboards showing completion rates, assessment scores, and compliance status across all sites and teams." },
  { Icon: CheckCircle2, title: "Built-In Assessments", desc: "Configurable quizzes, practical assessments, and competency checks with pass/fail thresholds and digital certificates." },
  { Icon: Layers, title: "LMS Integration", desc: "Seamless integration with SAP SuccessFactors, Workday, Cornerstone, and other major HR and LMS platforms via SCORM/xAPI." },
  { Icon: Shield, title: "Compliance Ready", desc: "Tamper-proof completion records, digital signatures, and audit trails for regulatory compliance and HSE inspections." },
  { Icon: Zap, title: "Fast Deployment", desc: "Full platform setup in under 2 weeks. Pre-built templates for common industries accelerate your content migration." },
];

const useCases = [
  { title: "Worker Induction", desc: "Replace paper-based site inductions with a digital, multilingual experience that workers complete on any device." },
  { title: "Safety Training", desc: "Deliver HSE training with interactive video content, knowledge checks, and automatic compliance reporting." },
  { title: "HR Onboarding", desc: "Welcome new employees with a consistent, engaging onboarding journey from offer accepted to first day ready." },
  { title: "Competency Assessment", desc: "Verify that workers have the skills they claim with structured assessments linked to job roles and site access." },
  { title: "Policy Acknowledgements", desc: "Distribute and track policy acknowledgements across your entire workforce with digital signatures and timestamps." },
  { title: "Refresher Training", desc: "Schedule automatic refresher training reminders and track annual recertification completion from one dashboard." },
];

const platformDetails = [
  { Icon: Users, label: "Unlimited users" },
  { Icon: MonitorPlay, label: "Video + interactive content" },
  { Icon: Database, label: "Secure cloud hosting" },
  { Icon: Smartphone, label: "Mobile & tablet ready" },
  { Icon: Globe, label: "40+ languages" },
  { Icon: Shield, label: "GDPR compliant" },
];

export default function OnboardingAssessmentPage() {
  const schemas = [
    webPageSchema({
      name: "PULSYON — Multilingual Onboarding & Assessment Platform",
      description: "Enterprise multilingual workforce onboarding and assessment platform.",
      url: absoluteUrl("/onboarding-assessment"),
      breadcrumbs: [
        { name: "Home", url: absoluteUrl("/") },
        { name: "PULSYON", url: absoluteUrl("/onboarding-assessment") },
      ],
    }),
    serviceSchema({
      name: "PULSYON Onboarding & Assessment Platform",
      description: "Multilingual digital onboarding and assessment platform for enterprise workforces.",
      url: absoluteUrl("/onboarding-assessment"),
    }),
  ];

  return (
    <>
      <JsonLd data={schemas} />

      <HeroBanner
        eyebrow="PULSYON by People Pulse Media"
        title="Onboard Every Worker. In Every Language. Every Time."
        description="PULSYON is the multilingual onboarding and assessment platform built for enterprise workforces — delivering training content in 40+ languages with real-time compliance tracking."
        cta={{ label: "Book a PULSYON Demo", href: "#demo" }}
        breadcrumbs={[{ label: "PULSYON — Onboarding & Assessment" }]}
      />

      {/* Problems & Solutions */}
      <ProblemSolutionSection
        eyebrow="The Problem with Traditional Onboarding"
        title="Onboarding that Fails Your Workforce"
        description="Most enterprise onboarding fails workers — especially in multilingual, high-risk environments. PULSYON fixes that."
      />

      {/* Capabilities */}
      <section className="py-24 lg:py-32 bg-white" aria-labelledby="capabilities-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Core Capabilities"
            title="Everything You Need in One Platform"
            description="PULSYON brings together content delivery, assessment, compliance tracking, and analytics in a single, easy-to-use platform."
            className="mb-14"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map(({ Icon, title, desc }) => (
              <div key={title} className="bg-[#FAFAF8] rounded-2xl p-6 border border-gray-100 hover:border-[#E8521A]/20 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#E8521A]/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#E8521A]" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-[#0A0A0A] mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What PULSYON does */}
      <section className="py-24 bg-[#0A0A0A]" aria-labelledby="what-pulsyon-does-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The Platform"
            title="What PULSYON Does For You"
            description="A single platform that handles your entire workforce training and compliance lifecycle."
            light
            className="mb-14"
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Assign & Deliver",
                desc: "Assign training pathways to individuals, teams, or entire sites. Workers receive content in their preferred language on any device.",
              },
              {
                step: "02",
                title: "Assess & Verify",
                desc: "Automated assessments check comprehension at every stage. Competency is verified before workers proceed to the next module.",
              },
              {
                step: "03",
                title: "Track & Report",
                desc: "Real-time dashboards show completion, scores, and outstanding requirements. Export compliance reports in seconds.",
              },
            ].map((item) => (
              <div key={item.step} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="text-[#E8521A] text-5xl font-bold mb-4 opacity-40">{item.step}</div>
                <h3 className="text-white font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-[#FAFAF8]" aria-labelledby="use-cases-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Use Cases"
            title="Built for Every Training Scenario"
            description="PULSYON adapts to your specific requirements — from construction site inductions to corporate HR onboarding."
            className="mb-14"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {useCases.map((uc) => (
              <div key={uc.title} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#E8521A] mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <h3 className="font-bold text-[#0A0A0A] mb-1">{uc.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{uc.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform details */}
      <section className="py-16 bg-white border-y border-gray-100" aria-label="Platform specifications">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
            {platformDetails.map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-gray-600">
                <Icon className="w-4 h-4 text-[#E8521A]" aria-hidden="true" />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo CTA */}
      {/* <section id="demo" className="py-24 bg-[#FAFAF8]" aria-labelledby="demo-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm">
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="w-6 h-0.5 bg-[#E8521A]" aria-hidden="true" />
              <span className="text-[#E8521A] text-xs font-bold uppercase tracking-[0.2em]">Book a Demo</span>
            </div>
            <h2 id="demo-heading" className="text-3xl font-bold text-[#0A0A0A] mb-4">
              See PULSYON in Action
            </h2>
            <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
              Book a personalised 30-minute demo. We&rsquo;ll walk you through the platform with your industry and use case in mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact?service=pulsyon-demo#book"
                className="inline-flex items-center justify-center gap-2 bg-[#E8521A] text-white font-bold px-8 py-4 rounded-full hover:bg-[#C43F0E] transition-colors group"
              >
                Book a PULSYON Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#0A0A0A] text-[#0A0A0A] font-bold px-8 py-4 rounded-full hover:bg-[#0A0A0A] hover:text-white transition-colors"
              >
                Talk to Our Team
              </Link>
            </div>
          </div>
        </div>
      </section> */}

       <CTABanner
        eyebrow="Get Started"
        title="Ready to Transform Your Workforce Training?"
        description="Book a meeting to discuss your safety video needs, or see PULSYON in action with a personalised demo."
        primaryCta={{ label: "Book a Meeting", href: "/contact#book" }}
        secondaryCta={{ label: "Book a PULSYON Demo", href: "/onboarding-assessment#demo" }}
      />
    </>
  );
}
