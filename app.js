// Supabase setup
const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY';
const supabaseClient = SUPABASE_URL.includes('YOUR_') ? null : supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const toxicWords = ['נוכל', 'חלש', 'זבל', 'בושה', 'רך', 'fraud', 'trash'];
const sampleMessages = [
  { name: 'AceHunter', content: 'מגיש לכם עשן לקפה של הבוקר', likes: 9 },
  { name: 'SpinDoctor', content: 'הבק-הנד שלך ממומן על ידי תקווה', likes: 14 },
  { name: 'NetGoblin', content: 'אזהרת נוכל במגרש 2', likes: 7 },
];

const pairs = [
  { id: 1, name: 'לוס לובוס', desc: 'מעולם לא פגשו סרט רשת שלא אהבו.', stats: { skill: 92, ego: 74, trash: 81, clutch: 88 } },
  { id: 2, name: 'נינג\'ות הרשת', desc: 'מתנקשות שקטות בלי רחמים.', stats: { skill: 89, ego: 52, trash: 63, clutch: 90 } },
  { id: 3, name: 'סמאש ברוס', desc: 'צועקים "K.O" אחרי כל נקודה.', stats: { skill: 84, ego: 78, trash: 76, clutch: 72 } },
  { id: 4, name: 'מאפיית הדרופ', desc: 'מרחפים כמו לוב, עוקצים כמו דרופ.', stats: { skill: 80, ego: 60, trash: 70, clutch: 69 } },
  { id: 5, name: 'בודקי הוויב', desc: 'הפלייליסט חזק מהסרוויס.', stats: { skill: 77, ego: 85, trash: 82, clutch: 65 } },
  { id: 6, name: 'שודדי הבייסליין', desc: 'גונבים זמן ומגרסים ראלי.', stats: { skill: 83, ego: 55, trash: 58, clutch: 74 } },
];

const schedule = [
  { round: 'רבע גמר', matches: [
    { a: 'לוס לובוס', b: 'שודדי הבייסליין', time: '13:00', court: 'A', live: false },
    { a: 'נינג\'ות הרשת', b: 'בודקי הוויב', time: '14:00', court: 'B', live: true },
  ]},
  { round: 'חצי גמר', matches: [
    { a: 'מנצחי רבע 1', b: 'מנצחי רבע 2', time: '16:00', court: 'מרכזי', live: false },
  ]},
  { round: 'גמר', matches: [
    { a: 'מנצחי חצי', b: 'מנצחי חצי', time: '18:00', court: 'מרכזי', live: false },
  ]},
];

const standings = [
  { pair: 'לוס לובוס', wins: 3, gameDiff: 12, gamesWon: 48, form: 'נננ' },
  { pair: 'נינג\'ות הרשת', wins: 3, gameDiff: 9, gamesWon: 44, form: 'ננל' },
  { pair: 'סמאש ברוס', wins: 2, gameDiff: 4, gamesWon: 36, form: 'נלנ' },
  { pair: 'בודקי הוויב', wins: 1, gameDiff: -2, gamesWon: 29, form: 'לנל' },
  { pair: 'מאפיית הדרופ', wins: 1, gameDiff: -6, gamesWon: 24, form: 'ללנ' },
  { pair: 'שודדי הבייסליין', wins: 0, gameDiff: -10, gamesWon: 18, form: 'ללל' },
];

const articles = [
  { title: 'נינג\'ות הרשת מתאמנות עם כיסוי עיניים', tone: 'כי לראות את הכדור זה אוברייטד.', author: 'צוות הזירה' },
  { title: 'לוס לובוס מגישים תלונת רעש נגד עצמם', tone: 'היללות שלהם חזקות מדי.', author: 'צוות הזירה' },
  { title: 'בודקי הוויב מוסיפים DJ לספסל', tone: 'המאמן אומר שהפלייליסט הוא הפלייבוק.', author: 'צוות הזירה' },
  { title: 'מאפיית הדרופ בחקירה', tone: 'לכאורה שיחדו את כוח הכבידה.', author: 'צוות הזירה' },
];

const rankings = [
  { pair: 'לוס לובוס', blurb: 'אנרגיית אלפא + כישוף ספין.' },
  { pair: 'נינג\'ות הרשת', blurb: 'דרופ-וולי שנעלם. גם נינג\'ות.' },
  { pair: 'סמאש ברוס', blurb: 'גם בלי שלט הם מנצחים.' },
  { pair: 'בודקי הוויב', blurb: 'מנצחים או לא – הפלייליסט שולט.' },
  { pair: 'מאפיית הדרופ', blurb: 'כוח הכבידה הוא בן הזוג שלהם.' },
  { pair: 'שודדי הבייסליין', blurb: 'גונבים זמן, לא מערכות.' },
];

const insults = [
  'הסרב שלך עם פינג של וייפי.',
  'אתה מתחמם יותר חזק ממה שאתה משחק.',
  'רגליים בחסות חול טובעני.',
  'הבק-הנד שלך שמועה בלבד.',
  'אפילו הכדור רוצה חילוף.',
  'המאמן ביקש "תפתיע אותם" לא "תפתיע אותי".',
];

function highlightToxic(text) {
  let clean = text;
  toxicWords.forEach(word => {
    const reg = new RegExp(`(${word})`, 'ig');
    clean = clean.replace(reg, '<span class="badge-toxic">$1</span>');
  });
  return clean;
}

function renderCountdown() {
  const el = document.getElementById('countdown');
  if (!el) return;
  const target = new Date('2026-04-04T15:00:00+03:00').getTime();
  const tick = () => {
    const now = Date.now();
    const diff = target - now;
    if (diff <= 0) { el.textContent = 'בלייב עכשיו'; return; }
    const h = Math.floor(diff / 3.6e6);
    const m = Math.floor((diff % 3.6e6) / 6e4);
    const s = Math.floor((diff % 6e4) / 1000);
    el.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  };
  tick();
  setInterval(tick, 1000);
}

function renderHomeFeed() {
  const feed = document.getElementById('live-trash');
  const pollPreview = document.getElementById('poll-preview');
  if (feed) {
    feed.innerHTML = sampleMessages.map(m => `
      <div class="text-sm flex justify-between items-center">
        <div><span class="text-neon font-semibold">${m.name}</span> <span class="text-white/60">${highlightToxic(m.content)}</span></div>
        <span class="text-xs text-white/50">❤ ${m.likes}</span>
      </div>`).join('');
  }
  if (pollPreview) {
    pollPreview.innerHTML = pairs.slice(0,3).map(p => `
      <div class="flex justify-between items-center">
        <span>${p.name}</span>
        <span class="text-electric text-xs">פייבוריט?</span>
      </div>`).join('');
  }
}

function renderTrashArena() {
  const feed = document.getElementById('trash-feed');
  const leaders = document.getElementById('leaders');
  if (!feed) return;
  const render = msgs => {
    feed.innerHTML = msgs.map((m, idx) => `
      <div class="message">
        <div class="flex justify-between items-center">
          <span class="text-neon font-semibold">${m.name}</span>
          <button class="text-xs like-btn" data-idx="${idx}">❤ ${m.likes || 0}</button>
        </div>
        <p class="text-white/80" >${highlightToxic(m.content)}</p>
      </div>`).join('');
  };
  render(sampleMessages);

  const likeHandler = e => {
    if (!e.target.classList.contains('like-btn')) return;
    const idx = Number(e.target.dataset.idx);
    sampleMessages[idx].likes = (sampleMessages[idx].likes || 0) + 1;
    render(sampleMessages);
    pushLike(sampleMessages[idx]);
  };
  feed.addEventListener('click', likeHandler);

  const sendBtn = document.getElementById('send-message');
  const nameInput = document.getElementById('name-input');
  const msgInput = document.getElementById('message-input');
  sendBtn?.addEventListener('click', async () => {
    const name = nameInput.value.trim() || 'אנונימי';
    const content = msgInput.value.trim();
    if (!content) return;
    const entry = { name, content, likes: 0 };
    sampleMessages.unshift(entry);
    render(sampleMessages);
    msgInput.value = '';
    nameInput.value = name;
    leaders && updateLeaders(leaders);
    await pushMessage(entry);
  });

  document.getElementById('generate-trash')?.addEventListener('click', () => {
    const rand = insults[Math.floor(Math.random()*insults.length)];
    msgInput.value = rand;
  });

  updateLeaders(leaders);
  subscribeMessages(render, leaders);
}

function updateLeaders(container) {
  if (!container) return;
  const topTalker = [...sampleMessages].sort((a,b) => (b.likes||0) - (a.likes||0))[0];
  const hottest = sampleMessages.find(m => toxicWords.some(w => m.content.toLowerCase().includes(w)));
  container.innerHTML = `
    <div class="flex justify-between"><span>הקנטן מוביל</span><span class="text-neon font-semibold">${topTalker?.name || '-'} (${topTalker?.likes||0}❤)</span></div>
    <div class="flex justify-between"><span>הכי רעיל</span><span class="text-blood">${hottest?.name || 'ממתין'}</span></div>
  `;
}

function renderPoll() {
  const options = document.getElementById('poll-options');
  const results = document.getElementById('poll-results');
  if (!options) return;
  const votes = new Map(pairs.map(p => [p.id, Math.floor(Math.random()*40)+10]));
  const draw = () => {
    const total = Array.from(votes.values()).reduce((a,b)=>a+b,0) || 1;
    results.innerHTML = pairs.map(p => {
      const count = votes.get(p.id)||0;
      const pct = Math.round((count/total)*100);
      return `
        <div class="space-y-1">
          <div class="flex justify-between text-sm"><span>${p.name}</span><span class="text-white/60">${pct}%</span></div>
          <div class="bar"><div style="width:${pct}%"></div></div>
        </div>`;
    }).join('');
  };
  options.innerHTML = pairs.map(p => `
    <button class="w-full text-left p-3 rounded-xl border border-white/10 hover:border-electric hover:shadow-neon transition" data-id="${p.id}">
      <div class="flex items-center justify-between">
        <span class="font-semibold">${p.name}</span>
        <span class="text-xs text-white/60">הצבע כאן</span>
      </div>
      <p class="text-sm text-white/60">${p.desc}</p>
    </button>`).join('');
  options.addEventListener('click', async e => {
    const btn = e.target.closest('button[data-id]');
    if (!btn) return;
    const id = Number(btn.dataset.id);
    votes.set(id, (votes.get(id)||0)+1);
    draw();
    await pushVote(id);
  });
  draw();
  subscribeVotes(votes, draw);
}

function renderSchedule() {
  const container = document.getElementById('schedule');
  if (!container) return;
  container.innerHTML = schedule.map(block => `
    <div class="card space-y-3">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs uppercase tracking-[0.2em] text-electric">${block.round}</p>
          <h3 class="text-xl font-bold">${block.matches.length} משחקים</h3>
        </div>
      </div>
      <div class="space-y-3">
        ${block.matches.map(m => `
          <div class="flex items-center justify-between p-3 rounded-xl ${m.live ? 'border border-neon/40 bg-black/40 shadow-neon' : 'border border-white/10 bg-black/30'}">
            <div>
              <p class="font-semibold">${m.a} <span class="text-blood text-xs">נגד</span> ${m.b}</p>
              <p class="text-xs text-white/50">מגרש ${m.court}</p>
            </div>
            <div class="text-left">
              <p class="text-lg font-bold ${m.live ? 'text-neon' : 'text-white'}">${m.time}</p>
              <p class="text-xs uppercase tracking-[0.2em] ${m.live ? 'text-blood' : 'text-white/40'}">${m.live ? 'חי' : 'בקרוב'}</p>
            </div>
          </div>`).join('')}
      </div>
    </div>`).join('');
}

function renderStandings() {
  const table = document.getElementById('standings-table');
  if (!table) return;
  const sorted = [...standings].sort((a,b) => b.wins - a.wins || b.gameDiff - a.gameDiff || b.gamesWon - a.gamesWon);
  table.innerHTML = `
    <thead class="table-head">
      <tr>
        <th class="text-left py-2">#</th>
        <th class="text-left">זוג</th>
        <th class="text-right">ניצחונות</th>
        <th class="text-right">הפרש מערכות</th>
        <th class="text-right">משחקונים</th>
        <th class="text-right">פורם</th>
      </tr>
    </thead>
    <tbody>
      ${sorted.map((r, idx) => `
        <tr class="${idx < 2 ? 'highlight' : ''}">
          <td class="py-2">${idx+1}</td>
          <td>${r.pair}</td>
          <td class="text-right">${r.wins}</td>
          <td class="text-right">${r.gameDiff}</td>
          <td class="text-right">${r.gamesWon}</td>
          <td class="text-right text-white/60">${r.form}</td>
        </tr>`).join('')}
    </tbody>`;
}

function renderPairs() {
  const grid = document.getElementById('pairs-grid');
  if (!grid) return;
  grid.innerHTML = pairs.map(p => `
    <div class="card space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-bold">${p.name}</h3>
        <span class="pill">אגו ${p.stats.ego}</span>
      </div>
      <p class="text-sm text-white/70">${p.desc}</p>
      ${renderStat('כישרון', p.stats.skill)}
      ${renderStat('רעל', p.stats.trash)}
      ${renderStat('קלאץ\'', p.stats.clutch)}
    </div>`).join('');
}

function renderStat(label, value) {
  return `
    <div class="space-y-1">
      <div class="flex justify-between text-xs text-white/60"><span>${label}</span><span>${value}%</span></div>
      <div class="bar"><div style="width:${value}%"></div></div>
    </div>`;
}

function renderArticles() {
  const grid = document.getElementById('articles-grid');
  if (!grid) return;
  grid.innerHTML = articles.map(a => `
    <article class="card space-y-2">
      <h3 class="text-xl font-bold">${a.title}</h3>
      <p class="text-sm text-white/70">${a.tone}</p>
      <p class="text-xs text-white/50">מאת ${a.author}</p>
    </article>`).join('');
}

function renderRankings() {
  const list = document.getElementById('rankings-list');
  if (!list) return;
  list.innerHTML = rankings.map((r, idx) => `
    <div class="card flex items-center gap-4">
      <div class="text-3xl font-black text-electric">${idx+1}</div>
      <div>
        <p class="text-lg font-semibold">${r.pair}</p>
        <p class="text-sm text-white/60">${r.blurb}</p>
      </div>
    </div>`).join('');
}

function renderAdmin() {
  const container = document.getElementById('admin-matches');
  if (!container) return;
  const matches = schedule.flatMap(s => s.matches.map((m, i) => ({ ...m, round: s.round, idx: `${s.round}-${i}` })));
  container.innerHTML = matches.map(m => `
    <div class="p-3 rounded-xl border border-white/10 bg-black/30 space-y-2">
      <div class="flex justify-between text-sm"><span>${m.round}</span><span class="text-white/60">מגרש ${m.court}</span></div>
      <p class="font-semibold">${m.a} נגד ${m.b}</p>
      <div class="grid grid-cols-2 gap-2">
        <input class="field" placeholder="${m.a} תוצאה" data-key="${m.idx}-a" />
        <input class="field" placeholder="${m.b} תוצאה" data-key="${m.idx}-b" />
      </div>
    </div>`).join('');
  document.getElementById('save-scores')?.addEventListener('click', async () => {
    const scores = {};
    container.querySelectorAll('input[data-key]').forEach(input => {
      scores[input.dataset.key] = input.value;
    });
    logAdmin('שומר תוצאות ל-Supabase...');
    await pushScores(scores);
    logAdmin('תוצאות נשמרו (דמו).');
  });
}

function logAdmin(msg) {
  const log = document.getElementById('admin-log');
  if (!log) return;
  const entry = document.createElement('div');
  entry.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
  log.prepend(entry);
}

async function pushMessage(entry) {
  if (!supabaseClient) return;
  await supabaseClient.from('messages').insert(entry);
}
async function pushLike(entry) {
  if (!supabaseClient || !entry.id) return;
  await supabaseClient.from('messages').update({ likes: entry.likes }).eq('id', entry.id);
}
async function pushVote(pairId) {
  if (!supabaseClient) return;
  await supabaseClient.from('votes').insert({ pair_id: pairId });
}
async function pushScores(scores) {
  if (!supabaseClient) return;
  const rows = Object.entries(scores).map(([k,v]) => ({ key: k, value: v }));
  await supabaseClient.from('matches').upsert(rows);
}

function subscribeMessages(render, leaders) {
  if (!supabaseClient) return;
  supabaseClient.channel('messages-channel').on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, payload => {
    if (payload.new) {
      sampleMessages.unshift(payload.new);
      render(sampleMessages);
      updateLeaders(leaders);
    }
  }).subscribe();
}

function subscribeVotes(votes, draw) {
  if (!supabaseClient) return;
  supabaseClient.channel('votes-channel').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'votes' }, payload => {
    const id = payload.new.pair_id;
    votes.set(id, (votes.get(id)||0)+1);
    draw();
  }).subscribe();
}

function initPage() {
  const page = document.body.dataset.page;
  renderCountdown();
  renderHomeFeed();
  switch(page) {
    case 'trash':
      renderTrashArena();
      break;
    case 'poll':
      renderPoll();
      break;
    case 'schedule':
      renderSchedule();
      break;
    case 'standings':
      renderStandings();
      break;
    case 'pairs':
      renderPairs();
      break;
    case 'articles':
      renderArticles();
      break;
    case 'rankings':
      renderRankings();
      break;
    case 'admin':
      renderAdmin();
      break;
    default:
      break;
  }
}

document.addEventListener('DOMContentLoaded', initPage);
