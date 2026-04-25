"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface ServiceCardProps {
  icon?: string;
  title: string;
  description: string;
  href?: string;
  slug?: string;
  index?: number;
}

export function ServiceCard({
  title,
  description,
  href,
  index = 0,
}: ServiceCardProps) {
  const Inner = (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="group h-full bg-surface border border-border hover:border-foreground transition-colors duration-200 p-6 flex flex-col"
    >
      <div className="flex items-baseline justify-between mb-6">
        <span className="font-mono text-[11px] tabular-nums text-text-subtle">
          /{String(index + 1).padStart(2, "0")}
        </span>
        <span className="w-2 h-2 rounded-full bg-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <h3 className="text-[19px] tracking-[-0.02em] text-foreground leading-tight">
        {title}
      </h3>
      <p className="mt-3 text-[13.5px] leading-[1.55] text-text-muted flex-grow">
        {description}
      </p>
      {href && (
        <span className="mt-6 inline-flex items-center gap-1.5 text-[12.5px] text-foreground tracking-tight">
          <span className="link-underline">Read on</span>
          <svg
            className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      )}
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {Inner}
      </Link>
    );
  }
  return Inner;
}
