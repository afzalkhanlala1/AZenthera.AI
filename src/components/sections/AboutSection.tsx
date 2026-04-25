"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";

const highlights = [
  { k: "Years shipping", v: "5+" },
  { k: "Countries served", v: "5" },
  { k: "Engineers", v: "Senior" },
  { k: "Pricing model", v: "Fixed-scope" },
];

export function AboutSection() {
  return (
    <section className="relative py-28 lg:py-36 px-6 lg:px-10">
      <div className="max-w-[1320px] mx-auto">
        <SectionHeading
          label="The studio"
          split
          title={
            <>
              A small team of engineers — <em className="serif-italic text-text-muted">remote-first</em>,
              accountable, and senior by default.
            </>
          }
        />

        <div className="mt-20 grid lg:grid-cols-12 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6 text-[16.5px] leading-[1.65] text-text-muted"
          >
            <p>
              Azenthera is run by engineers who got tired of glossy demos that
              never made it past the quarter. We started the studio to build the
              other half — the boring half — that actually keeps systems
              running. Pipelines, observability, fail-safes, the dashboard your
              CFO opens on Monday.
            </p>
            <p>
              Our clients range from California-based AI startups to a Japanese
              fashion retailer, defence contractors, and FMCG operators inside
              PepsiCo. We work as a lean, remote-first team — senior-level
              engineering with the responsiveness of an in-house squad.
            </p>
            <div className="pt-4">
              <Link
                href="/about"
                className="link-underline text-[14px] tracking-tight text-foreground"
              >
                Read the long version →
              </Link>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <figure className="border-l-2 border-foreground pl-6 py-2">
              <blockquote className="font-display text-[24px] lg:text-[28px] leading-[1.2] tracking-[-0.015em] text-foreground">
                Technology should be an enabler — not a barrier. We ship what
                works in production, then we keep it working.
              </blockquote>
              <figcaption className="mt-5 text-[13px] text-text-muted">
                Afzal Khan · AI Engineer, Co-founder
              </figcaption>
            </figure>

            <dl className="mt-10 grid grid-cols-2 gap-px bg-border border border-border">
              {highlights.map((h) => (
                <div key={h.k} className="bg-surface px-5 py-5">
                  <dd className="text-[24px] tracking-[-0.025em] text-foreground tabular-nums">
                    {h.v}
                  </dd>
                  <dt className="mt-1 text-[11.5px] text-text-muted">{h.k}</dt>
                </div>
              ))}
            </dl>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
