import { supabase, isSupabaseConfigured, DatabaseProject } from '../lib/supabase';
import { ProjectItem, projectsList as defaultProjects } from '../data/projectsData';

const LOCAL_STORAGE_PROJECTS_KEY = 'talha_portfolio_dynamic_projects_v4';
const LOCAL_STORAGE_SEEDED_KEY = 'talha_portfolio_dynamic_seeded_v4';
const LOCAL_STORAGE_DELETED_KEY = 'talha_portfolio_deleted_slugs_v4';

// Helper to convert database record to ProjectItem
export const mapDbToProjectItem = (db: DatabaseProject): ProjectItem => {
  return {
    id: db.id,
    slug: db.slug,
    name: db.name,
    title: db.title,
    category: db.category as ProjectItem['category'],
    type: db.type,
    tag: db.tag || 'Project',
    description: db.description,
    fullOverview: db.full_overview,
    client: db.client || 'Confidential',
    timeline: db.timeline || 'Production',
    role: db.role || 'Lead Developer',
    status: db.status === 'published' ? 'live' : 'development',
    technologies: Array.isArray(db.technologies) ? db.technologies : [],
    keyFeatures: Array.isArray(db.key_features) ? db.key_features : [],
    architecturePoints: Array.isArray(db.architecture_points) ? db.architecture_points : [],
    previewImage: db.preview_image || undefined,
    liveUrl: db.live_url || null,
    appUrl: (db as any).app_url || null,
    githubUrl: db.github_url || null,
    accessLabel: db.access_label || 'Open Live Website ↗',
  };
};

// Helper to slugify a string
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Tracking deleted items so default projects never resurrect deleted items
const getDeletedKeys = (): Set<string> => {
  const data = localStorage.getItem(LOCAL_STORAGE_DELETED_KEY);
  if (!data) return new Set();
  try {
    return new Set(JSON.parse(data));
  } catch {
    return new Set();
  }
};

const markAsDeleted = (id: string, slug?: string) => {
  const set = getDeletedKeys();
  if (id) set.add(id);
  if (slug) set.add(slug);
  localStorage.setItem(LOCAL_STORAGE_DELETED_KEY, JSON.stringify(Array.from(set)));
};

// Local storage helpers
const getLocalProjects = (): DatabaseProject[] => {
  const data = localStorage.getItem(LOCAL_STORAGE_PROJECTS_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const saveLocalProjects = (projects: DatabaseProject[]) => {
  localStorage.setItem(LOCAL_STORAGE_PROJECTS_KEY, JSON.stringify(projects));
};

// Initial seed helper with real 4 projects
const initLocalStorageIfNeeded = (): DatabaseProject[] => {
  const isSeeded = localStorage.getItem(LOCAL_STORAGE_SEEDED_KEY);
  if (isSeeded) {
    return getLocalProjects();
  }

  // Seed with user's real projects
  const initial: DatabaseProject[] = defaultProjects.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    title: p.title,
    category: p.category,
    type: p.type,
    tag: p.tag,
    description: p.description,
    full_overview: p.fullOverview,
    client: p.client,
    timeline: p.timeline,
    role: p.role,
    status: 'published',
    featured: true,
    technologies: p.technologies,
    key_features: p.keyFeatures,
    architecture_points: p.architecturePoints,
    preview_image: p.previewImage || null,
    live_url: p.liveUrl,
    app_url: p.appUrl || null,
    github_url: p.githubUrl || null,
    access_label: p.accessLabel,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  } as any));

  saveLocalProjects(initial);
  localStorage.setItem(LOCAL_STORAGE_SEEDED_KEY, 'true');
  return initial;
};

export interface ProjectFormData {
  name: string;
  category: 'AI Solutions' | 'Web Apps' | 'Mobile Apps' | 'Enterprise' | 'Extensions' | 'E-Commerce' | 'Other';
  type: string;
  tag?: string;
  description: string;
  fullOverview: string;
  technologies: string[];
  keyFeatures?: string[];
  architecturePoints?: string[];
  liveUrl: string;
  githubUrl?: string;
  status: 'draft' | 'published';
  featured: boolean;
  accessLabel?: string;
  previewImage?: string;
}

export const projectsService = {
  // Fetch published projects for public visitors
  async getPublishedProjects(): Promise<ProjectItem[]> {
    const deletedKeys = getDeletedKeys();

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('status', 'published')
          .order('featured', { ascending: false })
          .order('created_at', { ascending: false });

        if (!error && data) {
          const dynamicProjects = (data as DatabaseProject[])
            .filter((p) => !deletedKeys.has(p.id) && !deletedKeys.has(p.slug))
            .map(mapDbToProjectItem);
          
          return dynamicProjects;
        }
      } catch (err) {
        console.warn('Could not fetch from Supabase, falling back to local storage:', err);
      }
    }

    // Fallback: local storage authoritative source
    const local = initLocalStorageIfNeeded();
    return local
      .filter((p) => p.status === 'published' && !deletedKeys.has(p.id) && !deletedKeys.has(p.slug))
      .map(mapDbToProjectItem);
  },

  // Fetch all projects for administrator (both drafts and published)
  async getAllAdminProjects(): Promise<DatabaseProject[]> {
    const deletedKeys = getDeletedKeys();

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) {
          return (data as DatabaseProject[]).filter((p) => !deletedKeys.has(p.id) && !deletedKeys.has(p.slug));
        }
      } catch (err) {
        console.error('Error fetching admin projects from Supabase:', err);
        throw err;
      }
    }

    // Fallback local storage
    const local = initLocalStorageIfNeeded();
    return local.filter((p) => !deletedKeys.has(p.id) && !deletedKeys.has(p.slug));
  },

  // Fetch single project by ID or Slug
  async getProjectByIdOrSlug(idOrSlug: string): Promise<ProjectItem | null> {
    const deletedKeys = getDeletedKeys();
    if (deletedKeys.has(idOrSlug)) {
      return null;
    }

    if (isSupabaseConfigured()) {
      try {
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);
        let query = supabase.from('projects').select('*');
        if (isUUID) {
          query = query.or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`);
        } else {
          query = query.eq('slug', idOrSlug);
        }
        
        const { data, error } = await query.maybeSingle();
        if (!error && data) {
          const dbProj = data as DatabaseProject;
          if (!deletedKeys.has(dbProj.id) && !deletedKeys.has(dbProj.slug)) {
            return mapDbToProjectItem(dbProj);
          }
        }
      } catch (err) {
        console.warn('Supabase fetch single project error:', err);
      }
    }

    // Fallback search in local storage
    const local = initLocalStorageIfNeeded();
    const found = local.find(
      (p) => (p.id === idOrSlug || p.slug === idOrSlug) && !deletedKeys.has(p.id) && !deletedKeys.has(p.slug)
    );
    if (found) return mapDbToProjectItem(found);

    return null;
  },

  // Upload preview image to Supabase Storage
  async uploadPreviewImage(file: File): Promise<string> {
    if (isSupabaseConfigured()) {
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = `previews/${Date.now()}_${cleanFileName}`;

      const { error: uploadError } = await supabase.storage
        .from('project-previews')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type || `image/${fileExt}`,
        });

      if (uploadError) {
        console.error('Storage upload failed:', uploadError);
        throw new Error(`Failed to upload preview image: ${uploadError.message}`);
      }

      const { data: urlData } = supabase.storage
        .from('project-previews')
        .getPublicUrl(filePath);

      if (!urlData?.publicUrl) {
        throw new Error('Could not retrieve public URL for uploaded preview image.');
      }

      return urlData.publicUrl;
    }

    // Fallback: convert file to local Base64 data URL for dev testing
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read image file locally.'));
      reader.readAsDataURL(file);
    });
  },

  // Create a new project
  async createProject(formData: ProjectFormData, imageFile?: File | null): Promise<DatabaseProject> {
    let previewImageUrl: string | null = formData.previewImage || null;

    if (imageFile) {
      previewImageUrl = await this.uploadPreviewImage(imageFile);
    }

    const slug = generateSlug(formData.name);

    const newRecord: Omit<DatabaseProject, 'id' | 'created_at' | 'updated_at'> = {
      name: formData.name,
      slug,
      title: `${formData.name} — ${formData.tag || formData.type}`,
      category: formData.category,
      type: formData.type,
      tag: formData.tag || formData.type,
      description: formData.description,
      full_overview: formData.fullOverview || formData.description,
      client: 'Direct Client',
      timeline: 'Production',
      role: 'Lead AI & Full Stack Developer',
      status: formData.status,
      featured: formData.featured,
      technologies: formData.technologies,
      key_features: formData.keyFeatures || [],
      architecture_points: formData.architecturePoints || [],
      preview_image: previewImageUrl,
      live_url: formData.liveUrl.trim() || null,
      github_url: formData.githubUrl?.trim() || null,
      access_label: formData.accessLabel || 'View Live Project ↗',
    };

    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('projects')
        .insert([newRecord])
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to save project to Supabase: ${error.message}`);
      }
      return data as DatabaseProject;
    }

    // Fallback local storage
    const local = initLocalStorageIfNeeded();
    const createdItem: DatabaseProject = {
      ...newRecord,
      id: `proj_${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    local.unshift(createdItem);
    saveLocalProjects(local);
    localStorage.setItem(LOCAL_STORAGE_SEEDED_KEY, 'true');
    return createdItem;
  },

  // Update existing project
  async updateProject(id: string, formData: Partial<ProjectFormData>, imageFile?: File | null): Promise<DatabaseProject> {
    let previewImageUrl = formData.previewImage;

    if (imageFile) {
      previewImageUrl = await this.uploadPreviewImage(imageFile);
    }

    const updatePayload: Partial<DatabaseProject> = {
      updated_at: new Date().toISOString(),
    };

    if (formData.name) {
      updatePayload.name = formData.name;
      updatePayload.slug = generateSlug(formData.name);
    }
    if (formData.category) updatePayload.category = formData.category;
    if (formData.type) {
      updatePayload.type = formData.type;
      updatePayload.tag = formData.tag || formData.type;
    }
    if (formData.description) updatePayload.description = formData.description;
    if (formData.fullOverview) updatePayload.full_overview = formData.fullOverview;
    if (formData.technologies) updatePayload.technologies = formData.technologies;
    if (formData.keyFeatures) updatePayload.key_features = formData.keyFeatures;
    if (formData.architecturePoints) updatePayload.architecture_points = formData.architecturePoints;
    if (formData.status) updatePayload.status = formData.status;
    if (formData.featured !== undefined) updatePayload.featured = formData.featured;
    if (formData.liveUrl !== undefined) updatePayload.live_url = formData.liveUrl.trim() || null;
    if (formData.githubUrl !== undefined) updatePayload.github_url = formData.githubUrl?.trim() || null;
    if (formData.accessLabel) updatePayload.access_label = formData.accessLabel;
    if (previewImageUrl !== undefined) updatePayload.preview_image = previewImageUrl;

    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('projects')
        .update(updatePayload)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to update project in Supabase: ${error.message}`);
      }
      return data as DatabaseProject;
    }

    // Fallback local storage
    const local = initLocalStorageIfNeeded();
    const index = local.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Project with ID ${id} not found.`);
    }

    const updated = {
      ...local[index],
      ...updatePayload,
    };
    local[index] = updated;
    saveLocalProjects(local);
    localStorage.setItem(LOCAL_STORAGE_SEEDED_KEY, 'true');
    return updated;
  },

  // Delete project permanently
  async deleteProject(id: string): Promise<void> {
    const local = initLocalStorageIfNeeded();
    const item = local.find((p) => p.id === id);

    // Blacklist id and slug so it never gets resurrected
    if (item) {
      markAsDeleted(item.id, item.slug);
    } else {
      markAsDeleted(id);
    }

    if (isSupabaseConfigured()) {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(`Failed to delete project from Supabase: ${error.message}`);
      }
    }

    const filtered = local.filter((p) => p.id !== id);
    saveLocalProjects(filtered);
    localStorage.setItem(LOCAL_STORAGE_SEEDED_KEY, 'true');
  },

  // Quick toggle publication status
  async toggleProjectStatus(id: string, currentStatus: 'draft' | 'published'): Promise<'draft' | 'published'> {
    const nextStatus = currentStatus === 'published' ? 'draft' : 'published';
    await this.updateProject(id, { status: nextStatus });
    return nextStatus;
  },
};
