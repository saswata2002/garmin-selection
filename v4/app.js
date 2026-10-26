/* Brand Widget PLP — iteration 4 (/v4/) — iteration 3's TV flow, but the TV brand widget asks first: a three-step picker (budget → screen size → picture), a "Personalizing for you" beat, then each brand's best match and a re-sorted grid (phone and fitness reveal directly, as in 1); asset paths point to ../assets/ */
/* Android: phone GPUs pay heavily for animated blur filters and backdrop blurs, so on Android the
   motion keeps its timing and curves but drops the blur (transform + opacity only); html.is-android
   switches the CSS backdrop blurs off. Nothing changes on iPhone or desktop. */
const IS_ANDROID = /Android/i.test(navigator.userAgent);
if (IS_ANDROID) document.documentElement.classList.add('is-android');
/* noon Home — rails are data; everything else is static markup. */
(() => {
  const A = '../assets/';

  /* ── SKU cards (912:11004 et al.) ─────────────────────────────────── */
  const P = {
    airpods:  { img: '00ff6.png', size: 122, title: 'Apple Airpods Pro 2 Wireless Earbuds' },
    washer:   { img: '1a4eb.png', size: 142, title: 'Whirlpool 7 kg Magic Clean ' },
    maynos:   { img: '6648e.png', size: 122, title: 'MAYNOS Suction Phone Case Mount', spacer: true },
  };
  // badge: [svg, right inset %] — Group 1686556680/1 ("express" / "express Today")
  const rails = {
    reco: [
      { id: '912:11004', p: P.airpods, heart: 'b4444.svg', add: [94, 8], best: true, badge: ['818b4.svg', 2.06] },
      { id: '912:11085', p: P.washer,  heart: 'b4444.svg', add: [96, 8], ad: true,   badge: ['9b14c.svg', 3.29] },
      { id: '912:11153', p: P.maynos,  heart: '6478e.svg', add: [96, 6],             badge: ['818b4.svg', 2.06] },
    ],
    best: [
      { id: '912:11323', p: P.airpods, heart: '7209f.svg', add: [94, 8], best: true, badge: ['45c98.svg', 2.06] },
      { id: '912:11404', p: P.washer,  heart: '7209f.svg', add: [96, 8], ad: true,   badge: ['9e712.svg', 3.29] },
      { id: '912:11472', p: P.maynos,  heart: '6478e.svg', add: [96, 6],             badge: ['45c98.svg', 2.06] },
    ],
    summer: [
      { id: '912:11867', p: P.airpods, heart: '6478e.svg', add: [96, 8], flat: true, badge: ['9f1a6.svg', 2.06] },
      { id: '912:11947', p: P.washer,  heart: '6478e.svg', add: [96, 6], flat: true, badge: ['86b82.svg', 3.29] },
      { id: '912:12014', p: P.maynos,  heart: '6478e.svg', add: [96, 6], ad: true,   badge: ['9f1a6.svg', 2.06] },
    ],
    selling: [
      { id: '912:12100', p: P.airpods, heart: '7209f.svg', add: [94, 8], best: true, badge: ['9bd07.svg', 2.06] },
      { id: '912:12181', p: P.washer,  heart: '7209f.svg', add: [96, 8], ad: true,   badge: ['9e712.svg', 3.29] },
      { id: '912:12249', p: P.maynos,  heart: '6478e.svg', add: [96, 6],             badge: ['9bd07.svg', 2.06] },
    ],
  };

  const sku = (c) => `
    <article class="sku${c.flat ? ' sku--flat' : ''}" data-node-id="${c.id}">
      <div class="sku__img">
        <div class="sku__photo" style="width:${c.p.size}px;height:${c.p.size}px"><img src="${A}${c.p.img}" alt="${c.p.title.trim()}" /></div>
        <button class="sku__wish" aria-label="Add to wishlist"><img src="${A}${c.heart}" alt="" /></button>
        <button class="sku__add sk" style="left:${c.add[0]}px;border-radius:${c.add[1]}px" aria-label="Add to cart"><img src="${A}e4d22.svg" alt="" /></button>
        ${c.ad ? '<span class="ad">Ad</span>' : ''}
      </div>
      <div class="sku__info">
        <div class="sku__top">
          <p class="sku__title">${c.p.title}</p>
          <div class="sku__rate"><span class="chip-r"><span class="star"><img src="${A}98426.svg" alt="" /></span><span>4.3</span></span>${c.p.spacer ? '<i></i>' : ''}</div>
        </div>
        <div class="sku__price">
          <p class="sku__prow"><b>&#xE001;899</b><s>1399</s><em>33%</em></p>
          <p class="sku__del"><img src="${A}be986.svg" alt="" /><span>Free Delivery</span></p>
        </div>
        <div class="sku__badge"><img style="width:${100 - c.badge[1]}%" src="${A}${c.badge[0]}" alt="express" /></div>
      </div>
    </article>`;

  /* ── Keep shopping for (912:11555) ───────────────────────────────── */
  const IMG1234 = '<span class="ly clip" style="left:50%;top:calc(50% + 7.5px);width:86px;height:75px;transform:translate(-50%,-50%)"><img class="ab" style="left:-27.91%;top:-333.33%;width:393.02%;height:977.02%;object-fit:fill" src="' + A + 'e67d6.png" alt="" /></span>';
  const big = { w: 114, h: 130, bg: '#f9f9fb', sc: '#f1f7fd' };
  const sm  = { w: 100, h: 114, bg: '#ebedff', sc: 'rgba(26,26,26,.09)' };
  const chipViewed  = { bg: '#f1f7fd', pad: '2px 2px 2px 4px', color: '#0076ff', icon: 'ef851.svg' };
  const chipSmBlue  = { bg: '#eef5fd', pad: '2px 4px', color: '#0076ff', icon: 'e3e04.svg', w: 69 };
  const chipSmPlain = { bg: 'transparent', pad: '0', color: '#0076ff', icon: 'e3e04.svg', w: 96 };
  const keep = [
    { id: '912:11556', box: big, search: true, name: 'Playstation 5', chip: [chipViewed, '2 Viewed'],
      photo: `<span class="ly" style="left:calc(50% - 2.5px);top:calc(50% + 7.1px);width:129px;height:67px;transform:translate(-50%,-50%)"><img src="${A}5c6a4.png" alt="" /></span>` },
    { id: '912:11581', box: big, search: true, name: 'Adidas Rivalry', chip: [chipViewed, '5 Viewed'],
      photo: `<span class="ly" style="left:9px;top:16.6px;width:100px;height:100px"><img src="${A}89c98.png" alt="" /></span>` },
    { id: '912:11606', box: big, search: true, name: 'Body serum', chip: [chipViewed, '1 Viewed'],
      photo: `<span class="ly" style="left:calc(50% - 2.78px);top:calc(50% + 3.53px);width:80px;height:82px;transform:translate(-50%,-50%)"><img src="${A}b27a1.png" alt="" /></span>` },
    { id: '912:11631', box: { w: 107, h: 122, bg: '#f9f9fb', sc: 'rgba(14,14,14,.04)' }, name: 'Evo Sl', tag: '#fff',
      chip: [{ bg: '#fff', pad: '2px 4px', color: '#af33d9', icon: '40a61.svg' }, '10 Products'],
      photo: `<span class="ly" style="left:-1px;top:11.5px;width:100px;height:100px"><img src="${A}6b4ee.png" alt="" /></span>` },
    { id: '912:11656', box: sm, small: true, name: 'Playstation 5', tag: 'rgba(255,255,255,.55)', chip: [chipSmBlue, '2 Products'], photo: IMG1234 },
    { id: '912:11681', box: sm, small: true, name: 'Playstation 5', tag: 'rgba(255,255,255,.55)', chip: [chipSmBlue, '2 Products'], photo: IMG1234 },
    { id: '912:11706', box: sm, small: true, name: 'Playstation 5', tag: 'rgba(255,255,255,.55)', chip: [chipSmPlain, '2 Products'], photo: IMG1234 },
    { id: '912:11731', box: sm, small: true, name: 'Playstation 5', tag: 'rgba(255,255,255,.55)', chip: [chipSmPlain, '2 Products'], photo: IMG1234 },
    { id: '912:11756', box: sm, small: true, name: 'Playstation 5', tag: 'rgba(255,255,255,.55)', chip: [chipSmPlain, '2 Products'], photo: IMG1234 },
    { id: '912:11781', box: sm, small: true, name: 'Playstation 5', chip: [chipSmPlain, '4 Products'], photo: IMG1234 },
    { id: '912:11804', box: sm, small: true, name: 'Playstation 5', chip: [chipSmPlain, '4 Products'], photo: IMG1234 },
    { id: '912:11827', box: sm, small: true, name: 'Playstation 5', chip: [chipSmPlain, '4 Products'], photo: IMG1234 },
  ];
  const kc = (k) => {
    const [ch, label] = k.chip;
    return `
    <a class="kc${k.small ? ' kc--sm' : ''}" style="width:${k.box.w}px" data-node-id="${k.id}">
      <div class="kc__box stroke" style="width:${k.box.w}px;height:${k.box.h}px;background:${k.box.bg};--sc:${k.box.sc}">
        ${k.photo}
        ${k.tag ? `<span class="kc__tag" style="background:${k.tag}">2 days ago</span>` : ''}
      </div>
      <div class="kc__txt" style="padding:0 ${k.small ? 0 : 2}px">
        <div class="kc__name">${k.search ? `<img src="${A}61845.svg" alt="" />` : ''}<p>${k.name}</p></div>
        <span class="kc__chip" style="background:${ch.bg};padding:${ch.pad};color:${ch.color}${ch.w ? `;width:${ch.w}px` : ''}"><span>${label}</span><i><img src="${A}${ch.icon}" alt="" /></i></span>
      </div>
    </a>`;
  };

  for (const [name, cards] of Object.entries(rails)) {
    const el = document.querySelector(`[data-rail="${name}"]`);
    if (el) el.innerHTML = cards.map(sku).join('');
  }
  const keepEl = document.querySelector('[data-rail="keep"]');
  if (keepEl) keepEl.innerHTML = keep.map(kc).join('');

  /* ── Recommended tabs ────────────────────────────────────────────── */
  const tabs = document.getElementById('tabs');
  tabs.addEventListener('click', (e) => {
    const t = e.target.closest('.tab');
    if (!t) return;
    for (const b of tabs.children) {
      const on = b === t;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-selected', on);
    }
  });

  /* Tab Bar 912:10983 is sticky; its (hidden) white fill shows once stuck */
  const scroll = document.getElementById('scroll');
  const sbar = document.getElementById('sbar'), SBAR_H = 42.565;
  const onScroll = () => {
    const top = tabs.getBoundingClientRect().top - scroll.getBoundingClientRect().top;
    tabs.classList.toggle('is-stuck', top <= SBAR_H + 0.5 && scroll.scrollTop > 0);
    sbar.classList.toggle('is-solid', scroll.scrollTop > 2);        // content now passes under the status bar
  };
  scroll.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ══ Motion tokens — the ProtoPie Dev Handoff ═════════════════════════════
   cloud.protopie.io/p/041e0f998b5182ed0ca8ce6d/r/8e30fe8e ("noon X supermall",
   scenario Test01). Read from its recorded property tracks (≈120Hz), not
   eyeballed:
   · SPRING  every movement — stiffness 280.6, damping 27.14, mass 1
             (ω 16.75 rad/s, ζ 0.81, 1.3% overshoot, settled ≈0.5s).
             Fits the push, row-reveal and row-hide tracks to ≤0.08% RMS.
   · EASE_OUT fades in (rows, trending, cards): fast-start ease-out, 183ms;
             276ms for the widget.
   · EASE_IO  fades out, chips in, skeleton: S-curve, 189ms; 388ms for the
             skeleton fading in.
   · STAGGER 60ms in (top → bottom), 40ms out (bottom → top).
   · Push parallax: page 382 → 0 while the page under it goes 0 → −200.   */
const PP = (() => {
  const W = 16.75, Z = 0.81, WD = W * Math.sqrt(1 - Z * Z);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  // displacement / velocity of the spring released from x0 with velocity v0
  const disp = (x0, v0 = 0) => (t) => Math.exp(-Z * W * t) * (x0 * Math.cos(WD * t) + ((v0 + Z * W * x0) / WD) * Math.sin(WD * t));
  const vel  = (x0, v0 = 0) => (t) => Math.exp(-Z * W * t) * (v0 * Math.cos(WD * t) - ((Z * W * v0 + W * W * x0) / WD) * Math.sin(WD * t));
  const settleTime = (dist) => Math.max(0.2, Math.log(Math.max(Math.abs(dist), 0.02) / 0.02) / (Z * W) + 0.05);
  const EASE_OUT = 'linear(0, 0.2363, 0.3453, 0.4424, 0.5291, 0.607, 0.6754, 0.7351, 0.7873, 0.8322, 0.8702, 0.9019, 0.9278, 0.9489, 0.9654, 0.9779, 0.9871, 0.9933, 0.9971, 0.9991, 1)';
  const EASE_IO  = 'linear(0, 0.009, 0.0207, 0.0384, 0.0644, 0.1004, 0.1507, 0.2205, 0.3141, 0.4332, 0.5641, 0.6834, 0.7786, 0.8477, 0.8976, 0.9344, 0.9605, 0.9789, 0.9908, 0.9976, 1)';
  const OUT_MS = 183, OUT_LONG_MS = 276, IO_MS = 189, IO_LONG_MS = 388;

  /* spring-driven property as sampled WAAPI keyframes */
  function spring(el, from, to, fmt, { delay = 0, v0 = 0 } = {}) {
    if (reduce.matches) return el.animate([fmt(to), fmt(to)], { duration: 1, delay, fill: 'both' });
    const d = from - to, dur = settleTime(d), N = Math.max(12, Math.round(dur * 60)), f = disp(d, v0);
    const frames = Array.from({ length: N + 1 }, (_, k) => ({ offset: k / N, ...fmt(k === N ? to : to + f((k / N) * dur)) }));
    return el.animate(frames, { duration: dur * 1000, delay, fill: 'both' });
  }
  const moveY = (el, from, to, o) => spring(el, from, to, (v) => ({ transform: `translateY(${(+v).toFixed(2)}px)` }), o);
  function fade(el, from, to, { curve = 'out', ms, delay = 0 } = {}) {
    const duration = ms ?? (curve === 'out' ? OUT_MS : IO_MS);
    return el.animate([{ opacity: from }, { opacity: to }], { duration, delay, easing: curve === 'out' ? EASE_OUT : EASE_IO, fill: 'both' });
  }
  /* bake the end state once every animation has finished (a cancel skips it) */
  const commit = (el, anims, styles) => Promise.all(anims.map((a) => a.finished))
    .then(() => { Object.assign(el.style, styles); anims.forEach((a) => a.cancel()); }).catch(() => {});
  const cur = (el) => { const cs = getComputedStyle(el); return { op: +cs.opacity, y: cs.transform === 'none' ? 0 : new DOMMatrix(cs.transform).m42 }; };
  const stop = (el) => { const c = cur(el); el.getAnimations().forEach((a) => a.cancel()); el.style.opacity = c.op; el.style.transform = c.y ? `translateY(${c.y}px)` : ''; return c; };

  return { W, Z, disp, vel, settleTime, spring, moveY, fade, commit, cur, stop, reduce,
           EASE_OUT, EASE_IO, OUT_MS, OUT_LONG_MS, IO_MS, IO_LONG_MS, IN_STAGGER: 60, OUT_STAGGER: 40, PARALLAX: 200 / 382 };
})();

/* ══ Home ⇄ Search navigation — push on the ProtoPie spring ═══════════════
   One progress value p (0 = home, 1 = search) drives everything:
     search page   x = (1 − p) · W          slides in from the right
     home page     x = −(200/382) · W · p   parallax, as in the handoff
   Taps release the spring from rest (the handoff starts it on touch-up);
   an edge-swipe hands the finger's velocity to the same spring, so a push
   can be caught and reversed at any point without a jump.                */
(() => {
  const screen = document.getElementById('screen');
  const home   = document.getElementById('home');
  const dim    = document.getElementById('homeDim');
  const search = document.getElementById('search');
  const entry  = document.getElementById('searchEntry');
  const back   = document.getElementById('searchBack');
  const input  = document.getElementById('searchInput');
  const edge   = document.getElementById('searchEdge');
  const reduce = PP.reduce;

  let p = 0, v = 0;                // progress and its velocity (per second)
  let anim = null;                 // { target, t0, x0, v0 }
  let dragging = null;

  const W = () => screen.clientWidth || 375;

  function render() {
    const w = W();
    if (reduce.matches) {          // no travel: a cross-fade instead
      search.style.transform = 'none';
      search.style.opacity = Math.min(1, Math.max(0, p));
      home.style.transform = 'none';
    } else {
      search.style.opacity = '';
      search.style.transform = `translate3d(${((1 - p) * w).toFixed(2)}px,0,0)`;
      home.style.transform = p > 0 ? `translate3d(${(-PP.PARALLAX * w * p).toFixed(2)}px,0,0)` : '';
    }
    dim.style.opacity = 0;         // the handoff does not dim the page underneath
    search.style.visibility = p > 0.0005 ? 'visible' : 'hidden';
  }

  function settle(target) {
    p = target; v = 0; anim = null; render();
    const onSearch = target === 1;
    search.inert = !onSearch;
    home.inert = onSearch;
    home.style.willChange = search.style.willChange = '';
    if (!onSearch) { input.blur(); search.dispatchEvent(new CustomEvent('search:closed')); }
  }

  function step(now) {
    if (!anim) return;
    const t = (now - anim.t0) / 1000;
    const x = PP.disp(anim.x0, anim.v0)(t);
    v = PP.vel(anim.x0, anim.v0)(t);
    p = anim.target + x;
    if (Math.abs(x) < 0.0004 && Math.abs(v) < 0.02) return settle(anim.target);
    render();
    requestAnimationFrame(step);
  }

  function animateTo(target, v0 = v) {
    search.inert = false;          // reachable while travelling (interruptible)
    if (target > 0) search.style.visibility = 'visible';   // focusable from the first frame
    home.style.willChange = search.style.willChange = 'transform';
    const running = !!anim;
    anim = { target, t0: performance.now(), x0: p - target, v0 };
    if (!running) requestAnimationFrame(step);
  }
  const springTo = animateTo;

  /* History: the browser back button pops the search page too */
  let ignorePop = false;
  const onSearchState = () => history.state && history.state.view === 'search';
  function openSearch() {
    if (!onSearchState()) history.pushState({ view: 'search' }, '', '#search');
    animateTo(1, 0);               // un-inerts the page first, so it can take focus
    search.dispatchEvent(new CustomEvent('search:push'));
    // Focus in the tap itself so a real phone raises its keyboard with the push;
    // preventScroll stops the off-screen input from scrolling the device frame.
    input.focus({ preventScroll: true });
  }
  function closeSearch(v0) {
    animateTo(0, v0 === undefined ? 0 : v0);
    if (onSearchState()) { ignorePop = true; history.back(); }
  }
  addEventListener('popstate', () => {
    if (ignorePop) { ignorePop = false; return; }
    const toSearch = location.hash === '#search' || location.hash === '#results';
    // A typed/linked #search arrives with no state — tag it so Back can pop it
    if (toSearch && !onSearchState()) history.replaceState({ view: 'search' }, '', location.href);
    animateTo(toSearch ? 1 : 0, 0);
  });

  entry.addEventListener('click', openSearch);
  entry.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSearch(); }
  });
  back.addEventListener('click', () => closeSearch());
  search.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSearch(); });

  /* Edge swipe back (left 24px strip): follows the finger 1:1, then the
     release velocity is projected forward to decide pop vs. stay. */
  edge.addEventListener('pointerdown', (e) => {
    if (p < 0.5 && !anim) return;
    try { edge.setPointerCapture(e.pointerId); } catch (_) { /* synthetic / already released */ }
    anim = null;                               // catch it mid-flight
    dragging = { x: e.clientX, p0: p, samples: [[performance.now(), e.clientX]] };
    home.style.willChange = search.style.willChange = 'transform';
    input.blur();
  });
  edge.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const w = W();
    let next = dragging.p0 - (e.clientX - dragging.x) / w;
    if (next > 1) next = 1 + (next - 1) * 0.12;  // rubber-band past fully open
    p = Math.max(0, next);
    const s = dragging.samples; s.push([performance.now(), e.clientX]);
    while (s.length > 2 && s[s.length - 1][0] - s[0][0] > 90) s.shift();
    render();
  });
  const endDrag = (e) => {
    if (!dragging) return;
    const s = dragging.samples, a = s[0], b = s[s.length - 1];
    const vx = b[0] > a[0] ? (b[1] - a[1]) / (b[0] - a[0]) : 0;   // px/ms, + = rightwards
    const vp = (-vx * 1000) / W();                                 // progress per second
    dragging = null;
    const projected = p + vp * 0.18;                               // UIKit-style projection
    if (projected < 0.5) closeSearch(vp); else springTo(1, vp);
  };
  edge.addEventListener('pointerup', endDrag);
  edge.addEventListener('pointercancel', endDrag);

  // The scene always starts on Home: a reload on #search / #results (or any
  // restored hash) is cleaned back to the bare page instead of deep-linking.
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  history.replaceState({ view: 'home' }, '', location.pathname + location.search);
  settle(0);
})();

/* ══ Search suggestions — ProtoPie handoff motion ═════════════════════════
   From the recording (typed "iphone" there; this build suggests letter by letter — see matches()):
   · push: trending + banners rise 20px while fading in, 124ms after touch-up
   · first keystroke: they drop 20px while fading out (S-curve)
   · query becomes "phone": 110ms later the rows arrive TOP→BOTTOM
     60ms apart, each falling 20px on the spring with the ease-out fade
   · query stops matching: rows leave BOTTOM→TOP 40ms apart, lifting 20px
     on the spring with the S-curve fade
   Every animation starts from the element's current opacity/position.   */
(() => {
  const search  = document.getElementById('search');
  const input   = document.getElementById('searchInput');
  const art     = document.querySelector('.srch__art');
  const box     = document.getElementById('suggest');
  const rows    = [...box.querySelectorAll('.sug')];

  const REVEAL_DELAY = 110, ART_PUSH_DELAY = 124, TRAVEL = 20, MAX = rows.length;

  /* Suggestion sets, keyed by the exact query that shows them. "phone" is the
     markup as built (sprite thumbnails from the Figma); the others swap each
     row's thumbnail, label and query in while the rows are hidden. Fitness
     tracker thumbnails are noon.com/uae-en listing photos (2026-10-05). */
  const NOON = 'https://f.nooncdn.com/p/pzsku/';
  const SETS = {
    phone: rows.map((r) => ({ q: r.dataset.q, html: r.querySelector('.sug__thumb').innerHTML })),
    'fitness tracker': [
      { q: 'fitness tracker',                 img: 'Z7F193E00BC121BC1D162Z/45/_/1779873219/9844bee2-6f17-456f-98d3-9a5c729b38c8' },   // Fitbit Charge 6
      { q: 'fitness tracker band',            img: 'Z1322AB5620FF352CBA12Z/45/_/1786944978/381d32ed-3cf6-4aaf-914f-1e0b35cbff26' },   // porodo Smart Band
      { q: 'fitness tracker screenless',      img: 'ZF5A17744EFCDADAEDD11Z/45/_/1779345351/4ce43a49-b2a2-43e4-a2fb-08685372247c' },   // Google Fitbit Air
      { q: 'fitness tracker for women',       img: 'ZA29379A5062B5830F005Z/45/_/1779873383/f4b57d7f-e63d-4fcf-9370-d601a1cdf48e' },   // Fitbit Inspire HR Lilac
      { q: 'fitness tracker with heart rate', img: 'Z863C04E5C086CC7C08BBZ/45/_/1790146470/ab4c994e-792d-45db-8c1a-8a3b9d448321' },   // ORYX band
    ],
    tv: [   // noon.com/uae-en TV listing photos (2026-10-22)
      { q: 'tv',          img: 'Z331F6F9B84F5374FD435Z/45/_/1772180320/0d31b0ea-3e9d-4769-9bb2-dbd7e1bad196' },   // Samsung Q6F 55"
      { q: 'tv 55 inch',  img: 'ZC940392BDA2BDEB43C6EZ/45/_/1787835053/901b60ff-b678-4170-8339-667ede58846b' },   // Hisense 55E7Q
      { q: 'tv 65 inch',  img: 'ZE88D74FAB795619572BFZ/45/_/1779345237/d847e07e-fb7b-4c15-9624-31f0d4c3f799' },   // TCL 65" QLED
      { q: 'tv 4k',       img: 'ZF48A39BAF575C70368C0Z/45/_/1780467020/88e01da1-ae7f-499b-bedf-dfb2685513d4' },   // Xiaomi TV S Mini LED 55"
      { q: 'tv oled',     img: 'Z161B06F43A57C1103952Z/45/_/1780306903/835f1735-f869-4e58-b4d3-66857add83b4' },   // LG OLED 55"
    ],
  };
  // warm the fitness photos once the search page is up, so they're decoded before they reveal
  const warmSet = (key) => SETS[key].forEach((it) => { if (!it.img) return; const im = new Image(); im.src = `${NOON}${it.img}.jpg?width=120`; });

  /* Suggestions as you type, letter by letter: every query that STARTS WITH what is typed — the design
     sets above first, then NOON_SUGGEST (assets/suggest-data.js: popular noon queries for every letter,
     each with the top noon.com product photo). When the matches span several words (one letter typed:
     "p" → phone, power bank, perfume, playstation…) each word gets one row, its head term, most popular
     first; once only one word is left ("ph" → phone…) its rows follow in order, so "phone" and
     "fitness tracker" still show the design's five rows. The typed letters are bold, as in the design. */
  const CDN = 'https://f.nooncdn.com/p/';
  const DATA = [];
  const seen = new Set();
  [...SETS.phone, ...SETS['fitness tracker'].map((it) => ({ q: it.q, img: 'pzsku/' + it.img })), ...SETS.tv.map((it) => ({ q: it.q, img: 'pzsku/' + it.img })), ...(window.NOON_SUGGEST || []).map(([q, img]) => ({ q, img }))]
    .forEach((s) => { if (!seen.has(s.q)) { seen.add(s.q); DATA.push(s); } });
  function matches(q) {
    if (!q) return [];
    const hit = DATA.filter((s) => s.q.startsWith(q)), groups = new Map();
    hit.forEach((s) => { const w = s.q.split(' ')[0]; if (!groups.has(w)) groups.set(w, []); groups.get(w).push(s); });
    if (groups.size <= 1) return hit.slice(0, MAX);
    const out = [...groups.values()].map((g) => g.reduce((a, b) => (b.q.length < a.q.length ? b : a))).slice(0, MAX);
    for (const s of hit) { if (out.length >= MAX) break; if (!out.includes(s)) out.push(s); }
    return out;
  }
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const thumbOf = (s) => s.html || `<span class="sug__img sug__img--photo"><img src="${CDN}${s.img}.jpg?width=120" alt="" decoding="async" /></span>`;
  let shownKey = '';                               // what the rows hold now ("q|a|b|…")
  /* While typing, a row whose suggestion changes CROSSFADES rather than swapping: the old label and photo
     lift 5px, soften (blur 2px) and fade out on the S-curve, while the new ones rise 5px into place on the
     ease-out, 40ms behind. Changed rows cascade top → bottom 28ms apart. A new photo waits (≤250ms) to be
     decoded first, so it never pops in after its fade. Only the bold part moving is updated in place. */
  const XF = { OUT: 160, IN: 260, LAG: 40, STEP: 28, SHIFT: 5, BLUR: IS_ANDROID ? 0 : 2, WAIT_IMG: 250 };
  function crossfade(old, fresh, delay) {
    const parent = old.parentNode;
    parent.querySelectorAll(':scope > .is-ghost').forEach((g) => g.remove());       // an older crossfade: drop it
    const op = +getComputedStyle(old).opacity, x = old.offsetLeft, y = old.offsetTop, w = old.offsetWidth;
    old.getAnimations().forEach((a) => a.cancel());
    old.classList.add('is-ghost');
    Object.assign(old.style, { position: 'absolute', left: `${x}px`, top: `${y}px`, width: `${w}px`, margin: '0', opacity: op });
    parent.insertBefore(fresh, old);
    fresh.style.opacity = 0;
    const img = fresh.querySelector('img');
    const ready = img && !img.complete
      ? Promise.race([img.decode().catch(() => {}), new Promise((r) => setTimeout(r, XF.WAIT_IMG))])
      : Promise.resolve();
    ready.then(() => {
      if (!old.isConnected && !fresh.isConnected) return;
      const out = old.animate([{ opacity: op, transform: 'translateY(0)', filter: 'blur(0)' },
                               { opacity: 0, transform: `translateY(${-XF.SHIFT}px)`, filter: `blur(${XF.BLUR}px)` }],
                              { duration: XF.OUT, delay, easing: PP.EASE_IO, fill: 'both' });
      out.finished.then(() => old.remove()).catch(() => {});
      const inn = fresh.animate([{ opacity: 0, transform: `translateY(${XF.SHIFT}px)`, filter: `blur(${XF.BLUR}px)` },
                                { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' }],
                               { duration: XF.IN, delay: delay + XF.LAG, easing: PP.EASE_OUT, fill: 'both' });
      inn.finished.then(() => { fresh.style.opacity = ''; inn.cancel(); }).catch(() => {});
    });
  }
  const make = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const labelHtml = (s, q) => `<b>${esc(s.q.slice(0, q.length))}</b>${esc(s.q.slice(q.length))}`;
  function fillRows(list, q, animate) {
    const smooth = animate && !PP.reduce.matches;
    let changed = 0, fresh = 0, gone = 0;
    rows.forEach((r, i) => {
      const s = list[i];
      if (!s) {                                    // fewer results: the extra rows leave like the backspace exit, then leave the layout
        if (!r.hidden) {
          r._s = null;
          if (smooth && PP.cur(r).op > 0.02) {
            const c = PP.stop(r), d = gone++ * XF.STEP;
            const a = r.animate([{ opacity: c.op, transform: `translateY(${c.y}px)` }, { opacity: 0, transform: `translateY(${c.y - XF.SHIFT * 2}px)` }],
                                { duration: XF.OUT + 40, delay: d, easing: PP.EASE_IO, fill: 'both' });
            a.finished.then(() => { if (!r._s) { r.hidden = true; r.style.opacity = 0; r.style.transform = ''; } a.cancel(); }).catch(() => {});
          } else { PP.stop(r); r.hidden = true; r.style.opacity = 0; }
        }
        return;
      }
      const was = r._s, wasHidden = r.hidden, appearing = wasHidden || PP.cur(r).op < 0.02;
      r._s = s; r.hidden = false; r.dataset.q = s.q;
      r.querySelector('.sug__fill').setAttribute('aria-label', `Use “${s.q}”`);
      const label = r.querySelector('.sug__label:not(.is-ghost)'), th = r.querySelector('.sug__thumb'), html = thumbOf(s);
      const swap = smooth && !appearing && was && was.q !== s.q;
      if (swap) {
        const d = changed++ * XF.STEP;
        const nl = make(`<span class="sug__label">${labelHtml(s, q)}</span>`);
        crossfade(label, nl, d);
        if (th._html !== html) { const im = th.querySelector('.sug__img:not(.is-ghost)'); th._html = html; im ? crossfade(im, make(html), d) : (th.innerHTML = html); }
      } else {
        label.innerHTML = labelHtml(s, q);       // same suggestion: only the bold part moves
        if (th._html !== html) { th.querySelectorAll('.is-ghost').forEach((g) => g.remove()); th.innerHTML = html; th._html = html; }
      }
      if (smooth && appearing) { if (r.parentNode) revealRow(r, fresh++ * PP.IN_STAGGER); }       // a new row falls in
    });
  }
  const warmed = new Set();
  const warm = (list) => list.forEach((s) => { if (!s.img || warmed.has(s.img)) return; warmed.add(s.img); const im = new Image(); im.decoding = 'async'; im.src = `${CDN}${s.img}.jpg?width=120`; });

  function revealRow(el, delay) {
    const c = PP.stop(el), fresh = c.op < 0.02;
    const a = [PP.moveY(el, fresh ? -TRAVEL : c.y, 0, { delay }), PP.fade(el, fresh ? 0 : c.op, 1, { curve: 'out', delay })];
    PP.commit(el, a, { opacity: 1, transform: '' });
  }
  // fast = the exit into results: quicker and shorter, so it can finish before the page arrives
  const FAST = { STAGGER: 25, FADE_MS: 130, MOVE_MS: 150, TRAVEL: 12 };
  function hideRow(el, delay, fast = false) {
    const c = PP.stop(el);
    if (c.op < 0.02) { el.style.opacity = 0; el.style.transform = ''; return; }
    const a = fast
      ? [el.animate([{ transform: `translateY(${c.y}px)` }, { transform: `translateY(${-FAST.TRAVEL}px)` }], { duration: FAST.MOVE_MS, delay, easing: PP.EASE_IO, fill: 'both' }),
         PP.fade(el, c.op, 0, { curve: 'io', ms: FAST.FADE_MS, delay })]
      : [PP.moveY(el, c.y, -TRAVEL, { delay }), PP.fade(el, c.op, 0, { curve: 'io', delay })];
    PP.commit(el, a, { opacity: 0, transform: '' });
  }
  function artTo(show, delay = 0) {
    const c = PP.stop(art);
    const a = show
      ? [PP.moveY(art, c.op < 0.02 ? TRAVEL : c.y, 0, { delay }), PP.fade(art, c.op, 1, { curve: 'out', delay })]
      : [PP.moveY(art, c.y, TRAVEL, { delay }), PP.fade(art, c.op, 0, { curve: 'io', delay })];
    PP.commit(art, a, show ? { opacity: 1, transform: '' } : { opacity: 0, transform: `translateY(${TRAVEL}px)` });
  }

  let state = 'hidden';            // hidden | showing | hiding
  let revealTimer = 0;
  let swapTimer = 0;
  let hideEnd = 0;                 // when the rows' current exit finishes (performance.now ms)
  const ART_GAP = 40;              // field cleared: trending comes in this long after the last row has left
  const SETTLE = 60;
  function show() {
    state = 'showing';
    box.classList.add('is-on'); box.setAttribute('aria-hidden', 'false');
    rows.forEach((r, i) => { if (!r.hidden) revealRow(r, PP.reduce.matches ? 0 : i * PP.IN_STAGGER); });
  }
  function hide(fast = false) {
    state = 'hiding';
    box.classList.remove('is-on'); box.setAttribute('aria-hidden', 'true');
    const live = rows.filter((r) => PP.cur(r).op > 0.02).reverse();   // lowest first
    const stagger = PP.reduce.matches ? 0 : fast ? FAST.STAGGER : PP.OUT_STAGGER;
    rows.forEach((r) => { if (!live.includes(r)) hideRow(r, 0, fast); });
    live.forEach((r, j) => hideRow(r, j * stagger, fast));
    // when the last row is gone (ms) — the results page and the trending block wait for this
    const ms = live.length ? (live.length - 1) * stagger + (fast ? FAST.MOVE_MS : PP.IO_MS) : 0;
    hideEnd = performance.now() + ms;
    return ms;
  }

  let artShown = true;
  function update() {
    const q = input.value.trim().toLowerCase();
    clearTimeout(revealTimer); clearTimeout(swapTimer);
    const list = matches(q), key = q + '|' + list.map((s) => s.q).join('|');
    if (q) warm(DATA.filter((s) => s.q.startsWith(q)).slice(0, 12));   // the next letters' photos too
    if (list.length) {
      // still typing: rows update in place — a burst of keys within SETTLE ms lands as one change
      if (state === 'showing') { if (key !== shownKey) swapTimer = setTimeout(() => { fillRows(list, q, true); shownKey = key; }, SETTLE); }
      else revealTimer = setTimeout(() => { fillRows(list, q, false); shownKey = key; show(); }, REVEAL_DELAY);
    } else if (state === 'showing') {
      hide(); shownKey = '';
    }
    // trending in/out — when the field is cleared it waits for the rows' exit, so the two never overlap
    if ((q === '') !== artShown) {
      artShown = q === '';
      artTo(artShown, artShown ? Math.max(0, hideEnd - performance.now()) + ART_GAP : 0);
    }
  }
  input.addEventListener('input', update);

  // The push brings the trending block in on its own beat
  search.addEventListener('search:push', () => { warmSet('fitness tracker'); warmSet('tv'); });
  search.addEventListener('search:push', () => {
    if (input.value.trim()) return;
    PP.stop(art); art.style.opacity = 0; art.style.transform = `translateY(${TRAVEL}px)`;
    artShown = true; artTo(true, ART_PUSH_DELAY);
  });

  /* Picking a suggestion puts it in the search field. What was typed stays exactly where it is and only the
     rest of the query fades in after it ("fit" + "ness tracker"), on the S-curve over 320ms — the field's own
     text is hidden meanwhile and a copy in the same type (.srch__fill) carries the fade, then hands back.
     If the typed text isn't a prefix of the pick, the whole query fades in. A tap then opens results; the ↖
     arrow stays and refreshes the suggestions for the new query. */
  const FILL_MS = 320;
  let fillCopy = null;
  function stopFill() { if (fillCopy) { fillCopy.remove(); fillCopy = null; } input.classList.remove('is-filling'); }
  function fillField(q) {
    stopFill();
    const shown = input.value, keep = q.startsWith(shown) ? shown.length : 0;
    input.value = q;
    if (PP.reduce.matches || keep === q.length) return;
    const c = document.createElement('span');
    c.className = 'srch__fill'; c.setAttribute('aria-hidden', 'true');
    c.innerHTML = `<span>${esc(q.slice(0, keep))}</span><span>${esc(q.slice(keep))}</span>`;
    input.parentNode.appendChild(c); input.classList.add('is-filling'); fillCopy = c;
    const done = () => { if (fillCopy === c) stopFill(); };
    PP.fade(c.lastChild, 0, 1, { curve: 'io', ms: FILL_MS }).finished.then(done).catch(() => {});
    setTimeout(done, FILL_MS + 80);                  // even if the animation is held (a background tab)
  }

  // Tapping a suggestion opens results; its ↖ arrow puts it in the field
  box.addEventListener('click', (e) => {
    const row = e.target.closest('.sug');
    if (!row) return;
    if (e.target.closest('.sug__fill')) {
      input.focus({ preventScroll: true });
      fillField(row.dataset.q);
      update();
      return;
    }
    fillField(row.dataset.q);
    search.dispatchEvent(new CustomEvent('plp:open', { detail: { q: row.dataset.q } }));
  });

  // Results page hands the list back and forth
  search.suggest = {
    hideForResults() { clearTimeout(revealTimer); clearTimeout(swapTimer); return hide(true); },   // quicker exit; returns its length (ms)
    restore() { shownKey = ''; update(); },                    // back from results: rows return
  };

  // Leaving the page resets it, so the next visit starts from trending
  search.addEventListener('search:closed', () => {
    clearTimeout(revealTimer); clearTimeout(swapTimer);
    box.querySelectorAll('.is-ghost').forEach((g) => g.remove()); stopFill();
    [art, ...rows].forEach(PP.stop);
    input.value = '';
    art.style.opacity = 1; art.style.transform = ''; artShown = true;
    rows.forEach((r) => { r.style.opacity = 0; r.style.transform = ''; });
    state = 'hidden'; shownKey = ''; box.classList.remove('is-on'); box.setAttribute('aria-hidden', 'true');
  });
})();

/* ══ Results (PLP 920:18788) — ProtoPie handoff motion ═══════════════════
   t = 0 is touch-up on a suggestion:
     +0      suggestion rows leave, bottom→top 25ms apart, 130ms fade + 12px
             lift — a quicker version of the backspace exit (~250ms for 5)
   then, from the moment the last row is gone (+10ms, no overlap):
     +0      the page layer fades in — S-curve, 300ms; the search bar never moves
     +224ms  bottom nav rises 88px on the spring
     +200ms  first shimmer pass (every 1.867s — .skel::after)
     +480ms  chips drop 20px into place, 60ms apart (spring + S-curve fade)
     +680ms  cards rise 16px into place, 60ms apart (spring + ease-out fade);
             each card's skeleton fades out 353ms after it starts (S-curve)
   The hand-off's own wait is ~5s; it stays shortened on request.         */
(() => {
  const search = document.getElementById('search');
  const input  = document.getElementById('searchInput');
  const back   = document.getElementById('searchBack');
  const plp    = document.getElementById('plp');
  const grid   = document.getElementById('plpGrid');
  const scroll = document.getElementById('plpScroll');
  const nav    = document.getElementById('plpNav');
  const tags   = document.getElementById('plpTags');
  const chips  = [...plp.querySelectorAll('.chip')];
  const A = '../assets/';

  // times are from the end of the suggestions' exit (nothing overlaps it); SKEL_MS is the layer fade
  const T = { SKEL_AT: 0, SKEL_MS: 300, NAV_AT: 224, CHIPS_AT: 480, CARDS_AT: 680, CHIP_DROP: 20, CARD_RISE: 16, SKEL_OUT_AFTER: 353 };

  /* Cards — real "phone" listings from noon.com/uae-en (one per brand, read
     2026-10-05 from each search page's product hits: name, sale price, rating,
     review count, best-seller flag, "Lowest price in …" nudge, bank offer).
     Photos are served from noon's CDN; white backgrounds multiply into the
     #FAFAFA media panel. */
  const CDN = 'https://f.nooncdn.com/p/pzsku/';
  const PRODUCTS = [
    { sku: 'N70211465V', best: true,  img: 'Z89B9D1453263B2B2EBC0Z/45/_/1779094477/5245f187-f6a6-4434-92bd-edf2eadf0506',
      title: 'Apple iPhone 17 Pro Max 256 GB (eSIM only) Cosmic Orange 5G With FaceTime - International Version', rating: 4.5, reviews: 33767, price: '4749', low: 'Lowest price in a year', offers: 1 },
    { sku: 'N70167848V', best: true,  img: 'Z0271938C8770AF4FC268Z/45/_/1772091309/65ab6695-a976-46f8-a1a1-c38ad732fef9',
      title: 'Samsung Galaxy S25 Ultra AI Dual SIM Jetblack 12GB RAM 256GB 5G - Middle East Version', rating: 4.7, reviews: 50474, price: '2999', offers: 1 },
    { sku: 'N70338933V', best: false, img: 'Z8E3A3AC1F93C43961D40Z/45/_/1779344747/50933cc8-85e8-474f-8dfb-03ffa1dddfab',
      title: 'Google Pixel 10a 5G Obsidian, 8GB RAM, 256GB Storage - International Version', rating: 4.7, reviews: 16, price: '1943', offers: 1 },
    { sku: 'N70350080V', best: false, img: 'Z665506761C9B29FABD0FZ/45/_/1780572632/3da65153-dbf0-4559-a5d1-9315b52b90af',
      title: 'Honor 600 5G Dual SIM 8GB RAM 256GB Black - Middle East Version', rating: 4.5, reviews: 2857, price: '1484', low: 'Lowest price in 30 days', offers: 1 },
    { sku: 'N70176681V', best: false, img: 'Z7F05099DB5516E1EE37DZ/45/_/1775486899/5b637f78-da15-4de9-b608-f2d1637d713f',
      title: 'Nothing Phone 3a Pro 5G Dual SIM Grey 12GB RAM 256GB - Middle East Version', rating: 4.4, reviews: 995, price: '1449', offers: 1 },
    { sku: 'N70370643V', best: false, img: 'Z5ABF1523CCCC983351F6Z/45/_/1783925252/452bc35c-a310-4600-9533-d1e09aae50cc',
      title: 'HUAWEI nova 15 Max Dual SIM Blush Gold 8+8GB RAM 256GB + FOC + Exclusive 1 year Huawei Care+ With freebuds SE 2 - Middle East Version', rating: 4.1, reviews: 179, price: '1190', offers: 0 },
    { sku: 'N70190662V', best: false, img: 'ZD07CA20E5A384FDA102AZ/45/_/1779715216/5e43e1ab-c230-4a89-a1cd-0d591b1da470',
      title: 'OnePlus Nord CE5 Dual SIM Marble Mist 8GB RAM 256GB 5G - International Version', rating: 4.3, reviews: 875, price: '1049', offers: 1 },
    { sku: 'N70270108V', best: false, img: 'Z4C07D4EBE2D9361F7275Z/45/_/1782742379/e29d4f28-31f8-4bb9-b610-6ff89c34bf91',
      title: 'Xiaomi Redmi Note 15 Dual SIM 5G Black 8G RAM 256GB - Global Version', rating: 4.4, reviews: 535, price: '945', offers: 1 },
  ];
  /* "View Apple" from the brand widget swaps the grid to all-Apple: eight current
     iPhones from noon.com/uae-en search hits (2026-10-05), same fields as above */
  const APPLE = [
    { sku: 'N70211466V', best: false, img: 'Z4AEC1BA6ECB4841878ECZ/45/_/1779094376/a09b4e3f-6baf-4adb-831b-07995a07bc61',
      title: 'Apple iPhone 17 Pro Max 256 GB (eSIM only) Deep Blue 5G With FaceTime - International Version', rating: 4.5, reviews: 33767, price: '4649', low: 'Lowest price in a year', offers: 1 },
    { sku: 'N70211681V', best: false, img: 'Z6B0FF81541C93C23FA1AZ/45/_/1779094169/7011453c-3bf2-472e-811f-f0417c60ed57',
      title: 'Apple iPhone 17 Pro 256 GB (eSIM only) Cosmic Orange 5G With FaceTime - International Version', rating: 4.5, reviews: 33767, price: '4149', low: 'Lowest price in a year', offers: 1 },
    { sku: 'N70211650V', best: false, img: 'Z9CDBAEEEC6CA7B22D8A2Z/45/_/1779094655/fe905450-c727-488d-af92-3e64412b2d02',
      title: 'Apple iPhone Air 256GB (eSIM only) Sky Blue 5G With FaceTime - International Version', rating: 4.6, reviews: 1694, price: '3399', offers: 1 },
    { sku: 'N70211555V', best: false, img: 'Z47CDA33CB5F64484197DZ/45/_/1779094751/569f50fb-8332-4f5b-9bed-853383644147',
      title: 'Apple iPhone 17 256GB (Nano SIM + eSIM) Lavender 5G With FaceTime - International Version', rating: 4.6, reviews: 6556, price: '3399', offers: 1 },
    { sku: 'N70105592V', best: false, img: 'Z613A3653E5E4568EBA42Z/45/_/1779199499/06c61bfb-7bcb-4241-9d29-9ccdda873444',
      title: 'Apple iPhone 16 Pro Max 256GB Desert Titanium 5G With FaceTime - Middle East Version', rating: 4.6, reviews: 36223, price: '4249', offers: 0 },
    { sku: 'N70106132V', best: false, img: 'ZF3E672722279A046DBFAZ/45/_/1779199413/9455d7b9-80b4-4f2c-91b7-7b52820b3f2f',
      title: 'Apple iPhone 16 128GB Ultramarine 5G With FaceTime - International Version', rating: 4.6, reviews: 17341, price: '2870', offers: 1 },
    { sku: 'N70154969V', best: false, img: 'ZEBB4C6904E434A38D2D3Z/45/_/1779094344/37ee5264-a915-494c-8d48-919dc9704571',
      title: 'Apple iPhone 16e 512GB White 5G With Facetime - Middle East Version', rating: 4.6, reviews: 1269, price: '2699', offers: 1 },
    { sku: 'N53433297A', best: false, img: 'Z8C9A31643D9D981C55D7Z/45/_/1779094597/d94862ac-ee1e-4135-adde-ecfa36d73251',
      title: 'Apple iPhone 15 128GB Blue 5G With FaceTime - International Version', rating: 4.6, reviews: 22398, price: '2399', offers: 1 },
  ];
  /* The other 13 brands of the widget — phones from noon.com/uae-en search hits
     (2026-10-05; name, sale price, rating, review count, "Lowest price" nudge,
     bank offer). Brands with fewer listings show fewer cards. */
  /* Samsung — 8 phones */
  const L_SAMSUNG = [
    { sku: 'N70142936V', best: false, img: 'Z8EAF06174BF88ED99DB5Z/45/_/1790066543/257907e2-6095-478d-9add-f954244a0a5c', title: 'Samsung Galaxy S25 Ultra Dual SIM Titanium Whitesilver 12GB RAM 256GB 5G - International Version', rating: 4.7, reviews: 50474, price: '2849.60', low: 'Lowest price in 30 days', offers: 1 },
    { sku: 'N70142917V', best: false, img: 'Z9FA14F87D9EC0554A5E6Z/45/_/1772091161/4c304e28-be72-4215-82cd-ef69df52477c', title: 'Samsung Galaxy S25 Dual SIM Icyblue 12GB RAM 256GB 5G - International Version', rating: 4.8, reviews: 13283, price: '2249', offers: 0 },
    { sku: 'N70187007V', best: false, img: 'Z5CFD59B59BF851BA11CEZ/45/_/1772091069/d5d3d6bb-96bb-43e3-ae9e-fd0953aa7cae', title: 'Samsung Galaxy Z Fold 7 Dual SIM Blue Shadow 12GB 256GB 5G - Middle East Version', rating: 4.6, reviews: 2013, price: '4899', low: 'Lowest price in 7 days', offers: 1 },
    { sku: 'N70187041V', best: false, img: 'Z20041B067E30678837DBZ/45/_/1772091081/996856f3-f944-44d8-a7c3-9b909930fde5', title: 'Samsung Galaxy Z Flip 7 Dual SIM Blue Shadow 12GB 256GB 5G - International Version', rating: 4.5, reviews: 810, price: '2849', low: 'Lowest price in 7 days', offers: 1 },
    { sku: 'N70320366V', best: false, img: 'Z1BF3998311FAEF26F35CZ/45/_/1775549726/e1555ccf-eefd-4391-a353-29095cd5f950', title: 'Samsung Galaxy A57 Dual SIM Awesome Navy 8GB RAM 256GB 5G - Middle East Version', rating: 4.5, reviews: 2488, price: '1395.65', offers: 1 },
    { sku: 'N70158930V', best: false, img: 'ZCF3C79F1A725B8790F53Z/45/_/1772091250/a96530d6-a004-411b-a566-f1715ddd57b8', title: 'Samsung Galaxy A56 5G Dual SIM Awesome Graphite 8GB RAM 256GB - Middle East Version', rating: 4.5, reviews: 15065, price: '1219', offers: 1 },
    { sku: 'N70158922V', best: false, img: 'ZF8497F284E09C47F72EEZ/45/_/1772091241/70e46c9f-e3d1-45c4-a722-6fe7a29d8da2', title: 'Samsung Galaxy A36 5G Dual SIM Awesome Black 8GB RAM 256GB - Middle East Version', rating: 4.4, reviews: 1746, price: '1015', low: 'Lowest price in 30 days', offers: 1 },
    { sku: 'N70199441V', best: false, img: 'ZEA62F43AF56697C55902Z/45/_/1772090833/f1b34074-1c01-4f35-af60-a051a09332bb', title: 'Samsung Galaxy A06 Dual SIM 4G Black 4GB RAM 64GB - International Version', rating: 4.4, reviews: 128, price: '435', offers: 0 },
  ];
  /* Google — 6 phones */
  const L_GOOGLE = [
    { sku: 'N70211914V', best: false, img: 'Z1C785CB356CC533C3E7CZ/45/_/1779345372/953903f0-2a98-4c75-b381-eab91c502180', title: 'Google Pixel 10 Pro Dual SIM 5G Jade 16GB RAM 256GB - International Version', rating: 5, reviews: 1, price: '3698.95', offers: 1 },
    { sku: 'N70338936V', best: false, img: 'Z5FD658633E2626E36AB7Z/45/_/1779345009/47b7660e-10b9-4c5d-bafa-fb7a974f2b6b', title: 'Google Pixel 10a 5G – Lavender | 8GB RAM, 256GB Storage - International Version', rating: 4.6, reviews: 11, price: '1959.65', offers: 1 },
    { sku: 'N70211946V', best: false, img: 'Z611FE96C6FB4170E2180Z/45/_/1779345551/92ed26bc-99ac-47c3-a1c8-34511ae49221', title: 'Google Pixel 10 Pro Fold Dual SIM 5G Moonstone 16GB RAM 256GB - International Version', rating: 5, reviews: 3, price: '4739.15', low: 'Lowest price in 30 days', offers: 1 },
    { sku: 'N70013289V', best: false, img: 'Z811B15D5A05223A45263Z/45/_/1779345584/cdc84409-6167-4d4b-9b4e-9226b21b8fbe', title: 'Google Pixel 8 Obsidian 8GB RAM 256GB 5G - International Version', rating: 3.4, reviews: 5, price: '1799', low: 'Lowest price in a year', offers: 1 },
    { sku: 'N70407723V', best: false, img: 'ZB4DD99A0BAA7AB73A554Z/45/_/1786710371/525ae88f-d883-4748-adbf-18a9c4de7a49', title: 'Google Pixel 10 Pro XL Dual SIM 5G Jade 16GB RAM 256GB - International Version', rating: 0, reviews: 0, price: '3799', offers: 1 },
    { sku: 'N70436915V', best: false, img: 'Z24D6859D5862BDD95FF5Z/45/_/1789493445/2838f63b-6f7d-4312-99f7-fbca3c2b70ea', title: 'Google Pixel 11 Pro Fold 5G 16GB RAM 256GB Obsidian - International Version', rating: 0, reviews: 0, price: '5999', offers: 1 },
  ];
  /* Xiaomi — 7 phones */
  const L_XIAOMI = [
    { sku: 'N70270098V', best: false, img: 'Z52056E8D63A9BDDEA0DEZ/45/_/1782742382/d13751ab-c742-443b-b1e7-b6c6b0c0e9f7', title: 'Xiaomi Redmi Note 15 Pro Dual SIM 5G Glacier Blue 8GB RAM 256GB - Global Version', rating: 4.5, reviews: 484, price: '1059', low: 'Lowest price in 7 days', offers: 1 },
    { sku: 'N70270124V', best: false, img: 'Z3AA4C1B9200A217F6D37Z/45/_/1782742379/5749eb98-27ae-4c8b-b8ed-bc60b4384f43', title: 'Xiaomi Redmi Note 15 Dual SIM 4G Black 8G RAM 256GB - Global Version', rating: 4.4, reviews: 535, price: '799', offers: 0 },
    { sku: 'N70199709V', best: false, img: 'Z3D3F5A7902689A1546CFZ/45/_/1780467297/cbe23167-adbb-4bc3-b925-96f6337db777', title: 'Xiaomi Redmi 15 5G Dual SIM Ripple Green 8GB RAM 256GB - Global Version', rating: 4.3, reviews: 2582, price: '948.90', offers: 1 },
    { sku: 'N70312063V', best: false, img: 'ZC731BBB4BBCB033F06A1Z/45/_/1780467112/be8f1f20-df17-493a-9b5d-cb7590ad39d0', title: 'Xiaomi REDMI A7 Pro Black 4GB RAM 64GB ROM 4G - Global Version', rating: 4.2, reviews: 420, price: '389', offers: 0 },
    { sku: 'N70203296V', best: false, img: 'Z0C013D5C6A88F6D3ACD4Z/45/_/1780467550/0dfae5f7-5d84-462a-9c98-7d8fe3d7d56e', title: 'Xiaomi Redmi 15C Dual SIM Midnight Black 8GB RAM 256GB 4G - Global Version', rating: 3.9, reviews: 2320, price: '566', offers: 1 },
    { sku: 'N70401163V', best: false, img: 'ZEECE65CAE5942890869BZ/45/_/1786544540/3399323f-5d6f-42fe-a2eb-0f314eeed39d', title: 'Xiaomi Redmi 17 Dual SIM 4G Lotus Purple 4GB RAM 128GB - Global Version', rating: 4.4, reviews: 19, price: '549', offers: 1 },
    { sku: 'N70135748V', best: false, img: 'ZC20CE49B597D235B1480Z/45/_/1780466936/d2c4777b-5ae9-4124-b2d3-97a37e8b57e3', title: 'Xiaomi Redmi Note 14 Pro 4G Midnight Black 8GB RAM 256GB - Global Version', rating: 4.4, reviews: 1371, price: '870', offers: 1 },
  ];
  /* Honor — 8 phones */
  const L_HONOR = [
    { sku: 'N70285186V', best: false, img: 'Z41AADE414C8D7E7A577CZ/45/_/1780572653/2cfb0e9b-c9b1-4582-9514-029a5fbd6797', title: 'Honor Magic8 Pro 5G Dual SIM 12GB RAM 512GB ROM Black - International Version', rating: 5, reviews: 1, price: '3299', low: 'Lowest price in a year', offers: 1 },
    { sku: 'N70208284V', best: false, img: 'ZD16A577D4E983C5303B2Z/45/_/1780572490/1afbf720-363d-481c-b348-c7621fafbbbb', title: 'Honor Magic V5 Dual SIM 5G Ivory White 16GB 512GB - International Version', rating: 4.5, reviews: 58, price: '4199', low: 'Lowest price in 30 days', offers: 1 },
    { sku: 'N70137875V', best: false, img: 'Z7AB5629287E4E368F1D2Z/45/_/1780572711/3527a39e-2694-4d16-9707-132c9a3f018a', title: 'Honor Magic7 Pro Dual SIM Black 12GB RAM 512 GB 5G - Middle East Version', rating: 4.4, reviews: 246, price: '2839', offers: 1 },
    { sku: 'N70350067V', best: false, img: 'Z039259271C3B6B366ED8Z/45/_/1790066542/58d905aa-664b-4152-995a-edcb3a8d5ecc', title: 'Honor 600 Pro 5G Dual SIM 12GB RAM 512GB Orange - Middle East Version', rating: 4.5, reviews: 2857, price: '2646', low: 'Lowest price in 30 days', offers: 1 },
    { sku: 'N70350074V', best: false, img: 'Z0F4DE0BA4B23F3878988Z/45/_/1780572885/e27e3822-8545-47f4-8c47-6f72469abcd3', title: 'Honor 600 5G Dual SIM 8GB RAM 256GB Orange - Middle East Version', rating: 4.5, reviews: 2857, price: '1569', low: 'Lowest price in 7 days', offers: 1 },
    { sku: 'N70261006V', best: false, img: 'Z752FE746D1D839F05E06Z/45/_/1780572608/78e8dbbf-85f7-4ca8-9f66-429ebd9d4505', title: 'Honor X9d 5G Dual SIM 12GB RAM 256GB Reddish Brown - International Version', rating: 4.4, reviews: 11675, price: '1198', offers: 1 },
    { sku: 'N70400008V', best: false, img: 'ZC4968FC9E5D3BB8D7FAFZ/45/_/1785301772/470ed099-5e18-4904-a75f-42b6570354a0', title: 'Honor X6e Dual SIM 4G 4GB RAM 128GB Sunrise Gold - Middle East Version', rating: 4.1, reviews: 54, price: '549', offers: 1 },
    { sku: 'N70306363V', best: false, img: 'Z0DC63302DDE9AF7C7D7BZ/45/_/1780572392/001dfb93-9074-4108-a474-23fbad2a99ba', title: 'Honor 600 Lite Dual SIM 5G Velvet Black 8GB RAM 256GB - Middle East Version', rating: 4.4, reviews: 1812, price: '1025', low: 'Lowest price in 30 days', offers: 1 },
  ];
  /* OnePlus — 8 phones */
  const L_ONEPLUS = [
    { sku: 'N70176926V', best: false, img: 'ZD4A1C35B6C9308B0B635Z/45/_/1779704245/be56dcfb-3537-4b86-92a1-19f4d9ebf585', title: 'OnePlus 13s Dual SIM Black Velvet with AI 16GB RAM 512GB 5G - Indian Version', rating: 4.3, reviews: 223, price: '2149', offers: 1 },
    { sku: 'N70190662V', best: false, img: 'ZD07CA20E5A384FDA102AZ/45/_/1779715216/5e43e1ab-c230-4a89-a1cd-0d591b1da470', title: 'OnePlus Nord CE5 Dual SIM Marble Mist 8GB RAM 256GB 5G - International Version', rating: 4.3, reviews: 875, price: '1049', offers: 1 },
    { sku: 'N70375831V', best: false, img: 'Z3A2C134012439EDAA35BZ/45/_/1783594672/74c89714-38f4-4218-9527-e3d352993f16', title: 'OnePlus Nord CE6 Dual SIM Pitch Black 8GB RAM 256GB 5G - International Version', rating: 4.2, reviews: 100, price: '1299', offers: 1 },
    { sku: 'N70388999V', best: false, img: 'Z18B40E41FA54EF187BF6Z/45/_/1783430595/3f835774-52e4-45c0-a805-f8e511118ce0', title: 'OnePlus N6 Dual SIM Midnight Green 4GB RAM 128GB 5G - International Version', rating: 4.4, reviews: 6, price: '858.95', offers: 1 },
    { sku: 'N70280791V', best: false, img: 'Z77ECF56046001A2EFF5EZ/45/_/1784295104/20a00b71-eb11-4a98-8e78-8bec594b9a4e', title: 'OnePlus Nord 6 Dual SIM Pitch Black with AI 12GB RAM 512GB 5G - International Version', rating: 4.2, reviews: 125, price: '1929', offers: 1 },
    { sku: 'N70252035V', best: false, img: 'Z039276F45DEF20E1B60DZ/45/_/1779714844/206d1db0-6fd0-41b3-9332-101fcdfc7bd0', title: 'OnePlus 15 Dual SIM Ultra Violet with AI 16GB RAM 512GB 5G - International Version', rating: 4.2, reviews: 524, price: '3199', offers: 1 },
    { sku: 'N70176904V', best: false, img: 'ZD8CBB0465408C8FB8C8BZ/45/_/1779704907/835e5a76-0c6e-4558-8476-1231e4d07f6a', title: 'OnePlus 13T Dual SIM Gray With AI 12GB RAM 256GB 5G - Indian Version', rating: 4.3, reviews: 223, price: '2289', offers: 1 },
    { sku: 'N70269002V', best: false, img: 'ZCDA2FA05302E960DA11DZ/45/_/1779706878/fb73d476-1d10-40e1-953c-79736d8706c0', title: 'OnePlus 15R Dual SIM Mint Breeze with AI 12GB RAM 256GB 5G - Indian Version', rating: 4.2, reviews: 384, price: '2149', low: 'Lowest price in 30 days', offers: 1 },
  ];
  /* HUAWEI — 8 phones */
  const L_HUAWEI = [
    { sku: 'N70189143V', best: false, img: 'Z6EF28F1D2DBD3076D6F6Z/45/_/1780572655/28311436-63bb-41ea-837c-7b7a1945e038', title: 'HUAWEI Pura 80 Ultra Dual SIM Smartphone Prestige Gold 16GB RAM 512GB - Middle East Version', rating: 4.4, reviews: 68, price: '3299', offers: 1 },
    { sku: 'N70250243V', best: false, img: 'ZFEB69760403CE1CED91AZ/45/_/1780572386/449341c0-e699-4bc3-b9eb-bbe813ea6eff', title: 'HUAWEI Nova 14 Dual SIM Black 12GB RAM 256 GB with 100W HUAWEI SuperCharge Turbo - Middle East Version', rating: 4.6, reviews: 46, price: '1099', offers: 1 },
    { sku: 'N70246224V', best: false, img: 'Z620CC37192DC89C49D8DZ/45/_/1780572539/a5e6957f-8986-4f79-a698-4376fc4dd6d8', title: 'HUAWEI nova 14i Smartphone Dual SIM Black 8GB RAM 256GB - Middle East Version', rating: 4, reviews: 285, price: '749', offers: 1 },
    { sku: 'N70223329V', best: false, img: 'Z7B83862A51F485B303E5Z/45/_/1780572372/9fb8cf6d-0144-438a-8041-8a7781399542', title: 'HUAWEI Nova 14 Pro Dual SIM White 12GB 512GB 4G - Middle East Version', rating: 4.2, reviews: 37, price: '1289', low: 'Lowest price in a year', offers: 1 },
    { sku: 'N70139593V', best: false, img: 'Z5F08B066D79734626F48Z/45/_/1780572602/a0c4b070-fe29-4af3-9dcb-4e0ab1cae7c5', title: 'HUAWEI Nova 13 Pro Dual SIM Smartphone White 12GB RAM 512GB 4G - Middle East Version', rating: 3.7, reviews: 19, price: '1110.15', low: 'Lowest price in a year', offers: 1 },
    { sku: 'N70189141V', best: false, img: 'Z751754F19F5C14AC8BA5Z/45/_/1780572353/197283ec-926d-4790-891a-a7f1eb13d0e9', title: 'HUAWEI Pura 80 Pro Dual SIM Smartphone Glazed White 12GB RAM 512GB - Middle East Version', rating: 4.1, reviews: 141, price: '2779', offers: 1 },
    { sku: 'N70370645V', best: false, img: 'Z4BC09F05BDAB264A5E26Z/45/_/1783935923/240c5456-357b-48f1-970a-6d20fff31ece', title: 'HUAWEI nova 15 Max Dual SIM Golden Black 8+8GB RAM 256GB + FOC + Exclusive 1 year Huawei Care+ With freebuds SE 2 - Middle East Version', rating: 4.1, reviews: 179, price: '1178', offers: 0 },
    { sku: 'N70383364V', best: false, img: 'Z94073A00A8D4F4A06547Z/45/_/1782450440/10c7a773-0f10-497e-836f-690098c0419c', title: 'HUAWEI Pura 90s Pro Max 5G+ Dual SIM Orange Ocean 12GB RAM 512GB - Middle East Version', rating: 4.3, reviews: 50, price: '3649', offers: 1 },
  ];
  /* motorola — 8 phones */
  const L_MOTOROLA = [
    { sku: 'N70396290V', best: false, img: 'ZC70D080AC52F04908C28Z/45/_/1784547695/4de64a8d-9000-455e-909a-685cc1bf56c3', title: 'motorola Edge 70 Pro Dual SIM 5.5G PANTONE Chicory Coffee 12GB RAM 512GB + 1 Year Screen Damage Protection - Middle East Version', rating: 4.7, reviews: 7, price: '2499', offers: 1 },
    { sku: 'N70397162V', best: false, img: 'Z94A31ED5ABB69BFD90CBZ/45/_/1784709433/475221c5-afef-43b6-b4d6-0f1b63796128', title: 'motorola Edge 70 Max Dual SIM 5G PANTONE Dark Shadow 8GB RAM 256GB - Middle East Version', rating: 4.5, reviews: 8, price: '1999', offers: 1 },
    { sku: 'N70164932V', best: false, img: 'Z6EA61F753387BE22D7B3Z/45/_/1779705085/91399b94-7078-46be-8c6d-416b143a1377', title: 'motorola Edge 60 Fusion 5G Dual SIM Pantone Amazonite(Blue) 12GB RAM 256GB - Middle East Version', rating: 4.3, reviews: 2767, price: '899', low: 'Lowest price in 30 days', offers: 1 },
    { sku: 'N70389487V', best: false, img: 'Z5162E49D4E4EFDD7D227Z/45/_/1783698412/cf9dab6f-5fd7-44f0-bb48-8c7ba12276a0', title: 'motorola G06 Dual SIM 4G PANTONE Laurel Oak 4GB RAM 64GB - Middle East Version', rating: 4.4, reviews: 138, price: '486.20', offers: 0 },
    { sku: 'N70207524V', best: false, img: 'Z09E9D0755A6B8D994503Z/45/_/1779704264/b2c30ec9-b1a8-4198-90ea-93266f2cc079', title: 'motorola Edge 50 Fusion 5G Single+eSIM 8GB RAM 256GB ROM Marshmallow Blue - International Version', rating: 4.5, reviews: 90, price: '949', offers: 1 },
    { sku: 'N70340055V', best: false, img: 'ZF20160A64349B5C24A9AZ/45/_/1779730041/ac5bc69f-2a2f-498f-af28-6f8b49d18aac', title: 'motorola Edge 70 Fusion 5G Dual SIM PANTONE Country Air (Pastel Blue) 12GB RAM 256GB - Middle East Version', rating: 4.3, reviews: 738, price: '1190', low: 'Lowest price in 30 days', offers: 1 },
    { sku: 'N70109513V', best: false, img: 'ZD128EBD7D485DDB0CA2CZ/45/_/1779712321/27e174a5-9893-4a55-a8de-8b0d319d2083', title: 'motorola G35 5G Dual SIM Leaf Green 8GB RAM 128GB - Middle East Version', rating: 4.2, reviews: 13591, price: '743.85', offers: 1 },
    { sku: 'N70307121V', best: false, img: 'Z35DB83A67A3A37380875Z/45/_/1779726089/86e349d8-af33-462e-912c-01083b7cabc8', title: 'motorola G77 Dual SIM 5G 8GB RAM 256GB PANTONE Black Olive (Black) - Middle East Version', rating: 4.2, reviews: 642, price: '849', low: 'Lowest price in a year', offers: 1 },
  ];
  /* Nothing — 7 phones */
  const L_NOTHING = [
    { sku: 'N70193813V', best: false, img: 'Z779B40C2A4D0174CC365Z/45/_/1773225773/ddd43974-f6ea-4078-8b4f-1f12e9643b1c', title: 'Nothing Phone 3 Dual SIM 5G Black 12GB RAM 256GB - Middle East Version', rating: 4.6, reviews: 13, price: '2098', low: 'Lowest price in a year', offers: 1 },
    { sku: 'N70380869V', best: false, img: 'ZAEE98E5687897B32E9E9Z/45/_/1784015331/aec700a2-d508-408a-a7f8-f166622a3322', title: 'Nothing Phone (4b) Dual SIM 5G Black 8GB 128GB - Middle East Version', rating: 4.6, reviews: 193, price: '1499', offers: 1 },
    { sku: 'N70176681V', best: false, img: 'Z7F05099DB5516E1EE37DZ/45/_/1775486899/5b637f78-da15-4de9-b608-f2d1637d713f', title: 'Nothing Phone 3a Pro 5G Dual SIM Grey 12GB RAM 256GB - Middle East Version', rating: 4.4, reviews: 995, price: '1449', offers: 1 },
    { sku: 'N70289965V', best: false, img: 'Z891DC718B536B17191E0Z/45/_/1773304515/9f64bfc8-201e-4b08-860a-4cae1431f018', title: 'Nothing Phone 4a 5G Dual SIM White 12GB RAM 256GB - Middle East Version', rating: 4.6, reviews: 193, price: '1799', low: 'Lowest price in 7 days', offers: 1 },
    { sku: 'N70381380V', best: false, img: 'ZF22633953B25D843B0C4Z/45/_/1782292834/16c7731f-ac7b-492b-b6ea-e62f37891724', title: 'Nothing Phone 4a Pro Dual SIM 5G Black 12GB RAM 256GB With Bundle- Middle East Version', rating: 4.6, reviews: 193, price: '2599', offers: 1 },
    { sku: 'N70107045V', best: false, img: 'Z832DAA6090F972C8C689Z/45/_/1773225580/0291886d-94eb-494f-9c6e-7ae07d8904e1', title: 'Nothing Phone (2a) Plus Dual SIM Gray 12GB RAM 256GB - Middle East Version', rating: 5, reviews: 1, price: '1579', offers: 1 },
    { sku: 'N53427090A', best: false, img: 'ZEC44D819D5639BF288DEZ/45/_/1773225650/e290288f-18a9-46e4-b0f5-55277022e320', title: 'Nothing Phone 2 Dual SIM White 12GB RAM 512GB 5G - International Version', rating: 4.4, reviews: 265, price: '2469', offers: 1 },
  ];
  /* OPPO — 7 phones */
  const L_OPPO = [
    { sku: 'N70278162V', best: false, img: 'Z277C6772551885DE9E4CZ/45/_/1780306529/02729767-1ed2-43e5-a901-aa2f450f7a0f', title: 'OPPO A6x 5G Dual SIM Ice Blue 4GB RAM 128GB - Middle East Version', rating: 4.3, reviews: 200, price: '799', offers: 1 },
    { sku: 'N70278163V', best: false, img: 'Z5CDBADAB13DBC7AD1B08Z/45/_/1788848466/fa631ee9-eed2-453e-b998-47e385d80546', title: 'OPPO A6 5G Dual SIM Sapphire Blue 8GB RAM 256GB With Oppo Wired Earphones - Middle East Version', rating: 4.1, reviews: 81, price: '1149', offers: 1 },
    { sku: 'N70282196V', best: false, img: 'ZF47AEF713DA5A63C71FEZ/45/_/1780307088/cd58e7c0-1c2f-4805-ab3a-06a8e68c83ca', title: 'OPPO A6t Dual SIM 5G Crystal Violet 6GB RAM 256GB - Middle East Version', rating: 4.7, reviews: 35, price: '1099', offers: 1 },
    { sku: 'N70396307V', best: false, img: 'ZDD208C79C0ED05190C29Z/45/_/1784208931/93070dce-13f8-4a24-be1d-6c1ab0cf115b', title: 'OPPO A2 5G Mobile Phone 12Gb(+4GB Extended RAM)+256Gb Violet Purple - Global Version', rating: 5, reviews: 1, price: '788', offers: 1 },
    { sku: 'N70405058V', best: false, img: 'Z161264BD3F477FFFA405Z/45/_/1786115999/521bb68e-6b44-4f1d-951d-cb0baed40892', title: 'OPPO Reno 16F AI Phone Dual SIM 5G Pop White 8GB RAM 256GB - Middle East Version', rating: 4.7, reviews: 6, price: '1860', offers: 1 },
    { sku: 'N70178727V', best: false, img: 'Z7DBC5C6B30008E58EA29Z/45/_/1780306874/8ceda457-c487-474d-9993-da87c2049337', title: 'OPPO A5 Dual SIM 4G Mist White 6GB RAM 128GB - Middle East Version', rating: 4.2, reviews: 153, price: '777', low: 'Lowest price in 7 days', offers: 1 },
    { sku: 'N70145593V', best: false, img: 'ZD0CF92F93AD88FF5675DZ/45/_/1789554413/a16576aa-2c80-47cb-ac17-fe91d8085c5d', title: 'OPPO Reno13 AI Phone Dual SIM 5G 512GB 12GB RAM Plume White - Middle East Version', rating: 4.2, reviews: 41, price: '2099', offers: 1 },
  ];
  /* vivo — 6 phones */
  const L_VIVO = [
    { sku: 'N70405323V', best: false, img: 'ZB66F45507A8379E93D34Z/45/_/1786608971/591239f6-3aa6-49eb-a337-353887fd841b', title: 'vivo Y21 AI 5G Dual SIM Black 4GB RAM 128GB - Middle East Version', rating: 4.4, reviews: 301, price: '649', offers: 1 },
    { sku: 'N70367024V', best: false, img: 'ZE2DA93D674BDA09FCC40Z/45/_/1779095090/140a1bec-a20c-434a-a1d3-5857fd356c88', title: 'vivo X300 FE 5G Dual SIM Black 12GB RAM 256GB With Exclusive Lens kit with vivo TWS Air And 24 Months Warranty + 1 Year Screen Replacement - Middle East Version', rating: 4.6, reviews: 132, price: '3139', low: 'Lowest price in 30 days', offers: 1 },
    { sku: 'N70320482V', best: false, img: 'Z82AFC5D69A9322B68215Z/45/_/1779094689/72af9dd5-a3d7-4793-9e72-c56d1a1b4058', title: 'vivo Y05 4G AI Dual SIM Black 4GB RAM 128GB With Exclusive Neckband - Middle East Version', rating: 4.1, reviews: 37, price: '539', offers: 1 },
    { sku: 'N70340018V', best: false, img: 'Z5D27B65C3479CFFE0846Z/45/_/1779094747/4e971943-716b-46b5-b3e3-0a1875165c45', title: 'vivo V70 Dual SIM Dune Gray 12GB RAM 256GB 5G- Middle East Version', rating: 4.8, reviews: 4, price: '2499', offers: 1 },
    { sku: 'N70340052V', best: false, img: 'Z5A741220471AB40E8CD5Z/45/_/1779094439/b227f090-fb28-42fd-9553-5c8240113b3d', title: 'vivo X300 Ultra 5G Dual SIM Black 16GB RAM 512GB - Middle East Version', rating: 5, reviews: 1, price: '5989', offers: 1 },
    { sku: 'N70340395V', best: false, img: 'Z2ACE823FB8330EC70A73Z/45/_/1779094760/643a00ce-7f2e-403a-8c67-3320794d743e', title: 'vivo V70 FE Dual Sim Ocean Blue 12GB RAM 256B 5G - Middle East Version', rating: 4.5, reviews: 29, price: '1597', offers: 1 },
  ];
  /* TECNO — 6 phones */
  const L_TECNO = [
    { sku: 'N70219733V', best: false, img: 'Z29C6B1D1809FAEBCF37EZ/45/_/1779094013/fd22eb02-e5bb-4297-9be6-8e7f01bb6cef', title: 'TECNO POVA Slim 5G Dual SIM Cool Black 8GB RAM 256GB 5G - Middle East Version', rating: 4.3, reviews: 2292, price: '949', offers: 1 },
    { sku: 'N70396372V', best: false, img: 'ZA813FCA98DC5473E9772Z/45/_/1787647744/015f5261-b4ed-4bf3-a305-91f6a5f2c336', title: 'TECNO POVA 8 5G Dual Sim Graphite Black 8GB RAM 256 GB - Global version', rating: 5, reviews: 2, price: '1399', offers: 1 },
    { sku: 'N70396391V', best: false, img: 'Z3FAB570C59A8BDEDEBBCZ/45/_/1784228477/e4c7d2ef-4730-4dba-9d76-b6d92a038b8f', title: 'TECNO SPARK 50 5G Dual Sim TITANIUM GREY 4GB RAM 256GB - Global Version', rating: 3.5, reviews: 4, price: '799', offers: 1 },
    { sku: 'N70311978V', best: false, img: 'Z5D86D6CA783C9081D86DZ/45/_/1779094331/bceb0516-1260-4ba4-a4eb-4e973d8c742d', title: 'TECNO Pova Curve 2 5G 12GB RAM 256GB Melting Silver - Middle East Version', rating: 3.9, reviews: 18, price: '1599', offers: 1 },
    { sku: 'N70122369V', best: false, img: 'Z2682B08B2E75E2ABDAC9Z/45/_/1779094763/8c77babd-bf47-4286-8a79-b6f9cd45c4ce', title: 'TECNO Spark 30C Dual SIM Aurora Cloud 4GB RAM 64GB 5G - Middle East Version', rating: 4.1, reviews: 1108, price: '529', offers: 1 },
    { sku: 'N70368998V', best: false, img: 'ZBD8E236F560FDF8C04CEZ/45/_/1779094926/65bb65c9-58e2-49df-b056-d70c54474a1a', title: 'TECNO Spark Go 3 4G 64GB 4GB RAM Ink Black Dual Sim Smartphone Global Version', rating: 4.9, reviews: 11, price: '395.05', low: 'Lowest price in 7 days', offers: 0 },
  ];
  /* realme — 8 phones */
  const L_REALME = [
    { sku: 'N70367004V', best: false, img: 'Z2D00AC598B0394C1278AZ/45/_/1783404006/5090bd06-bcc8-4fcd-9f1f-42d23718fd5f', title: 'realme C100i 4G Dual SIM Dawn Purple 4GB RAM 128GB - Middle East Version', rating: 4.1, reviews: 969, price: '529', offers: 1 },
    { sku: 'N70085256V', best: false, img: 'Z9AF8633B3DFC3EB3E9BDZ/45/_/1779344693/16035f30-41db-40a1-b3af-a8d42dc0d044', title: 'realme GT6 Dual SIM Fluid Silver 12+12GB RAM 256GB 5G - Middle East Version', rating: 4.5, reviews: 304, price: '1750', offers: 1 },
    { sku: 'N70307986V', best: false, img: 'Z0A3A76C9B78EB017E71BZ/45/_/1780575364/1d83e184-125f-4d37-bcae-9168e1b6e7d7', title: 'realme 16 Pro 5G Dual SIM 12GB RAM 256GB Pebble Grey - International Version', rating: 4.4, reviews: 267, price: '1299', low: 'Lowest price in a year', offers: 1 },
    { sku: 'N70250224V', best: false, img: 'ZAD6A93A0EA3F2A7AF4B2Z/45/_/1779345181/8387cce5-c93e-4ddc-bf6d-c55e52ed9307', title: 'realme 15 5G AI Dual SIM Suit Titanium 12GB RAM 256GB - Middle East Version', rating: 4.3, reviews: 185, price: '1049', low: 'Lowest price in 7 days', offers: 1 },
    { sku: 'N70307985V', best: false, img: 'ZF199F5CF3C4C213CB906Z/45/_/1779344683/34b47728-f6cb-46b0-bc08-f35ab9f03c52', title: 'realme 16 Pro+ 5G Dual SIM 12GB RAM 512GB Master Gold - International Version', rating: 4.4, reviews: 267, price: '1849', offers: 1 },
    { sku: 'N70250227V', best: false, img: 'Z7F9EECE2E0CB738A7B88Z/45/_/1779345545/c0d5498f-94f8-4cb2-9a24-9ff2ebe60a9b', title: 'realme 15 Pro 5G AI Dual SIM Velvet Green 12GB RAM 512GB- Middle East Version', rating: 4.2, reviews: 473, price: '1399', offers: 1 },
    { sku: 'N70172572V', best: false, img: 'ZA8F08945470F5E746659Z/45/_/1779345552/09817a13-d7fa-4607-90d4-c2569c367cc6', title: 'realme GT 7 Pro Dual SIM Mars Orange 12GB RAM 512GB 5G - International Version', rating: 4.1, reviews: 12, price: '2549', offers: 1 },
    { sku: 'N70286388V', best: false, img: 'Z5ACC6C7729ECD46FFD41Z/45/_/1787206851/a9fe1ee2-5dde-42bc-8634-613fcf23b29b', title: 'realme P4 Power Dual SIM 5G Flash Orange 12GB RAM 256GB - International Version', rating: 4.4, reviews: 146, price: '1399', low: 'Lowest price in 7 days', offers: 1 },
  ];
  /* Infinix — 7 phones */
  const L_INFINIX = [
    { sku: 'N70204598V', best: false, img: 'Z379B5920744DFE7B721CZ/45/_/1779704945/137be41a-995f-4295-a38d-d2404c78672c', title: 'Infinix Hot 60 Pro + Dual SIM Misty Violet 8+8GB RAM 256 GB 4G - Middle East Version', rating: 4.4, reviews: 214, price: '880', offers: 1 },
    { sku: 'N70357052V', best: false, img: 'Z871F094775FDF226CC6FZ/45/_/1779714357/f21afcb5-0893-4ff9-aa63-98de5cdc73d3', title: 'Infinix Smart 20 Dual SIM Sunlike Orange 8GB(4+4)RAM 128GB 4G LTE- Middle East Version', rating: 4.3, reviews: 579, price: '520', offers: 1 },
    { sku: 'N70370255V', best: false, img: 'Z283FEDD2D38137D1F9C5Z/45/_/1779712727/a7ff545c-58e1-4dfa-9028-67aa718c15bd', title: 'Infinix Note 60 Pro Dual SIM Solar Orange 8GB RAM 256GB 5G - Middle East Version', rating: 4.2, reviews: 91, price: '1399', low: 'Lowest price in 7 days', offers: 1 },
    { sku: 'N70345592V', best: false, img: 'Z3BDC2F6B876C5240B239Z/45/_/1779705591/c59c71d4-93d5-46ea-bb08-88fd56708cef', title: 'Infinix Note 60 5G Smartphone 8GB RAM 256GB Storage, Dual SIM Android Mobile Phone – Rose Gold', rating: 4.3, reviews: 33, price: '1149', offers: 1 },
    { sku: 'N70386517V', best: false, img: 'Z318F9A89A1A5EF629FC1Z/45/_/1783406943/3be371ba-3872-4dc3-bd18-366676269f7a', title: 'Infinix HOT 70 Dual SIM Night Pulse 6GB 256GB 4G - Middle East Version', rating: 4.8, reviews: 9, price: '849', offers: 1 },
    { sku: 'N70168475V', best: false, img: 'ZF21C39D01571F2F82D9FZ/45/_/1779705367/9018b846-aa94-431a-a1d8-9f395fa7555c', title: 'Infinix Note 50 X Dual SIM Breeze Green 8+8GB RAM 256GB 5G - Middle East Version', rating: 4.3, reviews: 3349, price: '989.50', offers: 1 },
    { sku: 'N70198871V', best: false, img: 'ZADA0D7708F905C196CE6Z/45/_/1779706060/8f9939d4-5062-4c39-8456-ab389055103f', title: 'Infinix Smart 10 Dual SIM Sleek Black 4+4GB RAM 128GB 4G - International Version', rating: 4.5, reviews: 48, price: '499', offers: 0 },
  ];
  const PHONE_LISTS = { all: PRODUCTS, Apple: APPLE, Samsung: L_SAMSUNG, Google: L_GOOGLE, Xiaomi: L_XIAOMI, Honor: L_HONOR, OnePlus: L_ONEPLUS, HUAWEI: L_HUAWEI, motorola: L_MOTOROLA, Nothing: L_NOTHING, OPPO: L_OPPO, vivo: L_VIVO, TECNO: L_TECNO, realme: L_REALME, Infinix: L_INFINIX };
  /* Fitness trackers — "fitness tracker" searches open the PLP on these: six brands
     from noon.com/uae-en search pages (2026-10-06; name, sale price, rating, review
     count, best-seller tag, "Lowest price" nudge, bank offer). WHOOP sells three
     trackers on noon, porodo and Garmin six; the rest eight. Amazfit sells no bands
     on noon, so its list is its fitness-focused watches (Active, Bip, Balance, Pop). */
  const F_FITBIT = [
    { sku: '', best: true, img: 'Z17C80A3602A5846BAD1FZ/45/_/1779344354/c435a5b4-5bd0-43e5-abf8-40f2da8c981e', title: 'Google Fitbit Air - Screenless Fitness & Health Tracker with Heart Rate, Sleep and Activity Monitoring, AI-Powered Coaching, Up to 7 Days Battery', rating: 4.6, reviews: 1700, price: '447', low: 'Lowest price in 30 days', offers: 0 },
    { sku: '', best: true, img: 'ZE8E76F0F97B4E67293DEZ/45/_/1779344973/de897fc2-4275-4717-a423-ded092d591a4', title: 'Google Fitbit Air Special Edition Stephen Curry Band - Screenless Fitness & Health Tracker with Heart Rate, Sleep and Activity Monitoring', rating: 4.6, reviews: 1700, price: '589', low: 'Lowest price in 7 days', offers: 1 },
    { sku: '', best: false, img: 'Z7F193E00BC121BC1D162Z/45/_/1779873219/9844bee2-6f17-456f-98d3-9a5c729b38c8', title: 'Fitbit Charge 6 Advanced Fitness + Health Tracker Obsidian / Black Aluminium', rating: 4.1, reviews: 75, price: '495', low: 'Lowest price in a year', offers: 0 },
    { sku: '', best: false, img: 'Z646B72987B927EF25E74Z/45/_/1779873427/9d635443-d180-4cc2-a2f8-da4cb92fc3d5', title: 'Fitbit Charge 6 Fitness Tracker with Google apps, Heart Rate on Exercise Equipment, GPS, Health Tools and More, Porcelain/Silver', rating: 4, reviews: 14, price: '549', offers: 1 },
    { sku: '', best: false, img: 'ZE62C27092E1ADFD0D7D9Z/45/_/1790855527/a00d066d-63ea-482a-a824-9790c3cc5586', title: 'Google Fitbit Air Special Pokemon Edition Screenless Fitness & Health Tracker with Heart Rate, Sleep and Activity Monitoring', rating: 4.6, reviews: 1700, price: '669', offers: 1 },
    { sku: '', best: false, img: 'Z3755CF22D9D4B9E0E8E3Z/45/_/1779873230/5b7a4984-a004-469f-8f70-91a745f7a216', title: 'Fitbit Inspire 3 Activity Tracker with 6-months Premium Membership Included, up to 10 days battery life and Daily Readiness Score Midnight Zen', rating: 4.2, reviews: 176, price: '259.95', offers: 1 },
    { sku: '', best: false, img: 'Z8899E5E190E8634BFB15Z/45/_/1779873436/b37c53d8-abd2-431b-b095-1b5c4de64080', title: 'Fitbit Inspire 2, Health And Fitness Tracker With Free 1-Year Fitbit Premium Trial, 24/7 Heart Rate And Upto 10 Days Battery Black', rating: 4, reviews: 136, price: '120', low: 'Lowest price in 7 days', offers: 1 },
    { sku: '', best: false, img: 'ZA29379A5062B5830F005Z/45/_/1779873383/f4b57d7f-e63d-4fcf-9370-d601a1cdf48e', title: 'Fitbit Inspire HR Swimproof Fitness Tracker Lilac', rating: 4.1, reviews: 241, price: '143.90', low: 'Lowest price in a year', offers: 1 },
  ];
  const F_WHOOP = [
    { sku: '', best: true, img: 'Z7C46DBF44DD8B956E0E7Z/45/_/1776946960/39e10993-c4e4-4226-8ec4-a9e0e0cd7a6d', title: 'WHOOP Peak – 12-Month Membership – 5.0 Health and Fitness Wearable – 24/7 Activity and Sleep Tracker with Heart Rate, HRV, Stress Monitor', rating: 4.6, reviews: 2800, price: '919', offers: 1 },
    { sku: '', best: true, img: 'Z9DD24FC27DE460014C05Z/45/_/1776946802/048c1c58-a845-4849-be96-dc558ef3ae15', title: 'WHOOP One – 12-Month Membership – 5.0 Health and Fitness Wearable – 24/7 Activity Tracker with VO2 Max, Sleep Tracking, Personalized Coaching', rating: 4.6, reviews: 2800, price: '699', offers: 1 },
    { sku: '', best: true, img: 'Z3EA377BB738DA226426DZ/45/_/1776947042/61e63567-26e4-45dc-b942-0e16030b9b65', title: 'WHOOP Life – 12-Month Membership – 5.0 – Health & Fitness Tracker – Blood Pressure Insights, Activity Tracking – Medical-Grade ECG – 14+ Days Battery', rating: 4.6, reviews: 2800, price: '1379', offers: 1 },
  ];
  const F_XIAOMI = [
    { sku: '', best: false, img: 'Z2BE4EBAB991E892FE143Z/45/_/1780467043/189d9427-62b7-4040-a70f-cc4f342fedd0', title: 'Xiaomi Smart Band 10 | 1.72\'\' AMOLED Display | Touchscreen, Multisport Tracker, Activity Tracker, Heart Rate Monitor | Upto 21 Days Battery Life', rating: 4.7, reviews: 2800, price: '190', offers: 1 },
    { sku: '', best: false, img: 'Z33CB248A73DEFEFE55AFZ/45/_/1780467033/51a68e2e-1b3b-4963-ae02-4319f4c43c15', title: 'Xiaomi Smart Band 10 Ceramic Edition Pearl White | 1.72-Inch AMOLED Narrow-edge Quadrilateral Display | Professional Workout Analysis', rating: 4.7, reviews: 2800, price: '210', offers: 1 },
    { sku: '', best: false, img: 'ZCD382D43286BD254251AZ/45/_/1780466908/090ab694-776a-4262-9560-4a6f2a123779', title: 'Xiaomi Smart Band 10 Pro, Watch-style Fitness Tracker for Men and Women, 1.74" AMOLED display, 21 Days Battery Life, Android & iOS', rating: 4.7, reviews: 60, price: '249', low: 'Lowest price in 7 days', offers: 1 },
    { sku: '', best: false, img: 'ZCA9FCA02C6689A0D30F0Z/45/_/1780466935/d84f6ca4-bd4a-4302-ad08-1e02d831a796', title: 'Xiaomi Smart Band 9 Pro Rose Gold', rating: 4.6, reviews: 255, price: '239', offers: 1 },
    { sku: '', best: false, img: 'Z780E72C936258B1E862CZ/45/_/1787735753/2aef5e14-60dd-4871-bee3-39da2fe65abd', title: 'Xiaomi Smart Band 11 Active Black High-Refresh Rate & Large Screen Exquisite appearance upgrade Super Long Battery Life', rating: 4.5, reviews: 44, price: '116', offers: 1 },
    { sku: '', best: false, img: 'ZCD022411F6D8076C6685Z/45/_/1780466844/a424a2bc-6213-448b-b5c5-146e0007cb91', title: 'Xiaomi Smart Band 9 Active – Black | Fitness Tracker with AMOLED Display & Health Monitoring Black', rating: 4.5, reviews: 1500, price: '97.95', offers: 1 },
    { sku: '', best: false, img: 'Z4985D9BC0480458A5F82Z/45/_/1780466808/94c3831e-2c6e-4ea1-ae22-10648bbe213c', title: 'Xiaomi Smart Band 8 Active Vibrant 1.47" TFT Display 9.99mm Ultra-Slim Body 5ATM Water Resistant 14 Days Battery Life', rating: 4.5, reviews: 884, price: '129', low: 'Lowest price in 30 days', offers: 1 },
    { sku: '', best: false, img: 'Z7D42E5FB1B40750482C1Z/45/_/1780467195/45233853-ee4c-4305-9168-76baa74db1d3', title: 'Xiaomi Smart Band 9 Active – Pink | Fitness Tracker with AMOLED Display & Health Monitoring Pink', rating: 4.5, reviews: 1500, price: '89', offers: 1 },
  ];
  const F_HUAWEI = [
    { sku: '', best: false, img: 'Z918342DFB2063A5E0A23Z/45/_/1780572409/aa1e9a0c-ea7b-43a4-aebf-2e6a5eff758b', title: 'HUAWEI Band 11 Pro Smart Watch, Enhanced Sleep Tracking, Health & GNSS Position Fitness Tracker, Up to 14-day Battery Life, Ultra-', rating: 4.7, reviews: 4400, price: '279', offers: 1 },
    { sku: '', best: false, img: 'Z4B0C4DB7AEC44971E628Z/45/_/1780572419/c38ac872-e827-49a9-9fe5-943caa5f0ae3', title: 'HUAWEI Band 11 Smart Watch, Enhanced Sleep Tracking, Health & Fitness Tracker, Up to 14-day Battery Life, Ultra-Slim & Comfort Wea', rating: 4.7, reviews: 4400, price: '179', low: 'Lowest price in 7 days', offers: 1 },
    { sku: '', best: false, img: 'ZB4BA4600752E53F87007Z/45/_/1785747984/b6a7af7f-812a-4e00-ae6d-b8520943cc7e', title: 'HUAWEI Band 11 Health and Fitness Tracker, Smart Watch, 24/7 Health Intelligence, HRV, Sleep Tracking, Stress Monitor, Emotional W', rating: 4.6, reviews: 755, price: '138', offers: 1 },
    { sku: '', best: false, img: 'Z00FB98DE8FC7CCDAE176Z/45/_/1785747383/66c1776c-a8df-46d4-ba42-d537fc526d58', title: 'HUAWEI Band 10 Smartwatch, Metallic Design, iOS Android, Pro-Level Sleep Analysis, Fast Charging And Robust Battery Life, Sleek Al', rating: 4.7, reviews: 6200, price: '299', offers: 1 },
    { sku: '', best: true, img: 'ZBB29B18737D3ACAD760EZ/45/_/1785747313/6fd6ccbb-2bdf-48dd-8cd9-110c80232704', title: 'HUAWEI Band 10 Smartwatch, Compatible with iOS Android, Emotional Wellbeing Assistant, Fast Charging And Robust Battery Life, Comf', rating: 4.7, reviews: 6200, price: '96', low: 'Lowest price in a year', offers: 1 },
    { sku: '', best: false, img: 'Z5B482A7FA3BA979A7664Z/45/_/1780572620/9e30f8ac-2b01-40ba-a418-bb0f8d16fc75', title: 'HUAWEI Band 9 Smart Watch, Ultra-Thin Design And Comfortable Wearing, Scientific Sleep Analysis, Durable Battery Life, IOS And And', rating: 4.6, reviews: 6600, price: '169', low: 'Lowest price in 30 days', offers: 1 },
    { sku: '', best: false, img: 'Z0038819EBE5A14C5D065Z/45/_/1781002170/8c8fd09b-8c74-4295-9e04-3bdc42bf6651', title: 'HUAWEI WATCH FIT 5 Smart Watch, Mini Workout, Sleep & Health Monitor for Men&Women, Heart Rate Tracker, SpO2, GPS, iOS & Android C', rating: 4.6, reviews: 106, price: '469', low: 'Lowest price in 30 days', offers: 0 },
    { sku: '', best: false, img: 'ZE419DD41EF851F6D71EDZ/45/_/1785747139/9c8804f7-ca46-44bc-b814-b8fe0df38a6d', title: 'HUAWEI Watch FIT4 Smart Watch, 1.82” Display, 100+ Sports modes, Fitness and Sleep Tracker, Heart Rate Monitor, Emotional Wellbein', rating: 4.6, reviews: 4200, price: '376', offers: 0 },
  ];
  const F_PORODO = [
    { sku: '', best: false, img: 'Z1322AB5620FF352CBA12Z/45/_/1786944978/381d32ed-3cf6-4aaf-914f-1e0b35cbff26', title: 'porodo Smart Band with Health & Fitness Tracker, Fitband with 30 Days Battery Life, Sleep & Activity Tracking, IP68 Water Resistan', rating: 4.1, reviews: 106, price: '85', offers: 1 },
    { sku: '', best: false, img: 'Z9258833AE7A53AF5324FZ/45/_/1786949921/45f844ea-94c7-4313-a8fd-8b71ca73bcb8', title: 'porodo Track Fit Smart Band with IP68 Water-Resistant, 30-Day Battery, Heart Rate & Blood Oxygen, 128 Sports Modes, Stress & Weath', rating: 4.4, reviews: 71, price: '85', offers: 1 },
    { sku: '', best: false, img: 'Z51981A6BDB764E8C2307Z/45/_/1771669858/03f951a6-4368-45dc-b40d-a89a1833c7b9', title: 'porodo Trackfit Screenless Smart Fitband Tracker with Display App', rating: 4.3, reviews: 21, price: '99', low: 'Lowest price in 30 days', offers: 0 },
    { sku: '', best: false, img: 'ZFE546C4B6D59A4BC37BFZ/45/_/1783179494/c6f5f656-0194-4451-914e-1039c84c825a', title: 'porodo TrackFit Screenless Smart band Activity Fitness Tracker Green', rating: 4.3, reviews: 21, price: '122', offers: 0 },
    { sku: '', best: false, img: 'Z03A421062ED0398FD8EEZ/45/_/1785253599/a877e97f-a1d9-4630-8fa9-c13e2d24f7df', title: 'porodo Smart Bracelet Fitness Tracker with Display APP, Water Resistant, Activity Tracker, Up to 10 Days Working Time, Multiple Ex', rating: 3.6, reviews: 13, price: '119', offers: 1 },
    { sku: '', best: false, img: 'ZF57D701C1D14C6A0932CZ/45/_/1782307212/e8433e63-afa9-4277-8dd0-667b6e3a8983', title: 'porodo TrackFit Screenless Smart band Activity Fitness Tracker Blue', rating: 3.6, reviews: 13, price: '95.90', offers: 1 },
  ];
  const F_GARMIN = [
    { sku: '', best: false, img: 'ZD771F5E8BDEE5D769634Z/45/_/1779873459/6c93ee51-fdc8-4d01-9663-f33da365aac0', title: 'Garmin Vivosmart 5 - 42MM - Up To 7 Days Battery Life - 0.41"inch Oled Display, Scratch Resistant, Acrylic, Heart Rate Monitor, St', rating: 3.8, reviews: 596, price: '719', offers: 1 },
    { sku: '', best: false, img: 'Z2208F986965F97BBA79DZ/45/_/1779873476/0cca7980-1868-4dc0-8bcf-233d6f581fd2', title: 'Garmin Forerunner 55 - 42MM - Up To 14 Days Battery Life - 1.04"inch Sunlight-Visible Display, Scratch Resistant, Chemically Stren', rating: 4.2, reviews: 85, price: '819', offers: 1 },
    { sku: '', best: false, img: 'Z31B986DCC01E44033D3DZ/45/_/1779873456/314e0dbc-778f-460a-9dea-40b1e1d328d4', title: 'Garmin Forerunner 165 - 43MM - Up To 11 Days Battery Life - 1.2"inch Amoled Display, Scratch Resistant, Chemically Strengthened Gl', rating: 4.5, reviews: 767, price: '1149', offers: 1 },
    { sku: '', best: false, img: 'ZBB0C2E23E52833037AA0Z/45/_/1779873439/d600ae69-9fe5-46b8-ad8b-217bf77c1fc3', title: 'Garmin Vivoactive 5 - 42MM - Up To 11 Days Battery Life - 1.2"inch Amoled Display, Scratch Resistant, Corning Gorilla Glass 3, H', rating: 4.3, reviews: 845, price: '1099', offers: 1 },
    { sku: '', best: false, img: 'ZB96FE84375139071B65CZ/45/_/1779873591/4c3d0739-f4b8-411c-afe7-24af663bb025', title: 'Garmin Vivoactive 6 - 42MM - Slate with Black Band - Up to 11 Days of Battery life - 1.2" Amoled Display, Corning Gorilla Glass 3,', rating: 4.4, reviews: 475, price: '1349', offers: 1 },
    { sku: '', best: false, img: 'ZD8444C6970A00C1B8573Z/45/_/1779873232/575466a8-f041-41d1-81b3-37daef78921b', title: 'Garmin Lily 2 - 35.4 Mm - Up To 5 Days Of Battery Life - Lcd Display , Scratch Resistant, Corning Gorilla Glass 3, Heart Rate Moni', rating: 4, reviews: 197, price: '1149', offers: 1 },
  ];
  const F_AMAZFIT = [
    { sku: '', best: false, img: 'ZE6F7107E53D01145D813Z/45/_/1777376385/0978ce0a-38a1-4f45-81da-a0439dd9195b', title: 'Amazfit Active 2 Smart Watch For Men 44Mm, Nfc Payment, Ai, Gps And Free Maps, 10 Day Battery, Fitness Tracker With 160+ Sports Modes, 5 Atm', rating: 4.7, reviews: 33, price: '519', offers: 1 },
    { sku: '', best: false, img: 'ZA83CFEDB87246582268BZ/45/_/1777376410/28fdb971-b062-48d9-adb1-116b2cbb08a1', title: 'Amazfit Bip 6 Smart Watch 46mm, 14 Day Battery, 1.97" AMOLED Display, GPS & Free Maps, AI, Bluetooth Call & Text, Health, Fitness & Sleep Tr', rating: 4.5, reviews: 64, price: '315.81', low: 'Lowest price in 30 days', offers: 0 },
    { sku: '', best: false, img: 'Z9169E0508C0F2529BA09Z/45/_/1777376432/94e87fb7-43dd-4b7f-8514-fe538f212526', title: 'Amazfit Balance Midnight', rating: 4.5, reviews: 207, price: '505', offers: 1 },
    { sku: '', best: false, img: 'Z0C361EF133EB9A3A6D9DZ/45/_/1777376385/d825cb62-a540-44c7-ac96-a38df62d0f2c', title: 'Amazfit Active 3 Premium GPS Running Smart Watch, 1.32" AMOLED Sapphire Display, 12-Day Battery, 4GB Storage, Offline Maps', rating: 4.7, reviews: 22, price: '610', low: 'Lowest price in 30 days', offers: 1 },
    { sku: '', best: false, img: 'ZBA6B282FED52C96D9969Z/45/_/1777376382/0b5cec7d-2d99-4336-81ed-3a7de2c83345', title: 'Amazfit Active Max Smart Watch 1.5" AMOLED Display, 25-Day Battery, Offline Maps, GPS, 4GB Storage, 170+ Sport Modes, 5 ATM Water Resistant', rating: 4.6, reviews: 30, price: '584.64', low: 'Lowest price in 7 days', offers: 1 },
    { sku: '', best: false, img: 'Z2BD994E43DFC0ECCE687Z/45/_/1777376171/f0ed5415-2a71-48a5-b489-f3a69e3444d4', title: 'Amazfit Pop 3R Smart Watch With 1.43" (3.6 Cm) HD AMOLED Display, BT Calling And AI Voice Assistance Black', rating: 4.2, reviews: 467, price: '177', offers: 1 },
    { sku: '', best: false, img: 'ZC08E3F3F9ED66A906451Z/45/_/1777376083/863e645e-3405-4162-9fc5-4b6f6d052814', title: 'Amazfit Pop 3s Ultra-large 1.96" HD AMOLED Display,Fashionable Curved & Metallic Design With Bluetooth Phone Calls Black', rating: 4.2, reviews: 279, price: '148.95', offers: 1 },
    { sku: '', best: false, img: 'Z2BD8341C8F18057E73C8Z/45/_/1779704934/59669bb1-d213-4bba-9592-2bf8f17f8b79', title: 'Amazfit Bip Max 50mm Smartwatch, 2.07" AMOLED Display, 20 Days of Battery, GPS, 4GB Storage, Offline Maps, Fitness Tracker', rating: 4.7, reviews: 10, price: '349.30', low: 'Lowest price in 30 days', offers: 0 },
  ];
  const F_ALL = [F_FITBIT[0], F_WHOOP[0], F_XIAOMI[0], F_HUAWEI[0], F_GARMIN[0], F_PORODO[1], F_FITBIT[2], F_AMAZFIT[1]];
  const FIT_LISTS = { all: F_ALL, Fitbit: F_FITBIT, WHOOP: F_WHOOP, Xiaomi: F_XIAOMI, HUAWEI: F_HUAWEI, porodo: F_PORODO, Garmin: F_GARMIN, Amazfit: F_AMAZFIT };
  /* TVs — "tv" searches open the PLP on these (iteration 3 only): six brands from
     noon.com/uae-en search pages (2026-10-22; name, sale price, rating, review count,
     "Lowest price" nudge), TVs only — mounts, remotes and soundbars left out. */
  const T_SAMSUNG = [
    { sku: '', best: false, img: 'ZA90641EE2CE2A68FB6ECZ/45/_/1772180549/acac0b3d-bd94-45c0-943f-bf50dc178dda', title: "Samsung 55 Inch QLED TV, Q8F, 4K, Q4 AI Processor, 100% Color Volume with Quantum Dot, AirSlim, Endless Free Content, Vision AI Smart TV, QA55Q8FAAUXZ", rating: 4.4, reviews: 31, price: '1779', offers: 1 },
    { sku: '', best: false, img: 'Z331F6F9B84F5374FD435Z/45/_/1772180320/0d31b0ea-3e9d-4769-9bb2-dbd7e1bad196', title: "Samsung 55 Inch QLED TV, Q6F, 4K, Q4 Lite Processor, 100% Color Volume with Quantum Dot, Samsung Knox Security, Endless Free Content, Smart TV, QA55Q6", rating: 4.1, reviews: 308, price: '1303', low: 'Lowest price in 30 days', offers: 1 },
    { sku: '', best: false, img: 'ZF06D353044F9AD57D2A5Z/45/_/1772180544/75fd4a05-6393-4411-895e-102e4b9f6547', title: "Samsung 75 Inch Neo QLED TV, QN70F, 4K, Mini LED, NQ4 AI Gen2 Processor, Quantum Matrix Technology Slim, Motion Xcelerator 144Hz, Vision AI Smart TV", rating: 4.5, reviews: 73, price: '4399', offers: 1 },
    { sku: '', best: false, img: 'ZD4B1C528BA443F8D46A3Z/45/_/1772180565/78fe030d-fb50-4944-b291-b0676f9c391e', title: "Samsung 55 Inch QLED TV, Q7F, 4K, Q4 AI Processor, 100% Color Volume with Quantum Dot, Knox Security, Endless Free Content, Vision AI Smart TV, QA55Q7", rating: 4.1, reviews: 308, price: '1629', low: 'Lowest price in 7 days', offers: 1 },
    { sku: '', best: false, img: 'Z1D4F6BD5CA84EAD94F2FZ/45/_/1772180687/f1b3ea95-eebd-41bb-a0d7-c60f7b2d21d6', title: "Samsung 55 Inch Crystal UHD TV, U8000F, 4K, Crystal Processor 4K, MetalStream Design, Knox Security, Endless Free Content, Smart TV, UA55U8000FUXZN", rating: 4.3, reviews: 119, price: '1225', offers: 1 },
    { sku: '', best: false, img: 'ZCA5443442D0A10000355Z/45/_/1772180547/46fb76dc-f93c-48d8-8d2a-664cefd0dc2a', title: "Samsung 65 Inch QLED TV, Q7F, 4K, Q4 AI Processor, 100% Color Volume with Quantum Dot, Knox Security, Endless Free Content, Vision AI Smart TV, QA65Q7", rating: 4.1, reviews: 308, price: '2529', offers: 1 },
    { sku: '', best: false, img: 'Z7D0DAC6D4C0CCE82E302Z/45/_/1782393432/5f0da2be-3412-4111-8cea-6689685d4cff', title: "Samsung 65 Inch Mini LED TV, M1EH, 4K, HDR 10+, Motion Xcelerator, Dynamic Sound Pack, Pure Spectrum Color, Mini LED Processor 4K, Smart TV, UA65M1EHA", rating: 3.7, reviews: 3, price: '1849', low: 'Lowest price in a year', offers: 1 },
    { sku: '', best: false, img: 'Z0A75698DA500CF9F5CAAZ/45/_/1772180704/95f37b80-e11d-4bc6-9576-a0b3869812b7', title: "Samsung 75 Inch QLED TV, Q7F, 4K, Q4 AI Processor, 100% Color Volume with Quantum Dot, Knox Security, Endless Free Content, Vision AI Smart TV, QA75Q7", rating: 4.1, reviews: 308, price: '3398', low: 'Lowest price in 7 days', offers: 1 },
  ];
  const T_LG = [
    { sku: '', best: false, img: 'Z161B06F43A57C1103952Z/45/_/1780306903/835f1735-f869-4e58-b4d3-66857add83b4', title: "LG 55 Inch 4K OLED WebOS 24 Dolby ATMOS HDR 10 Smart TV, 120HZ, Dolby Vision, HLG, α9 AI Sound Pro (Virtual 9.1.2 Up-mix)", rating: 4.4, reviews: 1700, price: '2634', offers: 1 },
    { sku: '', best: false, img: 'ZD73ABACBD90B3ADD1B22Z/45/_/1780307090/9a105dd6-c28d-46b9-85fa-7df31c99aa09', title: "LG 55 inch QNED 4K Smart TV 55QNED86A6A black", rating: 4.4, reviews: 240, price: '2949', offers: 1 },
    { sku: '', best: false, img: 'ZFF4CC132D6AAB316A8B4Z/45/_/1780306636/820b7e5a-5893-4d35-ab38-ebe63e368349', title: "LG 55 inch QNED 4K Smart TV AI 60Hz 55QNED70A6A black", rating: 3.8, reviews: 559, price: '1729', offers: 1 },
    { sku: '', best: false, img: 'ZB294A2A3C095485CC486Z/45/_/1780306668/7649e4e2-a81b-4441-ae82-730520065986', title: "LG 65 Inch QNED MiniLED QNED90T 4K 65QNED90T Black", rating: 4.2, reviews: 75, price: '3699', offers: 1 },
    { sku: '', best: false, img: 'ZA3E5C6A6BCF30AAB91A8Z/45/_/1780467334/ba2221d0-bf3c-4788-8653-7999e2cf8d47', title: "LG 55 inch LG NANO 4K UHD AI NU84B Smart TV 2026 - 55NU840B6LA black", rating: 4.3, reviews: 31, price: '1469', offers: 1 },
    { sku: '', best: false, img: 'Z0BED3103305B39EE638DZ/45/_/1780306297/e547a1f1-7a81-45d8-b694-4c71d868bc6e', title: "LG 55-inch 4K Mini LED Motion Booster 288Hz Dynamic QNED Color Pro α8 Processor 4K Gen3 α8 Super Upscaling 4K Magic Remote", rating: 4.1, reviews: 37, price: '2499', offers: 1 },
    { sku: '', best: false, img: 'Z10B886B026CE1526BE34Z/45/_/1784790333/279b3a14-dcbb-42d5-a46e-a7cd447ec590', title: "LG 65 inch LG OLED evo AI C6 4K Smart TV 2026 OLED65C66LA-AMAG black", rating: 5, reviews: 1, price: '6912', offers: 1 },
    { sku: '', best: false, img: 'ZE420AF503D500893F812Z/45/_/1780306805/808116f7-b812-4936-ab20-b44a5644d712', title: "LG 55\" NANO 4K UHD AI Smart TV 2026 – NanoCell | α7 AI Processor Gen9 | HDR10 Pro | webOS | AI Hub | VRR | GeForce NOW", rating: 4, reviews: 4, price: '1649', offers: 1 },
  ];
  const T_SONY = [
    { sku: '', best: false, img: 'Z4B1A7375D083E7A27F8FZ/45/_/1780466900/f8d30b6d-cb62-4cdf-bac3-5d0924b9e1bf', title: "Sony 75 Inch LED TV 4K HDR Google TV X90L / X91BL | BRAVIA XR | Full Array LED | 4K Ultra HD | High Dynamic Range (HDR)", rating: 4.6, reviews: 300, price: '6171', low: 'Lowest price in 7 days', offers: 1 },
    { sku: '', best: false, img: 'Z582AA98755939C15A552Z/45/_/1780467156/d3e5a7ae-ea16-4735-bcd1-c1d382ae2499', title: "Sony 65 Inch LED TV 4K HDR Google TV X90L / X91BL | BRAVIA XR | Full Array LED | 4K Ultra HD | High Dynamic Range (HDR)", rating: 4.5, reviews: 128, price: '4589', low: 'Lowest price in 7 days', offers: 1 },
    { sku: '', best: false, img: 'Z671CF235AB73E3DB536FZ/45/_/1780467504/e2f1fb1b-40dc-4190-806a-9b309bc2c4bd', title: "Sony BRAVIA 3 55 Inch 4k Smart TV HDR 50 Hz K-55S30 Black", rating: 4.4, reviews: 183, price: '2519', offers: 1 },
    { sku: '', best: false, img: 'ZF920829110EF65EEAE13Z/45/_/1780466874/169d3c51-f16b-44c2-9c65-9f6629ef0048', title: "Sony 65 Inch Ultra HD (4K) Smart Android TV, X75K Series KD-65X75K Black", rating: 4.3, reviews: 69, price: '1999', offers: 1 },
    { sku: '', best: false, img: 'ZC773AF690359A13C9752Z/45/_/1780467168/7712a6ab-14d8-4973-9f95-2752a0992591', title: "Sony 85 Inch LED 4K Google TV XR-85X90L Black", rating: 4.7, reviews: 222, price: '9999', offers: 1 },
    { sku: '', best: false, img: 'Z71D13988732EE089F767Z/45/_/1780466847/13c79123-dfd1-4470-825a-8d75d4247e98', title: "Sony 50 Inch 4K HDR KD-50X75K Google TV In 4K With A Billion Colors And Dolby Audio-2022 Model KD-50X75K Black", rating: 4.5, reviews: 22, price: '1572', low: 'Lowest price in 30 days', offers: 1 },
    { sku: '', best: false, img: 'Z01CFE09EFA81B2A9148FZ/45/_/1780466792/e3db00bd-6d8c-40b3-a90a-65f913b40822', title: "Sony 32-Inch HDR Smart Google LED TV KD-32W830K Black", rating: 4.4, reviews: 192, price: '1089', low: 'Lowest price in 30 days', offers: 1 },
    { sku: '', best: false, img: 'Z3FE0DCDC57AC38CA6CCBZ/45/_/1780467336/136e021a-a716-4141-8045-ec65e540ab03', title: "Sony BRAVIA 2 – 55 inch 4K Smart Google TV (2025 Model) with XR Processor 60Hz K-55S20M2 black", rating: 5, reviews: 5, price: '1999', low: 'Lowest price in a year', offers: 1 },
  ];
  const T_TCL = [
    { sku: '', best: false, img: 'ZE88D74FAB795619572BFZ/45/_/1779345237/d847e07e-fb7b-4c15-9624-31f0d4c3f799', title: "TCL Television 65 Inch Smart TV 4K QLED Colorful Quantum Crystal HDR 10+ Gaming Google TV, 144Hz Native Refresh Rate, ONKYO 2.1 Hi-Fi", rating: 4.5, reviews: 305, price: '2099', offers: 1 },
    { sku: '', best: false, img: 'Z84D654192AC3E05A7EF6Z/45/_/1779344536/3c1a1c35-3403-487a-a8b8-36c941159ff1', title: "TCL Television 55 Inch 4K QD-Mini LED Dimming Google Smart TV, 144Hz Refresh Rate, 93% DCI-P3, AiPQ Pro, Slim & Uni-body", rating: 4.5, reviews: 202, price: '2049', offers: 1 },
    { sku: '', best: false, img: 'Z26656D048813762EC0DDZ/45/_/1779345554/03dd74c7-0aef-4e42-ba5f-0302a036f96b', title: "TCL 50 Inch Smart TV QLED HDR 10 Google TV, FHD, 60Hz, Dolby Audio, Game Mode, Multiple Eye Care with Slim Design, Google Cast, (2025 Model), 50S5K", rating: 4.3, reviews: 755, price: '935', offers: 1 },
    { sku: '', best: false, img: 'Z45F8C3BDB0668F93663BZ/45/_/1782998245/16687cbb-ebfc-4611-91ef-340fe87b7f18', title: "TCL 55 Inch 4K UHD smart TV, 60Hz, QLED, HDR, AIPQ processor, Google TV, Metallic Bezel-Less, Slim & Uni-body, HVA Panel, TCL AI, Dolby Vision · Atmos", rating: 4.5, reviews: 322, price: '2269', offers: 1 },
    { sku: '', best: false, img: 'Z6267311CF38466CA90A3Z/45/_/1779344525/f29b2845-2879-4d3b-956c-03c0c4b44843', title: "TCL Television 85 Inch Smart TV 4K QLED Colorful Quantum Crystal HDR 10+ Gaming Google TV, ONKYO 2.1 Hi-Fi, Dolby Atmos", rating: 4.5, reviews: 305, price: '3849', offers: 1 },
    { sku: '', best: false, img: 'Z454C1CBA105BAF954270Z/45/_/1786684771/e4eb1a8d-70ea-4f5b-b139-31c2dc8828dd', title: "TCL 55-inch P61L 4K HDR Smart TV (2026 Model Google TV - UAE Version), 55 Inch UHD Smart TV With 2GB RAM 16GB ROM, AiPQ", rating: 4.3, reviews: 67, price: '1103', offers: 1 },
    { sku: '', best: false, img: 'Z42744D9BE4011A2A382BZ/45/_/1782482835/165e2463-8a93-4358-ae89-088333d72915', title: "TCL 65-inch T69D Premium QLED 4K Smart TV (2026 UAE Version) TCL 65\" 65T69D Google TV, AiPQ Processor, HVA Panel, Dolby", rating: 4.3, reviews: 67, price: '1899', offers: 1 },
    { sku: '', best: false, img: 'ZF84DDD580A286F5F49B1Z/45/_/1779345123/075bffbc-1c45-4478-b792-572ce4f8e116', title: "TCL Television 98 Inch Smart TV 4K QD-Mini LED Gaming Google TV, 144Hz Native Refresh Rate, Precise Dimming Series", rating: 4.5, reviews: 157, price: '8299', low: 'Lowest price in 30 days', offers: 1 },
  ];
  const T_HISENSE = [
    { sku: '', best: false, img: 'ZC940392BDA2BDEB43C6EZ/45/_/1787835053/901b60ff-b678-4170-8339-667ede58846b', title: "Hisense 55 inch QLED 4K Smart TV 55E7Q, HSR 120Hz Quantum Dot Colour, Dolby Vision Atmos, Game Mode Plus, Voice control, AI Light Sensor", rating: 4.3, reviews: 293, price: '1254', offers: 1 },
    { sku: '', best: false, img: 'Z83E1CC67FD0B1686F87FZ/45/_/1788522278/ff57542d-ebc2-4c47-8133-d7403f3b03f8', title: "Hisense 50 inch QLED Smart TV E7Q-Quantum Dot Colour, AI Picture, Dolby Vision, Dolby Atmos, Share to TV, Voice Control, Filmmaker Mode", rating: 4.3, reviews: 293, price: '999', offers: 1 },
    { sku: '', best: false, img: 'ZB1E24E3C00EDC1E6A984Z/45/_/1779345481/39baeb27-9fa2-4d2e-b265-1a4ff12bb337', title: "Hisense 55 inch QLED Smart TV E7N-Quantum Dot Colour, AI Picture, Dolby Vision, Dolby Atmos, Share to TV, Voice Control, Filmmaker Mode", rating: 4.6, reviews: 77, price: '1299', offers: 1 },
    { sku: '', best: false, img: 'ZB4384AE7E62D8045DD58Z/45/_/1787835493/d5f31ca1-7be4-49ff-9af9-9f85d5b6955a', title: "Hisense 55 Inch Mini LED 4K Smart TV, 55E8S, 8 Years OS Update, Hi-View AI Engine, 144Hz, HSR 240Hz, Built-in Subwoofer, Dolby Vision IQ", rating: 4.2, reviews: 29, price: '2549', offers: 1 },
    { sku: '', best: false, img: 'Z36D8B1534EE4CA4FC5B9Z/45/_/1779344690/77a5da46-5987-4738-aa4a-0d0f1c6b05a9', title: "Hisense 50 inch UHD 4K Smart TV | 60Hz | AI 4K Upscaler | Dolby Vision | Model 2024 | 50A6N Black", rating: 4.1, reviews: 1800, price: '889', offers: 1 },
    { sku: '', best: false, img: 'Z2D74B390052FF4771C22Z/45/_/1779345180/ad74b969-9c50-489b-aa65-d54c004a06f2', title: "Hisense 55-inch QLED 144Hz Game Pro Smart TV E8Q-Quantum Dot Colour, AI Picture, Dolby Vision, Dolby Atmos, Share to TV, Voice Control", rating: 4.3, reviews: 77, price: '1699', offers: 1 },
    { sku: '', best: false, img: 'ZCA747ED29767ACA0C7AFZ/45/_/1787834944/e68ecba8-6a89-4729-87cf-e88478845e5e', title: "Hisense 85 Inch QLED 4K Smart TV 85E7Q, HSR 120Hz Quantum Dot Colour, Dolby Vision Atmos, Game Mode Plus, Voice control, AI Light Sensor", rating: 4.3, reviews: 293, price: '3819', offers: 1 },
    { sku: '', best: false, img: 'Z6125B5DB12BBBE63CC96Z/45/_/1779345458/623e6352-327e-4e2e-9c38-0c10a6b4fc7a', title: "Hisense 98-inch QLED 144Hz Smart TV E7Q-Quantum Dot Colour, AI Picture, Dolby Vision, Dolby Atmos, Share to TV, Voice Control, Filmmaker Mode", rating: 4.3, reviews: 293, price: '4699', low: 'Lowest price in 7 days', offers: 1 },
  ];
  const T_XIAOMI = [
    { sku: '', best: false, img: 'ZF48A39BAF575C70368C0Z/45/_/1780467020/88e01da1-ae7f-499b-bedf-dfb2685513d4', title: "Xiaomi TV S Mini LED 55\" 2025 | 4K QD-MiniLED | 144Hz refresh rate | Dolby Audio/Dolby Atmos/DTS-X | Powerful AI engine for image enhancement", rating: 4.3, reviews: 1100, price: '1399', offers: 1 },
    { sku: '', best: false, img: 'Z7A8A133D812C64A2A6E0Z/45/_/1780467263/fe6cc2b2-88f0-4965-b428-fc7a3e9e3a03', title: "Xiaomi TV S Pro Mini LED 55\" 2026 | QD-Mini LED Display | 4K UHD | 144Hz refresh rate | Dolby Audio & Atmos, Google TV", rating: 4.3, reviews: 67, price: '1865', offers: 1 },
    { sku: '', best: false, img: 'ZFD6186F1677FBEC80169Z/45/_/1780467097/14b47546-1a26-4995-957a-be9be4d5dfe7', title: "Xiaomi TV S Mini LED 65\" 2026, QLED Mini LED, 4K UHD, Smart TV with Google TV, HDR10+, Triple Tuner, DVB T2, 60Hz with 120Hz Game Boost Mode", rating: 4.3, reviews: 83, price: '2161', offers: 1 },
    { sku: '', best: false, img: 'Z044C6117D33A83D64075Z/45/_/1780467338/986cf957-5762-492e-b023-f906a97db528', title: "Xiaomi TV A Pro 43\" 2026 | Google TV | 4K QLED Display | Dolby Audio, DTS-X, And DTS Virtual:X | Premium Metal Finish", rating: 4.3, reviews: 238, price: '799', low: 'Lowest price in 30 days', offers: 1 },
    { sku: '', best: false, img: 'ZA7FAF712B201DED0A45EZ/45/_/1780466852/2a63b26f-3585-46e5-9a7f-61c0a4864200', title: "Xiaomi TV Max 100 2025 | Ultra-large 4K display | Quantum Dot display | 144Hz Refresh Rate | Dolby Vision, Dolby Atmos", rating: 4.3, reviews: 1100, price: '5905', offers: 1 },
    { sku: '', best: false, img: 'ZF96905A5959BA59F458DZ/45/_/1792658538/536d1719-0da9-40ac-a002-6e483b83de4a', title: "Xiaomi TV A Pro 65\" 2026 | Google TV | 4K QLED Display | Dolby Audio, DTS-X, And DTS Virtual:X | Premium Metal Finish", rating: 4.3, reviews: 238, price: '1959', offers: 1 },
    { sku: '', best: false, img: 'Z06B6CE0AB192B017A640Z/45/_/1780466919/7e6e77db-b9d2-4d76-8d27-f7da32e2e810', title: "Xiaomi TV S Mini LED 75\" 2026, QLED Mini LED, 4K UHD, Smart TV with Google TV, HDR10+, Triple Tuner, DVB T2, 60Hz with 120Hz Game Boost Mode", rating: 4.3, reviews: 83, price: '2799', offers: 1 },
    { sku: '', best: false, img: 'Z73C62893398960C89D79Z/45/_/1792667462/89d7cb90-afb3-47d2-95d2-96941f893dbe', title: "Xiaomi TV A 50 2026 | 4K eye-care display with HDR picture quality | 120Hz refresh rate under Game Boost mode via HDMI", rating: 4, reviews: 19, price: '1133', offers: 1 },
  ];
  const T_ALL = [T_SAMSUNG[1], T_HISENSE[0], T_LG[0], T_XIAOMI[0], T_TCL[0], T_SONY[2], T_SAMSUNG[2], T_HISENSE[4]];
  const TV_LISTS = { all: T_ALL, Samsung: T_SAMSUNG, LG: T_LG, Sony: T_SONY, TCL: T_TCL, Hisense: T_HISENSE, Xiaomi: T_XIAOMI };
  // the page's category follows the query that opened it; LISTS is the current one
  const CATS = { phone: PHONE_LISTS, fitness: FIT_LISTS, tv: TV_LISTS };
  const catOf = (q) => (/^fitness/i.test(q || '') ? 'fitness' : /\b(tvs?|televisions?)\b|^(oled|qled)\b/i.test(q || '') ? 'tv' : 'phone');
  let cat = 'phone', LISTS = PHONE_LISTS;
  // noon's review counts: 995 → "995", 2857 → "2.9K", 33767 → "33.8K"
  const count = (n) => n < 1000 ? String(n) : `${(n / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  const card = (p) => `
    <article class="pcard stroke" data-sku="${p.sku}">
      <div class="pcard__media">
        <div class="pcard__clip">
          <img class="pcard__photo" src="${CDN}${p.img}.jpg?width=400" alt="" decoding="async" />
          <button class="pcard__wish" aria-label="Add to wishlist"><img src="${A}94524.svg" alt="" /></button>
          <button class="pcard__add sk" aria-label="Add to cart"><img src="${A}1d902.svg" alt="" /></button>
          <span class="pcard__dots"><i></i><i></i><i></i><i></i></span>
        </div>
      </div>
      <div class="pcard__info">
        <p class="pcard__title" data-full="${p.title}">${p.title}</p>
        <p class="pcard__rate"${p.reviews ? '' : ' style="visibility:hidden"'}><span class="star"><img src="${A}9d075.svg" alt="" /></span><b>${p.rating.toFixed(1)}&nbsp;</b><span>(${count(p.reviews)})</span></p>
        <p class="pcard__price">&#xE001;${p.price}</p>
        <p class="pcard__low"${p.low ? '' : ' style="visibility:hidden"'}><img src="${A}aaca9.svg" alt="" />${(p.low || 'Lowest price').replace('Lowest price', 'Lowest Price')}</p>
        <div class="pcard__offers"${p.offers ? '' : ' style="visibility:hidden"'}><span class="offer">Extra 10%  Off </span><span class="offer">+${p.offers || 1}</span></div>
        <img class="pcard__badge" src="${A}04813.svg" alt="express Today" />
      </div>
    </article>`;
  const slots = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 2; c++) {
    const el = document.createElement('div');
    el.className = 'pslot';
    el.innerHTML = `<div class="skel"></div>${card(PRODUCTS[r * 2 + c])}`;
    grid.appendChild(el);
    slots.push({ el, r, c, skel: el.firstElementChild, card: el.querySelector('.pcard') });
  }
  // chip skeletons are separate pills in the row, so a chip can drop in over its own
  const chipSkels = chips.map(() => { const s = document.createElement('span'); s.className = 'skel skel--chip'; tags.appendChild(s); return s; });
  const placeChipSkels = () => chips.forEach((ch, i) => { const k = chipSkels[i]; k.style.left = ch.offsetLeft + 'px'; k.style.width = ch.offsetWidth + 'px'; });

  /* Figma truncates the 2-line title mid-word ("…(eSIM only) Bur…"); a CSS
     line-clamp would stop at the last whole word. Measure where line 1 ends,
     then render line 2 as a single ellipsised line. */
  const cuts = new Map();   // title → where line 1 ends (measured once, reused by the brand swap)
  function clampTitles(root = plp) {
    root.querySelectorAll('.pcard__title').forEach((el) => {
      const full = el.dataset.full;
      let cut = cuts.get(full);
      if (cut == null) {
        el.textContent = full;
        const node = el.firstChild, range = document.createRange();
        const topOf = (i) => { range.setStart(node, i); range.setEnd(node, i + 1); return range.getBoundingClientRect().top; };
        const top0 = topOf(0);
        let lo = 0, hi = full.length - 1;
        while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (topOf(mid) - top0 < 4) lo = mid; else hi = mid - 1; }
        cut = lo + 1; cuts.set(full, cut);
      }
      el.innerHTML = '';
      const a = document.createElement('span'), b = document.createElement('span');
      a.textContent = full.slice(0, cut); b.textContent = full.slice(cut).replace(/^\s+/, '');
      el.append(a, b);
    });
  }

  let timers = [], open = false;
  const later = (ms, fn) => timers.push(setTimeout(fn, ms));
  const clearAll = () => { timers.forEach(clearTimeout); timers = []; };

  function reset() {
    clearAll();
    if (typeof restoreAll === 'function') restoreAll();
    plp.getAnimations({ subtree: true }).forEach((a) => { if (a.effect && a.effect.getComputedTiming().endTime !== Infinity) a.cancel(); });
    slots.forEach((s) => { s.card.style.opacity = 0; s.card.style.transform = ''; s.skel.style.opacity = 1; });
    chips.forEach((c) => { c.style.opacity = 0; c.style.transform = ''; });
    chipSkels.forEach((k) => { k.style.opacity = 1; });
    nav.style.transform = '';
    plp.classList.remove('is-open', 'is-loading');
    plp.style.opacity = 0;
    plp.inert = true; plp.setAttribute('aria-hidden', 'true');
    scroll.scrollTop = 0;
    open = false;
  }

  function openPLP() {
    if (open) return;
    reset();
    open = true;
    void plp.offsetWidth;                            // flush the reset so the shimmer restarts
    input.blur();                                    // the keyboard drops as the rows leave
    plp.classList.add('is-open', 'is-loading');      // restarts the shimmer clock at t = 0
    plp.inert = false; plp.setAttribute('aria-hidden', 'false');
    clampTitles(); placeChipSkels();
    const off = search.suggest.hideForResults() + 10;        // the rows finish leaving first
    plp.style.setProperty('--shimmer-at', `${off + 120}ms`);  // first sweep once the skeleton is showing
    PP.commit(plp, [PP.fade(plp, 0, 1, { curve: 'io', ms: T.SKEL_MS, delay: off + T.SKEL_AT })], { opacity: 1 });
    PP.commit(nav, [PP.moveY(nav, 88, 0, { delay: off + T.NAV_AT })], { transform: 'none' });

    later(off + T.CHIPS_AT, () => chips.forEach((c, i) => {
      const delay = i * PP.IN_STAGGER;
      PP.commit(c, [PP.moveY(c, -T.CHIP_DROP, 0, { delay }), PP.fade(c, 0, 1, { curve: 'io', delay })], { opacity: 1, transform: '' });
      PP.commit(chipSkels[i], [PP.fade(chipSkels[i], 1, 0, { curve: 'io', delay })], { opacity: 0 });
    }));
    later(off + T.CARDS_AT, () => {
      const anims = slots.flatMap((s, k) => {
        const delay = k * PP.IN_STAGGER;
        const m = PP.moveY(s.card, T.CARD_RISE, 0, { delay }), f = PP.fade(s.card, 0, 1, { curve: 'out', delay });
        const sk = PP.fade(s.skel, 1, 0, { curve: 'io', delay: delay + T.SKEL_OUT_AFTER });
        PP.commit(s.card, [m, f], { opacity: 1, transform: '' });
        PP.commit(s.skel, [sk], { opacity: 0 });
        return [m, f, sk];
      });
      // "landed" = the on-screen cards (rows 1–2) have risen into place — the brand widget keys off this,
      // so it doesn't wait for the below-the-fold skeletons
      Promise.all(anims.slice(0, 4 * 3).filter((_, i) => i % 3 < 2).map((a) => a.finished))
        .then(() => { if (open) { Haptics.land(); plp.dispatchEvent(new CustomEvent('plp:landed')); } }).catch(() => {});   // results arrived
      // "settled" = every card has landed and every skeleton has faded
      Promise.all(anims.map((a) => a.finished)).then(() => { if (open) plp.classList.remove('is-loading'); }).catch(() => {});
    });
  }

  /* Swap — the brand widget filtered the page (plp:filter {brand}). Every card
     dissolves into its skeleton (the same shimmer as the first load, restarted
     at t = 0), holds for about half a shimmer pass, then the new list rises in
     with the first load's stagger (60ms, 16px rise on the spring, skeleton
     fading 353ms behind each card). A new filter mid-way restarts it.      */
  const R = { OUT_MS: 180, REVEAL_AT: 820 };
  let rTimers = [], listKey = 'all';
  function swapTo(key, at = R.REVEAL_AT) {
    if (!open || !LISTS[key] || key === listKey) return;
    listKey = key;
    rTimers.forEach(clearTimeout); rTimers = [];
    const now = slots.map((s) => ({ c: +getComputedStyle(s.card).opacity, k: +getComputedStyle(s.skel).opacity }));
    slots.forEach((s) => [s.card, s.skel].forEach((e) => e.getAnimations().forEach((a) => a.cancel())));
    plp.classList.remove('is-reloading'); void plp.offsetWidth; plp.classList.add('is-reloading');   // shimmer from t = 0
    slots.forEach((s, k) => {
      s.card.style.transform = '';
      PP.commit(s.card, [PP.fade(s.card, now[k].c, 0, { curve: 'io', ms: R.OUT_MS })], { opacity: 0 });
      PP.commit(s.skel, [PP.fade(s.skel, now[k].k, 1, { curve: 'out', ms: PP.OUT_MS })], { opacity: 1 });
    });
    rTimers.push(setTimeout(() => {
      const list = LISTS[key];
      slots.forEach((s, k) => {   // new cards go in while they're invisible; a shorter list hides the spare slots
        s.el.style.display = k < list.length ? '' : 'none';
        if (k >= list.length) return;
        const t = document.createElement('div'); t.innerHTML = card(list[k]).trim();
        const n = t.firstElementChild; n.style.opacity = 0;
        s.card.replaceWith(n); s.card = n;
      });
      clampTitles();
      Haptics.land();   // the new list arriving
      const anims = slots.filter((s, k) => k < list.length).flatMap((s, k) => {
        const delay = k * PP.IN_STAGGER;
        const m = PP.moveY(s.card, T.CARD_RISE, 0, { delay }), f = PP.fade(s.card, 0, 1, { curve: 'out', delay });
        const sk = PP.fade(s.skel, 1, 0, { curve: 'io', delay: delay + T.SKEL_OUT_AFTER });
        PP.commit(s.card, [m, f], { opacity: 1, transform: '' });
        PP.commit(s.skel, [sk], { opacity: 0 });
        return [m, f, sk];
      });
      Promise.all(anims.map((a) => a.finished)).then(() => plp.classList.remove('is-reloading')).catch(() => {});
    }, at));
  }
  // Clear goes back to the personalised list when the TV chat made one, otherwise to the brand mix
  plp.addEventListener('plp:filter', (e) => swapTo((e.detail && e.detail.brand) || (LISTS.picks ? 'picks' : 'all')));

  /* The widget's TV chat finished (plp:personal {answers, at}): score every TV against the answers,
     hand the widget each brand's best match (detail.best, best first) and re-sort the grid to the
     eight best fits; the swap's cards rise at detail.at, just after the widget's matched cards. */
  const tvSpec = (p) => {
    // the size is usually '55 inch' / '55"'; a few titles only say 'TV Max 100' / 'TV A 50 2026' — then the first 2–3 digit number
    const t = p.title, m = t.match(/(\d{2,3})\s*(?:-\s*)?(?:inch|in\b|"|''|”)/i) || t.match(/\b(\d{2,3})\b(?!\s*(?:hz|gb|%|nits|w\b))/i);
    const tech = /\boled\b/i.test(t) ? 'OLED' : /mini\s*-?led/i.test(t) ? 'Mini LED' : /qled|qned|quantum dot/i.test(t) ? 'QLED' : 'LED';
    return { size: m ? +m[1] : 0, tech, price: +p.price };
  };
  const MAX_FIT = 4 + 3 + 3 + 0.5 + 0.45;
  function fit(p, a) {
    const s = tvSpec(p), [lo, hi] = a.budget, [s0, s1] = a.size;
    let k = s.price >= lo && s.price <= hi ? 4 : (s.price > hi && s.price <= hi * 1.2) || (s.price < lo && s.price >= lo * 0.8) ? 1.5 : 0;
    k += s.size >= s0 && s.size <= s1 ? 3 : Math.min(Math.abs(s.size - s0), Math.abs(s.size - s1)) <= 10 ? 1 : 0;
    k += !a.tech ? 1.5 : s.tech === a.tech ? 3 : 0;
    k += (p.rating || 4) / 10 + Math.log10((p.reviews || 0) + 1) / 10;   // ties go to the better-rated, better-reviewed set
    return { p, spec: s, k, pct: Math.min(99, Math.round(52 + 47 * (k / MAX_FIT))) };
  }
  plp.addEventListener('plp:personal', (e) => {
    const d = e.detail, brands = Object.keys(TV_LISTS).filter((b) => b !== 'all' && b !== 'picks');
    const scored = brands.map((b) => ({ brand: b, list: TV_LISTS[b].map((p) => fit(p, d.answers)).sort((x, y) => y.k - x.k) }));
    d.total = scored.reduce((n, b) => n + b.list.length, 0);
    d.best = scored.map((b) => ({ brand: b.brand, ...b.list[0] })).sort((x, y) => y.k - x.k);
    TV_LISTS.picks = scored.flatMap((b) => b.list).sort((x, y) => y.k - x.k).slice(0, 8).map((f) => f.p);
    swapTo('picks', d.at);
  });
  /* Pre-warm the swap lists once the page is idle: measure every list's title cuts
     off-screen (one list per idle slot), so the swap does no layout reads in the
     middle of the widget's morph. Photos are decoded per brand on demand
     (plp:warm {brand}) — the widget asks for the brand in front of the rail. */
  const idle = window.requestIdleCallback || ((f) => setTimeout(f, 200));
  let warmQ = null;
  function prewarm() {
    if (warmQ) return;
    warmQ = Object.values(CATS).flatMap((L) => Object.values(L)).filter((l) => l !== PHONE_LISTS.all);
    const step = () => {
      const key = warmQ.shift(); if (!key) return;   // (a list)
      const probe = document.createElement('div');
      probe.className = 'pslot'; probe.style.cssText = 'position:absolute;left:0;top:0;visibility:hidden;pointer-events:none';
      probe.innerHTML = key.map(card).join('');
      grid.appendChild(probe); clampTitles(probe); probe.remove();
      idle(step, { timeout: 1000 });
    };
    idle(step, { timeout: 1500 });
  }
  const decoded = new Set();
  function warmPhotos(key) {
    if (!LISTS[key] || decoded.has(key)) return; decoded.add(key);
    LISTS[key].forEach((p) => { const im = new Image(); im.decoding = 'async'; im.src = `${CDN}${p.img}.jpg?width=400`; if (im.decode) im.decode().catch(() => {}); });
  }
  plp.addEventListener('plp:warm', (e) => e.detail && warmPhotos(e.detail.brand));
  plp.addEventListener('plp:landed', prewarm);
  // put a list into the slots without animation (spare slots hidden)
  function fill(list) {
    slots.forEach((s, k) => {
      s.el.style.display = k < list.length ? '' : 'none';
      if (k >= list.length) return;
      const t = document.createElement('div'); t.innerHTML = card(list[k]).trim();
      const n = t.firstElementChild; n.style.opacity = s.card.style.opacity; s.card.replaceWith(n); s.card = n;
    });
  }
  // the last two chips are phone filters ("Cases & Covers", "Accessories"); TVs get their own
  const chipT = chips.slice(3).map((ch) => ch.querySelector('.chip__t'));
  const CHIP_BASE = chipT.map((t) => [t.textContent, t.style.width]);
  const CHIP_TEXT = { tv: ['Screen Size', 'Smart TV'] };
  function setCategory(c) {   // called while the page is hidden, before it opens
    if (c === cat) return;
    cat = c; LISTS = CATS[c]; listKey = 'all';
    chipT.forEach((t, i) => { const v = CHIP_TEXT[c]; t.textContent = v ? v[i] : CHIP_BASE[i][0]; t.style.width = v ? '' : CHIP_BASE[i][1]; });
    rTimers.forEach(clearTimeout); rTimers = []; plp.classList.remove('is-reloading');
    fill(LISTS.all);
  }
  function restoreAll() {   // back to the brand mix without animation (the page is hidden)
    delete TV_LISTS.picks;   // the next TV search asks again
    rTimers.forEach(clearTimeout); rTimers = []; plp.classList.remove('is-reloading');
    if (listKey === 'all') return;
    listKey = 'all';
    fill(LISTS.all);
  }

  function closePLP() {
    if (!open) return;
    clearAll();
    open = false;
    const a = PP.fade(plp, +getComputedStyle(plp).opacity, 0, { curve: 'io' });
    a.finished.then(() => { if (!open) reset(); }).catch(() => {});
    search.suggest.restore();                      // suggestions spring back in
  }

  /* History: results get their own entry, so Back returns to the suggestions */
  search.addEventListener('plp:open', (e) => {
    if (!(history.state && history.state.view === 'results')) history.pushState({ view: 'results' }, '', '#results');
    const c = catOf(e.detail && e.detail.q);
    if (!open) { setCategory(c); plp.dispatchEvent(new CustomEvent('plp:category', { detail: { cat: c } })); }
    openPLP();
  });
  addEventListener('popstate', () => { if (location.hash !== '#results' && open) closePLP(); });
  const leave = () => { if (history.state && history.state.view === 'results') history.back(); else closePLP(); };
  // While results are up, the back arrow and Escape step back to the suggestions
  // (capture phase, ahead of the page-level handlers that would pop the search page).
  back.addEventListener('click', (e) => { if (open) { e.stopImmediatePropagation(); leave(); } }, true);
  search.addEventListener('keydown', (e) => { if (open && e.key === 'Escape') { e.stopImmediatePropagation(); leave(); } }, true);
  input.addEventListener('focus', () => { if (open) leave(); });   // tapping the field goes back to editing
  search.addEventListener('search:closed', reset);
  reset();
})();


/* ══ Brand widget (1214:145919, State 12 1214:145190) ═══════════════════════
   Revealed straight into the full panel with iteration 02's widget reveal
   (ProtoPie recording cloud.protopie.io/p/041e0f998b5182ed0ca8ce6d/r/0e6f5901),
   as soon as the on-screen product cards have landed:
     t = 0     the grid pushes down (the box grows 0 → 459, products land at
               Figma y 615) on the handoff spring
     t = 0     the panel scales 90% → 100% and rises 20px on the SAME spring
     t = 17ms  …and fades in over 300ms on the recorded ease-out (REVEAL_FADE)
     t = 33ms  the header rises 10px, fading in from 50ms
     t = 80ms  the first cards rise 16px (+3% scale, 4px → 0 blur), 40ms apart,
               on a soft spring (response 0.5s, ζ 0.92)                     */
(() => {
  const search = document.getElementById('search');
  const plp    = document.getElementById('plp');
  const box    = document.getElementById('brandWidget');
  const bar    = document.getElementById('bwBar');
  const head   = document.getElementById('bwHead');
  const count  = document.getElementById('bwCount');
  const rail   = document.getElementById('bwRail');
  const track  = document.getElementById('bwTrack');
  const hTitle = document.getElementById('bwHTitle');
  const sel    = document.getElementById('bwSel');
  const sCoin  = document.getElementById('bwSCoin');
  let   sMark  = sCoin.firstElementChild;
  const sTitle = document.getElementById('bwSTitle');
  const sSub   = document.getElementById('bwSSub');
  const clear  = document.getElementById('bwClear');
  const B = '../assets/brands/';

  /* Cards — 14 brand flagships, 1:1 with State 16 · Hierarchy's "Cards" rail (1232:10203);
     image boxes are Figma's (left, top, width, height) inside the 204×139 media */
  const PHONE_CARDS = [
    { id: '1232:10204', brand: 'Apple', tint: '#fff3ea', img: 'apple',    box: [52.281, 1.624, 98.992, 134.996], logo: { mark: 'apple', w: 11, h: 11, label: 'Apple' },
      name: 'iPhone 17 Pro Max', now: '4,649', was: '5,099', off: '8% off', specs: ['Pro camera', '256GB', 'Cosmic Orange', '4.5'] },
    { id: '1232:10241', brand: 'Samsung', tint: '#f2f3f7', img: 'samsung',  box: [36.259, -23.319, 136.251, 185.806], logo: { mark: 'samsung', w: 52.56, h: 7.92 },
      name: 'Galaxy S25 Ultra', now: '2,799', was: '5,099', off: '45% off', specs: ['S Pen & work', '256GB', 'Titanium Grey', '4.7'] },
    { id: '1232:10277', brand: 'Google', tint: '#eff6f0', img: 'google',   box: [38.203, -18.036, 126.833, 172.962], logo: { mark: 'google', w: 11, h: 11, label: 'Google' },
      name: 'Pixel 10 Pro', now: '3,584', note: 'Lowest in 7 days', specs: ['Google AI', '256GB', 'Jade', '5.0'] },
    { id: '1232:10316', brand: 'Xiaomi', tint: '#f8f1ee', img: 'xiaomi',   box: [44.296, -11.39, 117.727, 160.544], logo: { mark: 'xiaomi', w: 11, h: 11, label: 'Xiaomi' },
      name: 'Xiaomi 15T', now: '1,679', was: '1,999', off: '16% off', specs: ['Max storage', '512GB', 'Rose Gold', '4.4'] },
    { id: '1232:10353', brand: 'Honor', tint: '#eef6f6', img: 'honor',    box: [53.498, 3.358, 97.004, 132.285], logo: { mark: 'honor', w: 41.597, h: 8 },
      name: 'Magic 8 Pro', now: '3,499', was: '5,448', off: '35% off', specs: ['AI camera', '512GB', 'Sky Cyan', '4.7'] },
    { id: '1232:10389', brand: 'OnePlus', tint: '#f3f3f5', img: 'oneplus',  box: [39.492, -13.568, 121.694, 165.953], logo: { mark: 'oneplus', w: 11, h: 11, label: 'OnePlus' },
      name: 'OnePlus 15', now: '3,199', note: 'Selling out fast', specs: ['Performance', '512GB', 'Infinite Black', '4.2'] },
    { id: '1232:10425', brand: 'HUAWEI', tint: '#fff4ec', img: 'huawei',   box: [59.548, 7.098, 91.118, 124.258], logo: { mark: 'huawei', w: 14.602, h: 11, label: 'HUAWEI' },
      name: 'Pura 90s Pro Max', now: '3,999', was: '4,499', off: '11% off', specs: ['Tele zoom', '512GB', 'Orange Ocean', '4.3'] },
    { id: '1232:10462', brand: 'motorola', tint: '#f6f1ec', img: 'motorola', box: [46.996, -5.165, 107.241, 146.244], logo: { mark: 'motorola', w: 11, h: 11, label: 'motorola' },
      name: 'Edge 70 Pro', now: '2,499', was: '2,999', off: '16% off', specs: ['Pantone design', '512GB', 'Chicory Coffee', '4.7'] },
    { id: '1232:10499', brand: 'Nothing', tint: '#f4f4f5', img: 'nothing',  box: [37.464, -16.009, 126.393, 172.362], logo: { letter: 'N', label: 'Nothing' },
      name: 'Phone (3)', now: '2,098', was: '2,799', off: '25% off', specs: ['Unique design', '256GB', 'Black', '4.6'] },
    { id: '1232:10536', brand: 'OPPO', tint: '#f3f3f6', img: 'oppo',     box: [52.37, 1.718, 99.41, 135.565], logo: { mark: 'oppo', w: 33.6547, h: 8 },
      name: 'Reno13 Pro', now: '1,499', was: '1,899', off: '21% off', specs: ['Portraits', '512GB', 'Graphite Grey', '3.7'] },
    { id: '1232:10572', brand: 'vivo', tint: '#f8f4ee', img: 'vivo',     box: [56.566, 5.445, 91.004, 124.102], logo: { mark: 'vivo', w: 30.5018, h: 8 },
      name: 'X300 Pro', now: '3,829', was: '4,699', off: '18% off', specs: ['ZEISS camera', '512GB', 'Dune Brown', '4.2'] },
    { id: '1232:10608', brand: 'TECNO', tint: '#f3f4f6', img: 'tecno',    box: [37.485, -17.926, 128.644, 175.432], logo: { letter: 'T', label: 'TECNO' },
      name: 'POVA Slim 5G', now: '949', note: 'Selling out fast', specs: ['Slim design', '256GB', 'Cool Black', '4.3'] },
    { id: '1232:10644', brand: 'realme', tint: '#f6f2fb', img: 'realme',   box: [45.798, -7.425, 112.067, 152.826], logo: { letter: 'r', label: 'realme' },
      name: 'C100i', now: '529', was: '649', off: '18% off', specs: ['Big battery', '128GB', 'Dawn Purple', '4.1'] },
    { id: '1232:10681', brand: 'Infinix', tint: '#eff6f1', img: 'infinix',  box: [52.125, 3.019, 97.393, 132.815], logo: { letter: 'X', label: 'Infinix' },
      name: 'GT 50 Pro', now: '2,079', note: 'Free Delivery', specs: ['Gaming', '512GB', 'Black Abyss', '4.6'] },
  ];
  /* Fitness-tracker brands (shown when a "fitness tracker" search opened the PLP):
     each brand's flagship on noon.com/uae-en (2026-10-06). Photos come from noon's
     CDN (white backgrounds multiplied into the tint), framed in Figma's typical
     image box for the 204×139 media; no simple logo for Fitbit, WHOOP, porodo or
     Garmin, so they use letter badges like the phone rail. Spec values are read
     from each listing's title. */
  const NOON = 'https://f.nooncdn.com/p/pzsku/';
  const FBOX = [52.85, 2.5, 98.3, 134];
  const FIT_CARDS = [
    { brand: 'Fitbit', tint: '#eef5f6', src: `${NOON}Z17C80A3602A5846BAD1FZ/45/_/1779344354/c435a5b4-5bd0-43e5-abf8-40f2da8c981e.jpg?width=400`, box: FBOX, best: true, logo: { letter: 'F', label: 'Fitbit' },
      name: 'Fitbit Air', now: '447', was: '689', off: '35% off', specs: ['AI coaching', 'Up to 7 days', 'Screenless', '4.6'] },
    { brand: 'WHOOP', tint: '#f3f3f5', src: `${NOON}Z3EA377BB738DA226426DZ/45/_/1776947042/61e63567-26e4-45dc-b942-0e16030b9b65.jpg?width=400`, box: FBOX, best: true, logo: { letter: 'W', label: 'WHOOP' },
      name: 'WHOOP Life', now: '1,379', note: '1-yr membership', specs: ['Health insights', '14+ days', 'Medical-grade ECG', '4.6'] },
    { brand: 'Xiaomi', tint: '#f8f1ee', src: `${NOON}Z2BE4EBAB991E892FE143Z/45/_/1780467043/189d9427-62b7-4040-a70f-cc4f342fedd0.jpg?width=400`, box: FBOX, logo: { mark: 'xiaomi', w: 11, h: 11, label: 'Xiaomi' },
      name: 'Smart Band 10', now: '190', specs: ['Multisport', 'Up to 21 days', '1.72" AMOLED', '4.7'] },
    { brand: 'HUAWEI', tint: '#fff4ec', src: `${NOON}Z918342DFB2063A5E0A23Z/45/_/1780572409/aa1e9a0c-ea7b-43a4-aebf-2e6a5eff758b.jpg?width=400`, box: FBOX, logo: { mark: 'huawei', w: 14.602, h: 11, label: 'HUAWEI' },
      name: 'Band 11 Pro', now: '279', was: '299', off: '7% off', specs: ['Sleep tracking', 'Up to 14 days', 'Built-in GNSS', '4.7'] },
    { brand: 'porodo', tint: '#f3f4f6', src: `${NOON}Z9258833AE7A53AF5324FZ/45/_/1786949921/45f844ea-94c7-4313-a8fd-8b71ca73bcb8.jpg?width=400`, box: FBOX, logo: { letter: 'p', label: 'porodo' },
      name: 'Track Fit', now: '85', was: '199', off: '57% off', specs: ['Heart & SpO2', 'Up to 30 days', 'IP68', '4.4'] },
    { brand: 'Garmin', tint: '#eef2f8', src: `${NOON}Z31B986DCC01E44033D3DZ/45/_/1779873456/314e0dbc-778f-460a-9dea-40b1e1d328d4.jpg?width=400`, box: FBOX, logo: { letter: 'G', label: 'Garmin' },
      name: 'Forerunner 165', now: '1,149', specs: ['Running', 'Up to 11 days', '1.2" AMOLED', '4.5'] },
    { brand: 'Amazfit', tint: '#f1f4f9', src: `${NOON}ZA83CFEDB87246582268BZ/45/_/1777376410/28fdb971-b062-48d9-adb1-116b2cbb08a1.jpg?width=400`, box: FBOX, logo: { letter: 'A', label: 'Amazfit' },
      name: 'Bip 6', now: '315.81', note: 'Lowest in 30 days', specs: ['GPS & maps', 'Up to 14 days', '1.97" AMOLED', '4.5'] },
  ];
  /* TV brands (shown when a "tv" search opened the PLP): each brand's pick on
     noon.com/uae-en (2026-10-22). noon's TV photos are 400×545 with the set across
     the middle third, so the box is wider than FBOX and crops the white above and
     below; letter badges where there's no mark. Specs are read from the titles. */
  const TBOX = [22, -38, 160, 218];   // set ≈ 7–175 × 25–115, clear of the heart at x 177
  const TV_CARDS = [
    { brand: 'Samsung', tint: '#eef2f8', src: `${NOON}ZA90641EE2CE2A68FB6ECZ/45/_/1772180549/acac0b3d-bd94-45c0-943f-bf50dc178dda.jpg?width=400`, box: TBOX, logo: { mark: 'samsung', w: 52.56, h: 7.92 },
      name: 'QLED Q8F', now: '1,779', was: '3,299', off: '46% off', specs: ['Vision AI', '55"', '4K QLED', '4.4'] },
    { brand: 'LG', tint: '#f7eff2', src: `${NOON}Z161B06F43A57C1103952Z/45/_/1780306903/835f1735-f869-4e58-b4d3-66857add83b4.jpg?width=400`, box: TBOX, logo: { letter: 'L', label: 'LG' },
      name: 'OLED webOS 120Hz', now: '2,634', note: '1.7K ratings', specs: ['Movie nights', '55"', '4K OLED', '4.4'] },
    { brand: 'Sony', tint: '#f3f3f5', src: `${NOON}Z4B1A7375D083E7A27F8FZ/45/_/1780466900/f8d30b6d-cb62-4cdf-bac3-5d0924b9e1bf.jpg?width=400`, box: TBOX, logo: { letter: 'S', label: 'Sony' },
      name: 'BRAVIA XR X90L', now: '6,171', note: 'Lowest in 7 days', specs: ['Sports & films', '75"', 'Full Array LED', '4.6'] },
    { brand: 'TCL', tint: '#eef4f9', src: `${NOON}ZE88D74FAB795619572BFZ/45/_/1779345237/d847e07e-fb7b-4c15-9624-31f0d4c3f799.jpg?width=400`, box: TBOX, logo: { letter: 'T', label: 'TCL' },
      name: 'QLED Google TV', now: '2,099', was: '2,799', off: '25% off', specs: ['Gaming 144Hz', '65"', '4K QLED', '4.5'] },
    { brand: 'Hisense', tint: '#edf6f4', src: `${NOON}ZC940392BDA2BDEB43C6EZ/45/_/1787835053/901b60ff-b678-4170-8339-667ede58846b.jpg?width=400`, box: TBOX, logo: { letter: 'H', label: 'Hisense' },
      name: 'QLED E7Q', now: '1,254', was: '1,449', off: '13% off', specs: ['Everyday value', '55"', '4K QLED', '4.3'] },
    { brand: 'Xiaomi', tint: '#f8f1ee', src: `${NOON}ZF48A39BAF575C70368C0Z/45/_/1780467020/88e01da1-ae7f-499b-bedf-dfb2685513d4.jpg?width=400`, box: TBOX, logo: { mark: 'xiaomi', w: 11, h: 11, label: 'Xiaomi' },
      name: 'TV S Mini LED', now: '1,399', was: '2,399', off: '42% off', specs: ['Bright rooms', '55"', 'QD-Mini LED', '4.3'] },
  ];
  const CAT = {
    phone:   { cards: PHONE_CARDS, title: 'Shop phones by brand',           noun: 'phones',           spec: ['Best for', 'Storage', 'Colour', 'Rating'] },
    fitness: { cards: FIT_CARDS,   title: 'Shop fitness trackers by brand', noun: 'fitness trackers', spec: ['Best for', 'Battery', 'Feature', 'Rating'] },
    tv:      { cards: TV_CARDS,    title: 'Shop TVs by brand',              noun: 'TVs',              spec: ['Best for', 'Screen', 'Display', 'Rating'] },
  };
  let catKey = 'phone', CARDS = PHONE_CARDS;
  const LIST_BRANDS = { has: (b) => CARDS.some((c) => c.brand === b) };   // the PLP has a product list for every card's brand
  /* the selected bar's coin mark per brand: the Figma coin marks where they exist
     (12px Apple / Google / Xiaomi, the 19px Samsung wordmark), otherwise the card's own
     mark fitted to the coin (≤ 12px tall, ≤ 20px wide) or its letter badge */
  const COIN_MARKS = { Apple: ['../assets/coin-apple.svg', 12, 12], Samsung: ['../assets/coin-samsung.svg', 19.2455, 2.9],
    Google: ['../assets/coin-google.svg', 12, 12], Xiaomi: ['../assets/coin-xiaomi.svg', 12, 12] };
  function coinMark(c) {
    const g = c.logo;
    if (COIN_MARKS[c.brand]) { const [src, w, h] = COIN_MARKS[c.brand]; return `<img src="${src}" width="${w}" height="${h}" alt="" />`; }
    if (g.letter) return `<span class="brw__letter brw__letter--coin">${g.letter}</span>`;
    const k = Math.min(12 / g.h, 20 / g.w);
    return `<img src="../assets/brands/mark-${g.mark}.svg" width="${+(g.w * k).toFixed(2)}" height="${+(g.h * k).toFixed(2)}" alt="" />`;
  }
  const esc = (t) => t.replace(/&/g, '&amp;');
  let slots = [], cards = [];
  function buildTrack() {
  const SPEC = CAT[catKey].spec;
  track.innerHTML = CARDS.map((c) => {
    const [l, t, w, h] = c.box, g = c.logo;
    const mark = g.letter ? `<span class="brw__letter">${g.letter}</span>` : `<img src="${B}mark-${g.mark}.svg" width="${g.w}" height="${g.h}" alt="${g.label || c.img}" />`;
    const price = c.was ? `<span class="brw__was">${c.was}</span><span class="brw__off">${c.off}</span>` : c.note ? `<span class="brw__note${c.match ? ' brw__note--match' : ''}">${c.note}</span>` : '';
    return `<div class="brw__slot"><article class="brw__card"${c.id ? ` data-node-id="${c.id}"` : ''}>
      <div class="brw__media" style="background:${c.tint}">
        <img class="brw__img" src="${c.src || `${B}${c.img}.png`}" style="left:${l}px;top:${t}px;width:${w}px;height:${h}px" alt="" decoding="async" />
        <img class="brw__heart" src="${B}heart.svg" width="17" height="17" alt="" />
      </div>
      <div class="brw__body">
        <div class="brw__logo">${mark}${g.label ? `<b>${g.label}</b>` : ''}</div>
        <p class="brw__name">${esc(c.name)}</p>
        <p class="brw__price"><span class="brw__now">&#xE001;${c.now}</span>${price}</p>
        <div class="brw__specs">${c.specs.map((v, i) => `<p class="brw__spec"><span>${SPEC[i]}</span><b>${i === 3 ? '★ ' : ''}${esc(v)}</b></p>`).join('')}</div>
        <span class="brw__ctagap" aria-hidden="true"></span>
        <button class="brw__cta" type="button">View ${c.brand}<img src="${B}chevron.svg" width="16" height="16" alt="" /></button>
      </div>
    </article></div>`;
  }).join('');
  slots = [...track.children];
  cards = slots.map((sl) => sl.firstElementChild);
  }
  buildTrack();

  /* ── Pager — snappy paging with a slight elastic ────────────────────────────
     · drag follows the finger 1:1 (axis-locked after 6px, so vertical page
       scrolls still pass through — the rail is touch-action: pan-y)
     · past either end it rubber-bands with iOS's curve, c·(1 − 1/(x·0.55/c + 1))
     · release pages ONE card in the flick direction (≥ 220 px/s), otherwise to
       the nearest page; the last page is the rail's end, not a card edge
     · the settle is a spring (response 0.34s, ζ 0.74 → ~3% overshoot) seeded
       with the release velocity, integrated per frame so a new touch can
       catch it mid-flight
     · trackpad / wheel swipes move 1:1, then page once the gesture pauses
     · each new page plays a selection haptic; the counter follows the page */
  const pager = (() => {
    const STEP = 214, VIEW = 343;
    const max = () => Math.max(0, track.scrollWidth - VIEW);
    const pages = () => { const m = max(), out = []; for (let x = 0; x < m - 24; x += STEP) out.push(x); out.push(m); return out; };
    const SPR = { w: (2 * Math.PI) / 0.34, z: 0.74 };
    let x = 0, v = 0, raf = 0, page = 0, drag = null, wheelT = 0, edged = false;
    const rubber = (o) => { const c = VIEW; return (c * (1 - 1 / ((Math.abs(o) * 0.55) / c + 1))) * Math.sign(o); };
    const clampView = (raw) => { const m = max(); return raw < 0 ? rubber(raw) : raw > m ? m + rubber(raw - m) : raw; };
    const paint = () => { track.style.transform = `translate3d(${(-x).toFixed(2)}px,0,0)`; };
    const warm = (i) => [i, i + 1].forEach((k) => cards[k] && plp.dispatchEvent(new CustomEvent('plp:warm', { detail: { brand: CARDS[k].brand } })));
    const setPage = (i, haptic = true) => {
      if (i === page) return; page = i; warm(i);
      count.textContent = `${Math.min(cards.length, i === pages().length - 1 ? cards.length : i + 1)} of ${cards.length}`;
      if (haptic && typeof Haptics !== 'undefined') Haptics.gesture('tick');
    };
    function settle(target) {
      cancelAnimationFrame(raf);
      let last = performance.now();
      const step = (now) => {
        const dt = Math.min(0.032, (now - last) / 1000); last = now;
        // semi-implicit Euler on x'' = −ω²(x − target) − 2ζω x', sub-stepped for stability
        for (let k = 0; k < 4; k++) { const h = dt / 4; v += (-SPR.w * SPR.w * (x - target) - 2 * SPR.z * SPR.w * v) * h; x += v * h; }
        paint();
        if (Math.abs(x - target) < 0.05 && Math.abs(v) < 2) { x = target; v = 0; paint(); raf = 0; return; }
        raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }
    function snapFrom(vel) {
      const P = pages();
      let i = P.reduce((b, p, k) => (Math.abs(p - x) < Math.abs(P[b] - x) ? k : b), 0);
      if (Math.abs(vel) >= 220) {   // a flick: one page in its direction from where it started
        const from = drag ? drag.page : page;
        i = Math.max(0, Math.min(P.length - 1, from + Math.sign(vel)));
      }
      v = vel; setPage(i); settle(P[i]);
    }

    rail.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      cancelAnimationFrame(raf); raf = 0;
      drag = { id: e.pointerId, x0: e.clientX, y0: e.clientY, s0: x, lock: null, page, samples: [[e.timeStamp, e.clientX]], moved: false };
      edged = false;
    });
    rail.addEventListener('pointermove', (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x0, dy = e.clientY - drag.y0;
      if (!drag.lock) {
        if (Math.hypot(dx, dy) < 6) return;
        drag.lock = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
        if (drag.lock === 'y') { drag = null; return; }   // vertical: let the page scroll
        rail.setPointerCapture(e.pointerId); rail.classList.add('is-drag');
      }
      drag.moved = true;
      const raw = drag.s0 - dx;
      if (!edged && (raw < 0 || raw > max())) { edged = true; if (typeof Haptics !== 'undefined') Haptics.gesture('edge'); }
      x = clampView(raw); v = 0; paint();
      drag.samples.push([e.timeStamp, e.clientX]); if (drag.samples.length > 6) drag.samples.shift();
    });
    const end = (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      rail.classList.remove('is-drag');
      if (!drag.moved) { drag = null; return; }
      // release velocity from the last ~80ms of samples (px/s, in track direction)
      const S = drag.samples, now = S[S.length - 1]; let a = S[0];
      for (const s of S) if (now[0] - s[0] <= 80) { a = s; break; }
      const vel = now[0] > a[0] ? -((now[1] - a[1]) / (now[0] - a[0])) * 1000 : 0;
      snapFrom(Math.max(-4000, Math.min(4000, vel)));
      const swallow = (ce) => { ce.stopPropagation(); ce.preventDefault(); };
      rail.addEventListener('click', swallow, { capture: true, once: true });   // a drag is not a tap
      setTimeout(() => rail.removeEventListener('click', swallow, { capture: true }), 0);
      drag = null;
    };
    rail.addEventListener('pointerup', end);
    rail.addEventListener('pointercancel', end);

    // trackpad / horizontal wheel
    let wv = 0, wLast = 0;
    rail.addEventListener('wheel', (e) => {
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
      if (!d) return;
      e.preventDefault();
      cancelAnimationFrame(raf); raf = 0;
      const now = performance.now(), dt = Math.max(8, now - wLast); wLast = now;
      wv = (d / dt) * 1000;
      const m = max(), raw = x + d * (x < 0 || x > m ? 0.35 : 1);
      x = Math.max(-VIEW * 0.25, Math.min(m + VIEW * 0.25, raw)); paint();
      clearTimeout(wheelT);
      wheelT = setTimeout(() => { snapFrom(Math.abs(wv) > 600 ? Math.sign(wv) * 400 : 0); wv = 0; }, 90);
    }, { passive: false });

    // keyboard: ← → page when the rail has focus
    rail.tabIndex = 0;
    rail.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault(); const P = pages(), i = Math.max(0, Math.min(P.length - 1, page + (e.key === 'ArrowRight' ? 1 : -1)));
      v = 0; setPage(i); settle(P[i]);
    });

    return { reset() { cancelAnimationFrame(raf); raf = 0; clearTimeout(wheelT); drag = null; x = 0; v = 0; page = 0; paint(); count.textContent = `1 of ${cards.length}`; }, warm };
  })();

  /* ── springs, Apple-style: response (s) + damping fraction → ω, ζ ───────── */
  const spr = (response, damping) => ({ w: (2 * Math.PI) / response, z: damping });
  const CARD_SPR = spr(0.5, 0.92);
  function springAnim(el, from, to, fmt, { w, z }, delay = 0) {
    if (PP.reduce.matches) return el.animate([fmt(to), fmt(to)], { duration: 1, delay, fill: 'both' });
    const d = from - to, a = Math.abs(d) || 1;
    // closed-form damped / critically-damped response released from rest
    const x = z < 1
      ? ((wd) => (t) => Math.exp(-z * w * t) * (d * Math.cos(wd * t) + ((z * w * d) / wd) * Math.sin(wd * t)))(w * Math.sqrt(1 - z * z))
      : (t) => d * (1 + w * t) * Math.exp(-w * t);
    const dur = Math.min(1.6, Math.max(0.25, (Math.log(a / (0.002 * a + 0.01)) + 1.2) / (z * w)));
    const N = Math.round(dur * 120);   // 120 samples/s so ProMotion screens get fine steps
    const frames = Array.from({ length: N + 1 }, (_, k) => ({ offset: k / N, ...fmt(k === N ? to : to + x((k / N) * dur)) }));
    return el.animate(frames, { duration: dur * 1000, delay, fill: 'both' });
  }
  const OUT = 'cubic-bezier(.32,.72,0,1)';   // iOS sheet / "smooth" curve

  /* ── reveal ──────────────────────────────────────────────────────────────── */
  const H = 459, WAIT = 0;   // box: 2 + 450 panel + 9 gap − the grid's own 2px top padding
  const REVEAL = { CARD_RISE: 20, CARD_SCALE: 0.9, HEAD_RISE: 10, CARD_FADE_AT: 17, HEAD_AT: 33, HEAD_FADE_AT: 50, FADE_MS: 300 };
  const REVEAL_FADE = 'linear(0, 0.1202, 0.2309, 0.3305, 0.4218, 0.5033, 0.5773, 0.6428, 0.7018, 0.7532, 0.7988, 0.838, 0.8722, 0.9008, 0.9252, 0.945, 0.9612, 0.9737, 0.9834, 0.9902, 0.995, 0.9978, 0.9994, 0.9999, 1)';
  const revealFade = (el, delay = 0) => el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: REVEAL.FADE_MS, delay, easing: REVEAL_FADE, fill: 'both' });

  /* The grid push runs on the compositor: the box jumps to its new height at once and the product grid
     (an opaque white layer stacked above the box) slides from where it was to its new place on a transform,
     on the same spring the height used to follow. Animating the box's height re-laid-out and repainted all
     eight product cards every frame (~30 paints a frame) — the lag on Android phones. The look is unchanged:
     the grid's top edge is still the reveal line that uncovers / covers the panel. */
  const grid = document.getElementById('plpGrid');
  function pushGrid(from, to, springOf) {
    grid.getAnimations().forEach((a) => a.cancel());
    box.style.height = to + 'px';
    const d = from - to;   // where the grid was, relative to where it now sits
    return PP.commit(grid, [springOf(grid, d, 0, (v) => ({ transform: `translate3d(0,${(+v).toFixed(2)}px,0)` }))], { transform: '' });
  }
  let timers = [], running = false;
  const later = (ms, fn) => timers.push(setTimeout(fn, ms));

  /* ── TV searches ask before they show (iteration 4) ─────────────────────────
     The panel opens on a three-step picker instead of the rail: a segmented
     progress bar, then one question at a time (budget → screen size →
     picture), each answered on the Product Upscale ROSTER SLIDER (noon-home's
     "Meet the iPhone lineup"): the four answers stand in a row as TVs with a
     label and hint; the selection (pink circle, pink indicator line + dot,
     over a tick ruler) stays fixed in the centre and the row and ruler slide
     under it. Drag follows 1:1 (rubber band past either end); release snaps
     ONE answer in the flick direction on a soft spring carrying the release
     velocity; tap an answer to bring it in. Unselected answers sit at 90%,
     easing to full size in the slot; while it moves the ruler swells in a
     wave around the indicator with a pink spill, the dot drops out and the
     circle eases to 94%; each ruler tick crossing the line clicks (haptic +
     a soft click), a new answer landing snaps. Next fills the step's progress
     segment and the next question slides in from the right; Back mirrors it,
     keeping the answer. "Show my picks" → "Personalizing for you" (text over
     soft drifting glows) while the grid shimmers, then the rail rises in with
     each brand's best match. Skip (first step) shows the brand rail as in 3. */
  // opts: [label, value, hint, [photo, size]] — each answer is a real noon TV, cut out (assets/tv/*.webp), at a relative size
  const QUESTIONS = [
    { key: 'budget', label: 'Budget',  q: 'What’s your budget?', sub: 'Swipe to set a price range', def: 1,
      opts: [['Under  1,500', [0, 1500], 'Great value', ['crystal', 0.86]], [' 1,500 – 3,000', [1500, 3000], 'Most popular', ['q8f', 0.9]],
             [' 3,000 – 5,000', [3000, 5000], 'Premium', ['bravia', 0.95]], [' 5,000+', [5000, 1e9], 'Top of the range', ['neoqled', 1]]] },
    // one TV that morphs to size as the ruler moves (single), instead of a row of answers
    { key: 'size',   label: 'Screen',  q: 'Which screen size?', sub: 'Measured diagonally', def: 1, single: 'qled65',
      opts: [['Up to 50"', [0, 50], 'Bedrooms & kitchens', 0.56], ['55"', [51, 60], 'Most popular', 0.68], ['65"', [61, 70], 'Living rooms', 0.84], ['75" & up', [71, 200], 'Home cinema', 1]] },
    // one TV whose picture wipes from one screen type to the next as the ruler moves (single + screen):
    // [screen image (assets/tv/screen-*.webp), ambient glow colour, the signature pulse when it lands]
    { key: 'tech',   label: 'Picture', q: 'Any picture preference?', sub: 'Swipe through the screen types', def: 0, single: 'qled65', screen: true,
      opts: [['No preference', null, 'Show me everything', ['any', 'rgba(242,176,64,.58)', '']], ['QLED', 'QLED', 'Bright, vivid colour', ['qled', 'rgba(118,88,255,.55)', 'saturate(1.28)']],
             ['Mini LED', 'Mini LED', 'Brightest HDR', ['mini', 'rgba(40,200,205,.55)', 'brightness(1.14)']], ['OLED', 'OLED', 'Perfect blacks', ['oled', 'rgba(255,90,140,.5)', 'contrast(1.18) saturate(1.06)']]] },
  ];
  const PAGE_DX = 44;
  const PAGE = spr(0.5, 1), SNAP = spr(0.3, 0.86);
  const EASE_OUT = 'cubic-bezier(.22,1,.36,1)';
  const SL_W = 315, THUMB = 28, TRAVEL = SL_W - THUMB;   // the thumb's centre runs 14 → 301
  const ask = document.createElement('div');
  ask.className = 'brw__ask';
  /* the picker's own top (the widget's header is hidden while it asks): an eyebrow, the step count and
     three step pills — done = dark dot, current = a wider dark pill, to come = grey dot (morphing on change) */
  ask.innerHTML = `<div class="qz__top"><span class="qz__eyebrow">Find your TV</span>
      <span class="qz__prog"><span class="qz__count">1 of ${QUESTIONS.length}</span><span class="qz__steps" aria-hidden="true">${QUESTIONS.map(() => '<i></i>').join('')}</span></span></div>
    <div class="qz__stage"></div>
    <div class="qz__foot">
      <span class="qz__left">
        <button class="qz__skip" type="button">Skip</button>
        <button class="qz__back" type="button"><img src="${B}chevron.svg" width="16" height="16" alt="" />Back</button>
      </span>
      <button class="qz__next" type="button">Next</button>
    </div>`;
  bar.appendChild(ask);
  const qBar = ask.querySelector('.qz__top'), qCount = ask.querySelector('.qz__count'), stage = ask.querySelector('.qz__stage'), foot = ask.querySelector('.qz__foot');
  const qBack = ask.querySelector('.qz__back'), qSkip = ask.querySelector('.qz__skip'), qNext = ask.querySelector('.qz__next');
  const fills = [...qBar.querySelectorAll('.qz__steps i')];
  const TV_BRAND = Object.fromEntries(TV_CARDS.map((c) => [c.brand, c]));
  let answers = {}, step = 0, page = null, busy = false, personal = false, slider = null;
  const node = (html) => { const t = document.createElement('div'); t.innerHTML = html.trim(); return t.firstElementChild; };
  const fill = (i, on) => fills[i].classList.toggle('is-done', on);
  const fadeEl = (el, to, ms = 200) => PP.commit(el, [el.animate([{ opacity: +getComputedStyle(el).opacity }, { opacity: to }], { duration: ms, easing: OUT, fill: 'both' })], { opacity: to });

  /* Sfx — the roster's clicks, synthesised (no audio files): a crisp ~14ms tick as a ruler tick crosses
     the line, a fuller 22ms snap with a short "tock" when an answer lands (noon-home's Sfx, as measured) */
  const Sfx = (() => {
    let ctx = null;
    const ensure = () => {
      if (!ctx) { const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null; ctx = new AC(); }
      if (ctx.state === 'suspended') ctx.resume();
      return ctx;
    };
    function click(freq, q, ms, gain, body = 0) {
      const c = ensure(); if (!c || c.state !== 'running') return;
      const t = c.currentTime, len = Math.max(1, Math.floor(c.sampleRate * ms / 1000));
      const buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len * 0.22));
      const src = c.createBufferSource(); src.buffer = buf;
      const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = freq; bp.Q.value = q;
      const g = c.createGain(); g.gain.value = gain;
      src.connect(bp).connect(g).connect(c.destination); src.start(t);
      if (body) {
        const o = c.createOscillator(), og = c.createGain();
        o.frequency.setValueAtTime(freq * 0.62, t); o.frequency.exponentialRampToValueAtTime(freq * 0.45, t + 0.03);
        og.gain.setValueAtTime(body, t); og.gain.exponentialRampToValueAtTime(0.0001, t + 0.035);
        o.connect(og).connect(c.destination); o.start(t); o.stop(t + 0.04);
      }
    }
    return { unlock: ensure, tick: () => click(2900, 4, 14, 0.07), snap: () => click(2400, 3, 22, 0.12, 0.05) };
  })();
  const TV_W = 156, TV_BIG = 196, TV_SCR = 190;   // TV_SCR: the picture question's TV
  // the screen inside assets/tv/qled65.webp (measured from the cut-out: 1–2px bezel, stand below)
  const SCREEN = { l: 0.8, t: 1.9, w: 98.4, h: 89.4 };   // the largest answer's width in the slot; the size question's TV at 75"+
  const tvImg = ([file, k]) => `<img class="rsi__img" src="../assets/tv/${file}.webp" width="${Math.round(TV_W * k)}" height="${Math.round(TV_W * k * 0.615)}" alt="" decoding="async" />`;

  /* The roster (one per question page). Rail x runs 0 (first answer in the slot) → X_MIN (last).
     Geometry, roster coordinates (343 wide, the panel's full width): the slot / the indicator in
     the CENTRE (x 171), answers 136 apart either side (17 ruler ticks of 8px, a darker mark under each).
     The answer in the slot is full size on a soft peach glow; the others shrink to 70% and fade to
     42% as they leave it (continuous with position) and peek in from the panel edges. One readout
     under the slot names the answer and rolls over (out up, in from below) when it changes. */
  const RS = { PITCH: 136, TICK: 8, IND: 171, SHRINK: 0.3, FADE: 0.58, RUBBER: 150, W: 11, Z: 0.96 };
  const WAVE = { A: 0.43, SIGMA: 17.5, ATTACK: 0.02, HOLD: 50, DECAY: 100, V_MIN: 20 };
  const TINT = { MAX: 0.92, SIGMA: 12, TRAIL: 14, LEAD: 3, V_FULL: 900 };
  function springFn(w, z, x0, v0) {
    const wd = w * Math.sqrt(1 - z * z), e = (t) => Math.exp(-z * w * t);
    return {
      d: (t) => e(t) * (x0 * Math.cos(wd * t) + ((v0 + z * w * x0) / wd) * Math.sin(wd * t)),
      v: (t) => e(t) * (v0 * Math.cos(wd * t) - ((z * w * v0 + w * w * x0) / wd) * Math.sin(wd * t)),
    };
  }
  function makeRoster(pg, Q, k0) {
    const rs = pg.querySelector('.rs'), items = [...rs.querySelectorAll('.rsi')], strip = rs.querySelector('.rs__ticks');
    const tickEls = [...strip.children], ind = rs.querySelector('.rs__ind'), dot = rs.querySelector('.rs__dot'), selC = rs.querySelector('.rs__sel');
    const rd = rs.querySelector('.rs__read');
    /* the readout: one line per answer, riding the rail at half its speed and fading with distance from
       the slot (gone by 0.7 of a step) — the names slide and crossfade with the finger, never swap */
    rd.innerHTML = Q.opts.map(([label, , hint]) => `<span class="rs__line"><b>${label}</b><span>${hint}</span></span>`).join('');
    const lines = [...rd.children];
    function paintRead() {
      lines.forEach((l, k) => {
        const d = k * RS.PITCH + x, t = Math.min(1, Math.abs(d) / (RS.PITCH * 0.7)), o = 1 - t * t * (3 - 2 * t);
        l.style.transform = `translate3d(${(d * 0.5).toFixed(2)}px,0,0)`;
        l.style.opacity = o.toFixed(3);
        l.style.visibility = o < 0.002 ? 'hidden' : '';
      });
    }
    const N = Q.opts.length, X_MIN = -(N - 1) * RS.PITCH, single = !!Q.single;
    /* single (screen size): one TV, its scale a continuous function of the rail position — linear between
       the answers' sizes, a little past them on the rubber band — so it grows and shrinks with the finger
       and lands exactly on the size the snap spring settles on; the glow behind it scales with it */
    const KS = Q.opts.map((o) => o[3]);
    /* single + screen (picture type): the TV holds still; its picture is one layer per answer, and the
       next layer wipes in from the right with the rail (a clip-path inset following the finger), a light
       seam riding the wipe edge; the ambient glow behind the set crossfades between the answers'
       colours; when it lands, that screen type plays its signature pulse (QLED colour, Mini LED
       brightness, OLED contrast) */
    const layers = Q.screen ? [...rs.querySelectorAll('.scr__l')] : [], seam = rs.querySelector('.scr__seam');
    const pics = layers.map((L) => L.firstElementChild);
    const SW = TV_SCR * SCREEN.w / 100, SOFT = SW * 0.1;   // screen width; half the feathered edge (the mask's 30→36.7% of 3W)
    const ambs = Q.screen ? [...rs.querySelectorAll('.rs__amb i')] : [];
    function paintScreen() {
      const u = Math.max(0, Math.min(N - 1, -x / RS.PITCH)), i = Math.min(N - 2, Math.floor(u)), f = u - i;
      /* a feathered wipe: the incoming picture's mask (a soft 0.2W edge) slides from beyond the right edge to
         beyond the left as f goes 0 → 1, so it starts and ends fully clean; the pictures drift with it (the
         incoming one in from 18% to the right, the outgoing out 12% to the left) as if passing behind glass,
         and a faint band of light rides the edge */
      const edge = (1 - f) * (SW + 2 * SOFT) - SOFT;   // the soft edge's centre, px from the screen's left
      layers.forEach((L, k) => {
        const on = k === i || k === i + 1, wipe = k === i + 1 && f > 0;
        L.style.visibility = on && (k === i || f > 0) ? '' : 'hidden';
        L.classList.toggle('is-wipe', wipe);
        if (wipe) { const mp = `${(edge - SW).toFixed(2)}px 0`; L.style.webkitMaskPosition = mp; L.style.maskPosition = mp; }
        const drift = k === i + 1 ? (1 - f) * SW * 0.18 : k === i ? -f * SW * 0.12 : 0;
        pics[k].style.transform = drift ? `translate3d(${drift.toFixed(2)}px,0,0)` : '';
      });
      seam.style.transform = `translate3d(${(edge - 22).toFixed(2)}px,0,0)`;
      seam.style.opacity = (Math.sin(Math.PI * f) * 0.7).toFixed(3);
      ambs.forEach((g, k) => { const w = Math.max(0, 1 - Math.abs(u - k)); g.style.opacity = (w * w * (3 - 2 * w)).toFixed(3); });
      const over = x > 0 ? x : x < X_MIN ? x - X_MIN : 0;   // on the rubber band the set leans a touch with the pull
      items[0].style.transform = over ? `translate3d(${(over * 0.18).toFixed(2)}px,0,0)` : '';
    }
    function pulse() {
      const fx = Q.opts[sel][3][2], L = layers[sel];
      if (!fx || !L || IS_ANDROID || PP.reduce.matches) return;
      // a gentle swell and release (~0.9s), the glow breathing with it
      PP.commit(L, [L.animate([{ filter: 'none' }, { filter: fx, offset: 0.4 }, { filter: 'none' }], { duration: 900, easing: 'cubic-bezier(.37,0,.63,1)' })], {});
      const g = ambs[sel];
      if (g) PP.commit(g, [g.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.08)', offset: 0.4 }, { transform: 'scale(1)' }], { duration: 900, easing: 'cubic-bezier(.37,0,.63,1)' })], {});
    }
    const sizeAt = (u) => {
      if (u <= 0) return KS[0] + (KS[1] - KS[0]) * Math.max(-0.35, u);
      if (u >= N - 1) return KS[N - 1] + (KS[N - 1] - KS[N - 2]) * Math.min(0.35, u - (N - 1));
      const i = Math.floor(u), f = u - i, P = (k) => KS[Math.max(0, Math.min(N - 1, k))];
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);   // Catmull-Rom: same speed into and out of each stop
      return 0.5 * (2 * p1 + (p2 - p0) * f + (2 * p0 - 5 * p1 + 4 * p2 - p3) * f * f + (3 * p1 - p0 - 3 * p2 + p3) * f * f * f);
    };
    const rubber = (d) => (1 - 1 / ((d * 0.55) / RS.RUBBER + 1)) * RS.RUBBER;
    const bound = (raw) => (raw > 0 ? rubber(raw) : raw < X_MIN ? X_MIN - rubber(X_MIN - raw) : raw);
    const clampK = (k) => Math.max(0, Math.min(N - 1, k));
    let x = -k0 * RS.PITCH, v = 0, sel = -1, anim = null, drag = null, raf = 0;
    let lastTick = Math.round(-x / RS.TICK), lastTickAt = 0, lastHapAt = 0, pastEdge = false, hidden = -1;
    function select(i, sound) {
      if (i === sel) return;
      sel = i;
      if (!single) {
        items.forEach((el, k) => { el.classList.toggle('is-sel', k === i); el.setAttribute('aria-selected', k === i); });
        rs.setAttribute('aria-activedescendant', items[i].id);
      } else rs.setAttribute('aria-valuetext', Q.opts[i][0]);
      lines.forEach((l, k) => l.classList.toggle('is-cur', k === i));
      if (sound) { Sfx.snap(); Haptics.snap(); lastTickAt = performance.now(); }
    }
    function render(sound = true) {
      paintRead();
      if (Q.screen) paintScreen();
      else if (single) {
        const k = sizeAt(-x / RS.PITCH);
        items[0].style.transform = `scale(${k.toFixed(4)})`;
        selC.style.transform = `scale(${(0.55 + 0.45 * k).toFixed(4)})`;
      } else items.forEach((el, i) => {
        const p = i * RS.PITCH + x, t = Math.min(1, Math.abs(p) / RS.PITCH), e = t * t * (3 - 2 * t);
        el.style.transform = `translate3d(${x.toFixed(2)}px,0,0) scale(${(1 - RS.SHRINK * e).toFixed(4)})`;
        el.style.opacity = (1 - RS.FADE * e).toFixed(3);
      });
      strip.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
      // the pink line stands in for the tick under it: hide that one
      const under = Math.round(-x / RS.TICK);
      if (under !== hidden) { if (tickEls[hidden]) tickEls[hidden].style.visibility = ''; if (tickEls[under]) tickEls[under].style.visibility = 'hidden'; hidden = under; }
      const ti = Math.round(-x / RS.TICK), slot = clampK(Math.round(-x / RS.PITCH));
      if (ti !== lastTick) {
        lastTick = ti;
        const now = performance.now();
        if (sound && now - lastTickAt >= 100) { lastTickAt = now; Sfx.tick(); }
        if (sound && slot === sel && x <= 0.5 && x >= X_MIN - 0.5 && now - lastHapAt >= 40) { lastHapAt = now; Haptics.gesture('tick'); }
      }
      const past = x > 0.5 || x < X_MIN - 0.5;
      if (past !== pastEdge) { pastEdge = past; if (past && sound) Haptics.gesture('edge'); }
      select(slot, sound);
      waveKick();
    }
    /* ruler wave + pink spill (noon-home, measured): while moving, ticks near the line grow on a bell
       curve (×1.43 beside it, σ 17.5px) and take the line's pink, smeared to the trailing side */
    let E = 0, wx = x, wt = 0, lastActive = -1e9, relFrom = null, waveRaf = 0, armed = false, vS = 0;
    const swelled = new Set();
    function waveApply() {
      const reach = WAVE.SIGMA * 3, k = Math.min(1, Math.abs(vS) / TINT.V_FULL);
      const sTrail = TINT.SIGMA + TINT.TRAIL * k, sLead = TINT.SIGMA - TINT.LEAD * k;
      tickEls.forEach((el, i) => {
        const d = i * RS.TICK + x;
        if (E > 0 && Math.abs(d) < reach) {
          el.style.transform = `scaleY(${(1 + WAVE.A * E * Math.exp(-((d / WAVE.SIGMA) ** 2))).toFixed(4)})`;
          el.style.setProperty('--tint', (TINT.MAX * E * Math.exp(-((d / (d * vS > 0 ? sTrail : sLead)) ** 2))).toFixed(3));
          swelled.add(i);
        } else if (swelled.has(i)) { el.style.transform = ''; el.style.removeProperty('--tint'); swelled.delete(i); }
      });
      ind.style.transform = E > 0 ? `scaleY(${(1 + WAVE.A * E).toFixed(4)})` : '';
    }
    function waveKick() {
      if (PP.reduce.matches || waveRaf) return;
      if (!armed && E === 0) { wx = x; return; }
      wt = 0; waveRaf = requestAnimationFrame(waveStep);
    }
    function waveStep(now) {
      const dt = wt ? Math.min(0.05, (now - wt) / 1000) : 0;
      const speed = dt ? Math.abs(x - wx) / dt : (x !== wx ? Infinity : 0);
      if (dt) vS += ((x - wx) / dt - vS) * (1 - Math.exp(-dt / 0.06));
      wx = x; wt = now;
      if (armed && speed > WAVE.V_MIN) { lastActive = now; relFrom = null; E += (1 - E) * (1 - Math.exp(-(dt || 1 / 60) / WAVE.ATTACK)); }
      else if (now - lastActive > WAVE.HOLD) {
        if (!relFrom) { relFrom = { t: now, E }; armed = false; }
        E = relFrom.E * (1 - Math.min(1, (now - relFrom.t) / WAVE.DECAY)) ** 1.6;
      }
      waveApply();
      if (E > 0.0005 || now - lastActive <= WAVE.HOLD) waveRaf = requestAnimationFrame(waveStep);
      else { E = 0; relFrom = null; waveApply(); waveRaf = 0; settleUi(); }
    }
    /* the pink dot drops out the moment the row moves and pops back once everything is still;
       the circle eases to 94% while moving and springs back as an answer lands */
    let moving = false, dotT = 0;
    function moved() {
      armed = true; clearTimeout(dotT);
      if (moving) return; moving = true;
      PP.commit(dot, [dot.animate([{ transform: getComputedStyle(dot).transform === 'none' ? 'scale(1)' : getComputedStyle(dot).transform }, { transform: 'scale(0)' }], { duration: 160, easing: PP.EASE_IO, fill: 'forwards' })], { transform: 'scale(0)' });
      if (!single) PP.commit(selC, [selC.animate([{ transform: 'scale(1)' }, { transform: 'scale(.94)' }], { duration: 240, easing: PP.EASE_IO, fill: 'forwards' })], { transform: 'scale(.94)' });
    }
    function settleUi() {
      if (!moving || drag || waveRaf || anim) return;
      clearTimeout(dotT);
      dotT = setTimeout(() => {
        if (drag || waveRaf || anim || !moving) return;
        moving = false;
        PP.commit(dot, [PP.spring(dot, 0, 1, (k) => ({ transform: `scale(${Math.max(0, +k).toFixed(3)})` }))], { transform: '' });
        if (!single) PP.commit(selC, [springAnim(selC, 0.94, 1, (k) => ({ transform: `scale(${(+k).toFixed(4)})` }), { w: 13, z: 0.8 })], { transform: '' });
        if (Q.screen) pulse();
      }, 90);
    }
    function goToX(target, v0 = v) {
      if (Math.abs(target - x) > 0.05) moved();
      const running = !!anim, x0 = x - target;
      if (v0 * -x0 > 0) v0 = Math.sign(v0) * Math.min(Math.abs(v0), RS.W * Math.abs(x0) * 1.2);
      else v0 = Math.sign(v0) * Math.min(Math.abs(v0), 600);
      anim = { target, t0: performance.now(), f: springFn(RS.W, RS.Z, x0, v0) };
      if (!running) raf = requestAnimationFrame(stepF);
    }
    function stepF(now) {
      if (!anim) return;
      const t = (now - anim.t0) / 1000, d = anim.f.d(t);
      v = anim.f.v(t); x = anim.target + d;
      if (Math.abs(d) < 0.05 && Math.abs(v) < 5) { x = anim.target; v = 0; anim = null; render(); settleUi(); return; }
      render(); raf = requestAnimationFrame(stepF);
    }
    function release(vel) {
      if (x > 0) return goToX(0, vel);
      if (x < X_MIN) return goToX(X_MIN, vel);
      const nearest = Math.round(-x / RS.PITCH), proj = Math.round(-(x + vel * 0.2) / RS.PITCH);
      goToX(-clampK(nearest + Math.sign(proj - nearest) * Math.min(1, Math.abs(proj - nearest))) * RS.PITCH, vel);
    }
    function lock(e) {
      anim = null; drag.locked = true; drag.x0 = x; drag.sx = e.clientX;
      try { rs.setPointerCapture(e.pointerId); } catch (_) {}
      rs.classList.add('is-drag');
    }
    rs.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      Sfx.unlock();
      drag = { id: e.pointerId, sx: e.clientX, sy: e.clientY, x0: x, locked: false, moved: 0, t: performance.now(), samples: [[performance.now(), x]] };
      if (e.pointerType === 'mouse') lock(e);
    });
    rs.addEventListener('pointermove', (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.sx, dy = e.clientY - drag.sy;
      drag.moved = Math.max(drag.moved, Math.hypot(dx, dy));
      if (!drag.locked) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        if (Math.abs(dy) > Math.abs(dx)) { drag = null; return; }   // vertical: the page scrolls
        lock(e);
      }
      if (Math.abs(e.clientX - drag.sx) > 2) moved();
      x = bound(drag.x0 + (e.clientX - drag.sx));
      const sm = drag.samples; sm.push([performance.now(), x]); while (sm.length > 2 && sm[sm.length - 1][0] - sm[0][0] > 80) sm.shift();
      render();
    });
    const endDrag = (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      const d = drag; drag = null; rs.classList.remove('is-drag');
      if (d.moved < 6 && performance.now() - d.t < 400) {   // a tap: bring that answer in
        if (single) {   // a tap either side of the TV steps one size down / up
          const c = rs.getBoundingClientRect().left + RS.IND, dx = e.clientX - c;
          if (Math.abs(dx) > 50) goToX(-clampK(sel + Math.sign(dx)) * RS.PITCH, 0); else release(0);
          return;
        }
        const hit = document.elementsFromPoint(e.clientX, e.clientY).find((el) => el.closest && el.closest('.rsi'));
        if (hit) { goToX(-clampK(+hit.closest('.rsi').dataset.i) * RS.PITCH, 0); return; }
        release(0); return;
      }
      if (!d.locked) return;
      const sm = d.samples, a = sm[0], b = sm[sm.length - 1];
      release(e.type === 'pointercancel' ? 0 : (b[0] > a[0] ? ((b[1] - a[1]) / (b[0] - a[0])) * 1000 : 0));
    };
    rs.addEventListener('pointerup', endDrag); rs.addEventListener('pointercancel', endDrag);
    rs.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault(); goToX(-clampK(sel + (e.key === 'ArrowRight' ? 1 : -1)) * RS.PITCH, 0);
    });
    render(false);
    return { get k() { return sel; }, stop() { anim = null; cancelAnimationFrame(raf); cancelAnimationFrame(waveRaf); clearTimeout(dotT); } };
  }

  // one question on the stage; dir 1 = from the right, −1 = from the left, 0 = the first one rising in
  function show(i, dir) {
    step = i; busy = true;
    const Q = QUESTIONS[i], k0 = answers[Q.key + 'K'] != null ? answers[Q.key + 'K'] : Q.def;
    count.textContent = `${i + 1} of ${QUESTIONS.length}`;
    fills.forEach((f, k) => f.classList.toggle('is-cur', k === i));
    if (qCount.textContent !== `${i + 1} of ${QUESTIONS.length}`) {
      qCount.textContent = `${i + 1} of ${QUESTIONS.length}`;
      PP.commit(qCount, [qCount.animate([{ opacity: 0, transform: `translateY(${dir < 0 ? -4 : 4}px)` }, { opacity: 1, transform: 'none' }], { duration: 260, easing: EASE_OUT, fill: 'both' })], { opacity: 1, transform: '' });
    }
    const next = node(`<div class="qz__page qz__page--${Q.key}">
      <p class="qz__q">${Q.q}</p><p class="qz__sub">${Q.sub}</p>
      <div class="rs" role="${Q.single ? 'slider' : 'listbox'}" tabindex="0" aria-label="${Q.q}">
        ${Q.screen ? `<i class="rs__amb" aria-hidden="true">${Q.opts.map((o) => `<i style="--c:${o[3][1]}"></i>`).join('')}</i>` : '<i class="rs__sel" aria-hidden="true"></i>'}
        ${Q.screen ? `<div class="rsi rsi--single rsi--screen" style="left:${RS.IND - TV_SCR / 2}px;width:${TV_SCR}px"><span class="scr">${tvImg([Q.single, TV_SCR / TV_W])}
          <span class="scr__screen" style="left:${SCREEN.l}%;top:${SCREEN.t}%;width:${SCREEN.w}%;height:${SCREEN.h}%">${Q.opts.map((o) => `<i class="scr__l"><b style="background-image:url(../assets/tv/screen-${o[3][0]}.webp)"></b></i>`).join('')}<i class="scr__seam"></i><i class="scr__glare"></i></span></span></div>`
          : Q.single ? `<div class="rsi rsi--single" style="left:${RS.IND - TV_BIG / 2}px;width:${TV_BIG}px">${tvImg([Q.single, TV_BIG / TV_W])}</div>`
          : Q.opts.map(([label, , , look], k) => `<div class="rsi" role="option" aria-label="${label}" id="rsi-${Q.key}-${k}" data-i="${k}" style="left:${RS.IND - TV_W / 2 + k * RS.PITCH}px">${tvImg(look)}</div>`).join('')}
        <div class="rs__read" aria-hidden="true"></div>
        <div class="rs__ruler"><div class="rs__ticks">${Array.from({ length: (Q.opts.length - 1) * (RS.PITCH / RS.TICK) + 1 }, (_, j) =>
          `<i class="rs__tick${j % (RS.PITCH / RS.TICK) ? '' : ' rs__tick--mark'}" style="left:${RS.IND - 1 + j * RS.TICK}px"></i>`).join('')}</div></div>
        <i class="rs__ind" aria-hidden="true"></i><img class="rs__dot" src="../assets/2a34b.svg" width="4" height="4" alt="" />
      </div>
    </div>`);
    const old = page; page = next; stage.appendChild(next);
    if (slider) slider.stop();
    slider = makeRoster(next, Q, k0);
    /* one push: the outgoing question and the incoming one ride the SAME critically-damped spring, the
       old moving out by PAGE_DX as the new moves in from PAGE_DX on the other side, crossfading over
       the first part of the travel — so it reads as one sheet sliding, never a fade-out then a pop-in */
    const dx = dir * PAGE_DX, dy = dir ? 0 : 12;
    if (old) {
      old.getAnimations().forEach((a) => a.cancel());
      PP.commit(old, [springAnim(old, 0, 1, (p) => ({ transform: `translateX(${(-dx * p).toFixed(2)}px)` }), PAGE),
        old.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, easing: 'cubic-bezier(.4,0,.6,1)', fill: 'both' })], { opacity: 0 }).then(() => old.remove());
    }
    PP.commit(next, [springAnim(next, 0, 1, (p) => ({ transform: `translate(${(dx * (1 - p)).toFixed(2)}px,${(dy * (1 - p)).toFixed(2)}px)` }), PAGE),
      next.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 320, delay: dir ? 50 : 80, easing: 'cubic-bezier(.25,.1,.25,1)', fill: 'both' })], { opacity: 1, transform: '' });
    // footer: Skip on the first step, Back after it; Next turns into "Show my picks" on the last
    qSkip.disabled = i > 0; qBack.disabled = i === 0;
    fadeEl(qSkip, i > 0 ? 0 : 1); fadeEl(qBack, i === 0 ? 0 : 1);
    const label = i === QUESTIONS.length - 1 ? 'Show my picks' : 'Next';
    if (qNext.textContent !== label) { qNext.textContent = label; PP.commit(qNext, [qNext.animate([{ opacity: 0.4 }, { opacity: 1 }], { duration: 200, easing: OUT, fill: 'both' })], { opacity: 1 }); }
    later(dir ? 300 : 340, () => { busy = false; });
  }
  // Next: the slider's stop is the answer; the step's segment fills and the next question slides in
  qNext.addEventListener('click', () => {
    if (busy || !page || !slider) return;
    busy = true;
    const Q = QUESTIONS[step], k = slider.k, [label, val] = Q.opts[k];
    answers[Q.key] = val; answers[Q.key + 'K'] = k; answers[Q.key + 'Label'] = val === null ? 'Any picture' : label;
    fill(step, true);
    later(120, () => (step + 1 < QUESTIONS.length ? show(step + 1, 1) : personalize()));   // the push starts while the segment fills
  });
  qBack.addEventListener('click', () => {
    if (busy || step === 0) return;
    answers[QUESTIONS[step].key + 'K'] = slider.k;   // keep where this slider was, for when Next comes back to it
    fill(step - 1, false); show(step - 1, -1);
  });
  // Skip: no questions — the brand rail as in iteration 3
  qSkip.addEventListener('click', () => {
    if (busy) return;
    busy = true;
    [qBar, stage, foot].forEach((el) => fadeEl(el, 0, 180));
    later(140, () => {
      hTitle.textContent = CAT[catKey].title; count.textContent = `1 of ${cards.length}`;
      PP.commit(hTitle, [fadeTo(hTitle, 0, 1, 240, 0, OUT, [{ transform: 'translateY(4px)' }, { transform: 'none' }])], { opacity: 1, transform: '' });
      PP.commit(count, [fadeTo(count, 0, 1, 240, 40, OUT)], { opacity: 1 });
      box.classList.remove('is-asking');
      cardsIn(40);
    });
  });
  function pickCard({ brand, p, spec, pct }) {
    const b = TV_BRAND[brand], t = p.title;
    const tech = spec.tech === 'QLED' && /qned/i.test(t) ? 'QNED' : spec.tech;   // LG's QNED matches a QLED answer but keeps its name
    const display = tech === 'LED' ? (/4k|uhd/i.test(t) ? '4K LED' : 'HD LED') : tech === 'Mini LED' ? 'Mini LED' : `4K ${tech}`;
    const bestFor = /(1[24]4|120)\s*hz|gaming|game/i.test(t) ? 'Gaming' : spec.tech === 'OLED' ? 'Movie nights' : spec.tech === 'Mini LED' ? 'Bright rooms' : spec.size >= 75 ? 'Big screen' : 'Everyday';
    return { brand, tint: b.tint, logo: b.logo, box: TBOX, src: `${NOON}${p.img}.jpg?width=400`,
      name: `${spec.size}" ${tech === 'LED' ? 'Smart TV' : `${tech} TV`}`, now: Number(p.price).toLocaleString('en-US'),
      note: `${pct}% match`, match: true, specs: [bestFor, `${spec.size}"`, display, p.rating ? p.rating.toFixed(1) : 'New'] };
  }
  function startAsk() {
    box.classList.add('is-asking'); answers = {}; page = null; busy = false;
    cards.forEach((c) => { c.style.opacity = 0; });
    hTitle.textContent = 'Find your TV';
    fills.forEach((f) => f.classList.remove('is-done', 'is-cur'));
    [qBar, stage, foot].forEach((el) => { el.getAnimations().forEach((a) => a.cancel()); el.style.opacity = ''; el.style.transform = ''; });
    qBack.style.opacity = 0; qBack.disabled = true; qSkip.style.opacity = 1; qSkip.disabled = false; qNext.textContent = 'Next';
    show(0, 0);
  }
  /* "Personalizing for you" — a calm, focused beat (no logo, no coloured glow, no model picked):
       · the whole picker fades away; one TV rises in, built from the answers — drawn at the size
         chosen, its screen showing the chosen picture type (drifting slowly, a soft light sweeping
         the glass), on a neutral floor shadow
       · under it the title, the three answers as one quiet line, a single status line that steps
         "Matching your budget" → "Checking 48 TVs" → "Ranking the best picks" over a thin progress
         line, ending on "Found your best matches" with a check drawing in
       · then it lifts away as the rail rises in with the picks (one crossfade)                  */
  const PZ = { STEPS: [0, 680, 1360], FILL_MS: 2000, FOUND_AT: 2060, DONE_AT: 2700 };
  const CHECK = '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="8" fill="#0f8857"/><path class="pz__ck" d="M4.6 8.3l2.2 2.2 4.6-4.8" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  function personalize() {
    const d = { answers, at: PZ.DONE_AT + 260 };
    plp.dispatchEvent(new CustomEvent('plp:personal', { detail: d }));   // the grid starts shimmering now
    CARDS = (d.best || []).map(pickCard); personal = true;
    const said = count.textContent;   // pager.reset() writes "1 of 6"; keep the picker's count until the picks arrive
    buildTrack(); pager.reset(); count.textContent = said; cards.forEach((c) => { c.style.opacity = 0; });   // the matches wait, hidden, behind the picker
    fills.forEach((f) => { f.classList.add('is-done'); f.classList.remove('is-cur'); });
    [qBar, stage, foot].forEach((el) => fadeEl(el, 0, 220));
    // the TV from the answers: its width from the size answer, its screen from the picture answer
    const kSize = QUESTIONS[1].opts[answers.sizeK != null ? answers.sizeK : 1][3];
    const W = Math.round(128 + 76 * (kSize - 0.56) / 0.44), H = Math.round(W * 0.615);
    const scr = QUESTIONS[2].opts[answers.techK != null ? answers.techK : 0][3][0];
    const total = d.total || 48;
    const msgs = ['Matching your budget', `Checking ${total} TVs`, 'Ranking the best picks'];
    const perso = node(`<div class="pz">
      <div class="pz__stagearea"><div class="pz__tv" style="width:${W}px;height:${H}px">
        <img src="../assets/tv/qled65.webp" width="${W}" height="${H}" alt="" />
        <span class="pz__scr" style="left:${SCREEN.l}%;top:${SCREEN.t}%;width:${SCREEN.w}%;height:${SCREEN.h}%"><b style="background-image:url(../assets/tv/screen-${scr}.webp)"></b><i class="pz__sweep"></i></span>
      </div></div>
      <p class="pz__title">Personalizing for you</p>
      <p class="pz__sum">${QUESTIONS.map((Q) => `<span>${answers[Q.key + 'Label']}</span>`).join('<i>·</i>')}</p>
      <div class="pz__status"><span class="pz__msg">${msgs[0]}</span></div>
      <div class="pz__bar"><i></i></div>
    </div>`);
    ask.appendChild(perso);
    const tv = perso.querySelector('.pz__tv'), title = perso.querySelector('.pz__title'), sum = perso.querySelector('.pz__sum');
    const status = perso.querySelector('.pz__status'), barEl = perso.querySelector('.pz__bar'), barFill = barEl.firstElementChild;
    // in: the TV rises on a soft spring, the copy follows 80ms apart
    PP.commit(tv, [springAnim(tv, 0, 1, (q) => ({ transform: `translateY(${(18 * (1 - q)).toFixed(2)}px) scale(${(0.94 + 0.06 * q).toFixed(4)})` }), spr(0.6, 1), 140),
      tv.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 420, delay: 140, easing: EASE_OUT, fill: 'both' })], { opacity: 1, transform: '' });
    [title, sum, status, barEl].forEach((el, k) => PP.commit(el, [el.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 420, delay: 240 + k * 80, easing: EASE_OUT, fill: 'both' })], { opacity: 1, transform: '' }));
    // the progress line fills over the whole beat (ease in-out); the status steps through its lines
    PP.commit(barFill, [barFill.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: PZ.FILL_MS, delay: 320, easing: 'cubic-bezier(.45,0,.25,1)', fill: 'both' })], { transform: 'scaleX(1)' });
    const say = (html, cls = '') => {
      const old = status.querySelector('.pz__msg:not(.is-out)');
      const m = node(`<span class="pz__msg ${cls}">${html}</span>`); status.appendChild(m);
      if (old) { old.classList.add('is-out'); PP.commit(old, [old.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-6px)' }], { duration: 220, easing: OUT, fill: 'both' })], { opacity: 0 }).then(() => old.remove()); }
      PP.commit(m, [m.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 320, delay: 70, easing: EASE_OUT, fill: 'both' })], { opacity: 1, transform: '' });
      return m;
    };
    PZ.STEPS.slice(1).forEach((at, k) => later(320 + at, () => say(msgs[k + 1])));
    later(320 + PZ.FOUND_AT - 320, () => {
      Haptics.success();
      const m = say(`${CHECK}<span>Found your best matches</span>`, 'is-found');
      const ck = m.querySelector('.pz__ck'), L = ck.getTotalLength ? ck.getTotalLength() : 12;
      ck.style.strokeDasharray = L; ck.style.strokeDashoffset = L;
      PP.commit(ck, [ck.animate([{ strokeDashoffset: L }, { strokeDashoffset: 0 }], { duration: 360, delay: 160, easing: EASE_OUT, fill: 'both' })], { strokeDashoffset: 0 });
      PP.commit(barEl, [barEl.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260, delay: 120, easing: OUT, fill: 'both' })], { opacity: 0 });
    });
    later(PZ.DONE_AT, () => {
      // hand-off as one crossfade: the beat lifts away while the header and the rail come in beneath it
      box.classList.add('is-handoff'); box.classList.remove('is-asking');
      PP.commit(perso, [perso.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-10px)' }], { duration: 300, easing: OUT, fill: 'both' })], { opacity: 0 });
      hTitle.textContent = 'Your TV picks'; count.textContent = `1 of ${cards.length}`;
      PP.commit(hTitle, [fadeTo(hTitle, 0, 1, 300, 100, OUT, [{ transform: 'translateY(4px)' }, { transform: 'none' }])], { opacity: 1, transform: '' });
      PP.commit(count, [fadeTo(count, 0, 1, 300, 160, OUT)], { opacity: 1 });
      cardsIn(110);
      later(340, () => box.classList.remove('is-handoff'));
      later(620, () => { perso.remove(); if (page) { page.remove(); page = null; } });
    });
  }
  function resetAsk() {
    ask.getAnimations({ subtree: true }).forEach((x) => x.cancel());
    if (slider) { slider.stop(); slider = null; }
    stage.innerHTML = ''; page = null; busy = false;
    ask.querySelectorAll('.pz').forEach((x) => x.remove());
    box.classList.remove('is-asking', 'is-handoff');
    if (personal) { personal = false; CARDS = CAT[catKey].cards; buildTrack(); }
    hTitle.textContent = CAT[catKey].title;
  }
  const fixed = [box, bar, head, hTitle, count, sCoin, sTitle, sSub, clear];
  function reset() {
    timers.forEach(clearTimeout); timers = []; running = false; mode = 'panel';
    resetAsk();
    const all = [...fixed, ...cards, sMark];
    all.forEach((el) => el.getAnimations().forEach((a) => a.cancel()));
    all.forEach((el) => { el.style.opacity = ''; el.style.transform = ''; el.style.filter = ''; el.style.transformOrigin = ''; });
    box.style.height = '0px'; bar.style.height = '';
    grid.getAnimations().forEach((a) => a.cancel()); grid.style.transform = '';
    box.classList.remove('is-selected'); sel.setAttribute('aria-hidden', 'true');
    bar.style.opacity = 0; head.style.opacity = 0;
    pager.reset();
  }

  function reveal() {
    running = true;
    // grid edge: the box grows 0 → H and the grid below rides on it
    pushGrid(0, H, (el, a, b, fmt) => PP.spring(el, a, b, fmt));
    // the panel: scale + rise on one spring progress, plus the fade
    const card = PP.spring(bar, 0, 1, (p) => ({ transform: `translateY(${((1 - p) * REVEAL.CARD_RISE).toFixed(3)}px) scale(${(REVEAL.CARD_SCALE + (1 - REVEAL.CARD_SCALE) * p).toFixed(4)})` }));
    PP.commit(bar, [card, revealFade(bar, REVEAL.CARD_FADE_AT)], { opacity: 1, transform: '' });
    // the header, 33ms behind (its fade 50ms)
    PP.commit(head, [PP.moveY(head, REVEAL.HEAD_RISE, 0, { delay: REVEAL.HEAD_AT }), revealFade(head, REVEAL.HEAD_FADE_AT)], { opacity: 1, transform: '' });
    later(200, () => Haptics.soft());   // the panel settling into place under the grid
    if (catKey === 'tv' && !personal) startAsk(); else cardsIn(80);   // TVs ask first
  }
  // cards rise in, staggered; only the first few are on screen, the rest just land
  function cardsIn(base) {
    cards.forEach((c, i) => {
      if (i > 2) { c.style.opacity = 1; return; }   // off-screen: just in place, no blur to raster
      const delay = base + i * 40;
      const rise = springAnim(c, 0, 1, (p) => ({ transform: `translateY(${(16 * (1 - p)).toFixed(2)}px) scale(${(0.97 + 0.03 * p).toFixed(4)})` }), CARD_SPR, delay);
      const fade = c.animate(IS_ANDROID ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 0, filter: 'blur(4px)' }, { opacity: 1, filter: 'blur(0px)' }], { duration: 340, delay, easing: OUT, fill: 'both' });
      PP.commit(c, [rise, fade], { opacity: 1, transform: '', filter: '' });
    });
  }

  /* ── Select a brand: panel → 60px "Apple selected" bar (State 13 1226:146640) ──
     Apple-style shared-element morph, smooth but snappy (no visible bounce):
       · panel 450 → 60 and box 459 → 75 (products land at Figma y 231) on one
         spring (response 0.44s, ζ 0.94); the grid rides up under it
       · the brand coin pops up in place at +150ms with an elastic overshoot
         (scale 0 → 1, response 0.42s, ζ 0.52), its mark popping 60ms later
       · "Shop phones by brand" glides and shrinks into the "Apple selected"
         slot (x +44, y −2.5, 17 → 14px) while the two crossfade
       · cards dissolve: the tapped one shrinks toward the coin, the rest sink
         and fade; "1 of 14" goes first
       · "Showing all Apple phones" rises in at +140ms, "Clear" slides in at +180ms
     The product grid swaps to the brand's list at the same moment (skeleton
     shimmer → staggered reveal, see the PLP's swapTo). Clear plays it back.  */
  const H_SEL = 75, BAR = 450, BAR_SEL = 60;   // 2 + 60 + 15 gap − 2
  const MORPH = spr(0.44, 0.94);
  const IO = 'cubic-bezier(.45,0,.55,1)';
  const TITLE_DX = 58 - 14, TITLE_DY = 13.5 - 16, TITLE_K = 14 / 17;
  let mode = 'panel', picked = 0;
  const fadeTo = (el, from, to, ms, delay = 0, easing = OUT, extra) =>
    el.animate([{ opacity: from, ...(extra && extra[0]) }, { opacity: to, ...(extra && extra[1]) }], { duration: ms, delay, easing, fill: 'both' });
  const rel = (el) => { const a = el.getBoundingClientRect(), b = bar.getBoundingClientRect(); return { x: a.left - b.left, y: a.top - b.top, w: a.width, h: a.height }; };
  const onScreen = (i) => { const r = rel(slots[i]); return r.x < 343 && r.x + r.w > 0; };
  // coin pop: SwiftUI-style bouncy spring (response 0.42s, ζ 0.52 → ~15% overshoot), once the panel is mostly closed
  const POP = spr(0.42, 0.52), POP_AT = 150;

  function collapse(i) {
    if (mode !== 'panel') return;
    mode = 'busy'; picked = i;
    const brand = CARDS[i].brand;
    sTitle.textContent = `${brand} selected`; sSub.textContent = `Showing all ${brand} ${CAT[catKey].noun}`;
    sCoin.innerHTML = coinMark(CARDS[i]); sMark = sCoin.firstElementChild;
    plp.dispatchEvent(new CustomEvent('plp:filter', { detail: { brand } }));
    const done = [];
    // growth → shrink: panel and the grid under it, one spring
    done.push(pushGrid(H, H_SEL, (el, a, b, fmt) => springAnim(el, a, b, fmt, MORPH)));
    done.push(PP.commit(bar, [springAnim(bar, BAR, BAR_SEL, (v) => ({ height: `${(+v).toFixed(2)}px` }), MORPH)], { height: BAR_SEL + 'px' }));
    // title: header → selected slot, crossfading
    PP.commit(hTitle, [springAnim(hTitle, 0, 1, (p) => ({ transform: `translate(${(TITLE_DX * p).toFixed(2)}px,${(TITLE_DY * p).toFixed(2)}px) scale(${(1 + (TITLE_K - 1) * p).toFixed(4)})` }), MORPH), fadeTo(hTitle, 1, 0, 160, 0, IO)], { opacity: 0 });
    PP.commit(sTitle, [springAnim(sTitle, 0, 1, (p) => ({ transform: `translate(${(-TITLE_DX * (1 - p)).toFixed(2)}px,${(-TITLE_DY * (1 - p)).toFixed(2)}px) scale(${(1 / TITLE_K + (1 - 1 / TITLE_K) * p).toFixed(4)})` }), MORPH), fadeTo(sTitle, 0, 1, 200, 50, IO)], { opacity: 1, transform: '' });
    PP.commit(count, [fadeTo(count, 1, 0, 120, 0, OUT)], { opacity: 0 });
    // the coin pops up in place with an elastic overshoot; its mark pops a beat later
    PP.commit(sCoin, [springAnim(sCoin, 0, 1, (p) => ({ transform: `scale(${Math.max(0, p).toFixed(4)})` }), POP, POP_AT), fadeTo(sCoin, 0, 1, 90, POP_AT, OUT)], { opacity: 1, transform: '' });
    PP.commit(sMark, [springAnim(sMark, 0, 1, (p) => ({ transform: `scale(${Math.max(0, p).toFixed(4)})` }), POP, POP_AT + 60)], { transform: '' });
    later(POP_AT + 150, () => Haptics.pop());   // with the coin's overshoot peak
    // cards dissolve
    cards.forEach((c, k) => {
      if (!onScreen(k)) { c.style.opacity = 0; return; }
      if (k === i) {
        c.style.transformOrigin = '0% 0%';
        PP.commit(c, [fadeTo(c, 1, 0, 220, 30, OUT, [{ transform: 'none' }, { transform: 'scale(.92)' }])], { opacity: 0 });
      } else {
        PP.commit(c, [fadeTo(c, 1, 0, 170, 0, OUT, [{ transform: 'none' }, { transform: 'translateY(10px) scale(.96)' }])], { opacity: 0 });
      }
    });
    // the selected bar's copy and action
    PP.commit(sSub, [fadeTo(sSub, 0, 1, 260, 140, OUT, [{ transform: 'translateY(4px)' }, { transform: 'none' }])], { opacity: 1, transform: '' });
    PP.commit(clear, [fadeTo(clear, 0, 1, 260, 180, OUT, [{ transform: 'translateX(6px)' }, { transform: 'none' }])], { opacity: 1, transform: '' });
    box.classList.add('is-selected'); sel.removeAttribute('aria-hidden');
    Promise.all(done).then(() => { if (mode === 'busy') mode = 'sel'; });
  }

  function expand() {
    if (mode !== 'sel') return;
    mode = 'busy';
    plp.dispatchEvent(new CustomEvent('plp:filter', { detail: { brand: null } }));
    box.classList.remove('is-selected'); sel.setAttribute('aria-hidden', 'true');
    const done = [];
    done.push(pushGrid(H_SEL, H, (el, a, b, fmt) => springAnim(el, a, b, fmt, MORPH)));
    done.push(PP.commit(bar, [springAnim(bar, BAR_SEL, BAR, (v) => ({ height: `${(+v).toFixed(2)}px` }), MORPH)], { height: '' }));
    // title: selected slot → header
    PP.commit(sTitle, [springAnim(sTitle, 0, 1, (p) => ({ transform: `translate(${(-TITLE_DX * p).toFixed(2)}px,${(-TITLE_DY * p).toFixed(2)}px) scale(${(1 + (1 / TITLE_K - 1) * p).toFixed(4)})` }), MORPH), fadeTo(sTitle, 1, 0, 160, 0, IO)], { opacity: 0, transform: '' });
    PP.commit(hTitle, [springAnim(hTitle, 0, 1, (p) => ({ transform: `translate(${(TITLE_DX * (1 - p)).toFixed(2)}px,${(TITLE_DY * (1 - p)).toFixed(2)}px) scale(${(TITLE_K + (1 - TITLE_K) * p).toFixed(4)})` }), MORPH), fadeTo(hTitle, 0, 1, 200, 50, IO)], { opacity: 1, transform: '' });
    PP.commit(count, [fadeTo(count, 0, 1, 260, 160, OUT)], { opacity: 1 });
    later(220, () => Haptics.soft());   // the panel reopening
    // the coin shrinks away in place (quick ease-in, no bounce on the way out)
    PP.commit(sCoin, [sCoin.animate([{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(.4)', opacity: 0 }], { duration: 160, easing: 'cubic-bezier(.4,0,1,1)', fill: 'both' })], { opacity: 0, transform: '' });
    PP.commit(sSub, [fadeTo(sSub, 1, 0, 120, 0, OUT)], { opacity: 0 });
    PP.commit(clear, [fadeTo(clear, 1, 0, 120, 0, OUT)], { opacity: 0 });
    // cards rise back in (the picked one first, from where the coin lands)
    let n = 0;
    cards.forEach((c, k) => {
      c.style.transformOrigin = '';
      if (!onScreen(k)) { c.style.opacity = 1; return; }
      const delay = 90 + (n++) * 40;
      const rise = springAnim(c, 0, 1, (p) => ({ transform: `translateY(${(16 * (1 - p)).toFixed(2)}px) scale(${(0.97 + 0.03 * p).toFixed(4)})` }), CARD_SPR, delay);
      const fade = c.animate(IS_ANDROID ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 0, filter: 'blur(4px)' }, { opacity: 1, filter: 'blur(0px)' }], { duration: 340, delay, easing: OUT, fill: 'both' });
      PP.commit(c, [rise, fade], { opacity: 1, transform: '', filter: '' });
    });
    Promise.all(done).then(() => { if (mode === 'busy') mode = 'panel'; });
  }

  track.addEventListener('click', (e) => {
    const b = e.target.closest('.brw__cta'); if (!b) return;
    const i = cards.indexOf(b.closest('.brw__card'));
    if (i < 0 || !LIST_BRANDS.has(CARDS[i].brand)) return;
    collapse(i);
  });
  clear.addEventListener('click', expand);
  // a press on a CTA warms that brand's photos before the tap lands
  track.addEventListener('pointerdown', (e) => { const b = e.target.closest('.brw__cta'); if (b) plp.dispatchEvent(new CustomEvent('plp:warm', { detail: { brand: CARDS[cards.indexOf(b.closest('.brw__card'))].brand } })); });
  plp.addEventListener('plp:landed', () => pager.warm(0));

  // the PLP opened on another category: rebuild the rail and its copy (the page is still hidden)
  plp.addEventListener('plp:category', (e) => {
    const c = e.detail && e.detail.cat; if (!CAT[c] || c === catKey) return;
    catKey = c; CARDS = CAT[c].cards; buildTrack();
    hTitle.textContent = CAT[c].title; box.setAttribute('aria-label', CAT[c].title);
    reset();
  });

  // Trigger: the on-screen product cards have landed (plp:landed), or — as a fallback — the page settled
  const go = () => { if (plp.classList.contains('is-open') && box.style.height === '0px' && !running) { running = true; later(WAIT, reveal); } };
  plp.addEventListener('plp:landed', go);
  new MutationObserver(() => {
    if (plp.classList.contains('is-open') && !plp.classList.contains('is-loading')) go();
    if (!plp.classList.contains('is-open')) reset();
  }).observe(plp, { attributes: true, attributeFilter: ['class'] });
  search.addEventListener('search:closed', reset);
  reset();
})();

/* ══ Haptics — iOS-style feedback for taps ═══════════════════
   Kinds (named after the iOS generators they map to):
     tap     light impact — buttons, links, tabs, chips, cards, suggestions
   Channels, best first (only one plays):
   · a native host — window.webkit.messageHandlers.haptic (Vercel Sim and any
     WKWebView shell) → real UIFeedbackGenerators, during drags too
   · Android / Chrome — the Vibration API (after the first user gesture)
   · iPhone Safari (WebKit 18+, no Vibration API) — toggling a hidden native
     <input type="checkbox" switch> plays the system haptic (taps / gestures). */
const Haptics = (() => {
  /* iOS-style haptics on every device, one channel per pulse:
     1. a native host (window.webkit.messageHandlers.haptic — Vercel Sim's HapticEngine): real UIKit
        generators with intensity, from any event or timer;
     2. Android / Chrome: navigator.vibrate — pulses ≥ 10 ms so cheaper motors still register them
        (once the page has had any user activation);
     3. iPhone Safari (no Vibration API): toggling a hidden <input type="checkbox" switch> plays the system
        tick. WebKit only allows it inside a real activation — a touch *pointerup* / click, not pointerdown
        and not pointermove — or shortly after one, so iOS taps fire on release and drag haptics wait for
        the finger to lift (see gesture()). Stronger kinds are a quick burst of ticks. */
  const iOS = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const native = () => { const h = window.webkit && window.webkit.messageHandlers; return h && h.haptic ? h.haptic : null; };
  const NATIVE = { tick: 'selection', tap: { type: 'light', intensity: 0.9 }, snap: { type: 'medium', intensity: 0.8 }, edge: { type: 'rigid', intensity: 0.7 },
    soft: { type: 'soft', intensity: 0.6 }, pop: { type: 'medium', intensity: 0.85 }, land: { type: 'soft', intensity: 0.5 }, success: 'success' };
  const VIBE = { tick: 10, tap: 12, snap: 18, edge: 16, soft: 14, pop: 22, land: 12, success: [14, 60, 20] };
  const TICKS = { tick: 1, tap: 1, snap: 2, edge: 2, soft: 1, pop: 2, land: 1, success: 2 };   // iOS switch ticks per kind
  let label = null;
  const sw = () => {
    if (label && label.isConnected) return label;
    label = document.createElement('label');
    label.setAttribute('aria-hidden', 'true');
    label.style.cssText = 'position:fixed;left:-100px;top:0;width:1px;height:1px;opacity:0;overflow:hidden;pointer-events:none';
    const input = document.createElement('input');
    input.type = 'checkbox'; input.setAttribute('switch', ''); input.tabIndex = -1;
    label.appendChild(input); document.body.appendChild(label);
    return label;
  };
  const iosTicks = (n) => { sw().click(); for (let k = 1; k < n; k++) setTimeout(() => sw().click(), k * 45); };
  // two pulses inside ~40ms read as one blurred bump (and native hosts merge them): a tick is dropped,
  // anything stronger waits until the gap has passed (≤40ms — still reads as the same moment)
  const GAP = 40;
  let lastAt = -1e9, held = 0;
  function fire(kind) {
    const now = performance.now(), since = now - lastAt;
    if (since < GAP) {
      if (kind === 'tick') return;
      clearTimeout(held); held = setTimeout(() => fire(kind), GAP - since + 1); return;
    }
    lastAt = now;
    try {
      const n = native();
      if (n) { n.postMessage(NATIVE[kind] || 'light'); return; }
      if (navigator.vibrate) {
        if (!navigator.userActivation || navigator.userActivation.hasBeenActive) navigator.vibrate(VIBE[kind] || 12);
        return;
      }
      if (iOS) iosTicks(TICKS[kind] || 1);
    } catch (_) {}
  }
  /* Haptics raised in the middle of a drag (a rail page change, the rubber band at an end): native hosts and
     Android play them right away; iPhone Safari can't (pointermove isn't an activation), so the strongest one
     is held and played the moment the finger lifts. */
  const RANK = { tick: 1, tap: 2, land: 2, soft: 3, edge: 4, snap: 4, pop: 5, success: 6 };
  let queued = null;
  const deferIOS = () => iOS && !native() && !navigator.vibrate;
  function gesture(kind) {
    if (!deferIOS()) { fire(kind); return; }
    if (!queued || RANK[kind] > RANK[queued]) queued = kind;
  }
  // flushed one task after the lift, so haptics the release itself raises (the rail settling on a new page) are
  // included — still well inside WebKit's activation window
  addEventListener('pointerup', () => setTimeout(() => { if (queued) { const k = queued; queued = null; fire(k); } }, 0), { capture: true, passive: true });
  addEventListener('pointercancel', () => { queued = null; }, { capture: true, passive: true });

  const api = { tick: () => fire('tick'), snap: () => fire('snap'), edge: () => fire('edge'), tap: () => fire('tap'), success: () => fire('success'),
    soft: () => fire('soft'),   // a panel arriving or reopening (UIImpactFeedbackGenerator .soft)
    pop: () => fire('pop'),     // the selected brand's coin popping in (.medium)
    land: () => fire('land'),   // a new list of products landing (.soft)
    gesture };                  // a haptic raised mid-drag (held for the finger lifting on iPhone Safari)

  // taps on interactive elements: a light impact, once per press — on press where the platform allows it,
  // on release on iPhone Safari (its only activation) and inside draggable rails (so a swipe never buzzes)
  const TAP = 'button, a[href], [role="button"], [role="tab"], .sug, .chip, .tab, .pcard, #searchEntry, .vswitch__b, '
            + '.bnav__it, .mp, .bc, .cat, .hw__card, .hw__l, .addr__wish, .search__cam, .vid';
  const RAIL = '.brw__rail, .hscroll';
  let pressed = null;
  addEventListener('pointerdown', (e) => {
    const t = e.target.closest && e.target.closest(TAP);
    if (!t || t.closest('[aria-disabled="true"], :disabled')) { pressed = null; return; }
    if (t.closest(RAIL) || deferIOS()) { pressed = { t, x: e.clientX, y: e.clientY }; return; }
    pressed = null; api.tap();
  }, { capture: true, passive: true });
  addEventListener('pointerup', (e) => {
    if (!pressed) return;
    const p = pressed; pressed = null;
    if (Math.hypot(e.clientX - p.x, e.clientY - p.y) < 6) api.tap();
  }, { capture: true, passive: true });
  return api;
})();

/* ══ Warm the image decoder ════════════════════════════════════════════════
   Images inside hidden or off-screen layers (the PLP cards, below-the-fold
   Home rows)
   are fetched but only decoded on first paint — which lands mid-animation as
   a 100–250ms hitch. Decode everything up front, once the page is idle.     */
(() => {
  const warm = () => document.querySelectorAll('img').forEach((img) => {
    if (img.decode) img.decode().catch(() => {});
  });
  const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 200));
  if (document.readyState === 'complete') idle(warm); else addEventListener('load', () => idle(warm), { once: true });
})();

/* ══ Prototype tools ═══════════════════════════════════════════════════════
   Beside the phone: iterations 1–4, then Reset. Each iteration is its OWN copy of
   the flow, so they can be changed independently: 1 = / (this folder), 2 = /v2/, 3 = /v3/, 4 = /v4/,
   each with its own index.html, styles.css and app.js, sharing /assets and /fonts.
   The page's iteration is <html data-variant="n">; picking another number opens
   that copy, and /?v=n jumps straight to iteration n. Reset restarts the flow on
   the same iteration (a clean reload back to Home). */
(() => {
  const nav = document.getElementById('vswitch'); if (!nav) return;
  const PATHS = { 1: '/', 2: '/v2/', 3: '/v3/', 4: '/v4/', 5: '/v5/', 6: '/v6/', 7: '/v7/', 8: '/v8/', 9: '/v9/', 10: '/v10/', 11: '/v11/', 12: '/v12/', 13: '/v13/', 14: '/v14/' };
  const here = document.documentElement.dataset.variant || '1';
  const want = new URLSearchParams(location.search).get('v');
  if (want && PATHS[want] && want !== here) { location.replace(PATHS[want]); return; }
  nav.querySelectorAll('.vswitch__b[data-v]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.dataset.v === here));
    btn.addEventListener('click', () => { if (btn.dataset.v !== here) location.href = PATHS[btn.dataset.v]; });
  });
  const reset = document.getElementById('vreset');
  if (reset) reset.addEventListener('click', () => {
    reset.classList.add('is-spinning');
    setTimeout(() => location.replace(PATHS[here] || '/'), 260);   // let the icon turn before the page restarts
  });
})();

