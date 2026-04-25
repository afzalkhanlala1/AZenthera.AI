"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "./ContactForm";

const contactInfo = [
  { label: "Email", value: "afzaljawadkhan@gmail.com", href: "mailto:afzaljawadkhan@gmail.com" },
  { label: "Phone", value: "+92 337 975 5627", href: "tel:+923379755627" },
  { label: "Studio", value: "Islamabad, Pakistan", href: null },
  { label: "Hours", value: "Flex · GMT-7 → GMT+9", href: null },
];

const faqs = [
  {
    question: "What can you actually build?",
    answer:
      "AI agents, computer-vision pipelines, ML models, data warehouses, BI dashboards, and full-stack web/SaaS. We handle scope from a single integration to a multi-quarter platform.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Mostly fixed-scope. After a free discovery call we send a written proposal with milestones and price. No hidden retainers, no padding. Time-and-materials available for open-ended R&D.",
  },
  {
    question: "What's a typical timeline?",
    answer:
      "An MVP usually lands in 8 to 16 weeks. Larger platforms run 4 to 8 months. The discovery call ends with a calendar, not a guess.",
  },
  {
    question: "What's the working rhythm?",
    answer:
      "Discovery → scoped proposal → fortnightly demos → release. You always have the slack channel, the GitHub repo, and the decision log.",
  },
  {
    question: "Where are you based?",
    answer:
      "Islamabad, Pakistan, working remote-first. We've shipped for clients across the US, EU, UAE, KSA, and Japan with no time-zone friction.",
  },
];

export function ContactPageContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        marker="C/01"
        title={
          <>
            Tell us what you&apos;re <em className="serif-italic text-text-muted">building</em>.
          </>
        }
        description="A short message is enough. We reply within a working day with a scoping call invite or a thoughtful pass."
        meta={[
          { label: "Response", value: "Within 24h" },
          { label: "Discovery", value: "Free" },
          { label: "Outcome", value: "Written proposal" },
        ]}
      />

      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-[1320px] mx-auto grid lg:grid-cols-12 gap-12">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="border border-border bg-surface p-7 lg:p-10">
              <ContactForm />
            </div>
          </motion.div>

          {/* Direct contact rail */}
          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <p className="eyebrow mb-6">Or skip the form</p>
            <ul className="border-y border-border divide-y divide-border">
              {contactInfo.map((item) => (
                <li
                  key={item.label}
                  className="grid grid-cols-12 items-baseline py-5"
                >
                  <span className="col-span-4 font-mono text-[10.5px] uppercase tracking-[0.14em] text-text-muted">
                    {item.label}
                  </span>
                  <span className="col-span-8 text-[15px] tracking-tight">
                    {item.href ? (
                      <a
                        href={item.href}
                        className="link-underline text-foreground"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-foreground">{item.value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10 p-6 border border-border bg-background-alt">
              <p className="font-display text-[24px] leading-[1.15] tracking-[-0.015em] text-foreground">
                We don&apos;t ghost — even on a no.
              </p>
              <p className="mt-3 text-[13.5px] leading-[1.55] text-text-muted">
                If we&apos;re not the right fit we&apos;ll tell you within the
                same week, with a couple of studios that probably are.
              </p>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 bg-background-alt hairline-y">
        <div className="max-w-[1320px] mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-5">Frequently asked</p>
            <h2 className="font-medium text-[40px] lg:text-[56px] leading-[1.02] tracking-[-0.025em] text-foreground">
              Questions, <em className="serif-italic text-text-muted">answered</em>.
            </h2>
          </div>

          <div className="lg:col-span-8 border-t border-border">
            {faqs.map((faq, index) => {
              const open = openFaq === index;
              return (
                <div key={faq.question} className="border-b border-border">
                  <button
                    onClick={() => setOpenFaq(open ? null : index)}
                    className="w-full grid grid-cols-12 items-baseline gap-4 py-6 text-left group"
                    aria-expanded={open}
                  >
                    <span className="col-span-2 lg:col-span-1 font-mono text-[11px] tabular-nums text-text-subtle">
                      /{String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="col-span-9 lg:col-span-10 text-[17px] lg:text-[19px] tracking-[-0.02em] text-foreground">
                      {faq.question}
                    </h3>
                    <span
                      className={`col-span-1 justify-self-end text-text-muted transition-transform duration-200 ${
                        open ? "rotate-45" : ""
                      }`}
                      aria-hidden
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeWidth={1.5} d="M12 5v14m-7-7h14" />
                      </svg>
                    </span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: open ? "auto" : 0,
                      opacity: open ? 1 : 0,
                    }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="grid grid-cols-12 gap-4 pb-7 text-[14.5px] leading-[1.6] text-text-muted">
                      <span className="col-start-3 lg:col-start-2 col-span-10 lg:col-span-10 max-w-[60ch]">
                        {faq.answer}
                      </span>
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
