"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/Button";

const reassurances = [
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: "Response within 24 hours",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    text: "Free technical consultation",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    text: "Detailed proposal included",
  },
];

export function ContactCTA() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 hero-grid opacity-60" />
      <div className="absolute inset-0 radial-fade" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <div className="inline-flex items-center text-xs font-medium text-accent bg-accent/8 border border-accent/15 rounded-full px-3 py-1 mb-8 tracking-wide">
            Work With Us
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.15] text-foreground mb-5">
            Let&apos;s Build{" "}
            <span className="gradient-text">Together</span>
          </h2>

          <p className="text-[17px] text-text-muted leading-relaxed mb-10 max-w-xl mx-auto">
            Tell us about your project. We&apos;ll scope your requirements,
            suggest an architecture, and send you a detailed proposal — all in
            the first call.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-10">
            <Button href="/contact" variant="primary" size="lg">
              Book a Free Consultation →
            </Button>
            <Button href="/case-studies" variant="secondary" size="lg">
              View Our Work
            </Button>
          </div>

          {/* Reassurance strip */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-text-muted">
            {reassurances.map((item) => (
              <span key={item.text} className="flex items-center gap-2">
                <span className="text-accent/60">{item.icon}</span>
                {item.text}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
