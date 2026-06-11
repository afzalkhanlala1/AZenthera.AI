"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const clients = [
  "ClaimbAI",
  "COMCEPT",
  "AiGenius",
  "Convergent BT",
  "Adastria",
  "PlusW Tokyo",
  "Pepsi KSA",
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] as const },
});

export function Hero() {
  return (
    <section className="relative pt-[92px] md:pt-[104px] pb-16 grain">
      {/* Background canvas */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_75%_60%_at_50%_30%,#000_0%,transparent_75%)]" />
      <div className="absolute inset-x-0 top-0 h-[400px] accent-tint pointer-events-none" />

      <div className="relative max-w-[1320px] mx-auto px-6 lg:px-10">
        {/* Top meta row */}
        <motion.div
          {...fade(0)}
          className="flex flex-wrap items-center justify-between gap-4 pb-5 hairline-b"
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inset-0 rounded-full bg-signal-positive opacity-60 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal-positive" />
            </span>
            <span className="label-mono">
              Studio status: open · 2 of 4 slots booked Q2
            </span>
          </div>
          <span className="label-mono hidden md:inline">
            Islamabad ⇄ Remote · Established 2021
          </span>
        </motion.div>

        {/* Display headline — asymmetric editorial */}
        <div className="pt-10 lg:pt-14 grid lg:grid-cols-12 gap-y-10 gap-x-10">
          <div className="lg:col-span-8">
            <motion.h1
              {...fade(0.05)}
              className="font-medium tracking-[-0.035em] leading-[0.95] text-foreground text-[11.5vw] sm:text-[9.5vw] md:text-[8vw] lg:text-[clamp(3.75rem,6vw,6rem)]"
            >
              We engineer
              <br />
              <span className="serif-italic text-foreground-soft">
                production
              </span>{" "}
              AI —
              <br />
              not <span className="serif-italic text-foreground-soft">
                proofs
              </span>{" "}
              of concept.
            </motion.h1>
          </div>

          {/* Right column meta */}
          <motion.aside
            {...fade(0.18)}
            className="lg:col-span-4 lg:pt-3 lg:border-l lg:border-hairline lg:pl-10 lg:flex lg:flex-col lg:justify-between"
          >
            <div>
              <p className="eyebrow mb-4">A · 01 / Manifest</p>
              <p className="text-[15px] leading-[1.6] text-text-muted max-w-[38ch]">
                Azenthera is a small engineering studio building agent
                ecosystems, computer-vision pipelines, and data
                infrastructure that ship to production — and stay there.
              </p>
            </div>
            <div className="mt-7 flex items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 h-10 px-4 pr-1.5 rounded-full bg-foreground text-background hover:opacity-90 transition-opacity text-[13px] font-medium tracking-tight"
              >
                Start a project
                <span className="w-7 h-7 grid place-items-center rounded-full bg-background text-foreground">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
              <Link
                href="/case-studies"
                className="link-underline text-[13px] tracking-tight text-foreground"
              >
                See work
              </Link>
            </div>
          </motion.aside>
        </div>

        {/* Stat bar */}
        <motion.div
          {...fade(0.32)}
          className="mt-14 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-hairline border-y border-hairline"
        >
          {[
            { k: "Projects shipped", v: "30+", note: "to production" },
            { k: "Data processed", v: "200M", note: "rows transformed" },
            { k: "Manual work cut", v: "70%", note: "across 4 depts" },
            { k: "Edge inference", v: "+30%", note: "TensorRT-tuned" },
          ].map((stat, i) => (
            <div
              key={stat.k}
              className="bg-background px-5 py-5 lg:px-6 lg:py-6 flex flex-col gap-2.5"
            >
              <span className="font-mono text-[10.5px] text-text-subtle tabular-nums">
                {String(i + 1).padStart(2, "0")} / {stat.k}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-[32px] lg:text-[40px] leading-none tracking-[-0.04em] font-medium text-foreground tabular-nums">
                  {stat.v}
                </span>
              </div>
              <span className="text-[12px] text-text-muted">{stat.note}</span>
            </div>
          ))}
        </motion.div>

        {/* Trusted-by ticker */}
        <motion.div
          {...fade(0.42)}
          className="mt-14 lg:mt-16"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="eyebrow">Trusted across studios & teams</span>
            <span className="label-mono text-text-subtle hidden sm:inline">
              ↳ 5 countries
            </span>
          </div>

          <div className="overflow-hidden hairline-y py-5 relative">
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            <div className="marquee-track flex items-center gap-14 lg:gap-20 whitespace-nowrap">
              {[...clients, ...clients].map((c, i) => (
                <span
                  key={`${c}-${i}`}
                  className="font-display italic text-[24px] lg:text-[28px] text-text-muted/70 tracking-tight shrink-0"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
