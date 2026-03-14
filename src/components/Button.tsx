"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-[#6C63FF] to-[#00D4AA] text-white hover:shadow-lg hover:shadow-[#6C63FF]/25 transition-all",
  secondary:
    "bg-foreground/5 border border-foreground/10 text-foreground hover:bg-foreground/10",
  outline:
    "border-2 border-[#6C63FF] text-[#6C63FF] hover:bg-[#6C63FF] hover:text-white",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3",
  lg: "px-8 py-4 text-lg",
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
    "rounded-full font-medium inline-flex items-center justify-center " +
    variantStyles[variant] +
    " " +
    sizeStyles[size];

  const combinedClassName = `${baseStyles} ${className}`.trim();

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
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
