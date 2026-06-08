"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { voiceAgents } from "@/lib/voiceAgents";

export function VoiceAgentsPromo() {
  return (
    <section className="py-20 lg:py-28 px-6 lg:px-10 bg-background-alt hairline-y overflow-hidden">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[11px] tabular-nums text-text-subtle tracking-widest">
                ★
              </span>
              <span className="h-px w-8 bg-border-strong" aria-hidden />
              <span className="eyebrow !text-foreground-soft">Voice Agents · live</span>
            </div>
            <h2 className="font-medium text-[40px] lg:text-[56px] leading-[1.02] tracking-[-0.025em] text-foreground">
              Hear our voice agents <em className="serif-italic text-text-muted">in action</em>.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="text-[15.5px] leading-[1.55] text-text-muted max-w-[44ch]">
              Pick an agent, watch a real call, then hand it your own website and
              talk to it live. No demo booking required.
            </p>
            <Link
              href="/services/ai-agents/voice"
              className="mt-6 inline-flex items-center gap-2 h-12 pl-5 pr-1.5 rounded-full bg-foreground text-background hover:opacity-90 transition-opacity text-[14px] font-medium tracking-tight"
            >
              Explore voice agents
              <span className="w-9 h-9 grid place-items-center rounded-full bg-background text-foreground">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-px bg-hairline border border-hairline rounded-lg overflow-hidden">
          {voiceAgents.map((agent, i) => (
            <motion.div
              key={agent.slug}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                href={`/services/ai-agents/voice/${agent.slug}`}
                className="group bg-background h-full p-5 flex flex-col gap-3 hover:bg-surface-elev transition-colors"
              >
                <span
                  className="w-10 h-10 grid place-items-center rounded-full text-[18px]"
                  style={{ background: `color-mix(in srgb, ${agent.accent} 16%, transparent)` }}
                >
                  {agent.icon}
                </span>
                <span className="text-[14.5px] tracking-[-0.015em] text-foreground leading-tight group-hover:text-accent transition-colors">
                  {agent.name}
                </span>
                <span className="text-[12px] text-text-muted leading-snug mt-auto">
                  {agent.tagline}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
