"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { services } from "@/lib/data";

export function ServicesGrid() {
  return (
    <section className="relative py-28 lg:py-36 px-6 lg:px-10">
      <div className="max-w-[1320px] mx-auto">
        <SectionHeading
          index="02"
          label="Capabilities"
          split
          title={
            <>
              Eight disciplines, <em className="serif-italic text-text-muted">one</em> studio
              shipping them end-to-end.
            </>
          }
          description={
            <>
              We don&apos;t hand off between specialists. The same engineers
              prototype the model, harden the pipeline, and stand up the
              dashboard your CFO opens on Monday.
            </>
          }
        />

        <div className="mt-20 border-t border-border">
          {services.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
            >
              <Link
                href={`/services/${service.slug}`}
                className="group grid grid-cols-12 gap-4 lg:gap-8 items-baseline py-7 lg:py-9 border-b border-border hover:bg-surface-elev/40 -mx-2 px-2 lg:-mx-4 lg:px-4 transition-colors"
              >
                <span className="col-span-2 lg:col-span-1 font-mono text-[11px] tabular-nums text-text-subtle pt-1">
                  /{String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="col-span-10 lg:col-span-4 text-[22px] lg:text-[28px] tracking-[-0.025em] leading-[1.1] text-foreground">
                  {service.shortTitle}
                </h3>
                <p className="col-span-12 lg:col-span-5 text-[14.5px] leading-[1.55] text-text-muted">
                  {service.description}
                </p>
                <span className="col-span-12 lg:col-span-2 lg:text-right text-[13px] text-text-muted group-hover:text-foreground transition-colors flex lg:justify-end items-center gap-1.5">
                  <span className="link-underline">Detail</span>
                  <svg
                    className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
