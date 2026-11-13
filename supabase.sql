-- Table des inscriptions (à exécuter dans Supabase → SQL Editor)
create table if not exists public.inscriptions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  prenom text not null,
  nom text not null,
  email text not null,
  telephone text,
  entreprise text,
  fonction text,
  participation text,
  message text,
  consentement boolean not null default false
);

alter table public.inscriptions enable row level security;

-- Tout visiteur peut s'inscrire
create policy "inscription publique" on public.inscriptions
  for insert to anon with check (consentement = true);

-- Lecture des fiches : ATTENTION, cette règle rend les fiches lisibles par
-- toute personne qui connaît l'adresse du site. Pour des données personnelles,
-- préférer réserver la lecture aux utilisateurs connectés (to authenticated).
create policy "lecture des fiches" on public.inscriptions
  for select to anon using (true);
