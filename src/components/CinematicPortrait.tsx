import React, { useState } from 'react';

export const CinematicPortrait: React.FC = () => {
  const [imgSrc, setImgSrc] = useState<string>('/assets/talha-portrait-suit.jpg');

  return (
    <div className="relative w-full max-w-[420px] lg:max-w-[460px] aspect-[4/5] mx-auto flex items-center justify-center select-none group">
      
      {/* Background Atmospheric Light Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        {/* Soft radial atmospheric champagne gold ambient glow */}
        <div 
          className="w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] rounded-full bg-radial-gradient-hero opacity-40 blur-3xl" 
        />
      </div>

      {/* Main Portrait Frame with Cinematic Blending */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-end overflow-hidden rounded-3xl border border-white/[0.1] bg-black shadow-[0_25px_60px_rgba(0,0,0,0.95)]">
        
        {/* Talha's High-Resolution Original Portrait */}
        <img
          src={imgSrc}
          alt="Talha — AI & Software Developer"
          className="w-full h-full object-cover object-[50%_15%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          onError={() => {
            setImgSrc('/assets/talha-portrait-hq.png');
          }}
        />

        {/* Subtle Bottom Gradient (Blends lower body cleanly without fogging face or shoulders) */}
        <div className="absolute bottom-0 inset-x-0 h-28 sm:h-36 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-20" />

        {/* Subtle Champagne-Gold Rim Highlight Filter on borders */}
        <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-gold-500/25 pointer-events-none z-30" />

      </div>

      {/* Floating Availability Badge (matching reference image: "✦ Available for Freelance") */}
      <div className="absolute -bottom-4 sm:bottom-6 right-2 sm:-right-4 z-30 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-dark-900/95 border border-gold-500/40 shadow-[0_10px_25px_rgba(0,0,0,0.85),0_0_20px_rgba(198,164,119,0.3)] backdrop-blur-md">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold text-white tracking-wide">
            ✦ Available for Projects
          </span>
          <span className="text-[9px] text-gold-400/90 font-medium">
            Freelance & Full-time
          </span>
        </div>
      </div>

    </div>
  );
};
