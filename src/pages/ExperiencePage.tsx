import React from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Download, 
  ArrowRight,
  Calendar,
  Building,
  CheckCircle2
} from 'lucide-react';

interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  highlights: string[];
}

interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  badge: string;
}

export const ExperiencePage: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      period: '2023 – Present',
      role: 'Senior Full Stack & AI Software Engineer',
      company: 'Tech Solutions Studio & Independent Client Engineering',
      location: 'Remote / Global',
      description: 'Leading the technical design and implementation of enterprise full-stack web applications, vector-based AI retrieval systems, and multi-tenant SaaS platforms.',
      highlights: [
        'Architected RAG pipeline with hybrid search indexing delivering sub-50ms query responses.',
        'Engineered responsive Next.js frontends with 95+ Core Web Vitals performance benchmarks.',
        'Mentored developers in clean code practices, TypeScript type safety, and test-driven development.'
      ],
    },
    {
      period: '2021 – 2023',
      role: 'Full Stack Software Developer',
      company: 'Digital Product Agency & SaaS Lab',
      location: 'Hybrid',
      description: 'Collaborated with international product managers and UI/UX designers to construct responsive web applications, mobile companion apps, and RESTful microservices.',
      highlights: [
        'Developed real-time WebSocket state synchronizations for collaborative Kanban workflows.',
        'Designed normalized relational schemas in PostgreSQL and managed Redis caching layers.',
        'Automated CI/CD deployment pipelines using Docker containers and GitHub Actions.'
      ],
    },
    {
      period: '2020 – 2021',
      role: 'Software Development Associate',
      company: 'Software Innovation Hub',
      location: 'On-site',
      description: 'Worked on foundational full-stack web products, automated end-to-end testing suites, and API integration modules.',
      highlights: [
        'Implemented modern React component libraries and cross-browser responsive layouts.',
        'Authored comprehensive unit and integration tests achieving 85%+ code coverage.',
        'Assisted in data migration scripts for legacy client enterprise systems.'
      ],
    },
  ];

  const education = [
    {
      period: '2020 – 2024',
      degree: 'BS in Computer Science',
      institution: 'University Computer Science Department',
      details: 'Graduated with rigorous coursework in Algorithms, Data Structures, Distributed Computing, Artificial Intelligence, and Database Systems.',
    },
    {
      period: '2018 – 2020',
      degree: 'Higher Secondary Studies (FSc Pre-Engineering)',
      institution: 'Govt. Science College',
      details: 'Core mathematics, physics, and computer science foundations with distinction honors.',
    },
  ];

  const certifications: CertificationItem[] = [
    {
      title: 'Full Stack Web Engineering',
      issuer: 'Advanced Web Architecture Institute',
      year: '2024',
      badge: 'Certified Master',
    },
    {
      title: 'Generative AI & LLM Systems Design',
      issuer: 'Deep Learning & AI Specialization',
      year: '2023',
      badge: 'Specialist',
    },
    {
      title: 'Node.js Enterprise Microservices',
      issuer: 'Cloud Backend Guild',
      year: '2022',
      badge: 'Verified',
    },
    {
      title: 'Cloud Architecture & DevOps',
      issuer: 'Cloud Infrastructure Training',
      year: '2022',
      badge: 'Practitioner',
    },
  ];

  const handleDownloadCV = () => {
    const cvContent = `TALHA — AI ENGINEERING & SOFTWARE DEVELOPMENT
Email: m.talha204567@gmail.com | Location: Pakistan, City Swabi (Worldwide Remote)

PROFESSIONAL EXPERIENCE:
• Senior Full Stack & AI Software Engineer (2023 – Present)
  Architecting AI-powered web applications, RAG pipelines, and high-performance microservices.
• Full Stack Software Developer (2021 – 2023)
  Engineered scalable SaaS platforms, WebSocket sync modules, and robust database architectures.
• Software Development Associate (2020 – 2021)
  Built modern responsive frontends and automated CI/CD testing pipelines.

EDUCATION:
• BS in Computer Science (2020 – 2024)
• Higher Secondary Pre-Engineering (2018 – 2020)
`;
    const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Talha_AI_Software_Developer_CV.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-black text-neutral-100">
      
      {/* Background Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-24 left-1/3 w-[650px] h-[500px] bg-gold-500/5 blur-[160px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-3">
            <span className="h-[1px] w-6 bg-gold-400" />
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-gold-400">
              MY JOURNEY
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Experience & Education
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            A chronological timeline of my professional work experience, academic milestones, and engineering certifications.
          </p>
        </div>

        {/* 2-Column Main Layout (matching Screen 06 of reference image) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Work Experience Timeline & Education (8 cols) */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Work Experience Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-gold-400" />
                <h2 className="font-heading text-2xl font-bold text-white">
                  Work Experience
                </h2>
              </div>

              {/* Timeline Container */}
              <div className="relative border-l border-white/[0.08] ml-3 pl-6 sm:pl-8 space-y-10">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative group">
                    {/* Glowing Timeline Dot */}
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-dark-900 border-2 border-gold-400 shadow-[0_0_10px_rgba(198,164,119,0.5)] group-hover:scale-125 transition-transform" />

                    <div className="rounded-2xl p-6 sm:p-7 bg-gradient-to-b from-dark-900/80 to-dark-950 border border-white/[0.06] group-hover:border-gold-500/30 transition-all space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-mono font-bold text-gold-400 bg-gold-500/10 px-2.5 py-1 rounded-full border border-gold-500/20">
                          {exp.period}
                        </span>
                        <span className="text-xs text-zinc-500">
                          {exp.location}
                        </span>
                      </div>

                      <h3 className="font-heading text-xl font-bold text-white group-hover:text-gold-200 transition-colors">
                        {exp.role}
                      </h3>

                      <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
                        <Building className="w-3.5 h-3.5 text-gold-400/80" />
                        <span>{exp.company}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-1">
                        {exp.description}
                      </p>

                      <div className="pt-3 space-y-2 border-t border-white/[0.04]">
                        {exp.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                            <CheckCircle2 className="w-3.5 h-3.5 text-gold-400/70 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className="space-y-8 pt-6 border-t border-white/[0.06]">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-gold-400" />
                <h2 className="font-heading text-2xl font-bold text-white">
                  Academic Education
                </h2>
              </div>

              <div className="relative border-l border-white/[0.08] ml-3 pl-6 sm:pl-8 space-y-8">
                {education.map((edu, index) => (
                  <div key={index} className="relative group">
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-dark-900 border-2 border-zinc-500 group-hover:border-gold-400 transition-colors" />

                    <div className="rounded-2xl p-6 bg-dark-900/60 border border-white/[0.05] space-y-2">
                      <span className="text-xs font-mono font-medium text-zinc-400">
                        {edu.period}
                      </span>
                      <h3 className="font-heading text-lg font-bold text-white">
                        {edu.degree}
                      </h3>
                      <div className="text-xs text-gold-400 font-medium">
                        {edu.institution}
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                        {edu.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Certifications & Download CV Card (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Certifications Card */}
            <div className="rounded-2xl p-6 sm:p-7 bg-gradient-to-b from-dark-900/90 to-dark-950 border border-white/[0.07] space-y-6 shadow-xl">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.06]">
                <Award className="w-5 h-5 text-gold-400" />
                <h3 className="font-heading text-lg font-bold text-white">
                  Certifications & Badges
                </h3>
              </div>

              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-dark-950/80 border border-white/[0.04] space-y-1.5 hover:border-gold-500/30 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-gold-400 bg-dark-900 px-2 py-0.5 rounded border border-gold-500/20">
                        {cert.year}
                      </span>
                      <span className="text-[10px] font-semibold text-zinc-400">
                        {cert.badge}
                      </span>
                    </div>
                    <div className="font-heading text-sm font-bold text-white">
                      {cert.title}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {cert.issuer}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Download My CV Card (matching reference image) */}
            <div className="rounded-2xl p-7 bg-gradient-to-b from-dark-850 to-dark-950 border border-gold-500/30 shadow-2xl text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-400/30 flex items-center justify-center text-gold-400 mx-auto">
                <Download className="w-6 h-6" />
              </div>

              <h3 className="font-heading text-xl font-bold text-white">
                Download Talha's CV
              </h3>

              <p className="text-xs text-zinc-400 leading-relaxed">
                Get a comprehensive curriculum vitae with detailed project breakdowns, tech stacks, and career milestones.
              </p>

              <button
                onClick={handleDownloadCV}
                className="w-full py-3 px-5 rounded-full bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold text-xs tracking-wide transition-all shadow-[0_4px_15px_rgba(198,164,119,0.3)] flex items-center justify-center gap-2"
              >
                <span>Download CV (.txt / summary)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
