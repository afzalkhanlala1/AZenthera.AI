"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  /** Short uppercase eyebrow such as "Studio" or "Industries". */
  eyebrow: string;
  /** Number marker rendered in the meta row (e.g. "P/03"). Optional. */
  marker?: string;
  /** Main display heading. Use <em> for serif italic emphasis. */
  title: React.ReactNode;
  /** Supporting paragraph. */
  description?: React.ReactNode;
  /** Optional right column meta lines. */
  meta?: { label: string; value: string }[];
}

export function PageHero({
  eyebrow,
  marker,
  title,
  description,
  meta,
}: PageHeroProps) {
  return (
    <section className="relative pt-[92px] md:pt-[104px] pb-12 lg:pb-14 px-6 lg:px-10 grain">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none [mask-image:radial-gradient(ellipse_70%_50%_at_50%_30%,#000,transparent_75%)]" />
      <div className="absolute inset-x-0 top-0 h-[300px] accent-tint pointer-events-none" />

      <div className="relative max-w-[1320px] mx-auto">
        {/* Meta strip */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between pb-5 hairline-b"
        >
          <div className="flex items-center gap-3">
            {marker && (
              <span className="font-mono text-[11px] text-text-subtle tracking-widest tabular-nums">
                {marker}
              </span>
            )}
            <span className="h-px w-8 bg-border-strong" aria-hidden />
            <span className="eyebrow !text-foreground-soft">{eyebrow}</span>
          </div>
          <span className="label-mono hidden sm:inline">
            Azenthera · An engineering studio
          </span>
        </motion.div>

        {/* Title block */}
        <div className="pt-9 lg:pt-12 grid lg:grid-cols-12 gap-y-8 gap-x-12">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="lg:col-span-8 font-medium tracking-[-0.03em] leading-[1] text-foreground text-[10vw] sm:text-[8vw] md:text-[6.5vw] lg:text-[clamp(2.75rem,4.6vw,4.5rem)]"
          >
            {title}
          </motion.h1>

          <motion.aside
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="lg:col-span-4 lg:pt-2 lg:border-l lg:border-hairline lg:pl-10"
          >
            {description && (
              <p className="text-[15px] leading-[1.55] text-text-muted max-w-[36ch]">
                {description}
              </p>
            )}
            {meta && (
              <dl className="mt-6 space-y-2.5">
                {meta.map((m) => (
                  <div
                    key={m.label}
                    className="flex items-baseline justify-between gap-4 text-[12.5px]"
                  >
                    <dt className="font-mono text-text-subtle">{m.label}</dt>
                    <dd className="text-foreground tracking-tight text-right">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
