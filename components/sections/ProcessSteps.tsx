import SectionHeading from "@/components/ui/SectionHeading";
import type { WPProcessStep } from "@/lib/wordpress";

interface ProcessStepsProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  steps?: WPProcessStep[];
}

export default function ProcessSteps({
  eyebrow = "",
  title = "",
  description = "",
  steps = [],
}: ProcessStepsProps) {
  return (
    <section className="py-24 lg:py-32 bg-[#FAFAF8]" aria-labelledby="process-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="left"
          className="mb-16"
        />

        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute left-[2.25rem] top-10 bottom-10 w-px bg-gradient-to-b from-[#E8521A] to-transparent" aria-hidden="true" />

          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.step_number} className="flex gap-6 lg:gap-10 group">
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <div className="w-[4.5rem] h-[4.5rem] rounded-2xl bg-white border-2 border-[#E8521A]/20 group-hover:border-[#E8521A] group-hover:bg-[#E8521A] flex items-center justify-center transition-all duration-300 shadow-sm relative z-10">
                    <span className="text-lg font-bold text-[#E8521A] group-hover:text-white transition-colors">
                      {step.step_number}
                    </span>
                  </div>
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-xl font-bold text-[#0A0A0A] mb-2 group-hover:text-[#E8521A] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
