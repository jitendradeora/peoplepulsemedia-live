"use client";

import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-[#E8521A]/10 flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl font-bold text-[#E8521A]">!</span>
        </div>
        <h1 className="text-2xl font-bold text-[#0A0A0A] mb-3">Something went wrong</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          We encountered an unexpected error. Please try again, or return to the home page.
        </p>
        {process.env.NODE_ENV === "development" && (
          <p className="text-red-500 text-xs font-mono mb-6 bg-red-50 p-3 rounded-xl text-left overflow-auto">
            {error.message}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 bg-[#E8521A] text-white font-bold px-6 py-3 rounded-full hover:bg-[#C43F0E] transition-colors"
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-[#0A0A0A] font-bold px-6 py-3 rounded-full hover:border-[#E8521A] hover:text-[#E8521A] transition-colors"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
