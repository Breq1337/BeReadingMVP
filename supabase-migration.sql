-- BeReading Supabase Schema
-- Run this in Supabase SQL Editor to create all tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Schools
CREATE TABLE schools (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profiles (extends Supabase Auth)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL CHECK (role IN ('student', 'teacher', 'family', 'admin')),
  school_id UUID REFERENCES schools(id),
  grade TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Classes
CREATE TABLE classes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  grade TEXT NOT NULL,
  school_id UUID REFERENCES schools(id) NOT NULL,
  teacher_id UUID REFERENCES profiles(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Class enrollment
CREATE TABLE class_students (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  class_id UUID REFERENCES classes(id) NOT NULL,
  student_id UUID REFERENCES profiles(id) NOT NULL,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(class_id, student_id)
);

-- Family links
CREATE TABLE family_links (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  parent_id UUID REFERENCES profiles(id) NOT NULL,
  student_id UUID REFERENCES profiles(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(parent_id, student_id)
);

-- Books
CREATE TABLE books (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  cover_url TEXT,
  genre TEXT,
  total_chapters INT NOT NULL DEFAULT 1,
  description TEXT,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'challenging')),
  open_library_key TEXT,
  isbn TEXT,
  created_by UUID REFERENCES profiles(id),
  school_id UUID REFERENCES schools(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Class book assignments
CREATE TABLE class_books (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  class_id UUID REFERENCES classes(id) NOT NULL,
  book_id UUID REFERENCES books(id) NOT NULL,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  UNIQUE(class_id, book_id)
);

-- Missions
CREATE TABLE missions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  book_id UUID REFERENCES books(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('checkpoint', 'reflection', 'challenge', 'discussion')),
  chapter INT NOT NULL,
  xp_reward INT NOT NULL DEFAULT 50,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Student book progress
CREATE TABLE student_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES profiles(id) NOT NULL,
  book_id UUID REFERENCES books(id) NOT NULL,
  current_chapter INT DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  UNIQUE(student_id, book_id)
);

-- Mission completions
CREATE TABLE mission_completions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES profiles(id) NOT NULL,
  mission_id UUID REFERENCES missions(id) NOT NULL,
  response TEXT,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, mission_id)
);

-- XP & Streaks
CREATE TABLE student_stats (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES profiles(id) NOT NULL UNIQUE,
  total_xp INT DEFAULT 0,
  level INT DEFAULT 1,
  current_streak INT DEFAULT 0,
  longest_streak INT DEFAULT 0,
  books_completed INT DEFAULT 0,
  last_activity_date DATE
);

-- Badges
CREATE TABLE badges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  description TEXT NOT NULL,
  criteria TEXT
);

-- Student badges
CREATE TABLE student_badges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES profiles(id) NOT NULL,
  badge_id UUID REFERENCES badges(id) NOT NULL,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, badge_id)
);

-- Activity log
CREATE TABLE activity_log (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES profiles(id) NOT NULL,
  action TEXT NOT NULL,
  book_id UUID REFERENCES books(id),
  chapter INT,
  xp_earned INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies (basic — expand for production)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE mission_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read their own profile
CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Allow authenticated users to read books from their school
CREATE POLICY "Users can read school books" ON books
  FOR SELECT USING (
    school_id IN (SELECT school_id FROM profiles WHERE id = auth.uid())
  );

-- Allow students to read/write their own progress
CREATE POLICY "Students can manage own progress" ON student_progress
  FOR ALL USING (student_id = auth.uid());

CREATE POLICY "Students can manage own stats" ON student_stats
  FOR ALL USING (student_id = auth.uid());

-- Seed default badges
INSERT INTO badges (name, icon, description, criteria) VALUES
  ('Primeiro Capítulo', '📖', 'Completou seu primeiro checkpoint', 'first_checkpoint'),
  ('Guerreiro da Semana', '🔥', 'Sequência de 7 dias de leitura', 'streak_7'),
  ('Pensador Profundo', '🧠', 'Completou 5 missões de reflexão', 'reflections_5'),
  ('Devorador de Livros', '📚', 'Terminou seu primeiro livro', 'first_book'),
  ('Líder de Discussão', '💬', 'Participou de 3 discussões em classe', 'discussions_3'),
  ('Leitor Veloz', '⚡', 'Terminou um livro antes do prazo', 'ahead_of_schedule');
