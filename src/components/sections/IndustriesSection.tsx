"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedSection } from "@/components/AnimatedSection";
import { industries } from "@/lib/data";

export function IndustriesSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Industries"
          title={
            <>
              Trusted Across <span className="gradient-text">Industries</span>
            </>
          }
        />

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <AnimatedSection key={industry.title} delay={index * 0.08}>
              <motion.div
                className="glass-card rounded-2xl p-6 glow-border h-full transition-all duration-300"
                whileHover={{
                  borderColor: "rgba(108, 99, 255, 0.5)",
                  boxShadow: "0 0 30px rgba(108, 99, 255, 0.15)",
                }}
              >
                <div className="text-3xl mb-4">{industry.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {industry.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {industry.description}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
