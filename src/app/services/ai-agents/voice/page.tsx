import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { VoiceAgentsGrid } from "@/components/voice/VoiceAgentsGrid";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { voiceAgents } from "@/lib/voiceAgents";

export const metadata: Metadata = {
  title: "Voice Agents",
  description:
    "Hear AZenthera's voice agents in action — AI receptionists, booking agents, support, lead qualifiers, and order-taking. Watch a real call, then try one live on your own website.",
};

export default function VoiceAgentsIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="AI Agents · Voice"
        marker="V/00"
        title={
          <>
            Voice agents you can <em className="serif-italic text-text-muted">talk to</em>.
          </>
        }
        description="Pick an agent, watch a recorded call, then hand it your website and try it live for three minutes."
        meta={[
          { label: "Agents", value: String(voiceAgents.length).padStart(2, "0") },
          { label: "Demo", value: "Recorded" },
          { label: "Live trial", value: "3 min" },
        ]}
      />

      <VoiceAgentsGrid />

      <ContactCTA />
    </>
  );
}
