"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { techStack } from "@/lib/data";

// Asymmetric grid widths per row for editorial feel.
// Each entry is { col, row } in 12-col grid units.
const layout = [
  { col: "lg:col-span-7", row: "" },
  { col: "lg:col-span-5", row: "" },
  { col: "lg:col-span-4", row: "" },
  { col: "lg:col-span-8", row: "" },
  { col: "lg:col-span-6", row: "" },
  { col: "lg:col-span-6", row: "" },
];

export function TechStackSection() {
  return (
    <section className="relative py-16 lg:py-24 px-6 lg:px-10 bg-background-alt hairline-y">
      <div className="max-w-[1320px] mx-auto">
        <SectionHeading
          index="05"
          label="Toolkit"
          split
          title={
            <>
              The stack we <em className="serif-italic text-text-muted">actually</em> use in production.
            </>
          }
          description="Boring where it matters, modern where it pays off. We pick infrastructure that we can support a year from now — not whatever shipped last week."
        />

        <div className="mt-10 lg:mt-12 grid lg:grid-cols-12 gap-px bg-border border border-border">
          {techStack.map((category, i) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`bg-background p-6 lg:p-7 ${layout[i]?.col ?? "lg:col-span-6"}`}
            >
              <div className="flex items-baseline justify-between mb-5">
                <p className="eyebrow">{category.category}</p>
                <span className="font-mono text-[10.5px] text-text-subtle tabular-nums">
                  {String(i + 1).padStart(2, "0")} / {String(techStack.length).padStart(2, "0")}
                </span>
              </div>
              <ul className="flex flex-wrap gap-x-6 gap-y-2.5">
                {category.technologies.map((tech, ti) => (
                  <li
                    key={tech}
                    className="text-[15px] lg:text-[17px] tracking-[-0.01em] text-foreground-soft hover:text-foreground transition-colors flex items-baseline gap-6"
                  >
                    {tech}
                    {ti < category.technologies.length - 1 && (
                      <span className="text-text-subtle">·</span>
                    )}
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
