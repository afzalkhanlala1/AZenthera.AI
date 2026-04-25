"use client";

import Link from "next/link";
import { services } from "@/lib/data";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com",
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

const company = [
  { href: "/about", label: "Studio" },
  { href: "/case-studies", label: "Work" },
  { href: "/industries", label: "Industries" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-background-alt hairline-t">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 pt-20 pb-10">
        {/* Display wordmark */}
        <div className="hairline-b pb-12 mb-12">
          <p className="eyebrow mb-6">/ Footer · ↳ index</p>
          <p className="font-display tracking-[-0.03em] leading-[0.85] text-foreground text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[clamp(7rem,14vw,12rem)]">
            Azenthera<span className="serif-italic text-text-muted">.</span>
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4">
            <Link
              href="/"
              className="text-[14px] tracking-tight font-medium text-foreground inline-block mb-4"
            >
              Azenthera <span className="font-display italic text-text-muted">studio</span>
            </Link>
            <p className="text-text-muted text-[13.5px] leading-[1.55] mb-6 max-w-[36ch]">
              An engineering studio building production-grade AI, data, and
              vision systems for teams that need them to keep running.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 grid place-items-center border border-border text-text-muted hover:text-foreground hover:border-foreground transition-colors"
                  aria-label={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Capabilities */}
          <div className="col-span-1 md:col-span-4">
            <p className="eyebrow mb-5">Capabilities</p>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="link-underline text-[13.5px] text-foreground-soft hover:text-foreground transition-colors"
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio + contact */}
          <div className="col-span-1 md:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="eyebrow mb-5">Studio</p>
              <ul className="space-y-2.5">
                {company.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="link-underline text-[13.5px] text-foreground-soft hover:text-foreground transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-5">Get in touch</p>
              <ul className="space-y-2.5 text-[13.5px]">
                <li>
                  <a
                    href="mailto:afzaljawadkhan@gmail.com"
                    className="link-underline text-foreground-soft"
                  >
                    afzaljawadkhan@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+923379755627"
                    className="link-underline text-foreground-soft"
                  >
                    +92 337 975 5627
                  </a>
                </li>
                <li className="text-text-muted">Islamabad, Pakistan</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-border flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-text-subtle tracking-wider tabular-nums">
            © {currentYear} · Azenthera AI · v2.{currentYear % 100}
          </p>
          <p className="font-mono text-[11px] text-text-subtle tracking-wider">
            Designed in Islamabad · Shipping worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
