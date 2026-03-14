"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/Button";
import type { Service } from "@/lib/data";

interface ServicePageTemplateProps {
  service: Service;
}

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 flex-shrink-0 text-accent-secondary"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

export function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  return (
    <>
      <AnimatedSection className="bg-surface py-24 relative overflow-hidden">
        <div className="hero-grid absolute inset-0 opacity-50" />
        <div className="radial-fade absolute inset-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-5xl md:text-6xl mb-6 block">{service.icon}</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">{service.title}</span>
            </h1>
            <p className="text-text-muted text-lg md:text-xl mb-10">
              {service.heroDescription}
            </p>
            <Button href="/contact" variant="primary" size="lg">
              Get Started
            </Button>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-20" delay={0.1}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            Overview
          </h2>
          <p className="text-text-muted text-lg leading-relaxed max-w-3xl">
            {service.overview}
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-20 bg-surface/50" delay={0.1}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 flex items-start gap-4"
              >
                <CheckIcon />
                <p className="text-foreground/90">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-20" delay={0.1}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            Technologies We Use
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {service.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full glass-card text-foreground/90 text-sm font-medium border border-border"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-20 bg-surface/50" delay={0.1}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
            Key Benefits
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {service.benefits.map((benefit, index) => (
              <div
                key={index}
                className={`glass-card rounded-2xl p-6 flex items-start gap-4 ${
                  index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                }`}
              >
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                  {index + 1}
                </span>
                <p className="text-foreground/90">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-24" delay={0.1}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-text-muted text-lg mb-8">
            Let&apos;s discuss how we can help you build intelligent solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="primary" size="lg">
              Contact Us
            </Button>
            <Button href="/case-studies" variant="outline" size="lg">
              View Case Studies
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
