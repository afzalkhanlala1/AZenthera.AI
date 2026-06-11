"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { industries } from "@/lib/data";

const principles = [
  {
    title: "Domain expertise",
    description:
      "We learn the regulatory, operational and competitive shape of your sector before we write code. Compliance and best-practice come baked in.",
  },
  {
    title: "Faster time-to-value",
    description:
      "Pre-built patterns and industry-specific models let us start from a head-start, without sacrificing customisation.",
  },
  {
    title: "Measurable impact",
    description:
      "Every engagement is tied to numbers that matter — conversion, throughput, cost-to-serve, satisfaction.",
  },
];

export function IndustriesPageContent() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        marker="I/01"
        title={
          <>
            Sectors where our work is <em className="serif-italic text-text-muted">already</em> in production.
          </>
        }
        description="Defence, sports, retail, fintech, and a Japanese fashion empire. The industry list is a list of shipped engagements, not a wish-board."
        meta={[
          { label: "Sectors served", value: "10+" },
          { label: "Live deployments", value: "30+" },
          { label: "Continents", value: "3" },
        ]}
      />

      {/* Industry index */}
      <section className="py-12 lg:py-16 px-6 lg:px-10">
        <div className="max-w-[1320px] mx-auto border-t border-border">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="grid grid-cols-12 gap-4 py-5 border-b border-border items-baseline"
            >
              <span className="col-span-2 lg:col-span-1 font-mono text-[11px] tabular-nums text-text-subtle">
                /{String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="col-span-10 lg:col-span-4 text-[19px] lg:text-[22px] tracking-[-0.02em] text-foreground">
                {industry.title}
              </h3>
              <p className="col-span-12 lg:col-span-7 text-[14px] leading-[1.55] text-text-muted">
                {industry.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="py-14 lg:py-20 px-6 lg:px-10 bg-background-alt hairline-y">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-4">Why specialised?</p>
              <h2 className="font-display text-[30px] lg:text-[38px] leading-[1.1] tracking-[-0.02em] text-foreground">
                Generic AI <em className="serif-italic text-text-muted">falls short</em>.
              </h2>
            </div>
            <div className="lg:col-span-8 grid sm:grid-cols-3 gap-px bg-border border border-border">
              {principles.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="bg-background p-7"
                >
                  <span className="font-mono text-[10.5px] tabular-nums text-text-subtle tracking-widest">
                    /0{i + 1}
                  </span>
                  <h3 className="mt-5 text-[17px] tracking-[-0.02em] text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-[1.55] text-text-muted">
                    {p.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
