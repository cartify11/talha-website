import React from 'react';
import { ArrowRight, MessageSquare, Mail, Sparkles } from 'lucide-react';

interface ContactCTAProps {
  onOpenContactModal?: () => void;
}

export const ContactCTA: React.FC<ContactCTAProps> = ({ onOpenContactModal }) => {
  return (
    <section id="contact" className="relative py-20 sm:py-28 overflow-hidden bg-black">
      
      {/* Background Cinematic Glows */}
      <div className="absolute inset-0 bg-radial-gradient-center opacity-70 pointer-events-none" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl p-8 sm:p-12 md:p-16 bg-gradient-to-b from-dark-850/90 via-dark-900/90 to-dark-950 border border-gold-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(198,164,119,0.15)] text-center overflow-hidden">
          
          {/* Subtle Top Accent Line */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-60" />

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-950/80 border border-gold-500/30 text-gold-300 text-xs font-semibold tracking-wider uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>START A COLLABORATION</span>
          </div>

          {/* Heading */}
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white max-w-2xl mx-auto leading-tight">
            Have a project in mind?{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-gold-500">
              Let's build something extraordinary.
            </span>
          </h2>

          {/* Subtext */}
          <p className="mt-4 sm:mt-6 text-sm sm:text-base text-zinc-400 max-w-xl mx-auto font-normal leading-relaxed">
            Whether you need an AI-driven solution, high-performance web platform, mobile app, or tailored enterprise system, I am available to bring your vision to life.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenContactModal}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold text-sm tracking-wide transition-all duration-300 shadow-[0_4px_25px_rgba(198,164,119,0.4)] hover:shadow-[0_4px_35px_rgba(198,164,119,0.6)] group"
            >
              <MessageSquare className="w-4 h-4 text-dark-950" />
              <span>Let's Talk</span>
              <ArrowRight className="w-4 h-4 text-dark-950 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <a
              href="mailto:m.talha204567@gmail.com"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-dark-950/80 hover:bg-dark-900 text-zinc-200 hover:text-white font-medium text-sm border border-white/[0.1] hover:border-gold-500/40 transition-all duration-300"
            >
              <Mail className="w-4 h-4 text-gold-400" />
              <span>m.talha204567@gmail.com</span>
            </a>
          </div>

          {/* Verification pill */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-zinc-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Typically responds within 24 hours</span>
          </div>

        </div>
      </div>
    </section>
  );
};
