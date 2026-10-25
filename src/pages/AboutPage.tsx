import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, GraduationCap, Award, Compass, Code, Terminal, CheckCircle2 } from 'lucide-react';
import { CinematicPortrait } from '../components/CinematicPortrait';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  const skillsBars = [
    { name: 'AI & LLM Orchestration (LangChain, RAG, Python)', level: 92 },
    { name: 'Full Stack Web (React, Next.js, TypeScript)', level: 95 },
    { name: 'Backend Engineering (Node.js, Express, FastAPI)', level: 90 },
    { name: 'Mobile App Development (React Native, Expo)', level: 86 },
    { name: 'Database Architecture (PostgreSQL, MongoDB, Pinecone)', level: 88 },
  ];

  const principles = [
    {
      title: 'Architectural Rigor',
      description: 'Prioritizing modular, scalable design patterns, type safety, and clean separation of concerns.',
      icon: Terminal,
    },
    {
      title: 'Real-World Pragmatism',
      description: 'Selecting appropriate tools and algorithms that drive measurable user value without unnecessary bloat.',
      icon: Compass,
    },
    {
      title: 'User-First Craft',
      description: 'Pairing resilient backend services with fluid, accessible, and high-framerate user interfaces.',
      icon: Code,
    },
  ];

  return (
    <div className="pt-28 pb-20 min-h-screen bg-black text-neutral-100">
      
      {/* Background Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 right-1/4 w-[600px] h-[500px] bg-gold-500/5 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          
          {/* Left: Content */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-3">
                <span className="h-[1px] w-6 bg-gold-400" />
                <span className="text-xs font-semibold tracking-[0.25em] uppercase text-gold-400">
                  ABOUT ME
                </span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Turning Ideas Into{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-gold-300">
                  Digital Experiences
                </span>
              </h1>
            </div>

            {/* Narrative */}
            <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
              <p>
                I am a passionate software engineer and AI developer with deep expertise in crafting robust, user-centric web applications, intelligent agents, and scalable enterprise platforms. I thrive on translating abstract technical complexity into elegant, reliable software products.
              </p>
              <p className="text-zinc-400">
                Over the past 2+ years, I have architected and deployed modern digital solutions spanning generative AI retrieval systems, real-time multiplayer SaaS suites, cross-platform mobile apps, and high-throughput enterprise management portals. My work centers on writing clean, maintainable code backed by rigorous testing.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4 p-5 rounded-2xl bg-dark-900/80 border border-white/[0.06]">
              <div>
                <div className="font-heading text-2xl sm:text-3xl font-bold text-white">2+</div>
                <div className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider mt-1">Years Exp.</div>
              </div>
              <div className="border-l border-white/[0.06] pl-4">
                <div className="font-heading text-2xl sm:text-3xl font-bold text-white">20+</div>
                <div className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider mt-1">Projects Built</div>
              </div>
              <div className="border-l border-white/[0.06] pl-4">
                <div className="font-heading text-2xl sm:text-3xl font-bold text-white">20+</div>
                <div className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider mt-1">Happy Clients</div>
              </div>
            </div>

            {/* Skill Progress Bars (inspired by reference image Screen 02) */}
            <div className="space-y-5 pt-4">
              <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
                <span>Core Competency Indices</span>
              </h3>
              <div className="space-y-4">
                {skillsBars.map((item) => (
                  <div key={item.name} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-zinc-300">{item.name}</span>
                      <span className="text-gold-400 font-mono">{item.level}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-dark-850 rounded-full overflow-hidden border border-white/[0.04]">
                      <div
                        className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full transition-all duration-1000"
                        style={{ width: `${item.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Signature Block */}
            <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between">
              <div>
                <div className="font-heading font-bold text-xl text-white tracking-widest uppercase">
                  Talha
                </div>
                <div className="text-xs text-gold-400/90 font-medium mt-0.5">
                  AI Engineer
                </div>
              </div>
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold text-xs transition-colors"
              >
                <span>Let's Connect</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Right: Portrait & Background */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-[460px]">
              <CinematicPortrait />
            </div>

            {/* Education Highlight Card */}
            <div className="w-full mt-10 rounded-2xl p-6 bg-gradient-to-b from-dark-900/90 to-dark-950 border border-white/[0.07] space-y-4 shadow-xl">
              <div className="flex items-center gap-3 text-gold-400">
                <GraduationCap className="w-5 h-5" />
                <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
                  Academic Background
                </h4>
              </div>

              <div className="space-y-3 text-xs text-zinc-300">
                <div className="pb-3 border-b border-white/[0.05]">
                  <div className="flex justify-between font-semibold text-white">
                    <span>BS in Computer Science</span>
                    <span className="text-zinc-500 font-mono">2020 – 2024</span>
                  </div>
                  <p className="text-zinc-400 mt-1">
                    Focused on Distributed Systems, Artificial Intelligence, and Software Architecture.
                  </p>
                </div>
                <div>
                  <div className="flex justify-between font-semibold text-white">
                    <span>Higher Secondary Studies (Pre-Engineering)</span>
                    <span className="text-zinc-500 font-mono">2018 – 2020</span>
                  </div>
                  <p className="text-zinc-400 mt-1">
                    Core mathematics, physics, and computer science foundations.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Engineering Philosophy Cards */}
        <div className="pt-12 border-t border-white/[0.06]">
          <div className="mb-10 text-center max-w-xl mx-auto">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-gold-400">
              CORE PRINCIPLES
            </span>
            <h2 className="font-heading text-3xl font-bold text-white mt-2">
              How I Approach Software
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((p, index) => {
              const Icon = p.icon;
              return (
                <div
                  key={index}
                  className="rounded-2xl p-7 bg-dark-900/60 border border-white/[0.06] hover:border-gold-500/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-400/20 flex items-center justify-center text-gold-300 mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-white mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
