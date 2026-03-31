// Supabase setup
const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY';
const supabaseClient = SUPABASE_URL.includes('YOUR_') ? null : supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const toxicWords = ['נוכל', 'חלש', 'זבל', 'בושה', 'גניבה', 'רמאות', 'רך', 'fraud', 'trash'];
const sampleMessages = [
  { name: 'יוגב', content: 'כבר שמרתם על המגרש המרכזי לי?', likes: 12 },
  { name: 'ניר', content: 'תביאו אוזניות — הרעש של הווינרים שלי חזק', likes: 17 },
  { name: 'ברק', content: 'מישהו ראה את ההגשה של עדו? גם הוא לא', likes: 8 },
];

const pairs = [
  { id: 1, name: 'ניר ובן', desc: 'נחשבים לפייבוריטים — או שחיים על הייפ?', stats: { skill: 92, ego: 78, trash: 82, clutch: 88 } },
  { id: 2, name: 'יוגב ועמית', desc: 'מארגני הזירה עם שרביט שיפוט וגביע ביד.', stats: { skill: 90, ego: 70, trash: 65, clutch: 90 } },
  { id: 3, name: 'אורחי וסם', desc: 'קלאץ\' של הפתעות; מגיעים עם תיק סודות.', stats: { skill: 82, ego: 60, trash: 73, clutch: 85 } },
  { id: 4, name: 'דניאל ונחום', desc: 'שקטים עד שהכדור מגיע אליהם.', stats: { skill: 80, ego: 55, trash: 61, clutch: 77 } },
  { id: 5, name: 'שלם ואביעד', desc: 'אחים לרעש, אחים למשחקי רשת.', stats: { skill: 78, ego: 72, trash: 79, clutch: 74 } },
  { id: 6, name: 'אבנרי וגיל', desc: 'מכניסים ספין ועוקצים בבדיחות.', stats: { skill: 81, ego: 68, trash: 70, clutch: 76 } },
  { id: 7, name: 'ביטון ושמיר', desc: 'עומדים חזק בבייסליין, דוחפים כל כדור.', stats: { skill: 79, ego: 65, trash: 60, clutch: 80 } },
  { id: 8, name: 'דין וסימונוב', desc: 'חושבים שני צעדים קדימה, לפעמים מפספסים אחד אחורה.', stats: { skill: 77, ego: 62, trash: 75, clutch: 70 } },
  { id: 9, name: 'ברק ועומר', desc: 'חברתיים, מסוכנים כשהקהל נדלק.', stats: { skill: 76, ego: 69, trash: 67, clutch: 73 } },
  { id: 10, name: 'הראל ואורן', desc: 'מגישים אש, לפעמים שורפים את עצמם.', stats: { skill: 74, ego: 63, trash: 66, clutch: 68 } },
  { id: 11, name: 'עדו וערן', desc: 'באסים חזקים, רשת פחות.', stats: { skill: 73, ego: 58, trash: 69, clutch: 65 } },
];

const schedule = [
  { round: 'בית א׳', matches: [
    { a: 'ניר ובן', b: 'הראל ואורן', time: '15:10', court: '1', live: true },
    { a: 'שלם ואביעד', b: 'אבנרי וגיל', time: '15:10', court: '2', live: true },
    { a: 'דין וסימונוב', b: 'הראל ואורן', time: '15:30', court: '2', live: false },
    { a: 'ניר ובן', b: 'דין וסימונוב', time: '15:50', court: '1', live: false },
    { a: 'ניר ובן', b: 'שלם ואביעד', time: '16:10', court: '1', live: false },
    { a: 'דין וסימונוב', b: 'שלם ואביעד', time: '16:10', court: '2', live: false },
    { a: 'ניר ובן', b: 'אבנרי וגיל', time: '16:30', court: '1', live: false },
    { a: 'הראל ואורן', b: 'אבנרי וגיל', time: '16:30', court: '2', live: false },
  ]},
  { round: 'בית ב׳', matches: [
    { a: 'אורחי וסם', b: 'עדו וערן', time: '15:10', court: '3', live: true },
    { a: 'יוגב ועמית', b: 'עדו וערן', time: '15:30', court: '3', live: false },
    { a: 'יוגב ועמית', b: 'ברק ועומר', time: '15:50', court: '3', live: false },
    { a: 'ברק ועומר', b: 'אורחי וסם', time: '16:10', court: '3', live: false },
    { a: 'אורחי וסם', b: 'ביטון ושמיר', time: '15:30', court: '4', live: false },
    { a: 'ביטון ושמיר', b: 'ברק ועומר', time: '15:50', court: '4', live: false },
    { a: 'יוגב ועמית', b: 'אורחי וסם', time: '16:10', court: '4', live: false },
    { a: 'עדו וערן', b: 'ביטון ושמיר', time: '16:30', court: '4', live: false },
  ]},
  { round: 'פלייאוף', matches: [
    { a: 'מקום 1 בית א׳', b: 'מקום 2 בית ב׳', time: '17:10', court: 'מרכזי', live: false },
    { a: 'מקום 1 בית ב׳', b: 'מקום 2 בית א׳', time: '17:40', court: 'מרכזי', live: false },
    { a: 'מנצחי חצי', b: 'מנצחי חצי', time: '18:10', court: 'מרכזי', live: false },
  ]},
];

const standings = [
  { pair: 'ניר ובן', wins: 3, gameDiff: 9, gamesWon: 18, form: 'נננ' },
  { pair: 'יוגב ועמית', wins: 3, gameDiff: 8, gamesWon: 17, form: 'נננ' },
  { pair: 'אורחי וסם', wins: 2, gameDiff: 3, gamesWon: 14, form: 'ננל' },
  { pair: 'שלם ואביעד', wins: 2, gameDiff: 1, gamesWon: 12, form: 'נלנ' },
  { pair: 'דין וסימונוב', wins: 1, gameDiff: -1, gamesWon: 10, form: 'לננ' },
  { pair: 'אבנרי וגיל', wins: 1, gameDiff: -2, gamesWon: 9, form: 'נלל' },
  { pair: 'ביטון ושמיר', wins: 1, gameDiff: -3, gamesWon: 8, form: 'לנל' },
  { pair: 'ברק ועומר', wins: 0, gameDiff: -5, gamesWon: 6, form: 'ללל' },
  { pair: 'הראל ואורן', wins: 0, gameDiff: -6, gamesWon: 5, form: 'ללל' },
  { pair: 'עדו וערן', wins: 0, gameDiff: -7, gamesWon: 4, form: 'ללל' },
];

const articles = [
  { title: 'ניר ובן – פייבוריטים או בלוף?', tone: 'כולם בטוחים שהם לוקחים, אבל מה קורה כשהשעון דופק?', author: 'צוות הזירה' },
  { title: 'הסוס השחור של הטורניר', tone: 'יש זוג שאף אחד לא סופר – עד שהם שוברים מחבט.', author: 'צוות הזירה' },
  { title: 'הזוג הכי אובררייטד', tone: 'חיים על הייפ וסטוריז. כמה זמן זה יחזיק?', author: 'צוות הזירה' },
  { title: 'דראמה: האם יהיה VAR על טרשים?', tone: 'יוגב מבטיח לשפוט. החברים פחות רגועים.', author: 'צוות הזירה' },
];

const rankings = [
  { pair: 'ניר ובן', blurb: 'הייפ אדיר, צריכים להוכיח שזה לא רק קבוצת ווטסאפ.' },
  { pair: 'יוגב ועמית', blurb: 'בעל הבית השתגע. גם כששופטים – מנצחים.' },
  { pair: 'אורחי וסם', blurb: 'הפתעה שקטה. תפסיקו להתעלם.' },
  { pair: 'שלם ואביעד', blurb: 'מגיעים עם ווליום 11 — גם בהגשות.' },
  { pair: 'דין וסימונוב', blurb: 'מתמטיקת נקודות, לפעמים שוכחים לשים ווינר.' },
  { pair: 'אבנרי וגיל', blurb: 'מכונת ספין והומור שחור.' },
  { pair: 'ביטון ושמיר', blurb: 'חזקים בבייסליין, פחות בלהצטלם.' },
  { pair: 'ברק ועומר', blurb: 'חיי הלילה פוגשים חמש על שתיים.' },
  { pair: 'הראל ואורן', blurb: 'גארדיאני הסרב. צריכים יותר רשת.' },
  { pair: 'עדו וערן', blurb: 'פצצות מצד אחד, דאבל פולט מהצד השני.' },
];

const insults = [
  'לא ראיתי כזה חוסר כישרון מאז כיתה ח׳.',
  'אתם חלשים יותר מהקפה במתחם.',
  'הסרב שלך עם פינג של וייפי.',
  'רגליים בחסות חול טובעני.',
  'בושה, אפילו ה-Waze מבקש נתיב עוקף.',
  'זו לא הקנטה – זו קריאה לעזרה.',
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
