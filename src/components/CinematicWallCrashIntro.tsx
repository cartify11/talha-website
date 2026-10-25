import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, FastForward, Sparkles, Play } from 'lucide-react';
import { introAudio } from '../utils/introAudio';

interface IntroProps {
  onComplete: () => void;
}

export const CinematicWallCrashIntro: React.FC<IntroProps> = ({ onComplete }) => {
  const [elapsed, setElapsed] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [shakeIntensity, setShakeIntensity] = useState<number>(0);
  const [showFlash, setShowFlash] = useState<boolean>(false);

  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const impactTriggeredRef = useRef<boolean>(false);
  const crackTriggeredRef = useRef<boolean>(false);

  // Keyboard shortcut: ESC to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Start sequence immediately on mount
  useEffect(() => {
    startTimeRef.current = performance.now();

    // Try starting ambient sound if permitted
    try {
      introAudio.init();
      introAudio.playRumble();
      setSoundEnabled(true);
    } catch (e) {
      // Autoplay waiting for user gesture
    }

    const updateFrame = (currentTime: number) => {
      if (!startTimeRef.current) return;
      const seconds = (currentTime - startTimeRef.current) / 1000;
      setElapsed(seconds);

      // Trigger 1: IMPACT at 2.5 seconds
      if (seconds >= 2.5 && !impactTriggeredRef.current) {
        impactTriggeredRef.current = true;
        introAudio.playImpact();
        setShakeIntensity(24);
        setShowFlash(true);
        setTimeout(() => setShowFlash(false), 140);
      }

      // Trigger 2: CRACKS SPREAD at 3.0 seconds
      if (seconds >= 3.0 && !crackTriggeredRef.current) {
        crackTriggeredRef.current = true;
        introAudio.playCrack();
      }

      // Decay screen shake
      if (seconds >= 2.5 && seconds <= 3.3) {
        const decay = Math.max(0, 1 - (seconds - 2.5) / 0.8);
        setShakeIntensity(24 * decay);
      } else if (seconds > 3.3) {
        setShakeIntensity(0);
      }

      // Complete at exactly 6.0 seconds
      if (seconds >= 6.0) {
        introAudio.stopAll();
        onComplete();
        return;
      }

      requestRef.current = requestAnimationFrame(updateFrame);
    };

    requestRef.current = requestAnimationFrame(updateFrame);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [onComplete]);

  const handleUserGestureSound = () => {
    introAudio.init();
    introAudio.setMuted(false);
    setIsMuted(false);
    setSoundEnabled(true);
    if (elapsed < 2.5) {
      introAudio.playRumble();
    } else if (elapsed >= 2.5 && elapsed < 3.0) {
      introAudio.playImpact();
    } else {
      introAudio.playCrack();
    }
  };

  const handleSkip = () => {
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    introAudio.stopAll();
    onComplete();
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    introAudio.setMuted(newMuted);
  };

  // Approach scale: 0.1 at 1.0s -> 1.0 at 2.5s
  let textScale = 0;
  let textBlur = 10;
  if (elapsed >= 1.0 && elapsed < 2.5) {
    const progress = (elapsed - 1.0) / 1.5;
    textScale = 0.12 + 0.88 * Math.pow(progress, 2.5);
    textBlur = Math.max(0, 14 * (1 - progress));
  } else if (elapsed >= 2.5) {
    textScale = 1.0;
    textBlur = 0;
  }

  // Crack animation progress: 0.0 at 3.0s -> 1.0 at 4.5s
  let crackProgress = 0;
  if (elapsed >= 3.0) {
    crackProgress = Math.min(1.0, (elapsed - 3.0) / 1.5);
  }

  // Final fade out between 5.5s and 6.0s
  const fadeOutOpacity = elapsed >= 5.5 ? Math.max(0, 1 - (elapsed - 5.5) / 0.5) : 1;

  // Screen shake translation
  const shakeX = shakeIntensity > 0 ? (Math.random() - 0.5) * shakeIntensity : 0;
  const shakeY = shakeIntensity > 0 ? (Math.random() - 0.5) * shakeIntensity : 0;

  return (
    <div
      onClick={handleUserGestureSound}
      className="fixed inset-0 z-[9999] bg-black overflow-hidden select-none pointer-events-auto cursor-pointer"
      style={{
        opacity: fadeOutOpacity,
        transition: 'opacity 0.5s ease-out',
        transform: `translate3d(${shakeX}px, ${shakeY}px, 0)`,
      }}
    >
      {/* 1. Realistic Dark Concrete Wall Texture */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundColor: '#0a0d10',
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(198, 164, 119, 0.16) 0%, rgba(5, 7, 9, 0.96) 75%),
            radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(0, 0, 0, 0.95) 0%, transparent 50%),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.25'/%3E%3C/svg%3E")
          `,
        }}
      />

      {/* 2. Flash Burst on Impact at 2.5s */}
      {showFlash && (
        <div className="absolute inset-0 z-30 bg-gold-200/50 pointer-events-none mix-blend-screen" />
      )}

      {/* 3. Detailed Branching Fractures SVG (spreading from 3.0s to 4.5s) */}
      {elapsed >= 2.5 && (
        <svg
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="crackGlow2" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#C6A477" floodOpacity="0.85" />
              <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#DFCAAE" floodOpacity="0.45" />
            </filter>
            <linearGradient id="crackGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DFCAAE" />
              <stop offset="50%" stopColor="#C6A477" />
              <stop offset="100%" stopColor="#8A6B41" />
            </linearGradient>
          </defs>

          {/* Fractures radiating from Impact Center (500, 500) */}
          <g filter="url(#crackGlow2)" stroke="url(#crackGradient2)" strokeLinecap="round">
            {/* Fracture Top-Left */}
            <path
              d="M500 500 L440 430 L400 410 L330 340 L300 290 L220 220 L160 190 L90 120"
              strokeWidth="5"
              fill="none"
              strokeDasharray="800"
              strokeDashoffset={800 * (1 - crackProgress)}
            />
            <path
              d="M400 410 L420 350 L380 290 L390 230"
              strokeWidth="3"
              fill="none"
              strokeDasharray="400"
              strokeDashoffset={400 * (1 - Math.max(0, (crackProgress - 0.2) / 0.8))}
            />
            <path
              d="M300 290 L240 310 L190 280"
              strokeWidth="2.5"
              fill="none"
              strokeDasharray="300"
              strokeDashoffset={300 * (1 - Math.max(0, (crackProgress - 0.4) / 0.6))}
            />

            {/* Fracture Top-Right */}
            <path
              d="M500 500 L560 440 L630 400 L680 330 L760 270 L830 200 L910 140"
              strokeWidth="5"
              fill="none"
              strokeDasharray="800"
              strokeDashoffset={800 * (1 - crackProgress)}
            />
            <path
              d="M630 400 L690 410 L750 380 L820 390"
              strokeWidth="3"
              fill="none"
              strokeDasharray="400"
              strokeDashoffset={400 * (1 - Math.max(0, (crackProgress - 0.25) / 0.75))}
            />

            {/* Fracture Bottom-Left */}
            <path
              d="M500 500 L450 560 L410 630 L340 710 L270 790 L210 870 L140 940"
              strokeWidth="5"
              fill="none"
              strokeDasharray="800"
              strokeDashoffset={800 * (1 - crackProgress)}
            />
            <path
              d="M410 630 L350 640 L310 700 L260 720"
              strokeWidth="2.5"
              fill="none"
              strokeDasharray="350"
              strokeDashoffset={350 * (1 - Math.max(0, (crackProgress - 0.3) / 0.7))}
            />

            {/* Fracture Bottom-Right */}
            <path
              d="M500 500 L570 570 L640 620 L720 700 L790 770 L870 850 L950 920"
              strokeWidth="5.5"
              fill="none"
              strokeDasharray="800"
              strokeDashoffset={800 * (1 - crackProgress)}
            />
            <path
              d="M640 620 L650 690 L710 740 L730 810"
              strokeWidth="3"
              fill="none"
              strokeDasharray="400"
              strokeDashoffset={400 * (1 - Math.max(0, (crackProgress - 0.35) / 0.65))}
            />

            {/* Horizontal & Vertical Spidering Veins */}
            <path
              d="M500 500 L380 500 L260 480 L150 510 L40 490"
              strokeWidth="3.5"
              fill="none"
              strokeDasharray="600"
              strokeDashoffset={600 * (1 - crackProgress)}
            />
            <path
              d="M500 500 L620 510 L750 490 L870 520 L960 500"
              strokeWidth="3.5"
              fill="none"
              strokeDasharray="600"
              strokeDashoffset={600 * (1 - crackProgress)}
            />
            <path
              d="M500 500 L510 380 L490 260 L520 140 L500 30"
              strokeWidth="4"
              fill="none"
              strokeDasharray="600"
              strokeDashoffset={600 * (1 - crackProgress)}
            />
            <path
              d="M500 500 L490 620 L510 750 L480 870 L500 970"
              strokeWidth="4"
              fill="none"
              strokeDasharray="600"
              strokeDashoffset={600 * (1 - crackProgress)}
            />

            {/* Impact Center Crater Ring */}
            <circle
              cx="500"
              cy="500"
              r="45"
              stroke="#DFCAAE"
              strokeWidth="4"
              fill="none"
              strokeDasharray="280"
              strokeDashoffset={280 * (1 - Math.min(1, crackProgress * 2))}
            />
            <circle
              cx="500"
              cy="500"
              r="85"
              stroke="#C6A477"
              strokeWidth="2.5"
              fill="none"
              strokeDasharray="540"
              strokeDashoffset={540 * (1 - crackProgress)}
            />
          </g>
        </svg>
      )}

      {/* 4. Concrete Dust & Falling Stone Particles */}
      {elapsed >= 2.5 && elapsed <= 5.2 && (
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          {Array.from({ length: 32 }).map((_, i) => {
            const angle = (i / 32) * 360;
            const distance = 80 + (i * 19) % 350;
            const rad = (angle * Math.PI) / 180;
            const px = Math.cos(rad) * distance;
            const py = Math.sin(rad) * distance + (elapsed - 2.5) * 85;
            const size = 3 + (i % 7);
            return (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 rounded-full bg-gold-300 shadow-[0_0_10px_rgba(198,164,119,0.9)]"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  transform: `translate(${px}px, ${py}px)`,
                  opacity: Math.max(0, 1 - (elapsed - 2.5) / 2.4),
                  transition: 'transform 0.05s linear',
                }}
              />
            );
          })}
        </div>
      )}

      {/* 5. 3D Typography: "WELCOME TO TALHA PORTFOLIO" */}
      {elapsed >= 1.0 && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 text-center">
          <div
            style={{
              transform: `scale(${textScale}) translateZ(0)`,
              filter: textBlur > 0 ? `blur(${textBlur}px)` : 'none',
              transformOrigin: 'center center',
            }}
            className="flex flex-col items-center"
          >
            {/* Top Monogram Mark */}
            <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full border-2 border-gold-400 bg-dark-900/90 flex items-center justify-center mb-4 sm:mb-6 shadow-[0_0_35px_rgba(198,164,119,0.6)]">
              <span className="font-heading font-extrabold text-2xl sm:text-3xl text-gold-300">
                T
              </span>
            </div>

            {/* Exact Text: WELCOME TO TALHA PORTFOLIO */}
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-none drop-shadow-[0_12px_40px_rgba(0,0,0,0.95)]">
              WELCOME TO{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-gold-300">
                TALHA
              </span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500">
                PORTFOLIO
              </span>
            </h1>

            {/* Subtitle tag appearing after impact */}
            {elapsed >= 3.0 && (
              <div className="mt-4 sm:mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-950/80 border border-gold-500/40 text-gold-300 text-xs sm:text-sm font-semibold tracking-widest uppercase shadow-[0_0_25px_rgba(198,164,119,0.35)] animate-fadeIn">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>AI ENGINEER & SOFTWARE DEVELOPMENT</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Sound Hint if browser requires user gesture */}
      {!soundEnabled && elapsed < 2.5 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 text-xs font-semibold flex items-center gap-2 backdrop-blur-md animate-pulse">
          <Volume2 className="w-4 h-4 text-gold-400" />
          <span>Click anywhere to enable synchronized crash sound</span>
        </div>
      )}

      {/* 6. Floating Controls (Skip & Mute) */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
        <button
          onClick={toggleMute}
          className="p-2.5 rounded-full bg-dark-900/90 hover:bg-dark-850 border border-white/[0.15] text-zinc-300 hover:text-white transition-colors shadow-lg"
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-gold-400" />}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-dark-900/90 hover:bg-dark-850 border border-white/[0.15] hover:border-gold-500/50 text-xs font-semibold text-zinc-200 hover:text-white transition-all shadow-lg"
          title="Skip intro animation (ESC)"
        >
          <span>Skip Intro</span>
          <FastForward className="w-3.5 h-3.5 text-gold-400" />
        </button>
      </div>

      {/* 7. Bottom Progress Indicator (0.0s to 6.0s) */}
      <div className="absolute bottom-0 inset-x-0 h-1.5 bg-white/[0.08] z-50">
        <div
          className="h-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-200"
          style={{ width: `${Math.min(100, (elapsed / 6.0) * 100)}%` }}
        />
      </div>

    </div>
  );
};
