-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum for roles
CREATE TYPE user_role AS ENUM ('STUDENT', 'RECRUITER', 'TNP', 'ADMIN');

-- Enum for student states
CREATE TYPE student_state AS ENUM (
    'REGISTERED',
    'PROFILE_COMPLETED',
    'PENDING_VERIFICATION',
    'VERIFIED',
    'REJECTED',
    'PLACED'
);

-- Enum for job states
CREATE TYPE job_state AS ENUM (
    'DRAFT',
    'SUBMITTED',
    'APPROVED',
    'PUBLISHED',
    'CLOSED',
    'ARCHIVED'
);

-- Enum for application states
CREATE TYPE application_state AS ENUM (
    'APPLIED',
    'SHORTLISTED',
    'INTERVIEW_SCHEDULED',
    'INTERVIEWED',
    'HR_ROUND',
    'OFFERED',
    'ACCEPTED',
    'REJECTED'
);

-- TABLE: colleges
CREATE TABLE public.colleges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert a default college (optional, but good for testing)
INSERT INTO public.colleges (id, name) VALUES (uuid_generate_v4(), 'National Institute of Technology, Kurukshetra') ON CONFLICT DO NOTHING;

-- TABLE: companies
CREATE TABLE public.companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    website TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- TABLE: profiles
-- Extending auth.users with custom attributes for our platform.
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    role user_role NOT NULL,

    -- Student Specific
    college_id UUID REFERENCES public.colleges(id),
    cgpa NUMERIC(4,2),
    branch TEXT,
    graduation_year INTEGER,
    student_state student_state DEFAULT 'REGISTERED',
    verified_by UUID REFERENCES public.profiles(id),
    verified_at TIMESTAMP WITH TIME ZONE,

    -- Recruiter Specific
    company_id UUID REFERENCES public.companies(id),
    recruiter_verified BOOLEAN DEFAULT false,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Trigger to create a profile automatically when a user signs up via Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'name',
    CAST(COALESCE(new.raw_user_meta_data->>'role', 'STUDENT') AS user_role)
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop the trigger if it exists before creating it (useful for re-runs)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- TABLE: jobs
CREATE TABLE public.jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recruiter_id UUID REFERENCES public.profiles(id),
    college_id UUID REFERENCES public.colleges(id),
    posted_by_tnp_id UUID REFERENCES public.profiles(id),

    title TEXT NOT NULL,
    description TEXT NOT NULL,
    branches TEXT[], -- Array of strings

    min_cgpa NUMERIC(4,2),
    location TEXT,

    state job_state DEFAULT 'DRAFT' NOT NULL,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- TABLE: applications
CREATE TABLE public.applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE NOT NULL,
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,

    state application_state DEFAULT 'APPLIED' NOT NULL,

    applied_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

    UNIQUE(job_id, student_id)
);

-- TABLE: interviews
CREATE TABLE public.interviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE NOT NULL,

    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    mode TEXT, -- online/offline
    meeting_link TEXT,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);


-- ROW LEVEL SECURITY (RLS) POLICIES

-- Enable RLS on all tables
ALTER TABLE public.colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;

-- Profiles:
-- Everyone can read profiles
CREATE POLICY "Profiles are viewable by everyone"
ON public.profiles FOR SELECT USING (true);
-- Users can update their own profile
CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Colleges:
-- Everyone can view colleges
CREATE POLICY "Colleges are viewable by everyone"
ON public.colleges FOR SELECT USING (true);
-- Only TNP/ADMIN can insert/update colleges
CREATE POLICY "TNP can insert colleges"
ON public.colleges FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('TNP', 'ADMIN')));

-- Companies:
-- Everyone can view companies
CREATE POLICY "Companies are viewable by everyone"
ON public.companies FOR SELECT USING (true);
-- Recruiter/TNP/ADMIN can insert
CREATE POLICY "Recruiters and TNP can insert companies"
ON public.companies FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('RECRUITER', 'TNP', 'ADMIN')));

-- Jobs:
-- Everyone can view published/approved jobs
CREATE POLICY "Published jobs viewable by everyone"
ON public.jobs FOR SELECT USING (state IN ('PUBLISHED', 'APPROVED', 'CLOSED'));
-- Recruiters can view/edit their own jobs
CREATE POLICY "Recruiters can view their jobs"
ON public.jobs FOR SELECT USING (recruiter_id = auth.uid());
CREATE POLICY "Recruiters can insert jobs"
ON public.jobs FOR INSERT WITH CHECK (recruiter_id = auth.uid());
CREATE POLICY "Recruiters can update their jobs"
ON public.jobs FOR UPDATE USING (recruiter_id = auth.uid());
-- TNP can view/edit all jobs
CREATE POLICY "TNP can view all jobs"
ON public.jobs FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('TNP', 'ADMIN')));
CREATE POLICY "TNP can update all jobs"
ON public.jobs FOR UPDATE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('TNP', 'ADMIN')));

-- Applications:
-- Students can view their own applications
CREATE POLICY "Students can view their own applications"
ON public.applications FOR SELECT USING (student_id = auth.uid());
-- Students can insert their own applications
CREATE POLICY "Students can insert their own applications"
ON public.applications FOR INSERT WITH CHECK (student_id = auth.uid());
-- Recruiters can view applications for their jobs
CREATE POLICY "Recruiters can view applications for their jobs"
ON public.applications FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.jobs WHERE id = applications.job_id AND recruiter_id = auth.uid())
);
-- Recruiters can update applications for their jobs (e.g., state change)
CREATE POLICY "Recruiters can update applications for their jobs"
ON public.applications FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.jobs WHERE id = applications.job_id AND recruiter_id = auth.uid())
);
-- TNP can view and update all applications
CREATE POLICY "TNP can view all applications"
ON public.applications FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('TNP', 'ADMIN')));
CREATE POLICY "TNP can update all applications"
ON public.applications FOR UPDATE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('TNP', 'ADMIN')));

-- Interviews:
-- Students can view interviews linked to their applications
CREATE POLICY "Students can view their interviews"
ON public.interviews FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.applications WHERE id = interviews.application_id AND student_id = auth.uid())
);
-- Recruiters can view/insert/update interviews for their jobs
CREATE POLICY "Recruiters can view interviews"
ON public.interviews FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.applications a JOIN public.jobs j ON a.job_id = j.id WHERE a.id = interviews.application_id AND j.recruiter_id = auth.uid())
);
CREATE POLICY "Recruiters can insert interviews"
ON public.interviews FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.applications a JOIN public.jobs j ON a.job_id = j.id WHERE a.id = application_id AND j.recruiter_id = auth.uid())
);
CREATE POLICY "TNP can view all interviews"
ON public.interviews FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('TNP', 'ADMIN')));
