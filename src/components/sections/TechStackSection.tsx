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

        <div className="mt-16 space-y-10">
          {techStack.map((category, categoryIndex) => (
            <AnimatedSection
              key={category.category}
              delay={categoryIndex * 0.1}
            >
              <div>
                <h3 className="text-lg font-semibold text-accent mb-4">
                  {category.category}
                </h3>
                <motion.div
                  className="flex flex-wrap gap-3"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                >
                  {category.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      className="glass-card rounded-full px-4 py-2 text-sm text-text-muted hover:text-foreground hover:border-accent/50 transition-colors"
                      variants={{
                        hidden: { opacity: 0, y: 10 },
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
