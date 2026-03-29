"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { stats } from "@/lib/data";

function AnimatedStatCounter({
  value,
  isInView,
}: {
  value: string;
  isInView: boolean;
}) {
  const numericMatch = value.match(/(\d+)/);
  const suffix = value.replace(/\d+/, "").trimStart();
  const prefix = value.replace(/\d+.*$/, "").trimEnd();
  const num = numericMatch ? parseInt(numericMatch[1], 10) : 0;

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1200;
    const steps = 50;
    const increment = num / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) {
        setCount(num);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, num]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section className="border-y border-border py-16 px-6 bg-surface/30" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4"
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`text-center py-4 md:py-0 ${
                index < stats.length - 1
                  ? "border-r border-border/60 px-6 md:px-10"
                  : "px-6 md:px-10"
              } ${index >= 2 ? "border-t border-border/60 md:border-t-0 pt-8 md:pt-0" : ""}`}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.07 }}
            >
              <div className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-2">
                <AnimatedStatCounter value={stat.value} isInView={isInView} />
              </div>
              <p className="text-text-muted text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
