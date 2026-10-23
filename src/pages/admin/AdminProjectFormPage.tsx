import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  UploadCloud, 
  X, 
  Plus, 
  Save, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  Image as ImageIcon,
  ExternalLink,
  Sparkles,
  Link2,
  Code2,
  Layers,
  FileText
} from 'lucide-react';
import { projectsService, ProjectFormData } from '../../services/projectsService';

const CATEGORIES = [
  'AI Solutions',
  'Web Apps',
  'Mobile Apps',
  'Enterprise',
  'Extensions',
  'E-Commerce',
  'Other'
] as const;

const PROJECT_TYPES = [
  'Website',
  'Web Application',
  'Desktop Software',
  'Mobile App',
  'Browser Extension',
  'Plugin',
  'AI Knowledge Platform',
  'Enterprise System',
  'Other'
] as const;

const TECH_PRESETS = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'FastAPI', 
  'OpenAI API', 'Tailwind CSS', 'PostgreSQL', 'Supabase', 'Docker', 
  'Redis', 'Flutter', 'React Native', 'GraphQL', 'AWS'
];

export const AdminProjectFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProjectFormData['category']>('AI Solutions');
  const [type, setType] = useState('Web Application');
  const [tag, setTag] = useState('');
  const [description, setDescription] = useState('');
  const [fullOverview, setFullOverview] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('published');
  const [featured, setFeatured] = useState<boolean>(false);
  const [accessLabel, setAccessLabel] = useState('View Live Project ↗');

  // Technologies
  const [technologies, setTechnologies] = useState<string[]>(['React', 'TypeScript', 'Tailwind CSS']);
  const [techInput, setTechInput] = useState('');

  // Key Features
  const [keyFeatures, setKeyFeatures] = useState<string[]>([
    'High-throughput asynchronous data processing pipeline',
    'Real-time state synchronizations and multi-tenant security'
  ]);
  const [featureInput, setFeatureInput] = useState('');

  // Image Upload
  const [previewImageFile, setPreviewImageFile] = useState<File | null>(null);
  const [previewImageDisplay, setPreviewImageDisplay] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

  // Submission & Validation States
  const [isLoadingProject, setIsLoadingProject] = useState<boolean>(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [globalError, setGlobalError] = useState<string | null>(null);

  // Load project for edit mode
  useEffect(() => {
    if (isEditMode && id) {
      const fetchProject = async () => {
        setIsLoadingProject(true);
        try {
          const project = await projectsService.getProjectByIdOrSlug(id);
          if (project) {
            setName(project.name || project.title.split('—')[0].trim());
            setCategory(project.category as ProjectFormData['category']);
            setType(project.type || 'Web Application');
            setTag(project.tag || '');
            setDescription(project.description || '');
            setFullOverview(project.fullOverview || project.description || '');
            setLiveUrl(project.liveUrl || '');
            setGithubUrl(project.githubUrl || '');
            setStatus(project.status === 'live' ? 'published' : 'draft');
            setTechnologies(project.technologies || []);
            setKeyFeatures(project.keyFeatures || []);
            setAccessLabel(project.accessLabel || 'View Live Project ↗');
            if (project.previewImage) {
              setExistingImageUrl(project.previewImage);
              setPreviewImageDisplay(project.previewImage);
            }
          } else {
            setGlobalError(`Project with identifier "${id}" could not be found.`);
          }
        } catch (err: any) {
          setGlobalError(err.message || 'Error fetching project details.');
        } finally {
          setIsLoadingProject(false);
        }
      };
      fetchProject();
    }
  }, [isEditMode, id]);

  // URL Validator
  const isValidUrl = (url: string): boolean => {
    if (!url.trim()) return false;
    try {
      const parsed = new URL(url.trim());
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  };

  // Handle Image Selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors((prev) => ({ ...prev, image: 'Please choose a valid image file (PNG, JPG, WEBP).' }));
        return;
      }
      setPreviewImageFile(file);
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.image;
        return copy;
      });

      const localReader = new FileReader();
      localReader.onload = () => {
        setPreviewImageDisplay(localReader.result as string);
      };
      localReader.readAsDataURL(file);
    }
  };

  // Remove preview image
  const handleRemoveImage = () => {
    setPreviewImageFile(null);
    setPreviewImageDisplay(null);
    setExistingImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Tech tags management
  const handleAddTech = (tech: string) => {
    const clean = tech.trim();
    if (clean && !technologies.includes(clean)) {
      setTechnologies([...technologies, clean]);
      setTechInput('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setTechnologies(technologies.filter((t) => t !== tech));
  };

  // Key Features management
  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setKeyFeatures([...keyFeatures, featureInput.trim()]);
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setKeyFeatures(keyFeatures.filter((_, i) => i !== index));
  };

  // Validation
  const validate = (): boolean => {
    const errs: { [key: string]: string } = {};

    if (!name.trim()) errs.name = 'Project name is required.';
    if (!description.trim()) errs.description = 'Short description is required.';
    if (!fullOverview.trim()) errs.fullOverview = 'Detailed description / overview is required.';
    if (technologies.length === 0) errs.technologies = 'Please add at least one technology.';

    // Live URL validation:
    // If published, live URL is strictly required and must be valid
    if (status === 'published') {
      if (!liveUrl.trim()) {
        errs.liveUrl = 'Actual Live Project URL is required before publishing. If not ready, save as Draft.';
      } else if (!isValidUrl(liveUrl)) {
        errs.liveUrl = 'Please provide a valid URL starting with http:// or https:// (e.g. https://myproject.com).';
      }
    } else if (liveUrl.trim() && !isValidUrl(liveUrl)) {
      errs.liveUrl = 'Please provide a valid URL starting with http:// or https://.';
    }

    if (githubUrl.trim() && !isValidUrl(githubUrl)) {
      errs.githubUrl = 'Please provide a valid GitHub URL starting with https://.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null);

    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: ProjectFormData = {
        name: name.trim(),
        category,
        type,
        tag: tag.trim() || type,
        description: description.trim(),
        fullOverview: fullOverview.trim(),
        technologies,
        keyFeatures,
        architecturePoints: [
          `Production architecture built with ${technologies.slice(0, 3).join(', ')}`,
          `High performance deployment with optimized latency and security boundaries`
        ],
        liveUrl: liveUrl.trim(),
        githubUrl: githubUrl.trim() || undefined,
        status,
        featured,
        accessLabel: accessLabel.trim() || 'View Live Project ↗',
        previewImage: existingImageUrl || undefined,
      };

      if (isEditMode && id) {
        await projectsService.updateProject(id, payload, previewImageFile);
      } else {
        await projectsService.createProject(payload, previewImageFile);
      }

      navigate('/admin/projects');
    } catch (err: any) {
      setGlobalError(err.message || 'Failed to save project. Please check the fields and try again.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingProject) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3 text-gold-400">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="text-xs uppercase font-mono tracking-widest text-zinc-400">
          Loading Project Details...
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
        <div className="space-y-1">
          <Link
            to="/admin/projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-gold-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Projects Manager</span>
          </Link>
          <h1 className="font-heading text-3xl font-bold text-white">
            {isEditMode ? `Edit Project: ${name || 'Project'}` : 'Add New Real Project'}
          </h1>
          <p className="text-xs text-zinc-400">
            Fill in the project details below. When marked as Published, it will immediately appear on the public portfolio.
          </p>
        </div>

        {/* Status Preview Indicator */}
        <div className="hidden sm:flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${
              status === 'published'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
            }`}
          >
            {status === 'published' ? '● Will Publish Live' : '○ Save as Draft'}
          </span>
        </div>
      </div>

      {/* Global Error Banner */}
      {globalError && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs sm:text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold block">Submission Error:</span>
            <span>{globalError}</span>
          </div>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Basic Identity */}
        <div className="p-6 sm:p-8 rounded-3xl bg-dark-950 border border-white/[0.08] space-y-6">
          <h2 className="font-heading text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.06] pb-3">
            <Layers className="w-4 h-4 text-gold-400" />
            <span>Core Information</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Project Name */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center justify-between">
                <span>Project Name *</span>
                {errors.name && <span className="text-red-400 text-[11px] font-normal">{errors.name}</span>}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. CognitiveIQ or Smart Inventory Pro"
                className="w-full px-4 py-3 bg-dark-900 border border-white/[0.1] focus:border-gold-500/60 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none"
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Project Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-4 py-3 bg-dark-900 border border-white/[0.1] focus:border-gold-500/60 rounded-xl text-sm text-white focus:outline-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-dark-950 text-white">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Project Type *
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-3 bg-dark-900 border border-white/[0.1] focus:border-gold-500/60 rounded-xl text-sm text-white focus:outline-none"
              >
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t} className="bg-dark-950 text-white">
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Subtitle / Tag */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Display Tag / Specialty (Optional)
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="e.g. Enterprise AI Platform, SaaS Dashboard, Mobile App"
                className="w-full px-4 py-2.5 bg-dark-900 border border-white/[0.1] focus:border-gold-500/60 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Descriptions & Narratives */}
        <div className="p-6 sm:p-8 rounded-3xl bg-dark-950 border border-white/[0.08] space-y-6">
          <h2 className="font-heading text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.06] pb-3">
            <FileText className="w-4 h-4 text-gold-400" />
            <span>Narrative & Overview</span>
          </h2>

          <div className="space-y-5">
            {/* Short Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center justify-between">
                <span>Short Summary (Appears on Project Cards) *</span>
                {errors.description && <span className="text-red-400 text-[11px] font-normal">{errors.description}</span>}
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief 1-2 sentence elevator pitch of the project, problem solved, and key achievement..."
                className="w-full px-4 py-3 bg-dark-900 border border-white/[0.1] focus:border-gold-500/60 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none leading-relaxed"
              />
            </div>

            {/* Detailed Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center justify-between">
                <span>Detailed Case Study Overview *</span>
                {errors.fullOverview && <span className="text-red-400 text-[11px] font-normal">{errors.fullOverview}</span>}
              </label>
              <textarea
                rows={4}
                value={fullOverview}
                onChange={(e) => setFullOverview(e.target.value)}
                placeholder="Detailed technical overview explaining client needs, architectural choices, and delivered business results..."
                className="w-full px-4 py-3 bg-dark-900 border border-white/[0.1] focus:border-gold-500/60 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Technologies & Features */}
        <div className="p-6 sm:p-8 rounded-3xl bg-dark-950 border border-white/[0.08] space-y-6">
          <h2 className="font-heading text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.06] pb-3">
            <Code2 className="w-4 h-4 text-gold-400" />
            <span>Tech Stack & Features</span>
          </h2>

          {/* Technologies Tag Input */}
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center justify-between">
              <span>Technologies Used *</span>
              {errors.technologies && <span className="text-red-400 text-[11px] font-normal">{errors.technologies}</span>}
            </label>

            {/* Active Tech Chips */}
            <div className="flex flex-wrap gap-2 p-3 bg-dark-900 rounded-xl border border-white/[0.08] min-h-[46px]">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-dark-850 text-gold-300 border border-gold-500/30 text-xs font-mono font-medium shadow-sm"
                >
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(tech)}
                    className="text-zinc-400 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Custom Tech Add Input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTech(techInput);
                  }
                }}
                placeholder="Type technology (e.g. Next.js, LangChain) and press Enter"
                className="flex-1 px-4 py-2 bg-dark-900 border border-white/[0.1] rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleAddTech(techInput)}
                className="px-4 py-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-gold-300 border border-gold-500/30 text-xs font-semibold"
              >
                Add Tech
              </button>
            </div>

            {/* Quick Tech Presets */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-mono text-zinc-500 mr-1">Quick Add:</span>
              {TECH_PRESETS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => handleAddTech(p)}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] hover:bg-gold-500/20 text-zinc-400 hover:text-gold-200 border border-white/[0.05] transition-colors"
                >
                  + {p}
                </button>
              ))}
            </div>
          </div>

          {/* Key Features Bullet List */}
          <div className="space-y-3 pt-4 border-t border-white/[0.06]">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Key Features & Capabilities
            </label>

            <div className="space-y-2">
              {keyFeatures.map((feat, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl bg-dark-900 border border-white/[0.06] text-xs text-zinc-200"
                >
                  <span className="font-mono text-gold-400 font-bold shrink-0">0{index + 1}</span>
                  <span className="flex-1 leading-relaxed">{feat}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="text-zinc-500 hover:text-red-400 p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddFeature();
                  }
                }}
                placeholder="Add another key feature and press Enter"
                className="flex-1 px-4 py-2 bg-dark-900 border border-white/[0.1] rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-4 py-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-zinc-200 border border-white/[0.08] text-xs font-semibold"
              >
                Add Feature
              </button>
            </div>
          </div>

        </div>

        {/* Section 4: Preview Image Artwork */}
        <div className="p-6 sm:p-8 rounded-3xl bg-dark-950 border border-white/[0.08] space-y-6">
          <h2 className="font-heading text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.06] pb-3">
            <ImageIcon className="w-4 h-4 text-gold-400" />
            <span>Project Preview Image</span>
          </h2>

          <div className="space-y-4">
            <p className="text-xs text-zinc-400">
              Upload a screenshot or promotional card from your computer. It will be stored permanently in cloud storage and displayed on public project cards.
            </p>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            {/* Image Preview Box or Upload Dropzone */}
            {previewImageDisplay ? (
              <div className="relative rounded-2xl overflow-hidden border border-gold-500/40 bg-dark-900 max-w-xl group">
                <img
                  src={previewImageDisplay}
                  alt="Project Preview"
                  className="w-full aspect-[16/10] object-cover"
                />
                
                {/* Floating overlay actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-gold-500 text-dark-950 font-bold text-xs shadow-lg"
                  >
                    Replace Image
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs shadow-lg"
                  >
                    Remove
                  </button>
                </div>

                <div className="p-3 bg-dark-950/90 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-mono text-[11px] text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Image Selected & Ready</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-gold-400 hover:underline text-[11px]"
                  >
                    Choose Different File
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/[0.12] hover:border-gold-500/50 rounded-2xl p-8 sm:p-12 text-center cursor-pointer bg-dark-900/40 hover:bg-dark-900/70 transition-all flex flex-col items-center justify-center gap-3 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/20 group-hover:bg-gold-500/20 flex items-center justify-center text-gold-400 transition-all group-hover:scale-110">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <span className="text-sm font-semibold text-white block">
                    Click to browse or drop preview image
                  </span>
                  <span className="text-xs text-zinc-500 block font-mono">
                    PNG, JPG, or WEBP (Recommended: 1200x750 or 16:10 aspect ratio)
                  </span>
                </div>
              </div>
            )}

            {errors.image && (
              <span className="text-red-400 text-xs block">{errors.image}</span>
            )}
          </div>
        </div>

        {/* Section 5: URLs & Live Access */}
        <div className="p-6 sm:p-8 rounded-3xl bg-dark-950 border border-white/[0.08] space-y-6">
          <h2 className="font-heading text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.06] pb-3">
            <Link2 className="w-4 h-4 text-gold-400" />
            <span>Destination URLs & External Access</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Live Destination URL */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center justify-between">
                <span>Actual Live Project URL {status === 'published' && '*'}</span>
                {errors.liveUrl && <span className="text-red-400 text-[11px] font-normal">{errors.liveUrl}</span>}
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="https://example.com or https://my-app.vercel.app"
                  className="w-full px-4 py-3 bg-dark-900 border border-white/[0.1] focus:border-gold-500/60 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none font-mono"
                />
              </div>
              <span className="text-[11px] text-zinc-500 block leading-relaxed">
                When visitors click <span className="text-gold-300 font-semibold">“View Live Project ↗”</span>, they will open this actual website or application in a new browser tab.
              </span>
            </div>

            {/* Optional GitHub URL */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center justify-between">
                <span>GitHub Repository URL (Optional)</span>
                {errors.githubUrl && <span className="text-red-400 text-[11px] font-normal">{errors.githubUrl}</span>}
              </label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/username/repository"
                className="w-full px-4 py-2.5 bg-dark-900 border border-white/[0.1] focus:border-gold-500/60 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none font-mono"
              />
            </div>

            {/* Custom Access Label */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Action Button Text
              </label>
              <input
                type="text"
                value={accessLabel}
                onChange={(e) => setAccessLabel(e.target.value)}
                placeholder="View Live Project ↗"
                className="w-full px-4 py-2.5 bg-dark-900 border border-white/[0.1] focus:border-gold-500/60 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 6: Publication & Visibility */}
        <div className="p-6 sm:p-8 rounded-3xl bg-dark-950 border border-white/[0.08] space-y-6">
          <h2 className="font-heading text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.06] pb-3">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>Publication & Visibility</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Status Radio / Select */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 block">
                Publication Status
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setStatus('published')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    status === 'published'
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                      : 'bg-dark-900 border-white/[0.06] text-zinc-400 hover:border-white/[0.15]'
                  }`}
                >
                  <span className="font-bold text-xs uppercase tracking-wider block">
                    ● Published
                  </span>
                  <span className="text-[11px] text-zinc-400 mt-1 block">
                    Visible immediately to all public visitors on /projects
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setStatus('draft')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    status === 'draft'
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                      : 'bg-dark-900 border-white/[0.06] text-zinc-400 hover:border-white/[0.15]'
                  }`}
                >
                  <span className="font-bold text-xs uppercase tracking-wider block">
                    ○ Draft
                  </span>
                  <span className="text-[11px] text-zinc-400 mt-1 block">
                    Saved in admin only; hidden from public visitors
                  </span>
                </button>
              </div>
            </div>

            {/* Featured Project Toggle */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 block">
                Featured on Homepage
              </label>
              
              <div
                onClick={() => setFeatured(!featured)}
                className={`p-4 rounded-2xl border cursor-pointer text-left flex items-center justify-between transition-all ${
                  featured
                    ? 'bg-gold-500/15 border-gold-500/40 text-gold-300 shadow-[0_0_20px_rgba(198,164,119,0.2)]'
                    : 'bg-dark-900 border-white/[0.06] text-zinc-400 hover:border-white/[0.15]'
                }`}
              >
                <div>
                  <span className="font-bold text-xs block">
                    ★ Featured Showcase
                  </span>
                  <span className="text-[11px] text-zinc-400 mt-0.5 block">
                    Pins project to prominent slots on the homepage
                  </span>
                </div>
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                    featured
                      ? 'bg-gold-500 border-gold-400 text-dark-950 font-bold'
                      : 'border-white/[0.2] bg-dark-950'
                  }`}
                >
                  {featured && <CheckCircle2 className="w-3.5 h-3.5 text-dark-950" />}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Submission Buttons */}
        <div className="pt-4 flex flex-col-reverse sm:flex-row items-center justify-end gap-4 border-t border-white/[0.08]">
          <Link
            to="/admin/projects"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-dark-900 hover:bg-dark-850 text-zinc-300 text-xs font-semibold text-center transition-colors"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(198,164,119,0.35)] flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-105"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Project & Uploading Artwork...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{isEditMode ? 'Save Project Changes' : status === 'published' ? 'Save & Publish Live' : 'Save as Draft'}</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
};
