"use client";

import { voiceAgents } from "@/lib/voiceAgents";
import { VoiceAgentCard } from "./VoiceAgentCard";

export function VoiceAgentsGrid() {
  return (
    <section className="py-20 lg:py-28 px-6 lg:px-10">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex items-end justify-between mb-12">
          <p className="eyebrow">The lineup · {String(voiceAgents.length).padStart(2, "0")}</p>
          <span className="label-mono text-text-subtle hidden sm:inline">
            ↳ each with a demo + live trial
          </span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {voiceAgents.map((agent, i) => (
            <VoiceAgentCard key={agent.slug} agent={agent} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
