import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Clock, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  Send,
  MessageCircle
} from 'lucide-react';
import { RealEmailBox } from './RealEmailBox';
import { WhatsAppIcon, FacebookIcon, TikTokIcon, LinkedInIcon } from './SocialIcons';
import { AnimatedReveal } from './AnimatedReveal';

interface ContactInfoSectionProps {
  onOpenContactModal?: () => void;
}

export const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({ onOpenContactModal }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const emailAddress = 'm.talha204567@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  return (
    <section id="contact-info" className="relative py-20 sm:py-28 bg-[#07090E] border-t border-white/10 overflow-hidden">
      
      {/* Background Vibrant Ambient Lighting with floating pulse */}
      <div className="absolute top-1/3 right-1/4 w-[550px] h-[550px] bg-gradient-to-r from-gold-500/15 via-amber-400/10 to-transparent blur-[160px] rounded-full pointer-events-none animate-pulse-aura" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-sky-500/10 blur-[150px] rounded-full pointer-events-none animate-float-drift" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <AnimatedReveal direction="up" delay={50}>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D121C] border border-gold-400/40 text-gold-300 text-xs font-bold tracking-wider uppercase hover:scale-105 transition-transform shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
              <span>DIRECT COMMUNICATION & COORDINATES</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Let’s Connect & Discuss{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gold-200 to-amber-300 drop-shadow-[0_0_30px_rgba(245,158,11,0.35)]">
                Your Next Project.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-200 font-normal leading-relaxed">
              Reach out through direct email, instant WhatsApp chat, or the verified message form below. Every inquiry receives immediate engineering attention.
            </p>
          </div>
        </AnimatedReveal>

        {/* 2-Column Grid: Coordinates on Left, Real Email Box on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Coordinates & Direct Action Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <AnimatedReveal direction="left" delay={120}>
            
            {/* Direct Email Card with 1-Click Copy */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#141C2B]/95 to-[#0E1522] border border-white/12 hover:border-gold-400/60 transition-all duration-300 shadow-xl group hover:shadow-[0_15px_35px_rgba(0,0,0,0.85),0_0_20px_rgba(245,158,11,0.2)]">
              <div className="flex items-start justify-between gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-400/25 flex items-center justify-center text-gold-400 shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-850 hover:bg-dark-800 text-zinc-300 hover:text-white border border-white/[0.08] text-xs font-mono transition-colors"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 space-y-1">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                  Direct Email Address
                </span>
                <a
                  href={`mailto:${emailAddress}`}
                  className="font-heading text-lg sm:text-xl font-bold text-white hover:text-gold-300 transition-colors block break-all"
                >
                  {emailAddress}
                </a>
                <span className="text-xs text-zinc-400 mt-1 block">
                  Inquiries typically answered within 12–24 hours
                </span>
              </div>
            </div>

            {/* Direct WhatsApp Order Card (Number hidden behind scenes) */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-emerald-950/25 via-dark-900/90 to-dark-950 border border-emerald-500/30 hover:border-emerald-500/50 transition-all duration-300 shadow-[0_10px_30px_rgba(16,185,129,0.1)]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.25)]">
                  <WhatsAppIcon className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block font-semibold">
                    Instant Messaging & Order
                  </span>
                  <div className="font-heading text-lg font-bold text-white mt-0.5">
                    Direct WhatsApp Chat
                  </div>
                  <span className="text-xs text-zinc-300 mt-1 block leading-relaxed">
                    Fast response for custom software orders, urgent milestones, and direct technical consultations.
                  </span>
                  
                  <a
                    href="https://wa.me/923145873362?text=Hello%20Talha,%20I%20would%20like%20to%20discuss%20a%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3.5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_4px_15px_rgba(16,185,129,0.35)] hover:scale-105"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-dark-950" />
                    <span>Start WhatsApp Order ↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Location & Availability Card */}
            <div className="p-6 rounded-3xl bg-dark-900/80 border border-white/[0.08] space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-400/20 flex items-center justify-center text-gold-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                    Location & Reach
                  </span>
                  <div className="font-heading text-base font-bold text-white mt-0.5">
                    Available Worldwide (Remote)
                  </div>
                  <span className="text-xs text-gold-400/90 font-medium mt-1 block">
                    Pakistan, City Swabi (Global Remote Delivery across USA, UK, UAE, Europe)
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.05] flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="text-xs font-semibold text-zinc-300">
                  Always Available for Your Services • Open for New Projects
                </span>
              </div>
            </div>

            {/* Social Platforms Row */}
            <div className="p-5 rounded-2xl bg-dark-950 border border-white/[0.06] flex items-center justify-between gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono">
                Connect Across Platforms:
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://wa.me/923145873362?text=Hello%20Talha,%20I%20would%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 flex items-center justify-center text-emerald-400 hover:scale-105 transition-all"
                  title="WhatsApp"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full border border-white/[0.08] bg-dark-900 hover:bg-dark-850 flex items-center justify-center text-zinc-400 hover:text-[#1877F2] hover:scale-105 transition-all"
                  title="Facebook"
                >
                  <FacebookIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full border border-white/[0.08] bg-dark-900 hover:bg-dark-850 flex items-center justify-center text-zinc-400 hover:text-[#EE1D52] hover:scale-105 transition-all"
                  title="TikTok"
                >
                  <TikTokIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full border border-white/[0.08] bg-dark-900 hover:bg-dark-850 flex items-center justify-center text-zinc-400 hover:text-white hover:scale-105 transition-all"
                  title="LinkedIn"
                >
                  <LinkedInIcon className="w-3.5 h-3.5" />
                </a>

              </div>
            </div>
          </AnimatedReveal>
        </div>

        {/* Right Column: Embedded Real Working Email Box (7 cols) */}
        <div className="lg:col-span-7">
          <AnimatedReveal direction="right" delay={200}>
            <RealEmailBox
              recipientEmail={emailAddress}
              defaultSubject="Software Engineering / AI Project Inquiry"
            />
          </AnimatedReveal>
        </div>

      </div>

      </div>
    </section>
  );
};
