import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle, 
  Code2, 
  Calendar, 
  User, 
  Layers, 
  Cpu, 
  ArrowRight,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import { projectsList, ProjectItem } from '../data/projectsData';
import { projectsService } from '../services/projectsService';
import { GithubIcon } from '../components/SocialIcons';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (slug) {
      setIsLoading(true);
      projectsService.getProjectByIdOrSlug(slug).then((res) => {
        setProject(res);
        setIsLoading(false);
      });
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="pt-36 pb-24 min-h-screen bg-black text-center flex flex-col items-center justify-center px-4">
        <Loader2 className="w-8 h-8 animate-spin text-gold-400 mb-4" />
        <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
          Loading Project Case Study...
        </span>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-36 pb-24 min-h-screen bg-black text-center flex flex-col items-center justify-center px-4">
        <div className="w-16 h-16 rounded-full bg-dark-900 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6">
          <Code2 className="w-8 h-8" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-white mb-3">
          Project Case Study Not Found
        </h1>
        <p className="text-zinc-400 text-sm max-w-md mx-auto mb-8">
          The requested project <code className="text-gold-400">"{slug}"</code> does not exist or has been relocated.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Projects</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 min-h-screen bg-black text-neutral-100">
      
      {/* Background Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-24 left-1/4 w-[600px] h-[500px] bg-gold-500/5 blur-[160px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back Link */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-gold-300 transition-colors py-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects Archive</span>
          </button>
        </div>

        {/* Project Header */}
        <div className="max-w-4xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-dark-900 text-gold-300 border border-gold-500/30">
              {project.tag}
            </span>
            <span className="text-xs text-zinc-500 font-mono">
              Status: {project.status}
            </span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            {project.title}
          </h1>

          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
            {project.description}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold text-xs transition-colors shadow-[0_4px_20px_rgba(198,164,119,0.35)]"
              >
                <span>{project.accessLabel || 'View Live Project'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-dark-900 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>Live Destination: Link Required</span>
              </div>
            )}

            {project.appUrl && (
              <a
                href={project.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-dark-950 font-bold text-xs transition-all shadow-[0_4px_20px_rgba(245,158,11,0.3)]"
              >
                <span>Launch App / Super-Admin</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-gold-100 text-dark-950 font-bold text-xs transition-colors shadow-lg"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Explore Code / Architecture</span>
              </a>
            )}

            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-dark-850 hover:bg-dark-800 text-zinc-200 hover:text-white font-medium text-xs border border-white/[0.1] hover:border-gold-500/40 transition-colors"
            >
              <span>Discuss Similar Project</span>
              <ArrowRight className="w-4 h-4 text-gold-400" />
            </button>
          </div>
        </div>

        {/* Main Content Grid: Details & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Left Column: Comprehensive Case Study Narrative */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Project Overview Narrative */}
            <div className="rounded-2xl p-8 bg-dark-900/80 border border-white/[0.07] space-y-4">
              <h2 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-gold-400" />
                <span>Executive Overview</span>
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                {project.fullOverview}
              </p>
            </div>

            {/* Key Features Section */}
            <div className="space-y-6">
              <h2 className="font-heading text-2xl font-bold text-white">
                Implemented Capabilities & Features
              </h2>
              <div className="grid grid-cols-1 gap-3.5">
                {project.keyFeatures.map((feat, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3.5 p-4 rounded-xl bg-dark-900/60 border border-white/[0.05]"
                  >
                    <CheckCircle className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-300 font-medium leading-relaxed">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architectural Highlights */}
            <div className="space-y-6">
              <h2 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-gold-400" />
                <span>Technical Architecture & Strategy</span>
              </h2>
              <div className="space-y-3">
                {project.architecturePoints.map((arch, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-xl bg-dark-950 border border-white/[0.06] flex items-start gap-4"
                  >
                    <span className="font-mono text-xs font-bold text-gold-400 bg-dark-900 px-2 py-1 rounded border border-gold-500/20">
                      0{index + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {arch}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Presentation Wireframes / Screenshots Showcase */}
            <div className="space-y-6">
              <h2 className="font-heading text-2xl font-bold text-white">
                Interface Previews
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Desktop View Card */}
                <div className="rounded-xl overflow-hidden bg-dark-900 border border-white/[0.08] p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/[0.06] text-[10px] text-zinc-400 font-mono">
                    <span>Desktop Workspace View</span>
                    <span className="text-gold-400">1920x1080</span>
                  </div>
                  <div className="aspect-video bg-dark-950 rounded-lg border border-white/[0.05] p-3 flex flex-col justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gold-400" />
                      <div className="h-2 w-20 bg-white/20 rounded" />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-14 bg-dark-850 rounded border border-white/[0.03]" />
                      <div className="h-14 bg-dark-850 rounded border border-white/[0.03]" />
                      <div className="h-14 bg-dark-850 rounded border border-white/[0.03]" />
                    </div>
                    <div className="h-2 w-32 bg-white/10 rounded" />
                  </div>
                </div>

                {/* Mobile View Card */}
                <div className="rounded-xl overflow-hidden bg-dark-900 border border-white/[0.08] p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/[0.06] text-[10px] text-zinc-400 font-mono">
                    <span>Mobile Interface View</span>
                    <span className="text-gold-400">375x812</span>
                  </div>
                  <div className="aspect-video bg-dark-950 rounded-lg border border-white/[0.05] p-3 flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <div className="h-2 w-12 bg-white/20 rounded" />
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <div className="space-y-1.5 py-1">
                      <div className="h-3 bg-dark-850 rounded" />
                      <div className="h-3 bg-dark-850 rounded" />
                    </div>
                    <div className="h-4 w-full bg-gold-500/20 rounded border border-gold-400/30" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Metadata Sidebar Card */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="rounded-2xl p-6 sm:p-7 bg-gradient-to-b from-dark-900/90 to-dark-950 border border-gold-500/30 space-y-6 sticky top-28 shadow-2xl">
              <h3 className="font-heading text-lg font-bold text-white pb-3 border-b border-white/[0.08]">
                Project Metadata
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-zinc-500 font-medium uppercase tracking-wider block">Client</span>
                  <span className="text-zinc-200 font-semibold text-sm mt-0.5 block">{project.client}</span>
                </div>

                <div className="pt-2 border-t border-white/[0.04]">
                  <span className="text-zinc-500 font-medium uppercase tracking-wider block">Duration</span>
                  <span className="text-zinc-200 font-semibold text-sm mt-0.5 block">{project.timeline}</span>
                </div>

                <div className="pt-2 border-t border-white/[0.04]">
                  <span className="text-zinc-500 font-medium uppercase tracking-wider block">Role</span>
                  <span className="text-gold-300 font-semibold text-sm mt-0.5 block">{project.role}</span>
                </div>

                <div className="pt-2 border-t border-white/[0.04]">
                  <span className="text-zinc-500 font-medium uppercase tracking-wider block">Category</span>
                  <span className="text-zinc-200 font-semibold text-sm mt-0.5 block">{project.category}</span>
                </div>
              </div>

              {/* Technologies */}
              <div className="pt-4 border-t border-white/[0.06]">
                <span className="text-zinc-400 font-semibold uppercase tracking-wider text-[11px] block mb-3">
                  Technologies Used
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-[11px] font-mono bg-dark-850 text-gold-200 rounded border border-white/[0.06]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ready to build similar CTA */}
              <div className="pt-4 border-t border-white/[0.06]">
                <button
                  onClick={() => navigate('/contact')}
                  className="w-full py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold text-xs tracking-wide transition-colors flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(198,164,119,0.3)]"
                >
                  <span>Build a Similar Product</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
