import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { getWPPostBySlug, getWPPosts, getWPSettings } from "@/lib/wordpress";
import BlogCard from "@/components/cards/BlogCard";
import ShareButton from "@/components/blog/ShareButton";
import NewsletterForm from "@/components/forms/NewsletterForm";
import JsonLd from "@/components/seo/JsonLd";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/schema";
import { absoluteUrl, formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getWPPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };
  const excerpt = post.excerpt.replace(/<[^>]*>/g, "").slice(0, 160);
  return {
    title: post.title,
    description: excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: `${post.title} | People Pulse Media Blog`,
      description: excerpt,
      url: `/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [post.author],
      ...(post.featuredImage ? { images: [{ url: post.featuredImage, width: 1200, height: 630, alt: post.title }] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, { posts: relatedPosts }, settings] = await Promise.all([
    getWPPostBySlug(slug),
    getWPPosts(1, 4),
    getWPSettings(),
  ]);

  if (!post) notFound();

  const related = relatedPosts.filter((p) => p.slug !== slug).slice(0, 3);
  const excerpt = post.excerpt.replace(/<[^>]*>/g, "").slice(0, 200);

  const schemas = [
    blogPostingSchema({
      title: post.title,
      description: excerpt,
      url: absoluteUrl(`/blog/${slug}`),
      datePublished: post.date,
      dateModified: post.modified,
      authorName: post.author,
      imageSrc: post.featuredImage,
      publisherLogoUrl: settings?.logo_url,
    }),
    breadcrumbSchema([
      { name: "Home", url: absoluteUrl("/") },
      { name: "Blog", url: absoluteUrl("/blog") },
      { name: post.title, url: absoluteUrl(`/blog/${slug}`) },
    ]),
  ];

  return (
    <>
      <JsonLd data={schemas} />

      {/* Hero */}
      <div className="bg-[#0A0A0A] pt-28 pb-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <div className="mb-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-white/40">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <span aria-hidden="true">/</span>
              <span className="text-white/70 truncate max-w-[200px]" aria-current="page">{post.title}</span>
            </nav>
          </div>

          {post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {post.categories.map((cat) => (
                <span key={cat} className="bg-[#E8521A]/20 text-[#E8521A] text-xs font-bold px-3 py-1 rounded-full">{cat}</span>
              ))}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">{post.title}</h1>

          <div className="flex items-center gap-4 text-white/40 text-sm">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            <span aria-hidden="true">·</span>
            <span>By {post.author}</span>
          </div>
        </div>

        {/* Featured image */}
        {post.featuredImage && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative aspect-[16/7] rounded-t-2xl overflow-hidden">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}
      </div>

      {/* Article */}
      <article className="bg-[#FAFAF8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-b-2xl p-8 lg:p-12 border-x border-b border-gray-100 shadow-sm mb-12">
            <div
              className="prose prose-lg max-w-none prose-headings:text-[#0A0A0A] prose-headings:font-bold prose-a:text-[#E8521A] prose-a:no-underline hover:prose-a:underline prose-blockquote:border-[#E8521A]"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share + tags */}
            <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">#{tag}</span>
                ))}
              </div>
              <ShareButton
                title={post.title}
                text={excerpt}
                url={absoluteUrl(`/blog/${slug}`)}
              />
            </div>
          </div>

          
        </div>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="py-16 bg-white border-t border-gray-100" aria-labelledby="related-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="related-heading" className="text-2xl font-bold text-[#0A0A0A] mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-16 bg-[#FAFAF8] border-t border-gray-100" aria-labelledby="blog-newsletter-heading">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="blog-newsletter-heading" className="text-2xl font-bold text-[#0A0A0A] mb-3">
            Enjoyed This? Get More in Your Inbox
          </h2>
          <p className="text-gray-500 mb-8 text-sm">
            Monthly insights on safety training, workforce onboarding, and content production.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
