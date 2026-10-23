import React from 'react';
import { 
  Zap, 
  Search, 
  ShieldCheck, 
  BarChart3, 
  WifiOff, 
  CreditCard, 
  Cpu, 
  BellRing, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProductFeature {
  title: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  mechanics: string[];
  businessValue: string;
}

export const FeaturesPage: React.FC = () => {
  const navigate = useNavigate();

  const productFeatures: ProductFeature[] = [
    {
      title: 'Real-Time State Synchronization & WebSockets',
      tagline: 'Multiplayer collaboration with zero perceptible latency',
      description: 'Implementing live state replication allowing teams to work simultaneously across boards, documents, and real-time canvas editors.',
      icon: Zap,
      mechanics: [
        'Bidirectional WebSocket pipelines with automatic fallback to polling',
        'Operational Transform & CRDT algorithms preventing collision locks',
        'Live presence indicators, avatar stacks, and typing telemetry',
        'Optimistic client-side cache updates with rollback recovery'
      ],
      businessValue: 'Eliminates refresh friction and elevates software to modern collaborative standards.',
    },
    {
      title: 'Semantic Vector Search & AI RAG Pipelines',
      tagline: 'Grounding LLMs with proprietary company knowledge',
      description: 'Enabling intelligent search across massive document corpuses, internal wikis, and databases with strict citation grounding.',
      icon: Search,
      mechanics: [
        'Automated document ingestion, chunking, and embedding generation',
        'Cosine similarity & BM25 hybrid ranking in high-dimensional vector spaces',
        'Context window truncation and metadata filtering for verifiable citations',
        'Server-Sent Events (SSE) token streaming for responsive UX'
      ],
      businessValue: 'Transforms static company data into an interactive, 24/7 autonomous intelligence asset.',
    },
    {
      title: 'Enterprise Role-Based Access Control (RBAC)',
      tagline: 'Granular security with cryptographically audited trails',
      description: 'Enforcing multi-tenant isolation, role permission matrices, and detailed compliance logging across all API endpoints.',
      icon: ShieldCheck,
      mechanics: [
        'JWT and session-based tokens with automated token refresh cycles',
        'Attribute-based and role-based policy enforcement middleware',
        'Immutable audit logs recording timestamp, actor IP, and entity diffs',
        'Support for single sign-on (SSO) and multi-factor authentication (MFA)'
      ],
      businessValue: 'Ensures compliance with enterprise security requirements and organizational boundaries.',
    },
    {
      title: 'Interactive Telemetry & Executive Dashboards',
      tagline: 'Visualizing complex analytics into actionable insights',
      description: 'Building customizable dashboard interfaces with high-density data visualizations, dynamic filters, and real-time streaming charts.',
      icon: BarChart3,
      mechanics: [
        'Custom SVG/Canvas vector charts rendering thousands of points at 60fps',
        'Dynamic date range pickers, cross-filtering, and metric aggregations',
        'One-click PDF/CSV export pipelines with client-side synthesis',
        'User-saved layout preferences and custom widget arrangement'
      ],
      businessValue: 'Empowers decision-makers with rapid operational clarity and immediate trend detection.',
    },
    {
      title: 'Offline-First Resilience & Edge Synchronization',
      tagline: 'Uninterrupted usability across unstable network conditions',
      description: 'Designing client applications that function continuously without an internet connection and synchronize seamlessly upon reconnection.',
      icon: WifiOff,
      mechanics: [
        'Local SQLite / IndexedDB transactional caching engines',
        'Persistent mutation queues that survive application termination',
        'Automated conflict resolution strategies (Last-Write-Wins or Custom Rules)',
        'Background sync workers adhering to battery and network state'
      ],
      businessValue: 'Critical for mobile field workers, logistics drivers, and global applications.',
    },
    {
      title: 'Automated Billing, Entitlements & Metered Invoicing',
      tagline: 'Monetization pipelines integrated directly into the software architecture',
      description: 'Implementing recurring subscription tiers, usage-based metered charges, and enterprise invoice generation via Stripe.',
      icon: CreditCard,
      mechanics: [
        'Stripe Checkout, Customer Portal, and Elements integration',
        'Granular feature gating based on active plan entitlements',
        'Webhook handlers processing asynchronous subscription events and refunds',
        'Usage metering counters syncing to billing periods with precision'
      ],
      businessValue: 'Accelerates time-to-revenue and automates financial lifecycle management without manual effort.',
    },
    {
      title: 'Intelligent Background Processing & Worker Queues',
      tagline: 'Offloading compute-heavy tasks away from user-facing threads',
      description: 'Structuring resilient job queues for automated reports, email notifications, data transformations, and AI generation tasks.',
      icon: Cpu,
      mechanics: [
        'Redis-backed queues (BullMQ / Celery) with priority handling',
        'Exponential backoff retries and dead-letter queue analysis',
        'Cron schedules for automated periodic data maintenance',
        'Real-time job progress reporting back to the client UI'
      ],
      businessValue: 'Guarantees snappy UI performance by keeping long-running computations in the background.',
    },
    {
      title: 'Multi-Channel Notification & Alerting Hub',
      tagline: 'Keeping stakeholders informed across preferred touchpoints',
      description: 'A centralized notifications service distributing contextual alerts through push notifications, in-app trays, email, and SMS.',
      icon: BellRing,
      mechanics: [
        'Web Push, Apple APNs, and Firebase Cloud Messaging (FCM)',
        'User-configurable quiet hours, delivery preferences, and digest modes',
        'In-app notification bell with real-time unread badges and mark-all-read',
        'Template-based transactional email delivery via modern APIs'
      ],
      businessValue: 'Increases product retention, user engagement, and response speed for time-sensitive events.',
    },
  ];

  return (
    <div className="pt-28 pb-24 min-h-screen bg-black text-neutral-100">
      
      {/* Background Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 right-1/3 w-[600px] h-[500px] bg-gold-500/5 blur-[160px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-3">
            <span className="h-[1px] w-6 bg-gold-400" />
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-gold-400">
              PRODUCT CAPABILITIES
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Software Features & Functionality
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            A comprehensive catalog of product features and interactive capabilities I engineer into modern web platforms, mobile apps, and enterprise software.
          </p>
        </div>

        {/* Features 2-Column Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {productFeatures.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="rounded-2xl p-7 sm:p-9 bg-gradient-to-b from-dark-900/80 to-dark-950 border border-white/[0.07] hover:border-gold-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-400/25 flex items-center justify-center text-gold-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                        {feat.title}
                      </h2>
                      <span className="text-xs text-gold-400 font-medium">
                        {feat.tagline}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                    {feat.description}
                  </p>

                  {/* Implementation Mechanics */}
                  <div className="space-y-2 mb-6 bg-dark-950/70 p-4 rounded-xl border border-white/[0.04]">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-2">
                      Technical Mechanics:
                    </div>
                    {feat.mechanics.map((mech, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                        <span>{mech}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Business Value Highlight */}
                <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between text-xs">
                  <span className="text-zinc-500 font-medium">Business Impact:</span>
                  <span className="text-zinc-300 font-medium text-right max-w-xs">{feat.businessValue}</span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 rounded-2xl p-8 bg-dark-900 border border-gold-500/25 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading text-xl font-bold text-white">
              Need custom functionality for your product?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              I architect bespoke features tailored to your unique business workflow and infrastructure requirements.
            </p>
          </div>
          <button
            onClick={() => navigate('/contact')}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold text-xs tracking-wide transition-colors"
          >
            <span>Discuss Custom Features</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
