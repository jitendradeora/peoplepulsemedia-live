"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { cn } from "@/lib/utils";

interface FloatingActionsProps {
  whatsappUrl: string;
}

export default function FloatingActions({ whatsappUrl }: FloatingActionsProps) {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-40 flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Move to top"
        className={cn(
          "w-12 h-12 rounded-full bg-[#0A0A0A] text-white shadow-lg flex items-center justify-center",
          "hover:bg-[#E8521A] transition-all duration-300",
          showTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-3 pointer-events-none"
        )}
      >
        <ArrowUp className="w-5 h-5" aria-hidden="true" />
      </button>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center hover:bg-[#1EBE57] hover:scale-105 transition-all duration-300"
      >
        <WhatsAppIcon className="w-7 h-7" />
      </a>
    </div>
  );
}
