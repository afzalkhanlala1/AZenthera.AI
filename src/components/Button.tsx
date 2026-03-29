"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent/90 shadow-sm",
  secondary:
    "bg-surface border border-border text-foreground hover:bg-surface-light",
  outline:
    "border border-accent text-accent hover:bg-accent hover:text-white",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3.5 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-[15px]",
};

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "rounded-lg font-medium inline-flex items-center justify-center transition-all duration-150 " +
    variantStyles[variant] +
    " " +
    sizeStyles[size];

  const combinedClassName = `${baseStyles} ${className}`.trim();

  const motionProps = {
    whileHover: { scale: 1.015 },
    whileTap: { scale: 0.985 },
    transition: { duration: 0.1 },
  };

  if (href) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link href={href} className={combinedClassName}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      className={combinedClassName}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
