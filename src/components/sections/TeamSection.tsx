"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedSection } from "@/components/AnimatedSection";
import { team } from "@/lib/data";

export function TeamSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Our Team"
          title={
            <>
              Meet the Engineers Behind{" "}
              <span className="gradient-text">AZenthera</span>
            </>
          }
          description="Engineers with complementary expertise spanning AI, data, and systems engineering."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {team.map((member, index) => (
            <AnimatedSection key={member.name} delay={index * 0.1}>
              <motion.div
                className="glass-card rounded-2xl p-8 h-full relative overflow-hidden"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-accent/5 blur-3xl" />

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center text-2xl font-bold text-white mb-5">
                    {member.initials}
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-accent text-sm font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-text-muted text-sm leading-relaxed mb-6">
                    {member.bio}
                  </p>

                  <div className="space-y-2">
                    {member.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="flex items-start gap-2 text-sm text-foreground/80"
                      >
                        <span className="text-accent font-semibold mt-0.5 flex-shrink-0">
                          &rarr;
                        </span>
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
