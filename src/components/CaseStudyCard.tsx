"use client";

import Link from "next/link";
import { AnimatedSection } from "./AnimatedSection";

interface CaseStudyCardProps {
  title: string;
  category: string;
  description: string;
  slug: string;
  index?: number;
}

export function CaseStudyCard({
  title,
  category,
  description,
  slug,
  index = 0,
}: CaseStudyCardProps) {
  return (
    <AnimatedSection delay={index * 0.1}>
      <Link
        href={`/case-studies/${slug}`}
        className="glass-card rounded-2xl overflow-hidden group block h-full hover:border-accent/50 transition-colors duration-300"
      >
        <div className="h-48 bg-gradient-to-br from-[#6C63FF]/20 to-[#00D4AA]/10 relative">
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-foreground/10 text-xs font-medium text-foreground/90 backdrop-blur-sm">
            {category}
          </span>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
            {title}
          </h3>
          <p className="text-text-muted text-sm line-clamp-2 leading-relaxed mb-4">
            {description}
          </p>
          <span className="inline-flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all">
            View Case Study
            <span aria-hidden>→</span>
          </span>
        </div>
      </Link>
    </AnimatedSection>
  );
}
