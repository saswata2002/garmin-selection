/* ══ v12 Compare ═══════════════════════════════════════════════════════════════════════════════
   1. Every TV card gets a Compare toggle; picks fly into a tray above the bottom nav (up to 4).
   2. Compare pushes a page over the results on the prototype's spring (edge-swipe to go back).
   3. The page is a table built for deciding: "Pick it if…", strengths and watch-outs worked out
      from the TVs on the table, the star split (and what the 1–2★ reviews are about), then the
      facts, with only the differences shown by default. Columns are 140px; a 3rd/4th TV scrolls.
   4. Sheets for ratings & reviews, photos (same slot across TVs) and adding a TV.
   Data: tv-data.js (the PLP's listings) + compare-data.js (noon PDP specs, photos, reviews).     */
(() => {
  const TVS = window.TV_DATA, CMP = window.CMP_DATA;
  if (!TVS || !CMP) return;
  const screen = document.getElementById('screen'), search = document.getElementById('search');
  const plp = document.getElementById('plp'), grid = document.getElementById('plpGrid'), cmp = document.getElementById('cmp');
  const A = '../assets/', CDN = 'https://f.nooncdn.com/p/pzsku/';
  const BY = new Map(TVS.map((p) => [p.sku, p]));
  const MAX = 4, W = 375, COL = 140, GAP = 8;
  const H = typeof Haptics !== 'undefined' ? Haptics : { tick() {}, snap() {}, edge() {}, soft() {}, tap() {} };

  /* the prototype's spring as a CSS easing, so CSS transitions move like the JS ones */
  {
    const d = PP.disp(1, 0), T = PP.settleTime(1), N = 48;
    const pts = Array.from({ length: N + 1 }, (_, k) => (k === N ? 1 : 1 - d((k / N) * T)).toFixed(4));
    document.documentElement.style.setProperty('--spr', `linear(${pts.join(', ')})`);
    document.documentElement.style.setProperty('--spr-ms', `${Math.round(T * 1000)}ms`);
  }

  /* ── data ─────────────────────────────────────────────────────────────────────────────────── */
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const num = (n) => (+n).toLocaleString('en-US', { minimumFractionDigits: +n % 1 ? 2 : 0, maximumFractionDigits: 2 });
  const money = (n) => `&#xE001;${num(n)}`;
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const modelOf = (t) => {
    const toks = t.split(/[\s,|()\/–-]+/).filter(Boolean);
    const m = toks.find((s) => /^[A-Z]{1,3}\d{1,4}[A-Z]{0,3}$/.test(s) && !/^(NQ\d|Q\d|HDR\d*)$/.test(s));
    if (m) return m;
    const code = t.match(/\b(?:QA|UA|QE|UE)\d{2}([A-Z]{1,3}\d{1,4}[A-Z])[A-Z]{2,7}\b/) || t.match(/\b\d{2}([A-Z]{1,3}\d{1,4}[A-Z]{1,2})\b/);
    return code ? code[1] : '';
  };
  const familyOf = (t) => /neo qled/i.test(t) ? 'Neo QLED' : /the frame/i.test(t) ? 'The Frame' : /\boled\b/i.test(t) ? 'OLED'
    : /mini ?led/i.test(t) ? 'Mini LED' : /qled/i.test(t) ? 'QLED' : /crystal|uhd/i.test(t) ? 'Crystal UHD' : 'LED TV';
  const chipOf = (t) => {
    const m = t.match(/(NQ8 AI Gen ?\d|NQ4 AI Gen ?\d|NQ4 AI|Q4 AI|Q4 Lite|Crystal Processor 4K|Neo Quantum Processor (?:4K|8K)(?: Lite)?|Quantum Processor (?:4K|Lite)(?: Lite)?|Mini LED Processor 4K)/i);
    return m ? m[1].replace(/Gen ?(\d)/i, 'Gen$1').replace(/ Processor/i, '') : '';
  };
  const TIER = ['Crystal 4K', 'Q4 Lite', 'Quantum Lite', 'Quantum 4K Lite', 'Q4 AI', 'Quantum 4K', 'Mini LED 4K', 'NQ4 AI', 'NQ4 AI Gen2', 'Neo Quantum 4K', 'NQ4 AI Gen3', 'NQ8 AI Gen3'];
  const cleanHz = (r) => r.replace(/\s+Hz/g, 'Hz').replace(/\s*\(Up to 4K (\d+Hz)\)/i, ', up to $1').trim();
  const PANEL_OF = { 0: 'LED', 1: 'QLED', 2: 'Mini LED', 3: 'OLED' };
  const memo = new Map();
  function tv(sku) {
    if (memo.has(sku)) return memo.get(sku);
    const p = BY.get(sku), c = CMP[sku] || { spec: {}, imgs: [], bars: {}, summary: [], reviews: [], buyer: [], low: { n: 0 } };
    const hzs = [...`${c.spec.refresh || ''} ${p.title}`.matchAll(/(\d{2,3})\s?Hz/gi)].map((m) => +m[1]).filter((h) => h >= 50 && h <= 480);
    const hz = hzs.length ? Math.max(...hzs) : 0;
    const display = c.spec.display && !/^LED$/i.test(c.spec.display) ? c.spec.display : PANEL_OF[p.d] || 'LED';
    const t = {
      sku, title: p.title, model: modelOf(p.title) || familyOf(p.title), family: familyOf(p.title), size: p.in,
      price: +p.price, rating: c.rating ?? p.rating, count: c.count ?? p.reviews, written: c.written || 0,
      bars: c.bars || {}, summary: c.summary || [], reviews: c.reviews || [], buyer: c.buyer || [], low: c.low || { n: 0 },
      panel: /qled/i.test(display) && /neo qled|mini ?led/i.test(p.title) ? 'Mini LED' : display,
      chip: chipOf(p.title), hz, refresh: c.spec.refresh ? cleanHz(c.spec.refresh) : hz ? `${hz}Hz` : '',
      res: /\b8K\b/.test(p.title) ? '8K' : '4K', atmos: /dolby atmos/i.test(p.title),
      hdmi: c.spec.hdmi || 0, usb: c.spec.usb || 0, depth: c.spec.depth > 0 && c.spec.depth < 15 ? c.spec.depth : 0, weight: c.spec.weight || 0,
      year: p.y || c.spec.year || 0, os: c.spec.os || 'Tizen',
      photos: (c.imgs && c.imgs.length ? c.imgs : [p.img]).map((k) => `${CDN}${k}.jpg`),
    };
    t.oneStar = t.count ? (t.bars[1] || 0) / t.count : 0;
    memo.set(sku, t);
    return t;
  }
  /* what the 1–2★ reviews are mostly about (only when one theme clearly leads) */
  const REASON = { damage: 'screens damaged on arrival', defect: 'faults like lines or flicker', remote: 'the remote in the box', sound: 'the sound', wifi: 'Wi-Fi drops' };
  function lowStory(t) {
    const L = t.low; if (!L || L.n < 3) return null;
    const k = Object.keys(REASON).sort((a, b) => (L[b] || 0) - (L[a] || 0))[0];
    return (L[k] || 0) / L.n >= 0.4 ? { k, n: L[k], of: L.n, text: REASON[k] } : null;
  }

  /* ── state ────────────────────────────────────────────────────────────────────────────────── */
  const S = { mode: false, picked: [], open: false, focus: 'all', diff: true, col: null, info: new Set(), sheet: null, sheetSku: null, filter: 'all', photo: 0 };

  /* ── 1 · compare mode: the Compare chip turns the cards into picks (tap a card to pick it) ──── */
  const CHECK = '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4.4 8.2l2.4 2.4 4.9-5" fill="none" stroke="#0e0e0e" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const CHECK_W = CHECK.replace('#0e0e0e', '#fff');
  function decorate() {
    grid.querySelectorAll('.pcard').forEach((card) => {
      const sku = card.dataset.sku; if (!BY.has(sku)) return;
      if (!card.querySelector('.cmpk')) {
        const k = document.createElement('span'); k.className = 'cmpk'; k.setAttribute('aria-hidden', 'true');
        k.innerHTML = `<svg class="cmpk__on" width="24" height="24" viewBox="0 0 24 24"><path d="M7 12.4l3.3 3.3L17.2 8.6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        card.querySelector('.pcard__clip').appendChild(k);
      }
      const on = S.picked.includes(sku);
      card.classList.toggle('is-cmp', on);
      if (S.mode) { card.setAttribute('role', 'button'); card.setAttribute('aria-pressed', String(on)); card.tabIndex = 0; }
      else if (card.hasAttribute('aria-pressed')) { card.removeAttribute('role'); card.removeAttribute('aria-pressed'); card.removeAttribute('tabindex'); }
    });
  }
  new MutationObserver(decorate).observe(grid, { childList: true, subtree: true });
  const pickCard = (e) => {
    if (!S.mode) return;
    const card = e.target.closest('.pcard'); if (!card || !BY.has(card.dataset.sku)) return;
    if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
    e.stopPropagation(); e.preventDefault(); toggle(card.dataset.sku, card);
  };
  grid.addEventListener('click', pickCard, true);
  grid.addEventListener('keydown', pickCard, true);
  function setMode(on, quiet) {
    if (S.mode === on) return;
    S.mode = on; if (!on) { S.picked = []; toast.classList.remove('is-on'); }
    // opening says what to do first, then deals out the four slots
    clearTimeout(introT); intro = on; if (on) introT = setTimeout(deal, 1500);
    plp.classList.toggle('is-cmpmode', on);
    tray.classList.toggle('is-full', on);
    if (!quiet) on ? H.soft() : H.tick();
    sync();
  }

  /* ── 2 · tray ─────────────────────────────────────────────────────────────────────────────── */
  const tray = document.createElement('div');
  tray.className = 'cmptray'; tray.setAttribute('aria-live', 'polite');
  tray.innerHTML = '<button class="cmptray__pill" type="button"><svg width="18" height="18" viewBox="0 0 16 16" aria-hidden="true"><rect x="1.8" y="2.6" width="5.2" height="10.8" rx="1.4" fill="none" stroke="#fff" stroke-width="1.4"/><rect x="9" y="2.6" width="5.2" height="10.8" rx="1.4" fill="none" stroke="#fff" stroke-width="1.4"/></svg>Compare</button><div class="cmptray__thumbs"></div><button class="cmptray__go" type="button">Compare</button>';
  plp.appendChild(tray);
  const tThumbs = tray.querySelector('.cmptray__thumbs'), tGo = tray.querySelector('.cmptray__go');
  let nudgeT = 0, introT = 0, intro = false;
  const SLOT = '<svg viewBox="0 0 40 40" aria-hidden="true"><rect x=".75" y=".75" width="38.5" height="38.5" rx="10.25" pathLength="140"/><path d="M20 14.5v11M14.5 20h11"/></svg>';
  function renderTray(hide) {
    const n = S.picked.length;
    tGo.classList.toggle('is-cancel', n < 2);
    tGo.textContent = n >= 2 ? `Compare ${n}` : 'Done';
    tGo.setAttribute('aria-label', n >= 2 ? `Compare ${n} TVs` : 'Stop comparing');
    if (intro) { tThumbs.innerHTML = '<div class="cmptray__txt"><b>Pick up to 4 TVs</b><span>We’ll line them up side by side</span></div>'; return; }
    tThumbs.innerHTML = [0, 1, 2, 3].map((k) => {
      const s = S.picked[k];
      if (!s) return `<span class="cmptray__th is-empty${k === n ? ' is-next' : ''}" aria-hidden="true">${SLOT}</span>`;
      const t = tv(s);
      return `<button class="cmptray__th" type="button" data-sku="${s}" aria-label="Remove ${esc(t.model)}"><img src="${t.photos[0]}?width=160" alt=""${s === hide ? ' style="opacity:0"' : ''}></button>`;
    }).join('');
  }
  // the line lifts away and the slots drop in one by one, each with a little spin
  function deal() {
    if (!intro) return;
    const txt = tThumbs.firstElementChild, quiet = PP.reduce.matches;
    const out = txt && !quiet ? txt.animate([{ opacity: 1 }, { opacity: 0, transform: 'translateY(-6px)', filter: 'blur(3px)' }], { duration: 180, easing: 'ease-in', fill: 'forwards' }).finished : Promise.resolve();
    out.then(() => {
      if (!intro) return;
      intro = false; renderTray();
      if (quiet) return;
      tThumbs.querySelectorAll('.cmptray__th').forEach((el, k) => {
        el.animate([{ opacity: 0, transform: 'translateY(12px) scale(.4) rotate(-16deg)' }, { opacity: 1, transform: 'translateY(-2px) scale(1.08) rotate(4deg)', offset: .6 }, { opacity: 1, transform: 'none' }],
          { duration: 520, delay: k * 75, easing: 'cubic-bezier(.2,.8,.3,1)', fill: 'backwards' });
        el.querySelector('path').animate([{ transform: 'rotate(-180deg) scale(0)' }, { transform: 'none' }],
          { duration: 480, delay: 120 + k * 75, easing: 'cubic-bezier(.3,1.4,.5,1)', fill: 'backwards' });
      });
    });
  }
  tThumbs.addEventListener('click', (e) => { const b = e.target.closest('.cmptray__th[data-sku]'); if (b) { H.tick(); remove(b.dataset.sku); } });
  tGo.addEventListener('click', () => { if (S.picked.length >= 2) openCompare(); else setMode(false); });
  tray.querySelector('.cmptray__pill').addEventListener('click', () => setMode(true));
  // the pill rises once the results have landed
  plp.addEventListener('plp:landed', () => plp.classList.add('is-landed'));
  // a fifth pick: the tray shakes its head and a toast rises out of it
  const toast = document.createElement('div');
  toast.className = 'cmptoast'; toast.setAttribute('role', 'status');
  toast.textContent = 'Up to 4 TVs at a time. Remove one first';
  plp.appendChild(toast);
  function nudge() {
    H.edge();
    tray.classList.remove('is-nudge'); void tray.offsetWidth; tray.classList.add('is-nudge');
    if (toast.classList.contains('is-on')) toast.animate([{ scale: 1 }, { scale: 1.05 }, { scale: 1 }], { duration: 260, easing: 'cubic-bezier(.3,1.4,.5,1)' });
    toast.classList.add('is-on');
    clearTimeout(nudgeT); nudgeT = setTimeout(() => { nudgeT = 0; toast.classList.remove('is-on'); }, 2200);
  }
  /* the card's photo flies into its tray slot */
  function fly(sku, card) {
    const ph = card && card.querySelector('.pcard__photo');
    const slot = tThumbs.querySelector(`.cmptray__th[data-sku="${sku}"]`);
    if (!ph || !slot || PP.reduce.matches) { const im = slot && slot.querySelector('img'); if (im) im.style.opacity = ''; return; }
    const sr = screen.getBoundingClientRect(), a = ph.closest('.pcard__clip').getBoundingClientRect();
    const x0 = a.left - sr.left, y0 = a.top - sr.top, w0 = a.width, h0 = a.height;
    const x1 = tray.offsetLeft + tThumbs.offsetLeft + slot.offsetLeft, y1 = tray.offsetTop + tThumbs.offsetTop + slot.offsetTop;
    const box = document.createElement('div'); box.className = 'cmpfly';
    box.style.cssText = `width:${w0}px;height:${h0}px;overflow:hidden;border-radius:10px`;
    box.innerHTML = `<img src="${ph.currentSrc || ph.src}" alt="" style="width:100%;height:100%;object-fit:cover">`;
    screen.appendChild(box);
    const L = (a0, b0, v) => (a0 + (b0 - a0) * v).toFixed(2);
    const an = PP.spring(box, 0, 1, (v) => ({ transform: `translate(${L(x0, x1, v)}px, ${L(y0, y1, v)}px)`, width: `${L(w0, 38, v)}px`, height: `${L(h0, 38, v)}px`, borderRadius: `${L(10, 10, v)}px` }));
    an.finished.then(() => {
      const im = tThumbs.querySelector(`.cmptray__th[data-sku="${sku}"] img`); if (im) im.style.opacity = '';
      box.remove();
      const s2 = tThumbs.querySelector(`.cmptray__th[data-sku="${sku}"]`);
      if (s2) s2.animate([{ transform: 'scale(1.12)' }, { transform: 'scale(1)' }], { duration: 260, easing: 'cubic-bezier(.2,.9,.3,1.3)' });
    }).catch(() => box.remove());
  }
  function toggle(sku, card) {
    if (S.picked.includes(sku)) { H.tick(); remove(sku); return; }
    if (S.picked.length >= MAX) { nudge(); return; }
    if (intro) { clearTimeout(introT); intro = false; }
    S.picked.push(sku); H.snap();
    sync(sku);
    requestAnimationFrame(() => fly(sku, card));
  }
  function remove(sku) {
    S.picked = S.picked.filter((s) => s !== sku);
    if (S.col === sku) S.col = null;
    if (S.open && S.picked.length < 2) { sync(); closeCompare(); return; }
    sync();
  }
  function sync(hide) {
    decorate(); renderTray(hide);
    if (S.open) renderPage();
    if (S.sheet === 'add') renderSheet();
  }
  // leaving the results clears the picks
  new MutationObserver(() => { if (!plp.classList.contains('is-open')) { plp.classList.remove('is-landed'); if (S.mode && !S.open) setMode(false, true); } })
    .observe(plp, { attributes: true, attributeFilter: ['class'] });

  /* ── 3 · the compare page ─────────────────────────────────────────────────────────────────── */
  const PLUS = '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3.5v9M3.5 8h9" stroke="#262a33" stroke-width="1.6" stroke-linecap="round"/></svg>';
  const XS = (c = '#0e0e0e', s = 10) => `<svg width="${s}" height="${s}" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 2l6 6M8 2L2 8" stroke="${c}" stroke-width="1.5" stroke-linecap="round"/></svg>`;
  const INFO = '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.4" fill="none" stroke="#9aa0b2" stroke-width="1.3"/><path d="M8 7.2v3.6" fill="none" stroke="#9aa0b2" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.1" r=".9" fill="#9aa0b2" stroke="none"/></svg>';
  const CAM = '<svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true"><rect x="1" y="2.2" width="10" height="7.6" rx="1.6" fill="none" stroke="#fff" stroke-width="1.2"/><circle cx="4.3" cy="5" r="1" fill="#fff"/><path d="M2 9l2.8-2.7 1.8 1.7 1.4-1.3L10 8.6" fill="none" stroke="#fff" stroke-width="1.1"/></svg>';
  const STAR = `${A}9d075.svg`;
  const CHEV = `<img src="${A}brands/chevron.svg" width="16" height="16" alt="">`;
  const MARK = `<img src="${A}brands/mark-samsung.svg" width="52.56" height="7.92" alt="Samsung">`;
  cmp.innerHTML = `
    <div class="cmp__top">
      <div class="cmp__bar">
        <button class="cmp__back" type="button" aria-label="Back to results"><img src="${A}17190.svg" alt=""></button>
        <div class="cmp__ttl"><b>Compare</b></div>
        <label class="cmp__diff"><span>Differences only</span><button class="cmpsw" type="button" role="switch" id="cmpDiff" aria-checked="true" aria-label="Differences only" data-act="diff"><i></i></button></label>
      </div>
    </div>
    <div class="cmp__headwrap" id="cmpHeadWrap"><div class="cmp__heads" id="cmpHeads"></div></div>
    <div class="cmp__scroll" id="cmpScroll"><div class="cmp__inner" id="cmpInner"><div class="cmp__body" id="cmpBody"></div></div></div>
    <div class="cmp__edge" id="cmpEdge" aria-hidden="true"></div>
    <div class="csheet" id="cmpSheet">
      <div class="csheet__scrim"></div>
      <div class="csheet__p" role="dialog" aria-modal="true" aria-labelledby="csTitle">
        <div class="csheet__grab"><i></i></div>
        <div class="csheet__hd"><b id="csTitle"></b><button class="csheet__x" type="button" aria-label="Close">${XS('#404553', 11)}</button></div>
        <div id="csSeg"></div>
        <div class="csheet__body" id="csBody"></div>
      </div>
    </div>`;
  const $ = (id) => document.getElementById(id);
  const headWrap = $('cmpHeadWrap'), heads = $('cmpHeads'), scroller = $('cmpScroll'), inner = $('cmpInner'), body = $('cmpBody');
  const sheet = $('cmpSheet'), panel = sheet.querySelector('.csheet__p'), csTitle = $('csTitle'), csSeg = $('csSeg'), csBody = $('csBody');

  const SECS = [['summary', 'At a glance'], ['reviews', 'Reviews'], ['picture', 'Picture'], ['gaming', 'Gaming & sound'], ['design', 'Design']];
  function extreme(ts, f, dir) {
    const v = ts.map(f), ok = v.filter((x) => x), m = ok.length ? (dir > 0 ? Math.max(...ok) : Math.min(...ok)) : null;
    // a badge only for a clear winner: values must differ and the best must be unique
    return new Set(ok).size > 1 && v.filter((x) => x === m).length === 1 ? v.map((x) => x === m) : v.map(() => false);
  }
  function facts(ts) {
    const tier = (t) => TIER.indexOf(t.chip) + 1;
    return {
      cheap: extreme(ts, (t) => t.price, -1), dear: extreme(ts, (t) => t.price, 1), rated: extreme(ts, (t) => t.rating, 1), most: extreme(ts, (t) => t.count, 1),
      fast: extreme(ts, (t) => t.hz, 1), slim: extreme(ts, (t) => t.depth, -1), thick: extreme(ts, (t) => t.depth, 1), light: extreme(ts, (t) => t.weight, -1), heavy: extreme(ts, (t) => t.weight, 1),
      big: extreme(ts, (t) => t.size, 1), newest: extreme(ts, (t) => t.year, 1), chip: extreme(ts, tier, 1), hdmi: extreme(ts, (t) => t.hdmi, 1),
      panels: new Set(ts.map((t) => t.panel)).size, maxHz: Math.max(...ts.map((t) => t.hz)), maxYear: Math.max(...ts.map((t) => t.year)),
      lo: Math.min(...ts.map((t) => t.price)),
      depthGap: Math.max(...ts.map((t) => t.depth || 0)) - Math.min(...ts.map((t) => t.depth || 99)), atmos: ts.filter((t) => t.atmos).length,
    };
  }
  /* what a pricier TV buys over the cheapest one on the table */
  function gains(t, base) {
    const g = [];
    if (t.panel !== base.panel && (t.panel === 'OLED' || t.panel === 'Mini LED')) g.push({ why: `${t.panel === 'OLED' ? 'an' : 'a'} ${t.panel} screen`, pro: `${t.panel} screen` });
    if (t.chip && TIER.indexOf(t.chip) > TIER.indexOf(base.chip)) g.push({ why: `the ${t.chip} processor`, pro: 'Newer processor' });
    if (t.hz >= 100 && t.hz > base.hz) g.push({ why: `${t.hz}Hz motion`, pro: `Smooth motion (up to ${t.hz}Hz)` });
    if (t.size > base.size) g.push({ why: `${/^(8|11|18)/.test(String(t.size)) ? 'an' : 'a'} ${t.size}″ screen`, pro: 'Bigger screen' });
    if (t.depth && base.depth && base.depth - t.depth > 1) g.push({ why: 'a slimmer body', pro: 'Slimmer on the wall' });
    if (t.atmos && !base.atmos) g.push({ why: 'Dolby Atmos', pro: 'Dolby Atmos' });
    if (t.rating - base.rating >= 0.2 && t.count >= 20) g.push({ why: 'better ratings', pro: 'Buyers rate it higher' });
    return g;
  }
  /* each TV's reason to be on the table (noon AI): a role, and "pick this if you want…" (no role twice) */
  const NOUN = { Value: 'value pick', 'Movie nights': 'one for movie nights', 'Bright rooms': 'pick for bright rooms', 'Gaming & sport': 'pick for gaming and sport',
    'Big screen': 'big-screen pick', 'Peace of mind': 'best-rated pick', 'Wall mounting': 'slimmest for the wall', 'Latest tech': 'newest model',
    'A safe bet': 'safe bet', Features: 'most capable', 'Step up': 'step up', 'All-rounder': 'all-rounder' };
  function roles(ts, F) {
    const used = new Set(), base = ts.reduce((a, b) => (b.price < a.price ? b : a));
    return ts.map((t, i) => {
      const c = [
        F.cheap[i] && ['Value', 'the lowest price'],
        t.panel === 'OLED' && F.panels > 1 && ['Movie nights', 'perfect blacks for movie nights'],
        t.panel === 'Mini LED' && F.panels > 1 && ['Bright rooms', 'a bright picture in a sunny room'],
        F.fast[i] && t.hz >= 100 && ['Gaming & sport', 'smooth gaming and sport'],
        F.big[i] && ['Big screen', 'the biggest screen here'],
        F.rated[i] && t.count >= 20 && ['Peace of mind', 'the one buyers rate highest'],
        F.slim[i] && F.depthGap > 1 && ['Wall mounting', 'the slimmest TV for your wall'],
        F.newest[i] && ['Latest tech', 'the newest model'],
        F.most[i] && ['A safe bet', 'the most-reviewed pick'],
      ].filter(Boolean);
      const g = t === base ? [] : gains(t, base);
      if (g.length && t.price > base.price) c.push(['Step up', `${g.slice(0, 2).map((x) => x.why).join(' and ')} for ${money(Math.round(t.price - base.price))} more`]);
      if (F.dear[i]) c.push(['Features', 'the most this list offers']);
      const pick = c.find(([r]) => !used.has(r)) || ['All-rounder', 'a balance of price and features'];
      used.add(pick[0]);
      const more = c.filter((x) => x !== pick && x[0] !== 'Step up' && x[0] !== 'Features').slice(0, 1).map((x) => x[1]);
      return { role: pick[0], want: [pick[1], ...more].join(', and '), gains: g, base };
    });
  }
  /* one plain line on what a value means for you, under the key specs */
  const MEAN = {
    panel: (t) => ({ OLED: 'Perfect blacks for dark rooms', 'Mini LED': 'Brightest; great in daylight', QLED: 'Rich colour for the price' }[t.panel] || 'Covers the basics'),
    size: (t, i, F) => (F.big[i] ? 'Most immersive here' : extreme(S.picked.map(tv), (x) => x.size, -1)[i] ? 'Fits smaller rooms' : ''),
    chip: (t, i, F) => (F.chip[i] ? 'Sharper upscaling of non-4K TV' : ''),
    hz: (t) => (t.hz >= 100 ? 'Smoother sport and games' : t.hz ? 'Fine for shows and films' : ''),
    depth: (t, i, F) => (F.slim[i] && F.depthGap > 0.5 ? 'Sits flatter on the wall' : F.thick[i] && F.depthGap > 0.5 ? 'Sticks out more' : ''),
    weight: (t, i, F) => (F.heavy[i] ? 'Check your wall mount' : ''),
  };
  const SAME_IDEA = { 'Newer processor': /processor/i, 'Bigger screen': /screen/i, 'Slimmer on the wall': /slim/i, 'Buyers rate it higher': /rate/i };
  function pros(t, i, F) {
    const base = S.picked.map(tv).reduce((a, b) => (b.price < a.price ? b : a));
    return [F.cheap[i] && 'Lowest price', F.rated[i] && t.count >= 10 && 'Buyers rate it best', F.fast[i] && t.hz >= 100 && `Smooth motion (up to ${t.hz}Hz)`,
      F.slim[i] && F.depthGap > 0.5 && `Slimmest (${t.depth} cm)`, F.big[i] && 'Biggest screen', F.chip[i] && 'Newest processor',
      t.atmos && F.atmos < S.picked.length && 'Dolby Atmos sound', F.hdmi[i] && `${t.hdmi} HDMI ports`, F.most[i] && 'Most reviewed', F.newest[i] && `Newest model (${t.year})`,
      ...gains(t, base).map((x) => x.pro)].filter(Boolean)
      // one line per idea: "Newest processor" already says "Newer processor"
      .filter((x, k, l) => l.indexOf(x) === k && !(SAME_IDEA[x] && l.slice(0, k).some((y) => SAME_IDEA[x].test(y)))).slice(0, 2);
  }
  function cons(t, i, F) {
    const st = lowStory(t);
    return [F.dear[i] && 'Costs the most', t.hz && t.hz <= 60 && F.maxHz >= 100 && `Not built for gaming (${t.hz}Hz)`,
      t.oneStar >= 0.12 && st && st.k === 'damage' && 'Some arrived with a damaged screen', t.count < 20 && 'Not many ratings yet',
      F.thick[i] && F.depthGap > 0.5 && `Bulkiest (${t.depth} cm deep)`, F.heavy[i] && `Heaviest (${t.weight} kg)`, t.year && t.year < F.maxYear && `Older model (${t.year})`].filter(Boolean).slice(0, 2);
  }
  const v = (text, cls = '') => `<p class="cmpx__v ${cls}">${text}</p>`;
  const note = (text, bad) => `<p class="cmpx__n${bad ? ' is-bad' : ''}">${text}</p>`;
  // the star split in one line: how many loved it, how many hated it (1★ goes red when it's a lot)
  const split = (t) => { const all = [1, 2, 3, 4, 5].reduce((a, k) => a + (t.bars[k] || 0), 0); if (!all) return '';
    const pc = (k) => Math.round(((t.bars[k] || 0) / all) * 100), one = pc(1);
    return `<p class="cmpx__sp">${pc(5)}% 5★ · <span${one >= 12 ? ' class="is-bad"' : ''}>${one}% 1★</span></p>`; };
  const dim = (text = 'Not listed') => v(text, 'is-dim');
  const list = (l, kind) => (l.length ? `<div class="cmpl cmpl--${kind}">${l.map((x) => `<span>${x}</span>`).join('')}</div>` : dim(kind === 'good' ? 'Nothing stands out' : 'Nothing major'));
  function rows(ts, F, R) {
    const link = (k, sku, label) => `<button class="cmplink" type="button" data-act="${k}" data-sku="${sku}">${label}${CHEV}</button>`;
    return [
      { sec: 'summary', key: 'ai', ai: true, label: 'Pick this for', always: true, cell: (t, i) => `<p class="cmpx__v is-ai">${R[i].want}</p>` },   // our own copy + money(); nothing user-typed
      { sec: 'summary', key: 'pros', label: 'Good', always: true, cell: (t, i) => list(pros(t, i, F), 'good') },
      { sec: 'summary', key: 'cons', label: 'Watch out', always: true, cell: (t, i) => list(cons(t, i, F), 'bad') },
      { sec: 'reviews', key: 'rating', label: 'Rating', always: true, info: 'The average of every noon rating for this TV. When many people gave 1★, the reviews say why.',
        cell: (t, i) => `<p class="cmprt"><b>★ ${t.rating.toFixed(1)}</b><span>${num(t.count)}</span></p>${F.rated[i] && t.count >= 10 ? note('Best rated') : ''}${split(t)}` },
      { sec: 'reviews', key: 'say', label: 'Buyers say', always: true,
        cell: (t) => (t.summary.length ? `${v(esc(t.summary[0]), 'is-soft cmpx__say')}${link('reviews', t.sku, 'Read reviews')}`
          : `${dim(t.written ? 'No summary yet' : 'No written reviews yet')}${t.reviews.length ? link('reviews', t.sku, 'Read reviews') : ''}`) },
      { sec: 'picture', key: 'panel', label: 'Screen', val: (t) => t.panel, info: 'How the screen makes light. OLED: every pixel lights itself, so blacks are perfect; best in a dim room. Mini LED: thousands of tiny backlights, the brightest; good in a sunny room. QLED: a quantum-dot layer for rich colour at a lower price.', cell: (t) => v(esc(t.panel)) },
      { sec: 'picture', key: 'size', label: 'Size', val: (t) => t.size, cell: (t, i) => `${v(`${t.size}″`)}${F.big[i] ? note('Biggest') : ''}` },
      { sec: 'picture', key: 'chip', label: 'Processor', val: (t) => t.chip, info: 'Sharpens and upscales what you watch. A higher tier cleans up non-4K TV and streaming better.', cell: (t, i) => (t.chip ? `${v(esc(t.chip))}${F.chip[i] ? note('Newest') : ''}` : dim()) },
      { sec: 'picture', key: 'res', label: 'Resolution', val: (t) => t.res, cell: (t) => v(t.res) },
      { sec: 'gaming', key: 'hz', label: 'Refresh rate', val: (t) => t.refresh, info: 'How many times a second the picture updates. 100Hz and up keeps football and console or PC games smooth; “up to 144Hz” is for gaming.', cell: (t, i) => (t.refresh ? `${v(esc(t.refresh))}${F.fast[i] && t.hz >= 100 ? note('Smoothest') : ''}` : dim()) },
      { sec: 'gaming', key: 'hdmi', label: 'HDMI ports', val: (t) => t.hdmi, info: 'Sockets for a console, soundbar or set-top box.', cell: (t, i) => (t.hdmi ? `${v(String(t.hdmi))}${F.hdmi[i] ? note('Most') : ''}` : dim()) },
      { sec: 'gaming', key: 'atmos', label: 'Dolby Atmos', val: (t) => t.atmos, info: 'Sound that seems to come from above and around you. Without it, a soundbar helps.', cell: (t) => (t.atmos ? v('Yes') : dim()) },
      { sec: 'design', key: 'depth', label: 'Depth', val: (t) => t.depth, info: 'How far the TV sticks out from the wall, without its stand.', cell: (t, i) => (t.depth ? `${v(`${t.depth} cm`)}${F.slim[i] && F.depthGap > 0.5 ? note('Slimmest') : ''}` : dim()) },
      { sec: 'design', key: 'weight', label: 'Weight', val: (t) => t.weight, info: 'Worth checking against your wall mount.', cell: (t, i) => (t.weight ? `${v(`${t.weight} kg`)}${F.light[i] ? note('Lightest') : ''}` : dim()) },
      { sec: 'design', key: 'year', label: 'Model year', val: (t) => t.year, info: 'Newer models usually get software updates for longer.', cell: (t, i) => (t.year ? `${v(String(t.year))}${F.newest[i] ? note('Newest') : ''}` : dim()) },
      { sec: 'design', key: 'usb', label: 'USB ports', val: (t) => t.usb, cell: (t) => (t.usb ? v(String(t.usb)) : dim()) },
    ];
  }
  const sameText = { panel: (t) => t.panel, size: (t) => `${t.size}″`, chip: (t) => `${t.chip} processor`, res: (t) => t.res, hz: (t) => t.refresh, hdmi: (t) => `${t.hdmi} HDMI`,
    atmos: (t) => (t.atmos ? 'Dolby Atmos' : ''), depth: (t) => `${t.depth} cm deep`, weight: (t) => `${t.weight} kg`, year: (t) => `${t.year} model`, usb: (t) => `${t.usb} USB` };
  const INFO_OF = {};
  const DIFF = '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4.4 8.2l2.4 2.4 4.9-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  let lastGen = '';
  const SPARK = '<svg class="spark" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><defs><linearGradient id="aig" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6d5dfc"/><stop offset=".55" stop-color="#c64fd6"/><stop offset="1" stop-color="#ff7a7a"/></linearGradient></defs><path d="M8 .8c.5 3.6 2.6 6.2 6.4 7.2-3.8 1-5.9 3.6-6.4 7.2-.5-3.6-2.6-6.2-6.4-7.2C5.4 7 7.5 4.4 8 .8z" fill="url(#aig)"/></svg>';
  const AILAB = `<span class="cmpx__ai">${SPARK}<span>Pick this for</span></span>`;
  function renderPage() {
    const ts = S.picked.map(tv), n = ts.length; if (n < 1) return;
    const F = facts(ts);
    // a free slot shows as one more, empty card at the end of the row of TVs
    const slot = n < MAX ? 1 : 0, m = n + slot;
    const innerW = Math.max(W, 32 + m * COL + (m - 1) * GAP), colW = Math.floor((innerW - 32 - (m - 1) * GAP) / m);
    const cols = `grid-template-columns: repeat(${n}, ${colW}px)`, headCols = `grid-template-columns: repeat(${m}, ${colW}px)`;
    $('cmpDiff').setAttribute('aria-checked', String(S.diff));
    heads.style.cssText = `width:${innerW}px;${headCols}`;
    heads.innerHTML = ts.map((t, i) => `
      <div class="cmph${S.col === t.sku ? ' is-focus' : ''}">
        <button class="cmph__ph" type="button" data-act="photos" data-sku="${t.sku}" aria-label="See ${esc(t.model)} photos"><img src="${t.photos[0]}?width=400" alt=""><span class="cmph__n">${CAM.replace(/#fff/g, '#404553')}${t.photos.length}</span></button>
        ${n > 2 ? `<button class="cmph__x" type="button" data-act="remove" data-sku="${t.sku}" aria-label="Remove ${esc(t.model)}">${XS('#404553', 9)}</button>` : ''}
        <div class="cmph__b">
          <span class="cmph__logo">${MARK}</span>
          <button class="cmph__name" type="button" data-act="col" data-sku="${t.sku}" aria-pressed="${S.col === t.sku}">${esc(t.model)} <span>${t.size}″ ${esc(t.family)}</span></button>
          <p class="cmph__price"><b>${money(t.price)}</b></p>
          <p class="cmph__delta${F.cheap[i] ? ' is-low' : ''}">${F.cheap[i] ? 'Lowest price' : t.price > F.lo ? `${money(Math.round(t.price - F.lo))} more` : 'Same price'}</p>
        </div>
      </div>`).join('') + (slot ? `<button class="cmph is-add" type="button" data-act="add"><span class="cmpadd">${PLUS}Add TV</span></button>` : '');
    const RO = roles(ts, F), R = rows(ts, F, RO), hidden = [];
    const key = S.picked.join(), gen = key !== lastGen; lastGen = key;
    let html = '';
    // one continuous card per TV: every row in order; a topic starts with a slightly stronger divider
    const all = [];
    for (const [id] of SECS) {
      if (S.focus !== 'all' && S.focus !== id) continue;
      const rs = R.filter((r) => r.sec === id).filter((r) => {
        if (r.always) return true;
        const vals = ts.map(r.val);
        if (vals.every((x) => !x)) return false;
        if (S.diff && n > 1 && new Set(vals.map(String)).size === 1) { const s = sameText[r.key] && sameText[r.key](ts[0]); if (s) hidden.push(s); return false; }
        return true;
      });
      rs.forEach((r, k) => all.push({ ...r, group: k === 0 && all.length > 0 }));
    }
    if (S.focus === 'all') all.push({ key: 'cta', cta: true });
    html += `<div class="cmps__g" style="${cols}">`;
    all.forEach((r, k) => {
      if (r.info) INFO_OF[r.key] = [r.label, r.info];
      const pos = `${k === 0 ? ' is-first' : ''}${k === all.length - 1 ? ' is-last' : ''}${r.group ? ' is-group' : ''}`;
      if (r.cta) { html += ts.map((t) => `<div class="cmpx is-cta${pos}${S.col === t.sku ? ' is-focus' : ''}"><button class="cmpcta" type="button" data-act="view" data-sku="${t.sku}">View ${esc(t.model)}${CHEV}</button></div>`).join(''); return; }
      const lab = r.info ? `<button class="cmpx__l" type="button" data-act="info" data-key="${r.key}">${r.label}</button>` : `<span class="cmpx__l">${r.label}</span>`;
      html += ts.map((t, i) => { const m = MEAN[r.key] && MEAN[r.key](t, i, F);
        return `<div class="cmpx${pos}${r.ai ? ` is-ai${gen ? ' is-gen' : ''}` : ''}${S.col === t.sku ? ' is-focus' : ''}">${r.ai ? AILAB : lab}${r.cell(t, i)}${m ? `<p class="cmpx__m">${m}</p>` : ''}</div>`; }).join('');
    });
    html += '</div>';
    if (S.focus === 'all') {
      const same = [...new Set(hidden), 'Tizen smart TV', 'Samsung Knox security'];
      html += `<div class="cmpsame"><b>Same on all ${n}</b><span>${same.join(' · ')}</span></div>`;
    }
    inner.style.width = `${innerW}px`;
    const top = scroller.scrollTop, left = scroller.scrollLeft;
    body.innerHTML = html;
    scroller.scrollTop = top; scroller.scrollLeft = Math.min(left, innerW - W);
    syncHeads();
  }
  /* heads sit above the scroller (so the photo can fold away) and follow its sideways scroll */
  function syncHeads() { heads.style.transform = `translate3d(${-scroller.scrollLeft}px,0,0)`; }
  const fitScroller = () => { scroller.style.top = `${95 + headWrap.offsetHeight}px`; };
  new ResizeObserver(fitScroller).observe(headWrap);
  let folded = false;
  scroller.addEventListener('scroll', () => {
    syncHeads();
    const f = folded ? scroller.scrollTop > 4 : scroller.scrollTop > 28;
    if (f !== folded) { folded = f; cmp.classList.toggle('is-folded', f); }
  }, { passive: true });
  function swapBody(fn) {   // a quick cross-fade when the table's shape changes (focus, differences)
    body.classList.add('is-swap'); fn();
    requestAnimationFrame(() => requestAnimationFrame(() => body.classList.remove('is-swap')));
  }

  cmp.addEventListener('click', (e) => {
    const el = e.target.closest('[data-act], .cmp__back'); if (!el) return;
    if (el.classList.contains('cmp__back')) { closeCompare(); return; }
    if (el.dataset.act === 'add') { openSheet('add'); return; }
    const { act, sku } = el.dataset;
    if (act === 'diff') { S.diff = !S.diff; H.tick(); swapBody(renderPage); }
    else if (act === 'info') openSheet('info', null, el.dataset.key);
    else if (act === 'view') H.tap();
    else if (act === 'col') { S.col = S.col === sku ? null : sku; H.tick(); renderPage(); }
    else if (act === 'remove') remove(sku);
    else if (act === 'reviews' || act === 'photos') openSheet(act, sku);
  });

  /* push / pop on the prototype's spring, with the results page parallaxing underneath */
  let cp = 0, cv = 0, canim = null, cdrag = null;
  function crender() {
    if (PP.reduce.matches) { cmp.style.transform = 'none'; cmp.style.opacity = String(Math.min(1, Math.max(0, cp))); }
    else { cmp.style.opacity = ''; cmp.style.transform = `translate3d(${((1 - cp) * W).toFixed(2)}px,0,0)`; search.style.translate = cp > 0 ? `${(-PP.PARALLAX * W * cp).toFixed(2)}px 0` : ''; }
    cmp.style.visibility = cp > 0.0005 ? 'visible' : 'hidden';
  }
  function csettle(t) {
    cp = t; cv = 0; canim = null; crender();
    cmp.inert = t !== 1; search.inert = t === 1;
    cmp.style.willChange = search.style.willChange = '';
    if (t === 0) { S.open = false; if (S.picked.length < 2) sync(); }
  }
  function cstep(now) {
    if (!canim) return;
    const t = (now - canim.t0) / 1000, x = PP.disp(canim.x0, canim.v0)(t);
    cv = PP.vel(canim.x0, canim.v0)(t); cp = canim.target + x;
    if (Math.abs(x) < 0.0004 && Math.abs(cv) < 0.02) return csettle(canim.target);
    crender(); requestAnimationFrame(cstep);
  }
  function cgo(target, v0 = cv) {
    cmp.inert = false; if (target > 0) cmp.style.visibility = 'visible';
    cmp.style.willChange = search.style.willChange = 'transform';
    const running = !!canim; canim = { target, t0: performance.now(), x0: cp - target, v0 };
    if (!running) requestAnimationFrame(cstep);
  }
  let ignorePop = false;
  const onCmpState = () => history.state && history.state.view === 'compare';
  function openCompare() {
    S.open = true; S.col = null; S.focus = 'all';
    folded = false; cmp.classList.remove('is-folded');
    renderPage(); scroller.scrollTop = 0; scroller.scrollLeft = 0; syncHeads();
    if (!onCmpState()) history.pushState({ view: 'compare' }, '', location.hash || '#results');
    H.soft(); cgo(1, 0);
  }
  function closeCompare(v0) {
    if (S.sheet) closeSheet(true);
    cgo(0, v0 === undefined ? 0 : v0);
    if (onCmpState()) { ignorePop = true; history.back(); }
  }
  addEventListener('popstate', () => {
    if (ignorePop) { ignorePop = false; return; }
    if (S.open && !onCmpState()) { if (S.sheet) closeSheet(true); cgo(0, 0); }
  });
  cmp.addEventListener('keydown', (e) => { if (e.key === 'Escape') (S.sheet ? closeSheet() : closeCompare()); });
  const edge = $('cmpEdge');
  edge.addEventListener('pointerdown', (e) => {
    if (cp < 0.5 && !canim) return;
    try { edge.setPointerCapture(e.pointerId); } catch (_) {}
    canim = null; cdrag = { x: e.clientX, p0: cp, s: [[performance.now(), e.clientX]] };
    cmp.style.willChange = search.style.willChange = 'transform';
  });
  edge.addEventListener('pointermove', (e) => {
    if (!cdrag) return;
    let nx = cdrag.p0 - (e.clientX - cdrag.x) / W; if (nx > 1) nx = 1 + (nx - 1) * 0.12;
    cp = Math.max(0, nx); const s = cdrag.s; s.push([performance.now(), e.clientX]);
    while (s.length > 2 && s[s.length - 1][0] - s[0][0] > 90) s.shift();
    crender();
  });
  const endEdge = () => {
    if (!cdrag) return;
    const s = cdrag.s, a = s[0], b = s[s.length - 1], vx = b[0] > a[0] ? (b[1] - a[1]) / (b[0] - a[0]) : 0, vp = (-vx * 1000) / W;
    cdrag = null;
    if (cp + vp * 0.18 < 0.5) closeCompare(vp); else cgo(1, vp);
  };
  edge.addEventListener('pointerup', endEdge); edge.addEventListener('pointercancel', endEdge);
  csettle(0);

  /* ── 4 · sheets ───────────────────────────────────────────────────────────────────────────── */
  function seg(on) {
    const ts = S.picked.map(tv);
    return `<div class="cseg" role="tablist">${ts.map((t) =>
      `<button class="cseg__b${t.sku === on ? ' is-on' : ''}" type="button" role="tab" aria-selected="${t.sku === on}" data-seg="${t.sku}"><span>${esc(t.model)}${ts.filter((o) => o.model === t.model).length > 1 ? ` ${t.size}″` : ''}</span></button>`).join('')}<i class="cseg__stop"></i></div>`;
  }
  // the underline sits under the active tab's words; it glides on a switch, jumps on a fresh render
  function setSeg(on) { csSeg.innerHTML = seg(on); placeTab(false); }
  function placeTab(glide) {
    const bar = csSeg.querySelector('.cseg'), w = csSeg.querySelector('.cseg__b.is-on span'), stop = csSeg.querySelector('.cseg__stop');
    if (!w) return;
    const x = w.getBoundingClientRect().left - bar.getBoundingClientRect().left;
    if (!glide) stop.style.transition = 'none';
    stop.style.width = `${w.offsetWidth}px`; stop.style.transform = `translateX(${x.toFixed(2)}px)`;
    if (!glide) { void stop.offsetWidth; stop.style.transition = ''; }
  }
  const starRow = (r) => `<span class="crv__st${r <= 2 ? ' is-low' : ''}" aria-label="${r} stars">${[1, 2, 3, 4, 5].map((k) => `<i class="${k <= r ? 'on' : ''}"></i>`).join('')}</span>`;
  const NOTE = '<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><circle cx="9" cy="9" r="7.6" fill="none" stroke="#9a6a12" stroke-width="1.4"/><path d="M9 5.4v4.4" stroke="#9a6a12" stroke-width="1.6" stroke-linecap="round"/><circle cx="9" cy="12.5" r=".95" fill="#9a6a12"/></svg>';
  const month = (d) => { if (!d) return ''; const [y, m] = d.split('-'); return `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][+m - 1]} ${y}`; };
  function reviewsHTML(t) {
    const mx = Math.max(1, ...[1, 2, 3, 4, 5].map((s) => t.bars[s] || 0)), st = lowStory(t), f = S.filter;
    const size = `${t.size}″`;
    const list = t.reviews.filter((r) => f === 'all' || (f === 'photos' ? !!r.photo : f === 'size' ? r.size === size : r.r === f));
    let h = `<div class="crv__top"><div class="crv__score"><b>${t.rating.toFixed(1)}</b><span>${num(t.count)} ratings</span><span>${t.written} written</span></div><div class="crv__bars">`
      + [5, 4, 3, 2, 1].map((s) => `<button class="crv__bar${f === s ? ' is-on' : ''}${s <= 2 ? ' is-low' : s === 3 ? ' is-mid' : ''}" type="button" data-filter="${s}" aria-pressed="${f === s}"><em>${s}★</em><u><i style="width:${Math.round(((t.bars[s] || 0) / mx) * 100)}%"></i></u><s>${num(t.bars[s] || 0)}</s></button>`).join('')
      + '</div></div>';
    if (st) h += `<div class="crv__note">${NOTE}<span>Most 1–2★ reviews are about ${st.text}${st.k === 'damage' ? ', not the picture' : ''}: ${st.n} of the ${st.of} we read.</span></div>`;
    if (t.summary.length) h += `<div class="crv__sum"><b>What buyers say</b>${t.summary.map((s) => `<p>${esc(s)}</p>`).join('')}<small>Summarised from written reviews by noon</small></div>`;
    if (t.buyer.length) h += `<p class="crv__h">Buyer photos</p><div class="crv__photos">${t.buyer.map((b) => `<span class="crv__ph"><img src="${esc(b.src)}" alt="Photo from a ${b.r}-star review" loading="lazy"><span>${b.r}★</span></span>`).join('')}</div>`;
    if (t.reviews.length) {
      h += `<div class="crv__fil">${[['all', 'All'], [5, '5★'], [1, '1★'], ['photos', 'With photos'], ['size', `${size} only`]].map(([id, l]) => `<button class="chip sk${f === id ? ' is-on' : ''}" type="button" data-filter="${id}">${l}</button>`).join('')}</div>`
        + '<p class="crv__hint">Reviews cover every screen size of this model.</p>'
        + (list.length ? list.map((r) => `<div class="crv__r">${starRow(r.r)}${r.title ? `<b>${esc(r.title)}</b>` : ''}<p>${esc(r.text)}</p>${r.photo ? `<img src="${esc(r.photo)}" alt="Photo from the reviewer" loading="lazy">` : ''}<small>${esc(r.who)} · Verified purchase${r.size ? ` · ${r.size}` : ''} · ${month(r.date)}</small></div>`).join('')
          : '<p class="crv__empty">No reviews match this filter.</p>');
    } else h += `<p class="crv__empty">No written reviews for the ${esc(t.model)} yet. ${num(t.count)} ${t.count === 1 ? 'person' : 'people'} left a star rating.</p>`;
    return h;
  }
  const SLIDE = 327;   // slide + gap
  function photosHTML(t) {
    const k = Math.min(S.photo, t.photos.length - 1);
    return `<div class="cph__car" id="cphCar">${t.photos.map((u, i) => `<div class="cph__s"><img src="${u}?width=800" alt="${esc(t.model)} photo ${i + 1}"${i > 1 ? ' loading="lazy"' : ''}></div>`).join('')}</div>`
      + `<div class="cph__row"><span class="cph__dots">${t.photos.map((_, i) => `<i class="${i === k ? 'on' : ''}"></i>`).join('')}</span><span class="cph__pos">${k + 1} of ${t.photos.length}</span></div>`
      + `<div class="cph__thumbs">${t.photos.map((u, i) => `<button class="cph__t${i === k ? ' is-on' : ''}" type="button" data-photo="${i}" aria-label="Photo ${i + 1}"><img src="${u}?width=160" alt=""></button>`).join('')}</div>`
      + `<p class="cph__hint">Switch TV above to see the same shot of each one.</p>`
      + (t.buyer.length ? `<p class="crv__h">From buyers</p><div class="crv__photos">${t.buyer.map((b) => `<span class="crv__ph" style="width:104px;height:104px"><img src="${esc(b.src)}" alt="Photo from a ${b.r}-star review" loading="lazy"><span>${b.r}★</span></span>`).join('')}</div>` : '');
  }
  function addHTML() {
    const inGrid = [...grid.querySelectorAll('.pslot')].filter((s) => s.style.display !== 'none').map((s) => s.querySelector('.pcard')).filter(Boolean).map((c) => c.dataset.sku).filter((s) => BY.has(s));
    const size = S.picked.length ? tv(S.picked[0]).size : 55;
    const more = TVS.filter((p) => p.in === size && !inGrid.includes(p.sku)).map((p) => p.sku);
    const seen = new Set(), uniq = (l) => l.filter((s) => { const k = tv(s).model + tv(s).size; if (seen.has(k) && !S.picked.includes(s)) return false; seen.add(k); return true; });
    const a = uniq(inGrid), b = uniq(more).slice(0, 10);
    const row = (s) => { const t = tv(s), on = S.picked.includes(s);
      return `<button class="cadd__r${on ? ' is-in' : ''}" type="button" data-add="${s}" aria-pressed="${on}"><span class="cadd__ph"><img src="${t.photos[0]}?width=160" alt="" loading="lazy"></span><span class="cadd__m"><b>${esc(t.model)} · ${t.size}″ ${esc(t.family)}</b><span>★ ${t.rating.toFixed(1)} (${num(t.count)}) · ${esc(t.panel)}${t.hz >= 100 ? ` · ${t.hz}Hz` : ''}</span><span class="cadd__p">${money(t.price)}</span></span><span class="cadd__b">${on ? CHECK.replace('#0e0e0e', '#fff') : PLUS}</span></button>`; };
    return (a.length ? `<p class="cadd__h">From your results</p>${a.map(row).join('')}` : '') + (b.length ? `<p class="cadd__h" style="margin-top:18px">More ${size}″ Samsung TVs</p>${b.map(row).join('')}` : '');
  }
  function renderSheet() {
    const t = S.sheetSku && tv(S.sheetSku);
    if (S.sheet === 'reviews') { csTitle.textContent = 'Ratings & reviews'; setSeg(t.sku); csBody.innerHTML = reviewsHTML(t); }
    else if (S.sheet === 'photos') {
      csTitle.textContent = 'Photos'; setSeg(t.sku); csBody.innerHTML = photosHTML(t);
      const car = $('cphCar'); car.scrollLeft = Math.min(S.photo, t.photos.length - 1) * SLIDE;
      car.addEventListener('scroll', () => {
        const k = Math.round(car.scrollLeft / SLIDE); if (k === S.photo) return;
        S.photo = k; H.tick();
        csBody.querySelectorAll('.cph__dots i').forEach((d, i) => d.classList.toggle('on', i === k));
        csBody.querySelectorAll('.cph__t').forEach((d, i) => d.classList.toggle('is-on', i === k));
        csBody.querySelector('.cph__pos').textContent = `${k + 1} of ${t.photos.length}`;
      }, { passive: true });
    } else if (S.sheet === 'info') { const [l, txt] = INFO_OF[S.infoKey] || ['', '']; csTitle.textContent = l; csSeg.innerHTML = ''; csBody.innerHTML = `<p class="cinfo">${txt}</p>`;
    } else if (S.sheet === 'add') { csTitle.textContent = `Add a TV · ${S.picked.length} of ${MAX}`; csSeg.innerHTML = ''; csBody.innerHTML = addHTML(); }
  }
  function openSheet(kind, sku, key) {
    S.infoKey = key; sheet.classList.toggle('is-short', kind === 'info');
    S.sheet = kind; S.sheetSku = sku || S.picked[0]; S.filter = 'all'; if (kind === 'photos') S.photo = 0;
    renderSheet(); csBody.scrollTop = 0;
    sheet.classList.add('is-open'); panel.style.transform = ''; H.soft();
    setTimeout(() => sheet.querySelector('.csheet__x').focus({ preventScroll: true }), 50);
  }
  function closeSheet(instant) {
    if (!S.sheet) return;
    S.sheet = null; sheet.classList.remove('is-open', 'is-dragging'); panel.style.transform = '';
    if (instant) { panel.style.transition = 'none'; requestAnimationFrame(() => { panel.style.transition = ''; }); }
  }
  sheet.querySelector('.csheet__scrim').addEventListener('click', () => closeSheet());
  sheet.querySelector('.csheet__x').addEventListener('click', () => closeSheet());
  sheet.addEventListener('click', (e) => {
    const sg = e.target.closest('[data-seg]');
    if (sg) {
      if (sg.dataset.seg === S.sheetSku) return;
      S.sheetSku = sg.dataset.seg; S.filter = 'all'; H.tick();
      csSeg.querySelectorAll('.cseg__b').forEach((b) => { const on = b.dataset.seg === S.sheetSku; b.classList.toggle('is-on', on); b.setAttribute('aria-selected', String(on)); });
      placeTab(true);
      const keep = S.sheet === 'photos';
      csBody.style.opacity = 0;
      setTimeout(() => {
        const t = tv(S.sheetSku);
        if (keep) { renderSheet(); setSeg(S.sheetSku); } else { csBody.innerHTML = reviewsHTML(t); csBody.scrollTop = 0; }
        csBody.style.transition = 'opacity .18s'; csBody.style.opacity = 1;
      }, 90);
      return;
    }
    const fl = e.target.closest('[data-filter]');
    if (fl) { const v = fl.dataset.filter; S.filter = /^\d$/.test(v) ? (S.filter === +v ? 'all' : +v) : v; H.tick(); const y = csBody.scrollTop; csBody.innerHTML = reviewsHTML(tv(S.sheetSku)); csBody.scrollTop = y; return; }
    const ph = e.target.closest('[data-photo]');
    if (ph) { const car = $('cphCar'); car.scrollTo({ left: +ph.dataset.photo * SLIDE, behavior: PP.reduce.matches ? 'auto' : 'smooth' }); return; }
    const ad = e.target.closest('[data-add]');
    if (ad) {
      const s = ad.dataset.add;
      if (S.picked.includes(s)) { if (S.picked.length <= 2) { H.edge(); return; } H.tick(); remove(s); }
      else if (S.picked.length >= MAX) { H.edge(); csTitle.textContent = 'You can compare up to 4 TVs'; setTimeout(() => S.sheet === 'add' && renderSheet(), 1400); }
      else { S.picked.push(s); H.snap(); sync(); }
      const y = csBody.scrollTop; renderSheet(); csBody.scrollTop = y;
    }
  });
  /* drag the sheet down by its grabber or header to dismiss (velocity-aware) */
  let sdrag = null;
  const startS = (e) => { if (e.target.closest('.csheet__x')) return; sdrag = { y: e.clientY, s: [[performance.now(), e.clientY]], dy: 0 }; sheet.classList.add('is-dragging'); try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {} };
  const moveS = (e) => { if (!sdrag) return; let dy = e.clientY - sdrag.y; if (dy < 0) dy *= 0.15; sdrag.dy = dy; panel.style.transform = `translate3d(0,${dy.toFixed(1)}px,0)`;
    const s = sdrag.s; s.push([performance.now(), e.clientY]); while (s.length > 2 && s[s.length - 1][0] - s[0][0] > 90) s.shift(); };
  const endS = () => { if (!sdrag) return; const s = sdrag.s, a = s[0], b = s[s.length - 1], v = b[0] > a[0] ? (b[1] - a[1]) / (b[0] - a[0]) : 0, dy = sdrag.dy; sdrag = null;
    sheet.classList.remove('is-dragging');
    if (dy > 150 || (v > 0.6 && dy > 20)) closeSheet(); else panel.style.transform = ''; };
  [sheet.querySelector('.csheet__grab'), sheet.querySelector('.csheet__hd')].forEach((el) => {
    el.addEventListener('pointerdown', startS); el.addEventListener('pointermove', moveS); el.addEventListener('pointerup', endS); el.addEventListener('pointercancel', endS);
  });
  document.documentElement.style.setProperty('--star', `url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12"><path d="M6 .8l1.6 3.3 3.6.5-2.6 2.5.6 3.6L6 9l-3.2 1.7.6-3.6L.8 4.6l3.6-.5z"/></svg>')}")`);
})();
