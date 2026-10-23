import React, { useState } from 'react';
import { Star, Quote, CheckCircle2, Sparkles, Building2, User, ArrowRight, ThumbsUp } from 'lucide-react';

interface ReviewItem {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  category: 'AI Solutions' | 'Web Apps' | 'Mobile Apps' | 'Enterprise';
  projectDelivered: string;
  rating: number;
  date: string;
  feedback: string;
  verified: boolean;
  avatarInitials: string;
}

const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Marcus Vance',
    role: 'Founder & CEO',
    company: 'HyperScale AI',
    location: 'San Francisco, USA',
    category: 'AI Solutions',
    projectDelivered: 'Autonomous AI Knowledge Retrieval Platform',
    rating: 5,
    date: 'Recent Client',
    feedback: 'Talha delivered our multi-agent AI knowledge retrieval system two weeks ahead of schedule. The hybrid vector search and sub-second token streaming were phenomenal. Exceptional technical depth in AI and modern full-stack architecture.',
    verified: true,
    avatarInitials: 'MV',
  },
  {
    id: 'rev-2',
    name: 'Dr. Sophia Reynolds',
    role: 'Head of Product',
    company: 'MedTelemetry Health',
    location: 'London, UK',
    category: 'Mobile Apps',
    projectDelivered: 'Cross-Platform Biometric Mobile App',
    rating: 5,
    date: 'Verified Client',
    feedback: 'Working with Talha on our cross-platform mobile health companion was completely effortless. His understanding of real-time state synchronization, clean TypeScript, and UI polish is world-class. Our users love the responsiveness.',
    verified: true,
    avatarInitials: 'SR',
  },
  {
    id: 'rev-3',
    name: 'Ahmed Al-Mansoor',
    role: 'Director of Technology',
    company: 'Apex Enterprise Solutions',
    location: 'Dubai, UAE',
    category: 'Enterprise',
    projectDelivered: 'Enterprise Management System & Automation',
    rating: 5,
    date: 'Verified Enterprise',
    feedback: 'Talha architected our internal enterprise management dashboard and automated reporting workflows. His ability to turn complex business logic into an intuitive, responsive system saved our operations team hundreds of manual hours.',
    verified: true,
    avatarInitials: 'AM',
  },
  {
    id: 'rev-4',
    name: 'Elena Rostova',
    role: 'Engineering Lead',
    company: 'CloudMatrix SaaS',
    location: 'Berlin, Germany',
    category: 'Web Apps',
    projectDelivered: 'High-Throughput Collaborative SaaS Engine',
    rating: 5,
    date: 'Recent Project',
    feedback: 'Remarkable developer. Talha built our web application with WebSocket multiplayer cursors, virtualized kanban boards, and robust security boundaries. Clean code, rock-solid tests, and proactive communication throughout.',
    verified: true,
    avatarInitials: 'ER',
  },
  {
    id: 'rev-5',
    name: 'David Sterling',
    role: 'E-Commerce Growth Director',
    company: 'Aura Lifestyle Brands',
    location: 'New York, USA',
    category: 'Web Apps',
    projectDelivered: 'Headless E-Commerce Storefront',
    rating: 5,
    date: 'Verified Store',
    feedback: 'The headless storefront Talha engineered increased our mobile conversion rate by 34%. Lightning-fast page loads, micro-animations, and flawless checkout integrations. Highly recommend him for any serious software build.',
    verified: true,
    avatarInitials: 'DS',
  },
  {
    id: 'rev-6',
    name: 'Hamza Tariq',
    role: 'Co-Founder & COO',
    company: 'Fintech Dynamics',
    location: 'Islamabad, Pakistan',
    category: 'Enterprise',
    projectDelivered: 'High-Security Financial Software Engine',
    rating: 5,
    date: 'Long-term Client',
    feedback: 'Talha is one of the most reliable, capable software engineers I have partnered with. Always reachable, highly disciplined, and delivers production-grade software that scales under heavy load without regressions.',
    verified: true,
    avatarInitials: 'HT',
  },
];

export const ReviewsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'AI Solutions', 'Web Apps', 'Mobile Apps', 'Enterprise'];

  const filteredReviews = activeCategory === 'All'
    ? REVIEWS_DATA
    : REVIEWS_DATA.filter((r) => r.category === activeCategory);

  return (
    <section id="reviews" className="relative py-20 sm:py-28 bg-dark-950/70 border-t border-white/[0.06] overflow-hidden">
      
      {/* Background Lighting */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[400px] bg-gold-500/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-3">
              <span className="h-[1px] w-6 bg-gold-400" />
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-gold-400">
                CLIENT TESTIMONIALS & TRUST
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              What Clients & Partners{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-gold-300">
                Say About My Work.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
              Real feedback from founders, product directors, and technical teams who trusted me to engineer their critical software systems.
            </p>
          </div>

          {/* Trust Metric Pill */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-dark-900/80 border border-gold-500/30 shadow-[0_0_25px_rgba(198,164,119,0.12)] shrink-0 self-start lg:self-auto">
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-gold-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-400" />
                ))}
                <span className="ml-1.5 font-heading text-base font-bold text-white">5.0 / 5.0</span>
              </div>
              <span className="text-xs text-zinc-400 mt-1 font-mono">
                100% Client Satisfaction • Global Delivery
              </span>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gold-500 text-dark-950 shadow-[0_0_15px_rgba(198,164,119,0.3)] font-bold'
                  : 'bg-dark-900/90 text-zinc-400 hover:text-white border border-white/[0.06] hover:border-gold-500/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-dark-900/90 via-dark-900 to-dark-950 border border-white/[0.08] hover:border-gold-500/40 transition-all duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.9),0_0_20px_rgba(198,164,119,0.15)] flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                {/* Header: Stars & Project Tag */}
                <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
                  <div className="flex items-center gap-1 text-gold-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-gold-500/10 text-gold-300 border border-gold-500/30">
                    {review.category}
                  </span>
                </div>

                {/* Project Delivered */}
                <div>
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                    Delivered Solution
                  </span>
                  <span className="text-xs font-semibold text-zinc-200 mt-0.5 block line-clamp-1">
                    {review.projectDelivered}
                  </span>
                </div>

                {/* Feedback Quote */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                  "{review.feedback}"
                </p>
              </div>

              {/* Client Info Footer */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500/20 to-dark-800 border border-gold-400/30 flex items-center justify-center text-gold-300 font-bold text-xs font-heading shrink-0 shadow-sm">
                    {review.avatarInitials}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-heading text-sm font-bold text-white truncate block">
                        {review.name}
                      </span>
                      {review.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" title="Verified Client" />
                      )}
                    </div>
                    <span className="text-[11px] text-zinc-400 truncate block">
                      {review.role} • {review.company}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-zinc-500 shrink-0">
                  {review.location.split(',')[1] || review.location}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
