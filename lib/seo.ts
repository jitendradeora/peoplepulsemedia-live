import type { Metadata } from "next";
import { absoluteUrl } from "./utils";

const siteName = "People Pulse Media";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://peoplepulsemedia.com";
const defaultOgImage = `${siteUrl}/og-default.jpg`;

interface SeoConfig {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
  keywords?: string[];
}

export function generateSeoMetadata({
  title,
  description,
  path,
  ogImage = defaultOgImage,
  noIndex = false,
  keywords = [],
}: SeoConfig): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = `${title} | ${siteName}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    publisher: siteName,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title: fullTitle,
      description,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      creator: "@PeoplePulseMedia",
      site: "@PeoplePulseMedia",
    },
  };
}

export { siteName, siteUrl };
