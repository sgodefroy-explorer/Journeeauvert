// Couche d'accès aux inscriptions : Supabase si configuré, sinon localStorage (démo).
(function () {
  const cfg = window.APP_CONFIG || {};
  const remote = Boolean(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY);
  const table = cfg.TABLE || 'inscriptions';
  const LS_KEY = 'journeeauvert.inscriptions';

  function headers() {
    return {
      apikey: cfg.SUPABASE_ANON_KEY,
      Authorization: 'Bearer ' + cfg.SUPABASE_ANON_KEY,
      'Content-Type': 'application/json'
    };
  }

  function readLocal() {
    try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; } catch (e) { return []; }
  }
  function writeLocal(list) {
    try { localStorage.setItem(LS_KEY, JSON.stringify(list)); } catch (e) {
      throw new Error("Impossible d'enregistrer dans ce navigateur.");
    }
  }

  async function add(fiche) {
    const record = Object.assign({}, fiche, { created_at: new Date().toISOString() });
    if (remote) {
      const res = await fetch(`${cfg.SUPABASE_URL}/rest/v1/${table}`, {
        method: 'POST',
        headers: Object.assign(headers(), { Prefer: 'return=minimal' }),
        body: JSON.stringify(record)
      });
      if (!res.ok) throw new Error("L'enregistrement a échoué (" + res.status + ').');
      return;
    }
    const list = readLocal();
    record.id = (crypto.randomUUID && crypto.randomUUID()) || String(Date.now());
    list.push(record);
    writeLocal(list);
  }

  async function list() {
    if (remote) {
      const res = await fetch(`${cfg.SUPABASE_URL}/rest/v1/${table}?select=*&order=created_at.desc`, { headers: headers() });
      if (!res.ok) throw new Error('Lecture impossible (' + res.status + ').');
      return res.json();
    }
    return readLocal().sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
  }

  window.Inscriptions = { add, list, remote };

  // Bandeau discret en mode démo
  document.addEventListener('DOMContentLoaded', function () {
    if (!remote) {
      const b = document.createElement('div');
      b.className = 'demo-banner';
      b.textContent = 'Mode démo : les inscriptions sont stockées uniquement dans ce navigateur.';
      document.body.prepend(b);
    }
    // Révélation au défilement
    const els = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      }), { threshold: 0.12 });
      els.forEach(el => io.observe(el));
    } else { els.forEach(el => el.classList.add('visible')); }
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  });
})();
