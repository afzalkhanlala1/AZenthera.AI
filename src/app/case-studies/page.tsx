import { caseStudies } from "@/lib/data";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { PageHero } from "@/components/PageHero";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata = {
  title: "Case studies",
  description:
    "Selected work from Azenthera AI — agent ecosystems, real-time vision systems, data warehouses, and BI dashboards in production.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        marker="W/01"
        title={
          <>
            Six engagements, the <em className="serif-italic text-text-muted">numbers</em> that survived.
          </>
        }
        description="Each card is a system still running in production — long after the kickoff deck. Numbers are exactly what the client measured."
        meta={[
          { label: "Engagements", value: String(caseStudies.length) },
          { label: "Industries", value: "InsurTech → Defense" },
          { label: "Live", value: "All in production" },
        ]}
      />

      <section className="py-12 lg:py-16 px-6 lg:px-10">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {caseStudies.map((study, index) => (
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

      <ContactCTA />
    </>
  );
}
