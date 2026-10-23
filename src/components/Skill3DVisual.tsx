import React, { useState, useEffect, useRef } from 'react';
import { Live3DDevLogo } from './Live3DDevLogo';

interface Skill3DVisualProps {
  skillId: string;
  className?: string;
  interactive?: boolean;
}

export const Skill3DVisual: React.FC<Skill3DVisualProps> = ({
  skillId,
  className = "w-full h-56 sm:h-64",
  interactive = true,
}) => {
  // If it's the AI Software Developer, render the approved live photoreal developer + live coding monitor!
  if (skillId === 'ai-software-developer') {
    return <Live3DDevLogo className={className} interactive={interactive} />;
  }

  return <GenericSkillVisual skillId={skillId} className={className} interactive={interactive} />;
};

// Generic Interactive 3D Visual with topic-specific live screen-mapped environments
const GenericSkillVisual: React.FC<{ skillId: string; className: string; interactive: boolean }> = ({
  skillId,
  className,
  interactive,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glowX: 50, glowY: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [tick, setTick] = useState(0);

  // Micro-clock for smooth continuous 3D screen animations
  useEffect(() => {
    const timer = setInterval(() => {
      setTick((prev) => (prev + 1) % 1000);
    }, 40);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 12;
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;

    setTilt({ x: rotateX, y: rotateY, glowX, glowY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, glowX: 50, glowY: 50 });
  };

  // Determine base photorealistic render image & label
  let imageSrc = '/assets/photoreal-web-dev.jpg';
  let badgeLabel = 'Web Engineering';

  switch (skillId) {
    case 'ai-web-developer':
      imageSrc = '/assets/photoreal-web-dev.jpg';
      badgeLabel = 'AI Web & WordPress';
      break;
    case 'mobile-app-developer':
      imageSrc = '/assets/photoreal-mobile-dev.jpg';
      badgeLabel = 'Mobile iOS / Android';
      break;
    case 'management-system-developer':
      imageSrc = '/assets/photoreal-manage-sys.jpg';
      badgeLabel = 'Enterprise Management';
      break;
    case 'browser-extension-plugin-developer':
      imageSrc = '/assets/photoreal-browser-ext.jpg';
      badgeLabel = 'Extensions & Plugins';
      break;
    case 'ecommerce-store-developer':
      imageSrc = '/assets/photoreal-ecom-store.jpg';
      badgeLabel = 'E-commerce & Store';
      break;
    case 'saas-system-developer':
      imageSrc = '/assets/photoreal-saas-sys.jpg';
      badgeLabel = 'Cloud SaaS Platform';
      break;
    case 'social-media-marketer':
      imageSrc = '/assets/photoreal-social-media.jpg';
      badgeLabel = 'Social Media Telemetry';
      break;
    case 'ai-video-editor':
      imageSrc = '/assets/photoreal-video-edit.jpg';
      badgeLabel = 'Cinematic AI Video';
      break;
    default:
      imageSrc = '/assets/photoreal-web-dev.jpg';
      badgeLabel = 'Developer Skill';
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1100px' }}
      className={`relative rounded-2xl overflow-hidden bg-black border border-gold-500/40 shadow-2xl transition-all duration-300 group ${className}`}
    >
      <div
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${isHovered ? 1.04 : 1}, ${isHovered ? 1.04 : 1}, 1)`,
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'transform 0.12s cubic-bezier(0.2, 0, 0, 1)' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="relative w-full h-full select-none"
      >
        {/* Base Photorealistic 3D Scene Render with Parallax Layer */}
        <div
          style={{
            transform: `translateZ(${isHovered ? '-10px' : '0px'}) scale(${isHovered ? 1.06 : 1.02})`,
            transition: 'transform 0.4s ease-out',
          }}
          className="w-full h-full"
        >
          <img
            src={imageSrc}
            alt={badgeLabel}
            className="w-full h-full object-cover object-center pointer-events-none"
            loading="eager"
          />
        </div>

        {/* Ambient 3D Cyber Depth Grid Lines */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            transform: 'translateZ(10px)',
            backgroundImage: `radial-gradient(rgba(198, 164, 119, 0.35) 1px, transparent 1px)`,
            backgroundSize: '22px 22px',
          }}
        />

        {/* Dynamic Specular Light Glare Sweeping Across Screen with Cursor */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none opacity-45 transition-opacity duration-300"
            style={{
              transform: 'translateZ(20px)',
              background: `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(255, 255, 255, 0.25) 0%, rgba(198, 164, 119, 0.35) 28%, transparent 62%)`,
            }}
          />
        )}

        {/* ========================================================================= */}
        {/* TOPIC-SPECIFIC PERSPECTIVE-MAPPED 3D LIVE SCREENS & WORKSTATION PLATFORMS */}
        {/* ========================================================================= */}

        {/* 1. AI & WORDPRESS WEB DEVELOPER: Ultrawide Curved Screen Live Browser */}
        {skillId === 'ai-web-developer' && (
          <>
            {/* Screen Perspective Viewport mapped to the ultrawide monitor */}
            <div
              className="absolute left-[18%] top-[12%] w-[64%] h-[58%] pointer-events-none overflow-hidden rounded-lg shadow-[inset_0_0_20px_rgba(56,189,248,0.25)]"
              style={{
                transform: 'perspective(800px) rotateX(4deg) scale(0.98)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Browser Dark Glass Chrome Header */}
              <div className="flex items-center justify-between px-2.5 py-1 bg-[#090d16]/95 border-b border-cyan-500/30">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                  <span className="text-[7.5px] font-mono text-cyan-300/90 ml-1.5">talha.dev/ai-platform</span>
                </div>
                <span className="text-[7px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  LIVE
                </span>
              </div>

              {/* Live Web Content Canvas */}
              <div className="p-2 bg-[#060911]/90 flex gap-2 h-full">
                {/* Code stream */}
                <div className="w-1/2 font-mono text-[7px] text-zinc-400 space-y-0.5 border-r border-white/5 pr-1">
                  <div className="text-gold-400 font-semibold">&lt;TalhaArchitecture&gt;</div>
                  <div className="pl-1 text-cyan-300">aiEngine: 'active'</div>
                  <div className="pl-1 text-emerald-300">speed: '99/100'</div>
                  <div className="pl-1 text-zinc-500">// Auto-compiling...</div>
                  <div className="text-gold-400 font-semibold">&lt;/TalhaArchitecture&gt;</div>
                </div>
                {/* Visual UI Preview */}
                <div className="w-1/2 flex flex-col justify-center space-y-1">
                  <div className="h-2 w-full rounded bg-gradient-to-r from-gold-500/60 to-cyan-500/40 animate-pulse" />
                  <div className="h-1.5 w-4/5 rounded bg-white/20" />
                  <div className="h-1.5 w-3/5 rounded bg-white/15" />
                  <div className="flex gap-1 pt-1">
                    <span className="px-1 py-0.5 rounded text-[6px] font-mono bg-gold-500/20 text-gold-300 border border-gold-500/40">React</span>
                    <span className="px-1 py-0.5 rounded text-[6px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">WordPress</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ambient Screen Light Spill onto Keyboard Area */}
            <div
              className="absolute left-[30%] bottom-[12%] w-[40%] h-[15%] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, rgba(198, 164, 119, 0.15) 45%, transparent 70%)',
              }}
            />

            {/* 3D Floating Holographic Tag */}
            <div
              className="absolute right-[12%] bottom-[18%] px-3 py-1 rounded-full bg-black/90 border border-gold-400/60 shadow-[0_10px_25px_rgba(0,0,0,0.9)] backdrop-blur-md pointer-events-none"
              style={{
                transform: `translateZ(${isHovered ? '50px' : '22px'})`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              <span className="text-[8px] font-mono font-bold tracking-wider text-gold-300 uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                ⚡ HMR Live Sync
              </span>
            </div>
          </>
        )}

        {/* 2. MOBILE APP DEVELOPER: 3D Angled OLED Smartphone Display */}
        {skillId === 'mobile-app-developer' && (
          <>
            {/* Screen Perspective Viewport mapped directly to angled phone OLED display */}
            <div
              className="absolute left-[37%] top-[16%] w-[40%] h-[68%] pointer-events-none overflow-hidden rounded-[18px] shadow-[inset_0_0_25px_rgba(198,164,119,0.35)]"
              style={{
                transform: 'perspective(850px) rotateX(44deg) rotateY(-16deg) rotateZ(-34deg)',
                transformStyle: 'preserve-3d',
                transformOrigin: 'center center',
              }}
            >
              {/* Dynamic Island Status Header */}
              <div className="flex items-center justify-between px-3 pt-2 pb-1 bg-black/95">
                <span className="text-[7px] font-mono font-bold text-white">9:41</span>
                <div className="w-8 h-2 rounded-full bg-black border border-white/20" />
                <div className="flex items-center gap-1 text-[7px] font-mono text-emerald-400">
                  <span>5G</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
              </div>

              {/* Live Financial/Crypto App Screen */}
              <div className="p-2.5 bg-gradient-to-b from-[#0c0d12] to-black h-full flex flex-col justify-between">
                <div>
                  <span className="text-[6.5px] uppercase tracking-wider text-zinc-400 font-mono block">Portfolio Balance</span>
                  <div className="text-[11px] font-heading font-extrabold text-white flex items-baseline gap-1">
                    <span>$148,920.50</span>
                    <span className="text-[7.5px] font-mono text-emerald-400 font-bold">(+24.8%)</span>
                  </div>
                </div>

                {/* Animated Vector Pulse Wave Chart */}
                <div className="my-1 h-12 w-full relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
                    <defs>
                      <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#C6A477" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#C6A477" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 32 Q 20 10, 40 22 T 80 8 T 100 4 L 100 40 L 0 40 Z"
                      fill="url(#chartGrad)"
                    />
                    <path
                      d="M 0 32 Q 20 10, 40 22 T 80 8 T 100 4"
                      fill="none"
                      stroke="#C6A477"
                      strokeWidth="2"
                    />
                    <circle cx="100" cy="4" r="2.5" fill="#34d399" className="animate-ping" />
                  </svg>
                </div>

                {/* Floating Transaction Pill */}
                <div className="px-2 py-1 rounded-lg bg-white/[0.05] border border-gold-500/30 flex items-center justify-between">
                  <span className="text-[6.5px] font-mono text-zinc-300">Swift & Flutter</span>
                  <span className="text-[6.5px] font-mono font-bold text-emerald-400">120 FPS</span>
                </div>
              </div>
            </div>

            {/* Ambient OLED Rim Glow reflecting on desk */}
            <div
              className="absolute left-[38%] top-[25%] w-[42%] h-[45%] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(198, 164, 119, 0.4) 0%, transparent 70%)',
                opacity: 0.7 + Math.sin(tick * 0.1) * 0.3,
              }}
            />

            {/* 3D Floating Notification Badge */}
            <div
              className="absolute right-[8%] top-[12%] px-3 py-1.5 rounded-full bg-dark-950/95 border border-gold-400/60 shadow-[0_12px_30px_rgba(0,0,0,0.9)] backdrop-blur-md pointer-events-none"
              style={{
                transform: `translateZ(${isHovered ? '54px' : '26px'})`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              <div className="text-[8.5px] font-mono font-bold text-gold-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>iOS / Android Build v2.4</span>
              </div>
            </div>
          </>
        )}

        {/* 3. MANAGEMENT SYSTEM DEVELOPER: Multi-Screen Enterprise Operations */}
        {skillId === 'management-system-developer' && (
          <>
            {/* Main Center Console Screen */}
            <div
              className="absolute left-[24%] top-[14%] w-[52%] h-[56%] pointer-events-none overflow-hidden rounded-lg bg-[#070b14]/90 border border-emerald-500/30 shadow-[inset_0_0_20px_rgba(16,185,129,0.18)]"
              style={{
                transform: 'perspective(750px) rotateX(3deg)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Console Header */}
              <div className="flex items-center justify-between px-2.5 py-1 bg-[#0b1220] border-b border-emerald-500/30">
                <span className="text-[7px] font-mono text-emerald-400 font-bold">TALHA ERP OPS // v6.2</span>
                <span className="text-[6.5px] font-mono text-zinc-400">99.99% CLOUD UPTIME</span>
              </div>

              {/* Live Metric Gauges */}
              <div className="p-2 space-y-1.5">
                <div>
                  <div className="flex justify-between text-[6.5px] font-mono text-zinc-300 mb-0.5">
                    <span>CPU Cluster Alpha</span>
                    <span className="text-emerald-400 font-bold">18.4% OPTIMAL</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${30 + (tick % 25)}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[6.5px] font-mono text-zinc-300 mb-0.5">
                    <span>Active Transactions</span>
                    <span className="text-gold-300 font-bold">$1,248,500</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gold-400 rounded-full" style={{ width: '84%' }} />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[6.5px] font-mono text-zinc-400">
                  <span>Multi-Tenant DB</span>
                  <span className="text-cyan-300 font-bold">0ms Latency</span>
                </div>
              </div>
            </div>

            {/* 3D Floating KPI Badge */}
            <div
              className="absolute right-[12%] top-[14%] px-3 py-1.5 rounded-xl bg-dark-950/95 border border-emerald-500/50 shadow-[0_12px_30px_rgba(0,0,0,0.9)] backdrop-blur-md pointer-events-none"
              style={{
                transform: `translateZ(${isHovered ? '50px' : '22px'})`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              <div className="text-[8px] font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold">HEALTH: 99.98% OPTIMAL</span>
              </div>
            </div>
          </>
        )}

        {/* 4. BROWSER EXTENSION & PLUGIN: Dual Screen DevTools & Floating 3D Popover */}
        {skillId === 'browser-extension-plugin-developer' && (
          <>
            {/* DevTools Canvas */}
            <div
              className="absolute left-[20%] top-[16%] w-[60%] h-[55%] pointer-events-none overflow-hidden rounded-lg bg-[#060a12]/90 border border-cyan-500/30 shadow-xl"
              style={{
                transform: 'perspective(750px) rotateX(4deg)',
              }}
            >
              <div className="px-2 py-1 bg-[#0b101e] border-b border-cyan-500/20 flex items-center justify-between">
                <span className="text-[7px] font-mono text-cyan-300">Chrome DevTools • Extension Tab</span>
                <span className="text-[6.5px] font-mono text-emerald-400">Manifest V3</span>
              </div>
              <div className="p-2 font-mono text-[6.5px] text-zinc-400 space-y-1">
                <div className="text-cyan-400">&gt; chrome.runtime.onInstalled.addListener()</div>
                <div className="text-zinc-500">[Info] Background service worker registered (12ms)</div>
                <div className="text-emerald-400">&gt; ContentScript: Active on 1,420 tabs</div>
              </div>
            </div>

            {/* Floating 3D Browser Extension Modal Popover */}
            <div
              className="absolute right-[14%] bottom-[16%] px-3.5 py-2 rounded-2xl bg-dark-950/95 border border-cyan-400/60 shadow-[0_15px_35px_rgba(0,0,0,0.9)] backdrop-blur-md pointer-events-none"
              style={{
                transform: `translateZ(${isHovered ? '52px' : '24px'})`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 rounded-md bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-[8px] font-bold text-cyan-300">
                  🧩
                </div>
                <div>
                  <span className="text-[8px] font-bold text-white block">Talha Extension</span>
                  <span className="text-[6.5px] font-mono text-cyan-300">Auto-AI: ON</span>
                </div>
              </div>
              <div className="text-[7.5px] font-mono text-zinc-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>DOM Inspector: Active</span>
              </div>
            </div>
          </>
        )}

        {/* 5. E-COMMERCE & STORE DEVELOPER: Luxury Boutique 3D Showcase */}
        {skillId === 'ecommerce-store-developer' && (
          <>
            {/* Monitor Luxury Store Interface */}
            <div
              className="absolute left-[20%] top-[14%] w-[60%] h-[56%] pointer-events-none overflow-hidden rounded-lg bg-[#080706]/95 border border-gold-500/40 shadow-[inset_0_0_25px_rgba(198,164,119,0.2)]"
              style={{
                transform: 'perspective(750px) rotateX(4deg)',
              }}
            >
              <div className="px-2.5 py-1 bg-black/90 border-b border-gold-500/30 flex items-center justify-between">
                <span className="text-[7.5px] font-heading tracking-widest text-gold-300 font-bold uppercase">AURA LUXURY // BOUTIQUE</span>
                <span className="text-[6.5px] font-mono text-gold-400">100% SECURE</span>
              </div>
              <div className="p-2 flex items-center justify-between h-full">
                <div className="space-y-1">
                  <span className="text-[6px] uppercase tracking-wider text-zinc-400 font-mono block">Featured Edition</span>
                  <span className="text-[9px] font-heading font-bold text-white block">Royal Chronograph</span>
                  <span className="text-[8px] font-mono font-bold text-gold-400 block">$19,300 USD</span>
                </div>
                <div className="w-12 h-12 rounded-xl border border-gold-500/30 bg-gold-500/10 flex items-center justify-center text-[18px] shadow-[0_0_15px_rgba(198,164,119,0.3)]">
                  ⌚
                </div>
              </div>
            </div>

            {/* 3D Floating Shopping Bag Badge */}
            <div
              className="absolute right-[14%] top-[14%] px-3.5 py-1.5 rounded-full bg-gold-400 text-dark-950 font-bold shadow-[0_12px_30px_rgba(198,164,119,0.5)] pointer-events-none"
              style={{
                transform: `translateZ(${isHovered ? '54px' : '26px'})`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              <span className="text-[8.5px] tracking-wider uppercase font-mono flex items-center gap-1.5">
                <span>🛍️ Bag: 3 Items ($19,300)</span>
              </span>
            </div>

            {/* 3D Floating 1-Click Checkout Pill */}
            <div
              className="absolute left-[16%] bottom-[16%] px-3 py-1 rounded-full bg-black/90 border border-gold-400/50 shadow-xl backdrop-blur-md pointer-events-none"
              style={{
                transform: `translateZ(${isHovered ? '46px' : '20px'})`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              <span className="text-[8px] font-mono text-gold-300 flex items-center gap-1">
                <span>✨ 1-Click Instant Stripe</span>
              </span>
            </div>
          </>
        )}

        {/* 6. SAAS SYSTEM DEVELOPER: Multi-Region Distributed Cloud Telemetry */}
        {skillId === 'saas-system-developer' && (
          <>
            <div
              className="absolute left-[20%] top-[15%] w-[60%] h-[55%] pointer-events-none overflow-hidden rounded-lg bg-[#060a12]/90 border border-cyan-400/30 shadow-xl"
              style={{
                transform: 'perspective(750px) rotateX(4deg)',
              }}
            >
              <div className="px-2.5 py-1 bg-[#091122] border-b border-cyan-500/30 flex items-center justify-between">
                <span className="text-[7px] font-mono text-cyan-300 font-bold">KUBERNETES // CLOUD SAAS</span>
                <span className="text-[6.5px] font-mono text-emerald-400">SYNCED</span>
              </div>
              <div className="p-2 space-y-1 font-mono text-[6.5px]">
                <div className="flex justify-between text-zinc-300">
                  <span>US-East (N. Virginia)</span>
                  <span className="text-emerald-400 font-bold">14ms • 100% OK</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>EU-Central (Frankfurt)</span>
                  <span className="text-emerald-400 font-bold">22ms • 100% OK</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>AP-South (Tokyo)</span>
                  <span className="text-emerald-400 font-bold">35ms • 100% OK</span>
                </div>
              </div>
            </div>

            <div
              className="absolute left-[16%] bottom-[16%] px-3 py-1.5 rounded-xl bg-dark-950/90 border border-cyan-400/50 shadow-xl pointer-events-none"
              style={{
                transform: `translateZ(${isHovered ? '48px' : '22px'})`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              <div className="text-[8px] font-mono text-cyan-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>Throughput: 84.6 MB/s</span>
              </div>
            </div>
          </>
        )}

        {/* 7. SOCIAL MEDIA MARKETER: 3D Viral Telemetry Radar */}
        {skillId === 'social-media-marketer' && (
          <>
            <div
              className="absolute left-[20%] top-[15%] w-[60%] h-[55%] pointer-events-none overflow-hidden rounded-lg bg-[#0a0712]/90 border border-fuchsia-500/30 shadow-xl"
              style={{
                transform: 'perspective(750px) rotateX(4deg)',
              }}
            >
              <div className="px-2.5 py-1 bg-[#140b22] border-b border-fuchsia-500/30 flex items-center justify-between">
                <span className="text-[7px] font-mono text-fuchsia-300 font-bold">GROWTH TELEMETRY // VIRAL</span>
                <span className="text-[6.5px] font-mono text-emerald-400">TRENDING #1</span>
              </div>
              <div className="p-2 h-full flex flex-col justify-between">
                <div>
                  <span className="text-[6.5px] font-mono text-zinc-400">Total Campaign Reach</span>
                  <div className="text-[11px] font-heading font-extrabold text-white flex items-baseline gap-1">
                    <span>2.8M</span>
                    <span className="text-[7.5px] font-mono text-emerald-400 font-bold">(+95% Viral)</span>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-fuchsia-500 to-emerald-400 rounded-full w-[92%]" />
                </div>
              </div>
            </div>

            <div
              className="absolute right-[14%] top-[14%] px-3 py-1.5 rounded-full bg-dark-950/95 border border-emerald-400/60 shadow-xl pointer-events-none"
              style={{
                transform: `translateZ(${isHovered ? '50px' : '22px'})`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              <div className="text-[8.5px] font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>2.8M Engagements (+95%)</span>
              </div>
            </div>
          </>
        )}

        {/* 8. AI VIDEO EDITOR: Multi-Track NLE Timeline with Scrubbing Laser */}
        {skillId === 'ai-video-editor' && (
          <>
            <div
              className="absolute left-[18%] top-[14%] w-[64%] h-[56%] pointer-events-none overflow-hidden rounded-lg bg-[#060a12]/95 border border-cyan-400/40 shadow-xl"
              style={{
                transform: 'perspective(750px) rotateX(4deg)',
              }}
            >
              <div className="px-2.5 py-1 bg-[#0b1422] border-b border-cyan-500/30 flex items-center justify-between">
                <span className="text-[7px] font-mono text-cyan-300 font-bold">NEURAL TIMELINE // 4K PRORES</span>
                <span className="text-[6.5px] font-mono text-gold-400">60 FPS</span>
              </div>
              <div className="p-2 space-y-1 relative">
                {/* Moving playhead laser */}
                <div
                  className="absolute top-0 bottom-0 w-[2px] bg-cyan-400 shadow-[0_0_10px_#38bdf8]"
                  style={{
                    left: `${20 + (tick % 60)}%`,
                    transition: 'left 0.04s linear',
                  }}
                />
                <div className="h-3 w-full rounded bg-cyan-950/50 border border-cyan-500/20 flex items-center px-1">
                  <span className="text-[6px] font-mono text-cyan-300">V1: Main Cinematic Plate</span>
                </div>
                <div className="h-3 w-full rounded bg-purple-950/50 border border-purple-500/20 flex items-center px-1">
                  <span className="text-[6px] font-mono text-purple-300">V2: AI VFX Neural Layer</span>
                </div>
                <div className="h-2.5 w-full rounded bg-emerald-950/50 border border-emerald-500/20 flex items-center px-1">
                  <span className="text-[6px] font-mono text-emerald-300">A1: Master Spatial Audio</span>
                </div>
              </div>
            </div>

            <div
              className="absolute right-[14%] bottom-[16%] px-3 py-1 rounded-xl bg-cyan-950/95 border border-cyan-400/50 shadow-xl pointer-events-none"
              style={{
                transform: `translateZ(${isHovered ? '48px' : '22px'})`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              <span className="text-[8px] font-mono text-cyan-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                AI 4K Render: 98%
              </span>
            </div>
          </>
        )}

        {/* 3D Glass Vignette Frame with Beveled Edges */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-transparent to-black/30 pointer-events-none"
          style={{ transform: 'translateZ(5px)' }}
        />
        <div 
          className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none"
          style={{ transform: 'translateZ(15px)' }}
        />
      </div>
    </div>
  );
};
