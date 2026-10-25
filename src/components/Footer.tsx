import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ExternalLink, MapPin, Sparkles } from 'lucide-react';
import { LinkedInIcon, WhatsAppIcon, FacebookIcon, TikTokIcon } from './SocialIcons';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Features', path: '/features' },
    { name: 'Services', path: '/services' },
    { name: 'Experience', path: '/experience' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const solutions = [
    { title: 'SaaS Platform Architecture', path: '/services' },
    { title: 'Full-Stack Web Applications', path: '/projects' },
    { title: 'AI Solutions & Automation', path: '/services' },
    { title: 'High-Converting E-Commerce', path: '/projects' },
    { title: 'Cloud Infrastructure & APIs', path: '/services' },
  ];

  return (
    <footer className="relative bg-black border-t border-white/[0.08] pt-16 pb-12 overflow-hidden">
      
      {/* Subtle Background Glow Accents */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gold-500/[0.03] blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-gold-400/[0.02] blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Pre-Footer Action Banner */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-dark-900/90 via-dark-850 to-dark-900/90 border border-white/[0.08] shadow-[0_10px_40px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-full bg-gold-500/5 blur-3xl pointer-events-none" />
          
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-300 text-xs font-mono uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Have a project in mind?</span>
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
              Let's build something exceptional together.
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
              Available for full-stack engineering, custom SaaS systems, and production AI integrations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleNavClick('/contact')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold text-xs transition-all shadow-[0_4px_20px_rgba(198,164,119,0.3)] hover:scale-105"
            >
              <span>Start A Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <a
              href="https://wa.me/923145873362?text=Hello%20Talha,%20I%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-all hover:scale-105"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* 4-Column Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/[0.08]">
          
          {/* Col 1: Brand & Identity (5 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div 
              onClick={() => handleNavClick('/')}
              className="flex items-center gap-3 cursor-pointer group w-fit"
            >
              <div className="w-10 h-10 rounded-full border border-gold-500/40 bg-dark-900 flex items-center justify-center group-hover:border-gold-400 transition-colors shadow-[0_0_15px_rgba(198,164,119,0.15)]">
                <span className="font-heading font-bold text-lg text-gold-300">
                  T
                </span>
              </div>
              <div>
                <span className="font-heading font-bold text-base tracking-widest text-white uppercase block group-hover:text-gold-200 transition-colors">
                  TALHA
                </span>
                <span className="text-xs text-zinc-400">
                  AI Engineer & Software Development
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Architecting high-performance SaaS applications, enterprise systems, and cinematic web experiences with modern full-stack technologies.
            </p>

            {/* Live Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-900 border border-emerald-500/30 text-[11px] text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for freelance contracts & full-time roles</span>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-mono uppercase tracking-widest text-gold-400 font-semibold">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavClick(link.path)}
                    className="text-zinc-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Capabilities & Solutions (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-mono uppercase tracking-widest text-gold-400 font-semibold">
              Capabilities
            </h4>
            <ul className="space-y-2 text-xs">
              {solutions.map((sol, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavClick(sol.path)}
                    className="text-zinc-400 hover:text-gold-300 transition-colors text-left flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold-400/50 group-hover:bg-gold-400 transition-colors" />
                    <span>{sol.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Channels (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-mono uppercase tracking-widest text-gold-400 font-semibold">
              Direct Channels
            </h4>
            
            <div className="space-y-2.5 text-xs text-zinc-400">
              <a
                href="mailto:m.talha204567@gmail.com"
                className="flex items-center gap-2 hover:text-white transition-colors group"
              >
                <div className="w-7 h-7 rounded-full bg-dark-900 border border-white/[0.08] flex items-center justify-center text-gold-400 group-hover:border-gold-500/40">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">m.talha204567@gmail.com</span>
              </a>

              <div className="flex items-center gap-2 text-zinc-400">
                <div className="w-7 h-7 rounded-full bg-dark-900 border border-white/[0.08] flex items-center justify-center text-gold-400">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span>Pakistan (Global Remote)</span>
              </div>
            </div>

            {/* Social Channels Bar */}
            <div className="pt-2">
              <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider block mb-2">
                Connect Online
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/923145873362?text=Hello%20Talha,%20I%20would%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Order & Chat on WhatsApp"
                  title="WhatsApp"
                  className="w-8 h-8 rounded-full border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/25 flex items-center justify-center text-emerald-400 hover:text-emerald-300 transition-all hover:scale-110 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                </a>


                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  className="w-8 h-8 rounded-full border border-white/[0.08] bg-dark-900/80 hover:bg-dark-850 flex items-center justify-center text-zinc-400 hover:text-white hover:border-gold-500/40 transition-all hover:scale-110"
                >
                  <LinkedInIcon className="w-3.5 h-3.5" />
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  title="Facebook"
                  className="w-8 h-8 rounded-full border border-white/[0.08] bg-dark-900/80 hover:bg-dark-850 flex items-center justify-center text-zinc-400 hover:text-[#1877F2] hover:border-[#1877F2]/40 transition-all hover:scale-110"
                >
                  <FacebookIcon className="w-3.5 h-3.5" />
                </a>

                {/* TikTok */}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok"
                  title="TikTok"
                  className="w-8 h-8 rounded-full border border-white/[0.08] bg-dark-900/80 hover:bg-dark-850 flex items-center justify-center text-zinc-400 hover:text-[#EE1D52] hover:border-[#EE1D52]/40 transition-all hover:scale-110"
                >
                  <TikTokIcon className="w-3.5 h-3.5" />
                </a>

                {/* Email */}
                <a
                  href="mailto:m.talha204567@gmail.com"
                  aria-label="Email: m.talha204567@gmail.com"
                  title="Send Email"
                  className="w-8 h-8 rounded-full border border-white/[0.08] bg-dark-900/80 hover:bg-dark-850 flex items-center justify-center text-zinc-400 hover:text-gold-300 hover:border-gold-500/40 transition-all hover:scale-110"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Notice & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
          <p>© {new Date().getFullYear()} Talha. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <p className="flex items-center gap-1.5 text-zinc-400 text-xs">
              Designed & Engineered with <span className="text-gold-400">✦</span> Cinematic Precision
            </p>

            <Link
              to="/admin/login"
              title="Admin Portal"
              aria-label="Admin Portal"
              className="w-7 h-7 rounded-full border border-gold-500/25 bg-gold-500/10 hover:bg-gold-500/20 hover:border-gold-400 flex items-center justify-center text-gold-400 hover:text-white transition-all duration-300 shadow-sm hover:scale-105"
            >
              <Lock className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
