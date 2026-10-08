-- TeamConnect database schema for Supabase
-- Run this file in Supabase Dashboard > SQL Editor.

-- One profile row per authenticated user. The id matches Supabase Auth's user id.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  role text not null default 'Member',
  created_at timestamptz not null default now()
);

-- Messages posted by team members.
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  message text not null,
  created_at timestamptz not null default now()
);

-- File metadata. The actual file can be stored in Supabase Storage.
create table if not exists public.files (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  file_name text not null,
  file_url text,
  created_at timestamptz not null default now()
);

-- Shared work items for the team.
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  assigned_to text,
  priority text not null default 'Medium',
  status text not null default 'To Do',
  due_date date,
  created_at timestamptz not null default now()
);

-- Updates visible to the team.
create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  created_by text,
  created_at timestamptz not null default now()
);