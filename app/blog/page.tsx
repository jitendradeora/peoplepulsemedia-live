import type { Metadata } from "next";
import HeroBlog from "@/components/hero/Heroblog";
import BlogCard from "@/components/cards/BlogCard";
import NewsletterForm from "@/components/forms/NewsletterForm";
import JsonLd from "@/components/seo/JsonLd";
import { webPageSchema } from "@/lib/schema";
import { getWPPosts } from "@/lib/wordpress";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog — Insights on Safety Training & Workforce Onboarding",
  description:
    "Expert insights, case studies, and guides on workplace safety, multilingual workforce training, and digital onboarding from the People Pulse Media team.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | People Pulse Media",
    description: "Insights on safety training, workforce onboarding, and content production.",
    url: "/blog",
  },
};

const categories = ["All", "Safety", "Onboarding", "Technology", "Content Strategy", "PULSYON", "Production"];

export default async function BlogPage() {
  const { posts } = await getWPPosts(1, 9);

  const schema = webPageSchema({
    name: "Blog — Insights on Safety Training & Workforce Onboarding",
    description: "Expert insights on workplace safety, multilingual training, and digital onboarding.",
    url: absoluteUrl("/blog"),
    breadcrumbs: [
      { name: "Home", url: absoluteUrl("/") },
      { name: "Blog", url: absoluteUrl("/blog") },
    ],
  });

  const [featured, ...rest] = posts;

  return (
    <>
      <JsonLd data={schema} />

      <HeroBlog
        eyebrow="The Blog"
        description="Expert perspectives from the People Pulse Media team — from safety culture to multilingual content strategy."
       />

      <section className="py-20 bg-[#FAFAF8]" aria-labelledby="blog-listing-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
   
 

          {/* Post grid */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {rest.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {/* Load more */}
          <div className="text-center">
            <button
              className="inline-flex items-center gap-2 border-2 border-[#0A0A0A] text-[#0A0A0A] font-bold px-8 py-3.5 rounded-full hover:bg-[#0A0A0A] hover:text-white transition-colors"
              aria-label="Load more articles"
            >
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-white border-t border-gray-100" aria-labelledby="newsletter-heading">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="w-6 h-0.5 bg-[#E8521A]" aria-hidden="true" />
            <span className="text-[#E8521A] text-xs font-bold uppercase tracking-[0.2em]">Newsletter</span>
          </div>
          <h2 id="newsletter-heading" className="text-2xl font-bold text-[#0A0A0A] mb-3">
            Stay Ahead in Workforce Training
          </h2>
          <p className="text-gray-500 mb-8">
            Monthly insights on safety, onboarding, and content production — direct to your inbox.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
