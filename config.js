// Configuration du stockage des inscriptions.
// Laisser vide = mode démo : les fiches sont gardées dans le navigateur (localStorage),
// donc visibles uniquement sur l'appareil qui les a saisies.
// Pour partager les fiches entre tous les visiteurs, créer un projet Supabase,
// exécuter supabase.sql, puis renseigner ces deux valeurs (Settings → API).
window.APP_CONFIG = {
  SUPABASE_URL: '',      // ex. 'https://xxxxxxxx.supabase.co'
  SUPABASE_ANON_KEY: '', // clé « anon public »
  TABLE: 'inscriptions'
};
