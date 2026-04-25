"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/data";

/**
 * Compact, editorial stat strip. Used on inner pages where the hero
 * doesn't already include numbers.
 */
export function StatsSection() {
  return (
    <section className="px-6 lg:px-10">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border border-y border-border">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="bg-background px-5 py-7 lg:px-7 lg:py-9 flex flex-col gap-3"
            >
              <span className="font-mono text-[10.5px] text-text-subtle tabular-nums">
                {String(i + 1).padStart(2, "0")} / {stat.label}
              </span>
              <span className="text-[40px] lg:text-[52px] leading-none tracking-[-0.04em] font-medium text-foreground tabular-nums">
                {stat.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
