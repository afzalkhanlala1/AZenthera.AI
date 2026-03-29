"use client";

interface SectionHeadingProps {
  label: string;
  title: React.ReactNode;
  description?: string;
  center?: boolean;
}

export function SectionHeading({
  label,
  title,
  description,
  center = true,
}: SectionHeadingProps) {
  return (
    <div className={center ? "text-center" : ""}>
      <div className={`mb-5 ${center ? "flex justify-center" : ""}`}>
        <span className="inline-flex items-center text-xs font-medium text-accent bg-accent/8 border border-accent/15 rounded-full px-3 py-1 tracking-wide">
          {label}
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.15] mb-4">
        {title}
      </h2>
      {description && (
        <p
          className={`text-text-muted text-lg leading-relaxed max-w-2xl ${center ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
