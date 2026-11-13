// Avatars de clown illustrés (SVG), générés de façon stable à partir du nom.
// Ce ne sont pas des photos : chaque personne obtient un clown unique.
(function () {
  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  const WIGS = [['#FF6B6B', '#FFD93D'], ['#4D96FF', '#6BCB77'], ['#C77DFF', '#FF9F1C'], ['#FF5DA2', '#00C2D1'], ['#F15BB5', '#FEE440'], ['#00BBF9', '#9B5DE5']];
  const SKINS = ['#FFE0C7', '#F6D1B0', '#E8B98F', '#C98E63', '#A86B45', '#7A4A2C'];
  const HATS = ['#1158F5', '#E14B3A', '#2D2D2E', '#6BCB77', '#FF9F1C'];

  window.clownAvatar = function (seed) {
    const h = hash(String(seed || 'clown'));
    const [w1, w2] = WIGS[h % WIGS.length];
    const skin = SKINS[(h >> 3) % SKINS.length];
    const hat = HATS[(h >> 6) % HATS.length];
    const hasHat = (h >> 9) % 3 !== 0;
    const bowTie = (h >> 11) % 2 === 0;
    const eyes = (h >> 13) % 3; // 0 ronds, 1 étoiles, 2 clin d'œil
    const mouthWide = 18 + ((h >> 15) % 8);

    const eye = (cx) => {
      if (eyes === 1) return `<path d="M${cx} 40 l2 4 4 1 -3 3 1 4 -4 -2 -4 2 1 -4 -3 -3 4 -1z" fill="#2D2D2E"/>`;
      return `<circle cx="${cx}" cy="45" r="7" fill="#fff" stroke="#2D2D2E" stroke-width="1.5"/><circle cx="${cx + 1}" cy="46" r="3.2" fill="#2D2D2E"/>`;
    };
    const rightEye = eyes === 2
      ? `<path d="M56 46 q6 -6 12 0" stroke="#2D2D2E" stroke-width="2.5" fill="none" stroke-linecap="round"/>`
      : eye(62);

    return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Avatar clown">
      <rect width="100" height="100" rx="22" fill="#F5F5F5"/>
      <circle cx="20" cy="46" r="14" fill="${w1}"/><circle cx="14" cy="60" r="12" fill="${w2}"/><circle cx="22" cy="72" r="10" fill="${w1}"/>
      <circle cx="80" cy="46" r="14" fill="${w1}"/><circle cx="86" cy="60" r="12" fill="${w2}"/><circle cx="78" cy="72" r="10" fill="${w1}"/>
      <ellipse cx="50" cy="56" rx="28" ry="30" fill="${skin}"/>
      <ellipse cx="38" cy="45" rx="10" ry="12" fill="#fff" opacity=".85"/>
      <ellipse cx="62" cy="45" rx="10" ry="12" fill="#fff" opacity=".85"/>
      ${eye(38)}${rightEye}
      <path d="M50 ${68 - 2} q-${mouthWide} 0 -${mouthWide - 4} -6 q${mouthWide - 4} ${16} ${2 * mouthWide - 8} 0 q4 6 -${mouthWide - 4} 6z" fill="#E14B3A"/>
      <path d="M${50 - mouthWide + 8} 66 q${mouthWide - 8} 9 ${2 * mouthWide - 16} 0" stroke="#fff" stroke-width="2" fill="none"/>
      <circle cx="50" cy="56" r="7.5" fill="#E14B3A"/><circle cx="47.5" cy="53.5" r="2" fill="#fff" opacity=".7"/>
      <circle cx="30" cy="60" r="4" fill="#FF8FA3" opacity=".6"/><circle cx="70" cy="60" r="4" fill="#FF8FA3" opacity=".6"/>
      ${hasHat ? `<path d="M36 28 L50 4 L64 28 Z" fill="${hat}"/><circle cx="50" cy="5" r="4" fill="${w2}"/><rect x="32" y="26" width="36" height="5" rx="2.5" fill="${w1}"/>` : `<circle cx="50" cy="24" r="10" fill="${w2}"/><circle cx="38" cy="28" r="8" fill="${w1}"/><circle cx="62" cy="28" r="8" fill="${w1}"/>`}
      ${bowTie ? `<path d="M50 90 L38 84 L38 98 Z M50 90 L62 84 L62 98 Z" fill="${hat}"/><circle cx="50" cy="91" r="3" fill="${w2}"/>` : ''}
    </svg>`;
  };
})();
