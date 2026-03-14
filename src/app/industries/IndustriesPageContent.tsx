"use client";

import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { industries } from "@/lib/data";

export function IndustriesPageContent() {
  return (
    <>
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 hero-grid" />
        <div className="absolute inset-0 radial-fade" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-center">
              Industries We <span className="gradient-text">Serve</span>
            </h1>
            <p className="text-text-muted text-lg md:text-xl text-center max-w-2xl mx-auto mt-6">
              We deliver custom AI and data solutions that streamline operations and enhance experiences across diverse
              sectors — from defense and sports analytics to retail and fintech.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <AnimatedSection key={industry.title} delay={index * 0.06}>
                <div className="glass-card rounded-2xl p-8 h-full flex flex-col">
                  <div className="text-4xl mb-4">{industry.icon}</div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{industry.title}</h3>
                  <p className="text-text-muted flex-grow leading-relaxed">{industry.description}</p>
                  <Link
                    href="/contact"
                    className="mt-4 text-accent font-medium hover:underline inline-flex items-center gap-1"
                  >
                    Learn More
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <SectionHeading
              label="Our Approach"
              title="Why Industry-Specific AI?"
              description="Generic AI solutions fall short. We build solutions that speak your industry's language."
            />
          </AnimatedSection>
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1}>
              <div className="glass-card rounded-2xl p-8">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-foreground mb-3">Domain Expertise</h3>
                <p className="text-text-muted leading-relaxed">
                  We understand the regulatory, operational, and competitive landscape of your industry. Our solutions
                  are built with compliance and best practices in mind.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="glass-card rounded-2xl p-8">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-foreground mb-3">Faster Time to Value</h3>
                <p className="text-text-muted leading-relaxed">
                  Pre-built patterns and industry-specific models accelerate delivery. You get results sooner without
                  sacrificing quality or customization.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="glass-card rounded-2xl p-8">
                <div className="text-3xl mb-4">📈</div>
                <h3 className="text-xl font-bold text-foreground mb-3">Measurable Impact</h3>
                <p className="text-text-muted leading-relaxed">
                  Tailored AI solutions deliver metrics that matter to your business—whether it&apos;s conversion rates,
                  operational efficiency, or customer satisfaction.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="glass-card rounded-3xl p-12 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Transform Your Industry?
              </h2>
              <p className="text-text-muted text-lg max-w-xl mx-auto mb-8">
                Let&apos;s discuss how AI can solve your industry-specific challenges and unlock new opportunities.
              </p>
              <Button href="/contact" variant="primary" size="lg">
                Contact Us
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
