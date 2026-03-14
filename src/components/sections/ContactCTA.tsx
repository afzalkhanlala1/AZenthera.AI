"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/Button";

export function ContactCTA() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "linear-gradient(135deg, rgba(108, 99, 255, 0.15) 0%, rgba(0, 212, 170, 0.1) 100%)",
        }}
      />

      <motion.div
        className="absolute w-64 h-64 rounded-full bg-accent/10 blur-3xl -top-20 left-1/4"
        animate={{ y: [0, -25, 0], x: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-48 h-48 rounded-full bg-accent-secondary/10 blur-3xl bottom-10 right-1/4"
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Let&apos;s Build the Future &mdash; Together
        </motion.h2>
        <motion.p
          className="text-lg text-text-muted max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Ready to take your business to the next level with the power of AI,
          automation, and intelligent data systems? We&apos;d love to hear about
          your project.
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button href="/contact" variant="primary" size="lg">
            Book a Free Consultation &rarr;
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
