import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, 
  Globe, 
  Smartphone, 
  Layers, 
  Puzzle, 
  ShoppingBag, 
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Cloud,
  Megaphone,
  Video
} from 'lucide-react';
import { Live3DDevLogo } from '../components/Live3DDevLogo';
import { Skill3DVisual } from '../components/Skill3DVisual';
import { RealEmailBox } from '../components/RealEmailBox';

interface SkillCategory {
  id: string;
  number: string;
  title: string;
  roleSubtitle: string;
  description: string;
  scopePoints: string[];
  icon: React.ElementType;
}

// 3D Tilt Card Component for Luxury Black & Gold Depth Effect
const Skill3DCard: React.FC<{ skill: SkillCategory; index: number }> = ({ skill, index }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0, glowX: 50, glowY: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = skill.icon;
  const navigate = useNavigate();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Dynamic 3D tilt angles
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;

    setTilt({ x: rotateX, y: rotateY, glowX, glowY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, glowX: 50, glowY: 50 });
  };

  const isSpecialAI = skill.title === 'AI Software Developer';

  return (
    <div
      style={{ perspective: '1100px' }}
      className="w-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${isHovered ? 1.028 : 1}, ${isHovered ? 1.028 : 1}, 1)`,
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'transform 0.12s cubic-bezier(0.2, 0, 0, 1)' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: isHovered
            ? `${-tilt.y * 3}px ${tilt.x * 3 + 28}px 55px rgba(0, 0, 0, 0.95), 0 0 35px rgba(198, 164, 119, ${isSpecialAI ? '0.38' : '0.24'})`
            : '0 16px 38px rgba(0, 0, 0, 0.8), 0 0 20px rgba(198, 164, 119, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.09)',
        }}
        className={`relative h-full rounded-3xl p-8 sm:p-9 bg-gradient-to-b from-[#161822]/95 via-[#0e1017]/95 to-[#06070a] border ${
          isSpecialAI
            ? isHovered
              ? 'border-gold-400'
              : 'border-gold-500/50 shadow-[0_0_25px_rgba(198,164,119,0.25)]'
            : isHovered 
              ? 'border-gold-400/80' 
              : 'border-gold-500/20'
        } flex flex-col justify-between overflow-hidden group`}
      >
        {/* Dynamic Light Sheen Following Mouse */}
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
          {/* Top: Topic-Specific Photorealistic 3D Live Visual for Every Skill */}
          <div 
            className="relative mb-6 rounded-2xl overflow-hidden"
            style={{
              transform: `translateZ(${isHovered ? '32px' : '0px'})`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.3s ease-out',
            }}
          >
            <Skill3DVisual 
              skillId={skill.id} 
              className={isSpecialAI ? "w-full h-60 sm:h-72" : "w-full h-56 sm:h-64"} 
            />
            <div 
              className="absolute top-3 left-3 z-20 pointer-events-none"
              style={{
                transform: `translateZ(${isHovered ? '48px' : '0px'})`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              <span className="text-[10px] font-bold tracking-widest uppercase text-gold-300 bg-black/90 border border-gold-400/60 px-3 py-1.2 rounded-full shadow-lg backdrop-blur-md flex items-center gap-1.5 ring-1 ring-gold-400/20">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                {isSpecialAI ? 'Top Client Choice' : skill.roleSubtitle}
              </span>
            </div>
            <div 
              className="absolute top-3 right-3 z-20 pointer-events-none"
              style={{
                transform: `translateZ(${isHovered ? '48px' : '0px'})`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              <span className="font-heading font-extrabold text-xl text-gold-400 font-mono bg-black/90 border border-gold-400/40 px-3 py-0.5 rounded-xl backdrop-blur-md shadow-lg">
                {skill.number}
              </span>
            </div>
          </div>

          {/* Mandatory Skill Title with 3D Elevation */}
          <div 
            className="mb-4"
            style={{
              transform: `translateZ(${isHovered ? '24px' : '0px'})`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 block mb-1">
              {skill.roleSubtitle}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white group-hover:text-gold-200 transition-colors leading-tight">
              {skill.title}
            </h2>
          </div>

          {/* Mandatory Core Description */}
          <p 
            className="text-sm text-zinc-300 font-normal leading-relaxed mb-6"
            style={{
              transform: `translateZ(${isHovered ? '18px' : '0px'})`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            {skill.description}
          </p>

          {/* Distinct Scope Points */}
          <div 
            className="space-y-2.5 mb-8 bg-dark-950/80 p-4 rounded-2xl border border-white/[0.06]"
            style={{
              transform: `translateZ(${isHovered ? '20px' : '0px'})`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            {skill.scopePoints.map((point, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-400">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Link with 3D Elevation */}
        <div 
          className="pt-4 border-t border-white/[0.06] flex items-center justify-between"
          style={{
            transform: `translateZ(${isHovered ? '26px' : '0px'})`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          <button
            onClick={() => {
              navigate('/contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-gold-300 group-hover:text-white transition-colors"
          >
            <span>Inquire for Collaboration</span>
            <ArrowRight className="w-3.5 h-3.5 text-gold-400 group-hover:translate-x-1 transition-transform" />
          </button>
          <span className="text-[11px] font-mono text-zinc-500">
            Talha Verified Skill
          </span>
        </div>

      </div>
    </div>
  );
};

export const SkillsPage: React.FC = () => {
  const navigate = useNavigate();

  // The 6 Mandatory Skill Categories
  const skillsCategories: SkillCategory[] = [
    {
      id: 'ai-software-developer',
      number: '01',
      title: 'AI Software Developer',
      roleSubtitle: 'Specialized Expertise',
      description: 'AI software and intelligent application development.',
      scopePoints: [
        'Autonomous AI agents and decision-making logic',
        'Custom intelligent systems and knowledge processing algorithms',
        'Seamless integration of machine intelligence into software environments',
      ],
      icon: Bot,
    },
    {
      id: 'ai-web-developer',
      number: '02',
      title: 'AI & WordPress Web Developer',
      roleSubtitle: 'Specialized Expertise',
      description: 'AI-powered websites, WordPress solutions, and modern web applications.',
      scopePoints: [
        'Modern reactive web interfaces with real-time AI assistance',
        'Custom WordPress themes, plugins, and headless CMS integrations',
        'High-performance full-stack web platforms tailored for digital products',
      ],
      icon: Globe,
    },
    {
      id: 'mobile-app-developer',
      number: '03',
      title: 'Mobile App Developer',
      roleSubtitle: 'Specialized Expertise',
      description: 'Mobile application development.',
      scopePoints: [
        'Native and cross-platform mobile apps engineered for iOS and Android',
        'Touch-optimized digital experiences and intuitive user navigation',
        'Reliable offline data handling and device integration capabilities',
      ],
      icon: Smartphone,
    },
    {
      id: 'management-system-developer',
      number: '04',
      title: 'Management System Developer',
      roleSubtitle: 'Specialized Expertise',
      description: 'Custom management systems and administrative applications.',
      scopePoints: [
        'Custom enterprise management portals, CRMs, and ERP software',
        'Administrative control dashboards with role-based access management',
        'Automated business workflow systems that eliminate operational bottlenecks',
      ],
      icon: Layers,
    },
    {
      id: 'browser-extension-plugin-developer',
      number: '05',
      title: 'Browser Extension & Plugin Developer',
      roleSubtitle: 'Specialized Expertise',
      description: 'Browser extensions, custom plugins, and integrations.',
      scopePoints: [
        'Browser extensions tailored for Chrome and Edge productivity',
        'Custom modular plugins expanding functionality across third-party software',
        'Automated browser utilities and seamless workflow integration tools',
      ],
      icon: Puzzle,
    },
    {
      id: 'ecommerce-store-developer',
      number: '06',
      title: 'E-commerce & Store Developer',
      roleSubtitle: 'Specialized Expertise',
      description: 'Online stores and e-commerce website development.',
      scopePoints: [
        'High-converting online store architectures and catalog presentations',
        'Frictionless checkout experiences with secure payment handling',
        'Digital commerce portals built for brand growth and product sales',
      ],
      icon: ShoppingBag,
    },
    {
      id: 'saas-system-developer',
      number: '07',
      title: 'SaaS System Developer',
      roleSubtitle: 'Specialized Expertise',
      description: 'Multi-tenant SaaS architectures, subscription systems, and cloud platforms.',
      scopePoints: [
        'Multi-tenant database isolation and organizational workspace workflows',
        'Automated recurring billing, tier gating, and usage-based metering',
        'Scalable cloud infrastructure with automated CI/CD deployment pipelines',
      ],
      icon: Cloud,
    },
    {
      id: 'social-media-marketer',
      number: '08',
      title: 'Social Media Marketer',
      roleSubtitle: 'Specialized Expertise',
      description: 'Data-driven social media growth, campaign strategies, and audience reach.',
      scopePoints: [
        'Targeted digital marketing campaigns and organic engagement growth',
        'Content strategy, brand positioning, and social analytics telemetry',
        'Conversion funnel optimization to drive customer acquisitions',
      ],
      icon: Megaphone,
    },
    {
      id: 'ai-video-editor',
      number: '09',
      title: 'AI Video Editor',
      roleSubtitle: 'Specialized Expertise',
      description: 'AI-assisted video editing, cinematic visual storytelling, and content creation.',
      scopePoints: [
        'AI-accelerated timeline editing, smart cut detection, and speech enhancements',
        'Cinematic color grading, motion graphics, and high-impact visual pacing',
        'High-retention video content crafted for modern digital platforms',
      ],
      icon: Video,
    },
  ];

  return (
    <div className="pt-28 pb-24 min-h-screen bg-black text-neutral-100">
      
      {/* Background Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-24 left-1/3 w-[650px] h-[500px] bg-gold-500/5 blur-[160px] rounded-full" />
        <div className="absolute top-2/3 right-1/4 w-[500px] h-[400px] bg-gold-400/5 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-3">
            <span className="h-[1px] w-6 bg-gold-400" />
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-gold-400">
              CORE EXPERTISE
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Talha's Developer Skills
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            A focused breakdown of Talha's core professional skill categories in AI software, web engineering, mobile development, management systems, extensions, and e-commerce stores.
          </p>
        </div>

        {/* 6 Mandatory Skill Categories Grid (2 columns on tablet/desktop, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {skillsCategories.map((skill, index) => (
            <Skill3DCard key={skill.id} skill={skill} index={index} />
          ))}
        </div>
 
        {/* Direct Real Email Dispatch Box */}
        <RealEmailBox className="mb-16" />

        {/* Bottom Collaboration Call to Action Banner */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-dark-900/90 to-dark-950 border border-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>PROJECT READY</span>
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
              Looking for a Developer with These Skills?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
              Whether you need AI software, an intelligent web app, a mobile application, a management system, an extension, or an e-commerce store, Talha is available to build it.
            </p>
          </div>

          <button
            onClick={() => {
              navigate('/contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="shrink-0 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold text-xs tracking-wider uppercase transition-all shadow-[0_4px_25px_rgba(198,164,119,0.35)] hover:scale-[1.02]"
          >
            <span>Let's Discuss Your Project</span>
            <ArrowRight className="w-4 h-4 text-dark-950" />
          </button>
        </div>

      </div>
    </div>
  );
};
