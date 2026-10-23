import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl && 
    supabaseAnonKey && 
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('your-project-id')
  );
};

// Create the Supabase client only when valid keys exist, or fallback safely
export const supabase: SupabaseClient = isSupabaseConfigured()
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : (createClient('https://placeholder-talha.supabase.co', 'placeholder-key', {
      auth: { persistSession: false },
    }));

export interface DatabaseProject {
  id: string;
  slug: string;
  name: string;
  title: string;
  category: string;
  type: string;
  tag: string;
  description: string;
  full_overview: string;
  client: string;
  timeline: string;
  role: string;
  status: 'draft' | 'published';
  featured: boolean;
  technologies: string[];
  key_features: string[];
  architecture_points: string[];
  preview_image: string | null;
  live_url: string | null;
  github_url: string | null;
  access_label: string;
  created_at: string;
  updated_at: string;
}
