import React from 'react';

export const Dev3DLogoBadge: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const containerSize = size === 'sm' ? 'w-16 h-16' : size === 'lg' ? 'w-24 h-24' : 'w-20 h-20';

  return (
    <div className={`relative ${containerSize} flex items-center justify-center select-none group/logo`}>
      
      {/* 1. Ambient Volumetric Golden Glow */}
      <div 
        className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-gold-600/40 via-gold-400/30 to-transparent blur-md group-hover/logo:blur-xl group-hover/logo:opacity-100 transition-all duration-500 animate-pulse" 
        style={{ animationDuration: '4s' }} 
      />

      {/* 2. Outer Rotating 3D Orbital Light Ring */}
      <div 
        className="absolute -inset-1.5 rounded-2xl border border-gold-400/40 border-dashed animate-spin pointer-events-none opacity-80 group-hover/logo:opacity-100"
        style={{ animationDuration: '14s' }}
      />

      {/* 3. 3D Rendered Picture Container */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black border-2 border-gold-400/70 p-0.5 shadow-[0_10px_25px_rgba(0,0,0,0.95),0_0_20px_rgba(198,164,119,0.4)] group-hover/logo:scale-105 group-hover/logo:border-gold-300 transition-all duration-300 flex items-center justify-center">
        
        {/* Actual 3D Render Image */}
        <img
          src="/assets/ai-dev-3d-logo.jpg"
          alt="AI Software 3D Logo"
          className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover/logo:scale-110"
        />

        {/* Top-edge specular highlight */}
        <div className="absolute top-0 inset-x-2 h-[1px] bg-gradient-to-r from-transparent via-gold-200 to-transparent opacity-90 pointer-events-none" />

        {/* Live Status Micro Beacon */}
        <span className="absolute bottom-1 right-1 flex h-3 w-3 z-10">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-black" />
        </span>

      </div>

    </div>
  );
};
