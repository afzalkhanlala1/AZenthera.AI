"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { DemoSimulationPlayer } from "./DemoSimulationPlayer";
import { voiceAgents, type VoiceAgent } from "@/lib/voiceAgents";

// Client-only: the ElevenLabs conversation hook touches browser audio APIs and
// must not run during static prerender.
const LiveTrial = dynamic(
  () => import("./LiveTrial").then((m) => m.LiveTrial),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-lg border border-border bg-surface p-6 sm:p-8 min-h-[260px] grid place-items-center">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-text-subtle">
          Loading live trial…
        </span>
      </div>
    ),
  }
);

interface VoiceAgentDetailProps {
  agent: VoiceAgent;
}

export function VoiceAgentDetail({ agent }: VoiceAgentDetailProps) {
  const idx = voiceAgents.findIndex((a) => a.slug === agent.slug);
  const others = voiceAgents.filter((a) => a.slug !== agent.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={`Voice Agent · ${agent.icon} ${agent.name}`}
        marker={`V/${String(idx + 1).padStart(2, "0")}`}
        title={
          <>
            {agent.name.split(" ")[0]}{" "}
            <span className="serif-italic text-text-muted">
              {agent.name.split(" ").slice(1).join(" ")}
            </span>
          </>
        }
        description={agent.tagline}
        meta={agent.specs.map((s) => ({ label: s.label, value: s.value }))}
      />

      {/* Breadcrumb back */}
      <div className="px-6 lg:px-10">
        <div className="max-w-[1320px] mx-auto">
          <Link
            href="/services/ai-agents/voice"
            className="link-underline text-[13px] text-text-muted hover:text-foreground"
          >
            ← All voice agents
          </Link>
        </div>
      </div>

      {/* Overview */}
      <section className="py-16 lg:py-24 px-6 lg:px-10">
        <div className="max-w-[1320px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-3">
            <p className="eyebrow">What it is</p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-9"
          >
            <p className="font-display text-[24px] lg:text-[32px] leading-[1.25] tracking-[-0.015em] text-foreground max-w-[60ch]">
              {agent.details}
            </p>
          </motion.div>
        </div>
      </section>

      {/* The two experiences */}
      <section className="py-16 lg:py-24 px-6 lg:px-10 bg-background-alt hairline-y">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 mb-12">
            <div className="lg:col-span-5">
              <p className="eyebrow mb-5">See it work</p>
              <h2 className="font-medium text-[36px] lg:text-[52px] leading-[1.02] tracking-[-0.025em] text-foreground">
                Watch, then <em className="serif-italic text-text-muted">try it</em>.
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pt-4">
              <p className="text-[15.5px] leading-[1.55] text-text-muted max-w-[48ch]">
                On the left, a recorded call shows the {agent.name.toLowerCase()} in a
                realistic scenario. On the right, hand it your own website and talk to
                it live for three minutes.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 items-start">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-text-muted">
                  01 · Demo
                </span>
                <span className="h-px flex-1 bg-hairline" />
              </div>
              <DemoSimulationPlayer agent={agent} />
              <p className="mt-3 text-[12.5px] text-text-muted">
                Scenario: {agent.demo.scenario}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-text-muted">
                  02 · Try it yourself
                </span>
                <span className="h-px flex-1 bg-hairline" />
              </div>
              <LiveTrial agent={agent} />
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities + ideal for */}
      <section className="py-16 lg:py-24 px-6 lg:px-10">
        <div className="max-w-[1320px] mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6">Capabilities</p>
            <ul className="border-t border-border">
              {agent.capabilities.map((cap, i) => (
                <li
                  key={cap}
                  className="grid grid-cols-12 gap-4 py-5 border-b border-border items-baseline"
                >
                  <span className="col-span-2 lg:col-span-1 font-mono text-[11px] tabular-nums text-text-subtle">
                    /{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="col-span-10 lg:col-span-11 text-[15.5px] lg:text-[17px] tracking-[-0.01em] text-foreground">
                    {cap}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">Ideal for</p>
            <div className="flex flex-wrap gap-2.5">
              {agent.idealFor.map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-full border border-border text-[13.5px] text-foreground-soft"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-10 p-6 border border-border bg-surface rounded-lg">
              <p className="font-display text-[22px] leading-[1.15] tracking-[-0.015em] text-foreground">
                Want this for your team?
              </p>
              <p className="mt-2 text-[13.5px] leading-[1.55] text-text-muted">
                We&apos;ll wire it to your phone number, calendar, and tools — and
                tune it to your scripts.
              </p>
              <Link
                href={`/contact?subject=${encodeURIComponent(
                  "AI Agents & Automation"
                )}&agent=${encodeURIComponent(agent.name)}`}
                className="mt-5 inline-flex items-center gap-2 h-11 pl-5 pr-1.5 rounded-full bg-foreground text-background hover:opacity-90 transition-opacity text-[14px] font-medium tracking-tight"
              >
                Build my {agent.name}
                <span className="w-8 h-8 grid place-items-center rounded-full bg-background text-foreground">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Other agents */}
      <section className="py-16 lg:py-24 px-6 lg:px-10 bg-background-alt hairline-y">
        <div className="max-w-[1320px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <p className="eyebrow">More voice agents</p>
            <Link
              href="/services/ai-agents/voice"
              className="link-underline text-[13.5px] text-foreground"
            >
              See all →
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {others.map((a) => (
              <Link
                key={a.slug}
                href={`/services/ai-agents/voice/${a.slug}`}
                className="group card p-6 flex items-start gap-4"
              >
                <span
                  className="w-10 h-10 shrink-0 grid place-items-center rounded-full text-[18px]"
                  style={{ background: `color-mix(in srgb, ${a.accent} 16%, transparent)` }}
                >
                  {a.icon}
                </span>
                <div>
                  <h3 className="text-[16px] tracking-[-0.015em] text-foreground group-hover:text-accent transition-colors">
                    {a.name}
                  </h3>
                  <p className="mt-1 text-[12.5px] text-text-muted leading-snug line-clamp-2">
                    {a.tagline}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
