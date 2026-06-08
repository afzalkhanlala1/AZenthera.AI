import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getVoiceAgentBySlug, voiceAgents } from "@/lib/voiceAgents";
import { VoiceAgentDetail } from "@/components/voice/VoiceAgentDetail";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return voiceAgents.map((agent) => ({ slug: agent.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const agent = getVoiceAgentBySlug(slug);
  if (!agent) return { title: "Voice Agent Not Found" };
  return {
    title: `${agent.name} | Voice Agents`,
    description: agent.summary,
  };
}

export default async function VoiceAgentPage({ params }: Props) {
  const { slug } = await params;
  const agent = getVoiceAgentBySlug(slug);
  if (!agent) notFound();
  return <VoiceAgentDetail agent={agent} />;
}
