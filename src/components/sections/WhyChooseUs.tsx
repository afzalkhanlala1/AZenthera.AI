"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { whyChooseUs } from "@/lib/data";

const proofs = [
  {
    metric: "70%",
    label: "Manual work eliminated",
    detail: "ClaimbAI · Insurance multi-agent platform",
  },
  {
    metric: "200M",
    label: "Rows re-architected",
    detail: "AiGenius · 3NF → star-schema warehouse",
  },
  {
    metric: "+30%",
    label: "Edge inference speed",
    detail: "COMCEPT · TensorRT-tuned vision pipeline",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative py-16 lg:py-24 px-6 lg:px-10 bg-background-alt hairline-y">
      <div className="max-w-[1320px] mx-auto">
        <SectionHeading
          index="03"
          label="Method"
          split
          title={
            <>
              Built like a product team — <em className="serif-italic text-text-muted">priced</em> like a studio.
            </>
          }
          description={
            <>
              Four working principles that shape every engagement. They&apos;re
              the reason our case studies still run in production years later.
            </>
          }
        />

        <div className="mt-10 lg:mt-12 grid lg:grid-cols-12 gap-y-12 gap-x-10">
          {/* Principles list */}
          <div className="lg:col-span-7 border-t border-border">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="grid grid-cols-12 gap-4 py-6 border-b border-border"
              >
                <span className="col-span-2 font-mono text-[11px] tabular-nums text-text-subtle pt-1.5">
                  P/0{index + 1}
                </span>
                <div className="col-span-10">
                  <h3 className="text-[20px] lg:text-[22px] tracking-[-0.02em] text-foreground leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-[1.6] text-text-muted max-w-[52ch]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Proof column */}
          <div className="lg:col-span-5 lg:pl-10 lg:border-l lg:border-border">
            <p className="eyebrow mb-6">Receipts</p>
            <div className="space-y-px bg-border border border-border rounded-sm overflow-hidden">
              {proofs.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                  className="bg-surface px-6 py-6 flex items-baseline gap-6"
                >
                  <span className="text-[34px] lg:text-[40px] leading-none tracking-[-0.04em] font-medium text-foreground tabular-nums w-[104px] shrink-0">
                    {p.metric}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] text-foreground leading-tight">
                      {p.label}
                    </p>
                    <p className="text-[12px] text-text-muted mt-1">
                      {p.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
