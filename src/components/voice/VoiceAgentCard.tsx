"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { VoiceAgent } from "@/lib/voiceAgents";

interface VoiceAgentCardProps {
  agent: VoiceAgent;
  index: number;
}

export function VoiceAgentCard({ agent, index }: VoiceAgentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
    >
      <Link
        href={`/services/ai-agents/voice/${agent.slug}`}
        className="group card relative block h-full p-6 lg:p-7 overflow-hidden"
      >
        {/* accent wash */}
        <div
          className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
          style={{ background: agent.accent }}
        />
        <div className="relative flex items-start justify-between">
          <span
            className="w-11 h-11 grid place-items-center rounded-full text-[20px]"
            style={{ background: `color-mix(in srgb, ${agent.accent} 16%, transparent)` }}
          >
            {agent.icon}
          </span>
          <span className="font-mono text-[10.5px] tabular-nums text-text-subtle">
            V/{String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="mt-6 text-[20px] lg:text-[22px] tracking-[-0.02em] leading-tight text-foreground">
          {agent.name}
        </h3>
        <p className="mt-1.5 text-[13.5px] text-text-muted leading-snug">
          {agent.tagline}
        </p>

        <p className="mt-4 text-[13.5px] leading-[1.55] text-text-muted line-clamp-3">
          {agent.summary}
        </p>

        <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-text-muted">
            Demo · Try it live
          </span>
          <span className="text-[13px] text-text-muted group-hover:text-foreground transition-colors flex items-center gap-1.5">
            <span className="link-underline">Open</span>
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
