"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Subscription failed");
      setStatus("success");
      setEmail("");
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-6 py-5">
        <CheckCircle className="w-5 h-5 text-green-600 shrink-0" aria-hidden="true" />
        <p className="text-green-700 font-medium">You&rsquo;re subscribed! Look out for insights from People Pulse Media.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Newsletter subscription">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
            placeholder="Your email address"
            required
            autoComplete="email"
            className="w-full px-5 py-3.5 rounded-full border border-gray-200 bg-white text-[#0A0A0A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8521A] focus:border-transparent text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading" || !email}
          className="inline-flex items-center justify-center gap-2 bg-[#E8521A] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#C43F0E] transition-colors disabled:opacity-60 text-sm whitespace-nowrap"
        >
          {status === "loading" ? (
            <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Subscribing…</>
          ) : (
            <>Subscribe <ArrowRight className="w-4 h-4" aria-hidden="true" /></>
          )}
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className="mt-2 text-red-600 text-sm px-2">{errorMsg}</p>
      )}
    </form>
  );
}
