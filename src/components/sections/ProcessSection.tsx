"use client";

import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedSection } from "@/components/AnimatedSection";
import { processSteps } from "@/lib/data";

export function ProcessSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          label="How We Work"
          title={
            <>
              Our <span className="gradient-text">Process</span>
            </>
          }
        />

        <div className="mt-16 relative">
          {/* Vertical connecting line - centered on md+ */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-accent/30 to-transparent -translate-x-px" />

          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <AnimatedSection key={step.number} delay={index * 0.15}>
                <div
                  className={`relative flex gap-6 md:gap-8 items-start ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Number circle - always left on mobile */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center font-bold text-white text-lg">
                      {step.number}
                    </div>
                  </div>

                  {/* Content - zigzag: odd steps align right on desktop */}
                  <div
                    className={`flex-1 min-w-0 ${
                      index % 2 === 1 ? "md:text-right" : ""
                    }`}
                  >
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-text-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Spacer for zigzag - fills opposite side */}
                  <div className="hidden md:block flex-1" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
