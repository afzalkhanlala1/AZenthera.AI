/**
 * Generate pre-recorded demo audio for the Voice Agents simulations.
 *
 * Walks every voiceAgents[].demo.turns line, synthesizes it with ElevenLabs TTS
 * (agent and caller use different voices), and writes:
 *   public/voice/audio/<slug>/<index>.mp3
 *
 * Usage (run once, then commit the mp3s):
 *   ELEVENLABS_API_KEY=sk_... npm run gen:audio
 *
 * Optional overrides:
 *   ELEVENLABS_AGENT_VOICE_ID   (default: Rachel)
 *   ELEVENLABS_CALLER_VOICE_ID  (default: Adam)
 *
 * The site works without these files — DemoSimulationPlayer falls back to the
 * browser Web Speech API — but committed audio sounds far better.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { voiceAgents } from "../src/lib/voiceAgents";

const API_KEY = process.env.ELEVENLABS_API_KEY;
const AGENT_VOICE = process.env.ELEVENLABS_AGENT_VOICE_ID || "21m00Tcm4TlvDq8ikWAM"; // Rachel
const CALLER_VOICE = process.env.ELEVENLABS_CALLER_VOICE_ID || "pNInz6obpgDQGcFmaJgB"; // Adam
const MODEL_ID = process.env.ELEVENLABS_TTS_MODEL || "eleven_turbo_v2_5";

if (!API_KEY) {
  console.error("Missing ELEVENLABS_API_KEY. Aborting.");
  process.exit(1);
}

async function tts(text: string, voiceId: string): Promise<Buffer> {
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: {
        "xi-api-key": API_KEY as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        model_id: MODEL_ID,
        voice_settings: { stability: 0.5, similarity_boost: 0.75, style: 0.2 },
      }),
    }
  );
  if (!res.ok) {
    throw new Error(`TTS failed (${res.status}): ${await res.text()}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  const outRoot = path.join(process.cwd(), "public", "voice", "audio");
  for (const agent of voiceAgents) {
    const dir = path.join(outRoot, agent.slug);
    await mkdir(dir, { recursive: true });
    console.log(`\n${agent.name} (${agent.slug})`);
    for (let i = 0; i < agent.demo.turns.length; i++) {
      const turn = agent.demo.turns[i];
      const voice = turn.speaker === "agent" ? AGENT_VOICE : CALLER_VOICE;
      process.stdout.write(`  [${i + 1}/${agent.demo.turns.length}] ${turn.speaker}… `);
      const audio = await tts(turn.text, voice);
      await writeFile(path.join(dir, `${i}.mp3`), audio);
      console.log("done");
    }
  }
  console.log("\nAll demo audio generated into public/voice/audio/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
