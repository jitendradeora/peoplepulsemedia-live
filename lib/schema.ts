import { contact, socialLinks } from "@/lib/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://peoplepulsemedia.com";

export function organizationSchema(logoUrl?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "People Pulse Media",
    url: siteUrl,
    ...(logoUrl ? { logo: logoUrl } : {}),
    description:
      "People Pulse Media specializes in safety video production, multilingual onboarding & assessment solutions, and digital content creation for enterprises.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: contact.email,
      telephone: contact.phoneDisplay,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "SHAMS",
      addressLocality: "Sharjah",
      addressCountry: "AE",
    },
    sameAs: socialLinks.map((link) => link.href),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "People Pulse Media",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function webPageSchema({
  name,
  description,
  url,
  breadcrumbs,
}: {
  name: string;
  description: string;
  url: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    isPartOf: { "@type": "WebSite", url: siteUrl, name: "People Pulse Media" },
  };
  if (breadcrumbs) {
    schema.breadcrumb = breadcrumbSchema(breadcrumbs);
  }
  return schema;
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function serviceSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "Organization",
      name: "People Pulse Media",
      url: siteUrl,
    },
  };
}

export function blogPostingSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  authorName,
  imageSrc,
  publisherLogoUrl,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  imageSrc?: string;
  publisherLogoUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "People Pulse Media",
      ...(publisherLogoUrl ? { logo: { "@type": "ImageObject", url: publisherLogoUrl } } : {}),
    },
    ...(imageSrc ? { image: imageSrc } : {}),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

export function videoObjectSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  embedUrl,
  duration,
}: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  embedUrl: string;
  duration?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl,
    uploadDate,
    embedUrl,
    ...(duration ? { duration } : {}),
    publisher: {
      "@type": "Organization",
      name: "People Pulse Media",
    },
  };
}

export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
