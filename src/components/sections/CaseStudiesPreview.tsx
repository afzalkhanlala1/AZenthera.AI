"use client";

import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { caseStudies } from "@/lib/data";

export function CaseStudiesPreview() {
  const previewStudies = caseStudies.slice(0, 3);

  return (
    <section className="relative py-16 lg:py-24 px-6 lg:px-10 bg-background-alt hairline-y">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-10">
          <div className="lg:col-span-8">
            <SectionHeading
              index="07"
              label="Selected work"
              title={
                <>
                  Six engagements where the <em className="serif-italic text-text-muted">numbers</em> outlived the contract.
                </>
              }
            />
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link
              href="/case-studies"
              className="link-underline text-[13.5px] tracking-tight text-foreground"
            >
              The full archive →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
          {previewStudies.map((study, index) => (
            <div key={study.slug} className="bg-background">
              <CaseStudyCard
                title={study.title}
                category={study.category}
                description={study.description}
                slug={study.slug}
                results={study.results}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
