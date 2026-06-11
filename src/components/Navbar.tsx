"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { services } from "@/lib/data";

const navLinks = [
  { href: "/services", label: "Services", hasDropdown: true },
  { href: "/case-studies", label: "Work" },
  { href: "/industries", label: "Industries" },
  { href: "/about", label: "Studio" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const linkClass = (active: boolean) =>
    `relative h-[60px] flex items-center px-3.5 text-[14px] tracking-tight transition-colors ${
      active ? "text-foreground" : "text-text-muted hover:text-foreground"
    }`;

  const activeBar = (
    <span
      aria-hidden
      className="absolute left-3.5 right-3.5 bottom-0 h-[2px] bg-foreground"
    />
  );

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b border-hairline backdrop-blur-xl transition-colors duration-300 ${
        scrolled ? "bg-background/90" : "bg-background/70"
      }`}
    >
      <nav className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-[60px]">
          {/* Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group shrink-0"
            aria-label="AZenthera AI home"
          >
            <span className="relative w-7 h-7 grid place-items-center">
              <span className="absolute inset-0 border border-foreground rounded-[3px] transition-colors group-hover:bg-foreground" />
              <span className="relative font-display italic text-[13px] leading-none text-foreground transition-colors group-hover:text-background translate-y-[1px]">
                Az
              </span>
            </span>
            <span className="hidden sm:flex items-baseline gap-1 text-[14.5px] tracking-tight text-foreground">
              <span className="font-medium">Azenthera</span>
              <span className="font-display italic text-text-muted">studio</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center self-stretch">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.href}
                  className="relative self-stretch flex"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link href={link.href} className={linkClass(isActive(link.href))}>
                    <span className="flex items-center gap-1.5">
                      {link.label}
                      <svg
                        className={`w-3 h-3 transition-transform duration-200 ${
                          servicesOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                    {isActive(link.href) && activeBar}
                  </Link>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                      >
                        <div className="w-[600px] bg-background border border-border rounded-md shadow-2xl shadow-black/10 dark:shadow-black/50 overflow-hidden">
                          <div className="px-5 py-3 flex items-center justify-between border-b border-hairline">
                            <span className="eyebrow">Capabilities · 08</span>
                            <Link
                              href="/services"
                              className="text-[11.5px] text-text-muted hover:text-foreground transition-colors"
                            >
                              View all ↗
                            </Link>
                          </div>
                          <div className="grid grid-cols-2 gap-px bg-hairline">
                            {services.map((service, i) => (
                              <Link
                                key={service.slug}
                                href={`/services/${service.slug}`}
                                className="bg-background px-5 py-3 hover:bg-surface-elev transition-colors group/item flex items-baseline gap-3"
                              >
                                <span className="font-mono text-[10.5px] text-text-subtle tabular-nums w-5 shrink-0">
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                                <div className="min-w-0">
                                  <p className="text-[13.5px] text-foreground tracking-tight font-medium group-hover/item:text-accent transition-colors">
                                    {service.shortTitle}
                                  </p>
                                  <p className="text-[11.5px] text-text-muted mt-0.5 line-clamp-1">
                                    {service.description.split("—")[0].trim().split(".")[0]}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                          <Link
                            href="/services/ai-agents/voice"
                            className="flex items-center justify-between px-5 py-3.5 border-t border-hairline bg-surface-elev/40 hover:bg-surface-elev transition-colors group/voice"
                          >
                            <span className="flex items-center gap-2.5">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inset-0 rounded-full bg-accent opacity-60 animate-ping" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                              </span>
                              <span className="text-[13px] text-foreground tracking-tight font-medium">
                                Voice Agents
                              </span>
                              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
                                live demo + trial
                              </span>
                            </span>
                            <span className="text-text-muted group-hover/voice:text-foreground transition-colors text-[13px]">
                              →
                            </span>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={linkClass(isActive(link.href))}
                >
                  {link.label}
                  {isActive(link.href) && activeBar}
                </Link>
              )
            )}
          </div>

          {/* Right rail */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <ThemeToggle />
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-2 group h-9 pl-4 pr-1 rounded-full border border-foreground bg-foreground text-background hover:bg-transparent hover:text-foreground transition-colors"
            >
              <span className="text-[13px] tracking-tight font-medium">
                Start a project
              </span>
              <span className="w-7 h-7 grid place-items-center rounded-full bg-background text-foreground group-hover:bg-foreground group-hover:text-background transition-colors">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 grid place-items-center text-foreground"
              aria-label="Toggle menu"
            >
              <span className="relative block w-4 h-3">
                <span
                  className={`absolute left-0 right-0 h-px bg-current transition-transform duration-200 ${
                    mobileMenuOpen ? "top-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 right-0 h-px bg-current transition-opacity duration-200 ${
                    mobileMenuOpen ? "opacity-0" : "opacity-100 top-1/2"
                  }`}
                />
                <span
                  className={`absolute left-0 right-0 h-px bg-current transition-transform duration-200 ${
                    mobileMenuOpen ? "top-1/2 -rotate-45" : "bottom-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="lg:hidden bg-background border-t border-hairline overflow-hidden max-h-[calc(100dvh-60px)] overflow-y-auto"
          >
            <div className="max-w-[1320px] mx-auto px-6 py-5">
              <div className="space-y-0.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between py-3 border-b border-hairline text-[15px] tracking-tight ${
                      isActive(link.href) ? "text-foreground font-medium" : "text-foreground-soft"
                    }`}
                  >
                    {link.label}
                    <span className="text-text-subtle">→</span>
                  </Link>
                ))}
              </div>

              <div className="mt-5">
                <p className="eyebrow mb-3">Capabilities</p>
                <div className="grid grid-cols-2 gap-px bg-hairline border border-hairline">
                  {services.map((service, i) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="bg-background px-3 py-2.5 flex items-baseline gap-2"
                    >
                      <span className="font-mono text-[10px] text-text-subtle tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[13px] text-foreground tracking-tight">
                        {service.shortTitle}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/contact"
                className="mt-5 mb-1 inline-flex items-center justify-between w-full h-12 px-5 rounded-full border border-foreground bg-foreground text-background"
              >
                <span className="text-[14px] tracking-tight font-medium">Start a project</span>
                <span>→</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
