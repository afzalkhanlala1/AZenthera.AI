"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/Button";

export function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 hero-grid" />
      <div className="absolute inset-0 radial-fade" />

      <motion.div
        className="absolute w-96 h-96 rounded-full bg-[#6C63FF]/20 blur-3xl -top-32 -left-32"
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-[#00D4AA]/15 blur-3xl top-1/2 -right-20"
        animate={{ y: [0, 25, 0], x: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-[#6C63FF]/10 blur-3xl bottom-20 left-1/3"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 w-full px-6 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm border border-accent/30 bg-accent/5 text-accent mb-6">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Available for new projects
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Enterprise AI & Data Solutions,{" "}
              <span className="gradient-text">Delivered</span>
            </motion.h1>

            <motion.p
              className="text-lg text-text-muted max-w-xl mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              AZenthera AI builds production-grade AI systems — from intelligent
              agents and computer vision to scalable data pipelines and executive
              dashboards. Remote-first team, world-class engineering.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button href="/contact" variant="primary" size="lg">
                Start a Project &rarr;
              </Button>
              <Button href="/case-studies" variant="secondary" size="lg">
                View Case Studies
              </Button>
            </motion.div>
          </div>

          {/* Hero Visual Card */}
          <motion.div
            className="hidden lg:flex justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="glass-card rounded-2xl p-8 w-full max-w-md">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs text-text-muted ml-2">
                  azenthera-dashboard.tsx
                </span>
              </div>
              <div className="space-y-2.5 mb-6">
                <div className="h-3 rounded-full bg-accent/15 w-3/4" />
                <div className="h-3 rounded-full bg-[#6C63FF]/10 w-[90%]" />
                <div className="h-3 rounded-full bg-accent-secondary/10 w-3/5" />
                <div className="h-3 rounded-full bg-accent/8 w-4/5" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "97%", label: "Accuracy" },
                  { value: "<50ms", label: "Latency" },
                  { value: "24/7", label: "Uptime" },
                  { value: "10+", label: "AI Agents" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-background/60 border border-border rounded-xl p-4 text-center"
                  >
                    <div className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-text-muted uppercase tracking-widest mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
