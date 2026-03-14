// =============================================================================
// TypeScript Interfaces & Types
// =============================================================================

export interface NavLink {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  features: string[];
  technologies: string[];
  benefits: string[];
  overview: string;
  heroDescription: string;
}

export interface Industry {
  title: string;
  description: string;
  icon: string;
}

export interface CaseStudyResult {
  metric: string;
  value: string;
  description: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  category: string;
  client: string;
  duration: string;
  description: string;
  problem: string;
  solution: string;
  architecture: string;
  techStack: string[];
  results: CaseStudyResult[];
  imagePlaceholder: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

export interface TechStackCategory {
  category: string;
  technologies: string[];
}

export interface WhyChooseUsItem {
  title: string;
  description: string;
}

export interface FooterLinkGroup {
  title: string;
  links: { href: string; label: string }[];
}

export interface TeamMember {
  name: string;
  initials: string;
  role: string;
  bio: string;
  highlights: string[];
}

// =============================================================================
// Navigation Links
// =============================================================================

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  {
    href: "/services",
    label: "Services",
    children: [
      { href: "/services/ai-development", label: "AI Integration & Development" },
      { href: "/services/ai-agents", label: "AI Agents & Automation" },
      { href: "/services/computer-vision", label: "Computer Vision & Edge AI" },
      { href: "/services/ml-deep-learning", label: "Custom ML & Deep Learning" },
      { href: "/services/data-engineering", label: "Data Engineering & Pipelines" },
      { href: "/services/data-analytics", label: "Data Analytics & BI Dashboards" },
      { href: "/services/generative-ai", label: "Generative AI Solutions" },
      { href: "/services/iot-development", label: "IoT & Embedded Systems" },
      { href: "/services/web-saas", label: "Web & SaaS Development" },
    ],
  },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/industries", label: "Industries" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// =============================================================================
// Services
// =============================================================================

export const services: Service[] = [
  {
    slug: "ai-development",
    title: "AI Integration & Development",
    shortTitle: "AI Integration",
    description:
      "Connect your products with production-grade AI services and build features powered by real intelligence — not just wrappers.",
    icon: "⚡",
    features: [
      "Model & API Integration (OpenAI, Anthropic, Gemini)",
      "RAG Pipelines, Embeddings & Vector Databases",
      "Agent Orchestration (LangChain, Google ADK, n8n)",
      "Observability, Evals & Guardrails",
      "MLOps: Versioning, Prompt Management, Rollout",
    ],
    technologies: ["Python", "LangChain", "LlamaIndex", "OpenAI", "Anthropic", "Gemini", "Pinecone", "MLflow"],
    benefits: [
      "Seamless integration with existing systems",
      "Production-ready AI pipelines with guardrails",
      "Scalable model deployment and versioning",
      "Continuous monitoring and optimization",
    ],
    overview:
      "Our AI Integration & Development services help businesses connect their products with cutting-edge AI capabilities. We specialize in MLOps practices, model integration, RAG pipeline development, and intelligent agent orchestration. From prototyping to production, we ensure your AI solutions are robust, observable, and aligned with your business goals.",
    heroDescription:
      "Connect your products with production-grade AI services and build truly intelligent features.",
  },
  {
    slug: "ai-agents",
    title: "AI Agents & Automation",
    shortTitle: "AI Agents",
    description:
      "Custom multi-agent ecosystems that automate complex business workflows across departments — Sales, HR, Marketing, Engineering, and more.",
    icon: "🤖",
    features: [
      "Multi-Agent Orchestration (10–15 agents per department)",
      "Workflow Automation (n8n, Zapier, Make, GoHighLevel)",
      "Personal Assistant Agents (Calendar, Email, Messaging)",
      "Local-First Agents with Privacy (Ollama + PostgreSQL)",
      "Webhook & OAuth Connector Development",
    ],
    technologies: ["Google ADK", "LangChain", "n8n", "Zapier", "Make", "Ollama", "Firebase", "PostgreSQL"],
    benefits: [
      "60%+ reduction in manual work across departments",
      "Automated workflows that run 24/7",
      "Privacy-first local agent deployment options",
      "Scalable from single agent to full department automation",
    ],
    overview:
      "We build custom multi-agent ecosystems that automate complex business workflows across entire departments. From sales pipeline automation to HR onboarding, our agent architectures orchestrate 10–15 specialized agents per department, connected via webhooks, OAuth, and real-time messaging. We support both cloud and local-first privacy-preserving deployments.",
    heroDescription:
      "Multi-agent ecosystems that automate complex business workflows across your organization.",
  },
  {
    slug: "computer-vision",
    title: "Computer Vision & Edge AI",
    shortTitle: "Computer Vision",
    description:
      "Real-time detection, tracking, and recognition systems deployed on edge hardware — optimized for latency, accuracy, and power constraints.",
    icon: "👁️",
    features: [
      "Object Detection & Multi-Object Tracking (YOLOv9–v11)",
      "Video Surveillance & Smart Alert Systems",
      "TensorRT / ONNX Optimization for Edge Deployment",
      "NVIDIA Jetson Orin & ARM64 Tuning",
      "Face Recognition & Custom Classification Pipelines",
    ],
    technologies: ["OpenCV", "TensorRT", "ONNX", "NVIDIA Jetson", "CUDA", "YOLOv9-v11", "GOTURN"],
    benefits: [
      "30%+ faster inference with TensorRT optimization",
      "25% fewer false positives with tuned pipelines",
      "Real-time processing on edge hardware",
      "95%+ system uptime in production deployments",
    ],
    overview:
      "We deliver real-time computer vision systems deployed on edge hardware, optimized for latency, accuracy, and power constraints. From multi-object tracking with YOLO to custom classification pipelines on NVIDIA Jetson Orin, we handle the full stack — model training, TensorRT optimization, ONNX export, and production deployment with monitoring dashboards.",
    heroDescription:
      "Real-time detection, tracking, and recognition on edge hardware — optimized for production.",
  },
  {
    slug: "ml-deep-learning",
    title: "Custom ML & Deep Learning",
    shortTitle: "ML & Deep Learning",
    description:
      "End-to-end model development — from data collection and feature engineering through training, optimization, and production deployment.",
    icon: "🧠",
    features: [
      "Predictive Analytics (Churn, Forecasting, Inventory)",
      "NLP & Transformer Models (Hugging Face, Whisper)",
      "Time-Series Forecasting (ARIMA, Prophet, Custom)",
      "Model Optimization: Pruning, Quantization, Distillation",
      "Audio Analytics & Speech-to-Text Pipelines",
    ],
    technologies: ["PyTorch", "TensorFlow", "Hugging Face", "scikit-learn", "Whisper", "Prophet", "ONNX"],
    benefits: [
      "Custom models tailored to your specific domain",
      "Production-optimized for speed and accuracy",
      "End-to-end pipeline from data to deployment",
      "Continuous model improvement and retraining",
    ],
    overview:
      "We build custom machine learning and deep learning models from the ground up — handling everything from data collection and feature engineering through training, optimization, and production deployment. Whether you need predictive analytics, NLP transformers, time-series forecasting, or audio processing pipelines, we deliver models that perform in the real world.",
    heroDescription:
      "End-to-end ML model development from data collection to production deployment.",
  },
  {
    slug: "data-engineering",
    title: "Data Engineering & Pipelines",
    shortTitle: "Data Engineering",
    description:
      "Scalable ETL architectures, data warehouse design, and automated pipelines that make your data infrastructure reliable and fast.",
    icon: "⚙️",
    features: [
      "3NF & Dimensional Modeling (Star/Snowflake Schema)",
      "ETL Pipeline Automation (AWS Glue, Azure Synapse, SQL, Python)",
      "Data Warehouse Architecture & Governance",
      "Real-Time & Batch Processing Pipelines",
      "Data Quality, Validation & Documentation Standards",
    ],
    technologies: ["PostgreSQL", "SQL Server", "AWS Glue", "Azure Synapse", "Microsoft Fabric", "Python", "Pandas", "Apache Airflow", "dbt"],
    benefits: [
      "Reliable, automated data pipelines",
      "Scalable warehouse architecture",
      "Data quality and governance built in",
      "Faster time to insights for your teams",
    ],
    overview:
      "We design and build scalable data engineering solutions — from ETL pipeline automation to full data warehouse architecture. Our expertise spans 3NF and dimensional modeling (star/snowflake schemas), real-time and batch processing, and data governance frameworks. We ensure your data infrastructure is reliable, well-documented, and ready to power analytics and AI.",
    heroDescription:
      "Scalable ETL architectures and data warehouse design for reliable data infrastructure.",
  },
  {
    slug: "data-analytics",
    title: "Data Analytics & BI Dashboards",
    shortTitle: "Data Analytics",
    description:
      "Executive dashboards, KPI frameworks, and advanced analytics that transform raw data into strategic decisions your leadership can act on.",
    icon: "📊",
    features: [
      "Tableau & Power BI Dashboard Development",
      "KPI Framework Design & Metric Layer Abstraction",
      "Market Basket Analysis & Customer Segmentation",
      "Financial Modeling, Revenue Analytics & Forecasting",
      "RFM Analysis & Customer Profitability Modeling",
    ],
    technologies: ["Tableau", "Power BI", "SQL", "Python", "Pandas", "Excel", "Looker"],
    benefits: [
      "Data-driven decision making for leadership",
      "Automated reporting and refresh cycles",
      "Deep customer and revenue insights",
      "Standardized KPI frameworks across teams",
    ],
    overview:
      "We build executive dashboards, KPI frameworks, and advanced analytics solutions that transform raw data into strategic decisions. From Tableau and Power BI development to customer segmentation, financial modeling, and RFM analysis, we help your leadership team make data-driven decisions with confidence.",
    heroDescription:
      "Executive dashboards and advanced analytics that transform data into strategic decisions.",
  },
  {
    slug: "generative-ai",
    title: "Generative AI Solutions",
    shortTitle: "Generative AI",
    description:
      "Harness the power of generative AI for content creation, chatbots, voicebots, and creative automation at scale.",
    icon: "✨",
    features: [
      "LLM Fine-Tuning & Custom Model Training",
      "RAG Chatbots with Knowledge Base Retrieval",
      "Voicebot Development (ElevenLabs, Vapi)",
      "Content Generation & Summarization Systems",
      "Adaptive Learning & Personalization Engines",
    ],
    technologies: ["OpenAI", "Anthropic", "Gemini", "LangChain", "ElevenLabs", "Vapi", "Hugging Face"],
    benefits: [
      "Custom AI assistants tailored to your brand",
      "Natural language interfaces for any workflow",
      "Voice-first experiences for modern users",
      "Automated content production at scale",
    ],
    overview:
      "Generative AI is transforming how businesses create content, automate workflows, and engage with customers. We build custom LLM solutions, RAG-powered chatbots, and voice-enabled applications using the latest models. Whether you need a customer support bot, a content generation system, or a voice assistant, we deliver production-ready Gen-AI solutions.",
    heroDescription:
      "Leverage LLMs, fine-tuning, and voice AI to transform your workflows at scale.",
  },
  {
    slug: "iot-development",
    title: "IoT & Embedded Systems",
    shortTitle: "IoT & Embedded",
    description:
      "Secure, scalable IoT solutions connecting devices, collecting telemetry, and delivering real-time intelligence at the edge.",
    icon: "📡",
    features: [
      "IoT Strategy, Consulting & Architecture",
      "Device Integration & Firmware Development",
      "Cloud & Edge Computing Solutions",
      "Telemetry Dashboards & Monitoring (40+ screen systems)",
      "System Integration: Radxa, Armbian, Networked Devices",
    ],
    technologies: ["MQTT", "Radxa", "Armbian", "Docker", "Node-RED", "Grafana", "InfluxDB"],
    benefits: [
      "Unified device management and monitoring",
      "Real-time telemetry and alerting",
      "Edge intelligence for low-latency decisions",
      "Scalable from prototype to production fleet",
    ],
    overview:
      "We build secure, scalable IoT solutions that connect devices, collect telemetry, and deliver real-time intelligence at the edge. From IoT strategy and device integration to firmware development and monitoring dashboards (40+ screen systems), we handle the full stack of embedded and IoT engineering.",
    heroDescription:
      "Secure, scalable IoT solutions from device firmware to cloud dashboards.",
  },
  {
    slug: "web-saas",
    title: "Web & SaaS Development",
    shortTitle: "Web & SaaS",
    description:
      "Performance-driven web applications and scalable SaaS platforms built with modern frameworks and production-grade infrastructure.",
    icon: "🚀",
    features: [
      "Full-Stack Development (React, Node.js, FastAPI)",
      "Scalable SaaS Architecture & Multi-Tenant Systems",
      "REST API Design & Integration Development",
      "CI/CD Pipelines & Blue/Green Deployments",
      "Firebase, Cloud Run & Kubernetes Deployments",
    ],
    technologies: ["React", "Next.js", "Node.js", "FastAPI", "Firebase", "Docker", "Kubernetes"],
    benefits: [
      "Modern, performant web applications",
      "Scalable multi-tenant SaaS architecture",
      "Automated CI/CD for reliable deployments",
      "API-first design for extensibility",
    ],
    overview:
      "We build performance-driven web applications and scalable SaaS platforms using modern frameworks and production-grade infrastructure. From full-stack React/Node.js development to multi-tenant SaaS architecture, REST API design, CI/CD pipelines, and Kubernetes deployments, we deliver web solutions that scale with your business.",
    heroDescription:
      "Performance-driven web apps and scalable SaaS platforms built for production.",
  },
];

// =============================================================================
// Industries
// =============================================================================

export const industries: Industry[] = [
  {
    title: "E-commerce",
    description:
      "AI-powered personalization, inventory forecasting, and customer analytics for online retail.",
    icon: "🛒",
  },
  {
    title: "Healthcare",
    description:
      "Clinical decision support, medical imaging analysis, and patient engagement AI.",
    icon: "🏥",
  },
  {
    title: "Finance & Fintech",
    description:
      "Risk modeling, fraud detection, and automated compliance for financial services.",
    icon: "💰",
  },
  {
    title: "Sports & Fitness",
    description:
      "Performance analytics, player positioning models, and coaching intelligence platforms.",
    icon: "⚽",
  },
  {
    title: "Defense & Security",
    description:
      "Real-time surveillance, multi-object tracking, and edge AI for defense applications.",
    icon: "🛡️",
  },
  {
    title: "Retail & FMCG",
    description:
      "Sales analytics, demand forecasting, and supply chain optimization for consumer goods.",
    icon: "🏪",
  },
  {
    title: "Education",
    description:
      "Adaptive learning platforms, intelligent tutoring, and automated assessment systems.",
    icon: "📚",
  },
  {
    title: "Real Estate",
    description:
      "Property valuation AI, market analysis, and intelligent lead qualification.",
    icon: "🏠",
  },
  {
    title: "SaaS & Technology",
    description:
      "AI-enhanced product features, intelligent automation, and scalable platform engineering.",
    icon: "💻",
  },
  {
    title: "Automotive",
    description:
      "Predictive maintenance, autonomous features, and connected vehicle intelligence.",
    icon: "🚗",
  },
];

// =============================================================================
// Case Studies
// =============================================================================

export const caseStudies: CaseStudy[] = [
  {
    slug: "agent-first-insurance",
    title: "Agent-First Insurance Platform",
    category: "InsurTech",
    client: "ClaimbAI",
    duration: "8 months",
    description:
      "Architected a multi-agent ecosystem powering web + mobile frontends with RAG pipelines and sub-second knowledge retrieval.",
    problem:
      "The insurance platform needed to automate complex claims processing workflows while maintaining accuracy and compliance. Manual processing was slow, error-prone, and required large teams.",
    solution:
      "We built a multi-agent ecosystem with RAG pipelines for sub-second knowledge retrieval, powering both web and mobile frontends. Six secure connectors integrated with existing insurance systems, while automated workflows handled claims routing, document analysis, and decision support.",
    architecture:
      "Multi-agent architecture using Google ADK and n8n for orchestration. RAG pipeline with vector databases for policy knowledge retrieval. Firebase for real-time sync across platforms. CI/CD with blue/green deployments.",
    techStack: ["Google ADK", "n8n", "Firebase", "React", "React Native", "LangChain", "PostgreSQL"],
    results: [
      { metric: "Manual Work Reduction", value: "70%", description: "Less manual processing required" },
      { metric: "Secure Connectors", value: "6", description: "Integrated with existing systems" },
      { metric: "Deploy Speed", value: "40%", description: "Faster deployment cycles" },
    ],
    imagePlaceholder: "Insurance platform dashboard with multi-agent workflow visualization",
  },
  {
    slug: "defense-vision-system",
    title: "Real-Time Defense Vision System",
    category: "Defense & IoT",
    client: "COMCEPT",
    duration: "6 months",
    description:
      "Multi-object tracking on NVIDIA Jetson Orin with TensorRT optimization, 40+ monitoring dashboards, and 95% uptime.",
    problem:
      "Defense operations required real-time multi-object tracking with minimal latency on edge hardware, plus comprehensive monitoring across 40+ screens. Existing systems had high false positive rates and poor edge performance.",
    solution:
      "We deployed a computer vision pipeline on NVIDIA Jetson Orin with TensorRT-optimized models for real-time multi-object tracking. Custom classification pipelines reduced false positives by 25%. A 40+ screen monitoring dashboard system provided comprehensive operational awareness.",
    architecture:
      "Edge AI on NVIDIA Jetson Orin (ARM64). TensorRT and ONNX optimization for inference. CUDA-accelerated processing. Custom monitoring dashboard system with 40+ screens. Real-time alerting via webhooks.",
    techStack: ["NVIDIA Jetson", "TensorRT", "ONNX", "OpenCV", "CUDA", "Python", "Qt"],
    results: [
      { metric: "Inference Speed", value: "30%", description: "Faster with TensorRT optimization" },
      { metric: "False Positives", value: "-25%", description: "Reduction in false positive rates" },
      { metric: "System Uptime", value: "95%", description: "Production system availability" },
    ],
    imagePlaceholder: "Real-time multi-object tracking dashboard with edge hardware metrics",
  },
  {
    slug: "sports-performance-analytics",
    title: "Sports Performance Analytics",
    category: "Sports Analytics",
    client: "AiGenius",
    duration: "5 months",
    description:
      "200M-row data warehouse transformation with star-schema modeling, predictive player positioning, and coaching dashboards.",
    problem:
      "A sports analytics company had a 200M+ row dataset trapped in a poorly structured 3NF schema that made analysis slow and complex. Coaches needed real-time performance insights but the data infrastructure couldn't deliver.",
    solution:
      "We transformed the entire data warehouse from 3NF to a star-schema design, enabling 45% faster analysis. Built predictive player positioning models and executive coaching dashboards that turned raw performance data into actionable insights.",
    architecture:
      "Star-schema data warehouse with dimensional modeling. ETL pipelines for 200M+ rows. Predictive models for player positioning. Tableau dashboards for coaching staff. Automated data quality validation.",
    techStack: ["SQL Server", "Python", "Tableau", "Pandas", "scikit-learn", "AWS"],
    results: [
      { metric: "Data Processed", value: "200M+", description: "Rows in transformed warehouse" },
      { metric: "Analysis Speed", value: "45%", description: "Faster with star-schema design" },
      { metric: "Schema Migration", value: "3NF → Star", description: "Complete warehouse redesign" },
    ],
    imagePlaceholder: "Sports analytics dashboard with player positioning and performance metrics",
  },
  {
    slug: "fmcg-analytics-automation",
    title: "FMCG Analytics Automation",
    category: "Retail / FMCG",
    client: "Convergent BT",
    duration: "4 months",
    description:
      "Automated Pepsi KSA & UAE analytics pipeline — dramatically reduced refresh cycles and team requirements.",
    problem:
      "Pepsi's KSA and UAE analytics pipeline required manual data processing by a team of 6 people, with refresh cycles taking a full week. The process was error-prone and couldn't scale across regions.",
    solution:
      "We automated the entire analytics pipeline, reducing refresh cycles from 1 week to 3 days (57% faster) and cutting the team requirement from 6 people to 2 (66% reduction). The solution scaled seamlessly across multiple regions.",
    architecture:
      "Automated ETL pipelines with Python and SQL. Power BI dashboards for multi-region reporting. Scheduled data refresh with quality validation. Role-based access control for regional teams.",
    techStack: ["Python", "SQL", "Power BI", "Azure", "Pandas", "Excel"],
    results: [
      { metric: "Refresh Speed", value: "57%", description: "Faster data refresh cycles" },
      { metric: "Team Reduction", value: "66%", description: "Fewer people needed (6 → 2)" },
      { metric: "Coverage", value: "Multi-region", description: "KSA & UAE automated" },
    ],
    imagePlaceholder: "FMCG analytics dashboard showing multi-region sales and performance data",
  },
  {
    slug: "adastria-retail-intelligence",
    title: "Adastria Retail Intelligence",
    category: "Fashion Retail",
    client: "PlusW Tokyo",
    duration: "6 months",
    description:
      "Sales trend analysis, RFM customer segmentation, and executive dashboards for a major Japanese fashion retailer.",
    problem:
      "Adastria, a major Japanese fashion retailer, needed deeper customer insights and data-driven decision-making capabilities. Existing analytics were fragmented and couldn't support global expansion planning.",
    solution:
      "We built comprehensive retail analytics including sales trend analysis, RFM customer segmentation, and executive BI dashboards. The solution provided the data foundation for Adastria's global expansion strategy.",
    architecture:
      "Data warehouse with customer 360 views. RFM segmentation engine. Tableau executive dashboards. Automated reporting for regional teams. Data quality framework for multi-source integration.",
    techStack: ["Tableau", "SQL", "Python", "Pandas", "Excel", "PostgreSQL"],
    results: [
      { metric: "Segmentation", value: "RFM", description: "Customer segmentation implemented" },
      { metric: "Expansion", value: "Global", description: "Data foundation for global strategy" },
      { metric: "Decision Making", value: "Executive BI", description: "C-suite dashboards deployed" },
    ],
    imagePlaceholder: "Fashion retail analytics dashboard with RFM segmentation and sales trends",
  },
  {
    slug: "multi-agent-business-automation",
    title: "Multi-Agent Business Automation",
    category: "Enterprise",
    client: "Enterprise Client",
    duration: "4 months",
    description:
      "Orchestrated 10–15 specialized AI agents per department across Sales, HR, Marketing, and Engineering functions.",
    problem:
      "An enterprise client had repetitive, manual workflows across multiple departments — Sales, HR, Marketing, and Engineering — leading to inefficiency and inconsistent processes across the organization.",
    solution:
      "We designed and deployed a multi-agent automation platform with 10–15 specialized AI agents per department. Each agent handled specific workflows (lead qualification, onboarding, content scheduling, code review) with full orchestration and monitoring.",
    architecture:
      "Multi-agent orchestration with Google ADK. Department-specific agent clusters. n8n workflow automation for cross-department processes. Monitoring dashboard for agent health and performance. OAuth and webhook integrations.",
    techStack: ["Google ADK", "n8n", "LangChain", "Firebase", "PostgreSQL", "Python"],
    results: [
      { metric: "Manual Work", value: "-60%", description: "Reduction in manual tasks" },
      { metric: "Departments", value: "4+", description: "Departments automated" },
      { metric: "Automation", value: "Full", description: "End-to-end workflow automation" },
    ],
    imagePlaceholder: "Multi-agent dashboard showing department workflows and agent status",
  },
];

// =============================================================================
// Process Steps
// =============================================================================

export const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: "Discovery Call (Free)",
    description:
      "We begin with a free consultation to understand your business goals, technical requirements, and timeline.",
  },
  {
    number: 2,
    title: "Requirements & Architecture",
    description:
      "We document your requirements and design the solution architecture, data flows, and technology stack.",
  },
  {
    number: 3,
    title: "Proposal & Planning",
    description:
      "You receive a detailed proposal with milestones, deliverables, and transparent pricing tailored to your project.",
  },
  {
    number: 4,
    title: "Development & Iteration",
    description:
      "Our team builds your solution in agile sprints with regular demos, feedback loops, and course corrections.",
  },
  {
    number: 5,
    title: "Delivery & Support",
    description:
      "We deploy to production, hand over documentation, and provide ongoing maintenance and optimization support.",
  },
];

// =============================================================================
// Stats
// =============================================================================

export const stats: Stat[] = [
  { value: "30+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "200M+", label: "Data Rows Processed" },
  { value: "6+", label: "Industries Served" },
];

// =============================================================================
// Testimonials
// =============================================================================

export const testimonials: Testimonial[] = [
  {
    name: "ClaimbAI Team",
    role: "AI-Powered Insurance Platform, California",
    company: "ClaimbAI",
    quote:
      "AZenthera delivered an AI agent ecosystem that cut our manual processing by 70%. Their technical depth and responsiveness made them feel like an in-house engineering team.",
    rating: 5,
  },
  {
    name: "AiGenius Team",
    role: "Sports Analytics Company",
    company: "AiGenius",
    quote:
      "The data warehouse transformation of our 200M-row dataset was remarkable. The star-schema design they built powers all our analytics and forecasting today.",
    rating: 5,
  },
  {
    name: "COMCEPT Team",
    role: "Defense & Technology",
    company: "COMCEPT",
    quote:
      "Their computer vision system on Jetson hardware exceeded our latency requirements. TensorRT optimizations alone improved inference by 30%. Highly recommended.",
    rating: 5,
  },
  {
    name: "Convergent BT Team",
    role: "Analytics Consulting",
    company: "Convergent BT",
    quote:
      "They automated our entire Pepsi KSA & UAE analytics pipeline. Refresh went from 1 week to 3 days, and we went from needing 6 people to just 2.",
    rating: 5,
  },
  {
    name: "PlusW Tokyo Team",
    role: "Retail Analytics, Japan",
    company: "PlusW Tokyo",
    quote:
      "Professional, respectful, and deeply knowledgeable. The retail analytics dashboards they built for Adastria are still the backbone of our decision-making.",
    rating: 5,
  },
];

// =============================================================================
// Tech Stack
// =============================================================================

export const techStack: TechStackCategory[] = [
  {
    category: "AI & LLMs",
    technologies: ["LangChain", "LlamaIndex", "OpenAI", "Anthropic", "Gemini", "Google ADK", "n8n", "Ollama"],
  },
  {
    category: "ML & Deep Learning",
    technologies: ["PyTorch", "TensorFlow", "Hugging Face", "YOLOv9-v11", "Whisper", "scikit-learn"],
  },
  {
    category: "Vision & Edge",
    technologies: ["OpenCV", "TensorRT", "ONNX", "NVIDIA Jetson", "ARM64", "CUDA", "GOTURN"],
  },
  {
    category: "Cloud & MLOps",
    technologies: ["Docker", "Kubernetes", "FastAPI", "Firebase", "Cloud Run", "AWS Glue", "Azure Synapse", "Microsoft Fabric", "MLflow"],
  },
  {
    category: "Data & Analytics",
    technologies: ["PostgreSQL", "SQL Server", "Vector DB", "Tableau", "Power BI", "Pandas", "ETL"],
  },
  {
    category: "Development",
    technologies: ["Python", "C++", "Node.js", "React", "Qt", "REST APIs", "Git"],
  },
];

// =============================================================================
// Why Choose Us
// =============================================================================

export const whyChooseUs: WhyChooseUsItem[] = [
  {
    title: "Production-Grade Engineering",
    description:
      "We don't build demos — we build production systems. Every solution is designed for reliability, scalability, and real-world performance from day one.",
  },
  {
    title: "Deep Technical Expertise",
    description:
      "Engineers with hands-on experience across AI, computer vision, data engineering, and full-stack development. We go deep where it matters.",
  },
  {
    title: "Transparent & Collaborative",
    description:
      "No hidden costs, no surprises. We work as an extension of your team with regular demos, clear communication, and transparent pricing throughout.",
  },
  {
    title: "End-to-End Delivery",
    description:
      "From initial consultation to production deployment and ongoing support, we own the entire lifecycle. One team, one point of contact, complete accountability.",
  },
];

// =============================================================================
// Team
// =============================================================================

export const team: TeamMember[] = [
  {
    name: "Afzal Khan",
    initials: "AK",
    role: "AI Engineer · ML/DL · Computer Vision · MLOps",
    bio: "Building production AI systems — from LLM-powered agent ecosystems and RAG pipelines to real-time computer vision on edge hardware. MIT MicroMasters in Statistics & Data Science.",
    highlights: [
      "Agent ecosystems (Google ADK, n8n, Firebase)",
      "Edge AI on NVIDIA Jetson (TensorRT, ONNX)",
      "RAG systems with sub-second retrieval",
      "Full-stack AI product development",
    ],
  },
  {
    name: "Taha Rasheed",
    initials: "TR",
    role: "AI Engineer · Data Analytics · Cloud Data Engineering",
    bio: "AI and Data Analytics professional with experience across US and Pakistan-based clients. Specialist in Azure cloud data platforms, BI reporting, and AI agent development — from enterprise data warehouses to production agent ecosystems.",
    highlights: [
      "Azure Synapse & Microsoft Fabric data pipelines",
      "Power BI dashboards with advanced DAX",
      "AI agent ecosystems (Google ADK, n8n, Firebase)",
      "ETL automation & data warehouse design",
    ],
  },
];

// =============================================================================
// Footer Links
// =============================================================================

export const footerLinks: FooterLinkGroup[] = [
  {
    title: "Services",
    links: [
      { href: "/services/ai-development", label: "AI Integration & Development" },
      { href: "/services/ai-agents", label: "AI Agents & Automation" },
      { href: "/services/computer-vision", label: "Computer Vision & Edge AI" },
      { href: "/services/ml-deep-learning", label: "Custom ML & Deep Learning" },
      { href: "/services/data-engineering", label: "Data Engineering & Pipelines" },
      { href: "/services/data-analytics", label: "Data Analytics & BI Dashboards" },
      { href: "/services/generative-ai", label: "Generative AI Solutions" },
      { href: "/services/iot-development", label: "IoT & Embedded Systems" },
      { href: "/services/web-saas", label: "Web & SaaS Development" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/case-studies", label: "Case Studies" },
      { href: "/industries", label: "Industries" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "mailto:afzaljawadkhan@gmail.com", label: "Email Us" },
      { href: "tel:+923379755627", label: "Call Us" },
    ],
  },
];

// =============================================================================
// Helper: Get service by slug
// =============================================================================

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

// =============================================================================
// Helper: Get case study by slug
// =============================================================================

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
