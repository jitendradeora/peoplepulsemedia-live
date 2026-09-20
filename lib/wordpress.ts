import type { YouTubeVideo } from "@/lib/youtube";
import { extractYouTubeId, getYouTubeThumbnail } from "@/lib/youtube";
import { WORDPRESS_GRAPHQL_URL, WORDPRESS_API_TOKEN } from "@/lib/config";

function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (WORDPRESS_API_TOKEN) {
    headers["Authorization"] = `Bearer ${WORDPRESS_API_TOKEN}`;
  }
  return headers;
}

export interface WPPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  modified: string;
  featuredImage?: string;
  author: string;
  categories: string[];
  tags: string[];
}

export interface WPFaq {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

export interface WPMenuItem {
  id: number;
  title: string;
  url: string;
  target: string;
}

export interface WPSocialLink {
  network: "linkedin" | "youtube" | "instagram" | "facebook";
  label: string;
  url: string;
}

export interface WPFooterColumn {
  column_title: string;
  links: { label: string; url: string }[];
}

export interface WPFinalCta {
  eyebrow: string;
  title: string;
  description: string;
  primary_cta_label: string;
  primary_cta_href: string;
  secondary_cta_label: string;
  secondary_cta_href: string;
}

export interface WPProblemSolutionPair {
  problem: string;
  solution: string;
}

export interface WPProcessStep {
  step_number: string;
  title: string;
  description: string;
}

export interface WPSettings {
  site_name: string;
  logo_url: string;
  logo_width: number;
  logo_height: number;
  header_cta_label: string;
  header_demo_cta_label: string;
  copyright_text: string;
  contact_email: string;
  contact_phone_display: string;
  contact_phone_tel: string;
  contact_whatsapp_url: string;
  contact_address: string;
  contact_maps_url: string;
  social_links: WPSocialLink[];
  footer_description: string;
  footer_columns: WPFooterColumn[];
  final_cta: WPFinalCta;
  problem_solution_pairs: WPProblemSolutionPair[];
  process_steps_eyebrow: string;
  process_steps_title: string;
  process_steps_description: string;
  process_steps: WPProcessStep[];
}

export interface WPFeatureCard {
  icon: string;
  title: string;
  description: string;
}

export interface WPStat {
  value: string;
  label: string;
}

export interface WPHomePageContent {
  hero_subtitle: string;
  hero_title: string;
  hero_description: string;
  hero_primary_cta_label: string;
  hero_primary_cta_href: string;
  hero_secondary_cta_label: string;
  hero_secondary_cta_href: string;
  hero_youtube_url: string;
  about_eyebrow: string;
  about_heading: string;
  about_heading_highlight: string;
  about_paragraph_1: string;
  about_paragraph_2: string;
  about_cta_label: string;
  about_features: WPFeatureCard[];
  stats: WPStat[];
  problem_solution_eyebrow: string;
  problem_solution_title: string;
  problem_solution_description: string;
  testimonials_eyebrow: string;
  testimonials_title: string;
  testimonials_description: string;
  faq_section_eyebrow: string;
  faq_section_title: string;
  faq_section_description: string;
  newsletter_heading: string;
  newsletter_description: string;
}

export interface WPTestimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
}

/**
 * All content comes from WordPress exclusively through WPGraphQL (a single
 * POST to /graphql), not the REST API — REST stays registered on the WP side
 * for wp-admin/back-compat purposes only.
 */
async function graphql<T>(query: string, variables?: Record<string, unknown>): Promise<T | null> {
  try {
    const res = await fetch(WORDPRESS_GRAPHQL_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json.errors) return null;
    return json.data as T;
  } catch {
    return null;
  }
}

function stripTags(html: string | null | undefined): string {
  return html?.replace(/<[^>]*>/g, "") ?? "";
}

// ---------------------------------------------------------------------------
// Blog posts (native WP `post` type)
// ---------------------------------------------------------------------------

interface GQLPostNode {
  databaseId: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  modified: string;
  authorName: string | null;
  featuredImage: { node: { sourceUrl: string } } | null;
  categories: { nodes: { name: string }[] };
  tags: { nodes: { name: string }[] };
}

const POST_FIELDS = `
  databaseId
  slug
  title
  excerpt
  content
  date
  modified
  authorName
  featuredImage { node { sourceUrl } }
  categories { nodes { name } }
  tags { nodes { name } }
`;

function mapGqlPost(p: GQLPostNode): WPPost {
  return {
    id: p.databaseId,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    content: p.content,
    date: p.date,
    modified: p.modified,
    featuredImage: p.featuredImage?.node?.sourceUrl ?? undefined,
    author: p.authorName ?? "",
    categories: p.categories.nodes.map((c) => c.name),
    tags: p.tags.nodes.map((t) => t.name),
  };
}

export async function getWPPosts(_page = 1, perPage = 9): Promise<{ posts: WPPost[]; total: number; totalPages: number }> {
  const data = await graphql<{ posts: { nodes: GQLPostNode[] } }>(`
    query GetPosts($first: Int) {
      posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
        nodes { ${POST_FIELDS} }
      }
    }
  `, { first: perPage });

  if (!data) return { posts: [], total: 0, totalPages: 0 };

  const posts = data.posts.nodes.map(mapGqlPost);
  return { posts, total: posts.length, totalPages: 1 };
}

export async function getWPPostBySlug(slug: string): Promise<WPPost | null> {
  const data = await graphql<{ post: GQLPostNode | null }>(`
    query GetPostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) { ${POST_FIELDS} }
    }
  `, { slug });

  if (!data?.post) return null;
  return mapGqlPost(data.post);
}

// ---------------------------------------------------------------------------
// FAQs
// ---------------------------------------------------------------------------

export async function getWPFaqs(): Promise<WPFaq[]> {
  const data = await graphql<{
    faqs: { nodes: { databaseId: number; title: string; content: string; faqCategories: { nodes: { name: string }[] } }[] };
  }>(`
    query GetFaqs {
      faqs(first: 50) {
        nodes {
          databaseId
          title
          content
          faqCategories { nodes { name } }
        }
      }
    }
  `);

  if (!data) return [];

  return data.faqs.nodes.map((f) => ({
    id: f.databaseId,
    question: f.title,
    answer: stripTags(f.content),
    category: f.faqCategories.nodes[0]?.name ?? "General",
  }));
}

// ---------------------------------------------------------------------------
// Nav menu
// ---------------------------------------------------------------------------

export async function getWPMenu(location: "PRIMARY" = "PRIMARY"): Promise<WPMenuItem[] | null> {
  const data = await graphql<{ menuItems: { nodes: { databaseId: number; label: string; uri: string; target: string | null }[] } }>(`
    query GetMenu($location: MenuLocationEnum!) {
      menuItems(where: { location: $location }) {
        nodes { databaseId label uri target }
      }
    }
  `, { location });

  if (!data || data.menuItems.nodes.length === 0) return null;

  return data.menuItems.nodes.map((item) => ({
    id: item.databaseId,
    title: item.label,
    url: item.uri,
    target: item.target ?? "",
  }));
}

// ---------------------------------------------------------------------------
// Site settings (options page)
// ---------------------------------------------------------------------------

interface GQLSiteSettings {
  siteName: string;
  logo: { node: { sourceUrl: string; mediaDetails: { width: number; height: number } } } | null;
  headerCtaLabel: string;
  headerDemoCtaLabel: string;
  copyrightText: string;
  contactEmail: string;
  contactPhoneDisplay: string;
  contactPhoneTel: string;
  contactWhatsappUrl: string;
  contactAddress: string;
  contactMapsUrl: string;
  footerDescription: string;
  socialLinks: { network: string[] | string; label: string; url: string }[];
  footerColumns: { columnTitle: string; links: { label: string; url: string }[] }[];
  finalCta: {
    eyebrow: string; title: string; description: string;
    primaryCtaLabel: string; primaryCtaHref: string;
    secondaryCtaLabel: string; secondaryCtaHref: string;
  };
  problemSolutionPairs: { problem: string; solution: string }[];
  processStepsEyebrow: string;
  processStepsTitle: string;
  processStepsDescription: string;
  processSteps: { stepNumber: string; title: string; description: string }[];
}

export async function getWPSettings(): Promise<WPSettings | null> {
  const data = await graphql<{ siteSettingsPage: { siteSettings: GQLSiteSettings } }>(`
    query GetSettings {
      siteSettingsPage {
        siteSettings {
          siteName
          logo { node { sourceUrl mediaDetails { width height } } }
          headerCtaLabel
          headerDemoCtaLabel
          copyrightText
          contactEmail
          contactPhoneDisplay
          contactPhoneTel
          contactWhatsappUrl
          contactAddress
          contactMapsUrl
          footerDescription
          socialLinks { network label url }
          footerColumns { columnTitle links { label url } }
          finalCta {
            eyebrow title description
            primaryCtaLabel primaryCtaHref
            secondaryCtaLabel secondaryCtaHref
          }
          problemSolutionPairs { problem solution }
          processStepsEyebrow
          processStepsTitle
          processStepsDescription
          processSteps { stepNumber title description }
        }
      }
    }
  `);

  const s = data?.siteSettingsPage?.siteSettings;
  if (!s || !s.contactEmail) return null;

  return {
    site_name: s.siteName,
    logo_url: s.logo?.node?.sourceUrl ?? "",
    logo_width: s.logo?.node?.mediaDetails?.width ?? 0,
    logo_height: s.logo?.node?.mediaDetails?.height ?? 0,
    header_cta_label: s.headerCtaLabel,
    header_demo_cta_label: s.headerDemoCtaLabel,
    copyright_text: s.copyrightText,
    contact_email: s.contactEmail,
    contact_phone_display: s.contactPhoneDisplay,
    contact_phone_tel: s.contactPhoneTel,
    contact_whatsapp_url: s.contactWhatsappUrl,
    contact_address: s.contactAddress,
    contact_maps_url: s.contactMapsUrl,
    footer_description: s.footerDescription,
    social_links: s.socialLinks.map((link) => ({
      network: (Array.isArray(link.network) ? link.network[0] : link.network) as WPSocialLink["network"],
      label: link.label,
      url: link.url,
    })),
    footer_columns: s.footerColumns.map((col) => ({
      column_title: col.columnTitle,
      links: col.links,
    })),
    final_cta: {
      eyebrow: s.finalCta.eyebrow,
      title: s.finalCta.title,
      description: s.finalCta.description,
      primary_cta_label: s.finalCta.primaryCtaLabel,
      primary_cta_href: s.finalCta.primaryCtaHref,
      secondary_cta_label: s.finalCta.secondaryCtaLabel,
      secondary_cta_href: s.finalCta.secondaryCtaHref,
    },
    problem_solution_pairs: s.problemSolutionPairs,
    process_steps_eyebrow: s.processStepsEyebrow,
    process_steps_title: s.processStepsTitle,
    process_steps_description: s.processStepsDescription,
    process_steps: s.processSteps.map((step) => ({
      step_number: step.stepNumber,
      title: step.title,
      description: step.description,
    })),
  };
}

// ---------------------------------------------------------------------------
// Home page content
// ---------------------------------------------------------------------------

interface GQLHomePageContent {
  heroSubtitle: string;
  heroTitle: string;
  heroDescription: string;
  heroPrimaryCtaLabel: string;
  heroPrimaryCtaHref: string;
  heroSecondaryCtaLabel: string;
  heroSecondaryCtaHref: string;
  heroYoutubeUrl: string;
  aboutEyebrow: string;
  aboutHeading: string;
  aboutHeadingHighlight: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  aboutCtaLabel: string;
  aboutFeatures: { icon: string; title: string; description: string }[];
  stats: { value: string; label: string }[];
  problemSolutionEyebrow: string;
  problemSolutionTitle: string;
  problemSolutionDescription: string;
  testimonialsEyebrow: string;
  testimonialsTitle: string;
  testimonialsDescription: string;
  faqSectionEyebrow: string;
  faqSectionTitle: string;
  faqSectionDescription: string;
  newsletterHeading: string;
  newsletterDescription: string;
}

export async function getWPHomePage(): Promise<WPHomePageContent | null> {
  const data = await graphql<{ pageBy: { homePageContent: GQLHomePageContent } | null }>(`
    query GetHomePage {
      pageBy(uri: "home") {
        homePageContent {
          heroSubtitle heroTitle heroDescription
          heroPrimaryCtaLabel heroPrimaryCtaHref
          heroSecondaryCtaLabel heroSecondaryCtaHref
          heroYoutubeUrl
          aboutEyebrow aboutHeading aboutHeadingHighlight
          aboutParagraph1 aboutParagraph2 aboutCtaLabel
          aboutFeatures { icon title description }
          stats { value label }
          problemSolutionEyebrow problemSolutionTitle problemSolutionDescription
          testimonialsEyebrow testimonialsTitle testimonialsDescription
          faqSectionEyebrow faqSectionTitle faqSectionDescription
          newsletterHeading newsletterDescription
        }
      }
    }
  `);

  const c = data?.pageBy?.homePageContent;
  if (!c || !c.heroTitle) return null;

  return {
    hero_subtitle: c.heroSubtitle,
    hero_title: c.heroTitle,
    hero_description: c.heroDescription,
    hero_primary_cta_label: c.heroPrimaryCtaLabel,
    hero_primary_cta_href: c.heroPrimaryCtaHref,
    hero_secondary_cta_label: c.heroSecondaryCtaLabel,
    hero_secondary_cta_href: c.heroSecondaryCtaHref,
    hero_youtube_url: c.heroYoutubeUrl,
    about_eyebrow: c.aboutEyebrow,
    about_heading: c.aboutHeading,
    about_heading_highlight: c.aboutHeadingHighlight,
    about_paragraph_1: c.aboutParagraph1,
    about_paragraph_2: c.aboutParagraph2,
    about_cta_label: c.aboutCtaLabel,
    about_features: c.aboutFeatures,
    stats: c.stats,
    problem_solution_eyebrow: c.problemSolutionEyebrow,
    problem_solution_title: c.problemSolutionTitle,
    problem_solution_description: c.problemSolutionDescription,
    testimonials_eyebrow: c.testimonialsEyebrow,
    testimonials_title: c.testimonialsTitle,
    testimonials_description: c.testimonialsDescription,
    faq_section_eyebrow: c.faqSectionEyebrow,
    faq_section_title: c.faqSectionTitle,
    faq_section_description: c.faqSectionDescription,
    newsletter_heading: c.newsletterHeading,
    newsletter_description: c.newsletterDescription,
  };
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export async function getWPTestimonials(): Promise<WPTestimonial[] | null> {
  const data = await graphql<{
    testimonials: { nodes: { databaseId: number; content: string; testimonialDetails: { author: string; role: string; company: string } }[] };
  }>(`
    query GetTestimonials {
      testimonials(first: 20) {
        nodes {
          databaseId
          content
          testimonialDetails { author role company }
        }
      }
    }
  `);

  if (!data) return null;

  return data.testimonials.nodes.map((t) => ({
    id: t.databaseId,
    quote: stripTags(t.content),
    author: t.testimonialDetails.author,
    role: t.testimonialDetails.role,
    company: t.testimonialDetails.company,
  }));
}

// ---------------------------------------------------------------------------
// Case studies (Our Work)
// ---------------------------------------------------------------------------

export interface WPCaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  description: string;
  imageSrc?: string;
  tags: string[];
  results?: string;
  challenge?: string;
  approach?: string;
}

export async function getWPCaseStudies(): Promise<WPCaseStudy[]> {
  const data = await graphql<{
    caseStudies: {
      nodes: {
        slug: string;
        title: string;
        content: string;
        featuredImage: { node: { sourceUrl: string } } | null;
        caseStudyDetails: { client: string; results: string; challenge: string; approach: string };
        industries: { nodes: { name: string }[] };
        caseStudyTags: { nodes: { name: string }[] };
      }[];
    };
  }>(`
    query GetCaseStudies {
      caseStudies(first: 50) {
        nodes {
          slug
          title
          content
          featuredImage { node { sourceUrl } }
          caseStudyDetails { client results challenge approach }
          industries { nodes { name } }
          caseStudyTags { nodes { name } }
        }
      }
    }
  `);

  if (!data) return [];

  return data.caseStudies.nodes.map((cs) => ({
    slug: cs.slug,
    title: cs.title,
    client: cs.caseStudyDetails.client,
    industry: cs.industries.nodes[0]?.name ?? "",
    description: stripTags(cs.content),
    imageSrc: cs.featuredImage?.node?.sourceUrl || undefined,
    tags: cs.caseStudyTags.nodes.map((t) => t.name),
    results: cs.caseStudyDetails.results || undefined,
    challenge: cs.caseStudyDetails.challenge || undefined,
    approach: cs.caseStudyDetails.approach || undefined,
  }));
}

// ---------------------------------------------------------------------------
// Our Work page content
// ---------------------------------------------------------------------------

export interface WPOurWorkPageContent {
  hero_eyebrow: string;
  hero_title: string;
  hero_description: string;
  stats: WPStat[];
  single_cta_eyebrow: string;
  single_cta_title: string;
  single_cta_description: string;
}

export async function getWPOurWorkPage(): Promise<WPOurWorkPageContent | null> {
  const data = await graphql<{
    pageBy: {
      ourWorkPageContent: {
        heroEyebrow: string; heroTitle: string; heroDescription: string;
        stats: { value: string; label: string }[];
        singleCtaEyebrow: string; singleCtaTitle: string; singleCtaDescription: string;
      };
    } | null;
  }>(`
    query GetOurWorkPage {
      pageBy(uri: "our-work") {
        ourWorkPageContent {
          heroEyebrow heroTitle heroDescription
          stats { value label }
          singleCtaEyebrow singleCtaTitle singleCtaDescription
        }
      }
    }
  `);

  const c = data?.pageBy?.ourWorkPageContent;
  if (!c || !c.heroTitle) return null;

  return {
    hero_eyebrow: c.heroEyebrow,
    hero_title: c.heroTitle,
    hero_description: c.heroDescription,
    stats: c.stats,
    single_cta_eyebrow: c.singleCtaEyebrow,
    single_cta_title: c.singleCtaTitle,
    single_cta_description: c.singleCtaDescription,
  };
}

// ---------------------------------------------------------------------------
// Safety videos (WP-managed, not the YouTube Data API)
// ---------------------------------------------------------------------------

export async function getWPSafetyVideos(): Promise<YouTubeVideo[]> {
  const data = await graphql<{
    safetyVideos: { nodes: { title: string; content: string | null; date: string; safetyVideoDetails: { youtubeUrl: string } }[] };
  }>(`
    query GetSafetyVideos {
      safetyVideos(first: 50, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          title
          content
          date
          safetyVideoDetails { youtubeUrl }
        }
      }
    }
  `);

  if (!data) return [];

  return data.safetyVideos.nodes
    .map((v): YouTubeVideo | null => {
      const youtubeId = extractYouTubeId(v.safetyVideoDetails.youtubeUrl);
      if (!youtubeId) return null;
      return {
        id: youtubeId,
        title: v.title,
        description: stripTags(v.content),
        thumbnailUrl: getYouTubeThumbnail(youtubeId, "hq"),
        publishedAt: v.date,
      };
    })
    .filter((v): v is YouTubeVideo => v !== null);
}

// ---------------------------------------------------------------------------
// Safety videos page content
// ---------------------------------------------------------------------------

export interface WPSafetyVideosPageContent {
  hero_eyebrow: string;
  hero_title: string;
  hero_description: string;
  hero_cta_label: string;
  hero_cta_href: string;
  categories: string[];
  production_features: { title: string; description: string }[];
}

export async function getWPSafetyVideosPage(): Promise<WPSafetyVideosPageContent | null> {
  const data = await graphql<{
    pageBy: {
      safetyVideosPageContent: {
        heroEyebrow: string; heroTitle: string; heroDescription: string;
        heroCtaLabel: string; heroCtaHref: string;
        categories: { name: string }[];
        productionFeatures: { title: string; description: string }[];
      };
    } | null;
  }>(`
    query GetSafetyVideosPage {
      pageBy(uri: "safety-videos") {
        safetyVideosPageContent {
          heroEyebrow heroTitle heroDescription
          heroCtaLabel heroCtaHref
          categories { name }
          productionFeatures { title description }
        }
      }
    }
  `);

  const c = data?.pageBy?.safetyVideosPageContent;
  if (!c || !c.heroTitle) return null;

  return {
    hero_eyebrow: c.heroEyebrow,
    hero_title: c.heroTitle,
    hero_description: c.heroDescription,
    hero_cta_label: c.heroCtaLabel,
    hero_cta_href: c.heroCtaHref,
    categories: c.categories.map((cat) => cat.name),
    production_features: c.productionFeatures,
  };
}
