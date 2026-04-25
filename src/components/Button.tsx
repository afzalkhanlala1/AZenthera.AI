"use client";

import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-foreground text-background border border-foreground hover:bg-transparent hover:text-foreground",
  secondary:
    "bg-transparent text-foreground border border-border-strong hover:border-foreground",
  ghost:
    "bg-transparent text-foreground border border-transparent hover:border-border-strong",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3.5 text-[12.5px]",
  md: "h-10 px-5 text-[13.5px]",
  lg: "h-12 px-6 text-[14px]",
};

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  arrow?: boolean;
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  arrow = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  const cls = `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();

  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} onClick={onClick}>
      {content}
    </button>
  );
}
