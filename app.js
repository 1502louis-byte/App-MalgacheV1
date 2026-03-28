// STATE INITIAL
const S = {
  page: 'home', subPage: null, activeTheme: null,
  fc: { words: [], idx: 0, flipped: false, showPhonetic: false, known: [], unknown: [], done: false },
  ex: { started: false, difficulty: 1, themeFilter: 'all', questions: [], qIdx: 0, selected: null, score: 0, done: false, aiLoading: false },
  gr: { selectedLesson: null },
  xp: parseInt(localStorage.getItem('mg_xp') || '0'),
  theme: localStorage.getItem('mg_theme') || 'light'
};

document.documentElement.setAttribute('data-theme', S.theme);

function toggleTheme() {
  S.theme = S.theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('mg_theme', S.theme);
  document.documentElement.setAttribute('data-theme', S.theme);
}

// === Ajoute ici tes fonctions existantes : navigate(), renderHome(), renderVocab()... ===

// Nouvelle fonction d'interface pour les paramètres
function renderSettings() {
  return `
    <div class="page-header"><div class="page-title">⚙️ Réglages</div></div>
    <div style="margin: 20px 0 10px; font-size: 13px; font-weight: 600; color: var(--muted); text-transform: uppercase;">Affichage</div>
    <div class="settings-list">
      <div class="setting-item">
        <div>
          <div class="setting-title">Mode Sombre</div>
          <div class="setting-sub">Adapter l'interface</div>
        </div>
        <label class="switch">
          <input type="checkbox" ${S.theme === 'dark' ? 'checked' : ''} onchange="toggleTheme()">
          <span class="slider"></span>
        </label>
      </div>
    </div>
  `;
}

// Remplace la génération d'IA en ligne par le générateur local
function startAiExercise() {
  const count = 10;
  S.ex.aiLoading = true;
  S.subPage = 'exercise-run';
  render();

  setTimeout(() => {
    let pool = [];
    Object.values(THEMES).forEach(t => pool.push(...t.words.map(w => ({...w, theme: t.label}))));
    const shuffledPool = pool.sort(() => 0.5 - Math.random());
    const questions = [];

    for (let i = 0; i < Math.min(count, shuffledPool.length); i++) {
      const word = shuffledPool[i];
      const isMgToFr = Math.random() > 0.5;
      const wrongAnswers = pool.filter(w => w.mg !== word.mg).sort(() => 0.5 - Math.random()).slice(0, 3).map(w => isMgToFr ? w.fr : w.mg);

      questions.push({
        type: isMgToFr ? 'mg_to_fr' : 'fr_to_mg',
        q: isMgToFr ? `Que signifie "${word.mg}" ?` : `Comment dit-on "${word.fr}" ?`,
        answer: isMgToFr ? word.fr : word.mg,
        theme: word.theme,
        choices: [isMgToFr ? word.fr : word.mg, ...wrongAnswers].sort(() => 0.5 - Math.random())
      });
    }

    S.ex = { ...S.ex, aiLoading: false, questions, qIdx: 0, selected: null, score: 0, done: false };
    render();
  }, 800);
}

// Enregistrement du Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}

render();