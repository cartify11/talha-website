import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Code2, ExternalLink, Sparkles } from 'lucide-react';
import { ProjectItem } from '../data/projectsData';
import { projectsService } from '../services/projectsService';
import { CinematicProjectModal } from './CinematicProjectModal';
import { AnimatedReveal } from './AnimatedReveal';

export const ProjectsPreview: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('All');
  const navigate = useNavigate();

  useEffect(() => {
    projectsService.getPublishedProjects().then((list) => {
      setProjects(list || []);
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  const filterTabs = ['All', 'AI Solutions', 'Web Apps', 'Mobile Apps', 'Enterprise'];

  // Take the first 4 projects for homepage preview
  const featured = projects.slice(0, 4);

  const filteredProjects = activeTab === 'All'
    ? featured
    : featured.filter((p) => p.category === activeTab);

  return (
    <section id="projects" className="relative pt-10 pb-20 sm:pt-14 sm:pb-28 bg-dark-900/60 border-t border-white/[0.05]">
      
      {/* Ambient background lighting */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-gold-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Reveal */}
        <AnimatedReveal direction="up" delay={50}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
            <div className="space-y-3">
              <div className="inline-flex items-center">
                <span className="text-xs font-semibold tracking-[0.25em] uppercase text-gold-400">
                  FEATURED WORK
                </span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                Selected Projects Showcase
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 max-w-xl font-normal leading-relaxed pt-1">
                Here are some of my recent production systems and client applications. Each solution represents robust engineering and tailored digital craft.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 bg-dark-950/80 p-1.5 rounded-full border border-white/[0.06] backdrop-blur-md self-start lg:self-end">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-white text-dark-950 font-semibold shadow-md'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </AnimatedReveal>

        {/* 2x2 Showcase Projects Grid or Empty State */}
        {filteredProjects.length === 0 ? (
          <div className="py-16 text-center rounded-2xl border border-white/[0.06] bg-dark-950/60 p-8 my-6">
            <p className="text-sm text-zinc-400 mb-3">No published projects are currently live on the portfolio.</p>
            <button
              onClick={() => {
                navigate('/admin/login');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-mono text-gold-400 hover:text-gold-300 underline"
            >
              Open Admin Portal to add and publish projects →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <AnimatedReveal key={project.id} direction="up" delay={index * 120} distance={28}>
                <div
                  className="group rounded-2xl overflow-hidden bg-gradient-to-b from-dark-850/80 to-dark-950 border border-white/[0.07] hover:border-gold-500/40 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.9),0_0_25px_rgba(198,164,119,0.18)] flex flex-col h-full"
                >
                {/* Project Visual / Dark Presentation Surface */}
                <div 
                  onClick={() => setSelectedProject(project)}
                  className="relative aspect-[16/10] bg-dark-950/90 overflow-hidden flex items-center justify-center p-6 border-b border-white/[0.05] group-hover:bg-dark-900/40 transition-colors cursor-pointer"
                  title="Click to launch Cinematic Project Showcase"
                >
                
                {/* Subtle Grid Pattern */}
                <div 
                  className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #C6A477 1px, transparent 0)`,
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Real Preview Image or Device Mockup Card */}
                {project.previewImage ? (
                  <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/[0.1] shadow-2xl group-hover:scale-[1.02] transition-transform duration-500">
                    <img
                      src={project.previewImage}
                      alt={project.name || project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent pointer-events-none" />
                  </div>
                ) : (
                  <div className="relative w-full h-full rounded-xl bg-dark-900/95 border border-white/[0.1] shadow-2xl p-4 flex flex-col justify-between overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                    
                    {/* Mockup Window Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                      </div>
                      <div className="px-3 py-0.5 rounded-md bg-dark-950 text-[10px] font-mono text-zinc-500 border border-white/[0.05]">
                        {project.slug}.talha.dev
                      </div>
                      <span className="w-3" />
                    </div>

                    {/* Mockup Dynamic Content Wireframe */}
                    <div className="py-4 flex-1 flex flex-col justify-center gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gold-500/15 border border-gold-400/30 flex items-center justify-center">
                          <Code2 className="w-4 h-4 text-gold-300" />
                        </div>
                        <div>
                          <div className="h-3 w-32 bg-white/20 rounded" />
                          <div className="h-2 w-20 bg-white/10 rounded mt-1.5" />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <div className="h-16 rounded-lg bg-dark-800/80 border border-white/[0.04] p-2 flex flex-col justify-between">
                          <div className="h-1.5 w-10 bg-gold-400/40 rounded" />
                          <div className="h-3 w-14 bg-white/20 rounded" />
                        </div>
                        <div className="h-16 rounded-lg bg-dark-800/80 border border-white/[0.04] p-2 flex flex-col justify-between">
                          <div className="h-1.5 w-8 bg-zinc-500/40 rounded" />
                          <div className="h-3 w-12 bg-white/20 rounded" />
                        </div>
                        <div className="h-16 rounded-lg bg-dark-800/80 border border-white/[0.04] p-2 flex flex-col justify-between">
                          <div className="h-1.5 w-12 bg-emerald-400/40 rounded" />
                          <div className="h-3 w-10 bg-white/20 rounded" />
                        </div>
                      </div>
                    </div>

                    {/* Mockup Footer */}
                    <div className="pt-2 border-t border-white/[0.05] flex items-center justify-between text-[10px] text-zinc-500">
                      <span>Type: {project.type}</span>
                      <span className="text-gold-400/80 font-mono">
                        {project.status === 'live' ? 'LIVE' : 'LINK REQUIRED'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Corner Category Tag */}
                <div className="absolute top-4 right-4 z-20">
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-dark-950/90 text-gold-300 border border-gold-500/30 backdrop-blur-md shadow-lg">
                    {project.tag}
                  </span>
                </div>
              </div>

              {/* Project Information */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-5">
                <div>
                  <h3 
                    onClick={() => setSelectedProject(project)}
                    className="font-heading text-xl font-bold text-white group-hover:text-gold-200 transition-colors cursor-pointer"
                    title="Click to launch Cinematic Project Showcase"
                  >
                    {project.title}
                  </h3>
                  <p className="text-sm text-zinc-400 mt-2.5 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[11px] font-mono text-zinc-300 bg-dark-800/90 rounded-md border border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Link Row */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 border border-gold-500/30 text-xs font-semibold transition-colors"
                    >
                      <span>{project.accessLabel || 'Open Live Website ↗'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/70 text-zinc-400 border border-white/[0.08] text-[11px] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
                      <span>Link Required</span>
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-300 hover:text-white transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                    <span>Cinematic View</span>
                  </button>
                </div>

              </div>
            </div>
          </AnimatedReveal>
          ))}
        </div>
        )}

        {/* View All Projects Button */}
        <AnimatedReveal direction="up" delay={250}>
          <div className="mt-12 text-center">
            <button
              onClick={() => {
                navigate('/projects');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-dark-850 hover:bg-dark-800 border border-white/[0.1] hover:border-gold-500/40 text-xs font-semibold text-white transition-all shadow-md shimmer-button hover:scale-105 active:scale-95 group"
            >
              <span>Explore All Projects Archive</span>
              <ArrowRight className="w-4 h-4 text-gold-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </AnimatedReveal>

      </div>

      {/* Cinematic Project Modal */}
      <CinematicProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onViewCaseStudy={(slug) => {
          setSelectedProject(null);
          navigate(`/projects/${slug}`);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </section>
  );
};
