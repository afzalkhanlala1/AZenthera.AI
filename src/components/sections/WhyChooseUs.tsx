"use client";

import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedSection } from "@/components/AnimatedSection";
import { whyChooseUs } from "@/lib/data";

const icons = ["⚡", "🛡️", "🔬", "🤝"];

export function WhyChooseUs() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Why Choose Us"
          title={
            <>
              Built for <span className="gradient-text">Excellence</span>
            </>
          }
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUs.map((item, index) => (
            <AnimatedSection key={item.title} delay={index * 0.1}>
              <div className="glass-card rounded-2xl p-6 h-full relative">
                <span className="absolute top-4 right-4 text-2xl font-bold text-accent/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent-secondary/20 flex items-center justify-center text-2xl mb-4">
                  {icons[index]}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
