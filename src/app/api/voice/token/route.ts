import { NextResponse } from "next/server";
import { rateLimit, clientIp } from "@/lib/rateLimit";
import { getVoiceAgentBySlug } from "@/lib/voiceAgents";

export const runtime = "nodejs";

// ElevenLabs returns a short-lived signed URL the browser uses to open the
// Conversational AI WebSocket. The API key never leaves the server.
const SIGNED_URL_ENDPOINT =
  "https://api.elevenlabs.io/v1/convai/conversation/get-signed-url";

export async function POST(req: Request) {
  const ip = clientIp(req);
  // Tight cap — live minutes cost money. ~4 trials/day per IP.
  const limit = await rateLimit(`voice:${ip}`, 4, 60 * 60 * 24);
  if (!limit.success) {
    return NextResponse.json(
      { error: "You've reached today's live-trial limit. Contact us for a full demo." },
      { status: 429 }
    );
  }

  let agentSlug = "";
  try {
    const body = await req.json();
    agentSlug = String(body?.agentSlug ?? "");
  } catch {
    /* validated below */
  }
  if (!getVoiceAgentBySlug(agentSlug)) {
    return NextResponse.json({ error: "Unknown agent." }, { status: 400 });
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  const agentId = process.env.ELEVENLABS_AGENT_ID;
  if (!apiKey || !agentId) {
    return NextResponse.json(
      {
        error:
          "Live trial isn't configured yet. Watch the demo, or contact us for a tailored walkthrough.",
      },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(`${SIGNED_URL_ENDPOINT}?agent_id=${encodeURIComponent(agentId)}`, {
      method: "GET",
      headers: { "xi-api-key": apiKey },
      cache: "no-store",
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: "Couldn't start the live session. Please try again shortly." },
        { status: 502 }
      );
    }
    const data = await res.json();
    const signedUrl = data?.signed_url ?? data?.signedUrl;
    if (!signedUrl) {
      return NextResponse.json(
        { error: "Voice provider returned an unexpected response." },
        { status: 502 }
      );
    }
    return NextResponse.json(
      { signedUrl },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json(
      { error: "Couldn't reach the voice provider." },
      { status: 502 }
    );
  }
}
