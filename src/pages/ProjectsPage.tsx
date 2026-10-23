import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Code2, Sparkles, Filter, ExternalLink, Loader2, Lock, Plus } from 'lucide-react';
import { ProjectItem } from '../data/projectsData';
import { projectsService } from '../services/projectsService';
import { CinematicProjectModal } from '../components/CinematicProjectModal';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('All');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const dynamicList = await projectsService.getPublishedProjects();
        setProjects(dynamicList || []);
      } catch (err) {
        console.warn('Failed to load dynamic projects:', err);
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filterTabs = ['All', 'AI Solutions', 'Web Apps', 'Mobile Apps', 'Enterprise', 'Extensions', 'E-Commerce', 'Other'];

  const filteredProjects = activeTab === 'All'
    ? projects
    : projects.filter((p) => p.category === activeTab);

  const getSafeHostname = (url: string | null, fallback: string): string => {
    if (!url) return fallback;
    try {
      return new URL(url).hostname;
    } catch {
      return fallback;
    }
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-black text-neutral-100">
      
      {/* Background Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-24 right-1/4 w-[600px] h-[500px] bg-gold-500/5 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-3">
              <span className="h-[1px] w-6 bg-gold-400" />
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-gold-400">
                PORTFOLIO ARCHIVE
              </span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Projects & Case Studies
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              A curated showcase of production applications, enterprise platforms, and intelligent digital systems. Click any project to inspect its architecture, engineering challenges, and technical specifications.
            </p>
          </div>

          <Link
            to="/admin/login"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-gold-500/15 border border-white/[0.08] hover:border-gold-500/40 text-xs font-mono text-zinc-300 hover:text-gold-300 transition-all self-start md:self-auto shadow-sm"
            title="Open Admin Login Portal"
          >
            <Lock className="w-3.5 h-3.5 text-gold-400" />
            <span>Admin Portal</span>
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12 bg-dark-950/80 p-2 rounded-2xl border border-white/[0.06] backdrop-blur-md w-fit">
          <div className="px-3 py-1 flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
            <Filter className="w-3.5 h-3.5 text-gold-400" />
            <span>Filter:</span>
          </div>
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-gold-500 text-dark-950 font-bold shadow-[0_0_15px_rgba(198,164,119,0.3)]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Loading / Empty State or Projects Grid */}
        {isLoading ? (
          <div className="py-24 text-center flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-gold-400 mb-4" />
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              Loading Projects...
            </span>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-20 text-center rounded-3xl border border-white/[0.06] bg-dark-900/40 p-8 sm:p-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-zinc-500">
              <Code2 className="w-8 h-8 text-gold-400/80" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Published Projects Found</h3>
            <p className="text-sm text-zinc-400 max-w-md mx-auto mb-6">
              You haven't published any projects yet, or all items in this category are unpublished.
            </p>
            <Link
              to="/admin/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(198,164,119,0.3)]"
            >
              <Plus className="w-4 h-4" />
              <span>Manage Projects in Admin</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl overflow-hidden bg-gradient-to-b from-dark-850/80 to-dark-950 border border-white/[0.07] hover:border-gold-500/40 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.9),0_0_20px_rgba(198,164,119,0.18)] flex flex-col"
            >
              {/* Presentation Surface Frame (Clickable) */}
              <div 
                onClick={() => setSelectedProject(project)}
                className="relative aspect-[16/10] bg-dark-950/90 overflow-hidden flex items-center justify-center p-5 border-b border-white/[0.05] group-hover:bg-dark-900/40 transition-colors cursor-pointer"
                title="Click to launch Cinematic Project Showcase"
              >
                {/* Subtle Grid Pattern */}
                <div 
                  className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #C6A477 1px, transparent 0)`,
                    backgroundSize: '20px 20px',
                  }}
                />

                {/* Project Visual: Uploaded Image or Mockup Wireframe */}
                {project.previewImage ? (
                  <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/[0.1] group-hover:scale-[1.02] transition-transform duration-500">
                    <img
                      src={project.previewImage}
                      alt={project.name || project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent pointer-events-none" />
                  </div>
                ) : (
                  <div className="relative w-full h-full rounded-xl bg-dark-900/95 border border-white/[0.1] p-3.5 flex flex-col justify-between overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                    <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-500/40" />
                        <div className="w-2 h-2 rounded-full bg-amber-500/40" />
                        <div className="w-2 h-2 rounded-full bg-emerald-500/40" />
                      </div>
                      <div className="px-2 py-0.5 rounded bg-dark-950 text-[9px] font-mono text-zinc-500 border border-white/[0.05]">
                        {getSafeHostname(project.liveUrl, `${project.slug}.talha.dev`)}
                      </div>
                    </div>

                    <div className="py-2 flex-1 flex flex-col justify-center gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-gold-500/15 border border-gold-400/30 flex items-center justify-center">
                          <Code2 className="w-3.5 h-3.5 text-gold-300" />
                        </div>
                        <div className="h-2.5 w-24 bg-white/20 rounded" />
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 mt-1">
                        <div className="h-10 rounded bg-dark-800/80 border border-white/[0.04]" />
                        <div className="h-10 rounded bg-dark-800/80 border border-white/[0.04]" />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/[0.05] flex items-center justify-between text-[9px] text-zinc-500">
                      <span className="flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${project.liveUrl ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                        {project.liveUrl ? 'Live Deployed' : 'Link Required'}
                      </span>
                      <span className="text-gold-400/80 font-mono">{project.timeline}</span>
                    </div>
                  </div>
                )}

                {/* Badge */}
                <div className="absolute top-3.5 right-3.5 z-20">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-dark-950/90 text-gold-300 border border-gold-500/30 backdrop-blur-md">
                    {project.tag}
                  </span>
                </div>
              </div>

              {/* Information */}
              <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                <div>
                  <h2 
                    onClick={() => setSelectedProject(project)}
                    className="font-heading text-lg font-bold text-white hover:text-gold-300 transition-colors line-clamp-1 cursor-pointer"
                    title="Click to launch Cinematic Project Showcase"
                  >
                    {project.name}
                  </h2>
                  <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] font-mono text-zinc-300 bg-dark-800/90 rounded border border-white/[0.05]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono text-zinc-400">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Action Buttons Row */}
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-3">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105"
                    >
                      <span>{project.accessLabel || 'Open Live Website ↗'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-dark-800 border border-gold-500/20 text-[10px] font-mono text-gold-300/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      <span>Link Required</span>
                    </span>
                  )}

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-300 hover:text-white transition-colors ml-auto"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                    <span>Showcase</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
        )}

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
    </div>
  );
};
