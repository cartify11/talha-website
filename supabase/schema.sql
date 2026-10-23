-- ==============================================================================
-- TALHA PORTFOLIO: SUPABASE DATABASE SCHEMA & ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
-- Run this script in your Supabase project's SQL Editor (https://app.supabase.com)
-- It will create:
--   1. The `projects` table with all metadata fields
--   2. Automatic updated_at timestamp triggers
--   3. Row Level Security (RLS) policies protecting CRUD operations
--   4. Storage bucket `project-previews` for uploaded project preview images
-- ==============================================================================

-- 1. Create Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('AI Solutions', 'Web Apps', 'Mobile Apps', 'Enterprise', 'Extensions', 'E-Commerce', 'Other')),
    type TEXT NOT NULL CHECK (type IN ('Website', 'Web Application', 'Desktop Software', 'Mobile App', 'Browser Extension', 'Plugin', 'Other', 'AI Knowledge Platform', 'AI Platform', 'Enterprise System')),
    tag TEXT NOT NULL DEFAULT 'Project',
    description TEXT NOT NULL,
    full_overview TEXT NOT NULL,
    client TEXT DEFAULT 'Confidential',
    timeline TEXT DEFAULT 'Production',
    role TEXT DEFAULT 'Lead Developer',
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    featured BOOLEAN DEFAULT false,
    technologies JSONB NOT NULL DEFAULT '[]'::jsonb,
    key_features JSONB NOT NULL DEFAULT '[]'::jsonb,
    architecture_points JSONB NOT NULL DEFAULT '[]'::jsonb,
    preview_image TEXT,
    live_url TEXT,
    github_url TEXT,
    access_label TEXT NOT NULL DEFAULT 'View Live Project ↗',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_projects_updated_at ON public.projects;
CREATE TRIGGER set_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Policy 1: Anyone (Public / Anonymous) can SELECT only PUBLISHED projects
DROP POLICY IF EXISTS "Public can view published projects" ON public.projects;
CREATE POLICY "Public can view published projects"
    ON public.projects
    FOR SELECT
    USING (status = 'published');

-- Policy 2: Authenticated Administrators have full access (SELECT, INSERT, UPDATE, DELETE)
DROP POLICY IF EXISTS "Admins have full access to all projects" ON public.projects;
CREATE POLICY "Admins have full access to all projects"
    ON public.projects
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 4. Storage Bucket Setup for Project Preview Images
-- Create public bucket if not already existing
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-previews', 'project-previews', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Policy 1: Anyone can view preview images in the project-previews bucket
DROP POLICY IF EXISTS "Public can view project preview images" ON storage.objects;
CREATE POLICY "Public can view project preview images"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'project-previews');

-- Storage Policy 2: Only authenticated administrators can upload project preview images
DROP POLICY IF EXISTS "Admins can upload project preview images" ON storage.objects;
CREATE POLICY "Admins can upload project preview images"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'project-previews');

-- Storage Policy 3: Only authenticated administrators can update project preview images
DROP POLICY IF EXISTS "Admins can update project preview images" ON storage.objects;
CREATE POLICY "Admins can update project preview images"
    ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (bucket_id = 'project-previews');

-- Storage Policy 4: Only authenticated administrators can delete project preview images
DROP POLICY IF EXISTS "Admins can delete project preview images" ON storage.objects;
CREATE POLICY "Admins can delete project preview images"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (bucket_id = 'project-previews');
