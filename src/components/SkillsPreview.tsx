import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, 
  Globe, 
  Smartphone, 
  Layers, 
  Puzzle, 
  ShoppingBag, 
  ArrowRight, 
  ArrowUpRight,
  Cloud,
  Megaphone,
  Video
} from 'lucide-react';
import { Skill3DVisual } from './Skill3DVisual';
import { AnimatedReveal } from './AnimatedReveal';

const titleToSkillId: { [key: string]: string } = {
  'AI Software': 'ai-software-developer',
  'AI Software Development': 'ai-software-developer',
  'AI Software Developer': 'ai-software-developer',
  'AI & WordPress Web': 'ai-web-developer',
  'AI & WordPress Web Development': 'ai-web-developer',
  'AI & WordPress Web Developer': 'ai-web-developer',
  'Mobile App': 'mobile-app-developer',
  'Mobile App Development': 'mobile-app-developer',
  'Mobile App Developer': 'mobile-app-developer',
  'Management System': 'management-system-developer',
  'Management System Development': 'management-system-developer',
  'Management System Developer': 'management-system-developer',
  'Browser Extension & Plugin': 'browser-extension-plugin-developer',
  'Browser Extension & Plugin Development': 'browser-extension-plugin-developer',
  'Browser Extension & Plugin Developer': 'browser-extension-plugin-developer',
  'E-commerce & Store': 'ecommerce-store-developer',
  'E-commerce & Store Development': 'ecommerce-store-developer',
  'E-commerce & Store Developer': 'ecommerce-store-developer',
  'SaaS System': 'saas-system-developer',
  'SaaS System Development': 'saas-system-developer',
  'SaaS System Developer': 'saas-system-developer',
  'Social Media Marketing': 'social-media-marketer',
  'Social Media Marketer': 'social-media-marketer',
  'AI Video Editing': 'ai-video-editor',
  'AI Video Editor': 'ai-video-editor',
};

interface SkillCard {
  title: string;
  category: string;
  description: string;
  icon: React.ElementType;
}

// Interactive 3D Perspective Card with Multi-layer Parallax Depth
const PreviewSkill3DCard: React.FC<{
  item: SkillCard;
  isSpecialAI: boolean;
  onClick: () => void;
}> = ({ item, isSpecialAI, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glowX: 50, glowY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -11;
    const rotateY = ((x - centerX) / centerX) * 11;
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;

    setTilt({ x: rotateX, y: rotateY, glowX, glowY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, glowX: 50, glowY: 50 });
  };

  return (
    <div
      style={{ perspective: '1100px' }}
      className="w-full h-full cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div
        ref={cardRef}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${isHovered ? 1.028 : 1}, ${isHovered ? 1.028 : 1}, 1)`,
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'transform 0.12s cubic-bezier(0.2, 0, 0, 1)' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: isHovered
            ? `${-tilt.y * 3}px ${tilt.x * 3 + 28}px 55px rgba(0, 0, 0, 0.95), 0 0 35px rgba(198, 164, 119, ${isSpecialAI ? '0.38' : '0.24'})`
            : '0 16px 38px rgba(0, 0, 0, 0.8), 0 0 20px rgba(198, 164, 119, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.09)',
        }}
        className={`group relative rounded-3xl p-7 bg-gradient-to-b from-[#161822]/95 via-[#0e1017]/95 to-[#06070a] border ${
          isSpecialAI
            ? isHovered
              ? 'border-gold-400'
              : 'border-gold-500/50 shadow-[0_0_25px_rgba(198,164,119,0.25)]'
            : isHovered
              ? 'border-gold-400/80'
              : 'border-gold-500/20'
        } flex flex-col justify-between overflow-hidden h-full`}
      >
        {/* Dynamic Specular Light Glare Sheen */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none opacity-45 transition-opacity duration-300 rounded-3xl"
            style={{
              transform: 'translateZ(1px)',
              background: `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(255, 255, 255, 0.22) 0%, rgba(198, 164, 119, 0.25) 28%, transparent 65%)`,
            }}
          />
        )}

        <div>
          {/* Top: 3D Visual Box with Elevated Z-space */}
          <div 
            className="relative mb-6 rounded-2xl overflow-hidden"
            style={{
              transform: `translateZ(${isHovered ? '32px' : '0px'})`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
              boxShadow: isHovered 
                ? '0 20px 40px -10px rgba(0,0,0,0.9), 0 0 25px rgba(198,164,119,0.2)' 
                : '0 10px 25px rgba(0,0,0,0.6)',
            }}
          >
            <Skill3DVisual 
              skillId={titleToSkillId[item.title] || 'ai-software-developer'} 
              className="w-full h-52 sm:h-60" 
            />
            {/* 3D Floating Category Badge */}
            <div 
              className="absolute top-3 left-3 z-20 pointer-events-none"
              style={{
                transform: `translateZ(${isHovered ? '48px' : '0px'})`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              <span className="text-[10px] font-bold tracking-widest uppercase text-gold-300 bg-black/90 border border-gold-400/60 px-3 py-1 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.9)] backdrop-blur-md flex items-center gap-1.5 ring-1 ring-gold-400/20">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                {item.category}
              </span>
            </div>
          </div>

          {/* Title with 3D Elevation */}
          <div 
            style={{
              transform: `translateZ(${isHovered ? '24px' : '0px'})`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            <h3 className={`font-heading text-xl font-bold transition-colors mb-2.5 ${
              isSpecialAI ? 'text-white group-hover:text-gold-300' : 'text-white group-hover:text-gold-200'
            }`}>
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
              {item.description}
            </p>
          </div>
        </div>

        {/* Bottom link with 3D Elevation */}
        <div 
          className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between"
          style={{
            transform: `translateZ(${isHovered ? '28px' : '0px'})`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          <span className={`text-xs font-semibold transition-colors flex items-center gap-1.5 ${
            isSpecialAI ? 'text-gold-300 group-hover:text-gold-200' : 'text-zinc-400 group-hover:text-gold-300'
          }`}>
            <span>Explore Skills Details</span>
          </span>
          <div className="w-8 h-8 rounded-full bg-white/[0.03] group-hover:bg-gold-500/20 border border-white/[0.08] group-hover:border-gold-500/50 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-gold-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const SkillsPreview: React.FC = () => {
  const navigate = useNavigate();

  const capabilities: SkillCard[] = [
    {
      title: 'AI Software Development',
      category: 'Intelligent Systems',
      description: 'AI software and intelligent application development.',
      icon: Bot,
    },
    {
      title: 'AI & WordPress Web Development',
      category: 'Web Platforms',
      description: 'AI-powered websites, WordPress solutions, and modern web applications.',
      icon: Globe,
    },
    {
      title: 'Mobile App Development',
      category: 'iOS & Android',
      description: 'Mobile application development.',
      icon: Smartphone,
    },
    {
      title: 'Management System Development',
      category: 'Enterprise Applications',
      description: 'Custom management systems and administrative applications.',
      icon: Layers,
    },
    {
      title: 'Browser Extension & Plugin Development',
      category: 'Extensions & Tools',
      description: 'Browser extensions, custom plugins, and integrations.',
      icon: Puzzle,
    },
    {
      title: 'E-commerce & Store Development',
      category: 'Online Commerce',
      description: 'Online stores and e-commerce website development.',
      icon: ShoppingBag,
    },
    {
      title: 'SaaS System Development',
      category: 'Cloud SaaS',
      description: 'Multi-tenant SaaS architectures, subscription systems, and cloud platforms.',
      icon: Cloud,
    },
    {
      title: 'Social Media Marketing',
      category: 'Digital Marketing',
      description: 'Data-driven social media growth, campaign strategies, and audience reach.',
      icon: Megaphone,
    },
    {
      title: 'AI Video Editing',
      category: 'Creative Media',
      description: 'AI-assisted video editing, cinematic visual storytelling, and content creation.',
      icon: Video,
    },
  ];

  return (
    <section id="skills" className="relative pt-20 pb-10 sm:pt-28 sm:pb-12 bg-dark-950 overflow-hidden">
      {/* 3D Perspective Depth Horizon Grid Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div 
          className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[160%] h-[750px]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(198, 164, 119, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(198, 164, 119, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: '54px 54px',
            transform: 'perspective(600px) rotateX(62deg)',
            transformOrigin: 'top center',
            maskImage: 'radial-gradient(ellipse 70% 50% at 50% 30%, black 20%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 30%, black 20%, transparent 80%)'
          }}
        />
      </div>

      {/* Volumetric Ambient Glow Orbs */}
      <div className="absolute top-1/3 left-[-10%] w-[500px] h-[500px] bg-gold-500/10 blur-[150px] rounded-full pointer-events-none animate-pulse-aura" />
      <div className="absolute bottom-10 right-[-10%] w-[450px] h-[450px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none animate-float-drift" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Scroll Reveal */}
        <AnimatedReveal direction="up" delay={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center">
                <span className="text-xs font-semibold tracking-[0.25em] uppercase text-gold-400">
                  CORE CAPABILITIES
                </span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                Talha's Professional Skills
              </h2>
            </div>
            <p className="text-sm sm:text-base text-zinc-400 max-w-md font-normal leading-relaxed">
              Delivering robust engineering across AI systems, intelligent web applications, mobile platforms, management software, extensions, and e-commerce stores.
            </p>
          </div>
        </AnimatedReveal>

        {/* 3D Interactive Capabilities Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {capabilities.map((item, index) => {
            const isSpecialAI = item.title === 'AI Software' || item.title === 'AI Software Development' || item.title === 'AI Software Developer';

            return (
              <AnimatedReveal key={index} direction="up" delay={index * 75} distance={24}>
                <PreviewSkill3DCard
                  item={item}
                  isSpecialAI={isSpecialAI}
                  onClick={() => {
                    navigate('/skills');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </AnimatedReveal>
            );
          })}
        </div>

        {/* View All Skills Link */}
        <AnimatedReveal direction="up" delay={300}>
          <div className="mt-12 text-center">
            <button
              onClick={() => {
                navigate('/skills');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-dark-900/90 hover:bg-dark-850 border border-gold-500/30 hover:border-gold-400 text-xs font-semibold text-white transition-all shadow-[0_10px_25px_rgba(0,0,0,0.8),0_0_20px_rgba(198,164,119,0.15)] shimmer-button hover:scale-105 active:scale-95 group"
            >
              <span>View Complete Skills Page</span>
              <ArrowRight className="w-4 h-4 text-gold-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </AnimatedReveal>

      </div>
    </section>
  );
};
