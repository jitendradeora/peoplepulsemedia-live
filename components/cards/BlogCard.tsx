import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { formatDate, truncate } from "@/lib/utils";
import type { WPPost } from "@/lib/wordpress";

interface BlogCardProps {
  post: WPPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const href = `/blog/${post.slug}`;
  const excerpt = truncate(post.excerpt.replace(/<[^>]*>/g, ""), 140);

  return (
    <article
      className={`group relative rounded-3xl overflow-hidden bg-white border border-gray-100 hover:border-[#E8521A]/20 hover:shadow-xl hover:shadow-[#E8521A]/5 transition-all duration-300 ${
        featured ? "md:grid md:grid-cols-2" : "flex flex-col"
      }`}
    >
      <Link
        href={href}
        className="absolute inset-0 z-10"
        aria-label={`Read article: ${post.title}`}
      />

      <div className={`relative overflow-hidden bg-gray-100 ${featured ? "min-h-[280px]" : "aspect-[16/9]"}`}>
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#E8521A]/20 to-[#0A0A0A]/10 flex items-center justify-center">
            <span className="text-[#E8521A] text-4xl font-bold opacity-20">PPM</span>
          </div>
        )}
        {post.categories.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {post.categories.slice(0, 2).map((cat) => (
              <span key={cat} className="bg-white/90 backdrop-blur-sm text-[#0A0A0A] text-xs font-bold px-3 py-1 rounded-full">
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="p-6 lg:p-8 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
          <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.author && (
            <>
              <span aria-hidden="true">·</span>
              <span>{post.author}</span>
            </>
          )}
        </div>

        <h3 className={`font-bold text-[#0A0A0A] leading-snug mb-3 group-hover:text-[#E8521A] transition-colors ${
          featured ? "text-2xl lg:text-3xl" : "text-lg"
        }`}>
          {post.title}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5">{excerpt}</p>

        <div className="inline-flex items-center gap-2 text-[#E8521A] font-semibold text-sm">
          Read article
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </div>
      </div>
    </article>
  );
}
