"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { industries } from "@/lib/data";

export function IndustriesSection() {
  return (
    <section className="relative py-28 lg:py-36 px-6 lg:px-10">
      <div className="max-w-[1320px] mx-auto">
        <SectionHeading
          label="Industries"
          split
          title={
            <>
              Domains where we&apos;ve <em className="serif-italic text-text-muted">already</em> shipped.
            </>
          }
          description="Each row is a sector we've delivered into — not a list copied from a deck."
        />

        <div className="mt-20 border-t border-border">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="grid grid-cols-12 gap-4 py-6 lg:py-7 border-b border-border items-baseline"
            >
              <span className="col-span-2 lg:col-span-1 font-mono text-[11px] tabular-nums text-text-subtle">
                /{String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="col-span-10 lg:col-span-4 text-[18px] lg:text-[22px] tracking-[-0.02em] text-foreground">
                {industry.title}
              </h3>
              <p className="col-span-12 lg:col-span-7 text-[14px] leading-[1.55] text-text-muted">
                {industry.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
