"use client";

import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { caseStudies } from "@/lib/data";

export function CaseStudiesPreview() {
  const previewStudies = caseStudies.slice(0, 3);

  return (
    <section className="py-24 px-6 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Case Studies"
          title={
            <>
              Work That <span className="gradient-text">Speaks</span>
            </>
          }
          description="Real systems built for real teams, with measurable results."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
          {previewStudies.map((study, index) => (
            <CaseStudyCard
              key={study.slug}
              title={study.title}
              category={study.category}
              description={study.description}
              slug={study.slug}
              results={study.results}
              index={index}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href="/case-studies" variant="secondary" size="md">
            View All Case Studies
          </Button>
        </div>
      </div>
    </section>
  );
}
