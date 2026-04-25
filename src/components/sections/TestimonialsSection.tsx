"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { testimonials } from "@/lib/data";

export function TestimonialsSection() {
  const featured = testimonials[0];
  const rest = testimonials.slice(1, 5);

  return (
    <section className="relative py-28 lg:py-36 px-6 lg:px-10">
      <div className="max-w-[1320px] mx-auto">
        <SectionHeading
          index="06"
          label="In their words"
          split
          title={
            <>
              Words from teams who <em className="serif-italic text-text-muted">kept</em> shipping after launch.
            </>
          }
          description="Five engagements, one pattern: production-grade systems still running long after the last sprint."
        />

        <div className="mt-20 grid lg:grid-cols-12 gap-10">
          {/* Featured */}
          <motion.figure
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col"
          >
            <span className="font-display italic text-[120px] leading-[0.6] text-accent/40 select-none">
              &ldquo;
            </span>
            <blockquote className="mt-2 font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.02em] text-foreground">
              {featured.quote}
            </blockquote>
            <figcaption className="mt-10 pt-6 border-t border-border flex items-center justify-between gap-6">
              <div>
                <p className="text-[14px] tracking-tight text-foreground">
                  {featured.name}
                </p>
                <p className="text-[12.5px] text-text-muted mt-0.5">
                  {featured.role}
                </p>
              </div>
              <span className="font-mono text-[10.5px] text-text-subtle tabular-nums">
                01 / {String(testimonials.length).padStart(2, "0")}
              </span>
            </figcaption>
          </motion.figure>

          {/* Compact list */}
          <div className="lg:col-span-5 lg:pl-10 lg:border-l lg:border-border space-y-px bg-border border border-border rounded-sm overflow-hidden">
            {rest.map((t, i) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-surface p-6"
              >
                <blockquote className="text-[14.5px] leading-[1.55] text-foreground-soft">
                  {t.quote.length > 140
                    ? t.quote.slice(0, 138).trimEnd() + "…"
                    : t.quote}
                </blockquote>
                <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                  <span className="text-[12.5px] text-foreground tracking-tight">
                    {t.company}
                  </span>
                  <span className="text-[11.5px] text-text-muted">{t.role}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
