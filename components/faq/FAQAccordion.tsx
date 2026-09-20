"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WPFaq } from "@/lib/wordpress";

interface FAQAccordionProps {
  faqs: WPFaq[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<number | null>(faqs[0]?.id ?? null);

  const toggle = (id: number) => setOpenId(openId === id ? null : id);

  return (
    <div className="space-y-3" role="list">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        const answerId = `faq-answer-${faq.id}`;
        const buttonId = `faq-btn-${faq.id}`;
        return (
          <div
            key={faq.id}
            className={cn(
              "border rounded-2xl overflow-hidden transition-all duration-200",
              isOpen
                ? "border-[#E8521A]/30 bg-[#E8521A]/[0.03]"
                : "border-gray-100 bg-white hover:border-[#E8521A]/20"
            )}
            role="listitem"
          >
            <button
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={answerId}
              onClick={() => toggle(faq.id)}
              className="w-full flex items-center justify-between gap-4 p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8521A] focus-visible:ring-inset"
            >
              <span className="font-semibold text-[#0A0A0A] leading-snug">{faq.question}</span>
              <span
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors",
                  isOpen ? "bg-[#E8521A] text-white" : "bg-gray-100 text-gray-500"
                )}
                aria-hidden="true"
              >
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </span>
            </button>
            <div
              id={answerId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "overflow-hidden transition-all duration-300",
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
