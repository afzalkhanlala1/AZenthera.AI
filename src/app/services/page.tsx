import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/data";
import { PageHero } from "@/components/PageHero";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Eight engineering disciplines, one studio shipping them end-to-end — AI agents, computer vision, data engineering, analytics, generative AI, and full-stack web/SaaS.",
};

export default function ServicesIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        marker="S/00"
        title={
          <>
            Eight disciplines, one <em className="serif-italic text-text-muted">studio</em>.
          </>
        }
        description="Each capability is a system we&apos;ve already shipped — not a packaged offering invented for the website."
        meta={[
          { label: "Capabilities", value: "08" },
          { label: "Engagement", value: "Fixed-scope" },
          { label: "Senior engineers", value: "Always" },
        ]}
      />

      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-[1320px] mx-auto border-t border-border">
          {services.map((service, index) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group grid grid-cols-12 gap-4 lg:gap-8 items-baseline py-8 lg:py-10 border-b border-border hover:bg-surface-elev/40 -mx-2 px-2 lg:-mx-4 lg:px-4 transition-colors"
            >
              <span className="col-span-2 lg:col-span-1 font-mono text-[11px] tabular-nums text-text-subtle pt-2">
                /{String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="col-span-10 lg:col-span-4 text-[24px] lg:text-[32px] tracking-[-0.025em] leading-[1.05] text-foreground">
                {service.shortTitle}
              </h2>
              <p className="col-span-12 lg:col-span-5 text-[14.5px] leading-[1.55] text-text-muted">
                {service.description}
              </p>
              <span className="col-span-12 lg:col-span-2 lg:text-right text-[13px] text-text-muted group-hover:text-foreground transition-colors flex lg:justify-end items-center gap-2">
                <span className="link-underline">View detail</span>
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
          ))}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
