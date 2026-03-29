"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  href?: string;
  slug?: string;
  index?: number;
}

const serviceIconMap: Record<string, React.ReactNode> = {
  "ai-development": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  "ai-agents": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  ),
  "computer-vision": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  "ml-deep-learning": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  "data-engineering": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <ellipse cx="12" cy="5" rx="9" ry="3" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  "data-analytics": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  "generative-ai": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  "web-saas": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
};

export function ServiceCard({
  icon,
  title,
  description,
  href,
  slug,
  index = 0,
}: ServiceCardProps) {
  const svgIcon = slug ? serviceIconMap[slug] : null;

  return (
    <AnimatedSection delay={index * 0.055}>
      <motion.div
        className="group bg-background border border-border rounded-xl p-6 h-full flex flex-col hover:border-accent/25 transition-colors duration-200"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.15 }}
      >
        <div className="w-10 h-10 rounded-xl bg-accent/8 border border-accent/12 flex items-center justify-center text-accent mb-5 group-hover:bg-accent/12 transition-colors duration-200">
          {svgIcon ?? <span className="text-lg leading-none">{icon}</span>}
        </div>
        <h3 className="text-[15px] font-semibold text-foreground mb-2 tracking-tight">
          {title}
        </h3>
        <p className="text-text-muted text-sm leading-relaxed flex-grow">
          {description}
        </p>
        {href && (
          <Link
            href={href}
            className="mt-5 inline-flex items-center gap-1 text-accent text-sm font-medium group-hover:gap-2 transition-all duration-150"
          >
            Learn more
            <span
              aria-hidden
              className="transition-transform duration-150 group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        )}
      </motion.div>
    </AnimatedSection>
  );
}
