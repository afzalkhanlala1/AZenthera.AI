"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  href?: string;
  index?: number;
}

export function ServiceCard({
  icon,
  title,
  description,
  href,
  index = 0,
}: ServiceCardProps) {
  return (
    <AnimatedSection delay={index * 0.1}>
      <motion.div
        className="glass-card rounded-2xl p-6 md:p-8 h-full flex flex-col"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6C63FF]/20 to-[#00D4AA]/20 flex items-center justify-center text-2xl mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
        <p className="text-text-muted text-sm leading-relaxed flex-grow">
          {description}
        </p>
        {href && (
          <Link
            href={href}
            className="mt-4 inline-flex items-center gap-2 text-accent hover:text-accent-secondary transition-colors text-sm font-medium"
          >
            Learn more
            <span aria-hidden>→</span>
          </Link>
        )}
      </motion.div>
    </AnimatedSection>
  );
}
