"use client";

import { useState } from "react";
import { Button } from "@/components/Button";

const subjectOptions = [
  "AI Development",
  "Generative AI",
  "Web Development",
  "Mobile App",
  "Other",
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">Send us a message</h2>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text-muted mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-foreground placeholder-text-muted/60 focus:outline-none focus:border-accent/50 transition-colors"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-foreground placeholder-text-muted/60 focus:outline-none focus:border-accent/50 transition-colors"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-text-muted mb-2">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-foreground placeholder-text-muted/60 focus:outline-none focus:border-accent/50 transition-colors"
          placeholder="Your company"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-text-muted mb-2">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          required
          className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-foreground focus:outline-none focus:border-accent/50 transition-colors appearance-none cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238B8B9E'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.75rem center",
            backgroundSize: "1.25rem",
            paddingRight: "2.5rem",
          }}
        >
          <option value="" className="bg-surface text-foreground">
            Select a subject
          </option>
          {subjectOptions.map((option) => (
            <option key={option} value={option} className="bg-surface text-foreground">
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text-muted mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-foreground placeholder-text-muted/60 focus:outline-none focus:border-accent/50 transition-colors resize-none"
          placeholder="Tell us about your project..."
        />
      </div>

      <Button type="submit" variant="primary" size="lg" className="w-full">
        {isSubmitting ? "Sending..." : "Submit"}
      </Button>
    </form>
  );
}
