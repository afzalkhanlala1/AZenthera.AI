"use client";

import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedSection } from "@/components/AnimatedSection";
import { processSteps } from "@/lib/data";

export function ProcessSection() {
  return (
    <section className="py-24 px-6 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="How We Work"
          title={
            <>
              Our <span className="gradient-text">Process</span>
            </>
          }
          description="A proven framework from discovery to production."
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {processSteps.map((step, index) => (
            <AnimatedSection key={step.number} delay={index * 0.07}>
              <div className="relative bg-background border border-border rounded-xl p-5 h-full">
                {/* Step number */}
                <span className="font-mono text-[11px] font-semibold text-accent/50 tracking-wider mb-4 block">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[15px] font-semibold text-foreground mb-2 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
