import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Globe, 
  Bot, 
  Smartphone, 
  Layers, 
  Puzzle, 
  ShoppingBag, 
  Cloud, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';

interface ClientService {
  title: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  deliverables: string[];
  engagement: string;
}

export const ServicesPage: React.FC = () => {
  const navigate = useNavigate();

  const services: ClientService[] = [
    {
      title: 'Full-Stack Web Application Engineering',
      tagline: 'End-to-end bespoke web platforms built for speed and scale',
      description: 'Architecting dynamic web applications, interactive dashboards, and scalable SaaS solutions from initial database design to polished responsive frontend.',
      icon: Globe,
      deliverables: [
        'Production-ready React / Next.js / TypeScript codebase',
        'Scalable REST or GraphQL API backend with automated unit tests',
        'Clean, accessible responsive UI optimized for Core Web Vitals',
        'Continuous Deployment (CI/CD) and cloud hosting setup'
      ],
      engagement: 'Milestone / Sprint-based',
    },
    {
      title: 'Custom AI & LLM Systems Integration',
      tagline: 'Supercharge your workflows with bespoke autonomous intelligence',
      description: 'Designing retrieval-augmented generation (RAG) engines, conversational agents, and domain-specific knowledge bases that securely interact with proprietary company data.',
      icon: Bot,
      deliverables: [
        'Vector database pipeline (Pinecone/Chroma) with custom embeddings',
        'Streaming chat interfaces with contextual citations and guardrails',
        'Async Python / FastAPI microservices with Redis rate-limiting',
        'Prompt engineering architecture and model evaluation suite'
      ],
      engagement: 'Fixed Project / Advisory',
    },
    {
      title: 'Cross-Platform Mobile App Development',
      tagline: 'Native performance for iOS and Android from a unified codebase',
      description: 'Creating smooth, intuitive mobile applications that leverage device hardware, push notifications, offline local databases, and biometric authentication.',
      icon: Smartphone,
      deliverables: [
        'Cross-platform React Native / Expo production app',
        'Offline-first synchronization with local SQLite persistence',
        'Biometric login (FaceID/Fingerprint) and hardware sensor hooks',
        'App Store and Google Play submission guidance'
      ],
      engagement: 'Milestone-based',
    },
    {
      title: 'Enterprise ERP & Management Systems',
      tagline: 'Streamlining complex operational workflows and logistics',
      description: 'Developing tailored enterprise resource planning software, warehouse management portals, CRM systems, and automated financial ledgers.',
      icon: Layers,
      deliverables: [
        'Multi-tenant database schema with strict data isolation',
        'Role-Based Access Control (RBAC) with cryptographic audit trails',
        'Automated reporting, CSV/PDF export, and invoice pipelines',
        'Staff onboarding documentation and developer handoff guides'
      ],
      engagement: 'Contract / Enterprise',
    },
    {
      title: 'Browser Extension & Tool Development',
      tagline: 'Productivity accelerators running directly inside the browser',
      description: 'Building secure, lightweight Chrome and Edge extensions adhering strictly to Manifest V3 protocols for research, data extraction, and workflow automation.',
      icon: Puzzle,
      deliverables: [
        'Manifest V3 compliant extension package ready for store review',
        'Encrypted local storage synchronization and keyboard hotkeys',
        'DOM content script integrations and background workers',
        'Chrome Web Store publication support'
      ],
      engagement: 'Fixed Scope',
    },
    {
      title: 'Headless E-Commerce & Store Architecture',
      tagline: 'High-converting digital commerce experiences',
      description: 'Engineering ultra-fast headless storefronts, custom checkout funnels, dynamic inventory locks, and secure payment gateway integrations with Stripe.',
      icon: ShoppingBag,
      deliverables: [
        'Headless Next.js storefront integrated with Shopify / custom backend',
        'PCI-DSS compliant Stripe Elements payment flows',
        'Automated order management webhooks and notification emails',
        'Mobile-first conversion rate optimization (CRO) architecture'
      ],
      engagement: 'Turnkey Project',
    },
    {
      title: 'API Architecture & Cloud DevOps',
      tagline: 'Resilient backend infrastructure built to withstand heavy traffic',
      description: 'Constructing robust microservices, database clusters, distributed Redis caches, and containerized deployment workflows.',
      icon: Cloud,
      deliverables: [
        'Documented OpenAPI / Swagger API contracts',
        'Docker & Docker Compose containerization configurations',
        'Database indexing and query execution plan optimization',
        'Automated health checks, uptime monitors, and error logging'
      ],
      engagement: 'Retainer / Project',
    },
    {
      title: 'Code Auditing & Performance Optimization',
      tagline: 'Revitalizing legacy codebases and eliminating technical debt',
      description: 'Comprehensive code audits focusing on runtime bottlenecks, security vulnerabilities, bundle size minification, and database query latency.',
      icon: ShieldCheck,
      deliverables: [
        'Detailed diagnostic report with actionable remediation tickets',
        'Lighthouse and Core Web Vitals optimization to achieve 90+ scores',
        'Refactored critical paths with benchmarking comparisons',
        'Architectural recommendations for long-term maintainability'
      ],
      engagement: 'Fixed Audit Scope',
    },
  ];

  const processSteps = [
    { number: '01', title: 'Discovery & Scope', desc: 'Clarifying business objectives, technical requirements, user stories, and measurable milestones.' },
    { number: '02', title: 'Architecture & Design', desc: 'Drafting system architecture, database schemas, API contracts, and interactive UI wireframes.' },
    { number: '03', title: 'Iterative Development', desc: 'Writing clean, typed, modular code with bi-weekly sprint demos and continuous integration.' },
    { number: '04', title: 'Testing & Launch', desc: 'Rigorous QA, edge-case testing, performance benchmarking, and seamless production deployment.' },
  ];

  return (
    <div className="pt-28 pb-24 min-h-screen bg-black text-neutral-100">
      
      {/* Background Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-28 right-1/4 w-[650px] h-[500px] bg-gold-500/5 blur-[160px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-gold-400">
                CLIENT SERVICES
              </span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              What I Do
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              I provide modern, scalable development services to help businesses, startups, and enterprises build high-impact digital solutions.
            </p>
          </div>

          <div className="px-4 py-2 rounded-full border border-gold-500/30 bg-dark-900/80 backdrop-blur-md self-start md:self-auto flex items-center gap-2 text-xs font-medium text-gold-300">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Custom Solutions Tailored to Your Needs</span>
          </div>
        </div>

        {/* Services 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="rounded-2xl p-7 sm:p-9 bg-gradient-to-b from-dark-900/80 to-dark-950 border border-white/[0.07] hover:border-gold-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-dark-850 border border-gold-500/25 flex items-center justify-center text-gold-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 text-[11px] font-mono text-zinc-400 bg-dark-850 rounded-full border border-white/[0.06]">
                      {service.engagement}
                    </span>
                  </div>

                  <h2 className="font-heading text-2xl font-bold text-white mb-2">
                    {service.title}
                  </h2>
                  
                  <p className="text-xs text-gold-400 font-medium mb-4">
                    {service.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2 mb-6 bg-dark-950/60 p-4 rounded-xl border border-white/[0.04]">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-2">
                      Key Deliverables:
                    </div>
                    {service.deliverables.map((del, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    onClick={() => navigate('/contact')}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-gold-300 hover:text-white transition-colors"
                  >
                    <span>Inquire About Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] text-zinc-500 font-mono">
                    Direct Client Engagement
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Development Methodology Process Timeline */}
        <div className="rounded-3xl p-8 sm:p-12 bg-dark-900/60 border border-white/[0.07]">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-gold-400">
              HOW WE WORK
            </span>
            <h2 className="font-heading text-3xl font-bold text-white mt-2">
              Structured Engineering Process
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="p-6 rounded-2xl bg-dark-950/80 border border-white/[0.05] relative space-y-3"
              >
                <span className="font-heading font-bold text-3xl text-gold-500/40 font-mono block">
                  {step.number}
                </span>
                <h3 className="font-heading text-lg font-bold text-white">
                  {step.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold text-xs tracking-wide transition-all shadow-[0_4px_20px_rgba(198,164,119,0.3)]"
            >
              <span>Schedule a Project Discovery Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
