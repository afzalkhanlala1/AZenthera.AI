"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/Button";

const clients = ["ClaimbAI", "COMCEPT", "AiGenius", "Convergent BT", "Adastria"];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 hero-grid" />
      <div className="absolute inset-0 radial-fade" />
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-accent/[0.028] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 w-full px-6 py-28 md:py-36">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="inline-flex items-center gap-2.5 border border-border rounded-full px-4 py-1.5 mb-8 bg-surface/60">
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                </span>
                <span className="text-xs text-text-muted font-medium">
                  Available for new projects
                </span>
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.08] text-foreground"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              Production AI,{" "}
              <br className="hidden sm:block" />
              Not Proofs of{" "}
              <span className="gradient-text">Concept</span>
            </motion.h1>

            <motion.p
              className="text-[17px] text-text-muted max-w-lg mt-6 leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
            >
              We engineer LLM agent ecosystems, computer vision pipelines, and
              scalable data infrastructure — from first prototype to live
              deployment. Real systems. Measurable results.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 mt-9"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
            >
              <Button href="/contact" variant="primary" size="lg">
                Start a Project →
              </Button>
              <Button href="/case-studies" variant="secondary" size="lg">
                View Case Studies
              </Button>
            </motion.div>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-5 text-xs text-text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.38 }}
            >
              {[
                "30+ projects shipped",
                "MIT-trained engineers",
                "Clients in 5 countries",
              ].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <svg
                    className="w-3.5 h-3.5 text-green-500 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {item}
                </span>
              ))}
            </motion.div>

            {/* Client logos strip */}
            <motion.div
              className="mt-10 pt-8 border-t border-border/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.52 }}
            >
              <p className="text-[11px] uppercase tracking-[0.1em] text-text-muted/50 font-medium mb-4">
                Trusted by teams at
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2.5">
                {clients.map((client) => (
                  <span
                    key={client}
                    className="text-sm font-semibold text-text-muted/35 tracking-tight"
                  >
                    {client}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Terminal / code visualization */}
          <motion.div
            className="hidden lg:flex justify-center"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <div className="w-full max-w-[430px] space-y-3">
              {/* Code terminal — always dark */}
              <div
                className="rounded-2xl overflow-hidden shadow-2xl shadow-black/25"
                style={{ background: "#0c0c11", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                {/* Window chrome */}
                <div
                  className="flex items-center gap-1.5 px-4 py-3"
                  style={{ background: "#101016", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,95,86,0.65)" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,189,46,0.65)" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(39,201,63,0.65)" }} />
                  <span className="text-[11px] font-mono ml-2.5" style={{ color: "#555" }}>
                    agent_pipeline.py
                  </span>
                  <span
                    className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-md"
                    style={{ color: "#8b85ff", background: "rgba(108,99,255,0.14)" }}
                  >
                    production
                  </span>
                </div>

                {/* Code body */}
                <div className="px-5 py-4 font-mono text-[12px] leading-[1.85]">
                  <p>
                    <span style={{ color: "#c678dd" }}>from</span>{" "}
                    <span style={{ color: "#61afef" }}>langchain.agents</span>{" "}
                    <span style={{ color: "#c678dd" }}>import</span>{" "}
                    <span style={{ color: "#e5c07b" }}>AgentExecutor</span>
                  </p>
                  <p>
                    <span style={{ color: "#c678dd" }}>from</span>{" "}
                    <span style={{ color: "#61afef" }}>google.adk</span>{" "}
                    <span style={{ color: "#c678dd" }}>import</span>{" "}
                    <span style={{ color: "#e5c07b" }}>Pipeline</span>
                  </p>
                  <p>&nbsp;</p>
                  <p style={{ color: "#5c6370" }}># Initialize multi-agent workflow</p>
                  <p>
                    <span style={{ color: "#e5c07b" }}>pipeline</span>{" "}
                    <span style={{ color: "#abb2bf" }}>=</span>{" "}
                    <span style={{ color: "#e5c07b" }}>Pipeline</span>
                    <span style={{ color: "#abb2bf" }}>(</span>
                  </p>
                  <p>
                    <span style={{ color: "#abb2bf" }}>{"  "}agents</span>
                    <span style={{ color: "#abb2bf" }}>=</span>
                    <span style={{ color: "#abb2bf" }}>[</span>
                    <span style={{ color: "#98c379" }}>&quot;sales&quot;</span>
                    <span style={{ color: "#abb2bf" }}>,</span>{" "}
                    <span style={{ color: "#98c379" }}>&quot;hr&quot;</span>
                    <span style={{ color: "#abb2bf" }}>,</span>{" "}
                    <span style={{ color: "#98c379" }}>&quot;ops&quot;</span>
                    <span style={{ color: "#abb2bf" }}>],</span>
                  </p>
                  <p>
                    <span style={{ color: "#abb2bf" }}>{"  "}model</span>
                    <span style={{ color: "#abb2bf" }}>=</span>
                    <span style={{ color: "#98c379" }}>&quot;gemini-2.0-pro&quot;</span>
                  </p>
                  <p>
                    <span style={{ color: "#abb2bf" }}>)</span>
                  </p>
                  <p>&nbsp;</p>
                  <p>
                    <span style={{ color: "#e5c07b" }}>pipeline</span>
                    <span style={{ color: "#abb2bf" }}>.</span>
                    <span style={{ color: "#61afef" }}>deploy</span>
                    <span style={{ color: "#abb2bf" }}>(</span>
                    <span style={{ color: "#d19a66" }}>env</span>
                    <span style={{ color: "#abb2bf" }}>=</span>
                    <span style={{ color: "#98c379" }}>&quot;production&quot;</span>
                    <span style={{ color: "#abb2bf" }}>)</span>
                  </p>
                </div>

                {/* Terminal output */}
                <div
                  className="px-5 py-3.5 font-mono text-[11.5px] leading-[1.85] space-y-0.5"
                  style={{ background: "#080810", borderTop: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <p>
                    <span style={{ color: "#98c379" }}>✓</span>{" "}
                    <span style={{ color: "#4e5060" }}>SalesAgent deployed</span>{" "}
                    <span style={{ color: "#333344" }}>·</span>{" "}
                    <span style={{ color: "#4e5060" }}>12 workflows active</span>
                  </p>
                  <p>
                    <span style={{ color: "#98c379" }}>✓</span>{" "}
                    <span style={{ color: "#4e5060" }}>HRAgent live</span>{" "}
                    <span style={{ color: "#333344" }}>·</span>{" "}
                    <span style={{ color: "#4e5060" }}>8 automations running</span>
                  </p>
                  <p>
                    <span style={{ color: "#61afef" }}>⟳</span>{" "}
                    <span style={{ color: "#4e5060" }}>OpsAgent processing 847 events</span>
                  </p>
                  <p>
                    <span style={{ color: "#8b85ff" }}>▸</span>{" "}
                    <span style={{ color: "#5a4aaa" }}>Pipeline live · 99.9% uptime</span>
                  </p>
                </div>
              </div>

              {/* Floating metric chips */}
              <div className="flex gap-2 ml-2">
                <motion.div
                  className="inline-flex items-center gap-2 bg-background border border-border rounded-full px-3.5 py-1.5 shadow-sm text-xs text-foreground font-medium"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.4 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                  70% less manual work
                </motion.div>
                <motion.div
                  className="inline-flex items-center gap-2 bg-background border border-border rounded-full px-3.5 py-1.5 shadow-sm text-xs text-foreground font-medium"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75, duration: 0.4 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  30% faster inference
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
