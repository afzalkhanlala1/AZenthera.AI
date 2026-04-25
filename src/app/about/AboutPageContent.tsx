"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { TeamSection } from "@/components/sections/TeamSection";
import { ContactCTA } from "@/components/sections/ContactCTA";

const values = [
  {
    title: "Production over polish",
    description:
      "Every line we ship is shaped by what survives Monday morning, not what looks good in a deck.",
  },
  {
    title: "Senior by default",
    description:
      "There is no junior bench to subsidise. The engineer that scopes your work is the engineer that ships it.",
  },
  {
    title: "Plain accountability",
    description:
      "Fixed scope, fixed price, written-down assumptions. If something slips we say so the same week.",
  },
  {
    title: "Long after launch",
    description:
      "We measure success by what runs in year two, not what demoed in week six. Maintenance is part of the build.",
  },
];

const facts = [
  { label: "Founded", value: "2021" },
  { label: "Engineers", value: "Senior · 2 partners" },
  { label: "Pricing", value: "Fixed-scope · Transparent" },
  { label: "Time zones", value: "GMT-7 → GMT+9" },
];

export function AboutPageContent() {
  return (
    <>
      <PageHero
        eyebrow="The studio"
        marker="A/01"
        title={
          <>
            A small <em className="serif-italic text-text-muted">engineering</em> studio
            for production AI.
          </>
        }
        description="Two senior engineers, a network of trusted specialists, and one rule: ship what works."
        meta={facts}
      />

      {/* Long-form story */}
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-[1320px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-3">
            <p className="eyebrow">Long version</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-9 space-y-7 text-[17px] lg:text-[18.5px] leading-[1.6] text-foreground-soft max-w-[60ch]"
          >
            <p>
              Azenthera is run by engineers who got tired of glossy demos that
              never made it past the quarter. We started the studio to build
              the other half — the boring half — that actually keeps systems
              running. Pipelines, observability, fail-safes, the dashboard
              your CFO opens on Monday.
            </p>
            <p>
              Our clients range from California-based AI startups to a Japanese
              fashion retailer, defence contractors, and FMCG operators inside
              PepsiCo. We&apos;ve processed over 200 million data rows, deployed
              multi-agent ecosystems for entire departments, and tuned
              real-time computer-vision models on edge hardware to within an
              inch of their thermal budget.
            </p>
            <p>
              We work as a lean, remote-first team. That means you get
              senior-level engineering at competitive rates, with the
              responsiveness of a dedicated in-house squad — and none of the
              overhead of a 200-person agency.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Manifesto / values */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 bg-background-alt hairline-y">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 mb-14">
            <div className="lg:col-span-5">
              <p className="eyebrow mb-5">Manifesto</p>
              <h2 className="font-medium text-[40px] lg:text-[56px] leading-[1.02] tracking-[-0.025em] text-foreground">
                Four things we&apos;ll <em className="serif-italic text-text-muted">never</em> compromise on.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-background p-8 lg:p-10"
              >
                <div className="flex items-baseline gap-4 mb-5">
                  <span className="font-mono text-[11px] tabular-nums text-text-subtle">
                    /0{i + 1}
                  </span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <h3 className="text-[22px] lg:text-[26px] tracking-[-0.02em] text-foreground leading-tight">
                  {v.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.6] text-text-muted">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TeamSection />
      <ContactCTA />
    </>
  );
}
