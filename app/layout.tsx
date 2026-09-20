import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import JsonLd from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { getWPMenu, getWPSettings } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: {
    template: "%s | People Pulse Media",
    default: "People Pulse Media — Safety Videos & PULSYON Onboarding Platform",
  },
  description:
    "People Pulse Media produces premium safety videos and PULSYON — the multilingual onboarding & assessment platform for enterprise workforces in 40+ languages.",
  keywords:
    "safety videos, onboarding platform, multilingual training, PULSYON, workplace safety, HSE training, employee onboarding",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://peoplepulsemedia.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://peoplepulsemedia.com",
    siteName: "People Pulse Media",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@PeoplePulseMedia",
    site: "@PeoplePulseMedia",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuItems, settings] = await Promise.all([
    getWPMenu("PRIMARY"),
    getWPSettings(),
  ]);

  const navLinks = (menuItems ?? []).map((item) => ({ href: item.url, label: item.title }));

  return (
    <html lang="en">
      <head>
        <JsonLd data={[organizationSchema(settings?.logo_url), websiteSchema()]} />
      </head>
      <body className="bg-[#FAFAF8] text-[#0A0A0A]">
        <Header
          navLinks={navLinks}
          siteName={settings?.site_name ?? ""}
          logoUrl={settings?.logo_url ?? ""}
          logoWidth={settings?.logo_width ?? 0}
          logoHeight={settings?.logo_height ?? 0}
          ctaLabel={settings?.header_cta_label ?? ""}
          demoCtaLabel={settings?.header_demo_cta_label ?? ""}
        />
        <main id="main-content">{children}</main>
        <Footer
          siteName={settings?.site_name ?? ""}
          logoUrl={settings?.logo_url ?? ""}
          logoWidth={settings?.logo_width ?? 0}
          logoHeight={settings?.logo_height ?? 0}
          description={settings?.footer_description ?? ""}
          footerColumns={settings?.footer_columns ?? []}
          contact={{
            email: settings?.contact_email ?? "",
            phoneDisplay: settings?.contact_phone_display ?? "",
            phoneTel: settings?.contact_phone_tel ?? "",
            address: settings?.contact_address ?? "",
          }}
          socialLinks={settings?.social_links ?? []}
          copyrightText={settings?.copyright_text ?? ""}
        />
        <FloatingActions whatsappUrl={settings?.contact_whatsapp_url ?? ""} />
      </body>
    </html>
  );
}
