"use client";

import { useState } from "react";

const subjectOptions = [
  "AI Agents & Automation",
  "AI Integration",
  "Computer Vision",
  "ML / Deep Learning",
  "Data Engineering",
  "Data Analytics & BI",
  "Generative AI",
  "Web & SaaS",
  "Other",
];

// Endpoint for receiving form submissions.
// Default: Formsubmit.co (no signup, free, just one-time email confirmation).
// Override via NEXT_PUBLIC_CONTACT_ENDPOINT to use Web3Forms / Formspree / your own API.
const CONTACT_EMAIL = "afzaljawadkhan@gmail.com";
const ENDPOINT =
  process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ||
  `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

const inputClass =
  "w-full bg-transparent border-0 border-b border-border text-foreground placeholder:text-text-subtle focus:outline-none focus:border-foreground transition-colors py-3 text-[15px] tracking-tight";

const labelClass =
  "block font-mono text-[10.5px] uppercase tracking-[0.14em] text-text-muted mb-2";

// Force-light styling on native <option> dropdowns so they're readable in dark mode.
// Browsers ignore most CSS on options; inline style is the reliable cross-platform fix.
const optionStyle = { color: "#15151a", backgroundColor: "#ffffff" };

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload: Record<string, string> = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      company: String(data.get("company") || "").trim() || "—",
      subject: String(data.get("subject") || ""),
      message: String(data.get("message") || ""),
      _subject: `New brief — ${data.get("subject") || "general"} — ${data.get("name") || ""}`,
      _template: "table",
      _captcha: "false",
    };

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Submission failed (${res.status})`);
      }

      setDone(true);
      form.reset();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Email us directly instead."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="py-12 text-center">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-signal-positive mb-5">
          ✓ Message received
        </p>
        <h3 className="font-display text-[34px] leading-[1.1] tracking-[-0.015em] text-foreground">
          Thanks — we&apos;ll be in touch{" "}
          <em className="serif-italic text-text-muted">soon</em>.
        </h3>
        <p className="mt-3 text-[14px] text-text-muted">
          Expect a reply within one working day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-7">
      <div className="flex items-baseline justify-between mb-2">
        <h2 className="font-display text-[28px] tracking-[-0.015em] text-foreground">
          Send a brief
        </h2>
        <span className="font-mono text-[10.5px] text-text-subtle tabular-nums">
          F/01
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-7">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@studio.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-7">
        <div>
          <label htmlFor="company" className={labelClass}>
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder="Optional"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="subject" className={labelClass}>
            Engagement type
          </label>
          <select
            id="subject"
            name="subject"
            required
            className={`${inputClass} appearance-none cursor-pointer pr-8 [background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239a9aa3'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.75' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_0.25rem_center] bg-[length:1rem]`}
            defaultValue=""
          >
            <option value="" disabled style={optionStyle}>
              Select…
            </option>
            {subjectOptions.map((o) => (
              <option key={o} value={o} style={optionStyle}>
                {o}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          What are you building?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="A few sentences is enough. Goals, constraints, timeline."
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && (
        <div className="border border-signal-warning/40 bg-signal-warning/5 px-4 py-3 text-[13px] text-signal-warning">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] mr-2">
            Error
          </span>
          {error} You can also email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="underline hover:text-foreground"
          >
            {CONTACT_EMAIL}
          </a>{" "}
          directly.
        </div>
      )}

      <div className="pt-4 flex items-center justify-between gap-4">
        <p className="text-[12px] text-text-muted max-w-[28ch]">
          We use your details only to reply — never for marketing.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 h-12 pl-5 pr-1.5 rounded-full bg-foreground text-background hover:opacity-90 disabled:opacity-60 transition-opacity text-[14px] tracking-tight font-medium"
        >
          {submitting ? "Sending…" : "Send brief"}
          <span className="w-9 h-9 grid place-items-center rounded-full bg-background text-foreground">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </button>
      </div>
    </form>
  );
}
