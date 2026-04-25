"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { team } from "@/lib/data";

export function TeamSection() {
  return (
    <section className="relative py-28 lg:py-36 px-6 lg:px-10 bg-background-alt hairline-y">
      <div className="max-w-[1320px] mx-auto">
        <SectionHeading
          label="Engineers"
          split
          title={
            <>
              The two people <em className="serif-italic text-text-muted">building</em> with you.
            </>
          }
          description="Every engagement is run by senior engineers — no juniors handed the keys, no offshore relay teams."
        />

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-px bg-border border border-border">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background p-8 lg:p-10 flex flex-col"
            >
              <div className="flex items-baseline justify-between mb-8">
                <span className="font-mono text-[11px] tabular-nums text-text-subtle tracking-widest">
                  /0{index + 1} · Engineer
                </span>
                <span className="font-display italic text-[64px] lg:text-[80px] leading-[0.7] text-text-subtle/40 select-none">
                  {member.initials}
                </span>
              </div>

              <h3 className="font-display text-[36px] lg:text-[44px] leading-[1.05] tracking-[-0.02em] text-foreground">
                {member.name}
              </h3>
              <p className="mt-3 text-[13px] uppercase tracking-[0.08em] text-text-muted">
                {member.role}
              </p>

              <p className="mt-6 text-[14.5px] leading-[1.6] text-text-muted">
                {member.bio}
              </p>

              <ul className="mt-8 pt-6 border-t border-border space-y-2.5">
                {member.highlights.map((highlight, i) => (
                  <li
                    key={highlight}
                    className="flex items-baseline gap-3 text-[13.5px] text-foreground-soft"
                  >
                    <span className="font-mono text-[10.5px] tabular-nums text-text-subtle shrink-0">
                      0{i + 1}
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
