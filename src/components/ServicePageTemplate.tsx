"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { services, type Service } from "@/lib/data";

interface ServicePageTemplateProps {
  service: Service;
  /** Optional section rendered just before the closing ContactCTA. */
  extraSection?: React.ReactNode;
}

export function ServicePageTemplate({ service, extraSection }: ServicePageTemplateProps) {
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow={service.shortTitle}
        marker={`S/${String(
          services.findIndex((s) => s.slug === service.slug) + 1
        ).padStart(2, "0")}`}
        title={
          <>
            {service.title.split(" & ")[0]}
            {service.title.includes(" & ") && (
              <>
                {" "}
                <span className="serif-italic text-text-muted">&amp;</span>{" "}
                {service.title.split(" & ")[1]}
              </>
            )}
          </>
        }
        description={service.heroDescription}
        meta={[
          { label: "Discipline", value: service.shortTitle },
          { label: "Engagement", value: "Fixed-scope" },
          { label: "Tooling", value: `${service.technologies.length}+ stack` },
        ]}
      />

      {/* Overview */}
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-[1320px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-3">
            <p className="eyebrow">Overview</p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-9"
          >
            <p className="font-display text-[26px] lg:text-[34px] leading-[1.2] tracking-[-0.015em] text-foreground max-w-[60ch]">
              {service.overview}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 bg-background-alt hairline-y">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 mb-12">
            <div className="lg:col-span-5">
              <p className="eyebrow mb-5">Capabilities</p>
              <h2 className="font-medium text-[40px] lg:text-[56px] leading-[1.02] tracking-[-0.025em] text-foreground">
                What we <em className="serif-italic text-text-muted">deliver</em>.
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pt-6">
              <p className="text-[16px] leading-[1.55] text-text-muted max-w-[48ch]">
                The list below maps to the deliverables we&apos;ll write into
                the proposal — every line is a system we&apos;ve shipped before.
              </p>
            </div>
          </div>

          <ul className="border-t border-border">
            {service.features.map((feature, index) => (
              <motion.li
                key={feature}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="grid grid-cols-12 gap-4 py-6 border-b border-border items-baseline"
              >
                <span className="col-span-2 lg:col-span-1 font-mono text-[11px] tabular-nums text-text-subtle">
                  /{String(index + 1).padStart(2, "0")}
                </span>
                <span className="col-span-10 lg:col-span-11 text-[16px] lg:text-[18px] tracking-[-0.015em] text-foreground">
                  {feature}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 mb-14">
            <div className="lg:col-span-5">
              <p className="eyebrow mb-5">Outcomes</p>
              <h2 className="font-medium text-[40px] lg:text-[56px] leading-[1.02] tracking-[-0.025em] text-foreground">
                What you <em className="serif-italic text-text-muted">get</em>.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            {service.benefits.map((benefit, i) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-surface p-7 lg:p-8"
              >
                <span className="font-mono text-[11px] tabular-nums text-text-subtle">
                  B/0{i + 1}
                </span>
                <p className="mt-5 text-[17px] lg:text-[19px] tracking-[-0.015em] text-foreground leading-snug">
                  {benefit}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 bg-background-alt hairline-y">
        <div className="max-w-[1320px] mx-auto grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-5">The stack</p>
            <h2 className="font-display text-[40px] lg:text-[52px] leading-[1.05] tracking-[-0.02em] text-foreground">
              Tools we&apos;ll <em className="serif-italic text-text-muted">use</em>.
            </h2>
          </div>
          <div className="lg:col-span-8 flex flex-wrap gap-x-8 gap-y-3 lg:pt-6">
            {service.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[18px] lg:text-[22px] tracking-[-0.01em] text-foreground-soft"
              >
                {tech}
                <span className="text-text-subtle ml-8">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-[1320px] mx-auto">
          <div className="flex items-end justify-between mb-12">
            <p className="eyebrow">Adjacent capabilities</p>
            <Link
              href="/services"
              className="link-underline text-[13.5px] text-foreground"
            >
              All eight →
            </Link>
          </div>
          <div className="border-t border-border">
            {others.map((s, i) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group grid grid-cols-12 gap-4 py-6 border-b border-border items-baseline hover:bg-surface-elev/40 -mx-2 px-2 transition-colors"
              >
                <span className="col-span-2 lg:col-span-1 font-mono text-[11px] tabular-nums text-text-subtle">
                  /{String(i + 1).padStart(2, "0")}
                </span>
                <span className="col-span-7 lg:col-span-8 text-[18px] lg:text-[22px] tracking-[-0.02em] text-foreground">
                  {s.shortTitle}
                </span>
                <span className="col-span-3 text-right text-[12.5px] text-text-muted group-hover:text-foreground transition-colors">
                  Detail →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {extraSection}

      <ContactCTA />
    </>
  );
}
