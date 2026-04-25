"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface CaseStudyCardProps {
  title: string;
  category: string;
  description: string;
  slug: string;
  results?: { metric: string; value: string; description: string }[];
  index?: number;
}

export function CaseStudyCard({
  title,
  category,
  description,
  slug,
  results,
  index = 0,
}: CaseStudyCardProps) {
  const keyResult = results?.[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="h-full"
    >
      <Link
        href={`/case-studies/${slug}`}
        className="group flex flex-col h-full border border-border hover:border-foreground bg-surface transition-colors duration-200"
      >
        {/* Top: meta + key result */}
        <div className="flex items-start justify-between p-6 border-b border-border">
          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-text-subtle">
              {category}
            </p>
            <p className="mt-2 font-mono text-[10.5px] tabular-nums text-text-subtle">
              CS/{String(index + 1).padStart(2, "0")}
            </p>
          </div>
          {keyResult && (
            <div className="text-right">
              <p className="text-[34px] lg:text-[40px] leading-none tracking-[-0.04em] font-medium text-foreground tabular-nums">
                {keyResult.value}
              </p>
              <p className="mt-1.5 text-[10.5px] uppercase tracking-[0.1em] text-text-muted">
                {keyResult.metric}
              </p>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 p-6 flex flex-col">
          <h3 className="font-display text-[24px] lg:text-[28px] leading-[1.1] tracking-[-0.015em] text-foreground">
            {title}
          </h3>
          <p className="mt-3 text-[13.5px] leading-[1.55] text-text-muted flex-grow">
            {description}
          </p>

          <span className="mt-6 inline-flex items-center gap-1.5 text-[12.5px] text-foreground tracking-tight">
            <span className="link-underline">Read case</span>
            <svg
              className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
