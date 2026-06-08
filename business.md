# AZenthera AI — Business Reference

> Single source of truth for **all business / content information** on the AZenthera AI website.
> If you want to rebuild this site from scratch, this file + `tech.md` should be enough.
>
> **Maintenance rule:** Whenever business content changes (services, case studies, team, contact details, copy, pricing, etc.), this file MUST be updated in the same change. Most of this content lives in code at `src/lib/data.ts` (plus a few page-level files noted below) — keep them in sync.

---

## 1. What the business is

**AZenthera AI** (a.k.a. "Azenthera studio") is a **lean, remote-first AI engineering studio**. Internally the codebase is named `ai-agency-website`.

- **Positioning:** "We engineer production AI — not proofs of concept." The studio builds production-grade systems that ship and *stay running*, as opposed to one-off demos.
- **Model:** Small senior team (2 partners) + a network of trusted specialists. No junior bench.
- **Founded:** 2021.
- **Base:** Islamabad, Pakistan. Remote-first, working across time zones GMT-7 → GMT+9.
- **Pricing:** Mostly fixed-scope, transparent (written proposal with milestones after a free discovery call). Time-and-materials available for open-ended R&D.
- **Domain:** `azentheraai.com` (custom domain, served via Vercel).

### Brand / voice
- Editorial, confident, understated. "Production over polish."
- Wordmark: **Azenthera** + italic "studio" (serif). Monogram: "Az" in a bordered square.
- Tone in copy: plain-spoken, anti-hype, accountability-forward ("We don't ghost — even on a no.").

---

## 2. Contact information

| Field | Value |
|-------|-------|
| Email | `afzaljawadkhan@gmail.com` |
| Phone | `+92 337 975 5627` |
| Location | Islamabad, Pakistan |
| Hours | Flex · GMT-7 → GMT+9 |
| LinkedIn | `https://linkedin.com` (placeholder — not yet a real profile URL) |
| GitHub | `https://github.com` (placeholder — not yet a real profile URL) |

> Contact form submissions go to `afzaljawadkhan@gmail.com` via FormSubmit.co (overridable; see `tech.md`).

---

## 3. Services (8 core offerings)

These are the **8 services** advertised everywhere (nav dropdown, footer, `/services` index). Each has a detail page at `/services/<slug>`.

| # | Slug | Title | Short title | Icon |
|---|------|-------|-------------|------|
| 1 | `ai-development` | AI Integration & Development | AI Integration | ⚡ |
| 2 | `ai-agents` | AI Agents & Automation | AI Agents | 🤖 |
| 3 | `computer-vision` | Computer Vision & Edge AI | Computer Vision | 👁️ |
| 4 | `ml-deep-learning` | Custom ML & Deep Learning | ML & Deep Learning | 🧠 |
| 5 | `data-engineering` | Data Engineering & Pipelines | Data Engineering | ⚙️ |
| 6 | `data-analytics` | Data Analytics & BI Dashboards | Data Analytics | 📊 |
| 7 | `generative-ai` | Generative AI Solutions | Generative AI | ✨ |
| 8 | `web-saas` | Web & SaaS Development | Web & SaaS | 🚀 |

Each service entry carries: `description`, `features[]`, `technologies[]`, `benefits[]`, `overview` (long paragraph), and `heroDescription`. Full text lives in `src/lib/data.ts`. Summary below:

### 1. AI Integration & Development (`ai-development`)
- **Description:** Connect products with production-grade AI services and build features powered by real intelligence — not just wrappers.
- **Features:** Model & API integration (OpenAI, Anthropic, Gemini); RAG pipelines, embeddings & vector DBs; agent orchestration (LangChain, Google ADK, n8n); observability, evals & guardrails; MLOps (versioning, prompt management, rollout).
- **Technologies:** Python, LangChain, LlamaIndex, OpenAI, Anthropic, Gemini, Pinecone, MLflow.
- **Benefits:** Seamless integration with existing systems; production-ready pipelines with guardrails; scalable model deployment/versioning; continuous monitoring/optimization.

### 2. AI Agents & Automation (`ai-agents`)
- **Description:** Custom multi-agent ecosystems automating complex workflows across Sales, HR, Marketing, Engineering, etc.
- **Features:** Multi-agent orchestration (10–15 agents/department); workflow automation (n8n, Zapier, Make, GoHighLevel); personal assistant agents (calendar, email, messaging); local-first private agents (Ollama + PostgreSQL); webhook & OAuth connector dev.
- **Technologies:** Google ADK, LangChain, n8n, Zapier, Make, Ollama, Firebase, PostgreSQL.
- **Benefits:** 60%+ reduction in manual work; 24/7 automated workflows; privacy-first local deployment; scales from single agent to full department.

### 3. Computer Vision & Edge AI (`computer-vision`)
- **Description:** Real-time detection, tracking, recognition on edge hardware — optimized for latency, accuracy, power.
- **Features:** Object detection & multi-object tracking (YOLOv9–v11); video surveillance & smart alerts; TensorRT/ONNX optimization; NVIDIA Jetson Orin & ARM64 tuning; face recognition & custom classification.
- **Technologies:** OpenCV, TensorRT, ONNX, NVIDIA Jetson, CUDA, YOLOv9-v11, GOTURN.
- **Benefits:** 30%+ faster inference (TensorRT); 25% fewer false positives; real-time edge processing; 95%+ uptime.

### 4. Custom ML & Deep Learning (`ml-deep-learning`)
- **Description:** End-to-end model development — data collection through training, optimization, deployment.
- **Features:** Predictive analytics (churn, forecasting, inventory); NLP & transformers (Hugging Face, Whisper); time-series (ARIMA, Prophet, custom); model optimization (pruning, quantization, distillation); audio analytics & speech-to-text.
- **Technologies:** PyTorch, TensorFlow, Hugging Face, scikit-learn, Whisper, Prophet, ONNX.
- **Benefits:** Domain-tailored custom models; production-optimized; end-to-end pipeline; continuous retraining.

### 5. Data Engineering & Pipelines (`data-engineering`)
- **Description:** Scalable ETL, data warehouse design, automated pipelines.
- **Features:** 3NF & dimensional modeling (star/snowflake); ETL automation (AWS Glue, Azure Synapse, SQL, Python); warehouse architecture & governance; real-time & batch processing; data quality/validation/documentation.
- **Technologies:** PostgreSQL, SQL Server, AWS Glue, Azure Synapse, Microsoft Fabric, Python, Pandas, Apache Airflow, dbt.
- **Benefits:** Reliable automated pipelines; scalable warehouse; governance built in; faster insights.

### 6. Data Analytics & BI Dashboards (`data-analytics`)
- **Description:** Executive dashboards, KPI frameworks, advanced analytics.
- **Features:** Tableau & Power BI dashboards; KPI framework & metric-layer abstraction; market basket analysis & segmentation; financial modeling & revenue analytics; RFM analysis & customer profitability.
- **Technologies:** Tableau, Power BI, SQL, Python, Pandas, Excel, Looker.
- **Benefits:** Data-driven leadership decisions; automated reporting; deep customer/revenue insight; standardized KPIs.

### 7. Generative AI Solutions (`generative-ai`)
- **Description:** Content creation, chatbots, voicebots, creative automation at scale.
- **Features:** LLM fine-tuning & custom training; RAG chatbots; voicebots (ElevenLabs, Vapi); content generation & summarization; adaptive learning & personalization.
- **Technologies:** OpenAI, Anthropic, Gemini, LangChain, ElevenLabs, Vapi, Hugging Face.
- **Benefits:** Brand-tailored assistants; natural-language interfaces; voice-first experiences; content at scale.

### 8. Web & SaaS Development (`web-saas`)
- **Description:** Performance-driven web apps and scalable SaaS platforms.
- **Features:** Full-stack (React, Node.js, FastAPI); multi-tenant SaaS architecture; REST API design; CI/CD & blue/green; Firebase, Cloud Run & Kubernetes.
- **Technologies:** React, Next.js, Node.js, FastAPI, Firebase, Docker, Kubernetes.
- **Benefits:** Modern performant apps; scalable multi-tenant SaaS; automated CI/CD; API-first extensibility.

---

## 3.1 Voice Agents — interactive showcase (lead-gen motion)

A flagship interactive area that markets our voice-agent capability and converts visitors. Lives under **AI Agents** at `/services/ai-agents/voice` (with a featured promo block on the AI Agents page and a highlighted entry in the Navbar services dropdown).

**The motion:** a visitor browses agent types, **watches a recorded demo call** (with on-screen scene imagery so it isn't audio-only), then **tries one live** by handing over their own website — the agent reads the site and role-plays for that business for up to 3 minutes — and is funneled straight into a prefilled contact form ("Have us build this").

### Agent catalog (5 types)
| Slug | Name | Pitch | Ideal for |
|------|------|-------|-----------|
| `ai-receptionist` | AI Receptionist | Answers every call, books the next step, 24/7 | Clinics, law, home services, salons |
| `appointment-scheduler` | Appointment & Booking Agent | Fills the calendar, cuts no-shows | Med spas, consultants, auto service, tutoring |
| `customer-support` | Customer Support Agent | Resolves tier-1, escalates with context | E-commerce, SaaS, subscriptions, telecom |
| `lead-qualifier` | Outbound Lead Qualifier | Calls leads in seconds, books the hot ones | Real estate, insurance, B2B SaaS, home improvement |
| `order-taking` | Restaurant Order-Taking Agent | Takes every order, upsells, no hold music | Restaurants, pizzerias, cafes, ghost kitchens |

Each agent page has: overview, capabilities, ideal-for tags, a **Demo** (scripted call + scene imagery), and a **Try it yourself** live panel. All agent copy, personas, and demo scripts live in `src/lib/voiceAgents.ts`.

### Two experiences per agent
1. **Demo** — a pre-recorded, scripted simulation that plays turn-by-turn with captions, a reactive orb visual, and a scene image per turn. Audio is pre-generated (or falls back to browser speech).
2. **Try it yourself** — a live 3-minute voice call (ElevenLabs Conversational AI). The visitor enters their website; we inspect it server-side and brief the agent so it speaks as if it works for that business. Gated to a few trials/day to control cost.

## 4. Case Studies (6)

Each has a detail page at `/case-studies/<slug>` with: problem, solution, architecture, tech stack, and 3 result metrics. Full text in `src/lib/data.ts`.

| # | Slug | Title | Client | Category | Duration | Headline results |
|---|------|-------|--------|----------|----------|------------------|
| 1 | `agent-first-insurance` | Agent-First Insurance Platform | ClaimbAI | InsurTech | 8 months | 70% manual work cut · 6 secure connectors · 40% faster deploys |
| 2 | `defense-vision-system` | Real-Time Defense Vision System | COMCEPT | Defense & IoT | 6 months | +30% inference speed · −25% false positives · 95% uptime |
| 3 | `sports-performance-analytics` | Sports Performance Analytics | AiGenius | Sports Analytics | 5 months | 200M+ rows · 45% faster analysis · 3NF→Star migration |
| 4 | `fmcg-analytics-automation` | FMCG Analytics Automation | Convergent BT | Retail / FMCG | 4 months | 57% faster refresh · 66% team reduction (6→2) · Multi-region (Pepsi KSA & UAE) |
| 5 | `adastria-retail-intelligence` | Adastria Retail Intelligence | PlusW Tokyo | Fashion Retail | 6 months | RFM segmentation · global expansion foundation · executive BI |
| 6 | `multi-agent-business-automation` | Multi-Agent Business Automation | Enterprise Client | Enterprise | 4 months | −60% manual work · 4+ departments · full automation |

---

## 5. Industries served (10)

E-commerce 🛒 · Healthcare 🏥 · Finance & Fintech 💰 · Sports & Fitness ⚽ · Defense & Security 🛡️ · Retail & FMCG 🏪 · Education 📚 · Real Estate 🏠 · SaaS & Technology 💻 · Automotive 🚗

(Each has a one-line description in `src/lib/data.ts`.)

---

## 6. Team

| Name | Initials | Role | Notes |
|------|----------|------|-------|
| Afzal Khan | AK | AI Engineer · ML/DL · Computer Vision · MLOps | MIT MicroMasters in Statistics & Data Science. Agent ecosystems, edge AI on Jetson, RAG, full-stack AI. |
| Taha Rasheed | TR | AI Engineer · Data Analytics · Cloud Data Engineering | Azure Synapse & Microsoft Fabric, Power BI/DAX, agent ecosystems, ETL & warehouse design. |

Studio facts (About page): Founded 2021 · Senior · 2 partners · Fixed-scope transparent pricing · Time zones GMT-7 → GMT+9.

### Values / manifesto (About page — "Four things we'll never compromise on")
1. **Production over polish** — shaped by what survives Monday morning.
2. **Senior by default** — the engineer who scopes is the engineer who ships.
3. **Plain accountability** — fixed scope, fixed price, written assumptions.
4. **Long after launch** — success = what runs in year two; maintenance is part of the build.

---

## 7. Key marketing stats / proof points

- **30+** projects delivered
- **98%** client satisfaction
- **200M+** data rows processed
- **6+** industries served
- Homepage hero stat bar: 30+ shipped · 200M rows · 70% manual work cut (4 depts) · +30% edge inference (TensorRT)
- "Trusted across studios & teams · 5 countries"
- Hero ticker clients: ClaimbAI, COMCEPT, AiGenius, Convergent BT, Adastria, PlusW Tokyo, Pepsi KSA

---

## 8. Testimonials (5)

All 5-star. From: ClaimbAI Team, AiGenius Team, COMCEPT Team, Convergent BT Team, PlusW Tokyo Team. (Full quotes in `src/lib/data.ts`.)

---

## 9. Process (how engagements run)

5 steps: **1)** Discovery call (free) → **2)** Requirements & architecture → **3)** Proposal & planning (milestones, transparent pricing) → **4)** Development & iteration (agile sprints, demos) → **5)** Delivery & support (deploy, docs, maintenance).

Working rhythm (Contact FAQ): Discovery → scoped proposal → fortnightly demos → release. Client gets Slack channel, GitHub repo, decision log.

### Timelines (Contact FAQ)
- MVP: 8–16 weeks.
- Larger platforms: 4–8 months.
- Response to inbound: within 24h / one working day.

---

## 10. Site pages / information architecture

- `/` — Home (hero, services grid, why-choose-us, process, case studies preview, tech stack, testimonials, contact CTA)
- `/services` — index of the 8 services
- `/services/<slug>` — 8 service detail pages
- `/case-studies` — index of 6 case studies
- `/case-studies/<slug>` — 6 case study detail pages
- `/industries` — industries served
- `/about` — studio story, values, team
- `/contact` — contact form + direct contact + FAQ

**Footer groups:** Capabilities (8 services), Studio (About/Work/Industries/Contact), Get in touch (email/phone/location).

---

## 11. Content issues — status

| Issue | Status |
|-------|--------|
| Wrong brand name "MetaViz AI" in `case-studies/[slug]` metadata | ✅ Fixed → now "AZenthera AI" |
| Orphan/broken service pages (`ai-apps`, `saas-platforms`, `ui-ux-design`, `video-analytics`, `website-development`) | ✅ Removed (also eliminated their "MetaViz AI" titles) |
| Dead root file `azenthera-site.jsx` (~57 KB) | ✅ Deleted |
| Footer GitHub link was a bare `https://github.com` | ✅ Fixed → `https://github.com/afzalkhanlala1` |
| Footer LinkedIn link is a bare `https://linkedin.com` | ⚠️ Still a placeholder — needs the real profile URL |

---

*Last updated: 2026-06-06. Keep in sync with `src/lib/data.ts` and `tech.md`.*
