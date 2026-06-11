"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { processSteps } from "@/lib/data";

const week = ["wk 0", "wk 1", "wk 2-N", "wk N+", "ongoing"];

export function ProcessSection() {
  return (
    <section className="relative py-16 lg:py-24 px-6 lg:px-10">
      <div className="max-w-[1320px] mx-auto">
        <SectionHeading
          index="04"
          label="Engagement"
          split
          title={
            <>
              From discovery to deploy — a <em className="serif-italic text-text-muted">five-act</em> rhythm
              we don&apos;t skip.
            </>
          }
          description="No black-box quotes, no surprise pivots. Every project moves through the same five phases — sized to your scope."
        />

        <div className="mt-10 lg:mt-14 relative">
          {/* Horizontal connector for desktop */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-[18px] left-0 right-0 h-px bg-border"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-border border border-border lg:bg-transparent lg:border-none">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="relative bg-background lg:bg-transparent p-6 lg:px-6 lg:py-0 lg:pr-10"
              >
                {/* Step indicator */}
                <div className="lg:flex lg:items-center lg:gap-3">
                  <span className="inline-flex w-9 h-9 rounded-full border border-foreground bg-background text-foreground items-center justify-center font-mono text-[12px] tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="lg:ml-auto label-mono text-text-subtle">
                    {week[index]}
                  </span>
                </div>

                <h3 className="mt-5 text-[17px] lg:text-[18px] tracking-[-0.02em] text-foreground leading-snug">
                  {step.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-[1.55] text-text-muted max-w-[28ch]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
