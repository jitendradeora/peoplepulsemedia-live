"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { getYouTubeEmbedUrl } from "@/lib/youtube";
import type { YouTubeVideo } from "@/lib/youtube";
import { formatDate } from "@/lib/utils";

interface VideoCardProps {
  video: YouTubeVideo;
}

export default function VideoCard({ video }: VideoCardProps) {
  const [showPlayer, setShowPlayer] = useState(false);
  const embedUrl = getYouTubeEmbedUrl(video.id);

  return (
    <>
      <article className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#E8521A]/20 hover:shadow-lg transition-all duration-300">
        {/* Thumbnail */}
        <button
          onClick={() => setShowPlayer(true)}
          className="relative w-full aspect-video overflow-hidden bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8521A]"
          aria-label={`Play video: ${video.title}`}
        >
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <Play className="w-6 h-6 text-[#E8521A] fill-current ml-1" aria-hidden="true" />
            </div>
          </div>
        </button>

        {/* Info */}
        <div className="p-5">
          <h3 className="font-bold text-[#0A0A0A] text-sm leading-snug mb-2 line-clamp-2 group-hover:text-[#E8521A] transition-colors">
            {video.title}
          </h3>
          <p className="text-gray-400 text-xs">
            <time dateTime={video.publishedAt}>{formatDate(video.publishedAt)}</time>
            {video.viewCount && (
              <> · {parseInt(video.viewCount).toLocaleString()} views</>
            )}
          </p>
        </div>
      </article>

      {/* Modal Player */}
      {showPlayer && (
        <div
          className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setShowPlayer(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`Video: ${video.title}`}
        >
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setShowPlayer(false)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white flex items-center gap-2 text-sm"
              aria-label="Close video player"
            >
              <X className="w-5 h-5" />
              Close
            </button>
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl">
              <iframe
                src={`${embedUrl}&autoplay=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <h2 className="mt-4 text-white font-semibold text-sm">{video.title}</h2>
          </div>
        </div>
      )}
    </>
  );
}
