"use client";

interface SectionHeadingProps {
  /** Short uppercase eyebrow label (e.g. "Services") */
  label: string;
  /** Index of the section, e.g. "01" — rendered as a numbered marker. */
  index?: string;
  /** Main heading. Use <em> inside for serif italic emphasis. */
  title: React.ReactNode;
  /** Optional supporting paragraph. */
  description?: React.ReactNode;
  /** Defaults to left-aligned (editorial). */
  align?: "left" | "center";
  /** Stack title and description side-by-side at lg+. */
  split?: boolean;
}

export function SectionHeading({
  label,
  index,
  title,
  description,
  align = "left",
  split = false,
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <div
        className={`flex items-center gap-3 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        {index && (
          <span className="font-mono text-[11px] tabular-nums text-text-subtle tracking-widest">
            {index}
          </span>
        )}
        <span className="h-px w-8 bg-border-strong" aria-hidden />
        <span className="eyebrow !text-foreground-soft">{label}</span>
      </div>

      <div
        className={`mt-6 ${
          split
            ? "grid lg:grid-cols-12 gap-8 lg:gap-16 items-end"
            : ""
        }`}
      >
        <h2
          className={`text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.02] tracking-[-0.025em] font-medium text-foreground ${
            split ? "lg:col-span-7" : "max-w-[18ch]"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`text-[16px] md:text-[17px] leading-[1.55] text-text-muted ${
              split
                ? "lg:col-span-5 lg:pb-2 max-w-[44ch]"
                : "mt-5 max-w-[52ch]"
            } ${align === "center" ? "mx-auto" : ""}`}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
