import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCaseStudyBySlug, caseStudies } from "@/lib/data";
import { CaseStudyPageTemplate } from "@/components/CaseStudyPageTemplate";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) {
    return { title: "Case Study Not Found" };
  }
  return {
    title: `${caseStudy.title} | AZenthera AI`,
    description: caseStudy.description,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();
  return <CaseStudyPageTemplate caseStudy={caseStudy} />;
}
