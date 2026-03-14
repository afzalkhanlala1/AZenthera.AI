"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/Button";
import type { CaseStudy } from "@/lib/data";

interface CaseStudyPageTemplateProps {
  caseStudy: CaseStudy;
}

export function CaseStudyPageTemplate({ caseStudy }: CaseStudyPageTemplateProps) {
  return (
    <>
      <AnimatedSection className="bg-surface py-24 relative overflow-hidden">
        <div className="hero-grid absolute inset-0 opacity-50" />
        <div className="radial-fade absolute inset-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6">
              {caseStudy.category}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">{caseStudy.title}</span>
            </h1>
            <div className="flex flex-wrap gap-6 text-text-muted mb-6">
              <span>
                <strong className="text-foreground/90">Client:</strong>{" "}
                {caseStudy.client}
              </span>
              <span>
                <strong className="text-foreground/90">Duration:</strong>{" "}
                {caseStudy.duration}
              </span>
            </div>
            <p className="text-text-muted text-lg leading-relaxed">
              {caseStudy.description}
            </p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-20" delay={0.1}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            The Problem
          </h2>
          <div className="glass-card rounded-2xl p-8 border-l-4 border-rose-500/60">
            <p className="text-foreground/90 leading-relaxed">{caseStudy.problem}</p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-20 bg-surface/50" delay={0.1}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            Our Solution
          </h2>
          <div className="glass-card rounded-2xl p-8 border-l-4 border-accent-secondary/60">
            <p className="text-foreground/90 leading-relaxed">
              {caseStudy.solution}
            </p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-20" delay={0.1}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            Architecture
          </h2>
          <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent/10 via-accent-secondary/10 to-accent/10 opacity-50" />
            <div className="absolute inset-0 rounded-2xl border border-border" />
            <div className="relative">
              <p className="text-foreground/90 leading-relaxed mb-8">
                {caseStudy.architecture}
              </p>
              <div className="h-48 rounded-xl bg-surface/80 border border-border flex items-center justify-center">
                <span className="text-text-muted text-sm">
                  Architecture diagram placeholder
                </span>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-20 bg-surface/50" delay={0.1}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            Tech Stack
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {caseStudy.techStack.map((tech, index) => (
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

      <AnimatedSection className="py-20" delay={0.1}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
            Results
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {caseStudy.results.map((result, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-8 text-center"
              >
                <p className="text-text-muted text-sm font-medium mb-2">
                  {result.metric}
                </p>
                <p className="text-3xl md:text-4xl font-bold gradient-text mb-3">
                  {result.value}
                </p>
                <p className="text-foreground/80 text-sm">{result.description}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-24" delay={0.1}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Have a Similar Project?
          </h2>
          <p className="text-text-muted text-lg mb-8">
            Let&apos;s discuss how we can help you achieve similar results.
          </p>
          <Button href="/contact" variant="primary" size="lg">
            Get in Touch
          </Button>
        </div>
      </AnimatedSection>
    </>
  );
}
