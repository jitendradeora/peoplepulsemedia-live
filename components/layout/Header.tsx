"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  navLinks: { href: string; label: string }[];
  siteName: string;
  logoUrl: string;
  logoWidth: number;
  logoHeight: number;
  ctaLabel: string;
  demoCtaLabel: string;
}

export default function Header({ navLinks, siteName, logoUrl, logoWidth, logoHeight, ctaLabel, demoCtaLabel }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#0a0a0a]",
          scrolled
            ? "bg-[#0a0a0a]"
            : "bg-[#0a0a0a]"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className={cn(
                "flex items-center shrink-0 rounded-lg transition-colors",
                 
              )}
              aria-label={`${siteName} — Home`}
            >
              {logoUrl && (
                <Image
                  src={logoUrl}
                  alt={siteName}
                  width={logoWidth}
                  height={logoHeight}
                  className="h-8 sm:h-10 w-auto"
                  priority
                />
              )}
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-[#E8521A] text-white",
                    scrolled ? "text-[#ffffff]" : "text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact#book"
                className="hidden sm:inline-flex items-center gap-2 bg-[#E8521A] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#C43F0E] transition-colors"
              >
                {ctaLabel}
              </Link>
              <button
                onClick={() => setOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={open}
                className={cn(
                  "lg:hidden p-2 rounded-lg transition-colors",
                  scrolled ? "text-[#0A0A0A] hover:bg-gray-100" : "text-white hover:bg-white/10"
                )}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[60] lg:hidden transition-all duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            "absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300",
            open ? "translate-x-0" : "translate-x-full"
          )}
          role="dialog"
          aria-label="Navigation menu"
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <span className="font-bold text-[#0A0A0A]">Menu</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close navigation menu"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex flex-col p-6 gap-1 flex-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-xl text-[#0A0A0A] font-medium hover:bg-[#FAFAF8] hover:text-[#E8521A] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="p-6 border-t border-gray-100 flex flex-col gap-3">
            <Link
              href="/contact#book"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 bg-[#E8521A] text-white font-semibold px-5 py-3 rounded-full hover:bg-[#C43F0E] transition-colors"
            >
              {ctaLabel}
            </Link>
            <Link
              href="/onboarding-assessment#demo"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 border-2 border-[#E8521A] text-[#E8521A] font-semibold px-5 py-3 rounded-full hover:bg-[#E8521A] hover:text-white transition-colors"
            >
              {demoCtaLabel}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
