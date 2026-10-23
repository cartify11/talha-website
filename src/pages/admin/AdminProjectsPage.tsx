import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  FolderKanban,
  Sparkles,
  Link2,
  Calendar,
  Layers,
  Code2
} from 'lucide-react';
import { projectsService } from '../../services/projectsService';
import { DatabaseProject } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

export const AdminProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<DatabaseProject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Delete confirmation modal state
  const [projectToDelete, setProjectToDelete] = useState<DatabaseProject | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const { isConfigured } = useAuth();
  const navigate = useNavigate();

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const data = await projectsService.getAllAdminProjects();
      setProjects(data);
    } catch (err: any) {
      setActionMessage({
        type: 'error',
        text: err.message || 'Failed to load projects from storage.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const showNotification = (type: 'success' | 'error', text: string) => {
    setActionMessage({ type, text });
    setTimeout(() => {
      setActionMessage(null);
    }, 4500);
  };

  // Toggle status
  const handleToggleStatus = async (project: DatabaseProject) => {
    try {
      const newStatus = await projectsService.toggleProjectStatus(project.id, project.status);
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, status: newStatus } : p))
      );
      showNotification(
        'success',
        `Project "${project.name}" is now ${newStatus === 'published' ? 'PUBLISHED & live on public site' : 'saved as DRAFT'}.`
      );
    } catch (err: any) {
      showNotification('error', `Failed to toggle publication status: ${err.message}`);
    }
  };

  // Delete project
  const confirmDelete = async () => {
    if (!projectToDelete) return;
    setIsDeleting(true);
    try {
      await projectsService.deleteProject(projectToDelete.id);
      setProjects((prev) => prev.filter((p) => p.id !== projectToDelete.id));
      showNotification('success', `Project "${projectToDelete.name}" was permanently deleted.`);
      setProjectToDelete(null);
    } catch (err: any) {
      showNotification('error', `Failed to delete project: ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  // Metrics
  const totalCount = projects.length;
  const publishedCount = projects.filter((p) => p.status === 'published').length;
  const draftCount = projects.filter((p) => p.status === 'draft').length;
  const featuredCount = projects.filter((p) => p.featured).length;

  // Filtered list
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ? true : p.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      
      {/* Top Banner / Breadcrumb & Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-gold-400 uppercase tracking-widest">
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Workspace Control</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-1">
            Projects Management Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
            Add real client projects, upload preview artwork, configure destination URLs, and manage live public visibility.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/projects/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(198,164,119,0.3)] hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </Link>
        </div>
      </div>

      {/* Action Notification Alert */}
      {actionMessage && (
        <div
          className={`p-4 rounded-2xl border flex items-center gap-3 transition-all ${
            actionMessage.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-red-500/10 border-red-500/30 text-red-300'
          }`}
        >
          {actionMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          )}
          <span className="text-xs sm:text-sm font-medium">{actionMessage.text}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-dark-900/80 border border-white/[0.06] flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">Total Projects</span>
            <span className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1 block">{totalCount}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-zinc-300">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-dark-900/80 border border-emerald-500/20 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block">Published Live</span>
            <span className="font-heading text-2xl sm:text-3xl font-bold text-emerald-400 mt-1 block">{publishedCount}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Eye className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-dark-900/80 border border-amber-500/20 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block">Draft Mode</span>
            <span className="font-heading text-2xl sm:text-3xl font-bold text-amber-400 mt-1 block">{draftCount}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <EyeOff className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-dark-900/80 border border-gold-500/20 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-gold-400 uppercase tracking-wider block">Featured</span>
            <span className="font-heading text-2xl sm:text-3xl font-bold text-gold-300 mt-1 block">{featuredCount}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-dark-950 p-4 rounded-2xl border border-white/[0.08]">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search projects by name, category, tech..."
            className="w-full pl-10 pr-4 py-2 bg-dark-900 border border-white/[0.08] focus:border-gold-500/50 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          {(['all', 'published', 'draft'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                statusFilter === tab
                  ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {tab === 'all' ? 'All Projects' : tab === 'published' ? 'Published' : 'Drafts'}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-gold-400">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="text-xs uppercase font-mono tracking-widest text-zinc-400">
            Loading Portfolio Projects...
          </span>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-dark-950/60 border border-white/[0.06] p-8 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 mx-auto">
            <FolderKanban className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-lg font-bold text-white">No Projects Found</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            {searchTerm || statusFilter !== 'all'
              ? 'No projects match your current search or filter query.'
              : 'You have not added any projects yet. Click the button below to add your first real project!'}
          </p>
          <Link
            to="/admin/projects/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500 text-dark-950 font-bold text-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create First Project</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="p-5 sm:p-6 rounded-2xl bg-dark-950 border border-white/[0.08] hover:border-gold-500/30 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
            >
              {/* Left Details */}
              <div className="flex items-start gap-4 min-w-0 flex-1">
                {/* Thumbnail Preview */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-dark-900 border border-white/[0.08] overflow-hidden shrink-0 flex items-center justify-center relative">
                  {project.preview_image ? (
                    <img
                      src={project.preview_image}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-zinc-600 gap-1">
                      <Code2 className="w-6 h-6 text-gold-500/40" />
                      <span className="text-[9px] font-mono">No Image</span>
                    </div>
                  )}
                  {project.featured && (
                    <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-gold-500 text-dark-950 font-bold text-[9px] flex items-center gap-0.5 shadow-md">
                      <Sparkles className="w-2.5 h-2.5" />
                    </div>
                  )}
                </div>

                {/* Text Metadata */}
                <div className="min-w-0 space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-heading text-lg font-bold text-white hover:text-gold-300 transition-colors truncate">
                      {project.name}
                    </span>
                    
                    {/* Status Pill */}
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider border ${
                        project.status === 'published'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                      }`}
                    >
                      {project.status === 'published' ? '● Published' : '○ Draft'}
                    </span>

                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-dark-900 text-zinc-400 border border-white/[0.06]">
                      {project.category}
                    </span>

                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-dark-900 text-gold-400/80 border border-white/[0.06]">
                      {project.type}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-2 max-w-2xl leading-relaxed">
                    {project.description}
                  </p>

                  {/* Destination URL & Technologies */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 text-[11px] font-mono">
                    {project.live_url ? (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold-300 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Link2 className="w-3 h-3 text-gold-400" />
                        <span className="max-w-[240px] truncate">{project.live_url}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    ) : (
                      <span className="text-amber-400/90 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>Live link required</span>
                      </span>
                    )}

                    <span className="text-zinc-600">•</span>

                    <span className="text-zinc-500">
                      {(project.technologies || []).slice(0, 4).join(', ')}
                      {(project.technologies || []).length > 4 ? '...' : ''}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 self-end lg:self-center shrink-0">
                {/* Publish / Unpublish Toggle */}
                <button
                  onClick={() => handleToggleStatus(project)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    project.status === 'published'
                      ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30'
                      : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  }`}
                  title={project.status === 'published' ? 'Switch to Draft (Hide from Public)' : 'Publish to Public Portfolio'}
                >
                  {project.status === 'published' ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Unpublish</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Publish Live</span>
                    </>
                  )}
                </button>

                {/* Preview on Public Site */}
                <Link
                  to={`/projects/${project.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-dark-900 hover:bg-dark-850 text-zinc-300 hover:text-white border border-white/[0.08] text-xs font-semibold transition-all"
                  title="Preview case study page in new tab"
                >
                  <Eye className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Preview</span>
                </Link>

                {/* Edit Button */}
                <Link
                  to={`/admin/projects/${project.id}/edit`}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gold-500/15 hover:bg-gold-500/25 text-gold-300 border border-gold-500/40 text-xs font-semibold transition-all"
                  title="Edit project details and preview image"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </Link>

                {/* Delete Button */}
                <button
                  onClick={() => setProjectToDelete(project)}
                  className="inline-flex items-center gap-1.5 p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-semibold transition-all"
                  title="Delete project permanently"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {projectToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl bg-dark-950 border border-red-500/30 p-6 sm:p-7 space-y-5 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="font-heading text-xl font-bold text-white">
                Delete Project?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Are you sure you want to permanently delete{' '}
                <span className="text-white font-bold">"{projectToDelete.name}"</span>? This will remove it from your database and public portfolio.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.08]">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setProjectToDelete(null)}
                className="px-4 py-2.5 rounded-xl bg-dark-900 hover:bg-dark-850 text-zinc-300 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={confirmDelete}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(239,68,68,0.4)] disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete Permanently</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
