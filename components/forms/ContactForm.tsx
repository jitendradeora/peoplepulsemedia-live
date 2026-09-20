"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle, Loader2, AlertCircle, ChevronDown } from "lucide-react";

const BOOKING_SERVICES = ["Book a Meeting", "Book a PULSYON Demo"];

interface Field {
  id: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select" | "datetime-local";
  placeholder?: string;
  required?: boolean;
  options?: string[];
  autocomplete?: string;
}

const fields: Field[] = [
  { id: "name", label: "Full Name", type: "text", placeholder: "John Smith", required: true, autocomplete: "name" },
  { id: "email", label: "Email Address", type: "email", placeholder: "john@company.com", required: true, autocomplete: "email" },
  { id: "phone", label: "Phone / WhatsApp", type: "tel", placeholder: "+971 55 600 8978", autocomplete: "tel" },
  { id: "company", label: "Company", type: "text", placeholder: "Your company name", autocomplete: "organization" },
  {
    id: "service",
    label: "I'm interested in",
    type: "select",
    required: true,
    options: [
      "Safety Video Production",
      "PULSYON — Onboarding & Assessment",
      "Digital Content Creation",
      "Book a Meeting",
      "Book a PULSYON Demo",
      "Other / General Enquiry",
    ],
  },
  {
    id: "preferredTime",
    label: "Preferred meeting time",
    type: "datetime-local",
  },
  { id: "message", label: "Message", type: "textarea", placeholder: "Tell us about your project or requirements…", required: true },
];

type FormData = Record<string, string>;

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    function applyBookingHash() {
      if (window.location.hash === "#book") {
        setFormData((prev) => ({ ...prev, service: "Book a Meeting" }));
      }
    }
    applyBookingHash();
    window.addEventListener("hashchange", applyBookingHash);
    return () => window.removeEventListener("hashchange", applyBookingHash);
  }, []);

  function isBooking() {
    return BOOKING_SERVICES.includes(formData.service ?? "");
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    fields.forEach((f) => {
      const required = f.required || (f.id === "preferredTime" && isBooking());
      if (required && !formData[f.id]?.trim()) {
        newErrors[f.id] = `${f.label} is required`;
      }
      if (f.type === "email" && formData[f.id] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[f.id])) {
        newErrors[f.id] = "Please enter a valid email address";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function updateField(id: string, value: string) {
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => { const n = { ...prev }; delete n[id]; return n; });
  }

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-[#0A0A0A] mb-2">Message Sent!</h3>
        <p className="text-gray-500">Thanks for getting in touch. We&rsquo;ll respond within 1 business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact form" className="space-y-5">
      {fields.map((field) => {
        const hasError = !!errors[field.id];
        const inputClass = `w-full px-4 py-3 rounded-xl border text-sm text-[#0A0A0A] placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
          hasError
            ? "border-red-300 bg-red-50 focus:ring-red-500"
            : "border-gray-200 bg-white focus:ring-[#E8521A] focus:border-transparent"
        }`;
        return (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-sm font-semibold text-[#0A0A0A] mb-1.5">
              {field.label}
              {(field.required || (field.id === "preferredTime" && isBooking())) && (
                <span className="text-[#E8521A] ml-1" aria-label="required">*</span>
              )}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.id}
                value={formData[field.id] ?? ""}
                onChange={(e) => updateField(field.id, e.target.value)}
                placeholder={field.placeholder}
                rows={4}
                aria-required={field.required}
                aria-invalid={hasError}
                aria-describedby={hasError ? `${field.id}-error` : undefined}
                className={`${inputClass} resize-none`}
              />
            ) : field.type === "datetime-local" ? (
              <>
                <input
                  id={field.id}
                  type="datetime-local"
                  value={formData[field.id] ?? ""}
                  onChange={(e) => updateField(field.id, e.target.value)}
                  aria-required={isBooking()}
                  aria-invalid={hasError}
                  aria-describedby={hasError ? `${field.id}-error` : `${field.id}-hint`}
                  className={inputClass}
                />
                <p id={`${field.id}-hint`} className="mt-1.5 text-xs text-gray-400">
                  Optional unless you are booking a meeting or demo. We will confirm the time by email or WhatsApp.
                </p>
              </>
            ) : field.type === "select" ? (
              <div className="relative">
                <select
                  id={field.id}
                  value={formData[field.id] ?? ""}
                  onChange={(e) => updateField(field.id, e.target.value)}
                  aria-required={field.required}
                  aria-invalid={hasError}
                  aria-describedby={hasError ? `${field.id}-error` : undefined}
                  className={`${inputClass} appearance-none pr-14`}
                >
                  <option value="">Select an option</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  aria-hidden="true"
                />
              </div>
            ) : (
              <input
                id={field.id}
                type={field.type}
                value={formData[field.id] ?? ""}
                onChange={(e) => updateField(field.id, e.target.value)}
                placeholder={field.placeholder}
                autoComplete={field.autocomplete}
                aria-required={field.required}
                aria-invalid={hasError}
                aria-describedby={hasError ? `${field.id}-error` : undefined}
                className={inputClass}
              />
            )}
            {hasError && (
              <p id={`${field.id}-error`} role="alert" className="mt-1.5 text-red-600 text-xs flex items-center gap-1">
                <AlertCircle className="w-3 h-3" aria-hidden="true" />
                {errors[field.id]}
              </p>
            )}
          </div>
        );
      })}

      {status === "error" && (
        <div role="alert" className="rounded-xl bg-red-50 border border-red-200 p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0" aria-hidden="true" />
          <p className="text-red-700 text-sm">Something went wrong. Please try again or email us directly.</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 bg-[#E8521A] text-white font-bold py-4 rounded-xl hover:bg-[#C43F0E] transition-colors disabled:opacity-60 text-sm"
      >
        {status === "loading" ? (
          <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Sending…</>
        ) : (
          "Send Message"
        )}
      </button>

      <p className="text-gray-400 text-xs text-center">
        We&rsquo;ll respond within 1 business day. All information is kept confidential.
      </p>
    </form>
  );
}
