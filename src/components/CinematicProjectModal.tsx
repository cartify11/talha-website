import React, { useState, useEffect } from 'react';
import { ExternalLink, ArrowRight, X, Sparkles, CheckCircle2, Globe, Shield, Terminal, Layers } from 'lucide-react';
import { ProjectItem } from '../data/projectsData';

interface CinematicProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onViewCaseStudy?: (slug: string) => void;
}

export const CinematicProjectModal: React.FC<CinematicProjectModalProps> = ({
  project,
  onClose,
  onViewCaseStudy,
}) => {
  const [phase, setPhase] = useState<'title-intro' | 'content-reveal'>('title-intro');

  useEffect(() => {
    if (project) {
      setPhase('title-intro');
      // Transition from dramatic title reveal to full project showcase
      const timer = setTimeout(() => {
        setPhase('content-reveal');
      }, 1100);
      return () => clearTimeout(timer);
    }
  }, [project]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/90 backdrop-blur-2xl animate-fadeIn">
      {/* Background Volumetric Gold Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold-500/10 blur-[160px] rounded-full" />
      </div>

      {/* PHASE 1: Dramatic Cinematic Title Reveal */}
      {phase === 'title-intro' && (
        <div className="relative z-20 flex flex-col items-center justify-center text-center p-8 max-w-3xl animate-scaleUp">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-400/40 text-gold-300 text-xs font-mono uppercase tracking-[0.25em] mb-6 shadow-[0_0_20px_rgba(198,164,119,0.25)]">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
            <span>INITIALIZING VERIFIED PRODUCTION SYSTEM</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gold-200 to-gold-400 tracking-tight leading-none mb-6 drop-shadow-[0_10px_35px_rgba(198,164,119,0.35)]">
            {project.name}
          </h2>

          <div className="w-28 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent rounded-full mb-4 animate-pulse" />

          <p className="text-zinc-400 text-sm font-mono tracking-widest uppercase">
            {project.type}
          </p>
        </div>
      )}

      {/* PHASE 2: Comprehensive Cinematic Project Showcase Modal */}
      {phase === 'content-reveal' && (
        <div className="relative z-20 w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-gradient-to-b from-[#161822]/98 via-[#0e1017]/98 to-[#06070a] border border-gold-500/40 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(198,164,119,0.25)] p-6 sm:p-10 animate-fadeIn">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/[0.05] hover:bg-gold-500/20 border border-white/[0.1] hover:border-gold-400 flex items-center justify-center text-zinc-400 hover:text-white transition-all z-30"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Header Tag */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-[11px] font-bold font-mono tracking-wider uppercase text-gold-300 bg-gold-500/10 border border-gold-400/40 px-3 py-1 rounded-full">
              {project.category}
            </span>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Verified Production Live
            </span>
            <span className="text-[11px] font-mono text-zinc-400 bg-white/[0.04] border border-white/[0.08] px-3 py-1 rounded-full">
              {project.type}
            </span>
          </div>

          {/* Project Title */}
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {project.name}
          </h2>

          {/* 3D Realistic Project Preview Artwork */}
          {project.previewImage && (
            <div className="relative w-full rounded-2xl overflow-hidden border border-gold-500/30 shadow-2xl mb-8 group aspect-[16/9]">
              <img
                src={project.previewImage}
                alt={project.name}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-gold-300 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-black/85 border border-gold-500/40 backdrop-blur-md">
                  Architect: Talha
                </span>
                <span className="px-3 py-1 rounded-full bg-black/85 border border-gold-500/40 backdrop-blur-md">
                  100% Deployed & Operational
                </span>
              </div>
            </div>
          )}

          {/* Action Link Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
            {/* Primary Live Website Button */}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_4px_25px_rgba(198,164,119,0.35)] hover:scale-[1.02] group"
              >
                <Globe className="w-4 h-4 text-dark-950" />
                <span>Open Live Website ↗</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}

            {/* App / Management Portal Button (If Available) */}
            {project.appUrl && (
              <a
                href={project.appUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-dark-900 hover:bg-dark-850 border border-gold-500/50 hover:border-gold-400 text-gold-300 hover:text-white font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-lg hover:scale-[1.02] group"
              >
                <Terminal className="w-4 h-4 text-gold-400" />
                <span>Launch App / Super-Admin ↗</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}
          </div>

          {/* Project Detailed Description */}
          <div className="space-y-4 mb-8">
            <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-gold-400 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Project Architecture & Overview</span>
            </h3>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {project.fullOverview || project.description}
            </p>
          </div>

          {/* Key Features List */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className="mb-8 p-5 rounded-2xl bg-dark-950/80 border border-white/[0.06]">
              <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-zinc-400 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />
                <span>Production Features Engineered</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {project.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                    <span className="text-gold-400 font-bold shrink-0">✦</span>
                    <span className="leading-snug">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies Chips */}
          <div className="mb-8">
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-zinc-400 mb-3 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-gold-400" />
              <span>Technology Stack</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] text-zinc-300 border border-white/[0.08]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Footer Actions */}
          <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
            {onViewCaseStudy && (
              <button
                onClick={() => onViewCaseStudy(project.slug)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-gold-300 hover:text-white transition-colors"
              >
                <span>Full Technical Case Study Page</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
              </button>
            )}

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-zinc-400 hover:text-white transition-all ml-auto"
            >
              Close Showcase
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
