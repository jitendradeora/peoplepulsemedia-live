import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { SocialIcon } from "@/components/ui/SocialIcons";
import type { WPFooterColumn, WPSocialLink } from "@/lib/wordpress";

interface ContactInfo {
  email: string;
  phoneDisplay: string;
  phoneTel: string;
  address: string;
}

interface FooterProps {
  siteName: string;
  logoUrl: string;
  logoWidth: number;
  logoHeight: number;
  description: string;
  footerColumns: WPFooterColumn[];
  contact: ContactInfo;
  socialLinks: WPSocialLink[];
  copyrightText: string;
}

export default function Footer({
  siteName,
  logoUrl,
  logoWidth,
  logoHeight,
  description,
  footerColumns,
  contact,
  socialLinks,
  copyrightText,
}: FooterProps) {
  return (
    <footer className="bg-[#0A0A0A] text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block" aria-label={`${siteName} — Home`}>
              {logoUrl && (
                <Image
                  src={logoUrl}
                  alt={siteName}
                  width={logoWidth}
                  height={logoHeight}
                  className="h-12 w-auto"
                />
              )}
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {description}
            </p>
            <div className="space-y-2">
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
                <Mail className="w-4 h-4 text-[#E8521A]" />
                {contact.email}
              </a>
              <a href={`tel:${contact.phoneTel}`} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
                <Phone className="w-4 h-4 text-[#E8521A]" />
                {contact.phoneDisplay}
              </a>
              <div className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-[#E8521A] mt-0.5 shrink-0" />
                {contact.address}
              </div>
            </div>

          </div>

          {/* Links */}
          {footerColumns.map((column) => (
            <div key={column.column_title}>
              <h3 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">{column.column_title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.url}>
                    <Link
                      href={link.url}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>



        {/* Bottom bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">

          <div className="flex items-center gap-3">
              {socialLinks.map(({ url, label, network }) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E8521A] transition-colors"
                >
                  <SocialIcon network={network} className="w-4 h-4" />
                </a>
              ))}
            </div>
             <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} {copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
}
