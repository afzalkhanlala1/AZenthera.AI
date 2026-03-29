"use client";

import Link from "next/link";
import { AnimatedSection } from "./AnimatedSection";

interface CaseStudyCardProps {
  title: string;
  category: string;
  description: string;
  slug: string;
  results?: { metric: string; value: string; description: string }[];
  index?: number;
}

const categoryAccents: Record<string, { bg: string; text: string; border: string }> = {
  InsurTech:        { bg: "from-violet-500/12 to-accent/6",    text: "text-violet-400",  border: "border-violet-500/15" },
  "Defense & IoT":  { bg: "from-slate-500/12 to-slate-400/6",  text: "text-slate-400",   border: "border-slate-500/15" },
  "Sports Analytics": { bg: "from-green-500/12 to-emerald-500/6", text: "text-green-400", border: "border-green-500/15" },
  "Retail / FMCG":  { bg: "from-amber-500/12 to-orange-500/6", text: "text-amber-400",   border: "border-amber-500/15" },
  "Fashion Retail": { bg: "from-pink-500/12 to-rose-500/6",    text: "text-pink-400",    border: "border-pink-500/15" },
  Enterprise:       { bg: "from-blue-500/12 to-sky-500/6",     text: "text-blue-400",    border: "border-blue-500/15" },
};

const defaultAccent = { bg: "from-accent/10 to-accent/4", text: "text-accent", border: "border-accent/15" };

export function CaseStudyCard({
  title,
  category,
  description,
  slug,
  results,
  index = 0,
}: CaseStudyCardProps) {
  const accent = categoryAccents[category] ?? defaultAccent;
  const keyResult = results?.[0];

  return (
    <AnimatedSection delay={index * 0.07}>
      <Link
        href={`/case-studies/${slug}`}
        className="group block h-full bg-surface border border-border rounded-xl overflow-hidden hover:border-accent/25 transition-colors duration-200"
      >
        {/* Thumbnail */}
        <div className={`h-44 bg-gradient-to-br ${accent.bg} relative border-b border-border flex items-end p-4`}>
          {/* Key metric overlay */}
          {keyResult && (
            <div className="absolute top-4 right-4 text-right">
              <p className={`text-2xl font-bold tracking-tight ${accent.text}`}>
                {keyResult.value}
              </p>
              <p className="text-[10px] text-text-muted/60 uppercase tracking-wider mt-0.5 font-medium">
                {keyResult.metric}
              </p>
            </div>
          )}

          {/* Category badge */}
          <span
            className={`px-2.5 py-1 rounded-md bg-background/80 backdrop-blur-sm border ${accent.border} text-xs font-medium ${accent.text}`}
          >
            {category}
          </span>
        </div>

        <div className="p-5">
          <h3 className="text-[15px] font-semibold text-foreground mb-2 tracking-tight group-hover:text-accent transition-colors duration-150">
            {title}
          </h3>
          <p className="text-text-muted text-sm line-clamp-2 leading-relaxed mb-4">
            {description}
          </p>
          <span className="inline-flex items-center gap-1.5 text-accent text-sm font-medium group-hover:gap-2.5 transition-all duration-150">
            View Case Study
            <span aria-hidden>→</span>
          </span>
        </div>
      </Link>
    </AnimatedSection>
  );
}
