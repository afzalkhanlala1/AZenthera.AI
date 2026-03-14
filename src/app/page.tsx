import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { StatsSection } from "@/components/sections/StatsSection";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <ServicesGrid />
      <WhyChooseUs />
      <ProcessSection />
      <TechStackSection />
      <TestimonialsSection />
    </>
  );
}
