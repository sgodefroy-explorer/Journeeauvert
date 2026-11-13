# Journeeauvert — Site de S. Godefroy

Site statique (HTML, CSS, JS, sans build) aux couleurs de la charte **EASE** (Urbanist, bleu #1158F5).

## Pages
- `index.html` : présentation + formulaire d'inscription
- `fiches.html` : lecture des fiches des inscrits (recherche, export CSV)

## Stockage des inscriptions
- **Mode démo (par défaut)** : `config.js` vide → les fiches sont stockées dans le navigateur (localStorage), visibles uniquement sur l'appareil qui les a saisies.
- **Mode partagé (Supabase)** :
  1. Créer un projet sur supabase.com
  2. Exécuter `supabase.sql` dans le SQL Editor
  3. Renseigner `SUPABASE_URL` et `SUPABASE_ANON_KEY` dans `config.js`

⚠️ Avec la règle de lecture fournie, toute personne qui connaît l'adresse de `fiches.html` peut lire les fiches. Pour des données personnelles, réserver la lecture à des utilisateurs connectés.

## Mise en ligne
GitHub Pages : Settings → Pages → branche `main`, dossier racine.
