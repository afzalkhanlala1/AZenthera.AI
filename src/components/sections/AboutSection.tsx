"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { AnimatedSection } from "@/components/AnimatedSection";

export function AboutSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <SectionHeading
            label="About Us"
            title={
              <>
                Who We Are &amp;{" "}
                <span className="gradient-text">Our Story</span>
              </>
            }
            description="Engineers building production-grade AI and data systems for global clients."
          />
        </AnimatedSection>

        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <AnimatedSection delay={0.1} direction="right">
              <p className="text-text-muted text-lg leading-relaxed">
                AZenthera AI was founded by engineers who share a passion for
                building intelligent systems that solve real business problems.
                With complementary expertise spanning AI engineering, computer
                vision, data science, and business intelligence, we deliver
                end-to-end solutions from proof-of-concept to production
                deployment.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2} direction="right">
              <p className="text-text-muted leading-relaxed">
                Our clients range from California-based startups to Japanese fashion
                retailers, from defense contractors to FMCG giants like PepsiCo.
                We operate as a lean, remote-first team — which means you get
                senior-level engineering talent with the flexibility and
                responsiveness of a dedicated in-house team.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3} direction="right">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "🎓", title: "Expert Engineers", desc: "Top-tier engineering talent" },
                  { icon: "🌍", title: "Global Clients", desc: "USA, Japan, UAE, Europe" },
                  { icon: "⚡", title: "Production-Grade", desc: "Not demos — real systems" },
                  { icon: "🤝", title: "Transparent Pricing", desc: "No hidden costs or surprises" },
                ].map((hl) => (
                  <div key={hl.title} className="glass-card rounded-xl p-4 text-center">
                    <div className="text-2xl mb-2">{hl.icon}</div>
                    <div className="text-sm font-semibold text-foreground">{hl.title}</div>
                    <div className="text-xs text-text-muted mt-1">{hl.desc}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4} direction="right">
              <Button href="/about" variant="primary" size="lg">
                Learn More About Us
              </Button>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.2} direction="left">
            <motion.div
              className="glass-card rounded-2xl p-8 h-full"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-6xl text-accent/30 font-serif block mb-4">
                &ldquo;
              </span>
              <p className="text-lg text-text-muted leading-relaxed italic mb-6">
                We believe technology should be an enabler, not a barrier. Our
                goal is to empower businesses with AI that works — intelligent,
                reliable, and built for scale. Not demos, not wrappers — real
                production systems.
              </p>
              <div>
                <p className="text-foreground font-semibold">Afzal Khan</p>
                <p className="text-text-muted text-sm">AI Engineer, Co-founder</p>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
