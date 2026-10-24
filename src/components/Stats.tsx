import React from 'react';

interface StatItem {
  value: string;
  label: string;
}

interface StatsProps {
  stats?: StatItem[];
}

export const Stats: React.FC<StatsProps> = ({
  stats = [
    { value: '2+', label: 'Years Experience' },
    { value: '20+', label: 'Projects Completed' },
    { value: '20+', label: 'Happy Clients' },
  ],
}) => {
  return (
    <section className="relative z-20 border-y border-white/[0.06] bg-black/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex items-center justify-center">
          
          {/* Stats Metrics Grid */}
          <div className="grid grid-cols-3 gap-8 sm:gap-16 md:gap-24 w-full max-w-4xl justify-items-center">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center relative group w-full"
              >
                <div className="flex items-baseline gap-1">
                  <span className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white group-hover:text-gold-300 transition-colors">
                    {stat.value}
                  </span>
                </div>
                <span className="text-xs sm:text-sm text-zinc-400 font-medium mt-1">
                  {stat.label}
                </span>

                {/* Vertical Divider (between items) */}
                {index < stats.length - 1 && (
                  <div className="hidden sm:block absolute -right-4 sm:-right-8 md:-right-12 top-1/2 -translate-y-1/2 w-[1px] h-10 bg-white/[0.08]" />
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
