"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const reassurances = [
  "Reply inside 24h",
  "Free scoping call",
  "Detailed proposal",
];

export function ContactCTA() {
  return (
    <section className="relative px-6 lg:px-10 py-28 lg:py-36 grain overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000,transparent_75%)]" />

      <div className="relative max-w-[1320px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-[11px] tabular-nums text-text-subtle tracking-widest">
                /08
              </span>
              <span className="h-px w-8 bg-border-strong" aria-hidden />
              <span className="eyebrow !text-foreground-soft">
                Let&apos;s build
              </span>
            </div>

            <h2 className="font-medium tracking-[-0.035em] leading-[0.95] text-foreground text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[clamp(4rem,7vw,7rem)]">
              Tell us what
              <br />
              you&apos;re <span className="serif-italic text-text-muted">building</span>.
            </h2>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4 lg:pb-3"
          >
            <p className="text-[15px] leading-[1.55] text-text-muted max-w-[36ch]">
              We&apos;ll scope your requirements, suggest an architecture, and
              send back a real proposal — usually inside the same week.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 h-12 pl-5 pr-1.5 rounded-full bg-foreground text-background hover:opacity-90 transition-opacity text-[14px] tracking-tight font-medium"
              >
                Book the call
                <span className="w-9 h-9 grid place-items-center rounded-full bg-background text-foreground">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
              <a
                href="mailto:afzaljawadkhan@gmail.com"
                className="link-underline text-[13.5px] text-foreground"
              >
                or email →
              </a>
            </div>

            <ul className="mt-8 space-y-2 text-[12.5px] text-text-muted font-mono">
              {reassurances.map((r, i) => (
                <li key={r} className="flex items-baseline gap-3">
                  <span className="text-text-subtle tabular-nums">
                    0{i + 1}
                  </span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
