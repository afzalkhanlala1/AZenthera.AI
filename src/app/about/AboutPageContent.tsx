"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { team } from "@/lib/data";

const aboutHighlights = [
  { icon: "🎓", title: "Expert Engineers", desc: "Top-tier engineering talent" },
  { icon: "🌍", title: "Global Clients", desc: "USA, Japan, UAE, Europe" },
  { icon: "⚡", title: "Production-Grade", desc: "Not demos — real systems" },
  { icon: "🤝", title: "Transparent Pricing", desc: "No hidden costs or surprises" },
];

const values = [
  {
    title: "Innovation",
    icon: "💡",
    description:
      "We push boundaries and embrace cutting-edge AI technologies to deliver exceptional solutions.",
  },
  {
    title: "Quality",
    icon: "✨",
    description:
      "Every model, every pipeline, every dashboard — we deliver excellence that stands the test of production.",
  },
  {
    title: "Collaboration",
    icon: "🤝",
    description:
      "We work closely with our clients as true partners, ensuring alignment at every step.",
  },
  {
    title: "Transparency",
    icon: "🔍",
    description:
      "Clear communication, honest timelines, and open processes throughout our engagement.",
  },
];

export function AboutPageContent() {
  return (
    <>
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 hero-grid" />
        <div className="absolute inset-0 radial-fade" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-center">
              About <span className="gradient-text">AZenthera AI</span>
            </h1>
            <p className="text-text-muted text-lg md:text-xl text-center max-w-2xl mx-auto mt-6">
              Engineers building intelligent systems that solve real business problems —
              from California startups to Japanese fashion retailers.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <SectionHeading
              label="Our Story"
              title="Who We Are"
              description="A lean, remote-first team delivering senior-level engineering."
              center={false}
            />
          </AnimatedSection>
          <div className="mt-16 grid md:grid-cols-2 gap-12 items-start">
            <AnimatedSection delay={0.1}>
              <div className="space-y-6">
                <p className="text-text-muted text-lg leading-relaxed">
                  AZenthera AI was founded by engineers who share a passion for building
                  intelligent systems that solve real business problems. With complementary expertise spanning AI
                  engineering, computer vision, data science, and business intelligence, we deliver end-to-end solutions
                  from proof-of-concept to production deployment.
                </p>
                <p className="text-text-muted text-lg leading-relaxed">
                  Our clients range from California-based startups to Japanese fashion retailers, from defense contractors
                  to FMCG giants like PepsiCo. We&apos;ve processed over 200 million data rows, deployed multi-agent
                  ecosystems, and optimized real-time computer vision systems on edge hardware.
                </p>
                <p className="text-text-muted text-lg leading-relaxed">
                  We operate as a lean, remote-first team — which means you get senior-level engineering talent at
                  competitive rates, with the flexibility and responsiveness of a dedicated in-house team.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {aboutHighlights.map((hl) => (
                  <div key={hl.title} className="glass-card rounded-2xl p-6 text-center">
                    <div className="text-3xl mb-3">{hl.icon}</div>
                    <h4 className="text-foreground font-semibold text-sm">{hl.title}</h4>
                    <p className="text-text-muted text-xs mt-1">{hl.desc}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="glass-card rounded-2xl p-8 h-full">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
                <p className="text-text-muted text-lg">
                  Build production-grade AI and data solutions that create measurable business impact — accessible to
                  startups and enterprises alike, with world-class engineering and transparent pricing.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="glass-card rounded-2xl p-8 h-full">
                <div className="text-3xl mb-4">🔮</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
                <p className="text-text-muted text-lg">
                  Be the trusted engineering partner for companies seeking to build, deploy, and scale intelligent systems
                  — from AI agents and edge vision to data warehouses and executive analytics.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <SectionHeading
              label="Our Team"
              title="Meet the Engineers Behind AZenthera"
              description="Engineers with complementary expertise spanning AI, data, and systems engineering."
            />
          </AnimatedSection>
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <AnimatedSection key={member.name} delay={index * 0.1}>
                <div className="glass-card rounded-2xl p-8 h-full relative overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-accent/5 blur-3xl" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center text-2xl font-bold text-white mb-5">
                      {member.initials}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                    <p className="text-accent text-sm font-medium mb-4">{member.role}</p>
                    <p className="text-text-muted text-sm leading-relaxed mb-6">{member.bio}</p>
                    <div className="space-y-2">
                      {member.highlights.map((hl) => (
                        <div key={hl} className="flex items-start gap-2 text-sm text-foreground/80">
                          <span className="text-accent font-semibold mt-0.5 flex-shrink-0">&rarr;</span>
                          {hl}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <SectionHeading
              label="Our Values"
              title="What Drives Us"
              description="The principles that guide every project and partnership."
            />
          </AnimatedSection>
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.08}>
                <div className="glass-card rounded-2xl p-6 h-full">
                  <div className="text-3xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-text-muted">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="glass-card rounded-3xl p-12 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to work with us?
              </h2>
              <p className="text-text-muted text-lg max-w-xl mx-auto mb-8">
                Let&apos;s discuss how we can bring production-grade AI and data solutions to your business.
              </p>
              <Button href="/contact" variant="primary" size="lg">
                Book a Free Consultation
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
