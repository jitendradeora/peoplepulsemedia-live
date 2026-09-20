import { AlertTriangle, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import type { WPProblemSolutionPair } from "@/lib/wordpress";

interface ProblemSolutionSectionProps {
  title?: string;
  eyebrow?: string;
  description?: string;
  problems?: WPProblemSolutionPair[];
}

export default function ProblemSolutionSection({
  title = "",
  eyebrow = "",
  description = "",
  problems = [],
}: ProblemSolutionSectionProps) {
  return (
    <section className="py-24 lg:py-32 bg-white" aria-labelledby="problems-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((item, i) => (
            <div
              key={i}
              className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-transparent hover:shadow-lg transition-all duration-300"
            >
              <div className="bg-gray-50 p-6 flex items-start gap-4 border-b border-gray-100">
                <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-red-400 uppercase tracking-widest mb-1">The Problem</div>
                  <p className="text-[#0A0A0A] font-medium leading-snug">{item.problem}</p>
                </div>
              </div>
              <div className="bg-white p-6 flex items-start gap-4 group-hover:bg-[#FAFAF8] transition-colors">
                <div className="w-9 h-9 rounded-xl bg-[#E8521A]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5 text-[#E8521A]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#E8521A] uppercase tracking-widest mb-1">Our Solution</div>
                  <p className="text-gray-600 leading-relaxed">{item.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
