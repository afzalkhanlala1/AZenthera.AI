"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedSection } from "@/components/AnimatedSection";
import { testimonials } from "@/lib/data";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-lg ${
            i < rating ? "text-accent" : "text-foreground/20"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Testimonials"
          title={
            <>
              What Our <span className="gradient-text">Clients Say</span>
            </>
          }
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.name} delay={index * 0.1}>
              <motion.div
                className="glass-card rounded-2xl p-8 h-full relative"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <span className="absolute top-6 left-6 text-6xl font-serif text-accent/30 leading-none">
                  &ldquo;
                </span>
                <p className="text-text-muted leading-relaxed mt-8 mb-6 relative z-10">
                  {testimonial.quote}
                </p>
                <StarRating rating={testimonial.rating} />
                <div className="mt-4">
                  <p className="text-foreground font-semibold">{testimonial.name}</p>
                  <p className="text-text-muted text-sm">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
