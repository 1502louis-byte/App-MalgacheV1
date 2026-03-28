const S = {
  page: 'home', subPage: null, activeTheme: null,
  fc: { words: [], idx: 0, flipped: false, showPhonetic: false, known: [], unknown: [], done: false },
  ex: { started: false, difficulty: 1, themeFilter: 'all', questions: [], qIdx: 0, selected: null, score: 0, done: false, aiLoading: false },
  gr: { selectedLesson: null },
  xp: parseInt(localStorage.getItem('mg_xp') || '0'),
  theme: localStorage.getItem('mg_theme') || 'light'
};

document.documentElement.setAttribute('data-theme', S.theme);

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function toggleTheme() {
  S.theme = S.theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('mg_theme', S.theme);
  document.documentElement.setAttribute('data-theme', S.theme);
}

function navigate(page) {
  S.page = page; S.subPage = null;
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('nav-' + page).classList.add('active');
  render();
}

function render() {
  const el = document.getElementById('main-screen');
  const navEl = document.getElementById('nav');
  const hideNav = ['flashcard', 'lesson-detail', 'exercise-run', 'exercise-result'].includes(S.subPage);
  navEl.style.display = hideNav ? 'none' : 'flex';

  if (S.page === 'home') el.innerHTML = renderHome();
  else if (S.page === 'vocab' && !S.subPage) el.innerHTML = renderVocab();
  else if (S.subPage === 'flashcard') el.innerHTML = renderFlashcard();
  else if (S.page === 'grammar' && !S.subPage) el.innerHTML = renderGrammar();
  else if (S.subPage === 'lesson-detail') el.innerHTML = renderLessonDetail();
  else if (S.page === 'exercise' && !S.subPage) el.innerHTML = renderExerciseSetup();
  else if (S.subPage === 'exercise-run') el.innerHTML = renderExerciseRun();
  else if (S.subPage === 'exercise-result') el.innerHTML = renderExerciseResult();
  else if (S.page === 'settings') el.innerHTML = renderSettings();
}

function renderHome() {
  return `
    <div class="page-header"><div class="page-title">Malgache 🇲🇬</div></div>
    <div class="menu-grid">
      <div class="menu-card" onclick="navigate('vocab')">
        <span class="menu-card-icon">📚</span>
        <span class="menu-card-title">Vocabulaire</span>
      </div>
      <div class="menu-card" onclick="navigate('grammar')">
        <span class="menu-card-icon">📝</span>
        <span class="menu-card-title">Grammaire</span>
      </div>
    </div>
    <div class="tip-box">💡 Pratique 5 minutes par jour !</div>
  `;
}

function renderVocab() {
  const cards = Object.entries(THEMES).map(([key, th]) => `
    <div class="theme-card" onclick="openFlashcard('${key}')">
      <span class="theme-card-icon">${th.icon}</span>
      <div class="theme-card-info">
        <div class="theme-card-title" style="color:${th.color}">${th.label}</div>
        <div class="theme-card-sub">${th.words.length} mots</div>
      </div>
    </div>`).join('');
  return `<div class="page-header"><div class="page-title">Vocabulaire</div></div>${cards}`;
}

function openFlashcard(themeKey) {
  S.activeTheme = themeKey;
  S.fc = { words: shuffle(THEMES[themeKey].words), idx: 0, flipped: false, known: [], unknown: [], done: false };
  S.subPage = 'flashcard';
  render();
}

function renderFlashcard() {
  const fc = S.fc;
  if (fc.done) return `<div class="result"><div class="result-emoji">🏆</div><h2>Terminé !</h2><button class="btn-primary" onclick="navigate('vocab')">Retour</button></div>`;
  const word = fc.words[fc.idx];
  return `
    <div class="back-bar">
      <button class="back-btn" onclick="navigate('vocab')">← Retour</button>
      <span class="back-title">${fc.idx + 1}/${fc.words.length}</span>
    </div>
    <div class="card" onclick="S.fc.flipped = !S.fc.flipped; render()">
      ${!fc.flipped ? `
        <div class="card-lang">Malgache</div>
        <div class="card-word">${word.mg}</div>
        <div class="card-phonetic">Toucher pour voir</div>
      ` : `
        <div class="card-lang">Français</div>
        <div class="card-word">${word.fr}</div>
        <div class="card-translation">${word.mg}</div>
        <div class="card-phonetic">/${word.ph}/</div>
      `}
    </div>
    ${fc.flipped ? `
      <div class="fc-actions">
        <button class="fc-btn fc-btn-bad" onclick="fcAnswer(false)">À revoir</button>
        <button class="fc-btn fc-btn-good" onclick="fcAnswer(true)">Je sais</button>
      </div>` : ''}
  `;
}

function fcAnswer(k) { S.fc.idx++; if(S.fc.idx >= S.fc.words.length) S.fc.done = true; S.fc.flipped = false; render(); }

function renderGrammar() {
  const rows = GRAMMAR_LESSONS.map(l => `<div class="lesson-row" onclick="S.gr.selectedLesson='${l.id}'; S.subPage='lesson-detail'; render()"><span style="font-size:24px">${l.icon}</span><div class="lesson-title" style="color:${l.color}">${l.title}</div></div>`).join('');
  return `<div class="page-header"><div class="page-title">Grammaire</div></div>${rows}`;
}

function renderLessonDetail() {
  const l = GRAMMAR_LESSONS.find(x => x.id === S.gr.selectedLesson);
  const html = l.content.map(c => c.type === 'text' ? `<p>${c.text.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')}</p>` : `<div style="background:var(--surf2);padding:10px;border-radius:10px;margin:8px 0"><b>${c.mg}</b><br>${c.fr}</div>`).join('');
  return `<div class="back-bar"><button class="back-btn" onclick="navigate('grammar')">← Retour</button></div><div class="lesson-content">${html}</div>`;
}

function renderExerciseSetup() {
  return `
    <div class="page-header"><div class="page-title">Exercices</div></div>
    <div class="ai-box">
      <div style="font-weight:700; margin-bottom:10px;">Générateur de Quiz</div>
      <button class="btn-primary" onclick="startAiExercise()">🚀 Démarrer 10 questions</button>
    </div>
  `;
}

function startAiExercise() {
  S.ex.aiLoading = true; S.subPage = 'exercise-run'; render();
  setTimeout(() => {
    let pool = []; Object.values(THEMES).forEach(t => pool.push(...t.words));
    pool = shuffle(pool); const qs = [];
    for (let i = 0; i < Math.min(10, pool.length); i++) {
      let isMg = Math.random() > 0.5; let w = pool[i];
      let wrongs = pool.filter(x => x.mg !== w.mg).slice(0,3).map(x => isMg ? x.fr : x.mg);
      qs.push({q: isMg ? `Signification de "${w.mg}" ?` : `Traduction de "${w.fr}" ?`, ans: isMg ? w.fr : w.mg, choices: shuffle([isMg ? w.fr : w.mg, ...wrongs])});
    }
    S.ex = { ...S.ex, aiLoading: false, questions: qs, qIdx: 0, selected: null, done: false }; render();
  }, 500);
}

function renderExerciseRun() {
  if (S.ex.aiLoading) return `<div class="result"><h2>Création du quiz...</h2></div>`;
  if (S.ex.done) return renderExerciseResult();
  const q = S.ex.questions[S.ex.qIdx];
  return `
    <div class="back-bar"><button class="back-btn" onclick="navigate('exercise')">← Quitter</button></div>
    <div class="q-card"><h2 class="q-text">${q.q}</h2></div>
    ${q.choices.map(c => {
      let cls = 'choice'; if (S.ex.selected) { if (c === q.ans) cls += ' correct'; else if (c === S.ex.selected) cls += ' wrong'; }
      return `<button class="${cls}" onclick="ansEx('${c.replace(/'/g,"\\'")}')" ${S.ex.selected ? 'disabled':''}>${c}</button>`;
    }).join('')}
  `;
}

function ansEx(c) { S.ex.selected = c; render(); setTimeout(() => { S.ex.qIdx++; S.ex.selected = null; if(S.ex.qIdx >= S.ex.questions.length) S.ex.done = true; render(); }, 1000); }

function renderExerciseResult() { return `<div class="result"><h2>Quiz terminé !</h2><button class="btn-primary" onclick="navigate('exercise')">Terminer</button></div>`; }

function renderSettings() {
  return `
    <div class="page-header"><div class="page-title">Réglages</div></div>
    <div class="settings-list">
      <div class="setting-item">
        <div><div class="setting-title">Mode Sombre</div></div>
        <label class="switch"><input type="checkbox" ${S.theme === 'dark' ? 'checked' : ''} onchange="toggleTheme()"><span class="slider"></span></label>
      </div>
    </div>
  `;
}

if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});
render();
