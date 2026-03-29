"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedSection } from "@/components/AnimatedSection";
import { techStack } from "@/lib/data";

export function TechStackSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Tech Stack"
          title={
            <>
              Built With <span className="gradient-text">Modern Tools</span>
            </>
          }
        />

        <div className="mt-14 space-y-8">
          {techStack.map((category, categoryIndex) => (
            <AnimatedSection key={category.category} delay={categoryIndex * 0.07}>
              <div>
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-3">
                  {category.category}
                </h3>
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={{
                    visible: {
                      transition: { staggerChildren: 0.04 },
                    },
                  }}
                >
                  {category.technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      className="bg-surface border border-border rounded-lg px-3 py-1.5 text-sm text-text-muted hover:text-foreground hover:border-accent/30 transition-colors cursor-default"
                      variants={{
                        hidden: { opacity: 0, y: 8 },
                        visible: { opacity: 1, y: 0 },
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
