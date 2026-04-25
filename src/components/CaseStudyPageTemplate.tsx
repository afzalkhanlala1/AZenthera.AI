"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { caseStudies, type CaseStudy } from "@/lib/data";

interface CaseStudyPageTemplateProps {
  caseStudy: CaseStudy;
}

export function CaseStudyPageTemplate({ caseStudy }: CaseStudyPageTemplateProps) {
  const idx = caseStudies.findIndex((c) => c.slug === caseStudy.slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <>
      <PageHero
        eyebrow={caseStudy.category}
        marker={`CS/${String(idx + 1).padStart(2, "0")}`}
        title={caseStudy.title}
        description={caseStudy.description}
        meta={[
          { label: "Client", value: caseStudy.client },
          { label: "Duration", value: caseStudy.duration },
          { label: "Status", value: "Live in production" },
        ]}
      />

      {/* Results strip up top */}
      <section className="px-6 lg:px-10">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-border border-y border-border">
            {caseStudy.results.map((result, i) => (
              <motion.div
                key={result.metric}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-background p-7 lg:p-9 flex flex-col gap-3"
              >
                <span className="font-mono text-[10.5px] tabular-nums text-text-subtle tracking-widest">
                  R/0{i + 1}
                </span>
                <span className="text-[44px] lg:text-[64px] leading-none tracking-[-0.045em] font-medium text-foreground tabular-nums">
                  {result.value}
                </span>
                <span className="text-[13px] text-foreground tracking-tight">
                  {result.metric}
                </span>
                <span className="text-[12px] text-text-muted leading-snug">
                  {result.description}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-[1320px] mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3">
            <p className="eyebrow">The problem</p>
            <span className="font-mono text-[10.5px] text-text-subtle tabular-nums tracking-widest mt-2 block">
              §01
            </span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-9 max-w-[60ch]"
          >
            <p className="font-display text-[24px] lg:text-[30px] leading-[1.25] tracking-[-0.015em] text-foreground">
              {caseStudy.problem}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 bg-background-alt hairline-y">
        <div className="max-w-[1320px] mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3">
            <p className="eyebrow">The solution</p>
            <span className="font-mono text-[10.5px] text-text-subtle tabular-nums tracking-widest mt-2 block">
              §02
            </span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-9 space-y-6 max-w-[62ch] text-[16.5px] lg:text-[18px] leading-[1.6] text-foreground-soft"
          >
            <p>{caseStudy.solution}</p>
          </motion.div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-[1320px] mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3">
            <p className="eyebrow">Architecture</p>
            <span className="font-mono text-[10.5px] text-text-subtle tabular-nums tracking-widest mt-2 block">
              §03
            </span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-9"
          >
            <p className="text-[16.5px] lg:text-[18px] leading-[1.6] text-foreground-soft max-w-[62ch] mb-10">
              {caseStudy.architecture}
            </p>

            {/* Tech stack inline */}
            <div className="border-t border-border pt-8">
              <p className="eyebrow mb-5">Stack — {caseStudy.techStack.length}</p>
              <div className="flex flex-wrap gap-x-7 gap-y-3">
                {caseStudy.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[16px] lg:text-[19px] tracking-[-0.01em] text-foreground"
                  >
                    {tech}
                    <span className="text-text-subtle ml-7">·</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Next case */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 bg-background-alt hairline-y">
        <div className="max-w-[1320px] mx-auto">
          <Link
            href={`/case-studies/${next.slug}`}
            className="group block border-t border-border pt-12"
          >
            <p className="eyebrow mb-6">Next case · CS/{String(((idx + 1) % caseStudies.length) + 1).padStart(2, "0")}</p>
            <div className="grid lg:grid-cols-12 gap-8 items-end">
              <h3 className="lg:col-span-9 font-medium text-[36px] lg:text-[64px] leading-[0.98] tracking-[-0.03em] text-foreground group-hover:text-accent transition-colors">
                {next.title}
              </h3>
              <span className="lg:col-span-3 lg:text-right text-[13.5px] text-text-muted group-hover:text-foreground transition-colors flex lg:justify-end items-center gap-2">
                <span className="link-underline">Read on</span>
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
