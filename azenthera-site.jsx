import { useState, useEffect, useRef, useCallback } from "react";

/* ───────────────────────── INTERSECTION OBSERVER ───────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    o.observe(el);
    return () => o.disconnect();
  }, [threshold]);
  return [ref, vis];
}
function Reveal({ children, delay = 0, className = "", style = {} }) {
  const [ref, vis] = useInView(0.08);
  return (
    <div ref={ref} className={className} style={{ ...style, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(36px)", transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

/* ───────────────────────── COUNTER ANIMATION ───────────────────────── */
function AnimCounter({ end, suffix = "", duration = 2000 }) {
  const [val, setVal] = useState(0);
  const [ref, vis] = useInView(0.3);
  useEffect(() => {
    if (!vis) return;
    let start = 0; const step = end / (duration / 16);
    const id = setInterval(() => { start += step; if (start >= end) { setVal(end); clearInterval(id); } else setVal(Math.floor(start)); }, 16);
    return () => clearInterval(id);
  }, [vis, end, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ───────────────────────── LOGO SVG ───────────────────────── */
const Logo = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGrad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="50%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
      <linearGradient id="innerGrad" x1="30" y1="30" x2="90" y2="90" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#818cf8" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="112" height="112" rx="24" fill="url(#logoGrad)" opacity="0.12" />
    <rect x="4" y="4" width="112" height="112" rx="24" stroke="url(#logoGrad)" strokeWidth="2.5" fill="none" />
    {/* Neural network nodes */}
    <circle cx="35" cy="40" r="6" fill="url(#innerGrad)" opacity="0.9" />
    <circle cx="35" cy="60" r="6" fill="url(#innerGrad)" opacity="0.9" />
    <circle cx="35" cy="80" r="6" fill="url(#innerGrad)" opacity="0.9" />
    <circle cx="60" cy="45" r="7" fill="url(#logoGrad)" />
    <circle cx="60" cy="75" r="7" fill="url(#logoGrad)" />
    <circle cx="85" cy="60" r="8" fill="url(#logoGrad)" />
    {/* Connections */}
    <line x1="41" y1="40" x2="53" y2="45" stroke="#818cf8" strokeWidth="1.5" opacity="0.5" />
    <line x1="41" y1="60" x2="53" y2="45" stroke="#818cf8" strokeWidth="1.5" opacity="0.5" />
    <line x1="41" y1="60" x2="53" y2="75" stroke="#818cf8" strokeWidth="1.5" opacity="0.5" />
    <line x1="41" y1="80" x2="53" y2="75" stroke="#818cf8" strokeWidth="1.5" opacity="0.5" />
    <line x1="67" y1="45" x2="77" y2="60" stroke="#a855f7" strokeWidth="1.5" opacity="0.6" />
    <line x1="67" y1="75" x2="77" y2="60" stroke="#a855f7" strokeWidth="1.5" opacity="0.6" />
    {/* A letter overlay */}
    <text x="60" y="68" textAnchor="middle" fontFamily="'Georgia', serif" fontSize="32" fontWeight="700" fill="white" opacity="0.95">A</text>
  </svg>
);

/* ───────────────────────── DATA ───────────────────────── */
const SERVICES = [
  {
    id: "ai-integration",
    label: "AI Integration & Development",
    icon: "⚡",
    desc: "Connect your products with production-grade AI services and build features powered by real intelligence — not just wrappers.",
    features: ["Model & API Integration (OpenAI, Anthropic, Gemini)", "RAG Pipelines, Embeddings & Vector Databases", "Agent Orchestration (LangChain, Google ADK, n8n)", "Observability, Evals & Guardrails", "MLOps: Versioning, Prompt Management, Rollout"],
  },
  {
    id: "agents",
    label: "AI Agents & Automation",
    icon: "🤖",
    desc: "Custom multi-agent ecosystems that automate complex business workflows across departments — Sales, HR, Marketing, Engineering, and more.",
    features: ["Multi-Agent Orchestration (10–15 agents per department)", "Workflow Automation (n8n, Zapier, Make, GoHighLevel)", "Personal Assistant Agents (Calendar, Email, Messaging)", "Local-First Agents with Privacy (Ollama + PostgreSQL)", "Webhook & OAuth Connector Development"],
  },
  {
    id: "cv-edge",
    label: "Computer Vision & Edge AI",
    icon: "👁️",
    desc: "Real-time detection, tracking, and recognition systems deployed on edge hardware — optimized for latency, accuracy, and power constraints.",
    features: ["Object Detection & Multi-Object Tracking (YOLOv9–v11)", "Video Surveillance & Smart Alert Systems", "TensorRT / ONNX Optimization for Edge Deployment", "NVIDIA Jetson Orin & ARM64 Tuning", "Face Recognition & Custom Classification Pipelines"],
  },
  {
    id: "ml-dl",
    label: "Custom ML & Deep Learning",
    icon: "🧠",
    desc: "End-to-end model development — from data collection and feature engineering through training, optimization, and production deployment.",
    features: ["Predictive Analytics (Churn, Forecasting, Inventory)", "NLP & Transformer Models (Hugging Face, Whisper)", "Time-Series Forecasting (ARIMA, Prophet, Custom)", "Model Optimization: Pruning, Quantization, Distillation", "Audio Analytics & Speech-to-Text Pipelines"],
  },
  {
    id: "data-eng",
    label: "Data Engineering & Pipelines",
    icon: "⚙️",
    desc: "Scalable ETL architectures, data warehouse design, and automated pipelines that make your data infrastructure reliable and fast.",
    features: ["3NF & Dimensional Modeling (Star/Snowflake Schema)", "ETL Pipeline Automation (AWS Glue, SQL, Python)", "Data Warehouse Architecture & Governance", "Real-Time & Batch Processing Pipelines", "Data Quality, Validation & Documentation Standards"],
  },
  {
    id: "analytics",
    label: "Data Analytics & BI Dashboards",
    icon: "📊",
    desc: "Executive dashboards, KPI frameworks, and advanced analytics that transform raw data into strategic decisions your leadership can act on.",
    features: ["Tableau & Power BI Dashboard Development", "KPI Framework Design & Metric Layer Abstraction", "Market Basket Analysis & Customer Segmentation", "Financial Modeling, Revenue Analytics & Forecasting", "RFM Analysis & Customer Profitability Modeling"],
  },
  {
    id: "genai",
    label: "Generative AI Solutions",
    icon: "✨",
    desc: "Harness the power of generative AI for content creation, chatbots, voicebots, and creative automation at scale.",
    features: ["LLM Fine-Tuning & Custom Model Training", "RAG Chatbots with Knowledge Base Retrieval", "Voicebot Development (ElevenLabs, Vapi)", "Content Generation & Summarization Systems", "Adaptive Learning & Personalization Engines"],
  },
  {
    id: "web-saas",
    label: "Web & SaaS Development",
    icon: "🚀",
    desc: "Performance-driven web applications and scalable SaaS platforms built with modern frameworks and production-grade infrastructure.",
    features: ["Full-Stack Development (React, Node.js, FastAPI)", "Scalable SaaS Architecture & Multi-Tenant Systems", "REST API Design & Integration Development", "CI/CD Pipelines & Blue/Green Deployments", "Firebase, Cloud Run & Kubernetes Deployments"],
  },
];

const PROJECTS = [
  { title: "Agent-First Insurance Platform", industry: "InsurTech", color: "#38bdf8", desc: "Architected a multi-agent ecosystem powering web + mobile frontends with RAG pipelines and sub-second knowledge retrieval.", metrics: ["70% less manual work", "6 secure connectors", "40% faster deploys"] },
  { title: "Real-Time Defense Vision System", industry: "Defense & IoT", color: "#ef4444", desc: "Multi-object tracking on NVIDIA Jetson Orin with TensorRT optimization, 40+ monitoring dashboards, and 95% uptime.", metrics: ["30% faster inference", "25% fewer false positives", "95% uptime"] },
  { title: "Sports Performance Analytics", industry: "Sports Analytics", color: "#22c55e", desc: "200M-row data warehouse transformation with star-schema modeling, predictive player positioning, and coaching dashboards.", metrics: ["200M+ rows processed", "45% faster analysis", "3NF → Star Schema"] },
  { title: "FMCG Analytics Automation", industry: "Retail / FMCG", color: "#f59e0b", desc: "Automated Pepsi KSA & UAE analytics pipeline — dramatically reduced refresh cycles and team requirements.", metrics: ["57% faster refresh", "66% team reduction", "Multi-region"] },
  { title: "Adastria Retail Intelligence", industry: "Fashion Retail", color: "#a855f7", desc: "Sales trend analysis, RFM customer segmentation, and executive dashboards for a major Japanese fashion retailer.", metrics: ["RFM segmentation", "Global expansion", "Executive BI"] },
  { title: "Multi-Agent Business Automation", industry: "Enterprise", color: "#ec4899", desc: "Orchestrated 10–15 specialized AI agents per department across Sales, HR, Marketing, and Engineering functions.", metrics: ["60% less manual work", "4+ departments", "Full automation"] },
];

const INDUSTRIES = ["E-commerce", "Healthcare", "Finance & Fintech", "Sports & Fitness", "Defense & Security", "Retail & FMCG", "Education", "Real Estate", "SaaS & Technology", "Automotive"];

const PROCESS = [
  { step: 1, title: "Discovery Call (Free)", desc: "We begin with a free consultation to understand your business goals, technical requirements, and timeline." },
  { step: 2, title: "Requirements & Architecture", desc: "We document your requirements and design the solution architecture, data flows, and technology stack." },
  { step: 3, title: "Proposal & Planning", desc: "You receive a detailed proposal with milestones, deliverables, and transparent pricing tailored to your project." },
  { step: 4, title: "Development & Iteration", desc: "Our team builds your solution in agile sprints with regular demos, feedback loops, and course corrections." },
  { step: 5, title: "Delivery & Support", desc: "We deploy to production, hand over documentation, and provide ongoing maintenance and optimization support." },
];

const TECH_STACK = {
  "AI & LLMs": ["LangChain", "LlamaIndex", "OpenAI", "Anthropic", "Gemini", "Google ADK", "n8n", "Ollama"],
  "ML & Deep Learning": ["PyTorch", "TensorFlow", "Hugging Face", "YOLOv9-v11", "Whisper", "scikit-learn"],
  "Vision & Edge": ["OpenCV", "TensorRT", "ONNX", "NVIDIA Jetson", "ARM64", "CUDA", "GOTURN"],
  "Cloud & MLOps": ["Docker", "Kubernetes", "FastAPI", "Firebase", "Cloud Run", "AWS Glue", "MLflow"],
  "Data & Analytics": ["PostgreSQL", "SQL Server", "Vector DB", "Tableau", "Power BI", "Pandas", "ETL"],
  "Development": ["Python", "C++", "Node.js", "React", "Qt", "REST APIs", "Git"],
};

const TESTIMONIALS = [
  { quote: "AZenthera delivered an AI agent ecosystem that cut our manual processing by 70%. Their technical depth and responsiveness made them feel like an in-house engineering team.", company: "ClaimbAI", role: "AI-Powered Insurance Platform, California", rating: 5 },
  { quote: "The data warehouse transformation of our 200M-row dataset was remarkable. The star-schema design they built powers all our analytics and forecasting today.", company: "AiGenius", role: "Sports Analytics Company", rating: 5 },
  { quote: "Their computer vision system on Jetson hardware exceeded our latency requirements. TensorRT optimizations alone improved inference by 30%. Highly recommended.", company: "COMCEPT", role: "Defense & Technology", rating: 5 },
  { quote: "They automated our entire Pepsi KSA & UAE analytics pipeline. Refresh went from 1 week to 3 days, and we went from needing 6 people to just 2.", company: "Convergent BT", role: "Analytics Consulting", rating: 5 },
  { quote: "Professional, respectful, and deeply knowledgeable. The retail analytics dashboards they built for Adastria are still the backbone of our decision-making.", company: "PlusW Tokyo", role: "Retail Analytics, Japan", rating: 5 },
];

const TEAM = [
  { name: "Afzal Khan", initials: "AK", role: "AI Engineer · ML/DL · Computer Vision · MLOps", bio: "3+ years building production AI systems — from LLM-powered agent ecosystems and RAG pipelines to real-time computer vision on edge hardware. NUST Mechatronics graduate, MIT MicroMasters in Statistics & Data Science.", highlights: ["Agent ecosystems (Google ADK, n8n, Firebase)", "Edge AI on NVIDIA Jetson (TensorRT, ONNX)", "RAG systems with sub-second retrieval", "Full-stack AI product development"] },
  { name: "Faisal Anwar Khan", initials: "FK", role: "BI Architect · Data Analytics · Data Engineering", bio: "Business Intelligence and Data Analytics professional with international experience across Japan, Pakistan, and US-based clients. NUST Mechatronics graduate, specialist in turning raw data into strategic decision-making frameworks.", highlights: ["Data warehouse design (3NF, Star, Snowflake)", "Executive dashboards in Tableau & Power BI", "Retail analytics for Adastria (Tokyo)", "Financial modeling, forecasting & KPI frameworks"] },
];

/* ───────────────────────── STYLES ───────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&display=swap');

:root {
  --bg: #0b1120;
  --bg2: #0f1729;
  --bg3: #141e33;
  --bg4: #1a2744;
  --accent1: #38bdf8;
  --accent2: #6366f1;
  --accent3: #a855f7;
  --white: #f1f5f9;
  --text: #cbd5e1;
  --dim: #64748b;
  --border: rgba(148,163,184,0.1);
  --border2: rgba(148,163,184,0.06);
  --glow1: rgba(56,189,248,0.08);
  --glow2: rgba(99,102,241,0.08);
  --font: 'Outfit', sans-serif;
  --font-d: 'Fraunces', serif;
}

*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior: smooth; }
body { font-family: var(--font); background: var(--bg); color: var(--text); -webkit-font-smoothing: antialiased; overflow-x: hidden; }

::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--bg4); border-radius: 4px; }

/* ── NAV ── */
.az-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; backdrop-filter: blur(24px); background: rgba(11,17,32,0.82); border-bottom: 1px solid var(--border); transition: .3s; }
.az-nav-inner { max-width: 1260px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 14px 36px; }
.az-nav-brand { display: flex; align-items: center; gap: 12px; text-decoration: none; cursor: pointer; }
.az-nav-brand span { font-weight: 700; font-size: 17px; color: var(--white); letter-spacing: -0.02em; }
.az-nav-links { display: flex; align-items: center; gap: 4px; }
.az-nav-link { background: none; border: none; color: var(--dim); font-family: var(--font); font-size: 13.5px; font-weight: 500; padding: 8px 14px; border-radius: 8px; cursor: pointer; transition: .2s; }
.az-nav-link:hover, .az-nav-link.active { color: var(--white); background: var(--glow1); }
.az-nav-cta { background: linear-gradient(135deg, var(--accent1), var(--accent2)); color: white; padding: 9px 22px; border-radius: 8px; font-size: 13.5px; font-weight: 600; border: none; cursor: pointer; transition: .25s; font-family: var(--font); }
.az-nav-cta:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(99,102,241,0.3); }
.az-mobile-btn { display: none; background: none; border: none; color: var(--white); font-size: 24px; cursor: pointer; }

/* ── HERO ── */
.az-hero { min-height: 100vh; display: flex; align-items: center; position: relative; overflow: hidden; padding: 120px 36px 80px; }
.az-hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 70% 50% at 25% 80%, rgba(56,189,248,0.06) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 75% 20%, rgba(99,102,241,0.08) 0%, transparent 50%), radial-gradient(ellipse 40% 30% at 50% 50%, rgba(168,85,247,0.04) 0%, transparent 50%); }
.az-hero-grid { position: absolute; inset: 0; opacity: .025; background-image: linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px); background-size: 64px 64px; }
.az-hero-orb1 { position: absolute; top: -120px; right: -80px; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%); filter: blur(60px); animation: float1 8s ease-in-out infinite; }
.az-hero-orb2 { position: absolute; bottom: -100px; left: -60px; width: 350px; height: 350px; border-radius: 50%; background: radial-gradient(circle, rgba(56,189,248,0.1), transparent 70%); filter: blur(50px); animation: float2 10s ease-in-out infinite; }
@keyframes float1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-30px, 20px); } }
@keyframes float2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(20px, -30px); } }

.az-hero-inner { max-width: 1260px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; position: relative; width: 100%; }
.az-hero-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; border-radius: 100px; background: var(--glow1); border: 1px solid rgba(56,189,248,0.15); font-size: 13px; font-weight: 500; color: var(--accent1); margin-bottom: 28px; }
.az-pulse { width: 7px; height: 7px; border-radius: 50%; background: var(--accent1); animation: pulse 2s infinite; }
@keyframes pulse { 0%,100% { opacity:1; box-shadow: 0 0 0 0 rgba(56,189,248,0.4); } 50% { opacity:.6; box-shadow: 0 0 0 6px rgba(56,189,248,0); } }

.az-hero h1 { font-family: var(--font-d); font-size: clamp(36px, 5vw, 58px); font-weight: 700; color: var(--white); line-height: 1.12; margin-bottom: 20px; letter-spacing: -.02em; }
.az-hero h1 em { font-style: italic; background: linear-gradient(135deg, var(--accent1), var(--accent3)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.az-hero-sub { font-size: 16.5px; line-height: 1.75; color: var(--text); max-width: 520px; margin-bottom: 36px; }
.az-hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }
.az-btn-primary { background: linear-gradient(135deg, var(--accent1), var(--accent2)); color: white; padding: 14px 32px; border-radius: 10px; font-size: 15px; font-weight: 600; border: none; cursor: pointer; transition: .25s; font-family: var(--font); display: inline-flex; align-items: center; gap: 8px; text-decoration: none; }
.az-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(99,102,241,0.35); }
.az-btn-ghost { background: transparent; color: var(--text); padding: 14px 32px; border-radius: 10px; font-size: 15px; font-weight: 500; border: 1px solid var(--border); cursor: pointer; transition: .25s; font-family: var(--font); text-decoration: none; }
.az-btn-ghost:hover { border-color: var(--accent1); color: var(--accent1); }

.az-hero-visual { position: relative; display: flex; justify-content: center; align-items: center; }
.az-hero-card { background: var(--bg3); border: 1px solid var(--border); border-radius: 20px; padding: 32px; width: 100%; max-width: 420px; }
.az-hero-card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
.az-hero-card-dot { width: 10px; height: 10px; border-radius: 50%; }
.az-hero-card-line { height: 12px; border-radius: 6px; margin-bottom: 10px; }
.az-hero-card-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 20px; }
.az-hero-stat { background: var(--bg2); border: 1px solid var(--border2); border-radius: 12px; padding: 16px; text-align: center; }
.az-hero-stat-num { font-family: var(--font-d); font-size: 28px; font-weight: 700; color: var(--white); }
.az-hero-stat-label { font-size: 11px; color: var(--dim); text-transform: uppercase; letter-spacing: .1em; margin-top: 2px; }

/* ── SECTION ── */
.az-section { padding: 100px 36px; max-width: 1260px; margin: 0 auto; }
.az-section-full { padding: 100px 36px; }
.az-section-full-inner { max-width: 1260px; margin: 0 auto; }
.az-label { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: .16em; background: linear-gradient(135deg, var(--accent1), var(--accent3)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 14px; display: inline-block; }
.az-title { font-family: var(--font-d); font-size: clamp(26px, 3.5vw, 40px); font-weight: 600; color: var(--white); margin-bottom: 14px; letter-spacing: -.01em; }
.az-desc { font-size: 15.5px; line-height: 1.7; color: var(--dim); max-width: 580px; margin-bottom: 48px; }
.az-divider { max-width: 1260px; margin: 0 auto; border: none; border-top: 1px solid var(--border); }

/* ── ABOUT ── */
.az-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
.az-about-story { font-size: 15px; line-height: 1.8; color: var(--text); }
.az-about-story p { margin-bottom: 16px; }
.az-about-highlights { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.az-about-hl { background: var(--bg3); border: 1px solid var(--border); border-radius: 14px; padding: 24px; text-align: center; }
.az-about-hl-icon { font-size: 28px; margin-bottom: 8px; }
.az-about-hl-title { font-size: 14px; font-weight: 600; color: var(--white); }
.az-about-hl-desc { font-size: 12px; color: var(--dim); margin-top: 4px; }

/* ── SERVICES TABBED ── */
.az-services-wrap { display: grid; grid-template-columns: 340px 1fr; gap: 0; border-radius: 20px; overflow: hidden; border: 1px solid var(--border); min-height: 520px; }
.az-services-sidebar { background: var(--bg3); padding: 28px 20px; display: flex; flex-direction: column; gap: 4px; overflow-y: auto; }
.az-service-tab { display: flex; align-items: center; gap: 12px; padding: 14px 18px; border-radius: 12px; cursor: pointer; border: none; background: transparent; font-family: var(--font); font-size: 14px; font-weight: 500; color: var(--dim); transition: .2s; text-align: left; width: 100%; }
.az-service-tab:hover { background: rgba(56,189,248,0.06); color: var(--text); }
.az-service-tab.active { background: linear-gradient(135deg, rgba(56,189,248,0.12), rgba(99,102,241,0.12)); color: var(--white); font-weight: 600; border: 1px solid rgba(56,189,248,0.15); }
.az-service-tab-icon { font-size: 20px; flex-shrink: 0; }
.az-services-content { background: var(--bg2); padding: 40px 36px; }
.az-services-content h3 { font-family: var(--font-d); font-size: 26px; font-weight: 600; color: var(--white); margin-bottom: 14px; }
.az-services-content > p { font-size: 15px; line-height: 1.7; color: var(--text); margin-bottom: 28px; }
.az-feature-list { list-style: none; display: flex; flex-direction: column; gap: 14px; }
.az-feature-item { display: flex; align-items: flex-start; gap: 12px; font-size: 14.5px; color: var(--text); line-height: 1.5; }
.az-feature-check { flex-shrink: 0; width: 22px; height: 22px; border-radius: 6px; background: linear-gradient(135deg, rgba(56,189,248,0.15), rgba(99,102,241,0.15)); display: flex; align-items: center; justify-content: center; font-size: 12px; color: var(--accent1); margin-top: 1px; }

/* ── PROJECTS ── */
.az-projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 20px; }
.az-project-card { background: var(--bg3); border: 1px solid var(--border); border-radius: 16px; padding: 28px; transition: .3s; position: relative; overflow: hidden; }
.az-project-card:hover { border-color: rgba(56,189,248,0.2); transform: translateY(-4px); box-shadow: 0 20px 50px rgba(0,0,0,0.3); }
.az-project-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--accent1), var(--accent2)); opacity: 0; transition: .3s; }
.az-project-card:hover::before { opacity: 1; }
.az-project-industry { display: inline-block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .08em; padding: 4px 12px; border-radius: 6px; margin-bottom: 14px; }
.az-project-card h3 { font-size: 17px; font-weight: 600; color: var(--white); margin-bottom: 10px; }
.az-project-card > p { font-size: 13.5px; line-height: 1.65; color: var(--dim); margin-bottom: 18px; }
.az-project-metrics { display: flex; flex-wrap: wrap; gap: 8px; }
.az-project-metric { font-size: 12px; padding: 5px 12px; border-radius: 6px; background: var(--bg); color: var(--accent1); border: 1px solid var(--border); font-weight: 500; }

/* ── INDUSTRIES ── */
.az-industries { display: flex; flex-wrap: wrap; gap: 10px; }
.az-industry-tag { padding: 10px 20px; border-radius: 10px; background: var(--bg3); border: 1px solid var(--border); font-size: 14px; font-weight: 500; color: var(--text); transition: .2s; cursor: default; }
.az-industry-tag:hover { border-color: var(--accent1); color: var(--accent1); background: var(--glow1); }

/* ── PROCESS ── */
.az-process-steps { display: flex; flex-direction: column; gap: 0; position: relative; padding-left: 40px; }
.az-process-line { position: absolute; left: 15px; top: 24px; bottom: 24px; width: 2px; background: linear-gradient(180deg, var(--accent1), var(--accent2), var(--accent3)); border-radius: 2px; }
.az-step { display: flex; gap: 28px; padding: 24px 0; position: relative; }
.az-step-num { position: absolute; left: -40px; width: 32px; height: 32px; border-radius: 50%; background: var(--bg); border: 2px solid var(--accent1); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: var(--accent1); z-index: 1; }
.az-step-content h4 { font-size: 17px; font-weight: 600; color: var(--white); margin-bottom: 6px; }
.az-step-content p { font-size: 14px; line-height: 1.65; color: var(--dim); max-width: 500px; }

/* ── STATS ── */
.az-stats-bar { background: linear-gradient(135deg, var(--bg3), var(--bg4)); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 60px 36px; }
.az-stats-inner { max-width: 1260px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; text-align: center; }
.az-stat-num { font-family: var(--font-d); font-size: 42px; font-weight: 700; background: linear-gradient(135deg, var(--accent1), var(--accent3)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.az-stat-label { font-size: 13px; color: var(--dim); margin-top: 4px; text-transform: uppercase; letter-spacing: .08em; }

/* ── TECH ── */
.az-tech-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 18px; }
.az-tech-cat { background: var(--bg3); border: 1px solid var(--border); border-radius: 14px; padding: 24px; }
.az-tech-cat h4 { font-size: 13px; font-weight: 600; color: var(--accent1); text-transform: uppercase; letter-spacing: .08em; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid var(--border); }
.az-tech-items { display: flex; flex-wrap: wrap; gap: 6px; }
.az-tech-pill { font-size: 12.5px; padding: 5px 12px; border-radius: 6px; background: var(--bg); border: 1px solid var(--border2); color: var(--text); transition: .2s; }
.az-tech-pill:hover { border-color: var(--accent2); color: var(--accent1); }

/* ── TEAM ── */
.az-team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(460px, 1fr)); gap: 24px; }
.az-team-card { background: var(--bg3); border: 1px solid var(--border); border-radius: 20px; padding: 36px; position: relative; overflow: hidden; }
.az-team-card::after { content: ''; position: absolute; top: -80px; right: -80px; width: 200px; height: 200px; border-radius: 50%; background: var(--glow2); filter: blur(50px); }
.az-team-avatar { width: 64px; height: 64px; border-radius: 16px; background: linear-gradient(135deg, var(--accent1), var(--accent2)); display: flex; align-items: center; justify-content: center; font-size: 22px; font-weight: 700; color: white; margin-bottom: 18px; position: relative; z-index: 1; }
.az-team-card h3 { font-size: 20px; font-weight: 700; color: var(--white); margin-bottom: 4px; position: relative; z-index: 1; }
.az-team-role { font-size: 13.5px; color: var(--accent1); margin-bottom: 14px; font-weight: 500; position: relative; z-index: 1; }
.az-team-bio { font-size: 13.5px; line-height: 1.7; color: var(--dim); margin-bottom: 18px; position: relative; z-index: 1; }
.az-team-hls { display: flex; flex-direction: column; gap: 8px; position: relative; z-index: 1; }
.az-team-hl { font-size: 13px; color: var(--text); display: flex; align-items: flex-start; gap: 8px; }
.az-team-hl::before { content: '→'; color: var(--accent1); font-weight: 600; flex-shrink: 0; }

/* ── TESTIMONIALS ── */
.az-test-track { display: flex; gap: 20px; overflow-x: auto; padding: 8px 0 20px; scroll-snap-type: x mandatory; -ms-overflow-style: none; scrollbar-width: none; }
.az-test-track::-webkit-scrollbar { display: none; }
.az-test-card { min-width: 380px; max-width: 380px; scroll-snap-align: start; background: var(--bg3); border: 1px solid var(--border); border-radius: 16px; padding: 28px; flex-shrink: 0; }
.az-test-stars { color: #facc15; font-size: 14px; margin-bottom: 14px; letter-spacing: 2px; }
.az-test-quote { font-size: 14.5px; line-height: 1.7; color: var(--text); margin-bottom: 20px; font-style: italic; }
.az-test-quote::before { content: '"'; font-family: var(--font-d); font-size: 40px; color: var(--accent2); line-height: 1; display: block; margin-bottom: 6px; }
.az-test-author { display: flex; align-items: center; gap: 12px; }
.az-test-avatar { width: 38px; height: 38px; border-radius: 10px; background: var(--bg4); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; color: var(--accent1); }
.az-test-name { font-size: 14px; font-weight: 600; color: var(--white); }
.az-test-role { font-size: 12px; color: var(--dim); }

/* ── CTA ── */
.az-cta-section { background: linear-gradient(135deg, var(--bg3) 0%, var(--bg4) 100%); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 80px 36px; text-align: center; }
.az-cta-section h2 { font-family: var(--font-d); font-size: clamp(26px, 3vw, 38px); font-weight: 600; color: var(--white); margin-bottom: 16px; }
.az-cta-section p { font-size: 16px; line-height: 1.7; color: var(--dim); max-width: 600px; margin: 0 auto 32px; }

/* ── CONTACT ── */
.az-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
.az-contact-info h3 { font-size: 22px; font-weight: 600; color: var(--white); margin-bottom: 14px; }
.az-contact-info > p { font-size: 15px; line-height: 1.7; color: var(--dim); margin-bottom: 28px; }
.az-contact-item { display: flex; align-items: center; gap: 14px; margin-bottom: 18px; }
.az-contact-icon { width: 44px; height: 44px; border-radius: 12px; background: var(--glow1); border: 1px solid rgba(56,189,248,0.1); display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
.az-contact-label { font-size: 11px; color: var(--dim); text-transform: uppercase; letter-spacing: .08em; }
.az-contact-val { font-size: 14px; color: var(--white); }
.az-form { background: var(--bg3); border: 1px solid var(--border); border-radius: 20px; padding: 36px; }
.az-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
.az-form-group { margin-bottom: 14px; }
.az-form-label { display: block; font-size: 12px; font-weight: 500; color: var(--dim); margin-bottom: 6px; text-transform: uppercase; letter-spacing: .06em; }
.az-input, .az-textarea, .az-select { width: 100%; padding: 12px 16px; border-radius: 10px; background: var(--bg); border: 1px solid var(--border); color: var(--white); font-family: var(--font); font-size: 14px; transition: .2s; outline: none; }
.az-input:focus, .az-textarea:focus, .az-select:focus { border-color: var(--accent1); box-shadow: 0 0 0 3px var(--glow1); }
.az-textarea { resize: vertical; min-height: 110px; }
.az-select { appearance: none; cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath fill='%2364748b' d='M5 6L0 0h10z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 16px center; }

/* ── FOOTER ── */
.az-footer { border-top: 1px solid var(--border); padding: 48px 36px; }
.az-footer-inner { max-width: 1260px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
.az-footer-text { font-size: 13px; color: var(--dim); }
.az-footer-links { display: flex; gap: 20px; }
.az-footer-link { font-size: 13px; color: var(--dim); text-decoration: none; transition: .2s; cursor: pointer; background: none; border: none; font-family: var(--font); }
.az-footer-link:hover { color: var(--accent1); }

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .az-services-wrap { grid-template-columns: 1fr; }
  .az-services-sidebar { flex-direction: row; flex-wrap: wrap; padding: 16px; }
  .az-service-tab { padding: 10px 14px; font-size: 13px; }
}
@media (max-width: 768px) {
  .az-nav-links { display: none; }
  .az-mobile-btn { display: block; }
  .az-nav-links.open { display: flex; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0; background: rgba(11,17,32,.97); backdrop-filter: blur(20px); padding: 16px; border-bottom: 1px solid var(--border); }
  .az-hero-inner { grid-template-columns: 1fr; text-align: center; }
  .az-hero-sub { margin: 0 auto 36px; }
  .az-hero-actions { justify-content: center; }
  .az-hero-visual { display: none; }
  .az-about-grid { grid-template-columns: 1fr; }
  .az-projects-grid { grid-template-columns: 1fr; }
  .az-team-grid { grid-template-columns: 1fr; }
  .az-contact-grid { grid-template-columns: 1fr; }
  .az-stats-inner { grid-template-columns: 1fr 1fr; }
  .az-section, .az-section-full { padding: 60px 20px; }
  .az-hero { padding: 100px 20px 60px; }
  .az-form-row { grid-template-columns: 1fr; }
  .az-test-card { min-width: 300px; max-width: 300px; }
}
`;

/* ───────────────────────── MAIN COMPONENT ───────────────────────── */
export default function AZentheraSite() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const NAVS = ["home", "about", "services", "projects", "process", "team", "testimonials", "contact"];

  useEffect(() => {
    const onScroll = () => {
      const s = NAVS.map(id => {
        const el = document.getElementById(id);
        return el ? { id, d: Math.abs(el.getBoundingClientRect().top) } : { id, d: 99999 };
      });
      setActiveSection(s.reduce((a, b) => a.d < b.d ? a : b).id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = id => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMobileOpen(false); };

  const handleSubmit = () => {
    if (form.name && form.email && form.message) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setForm({ name: "", email: "", service: "", message: "" });
    }
  };

  const svc = SERVICES[activeService];

  return (
    <>
      <style>{CSS}</style>

      {/* ── NAV ── */}
      <nav className="az-nav">
        <div className="az-nav-inner">
          <div className="az-nav-brand" onClick={() => go("home")}>
            <Logo size={36} />
            <span>AZenthera AI</span>
          </div>
          <button className="az-mobile-btn" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? "✕" : "☰"}</button>
          <div className={`az-nav-links ${mobileOpen ? "open" : ""}`}>
            {[["about","About"],["services","Services"],["projects","Case Studies"],["process","Process"],["team","Team"],["testimonials","Testimonials"]].map(([id,l]) => (
              <button key={id} className={`az-nav-link ${activeSection===id?"active":""}`} onClick={() => go(id)}>{l}</button>
            ))}
            <button className="az-nav-cta" onClick={() => go("contact")}>Get a Quote</button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="az-hero" id="home">
        <div className="az-hero-bg" />
        <div className="az-hero-grid" />
        <div className="az-hero-orb1" />
        <div className="az-hero-orb2" />
        <div className="az-hero-inner">
          <div>
            <Reveal><div className="az-hero-badge"><span className="az-pulse" /> Available for new projects</div></Reveal>
            <Reveal delay={0.1}><h1>Enterprise AI &amp; Data Solutions, <em>Delivered</em></h1></Reveal>
            <Reveal delay={0.2}><p className="az-hero-sub">AZenthera AI builds production-grade AI systems — from intelligent agents and computer vision to scalable data pipelines and executive dashboards. Remote-first team, world-class engineering.</p></Reveal>
            <Reveal delay={0.3}>
              <div className="az-hero-actions">
                <button className="az-btn-primary" onClick={() => go("contact")}>Start a Project →</button>
                <button className="az-btn-ghost" onClick={() => go("projects")}>View Case Studies</button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="az-hero-visual">
              <div className="az-hero-card">
                <div className="az-hero-card-header">
                  <div className="az-hero-card-dot" style={{ background: "#ef4444" }} />
                  <div className="az-hero-card-dot" style={{ background: "#facc15" }} />
                  <div className="az-hero-card-dot" style={{ background: "#22c55e" }} />
                  <span style={{ fontSize: 12, color: "var(--dim)", marginLeft: 8 }}>azenthera-dashboard.tsx</span>
                </div>
                <div className="az-hero-card-line" style={{ width: "75%", background: "rgba(56,189,248,0.15)" }} />
                <div className="az-hero-card-line" style={{ width: "90%", background: "rgba(99,102,241,0.1)" }} />
                <div className="az-hero-card-line" style={{ width: "60%", background: "rgba(168,85,247,0.1)" }} />
                <div className="az-hero-card-line" style={{ width: "80%", background: "rgba(56,189,248,0.08)" }} />
                <div className="az-hero-card-stats">
                  <div className="az-hero-stat"><div className="az-hero-stat-num">97%</div><div className="az-hero-stat-label">Accuracy</div></div>
                  <div className="az-hero-stat"><div className="az-hero-stat-num">&lt;50ms</div><div className="az-hero-stat-label">Latency</div></div>
                  <div className="az-hero-stat"><div className="az-hero-stat-num">24/7</div><div className="az-hero-stat-label">Uptime</div></div>
                  <div className="az-hero-stat"><div className="az-hero-stat-num">10+</div><div className="az-hero-stat-label">AI Agents</div></div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="az-stats-bar">
        <div className="az-stats-inner">
          {[
            [30, "+", "Projects Delivered"],
            [98, "%", "Client Satisfaction"],
            [200, "M+", "Data Rows Processed"],
            [6, "+", "Industries Served"],
          ].map(([n, s, l]) => (
            <div key={l}>
              <div className="az-stat-num"><AnimCounter end={n} suffix={s} /></div>
              <div className="az-stat-label">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className="az-section" id="about">
        <Reveal><div className="az-label">About Us</div></Reveal>
        <Reveal delay={0.05}><h2 className="az-title">Who We Are &amp; Our Story</h2></Reveal>
        <div className="az-about-grid" style={{ marginTop: 40 }}>
          <Reveal delay={0.1}>
            <div className="az-about-story">
              <p>AZenthera AI was founded by two NUST-trained Mechatronics engineers who share a passion for building intelligent systems that solve real business problems. With complementary expertise spanning AI engineering, computer vision, data science, and business intelligence, we deliver end-to-end solutions from proof-of-concept to production deployment.</p>
              <p>Our clients range from California-based startups to Japanese fashion retailers, from defense contractors to FMCG giants like PepsiCo. We've processed over 200 million data rows, deployed multi-agent ecosystems, and optimized real-time computer vision systems on edge hardware.</p>
              <p>We operate as a lean, remote-first team — which means you get senior-level engineering talent at competitive rates, with the flexibility and responsiveness of a dedicated in-house team.</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="az-about-highlights">
              <div className="az-about-hl"><div className="az-about-hl-icon">🎓</div><div className="az-about-hl-title">NUST Engineers</div><div className="az-about-hl-desc">Top-tier engineering education</div></div>
              <div className="az-about-hl"><div className="az-about-hl-icon">🌍</div><div className="az-about-hl-title">Global Clients</div><div className="az-about-hl-desc">USA, Japan, UAE, Europe</div></div>
              <div className="az-about-hl"><div className="az-about-hl-icon">⚡</div><div className="az-about-hl-title">Production-Grade</div><div className="az-about-hl-desc">Not demos — real systems</div></div>
              <div className="az-about-hl"><div className="az-about-hl-icon">🤝</div><div className="az-about-hl-title">Transparent Pricing</div><div className="az-about-hl-desc">No hidden costs or surprises</div></div>
            </div>
          </Reveal>
        </div>
      </section>

      <hr className="az-divider" />

      {/* ── SERVICES ── */}
      <section className="az-section" id="services">
        <Reveal><div className="az-label">Our Services</div></Reveal>
        <Reveal delay={0.05}><h2 className="az-title">Excellence in AI &amp; Data Services</h2></Reveal>
        <Reveal delay={0.1}><p className="az-desc">From intelligent automation to production ML — we cover the full spectrum of AI and data engineering services your business needs to scale.</p></Reveal>
        <Reveal delay={0.15}>
          <div className="az-services-wrap">
            <div className="az-services-sidebar">
              {SERVICES.map((s, i) => (
                <button key={s.id} className={`az-service-tab ${i === activeService ? "active" : ""}`} onClick={() => setActiveService(i)}>
                  <span className="az-service-tab-icon">{s.icon}</span>
                  {s.label}
                </button>
              ))}
            </div>
            <div className="az-services-content">
              <h3>{svc.icon} {svc.label}</h3>
              <p>{svc.desc}</p>
              <ul className="az-feature-list">
                {svc.features.map((f, i) => (
                  <li key={i} className="az-feature-item">
                    <span className="az-feature-check">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      <hr className="az-divider" />

      {/* ── INDUSTRIES ── */}
      <section className="az-section">
        <Reveal><div className="az-label">Industries</div></Reveal>
        <Reveal delay={0.05}><h2 className="az-title">Powering Businesses Across Industries</h2></Reveal>
        <Reveal delay={0.1}><p className="az-desc">We deliver custom AI and data solutions that streamline operations and enhance experiences across diverse sectors.</p></Reveal>
        <Reveal delay={0.15}>
          <div className="az-industries">
            {INDUSTRIES.map(ind => <span key={ind} className="az-industry-tag">{ind}</span>)}
          </div>
        </Reveal>
      </section>

      <hr className="az-divider" />

      {/* ── CASE STUDIES ── */}
      <section className="az-section" id="projects">
        <Reveal><div className="az-label">Case Studies</div></Reveal>
        <Reveal delay={0.05}><h2 className="az-title">Real Projects, Measurable Results</h2></Reveal>
        <Reveal delay={0.1}><p className="az-desc">From agent ecosystems to real-time vision systems — here's a selection of what we've delivered across industries.</p></Reveal>
        <div className="az-projects-grid">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07}>
              <div className="az-project-card">
                <span className="az-project-industry" style={{ background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}30` }}>{p.industry}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="az-project-metrics">
                  {p.metrics.map(m => <span key={m} className="az-project-metric">{m}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <hr className="az-divider" />

      {/* ── PROCESS ── */}
      <section className="az-section" id="process">
        <Reveal><div className="az-label">How We Work</div></Reveal>
        <Reveal delay={0.05}><h2 className="az-title">Our Process: From Idea to Production</h2></Reveal>
        <Reveal delay={0.1}><p className="az-desc">A transparent, structured workflow designed to take your project from initial concept to live, production-grade deployment.</p></Reveal>
        <Reveal delay={0.15}>
          <div className="az-process-steps">
            <div className="az-process-line" />
            {PROCESS.map(s => (
              <div key={s.step} className="az-step">
                <div className="az-step-num">{s.step}</div>
                <div className="az-step-content">
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <hr className="az-divider" />

      {/* ── TECH STACK ── */}
      <section className="az-section" id="tech">
        <Reveal><div className="az-label">Technology Stack</div></Reveal>
        <Reveal delay={0.05}><h2 className="az-title">Battle-Tested Tools &amp; Frameworks</h2></Reveal>
        <Reveal delay={0.1}><p className="az-desc">We use industry-leading tools to deliver robust, scalable, and maintainable solutions.</p></Reveal>
        <div className="az-tech-grid">
          {Object.entries(TECH_STACK).map(([cat, items], i) => (
            <Reveal key={cat} delay={i * 0.06}>
              <div className="az-tech-cat">
                <h4>{cat}</h4>
                <div className="az-tech-items">
                  {items.map(item => <span key={item} className="az-tech-pill">{item}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <hr className="az-divider" />

      {/* ── TEAM ── */}
      <section className="az-section" id="team">
        <Reveal><div className="az-label">Our Team</div></Reveal>
        <Reveal delay={0.05}><h2 className="az-title">Meet the Engineers Behind AZenthera</h2></Reveal>
        <Reveal delay={0.1}><p className="az-desc">Two NUST-trained engineers with complementary expertise spanning AI, data, and systems engineering.</p></Reveal>
        <div className="az-team-grid">
          {TEAM.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div className="az-team-card">
                <div className="az-team-avatar">{t.initials}</div>
                <h3>{t.name}</h3>
                <div className="az-team-role">{t.role}</div>
                <p className="az-team-bio">{t.bio}</p>
                <div className="az-team-hls">
                  {t.highlights.map(h => <span key={h} className="az-team-hl">{h}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <hr className="az-divider" />

      {/* ── TESTIMONIALS ── */}
      <section className="az-section" id="testimonials">
        <Reveal><div className="az-label">Client Feedback</div></Reveal>
        <Reveal delay={0.05}><h2 className="az-title">What Our Clients Say About AZenthera</h2></Reveal>
        <Reveal delay={0.1}><p className="az-desc">We build lasting partnerships through consistent delivery and transparent communication.</p></Reveal>
        <Reveal delay={0.15}>
          <div className="az-test-track">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="az-test-card">
                <div className="az-test-stars">{"★".repeat(t.rating)}</div>
                <p className="az-test-quote">{t.quote}</p>
                <div className="az-test-author">
                  <div className="az-test-avatar">{t.company[0]}</div>
                  <div>
                    <div className="az-test-name">{t.company}</div>
                    <div className="az-test-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── CTA BANNER ── */}
      <div className="az-cta-section">
        <Reveal>
          <h2>Let's Build the Future — Together</h2>
          <p>Ready to take your business to the next level with the power of AI, automation, and intelligent data systems? We'd love to hear about your project.</p>
          <button className="az-btn-primary" onClick={() => go("contact")} style={{ margin: "0 auto" }}>Book a Free Consultation →</button>
        </Reveal>
      </div>

      {/* ── CONTACT ── */}
      <section className="az-section" id="contact">
        <Reveal><div className="az-label">Get in Touch</div></Reveal>
        <Reveal delay={0.05}><h2 className="az-title">Start Your Project Today</h2></Reveal>
        <Reveal delay={0.1}><p className="az-desc">Tell us about your project and we'll get back to you within 24 hours with a tailored proposal.</p></Reveal>
        <Reveal delay={0.15}>
          <div className="az-contact-grid">
            <div className="az-contact-info">
              <h3>Reach Out Directly</h3>
              <p>Whether you have a well-defined project or just a rough idea, we're happy to discuss it. We work across all time zones and are flexible with communication.</p>
              <div className="az-contact-item">
                <div className="az-contact-icon">✉</div>
                <div><div className="az-contact-label">Email</div><div className="az-contact-val">afzaljawadkhan@gmail.com</div></div>
              </div>
              <div className="az-contact-item">
                <div className="az-contact-icon">📍</div>
                <div><div className="az-contact-label">Location</div><div className="az-contact-val">Islamabad, Pakistan · Serving clients worldwide</div></div>
              </div>
              <div className="az-contact-item">
                <div className="az-contact-icon">🕐</div>
                <div><div className="az-contact-label">Availability</div><div className="az-contact-val">Flexible hours · US &amp; EU time zones</div></div>
              </div>
              <div className="az-contact-item">
                <div className="az-contact-icon">📞</div>
                <div><div className="az-contact-label">Phone</div><div className="az-contact-val">+92 337 9755627</div></div>
              </div>
            </div>
            <div className="az-form">
              {submitted ? (
                <div style={{ textAlign: "center", padding: "52px 0" }}>
                  <div style={{ fontSize: 52, marginBottom: 16 }}>✓</div>
                  <h3 style={{ color: "var(--white)", fontSize: 20, marginBottom: 8 }}>Message Sent!</h3>
                  <p style={{ color: "var(--dim)", fontSize: 14 }}>We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <div className="az-form-row">
                    <div className="az-form-group">
                      <label className="az-form-label">Name</label>
                      <input className="az-input" placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    </div>
                    <div className="az-form-group">
                      <label className="az-form-label">Email</label>
                      <input className="az-input" type="email" placeholder="you@company.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                    </div>
                  </div>
                  <div className="az-form-group">
                    <label className="az-form-label">Service Interested In</label>
                    <select className="az-select" value={form.service} onChange={e => setForm({...form, service: e.target.value})}>
                      <option value="">Select a service...</option>
                      {SERVICES.map(s => <option key={s.id}>{s.label}</option>)}
                      <option>Other / Not Sure</option>
                    </select>
                  </div>
                  <div className="az-form-group">
                    <label className="az-form-label">Project Details</label>
                    <textarea className="az-textarea" placeholder="Tell us about your project, timeline, and budget range..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                  </div>
                  <button className="az-btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={handleSubmit}>Send Message →</button>
                </>
              )}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer className="az-footer">
        <div className="az-footer-inner">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Logo size={28} />
            <span className="az-footer-text">© 2026 AZenthera AI · Islamabad, Pakistan · Serving clients worldwide</span>
          </div>
          <div className="az-footer-links">
            {[["services","Services"],["projects","Case Studies"],["team","Team"],["contact","Contact"]].map(([id,l]) => (
              <button key={id} className="az-footer-link" onClick={() => go(id)}>{l}</button>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
