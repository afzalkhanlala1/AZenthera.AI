"use client";

import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/lib/data";

export function ServicesGrid() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Services"
          title={
            <>
              What We{" "}
              <span className="gradient-text">Build</span>
            </>
          }
          description="End-to-end AI and data solutions — from raw pipeline to production system."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.slug}
              icon={service.icon}
              title={service.shortTitle}
              description={service.description}
              href={`/services/${service.slug}`}
              slug={service.slug}
              index={index}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href="/services" variant="secondary" size="md">
            Explore All Services
          </Button>
        </div>
      </div>
    </section>
  );
}
