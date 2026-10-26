import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { CinematicPortrait } from './CinematicPortrait';
import { LinkedInIcon, WhatsAppIcon, FacebookIcon, TikTokIcon } from './SocialIcons';

interface HeroProps {
  onExploreProjects: () => void;
  onWorkTogether: () => void;
}

const ROTATING_PHRASES = [
  'Digital Experiences.',
  'AI Software Systems.',
  'Modern Web Platforms.',
  'Cross-Platform Mobile Apps.',
  'Scalable SaaS Engines.',
];

export const Hero: React.FC<HeroProps> = ({ onExploreProjects, onWorkTogether }) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
        setIsFading(false);
      }, 350);
    }, 3400);

    return () => clearInterval(interval);
  }, []);
  return (
    <section id="home" className="relative pt-24 pb-6 sm:pt-28 sm:pb-8 lg:pt-32 lg:pb-10 flex flex-col justify-center overflow-hidden">
      
      {/* Background Subtle Ambient Lighting with slow floating pulse */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gold-500/5 blur-[120px] rounded-full pointer-events-none animate-pulse-aura" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-gold-400/5 blur-[100px] rounded-full pointer-events-none animate-float-drift" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5 sm:space-y-6 text-left">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center animate-hero-eyebrow">
              <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-gold-400">
                AI ENGINEER & SOFTWARE DEVELOPMENT
              </span>
            </div>

            {/* Main Headline with Animated Rotating Words & Liquid Gold Gradient */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08] animate-hero-heading">
              <span className="block">Building Intelligent</span>
              <span
                className={`inline-block text-transparent bg-clip-text bg-gradient-to-r from-gold-100 via-gold-400 to-amber-200 bg-[length:200%_auto] animate-text-gradient-flow drop-shadow-[0_0_35px_rgba(198,164,119,0.35)] transition-all duration-300 ease-out ${
                  isFading
                    ? 'opacity-0 -translate-y-2 blur-[2px]'
                    : 'opacity-100 translate-y-0 blur-0'
                }`}
              >
                {ROTATING_PHRASES[phraseIndex]}
              </span>
            </h1>

            {/* Supporting Bio / Introduction */}
            <p className="text-base sm:text-lg text-zinc-400 max-w-xl font-normal leading-relaxed animate-hero-bio">
              I build AI-powered applications, modern websites, mobile apps, and custom software solutions that solve real-world problems.
            </p>

            {/* Action Buttons (CTAs) */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2 animate-hero-cta">
              {/* Primary CTA */}
              <button
                onClick={onExploreProjects}
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white hover:bg-gold-100 text-dark-950 font-semibold text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:shadow-[0_4px_25px_rgba(198,164,119,0.35)] shimmer-button hover:scale-[1.02] active:scale-[0.98] group"
              >
                <span>Explore My Projects</span>
                <ArrowRight className="w-4 h-4 text-dark-950 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={onWorkTogether}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-dark-900/80 hover:bg-dark-800 text-zinc-200 hover:text-white font-medium text-sm border border-white/[0.1] hover:border-gold-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(198,164,119,0.15)]"
              >
                <span>Let's Work Together</span>
              </button>
            </div>

            {/* Social Links Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2 sm:pt-3 animate-hero-social">
              {/* Direct WhatsApp Action */}
              <a
                href="https://wa.me/923145873362?text=Hello%20Talha,%20I%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Order & Chat on WhatsApp"
                title="Order & Chat on WhatsApp"
                className="w-10 h-10 rounded-full border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/25 flex items-center justify-center text-emerald-400 hover:text-emerald-300 transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>


              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                title="LinkedIn"
                className="w-10 h-10 rounded-full border border-white/[0.08] bg-dark-900/60 hover:bg-dark-850 flex items-center justify-center text-zinc-400 hover:text-white hover:border-gold-500/40 transition-all duration-300 hover:scale-105"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>

              {/* Facebook Option */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook Profile"
                title="Facebook"
                className="w-10 h-10 rounded-full border border-white/[0.08] bg-dark-900/60 hover:bg-dark-850 flex items-center justify-center text-zinc-400 hover:text-[#1877F2] hover:border-[#1877F2]/40 transition-all duration-300 hover:scale-105"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>

              {/* TikTok Option */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok Profile"
                title="TikTok"
                className="w-10 h-10 rounded-full border border-white/[0.08] bg-dark-900/60 hover:bg-dark-850 flex items-center justify-center text-zinc-400 hover:text-[#EE1D52] hover:border-[#EE1D52]/40 transition-all duration-300 hover:scale-105"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>

              {/* Direct Email */}
              <a
                href="mailto:m.talha204567@gmail.com"
                aria-label="Email: m.talha204567@gmail.com"
                title="Email: m.talha204567@gmail.com"
                className="w-10 h-10 rounded-full border border-white/[0.08] bg-dark-900/60 hover:bg-dark-850 flex items-center justify-center text-zinc-400 hover:text-gold-300 hover:border-gold-500/40 transition-all duration-300 hover:scale-105"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Right Column: Cinematic Portrait Visual */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end animate-hero-portrait">
            <div className="animate-float-slow w-full flex justify-center lg:justify-end">
              <CinematicPortrait />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
