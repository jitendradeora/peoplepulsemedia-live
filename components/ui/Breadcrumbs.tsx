import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-sm">
      <Link href="/" className="flex items-center gap-1 text-gray-500 hover:text-[#E8521A] transition-colors">
        <Home className="w-3.5 h-3.5" />
        <span className="sr-only">Home</span>
      </Link>
      {items.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" aria-hidden="true" />
          {crumb.href && i < items.length - 1 ? (
            <Link href={crumb.href} className="text-gray-500 hover:text-[#E8521A] transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-[#0A0A0A] font-medium" aria-current="page">
              {crumb.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
