// =============================================================================
// Voice Agents — catalog + demo scripts
// -----------------------------------------------------------------------------
// Drives the Voice Agents showcase under /services/ai-agents/voice.
// Each agent powers two experiences:
//   1. Demo        — a pre-recorded, animated simulation (turns[] below).
//   2. Try it      — a live ElevenLabs Conversational AI call whose prompt is
//      yourself       overridden at session start using `persona` + the
//                     visitor's inspected website (see /api/voice/token).
//
// NOTE (maintenance): keep this in sync with business.md / tech.md.
// =============================================================================

export type Speaker = "agent" | "caller";

export interface DemoTurn {
  speaker: Speaker;
  /** Spoken/displayed line. Caption shown in the simulation UI. */
  text: string;
  /**
   * Pre-generated audio for this line, produced by scripts/generate-demo-audio.ts
   * into public/voice/audio/<slug>/<index>.mp3. If the file is missing the
   * player falls back to the browser Web Speech API.
   */
  audioSrc?: string;
  /** Visual scene key — selects the backdrop/illustration for this turn. */
  scene: string;
  /** Optional fixed duration (ms) when no audio is available. */
  durationMs?: number;
}

export interface VoiceAgentDemo {
  /** One-line framing shown above the player. */
  scenario: string;
  /** Caller context line, e.g. "Incoming call · Tue 9:42am". */
  context: string;
  turns: DemoTurn[];
}

export interface VoiceAgent {
  slug: string;
  name: string;
  tagline: string;
  icon: string;
  /** Accent hue used for the orb/gradient on the agent's pages. */
  accent: string;
  summary: string;
  details: string;
  capabilities: string[];
  idealFor: string[];
  /** Example metrics/limits to set expectations. */
  specs: { label: string; value: string }[];
  /**
   * Role/system prompt for the LIVE agent. Supports {{businessName}},
   * {{businessSummary}}, {{services}}, {{sourceUrl}} dynamic variables that are
   * filled from the visitor's inspected website before the call starts.
   */
  persona: string;
  /** First spoken line for the live agent (also supports dynamic variables). */
  firstMessage: string;
  demo: VoiceAgentDemo;
}

const audio = (slug: string, i: number) => `/voice/audio/${slug}/${i}.mp3`;

export const voiceAgents: VoiceAgent[] = [
  // ---------------------------------------------------------------------------
  {
    slug: "ai-receptionist",
    name: "AI Receptionist",
    tagline: "Answers every call, books the right next step.",
    icon: "📞",
    accent: "#8b87ff",
    summary:
      "A 24/7 front-desk voice agent that greets callers, answers common questions, qualifies intent, and routes or books — so no call goes to voicemail.",
    details:
      "The AI Receptionist picks up instantly, speaks naturally, and handles the front-desk script your team repeats all day: who you are, what you offer, hours, location, pricing ranges, and what to do next. It captures caller details, answers FAQs from your site, and either books an appointment or routes to the right person — with a full transcript and summary sent to your inbox.",
    capabilities: [
      "Instant pickup, natural turn-taking, interruption handling",
      "Answers FAQs grounded in your website content",
      "Captures name, number, reason for calling",
      "Books appointments or routes/transfers by intent",
      "Emails a transcript + summary after every call",
    ],
    idealFor: ["Clinics & dental", "Law & professional services", "Home services", "Salons & spas"],
    specs: [
      { label: "Availability", value: "24 / 7" },
      { label: "Avg. pickup", value: "< 1s" },
      { label: "Languages", value: "30+" },
    ],
    persona:
      "You are the friendly, efficient front-desk receptionist for {{businessName}}. " +
      "You speak in short, warm, natural sentences. Your job: greet the caller, understand why they're calling, answer questions using what you know about the business, and guide them to the next step (booking, a callback, or directions). " +
      "Here is what the business does, taken from their website: {{businessSummary}}. Key services: {{services}}. Source: {{sourceUrl}}. " +
      "If you don't know something, say you'll have a team member follow up and collect the caller's name and number. Keep replies under ~2 sentences. Never invent prices or guarantees.",
    firstMessage:
      "Thanks for calling {{businessName}}, this is the front desk — how can I help you today?",
    demo: {
      scenario: "A new patient calls a dental clinic after hours to book a cleaning.",
      context: "Incoming call · Tue 7:14pm · after hours",
      turns: [
        { speaker: "agent", scene: "reception", audioSrc: audio("ai-receptionist", 0), text: "Thanks for calling Brightsmile Dental, this is the front desk — how can I help you today?" },
        { speaker: "caller", scene: "caller", audioSrc: audio("ai-receptionist", 1), text: "Hi, I just moved nearby and wanted to book a cleaning. Are you taking new patients?" },
        { speaker: "agent", scene: "reception", audioSrc: audio("ai-receptionist", 2), text: "We are, welcome to the neighborhood! I can get you in for a new-patient cleaning. Do mornings or afternoons work better?" },
        { speaker: "caller", scene: "caller", audioSrc: audio("ai-receptionist", 3), text: "Mornings are better for me, ideally later this week." },
        { speaker: "agent", scene: "calendar", audioSrc: audio("ai-receptionist", 4), text: "I have Thursday at 9:30 or Friday at 10:15. Which would you like?" },
        { speaker: "caller", scene: "caller", audioSrc: audio("ai-receptionist", 5), text: "Thursday at 9:30 is perfect." },
        { speaker: "agent", scene: "calendar", audioSrc: audio("ai-receptionist", 6), text: "Booked for Thursday 9:30. Can I get your name and a mobile number for the confirmation text?" },
        { speaker: "caller", scene: "caller", audioSrc: audio("ai-receptionist", 7), text: "Sarah Lin, 555-0142." },
        { speaker: "agent", scene: "confirm", audioSrc: audio("ai-receptionist", 8), text: "Thanks Sarah — you're all set for Thursday at 9:30, and I've texted the confirmation. See you then!" },
      ],
    },
  },
  // ---------------------------------------------------------------------------
  {
    slug: "appointment-scheduler",
    name: "Appointment & Booking Agent",
    tagline: "Fills your calendar without the phone tag.",
    icon: "📅",
    accent: "#4ade80",
    summary:
      "A scheduling specialist that checks availability, books, reschedules, and confirms — syncing directly with your calendar and sending reminders.",
    details:
      "The Booking Agent owns the calendar conversation end to end. It offers real open slots, books or reschedules on the spot, handles cancellations, collects the details you need, and sends confirmations and reminders to cut no-shows. It works for inbound calls and proactive reminder/confirmation callouts.",
    capabilities: [
      "Real-time availability and slot offering",
      "Book, reschedule, and cancel in one call",
      "Confirmation + reminder messages to reduce no-shows",
      "Collects intake details and preferences",
      "Calendar / CRM sync (Google, Outlook, etc.)",
    ],
    idealFor: ["Med spas & wellness", "Consultants & coaches", "Auto service", "Tutoring & lessons"],
    specs: [
      { label: "No-show drop", value: "~30%" },
      { label: "Sync", value: "Calendar/CRM" },
      { label: "Reminders", value: "SMS + email" },
    ],
    persona:
      "You are a precise, upbeat scheduling specialist for {{businessName}}. " +
      "Your only goal is to book, reschedule, or confirm an appointment efficiently. Offer at most two concrete time options at a time. Confirm details back clearly. " +
      "Business context: {{businessSummary}}. Services: {{services}}. " +
      "Keep it brief and friendly. Always end by confirming the date, time, and that a confirmation will be sent.",
    firstMessage:
      "Hi! This is scheduling for {{businessName}} — happy to help you book or move an appointment. What works for you?",
    demo: {
      scenario: "A returning client reschedules a massage and gets a reminder set.",
      context: "Incoming call · Mon 1:03pm",
      turns: [
        { speaker: "agent", scene: "calendar", audioSrc: audio("appointment-scheduler", 0), text: "Hi! This is scheduling for Stillwater Wellness — happy to help you book or move an appointment. What works for you?" },
        { speaker: "caller", scene: "caller", audioSrc: audio("appointment-scheduler", 1), text: "I need to move my Wednesday massage to later in the week." },
        { speaker: "agent", scene: "calendar", audioSrc: audio("appointment-scheduler", 2), text: "No problem. I can do Thursday at 4, or Saturday at 11. Which do you prefer?" },
        { speaker: "caller", scene: "caller", audioSrc: audio("appointment-scheduler", 3), text: "Saturday at 11 works great." },
        { speaker: "agent", scene: "confirm", audioSrc: audio("appointment-scheduler", 4), text: "Done — moved to Saturday at 11 with the same therapist. Want me to text you a reminder the day before?" },
        { speaker: "caller", scene: "caller", audioSrc: audio("appointment-scheduler", 5), text: "Yes please." },
        { speaker: "agent", scene: "confirm", audioSrc: audio("appointment-scheduler", 6), text: "All set. You'll get a reminder Friday afternoon. Anything else I can help with?" },
      ],
    },
  },
  // ---------------------------------------------------------------------------
  {
    slug: "customer-support",
    name: "Customer Support Agent",
    tagline: "Resolves the routine, escalates the rest.",
    icon: "🎧",
    accent: "#38bdf8",
    summary:
      "A tier-1 support voice agent that troubleshoots from your knowledge base, checks order/account status, and escalates cleanly with full context.",
    details:
      "The Support Agent deflects the repetitive tickets: status checks, how-tos, returns, password and account basics — grounded in your help docs. When a case needs a human, it hands off with the caller's history and a summary so nobody repeats themselves. It's calm, accurate, and never leaves a caller on hold.",
    capabilities: [
      "Answers grounded in your help center / docs (RAG)",
      "Order, shipping, and account status lookups",
      "Guided troubleshooting and returns",
      "Clean escalation with full context + transcript",
      "Sentiment-aware tone and de-escalation",
    ],
    idealFor: ["E-commerce & DTC", "SaaS & apps", "Subscriptions", "Utilities & telecom"],
    specs: [
      { label: "Deflection", value: "up to 60%" },
      { label: "Grounded in", value: "Your docs" },
      { label: "Handoff", value: "With context" },
    ],
    persona:
      "You are a calm, capable tier-1 customer support agent for {{businessName}}. " +
      "Solve common issues using what you know about the business and its products. Be empathetic and concise. " +
      "Business context: {{businessSummary}}. Products/services: {{services}}. " +
      "If the issue needs account access or a human, acknowledge it, summarize the problem, and offer to escalate with their details. Never make up policies, refunds, or account data.",
    firstMessage:
      "Thanks for reaching {{businessName}} support — I can help with that. What's going on?",
    demo: {
      scenario: "A shopper checks on a delayed order and gets a fix.",
      context: "Incoming call · Wed 10:28am",
      turns: [
        { speaker: "agent", scene: "support", audioSrc: audio("customer-support", 0), text: "Thanks for reaching Northpeak Outfitters support — I can help with that. What's going on?" },
        { speaker: "caller", scene: "caller", audioSrc: audio("customer-support", 1), text: "My order was supposed to arrive yesterday and it still hasn't shown up." },
        { speaker: "agent", scene: "support", audioSrc: audio("customer-support", 2), text: "Sorry about that. Can you give me the order number or the email on the order?" },
        { speaker: "caller", scene: "caller", audioSrc: audio("customer-support", 3), text: "It's order 48213." },
        { speaker: "agent", scene: "support", audioSrc: audio("customer-support", 4), text: "Thanks — I see it. The carrier had a weather delay; it's out for delivery today by 8pm. Want me to email you the live tracking link?" },
        { speaker: "caller", scene: "caller", audioSrc: audio("customer-support", 5), text: "Yes, and can I get free returns if it's damaged?" },
        { speaker: "agent", scene: "confirm", audioSrc: audio("customer-support", 6), text: "Absolutely — returns are free within 30 days. I've sent the tracking link and our returns info to your email. Anything else?" },
      ],
    },
  },
  // ---------------------------------------------------------------------------
  {
    slug: "lead-qualifier",
    name: "Outbound Lead Qualifier",
    tagline: "Calls new leads in seconds, books the hot ones.",
    icon: "🎯",
    accent: "#f59e0b",
    summary:
      "A proactive outbound agent that calls fresh leads instantly, qualifies with your criteria, and books meetings for your closers — while interest is high.",
    details:
      "Speed-to-lead wins deals. This agent dials new inquiries within seconds, runs your qualifying questions (budget, timeline, fit), answers top-of-funnel questions, and books qualified prospects straight onto a rep's calendar. Unqualified leads get nurtured, not dropped — and every call is logged to your CRM.",
    capabilities: [
      "Instant speed-to-lead outbound dialing",
      "Custom qualifying script (BANT or your own)",
      "Books meetings onto rep calendars",
      "CRM logging with call notes + disposition",
      "Polite, persistent follow-up cadence",
    ],
    idealFor: ["Real estate", "Insurance & finance", "B2B SaaS sales", "Home improvement"],
    specs: [
      { label: "Speed-to-lead", value: "< 60s" },
      { label: "Qualifies", value: "Your criteria" },
      { label: "Logs to", value: "Your CRM" },
    ],
    persona:
      "You are a personable, professional outbound sales development rep for {{businessName}}. " +
      "You've just received a new inbound lead and are calling to qualify and book a meeting. Be respectful of their time, build quick rapport, ask 2-3 qualifying questions, and aim to book a call with a specialist. " +
      "Business context: {{businessSummary}}. Offering: {{services}}. " +
      "If they're not a fit or not interested, thank them warmly and offer to follow up later. Never be pushy. Keep turns short.",
    firstMessage:
      "Hi, this is {{businessName}} following up on your inquiry — is now an okay time for a quick minute?",
    demo: {
      scenario: "A web lead for a realtor gets called back instantly and booked.",
      context: "Outbound call · 38s after form submit",
      turns: [
        { speaker: "agent", scene: "sales", audioSrc: audio("lead-qualifier", 0), text: "Hi, this is Harbor Realty following up on your inquiry — is now an okay time for a quick minute?" },
        { speaker: "caller", scene: "caller", audioSrc: audio("lead-qualifier", 1), text: "Oh wow, that was fast. Yeah, sure." },
        { speaker: "agent", scene: "sales", audioSrc: audio("lead-qualifier", 2), text: "We move quick! You were looking at the listing on Cedar Avenue — are you hoping to buy in the next few months?" },
        { speaker: "caller", scene: "caller", audioSrc: audio("lead-qualifier", 3), text: "Yes, ideally within 60 days. We're pre-approved already." },
        { speaker: "agent", scene: "sales", audioSrc: audio("lead-qualifier", 4), text: "Perfect, that helps a lot. I'd love to get you with one of our agents for a quick tour. Are you free Thursday evening or Saturday morning?" },
        { speaker: "caller", scene: "caller", audioSrc: audio("lead-qualifier", 5), text: "Saturday morning could work." },
        { speaker: "agent", scene: "confirm", audioSrc: audio("lead-qualifier", 6), text: "Great — I'll book you Saturday at 10 with Maria and text you the details. Thanks for your time, talk soon!" },
      ],
    },
  },
  // ---------------------------------------------------------------------------
  {
    slug: "order-taking",
    name: "Restaurant Order-Taking Agent",
    tagline: "Takes every order, upsells, never puts callers on hold.",
    icon: "🍽️",
    accent: "#fb7185",
    summary:
      "A phone-order agent for restaurants and takeout that reads the menu, takes accurate orders, suggests add-ons, and confirms pickup or delivery.",
    details:
      "During the rush, calls go unanswered and orders get lost. This agent answers every line, knows the menu and modifiers, takes the order accurately, suggests sides and drinks, totals it up, and confirms pickup or delivery time — sending the ticket straight to the kitchen or POS.",
    capabilities: [
      "Knows your menu, modifiers, and specials",
      "Accurate multi-item orders with customizations",
      "Smart upsells (sides, drinks, desserts)",
      "Pickup/delivery time + total confirmation",
      "Sends tickets to POS / kitchen",
    ],
    idealFor: ["Restaurants & takeout", "Pizzerias", "Cafes", "Ghost kitchens"],
    specs: [
      { label: "Calls answered", value: "100%" },
      { label: "Avg. upsell", value: "+12%" },
      { label: "Sends to", value: "POS / kitchen" },
    ],
    persona:
      "You are a quick, friendly phone-order taker for {{businessName}}, a restaurant. " +
      "Take the caller's order accurately, confirm each item, suggest one relevant add-on, then read back the order with the total and pickup/delivery time. " +
      "Menu/business context: {{businessSummary}}. Popular items: {{services}}. " +
      "Be efficient and warm. Always confirm the full order before finishing. Never invent prices you don't know — give ranges or offer to confirm.",
    firstMessage:
      "Thanks for calling {{businessName}}! Are we doing pickup or delivery today?",
    demo: {
      scenario: "A customer orders pizza for pickup and gets upsold a side.",
      context: "Incoming call · Fri 6:47pm · dinner rush",
      turns: [
        { speaker: "agent", scene: "restaurant", audioSrc: audio("order-taking", 0), text: "Thanks for calling Tony's Wood-Fired! Are we doing pickup or delivery today?" },
        { speaker: "caller", scene: "caller", audioSrc: audio("order-taking", 1), text: "Pickup. Can I get a large margherita and a Caesar salad?" },
        { speaker: "agent", scene: "restaurant", audioSrc: audio("order-taking", 2), text: "You got it — one large margherita and a Caesar. Want to add our garlic knots? They're fresh out of the oven." },
        { speaker: "caller", scene: "caller", audioSrc: audio("order-taking", 3), text: "Sure, add the garlic knots." },
        { speaker: "agent", scene: "restaurant", audioSrc: audio("order-taking", 4), text: "Perfect. That's a large margherita, a Caesar salad, and garlic knots — about 24 dollars. It'll be ready for pickup in 20 minutes. Can I get a name?" },
        { speaker: "caller", scene: "caller", audioSrc: audio("order-taking", 5), text: "Daniel." },
        { speaker: "agent", scene: "confirm", audioSrc: audio("order-taking", 6), text: "Thanks Daniel — order's in, ready in about 20. See you soon!" },
      ],
    },
  },
];

export function getVoiceAgentBySlug(slug: string): VoiceAgent | undefined {
  return voiceAgents.find((a) => a.slug === slug);
}
