import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(
      "max-w-4xl",
      align === "center" && "mx-auto text-center",
      className
    )}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-6 h-0.5 bg-[#E8521A]" aria-hidden="true" />
          <span className="text-[#E8521A] text-xs font-bold uppercase tracking-[0.2em]">
            {eyebrow}
          </span>
          <div className="w-6 h-0.5 bg-[#E8521A]" aria-hidden="true" />
        </div>
      )}
      <h2 className={cn(
        "text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight",
        light ? "text-white" : "text-[#0A0A0A]"
      )}>
        {title}
      </h2>
      {description && (
        <p className={cn(
          "mt-4 text-lg leading-relaxed",
          light ? "text-white/70" : "text-gray-600"
        )}>
          {description}
        </p>
      )}
    </div>
  );
}
