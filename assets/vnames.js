/* Iteration switcher (prototype tool), shared by every page: the iterations grouped into cards —
   3 tier, Guide, Garmin, Compare — each row a display number (1, 2, 3… in this order, not the folder number) and
   a short name. The pages keep their own folders (/v8/, /v11/…); only what the rail shows changes. Iterations
   left out of GROUPS are off the rail, but a hidden page still shows its own row (under "Other") so you know
   where you are. The rail grows to the left, away from the phone. */
(() => {
  const GROUPS = [
    // [card, search to type in the prototype to reach it, rows]
    ['3 tier', 'tv', [[8, '3 tier filter'], [18, 'Progressive filters']]],
    ['Guide', 'tv', [[9, '3 tier to guide']]],
    ['Garmin', 'garmin', [[11, 'Garmin vertical'], [19, 'Garmin layers']]],
    ['Compare', 'tv', [[13, 'Compare'], [14, 'Compare dock'], [15, 'Compare mode']]],
    // Ayush's own branch (aykapoor-hub/Brand-Widget-PLP v6-find-your-tv): his v11, v12, v13 → our v20, v21, v22
    ['Ayush', 'samsung tv', [[20, 'Find your TV'], [21, 'Picker + compare'], [22, 'Answers fold to pills']]],
  ];
  const OTHER = { 1: 'Brand widget', 2: 'Brand cards', 3: 'TV brands', 4: 'TV ask-first', 5: 'TV pills', 6: 'TV storyboard',
    7: 'Size pill', 10: 'Help me choose', 12: 'Calm Guide', 16: 'Personalise', 17: 'Progressive 3 tier' };
  const nav = document.getElementById('vswitch'); if (!nav) return;
  const css = document.createElement('style');
  css.textContent = `
    .vswitch { gap: 10px; padding: 0; background: none; box-shadow: none; border-radius: 0; align-items: stretch; overflow: visible; max-height: none; }
    .vswitch__g { display: flex; flex-direction: column; gap: 4px; padding: 8px 6px 6px; background: #fff; border-radius: 20px;
      box-shadow: 0 4px 18px rgba(20, 24, 40, .08), 0 1px 3px rgba(20, 24, 40, .06); }
    .vswitch__q { display: block; margin-top: 3px; font-size: 11px; font-weight: 500; letter-spacing: 0; text-transform: none; color: #8a91a8; }
    .vswitch__q b { font-weight: 700; color: #1d2539; }
    .vswitch__h { padding: 0 8px 4px; font-size: 10.5px; font-weight: 700; letter-spacing: .5px; text-transform: uppercase; color: #8a91a8; }
    .vswitch__b[data-v] { width: auto; min-width: 34px; height: 32px; display: flex; align-items: center; justify-content: flex-start; gap: 6px; padding: 0 12px 0 0; border-radius: 16px; }
    .vswitch__num { flex: none; width: 32px; text-align: center; font-size: 14px; }
    .vswitch__name { font-size: 12.5px; font-weight: 600; letter-spacing: -0.1px; white-space: nowrap; opacity: .72; }
    .vswitch__b[aria-pressed="true"] .vswitch__name { opacity: 1; }
    .vswitch__g--tools { flex-direction: row; justify-content: center; padding: 6px; }
    .vswitch__sep { display: none; }`;
  document.head.appendChild(css);
  const btns = new Map([...nav.querySelectorAll('.vswitch__b[data-v]')].map((b) => [+b.dataset.v, b]));
  const reset = nav.querySelector('.vswitch__reset');
  const row = (v, name, n) => {
    const b = btns.get(v); if (!b) return null;
    b.innerHTML = `<span class="vswitch__num">${n}</span><span class="vswitch__name">${name}</span>`;
    b.setAttribute('aria-label', `${name} (iteration ${v})`);
    b.title = `/v${v}/`;
    return b;
  };
  const card = (title, rows, q) => {
    const g = document.createElement('div'); g.className = 'vswitch__g'; g.setAttribute('role', 'group'); g.setAttribute('aria-label', title);
    g.innerHTML = `<span class="vswitch__h">${title}${q ? `<span class="vswitch__q">Search query = <b>${q}</b></span>` : ''}</span>`;
    rows.forEach((b) => b && g.appendChild(b));
    return g;
  };
  let n = 0;
  const cards = GROUPS.map(([title, q, items]) => card(title, items.map(([v, name]) => row(v, name, ++n)), q));
  const here = [...btns.values()].find((b) => b.getAttribute('aria-pressed') === 'true');
  const shown = new Set(GROUPS.flatMap(([, , items]) => items.map(([v]) => v)));
  if (here && !shown.has(+here.dataset.v)) { const v = +here.dataset.v; cards.push(card('Other', [row(v, OTHER[v] || `Iteration ${v}`, v)])); }
  nav.replaceChildren(...cards);
  if (reset) { const t = document.createElement('div'); t.className = 'vswitch__g vswitch__g--tools'; t.appendChild(reset); nav.appendChild(t); }
})();
