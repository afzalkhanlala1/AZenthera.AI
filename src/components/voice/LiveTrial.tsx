"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ConversationProvider, useConversation } from "@elevenlabs/react";
import { AgentOrb } from "./AgentOrb";
import type { VoiceAgent } from "@/lib/voiceAgents";

interface LiveTrialProps {
  agent: VoiceAgent;
}

interface SiteProfile {
  businessName: string;
  summary: string;
  services: string[];
  sourceUrl: string;
}

type Phase = "idle" | "inspecting" | "connecting" | "live" | "ended" | "error";

interface TranscriptLine {
  source: "user" | "agent";
  text: string;
}

const CALL_SECONDS = 180;

function fillVars(template: string, profile: SiteProfile) {
  return template
    .replaceAll("{{businessName}}", profile.businessName || "the business")
    .replaceAll("{{businessSummary}}", profile.summary || "No summary available.")
    .replaceAll("{{services}}", profile.services.join(", ") || "general services")
    .replaceAll("{{sourceUrl}}", profile.sourceUrl || "");
}

// The ElevenLabs hook (v1.6+) must be used inside a ConversationProvider.
export function LiveTrial({ agent }: LiveTrialProps) {
  return (
    <ConversationProvider>
      <LiveTrialInner agent={agent} />
    </ConversationProvider>
  );
}

function LiveTrialInner({ agent }: LiveTrialProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [url, setUrl] = useState("");
  const [profile, setProfile] = useState<SiteProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(CALL_SECONDS);
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement | null>(null);

  const conversation = useConversation({
    onConnect: () => setPhase("live"),
    onDisconnect: () => setPhase((p) => (p === "error" ? p : "ended")),
    onMessage: (msg: { message: string; source: string }) => {
      if (!msg?.message) return;
      setTranscript((prev) => [
        ...prev,
        { source: msg.source === "user" ? "user" : "agent", text: msg.message },
      ]);
    },
    onError: (message: string) => {
      setError(
        typeof message === "string" && message
          ? message
          : "The call ran into a problem. Please try again."
      );
      setPhase("error");
    },
  });

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const endCall = useCallback(() => {
    stopTimer();
    try {
      conversation.endSession();
    } catch {
      /* already closed */
    }
  }, [conversation]);

  // Countdown while live.
  useEffect(() => {
    if (phase !== "live") return;
    setSecondsLeft(CALL_SECONDS);
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          endCall();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return stopTimer;
  }, [phase, endCall]);

  // Auto-scroll transcript.
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript]);

  // Cleanup on unmount.
  useEffect(() => {
    return () => {
      stopTimer();
      try {
        conversation.endSession();
      } catch {
        /* already closed */
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = async () => {
    setError(null);
    const trimmed = url.trim();
    if (!trimmed) {
      setError("Enter your website so the agent knows your business.");
      return;
    }

    // 1) Inspect the visitor's website.
    setPhase("inspecting");
    let prof: SiteProfile;
    try {
      const res = await fetch("/api/inspect/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Couldn't read that site (${res.status}).`);
      }
      const data = await res.json();
      prof = {
        businessName: data.businessName || "your business",
        summary: data.summary || data.description || "",
        services: Array.isArray(data.services) ? data.services : [],
        sourceUrl: data.sourceUrl || trimmed,
      };
      setProfile(prof);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't inspect that website.");
      setPhase("error");
      return;
    }

    // 2) Request mic, then a signed ElevenLabs session URL, then connect.
    setPhase("connecting");
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setError("Microphone access is required for the live call.");
      setPhase("error");
      return;
    }

    let signedUrl: string;
    try {
      const tokenRes = await fetch("/api/voice/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentSlug: agent.slug }),
      });
      if (!tokenRes.ok) {
        const body = await tokenRes.json().catch(() => ({}));
        throw new Error(
          body.error ||
            "Live trial isn't available right now. Watch the demo or contact us instead."
        );
      }
      ({ signedUrl } = await tokenRes.json());
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Couldn't start the live call. Please try again."
      );
      setPhase("error");
      return;
    }

    // 3) Open the live session (startSession is synchronous in v1.6+).
    try {
      setTranscript([]);
      conversation.startSession({
        signedUrl,
        connectionType: "websocket",
        overrides: {
          agent: {
            prompt: { prompt: fillVars(agent.persona, prof) },
            firstMessage: fillVars(agent.firstMessage, prof),
            language: "en",
          },
        },
        dynamicVariables: {
          businessName: prof.businessName,
          businessSummary: prof.summary,
          services: prof.services.join(", "),
          sourceUrl: prof.sourceUrl,
        },
      });
    } catch {
      setError("Couldn't start the live call. Please try again.");
      setPhase("error");
    }
  };

  const reset = () => {
    stopTimer();
    setPhase("idle");
    setProfile(null);
    setTranscript([]);
    setError(null);
    setSecondsLeft(CALL_SECONDS);
  };

  const mm = String(Math.floor(secondsLeft / 60));
  const ss = String(secondsLeft % 60).padStart(2, "0");
  const agentSpeaking = conversation.isSpeaking;
  const contactHref = `/contact?subject=${encodeURIComponent(
    "AI Agents & Automation"
  )}&agent=${encodeURIComponent(agent.name)}`;

  // ---- IDLE / inspecting / connecting / error: URL form --------------------
  if (phase === "idle" || phase === "inspecting" || phase === "connecting" || phase === "error") {
    const busy = phase === "inspecting" || phase === "connecting";
    return (
      <div className="rounded-lg border border-border bg-surface p-6 sm:p-8">
        <p className="eyebrow mb-3">Try it yourself · live</p>
        <h3 className="font-display text-[24px] sm:text-[28px] leading-[1.1] tracking-[-0.015em] text-foreground">
          Let the {agent.name.toLowerCase()} answer{" "}
          <em className="serif-italic text-text-muted">for your business</em>.
        </h3>
        <p className="mt-3 text-[14px] leading-[1.55] text-text-muted max-w-[48ch]">
          Drop in your website. The agent reads it, then takes a live call as if it
          worked for you — for up to 3 minutes. You&apos;ll need a mic.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <input
            type="url"
            inputMode="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !busy && start()}
            placeholder="https://yourbusiness.com"
            disabled={busy}
            className="flex-1 bg-transparent border border-border rounded-full px-5 h-12 text-[15px] text-foreground placeholder:text-text-subtle focus:outline-none focus:border-foreground transition-colors disabled:opacity-60"
          />
          <button
            onClick={start}
            disabled={busy}
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-foreground text-background hover:opacity-90 disabled:opacity-70 transition-opacity text-[14px] font-medium tracking-tight"
          >
            {phase === "inspecting"
              ? "Reading your site…"
              : phase === "connecting"
              ? "Connecting…"
              : "Start live call"}
          </button>
        </div>

        {error && (
          <div className="mt-4 border border-signal-warning/40 bg-signal-warning/5 px-4 py-3 text-[13px] text-signal-warning">
            {error}{" "}
            <Link href={contactHref} className="underline hover:text-foreground">
              Contact us
            </Link>{" "}
            and we&apos;ll build it for you.
          </div>
        )}

        <p className="mt-4 font-mono text-[10.5px] text-text-subtle">
          3-min limit · audio only · nothing is stored
        </p>
      </div>
    );
  }

  // ---- LIVE / ended: call UI ----------------------------------------------
  return (
    <div className="rounded-lg border border-border bg-surface overflow-hidden">
      <div className="relative bg-background-alt p-6 sm:p-8 grid place-items-center">
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            {phase === "live" && (
              <span
                className="absolute inset-0 rounded-full animate-ping"
                style={{ background: agent.accent, opacity: 0.6 }}
              />
            )}
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ background: phase === "live" ? agent.accent : "var(--text-subtle)" }}
            />
          </span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-foreground/80">
            {phase === "live" ? "On a live call" : "Call ended"}
          </span>
        </div>
        {phase === "live" && (
          <span className="absolute top-4 right-4 font-mono text-[13px] tabular-nums text-foreground">
            {mm}:{ss}
          </span>
        )}

        <AgentOrb
          active={phase === "live"}
          speaking={phase === "live" ? (agentSpeaking ? "agent" : "caller") : null}
          accent={agent.accent}
          size={150}
        />
        <p className="mt-2 text-[14px] text-text-muted">
          {phase === "live"
            ? agentSpeaking
              ? `${agent.name} is speaking…`
              : "Listening — go ahead and talk"
            : "Thanks for trying it out."}
        </p>
        {profile && (
          <p className="mt-1 font-mono text-[10.5px] text-text-subtle">
            acting for {profile.businessName}
          </p>
        )}
      </div>

      {/* Transcript */}
      {transcript.length > 0 && (
        <div className="max-h-44 overflow-y-auto px-5 py-4 border-t border-border space-y-3">
          {transcript.map((line, i) => (
            <div key={i} className="text-[13.5px] leading-snug">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-subtle mr-2">
                {line.source === "agent" ? agent.name : "You"}
              </span>
              <span className="text-foreground-soft">{line.text}</span>
            </div>
          ))}
          <div ref={transcriptEndRef} />
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-3 px-5 py-4 border-t border-border">
        {phase === "live" ? (
          <>
            <button
              onClick={() => conversation.setMuted(!conversation.isMuted)}
              className="h-11 px-4 rounded-full border border-border text-[13px] tracking-tight text-foreground hover:border-foreground transition-colors"
            >
              {conversation.isMuted ? "Unmute" : "Mute"}
            </button>
            <button
              onClick={endCall}
              className="h-11 px-5 rounded-full bg-signal-warning/90 text-white text-[13px] font-medium tracking-tight hover:opacity-90 transition-opacity ml-auto"
            >
              End call
            </button>
          </>
        ) : (
          <>
            <Link
              href={contactHref}
              className="inline-flex items-center gap-2 h-11 pl-5 pr-1.5 rounded-full bg-foreground text-background hover:opacity-90 transition-opacity text-[14px] font-medium tracking-tight"
            >
              Have us build this
              <span className="w-8 h-8 grid place-items-center rounded-full bg-background text-foreground">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
            <button
              onClick={reset}
              className="h-11 px-4 rounded-full border border-border text-[13px] tracking-tight text-foreground hover:border-foreground transition-colors ml-auto"
            >
              Try again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
