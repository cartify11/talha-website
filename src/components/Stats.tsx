import React, { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface StatItem {
  value: string;
  label: string;
}

interface StatsProps {
  stats?: StatItem[];
}

const AnimatedStatValue: React.FC<{ value: string; isVisible: boolean }> = ({ value, isVisible }) => {
  const [displayValue, setDisplayValue] = useState<number>(0);

  const match = value.match(/(\d+)(.*)/);
  const targetNumber = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : '';

  useEffect(() => {
    if (!isVisible || targetNumber === 0) return;

    let startTime: number | null = null;
    const duration = 1400; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayValue(Math.floor(easeProgress * targetNumber));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(targetNumber);
      }
    };

    const animFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrame);
  }, [isVisible, targetNumber]);

  return (
    <span className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-gold-200 to-amber-300 transition-colors drop-shadow-[0_0_20px_rgba(245,158,11,0.35)]">
      {isVisible ? displayValue : 0}{suffix}
    </span>
  );
};

export const Stats: React.FC<StatsProps> = ({
  stats = [
    { value: '2+', label: 'Years Experience' },
    { value: '20+', label: 'Projects Completed' },
    { value: '20+', label: 'Happy Clients' },
  ],
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section 
      ref={ref}
      className="relative z-20 border-y border-white/10 bg-[#0A0E17]/85 backdrop-blur-md overflow-hidden"
    >
      {/* Subtle ambient light pulse */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/10 to-transparent pointer-events-none animate-pulse-aura" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-9 relative z-10">
        <div className="flex items-center justify-center">
          
          {/* Stats Metrics Grid */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-12 md:gap-20 w-full max-w-4xl justify-items-center">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center relative group w-full transition-all duration-700"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <div className="flex items-baseline gap-1">
                  <AnimatedStatValue value={stat.value} isVisible={isVisible} />
                </div>
                <span className="text-[11px] sm:text-sm text-zinc-200 font-semibold mt-1 sm:mt-1.5 transition-colors group-hover:text-white leading-tight">
                  {stat.label}
                </span>

                {/* Vertical Divider (between items) */}
                {index < stats.length - 1 && (
                  <div className="hidden sm:block absolute -right-4 sm:-right-8 md:-right-12 top-1/2 -translate-y-1/2 w-[1px] h-10 bg-white/10" />
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
