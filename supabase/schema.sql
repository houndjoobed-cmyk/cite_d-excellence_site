-- ========================================================
-- SCRIPT SQL D'INITIALISATION - BASE DE DONNÉES HOUEKIN MINISTRIES
-- Copiez-collez ce script dans l'Éditeur SQL de votre projet Supabase
-- ========================================================

-- 1. TABLE PRÉDICATIONS (SERMONS)
CREATE TABLE IF NOT EXISTS public.sermons (
  id VARCHAR(100) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  preacher VARCHAR(255) NOT NULL,
  date VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL DEFAULT 'Vidéo',
  thumbnail TEXT NOT NULL,
  duration VARCHAR(50) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. TABLE PROGRAMMES & CULTES (PROGRAMS)
CREATE TABLE IF NOT EXISTS public.programs (
  id VARCHAR(100) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  day VARCHAR(50) NOT NULL,
  time VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(50) DEFAULT 'church',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TABLE MESSAGES & PRIÈRES (MESSAGES)
CREATE TABLE IF NOT EXISTS public.messages (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'Non lu',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. TABLE ANNUAIRE & CARTES DES FIDÈLES (CHURCH_MEMBERS)
CREATE TABLE IF NOT EXISTS public.church_members (
  id VARCHAR(100) PRIMARY KEY,
  member_number VARCHAR(50) UNIQUE NOT NULL, -- ex: HM-2026-0042
  last_name VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  gender VARCHAR(20) NOT NULL,               -- Homme / Femme
  birth_date VARCHAR(50) NOT NULL,
  photo_url TEXT,
  marital_status VARCHAR(50) NOT NULL,       -- Célibataire, Marié(e), Veuf/Veuve, Divorcé(e)
  profession VARCHAR(255) NOT NULL,
  education_level VARCHAR(100),              -- Optionnel
  address TEXT NOT NULL,
  neighborhood VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  emergency_contact VARCHAR(255) NOT NULL,   -- Nom & Tél d'urgence
  church_arrival_date VARCHAR(50),           -- Optionnel
  department VARCHAR(255),                   -- Optionnel
  cell_leader VARCHAR(255),                  -- Optionnel
  cell_group VARCHAR(255),                   -- Optionnel
  baptism_date VARCHAR(50),                  -- Optionnel
  conversion_date VARCHAR(50),               -- Optionnel
  spiritual_gifts TEXT,                      -- Optionnel
  status VARCHAR(50) DEFAULT 'Membre Actif', -- Nouveau / Membre Actif / Ancien
  registration_date VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. TABLE PARAMÈTRES ÉGLISE (SETTINGS)
CREATE TABLE IF NOT EXISTS public.settings (
  id VARCHAR(100) PRIMARY KEY DEFAULT 'default',
  church_name VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  whatsapp VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  mtn_number VARCHAR(50) NOT NULL,
  moov_number VARCHAR(50) NOT NULL,
  bank_rib VARCHAR(255) NOT NULL,
  bank_iban VARCHAR(255) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ACTIVER ROW LEVEL SECURITY (RLS)
ALTER TABLE public.sermons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.church_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- POLITIQUES D'ACCÈS PUBLIC
CREATE POLICY "Accès public en lecture sermons" ON public.sermons FOR SELECT USING (true);
CREATE POLICY "Accès public en écriture sermons" ON public.sermons FOR ALL USING (true);

CREATE POLICY "Accès public en lecture programs" ON public.programs FOR SELECT USING (true);
CREATE POLICY "Accès public en écriture programs" ON public.programs FOR ALL USING (true);

CREATE POLICY "Accès public écriture messages" ON public.messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Accès public lecture messages" ON public.messages FOR SELECT USING (true);

CREATE POLICY "Accès public écriture church_members" ON public.church_members FOR ALL USING (true);
CREATE POLICY "Accès public lecture church_members" ON public.church_members FOR SELECT USING (true);

CREATE POLICY "Accès public lecture settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Accès public mise à jour settings" ON public.settings FOR ALL USING (true);
