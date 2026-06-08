"use client";

interface AgentOrbProps {
  /** Whether the session/playback is live. */
  active?: boolean;
  /** Who is currently speaking — drives the equalizer intensity/color. */
  speaking?: "agent" | "caller" | null;
  /** Accent color (hex). */
  accent?: string;
  /** Pixel size of the orb. */
  size?: number;
}

const BAR_COUNT = 7;

export function AgentOrb({
  active = false,
  speaking = null,
  accent = "#8b87ff",
  size = 160,
}: AgentOrbProps) {
  const isSpeaking = active && speaking !== null;
  const tint = speaking === "caller" ? "var(--foreground)" : accent;

  return (
    <div
      className="relative grid place-items-center"
      style={{ width: size, height: size }}
      aria-hidden
    >
      {/* Pulsing rings */}
      {active && (
        <>
          <span
            className="orb-ring absolute rounded-full"
            style={{
              width: size * 0.82,
              height: size * 0.82,
              border: `1px solid ${accent}`,
            }}
          />
          <span
            className="orb-ring absolute rounded-full"
            style={{
              width: size * 0.82,
              height: size * 0.82,
              border: `1px solid ${accent}`,
              animationDelay: "1.2s",
            }}
          />
        </>
      )}

      {/* Core */}
      <div
        className={`relative rounded-full grid place-items-center transition-shadow duration-500 ${
          active ? "orb-core" : ""
        }`}
        style={{
          width: size * 0.62,
          height: size * 0.62,
          background: `radial-gradient(circle at 35% 30%, ${accent}, color-mix(in srgb, ${accent} 35%, transparent))`,
          boxShadow: active
            ? `0 0 40px -4px ${accent}, inset 0 0 24px -6px #fff6`
            : `inset 0 0 24px -8px #fff4`,
        }}
      >
        {/* Equalizer */}
        <div
          className="flex items-end gap-[3px]"
          style={{ height: size * 0.22 }}
        >
          {Array.from({ length: BAR_COUNT }).map((_, i) => {
            const mid = Math.abs(i - (BAR_COUNT - 1) / 2);
            const base = 1 - mid / BAR_COUNT;
            return (
              <span
                key={i}
                className={isSpeaking ? "eq-bar" : ""}
                style={{
                  width: Math.max(2, size * 0.018),
                  height: `${30 + base * 70}%`,
                  background: tint,
                  borderRadius: 999,
                  opacity: isSpeaking ? 0.95 : 0.35,
                  transform: isSpeaking ? undefined : "scaleY(0.32)",
                  animationDelay: `${i * 0.08}s`,
                  animationDuration: `${0.7 + base * 0.5}s`,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
