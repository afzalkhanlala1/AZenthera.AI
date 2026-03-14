"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ContactForm } from "./ContactForm";

const contactInfo = [
  { label: "Email", value: "afzaljawadkhan@gmail.com", icon: "✉️" },
  { label: "Phone", value: "+92 337 9755627", icon: "📞" },
  { label: "Location", value: "Islamabad, Pakistan · Serving clients worldwide", icon: "📍" },
  { label: "Availability", value: "Flexible hours · US & EU time zones", icon: "🕐" },
];

const socialLinks = [
  { label: "LinkedIn", href: "#", icon: "in" },
  { label: "GitHub", href: "#", icon: "⌘" },
];

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "We offer AI Integration & Development, AI Agents & Automation, Computer Vision & Edge AI, Custom ML & Deep Learning, Data Engineering & Pipelines, Data Analytics & BI Dashboards, Generative AI Solutions, IoT & Embedded Systems, and Web & SaaS Development.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Pricing depends on project scope, complexity, and timeline. We offer free consultations to understand your needs and provide transparent estimates. Most projects are quoted on a fixed-scope or time-and-materials basis. No hidden costs.",
  },
  {
    question: "What's the typical project timeline?",
    answer:
      "Timelines vary by project size. A typical MVP can take 2–4 months, while larger enterprise solutions may take 4–8 months. We'll provide a detailed timeline during our discovery phase.",
  },
  {
    question: "What's your development process?",
    answer:
      "We follow a structured process: Free Discovery Call → Requirements & Architecture → Proposal & Planning → Development & Iteration → Delivery & Support. You'll have regular demos and check-ins throughout.",
  },
  {
    question: "Where are you located?",
    answer:
      "We're based in Islamabad, Pakistan, operating as a lean remote-first team. We serve clients worldwide across all time zones — from California startups to Japanese fashion retailers to UAE-based enterprises.",
  },
];

export function ContactPageContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 hero-grid" />
        <div className="absolute inset-0 radial-fade" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-center">
              Start Your <span className="gradient-text">Project Today</span>
            </h1>
            <p className="text-text-muted text-lg text-center max-w-2xl mx-auto mt-6">
              Tell us about your project and we&apos;ll get back to you within 24 hours with a tailored proposal.
              Whether you have a well-defined project or just a rough idea, we&apos;re happy to discuss it.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <div className="glass-card rounded-2xl p-8">
                <ContactForm />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Reach Out Directly</h3>
                  <p className="text-text-muted text-sm">
                    We work across all time zones and are flexible with communication.
                  </p>
                </div>
                {contactInfo.map((item) => (
                  <div key={item.label} className="glass-card rounded-2xl p-6 flex items-start gap-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="text-text-muted text-sm font-medium uppercase tracking-wider">{item.label}</p>
                      <p className="text-foreground text-lg font-medium mt-1">{item.value}</p>
                    </div>
                  </div>
                ))}
                <div className="flex gap-4 pt-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="glass-card rounded-xl px-5 py-3 flex items-center gap-2 text-text-muted hover:text-accent hover:border-accent/30 transition-colors"
                    >
                      <span className="text-lg">{social.icon}</span>
                      <span>{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-text-muted text-center max-w-xl mx-auto mb-16">
              Quick answers to common questions about our services and process.
            </p>
          </AnimatedSection>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedSection key={index} delay={index * 0.05}>
                <div
                  className="glass-card rounded-2xl overflow-hidden cursor-pointer transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <div className="p-6 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-foreground pr-4">{faq.question}</h3>
                    <span
                      className={`text-2xl text-accent transition-transform ${openFaq === index ? "rotate-180" : ""}`}
                    >
                      ▼
                    </span>
                  </div>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-text-muted leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
