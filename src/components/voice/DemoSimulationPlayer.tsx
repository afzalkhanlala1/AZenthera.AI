"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { AgentOrb } from "./AgentOrb";
import type { VoiceAgent } from "@/lib/voiceAgents";

interface DemoSimulationPlayerProps {
  agent: VoiceAgent;
}

/** Rough spoken duration estimate (ms) used for the Web Speech fallback / no-audio mode. */
function estimateDuration(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1600, Math.round(words * 360) + 500);
}

export function DemoSimulationPlayer({ agent }: DemoSimulationPlayerProps) {
  const turns = agent.demo.turns;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const playingRef = useRef(false);
  const indexRef = useRef(0);

  // Keep refs in sync for the async audio callbacks (not read during render).
  useEffect(() => {
    playingRef.current = playing;
    indexRef.current = index;
  });

  const current = turns[index];
  const speaking = playing ? current?.speaker ?? null : null;

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  const advance = useCallback(() => {
    const next = indexRef.current + 1;
    if (next >= turns.length) {
      setPlaying(false);
      return;
    }
    setIndex(next);
  }, [turns.length]);

  // Web Speech API fallback when an audio asset isn't available.
  const speakFallback = useCallback(
    (text: string, onDone: () => void) => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        try {
          const u = new SpeechSynthesisUtterance(text);
          u.rate = 1.02;
          u.onend = onDone;
          u.onerror = onDone;
          window.speechSynthesis.speak(u);
          // Safety net in case onend never fires.
          timerRef.current = setTimeout(onDone, estimateDuration(text) + 1500);
          return;
        } catch {
          /* fall through to timed */
        }
      }
      timerRef.current = setTimeout(onDone, estimateDuration(text));
    },
    []
  );

  // Drive playback whenever the turn or play state changes.
  useEffect(() => {
    if (!playing) {
      audioRef.current?.pause();
      stopSpeech();
      clearTimer();
      return;
    }

    const turn = turns[index];
    if (!turn) return;

    let cancelled = false;
    const onDone = () => {
      if (!cancelled && playingRef.current) advance();
    };

    clearTimer();
    stopSpeech();

    const audio = audioRef.current;
    if (turn.audioSrc && audio) {
      audio.src = turn.audioSrc;
      audio.currentTime = 0;
      const onEnded = () => onDone();
      const onError = () => {
        // Asset missing — use the speech/timed fallback instead.
        speakFallback(turn.text, onDone);
      };
      audio.onended = onEnded;
      audio.onerror = onError;
      audio.play().catch(() => onError());
    } else {
      speakFallback(turn.text, onDone);
    }

    return () => {
      cancelled = true;
      if (audio) {
        audio.onended = null;
        audio.onerror = null;
      }
    };
  }, [playing, index, turns, advance, speakFallback]);

  // Cleanup on unmount.
  useEffect(() => {
    return () => {
      clearTimer();
      stopSpeech();
    };
  }, []);

  const start = () => {
    setStarted(true);
    setIndex(0);
    setPlaying(true);
  };
  const toggle = () => {
    if (!started) return start();
    setPlaying((p) => !p);
  };
  const restart = () => {
    setIndex(0);
    setPlaying(true);
    setStarted(true);
  };

  const finished = started && !playing && index === turns.length - 1;

  return (
    <div className="rounded-lg border border-border bg-surface overflow-hidden">
      <audio ref={audioRef} preload="none" className="hidden" />

      {/* Stage */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-background-alt overflow-hidden">
        {/* Scene imagery */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current?.scene ?? "idle"}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image
              src={`/voice/scenes/${current?.scene ?? "reception"}.png`}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 640px"
              className="object-cover opacity-60"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-alt via-background-alt/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Orb */}
        <div className="absolute inset-0 grid place-items-center">
          <AgentOrb active={playing} speaking={speaking} accent={agent.accent} size={150} />
        </div>

        {/* Call status chip */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span
              className={`absolute inset-0 rounded-full ${playing ? "animate-ping" : ""}`}
              style={{ background: agent.accent, opacity: 0.6 }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ background: playing ? agent.accent : "var(--text-subtle)" }}
            />
          </span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-foreground/80">
            {playing ? "Live demo" : started ? "Paused" : "Simulation"}
          </span>
        </div>

        {/* Caller context */}
        <span className="absolute top-4 right-4 font-mono text-[10px] text-text-muted hidden sm:inline">
          {agent.demo.context}
        </span>

        {/* Caption */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="max-w-[42ch]"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
                {current?.speaker === "agent" ? agent.name : "Caller"}
              </span>
              <p className="mt-1.5 text-[15px] sm:text-[17px] leading-snug tracking-[-0.01em] text-foreground">
                {started ? current?.text : agent.demo.scenario}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 px-4 sm:px-5 py-4 border-t border-border">
        <button
          onClick={finished ? restart : toggle}
          className="w-11 h-11 shrink-0 grid place-items-center rounded-full bg-foreground text-background hover:opacity-90 transition-opacity"
          aria-label={finished ? "Replay demo" : playing ? "Pause demo" : "Play demo"}
        >
          {finished ? (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M5.5 9a7 7 0 0111.9-2.5L20 9M18.5 15a7 7 0 01-11.9 2.5L4 15" />
            </svg>
          ) : playing ? (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg className="w-4 h-4 translate-x-[1px]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Progress dots */}
        <div className="flex items-center gap-1.5 flex-1">
          {turns.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setStarted(true);
                setIndex(i);
                setPlaying(true);
              }}
              className="h-1 rounded-full transition-all"
              style={{
                width: i === index && started ? 22 : 10,
                background:
                  started && i <= index ? agent.accent : "var(--border-strong)",
                opacity: started && i <= index ? 1 : 0.5,
              }}
              aria-label={`Jump to line ${i + 1}`}
            />
          ))}
        </div>

        <span className="font-mono text-[10.5px] tabular-nums text-text-subtle">
          {String(Math.min(index + (started ? 1 : 0), turns.length)).padStart(2, "0")}/
          {String(turns.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
