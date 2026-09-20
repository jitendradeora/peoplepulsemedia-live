import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-[#E8521A]/20 mb-4" aria-hidden="true">404</div>
        <h1 className="text-3xl font-bold text-[#0A0A0A] mb-3">Page Not Found</h1>
        <p className="text-gray-500 mb-10 leading-relaxed">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved. Let&rsquo;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#E8521A] text-white font-bold px-7 py-3.5 rounded-full hover:bg-[#C43F0E] transition-colors"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            Go Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-[#0A0A0A] font-bold px-7 py-3.5 rounded-full hover:border-[#E8521A] hover:text-[#E8521A] transition-colors"
          >
            Contact Us
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
        <nav aria-label="Popular pages">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Popular Pages</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { href: "/safety-videos", label: "Safety Videos" },
              { href: "/onboarding-assessment", label: "PULSYON" },
              { href: "/our-work", label: "Our Work" },
              { href: "/blog", label: "Blog" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-white border border-gray-100 text-gray-600 hover:text-[#E8521A] hover:border-[#E8521A]/30 text-sm font-medium px-4 py-2 rounded-full transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
