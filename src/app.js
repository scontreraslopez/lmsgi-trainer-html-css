(() => {
'use strict';
const EX = window.EXERCISES;
const BLOCKS = window.BLOCKS;
const BASE = 'html{font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:#1e293b;background:#fff}';
const STORE_KEY = 'lmsgi-trainer-html-css-v1';
const $ = (id) => document.getElementById(id);

/* ---------- almacenamiento local (opcional) ---------- */
let store = { done: {}, code: {} };
try { const raw = localStorage.getItem(STORE_KEY); if (raw) store = Object.assign(store, JSON.parse(raw)); } catch (e) {}
let canStore = false;
try { localStorage.setItem('__lmsgi_t', '1'); localStorage.removeItem('__lmsgi_t'); canStore = true; } catch (e) {}
function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) {} }

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const stripCss = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '');
const stripHtml = (s) => s.replace(/<!--[\s\S]*?-->/g, '');

// frame-src 'none': los <iframe> del alumno (YouTube, Maps…) no se cargan; se corrige el código, no el vídeo.
function buildDoc(html, css) {
  return '<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="frame-src \'none\'"><base target="_blank"><style>' + BASE +
    '</style><style>' + css + '</style></head><body>' + html + '</body></html>';
}
function userParts(ex, code) { return ex.edit === 'html' ? { html: code, css: ex.css } : { html: ex.html, css: code }; }
function solParts(ex) { return ex.edit === 'html' ? { html: ex.sol, css: ex.css } : { html: ex.html, css: ex.sol }; }
const starter = (ex) => ex.edit === 'html' ? ex.html : ex.css;
const fixedCode = (ex) => ex.edit === 'html' ? ex.css : ex.html;

/* ---------- iframes de comprobación (fuera de pantalla) ---------- */
const probes = {};
function renderProbe(key, w, h, doc) {
  let f = probes[key];
  if (!f) {
    f = document.createElement('iframe');
    f.setAttribute('sandbox', 'allow-same-origin');
    f.setAttribute('tabindex', '-1');
    f.title = 'probe';
    $('probe').appendChild(f);
    probes[key] = f;
  }
  f.style.cssText = 'border:0;width:' + w + 'px;height:' + h + 'px;position:absolute;left:0;top:0';
  if (f._doc === doc && f._ready) return Promise.resolve(f);
  return new Promise((res) => {
    f._ready = false;
    f.onload = () => { f._ready = true; res(f); };
    f._doc = doc;
    f.srcdoc = doc;
  });
}

function H(doc) {
  const win = doc.defaultView;
  return {
    doc,
    q: (s) => doc.querySelector(s),
    qa: (s) => Array.from(doc.querySelectorAll(s)),
    css: (el, p, pseudo) => win.getComputedStyle(el, pseudo || null).getPropertyValue(p).trim(),
    rect: (el) => { const r = el.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; }
  };
}

/* Simula :hover / :focus / :active sin ratón: duplica cada regla que use la pseudoclase
   cambiándola por una clase (misma especificidad, justo detrás de la original) y pone esa clase
   al elemento (y a sus antepasados en :hover, como pasa de verdad). Devuelve la función que lo deshace. */
const STATES = { ':hover': /:hover(?![\w-])/g, ':focus': /:focus(?:-visible)?(?![\w-])/g, ':active': /:active(?![\w-])/g };
function forceState(Hh, el, state) {
  const doc = Hh.doc, re = STATES[state], cls = '__st-' + state.slice(1);
  const added = [];
  const walk = (parent) => {
    const rules = parent.cssRules;
    for (let i = rules.length - 1; i >= 0; i--) {
      const r = rules[i];
      if (r.selectorText != null) {
        re.lastIndex = 0;
        if (!re.test(r.selectorText)) continue;
        re.lastIndex = 0;
        try { parent.insertRule(r.selectorText.replace(re, '.' + cls) + '{' + r.style.cssText + '}', i + 1); added.push([parent, parent.cssRules[i + 1]]); } catch (e) {}
      } else if (r.cssRules) walk(r);
    }
  };
  const sheets = Array.from(doc.styleSheets);
  const first = sheets[0];
  // sin transiciones mientras dura la simulación: si no, getComputedStyle devuelve el valor inicial
  first.insertRule('*,*::before,*::after{transition:none!important;animation:none!important}', first.cssRules.length);
  const kill = first.cssRules[first.cssRules.length - 1];
  sheets.forEach((s) => { try { walk(s); } catch (e) {} });
  const targets = [];
  for (let n = el; n && n.nodeType === 1; n = state === ':hover' ? n.parentElement : null) targets.push([n, n.hasAttribute('class')]);
  targets.forEach(([n]) => n.classList.add(cls));
  return () => {
    targets.forEach(([n, had]) => { n.classList.remove(cls); if (!had && !n.classList.length) n.removeAttribute('class'); });
    doc.defaultView.getComputedStyle(el).color; // aplica la vuelta al estado normal con las transiciones aún desactivadas
    const del = (p, rule) => { const i = Array.prototype.indexOf.call(p.cssRules, rule); if (i >= 0) p.deleteRule(i); };
    added.forEach(([p, rule]) => del(p, rule));
    del(first, kill);
  };
}

const EXPAND = {
  padding: ['padding-top', 'padding-right', 'padding-bottom', 'padding-left'],
  margin: ['margin-top', 'margin-right', 'margin-bottom', 'margin-left'],
  'border-radius': ['border-top-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius'],
  'border-width': ['border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width'],
  border: ['border-top-width', 'border-top-style', 'border-top-color', 'border-right-width', 'border-bottom-width', 'border-left-width'],
  gap: ['row-gap', 'column-gap']
};
const r0 = (n) => Math.round(n);
const fmtRect = (r) => r0(r.w) + '×' + r0(r.h) + ' en (' + r0(r.x) + ', ' + r0(r.y) + ')';

function evalCheck(c, U, S, src) {
  if (c.exists) {
    const n = U.qa(c.exists).length;
    return { ok: n > 0, msg: 'No encuentro ' + c.exists };
  }
  if (c.count) {
    const [sel, n] = c.count; const k = U.qa(sel).length;
    return { ok: k === n, msg: 'Hay ' + k + ' que cumplen «' + sel + '»; se esperan ' + n };
  }
  if (c.min) {
    const [sel, n] = c.min; const k = U.qa(sel).length;
    return { ok: k >= n, msg: 'Hay ' + k + ' que cumplen «' + sel + '»; se esperan al menos ' + n };
  }
  if (c.none) {
    const k = U.qa(c.none).length;
    return { ok: k === 0, msg: 'Sobran ' + k + ' elemento(s) «' + c.none + '»' };
  }
  if (c.attr) {
    const [sel, a] = c.attr; const els = U.qa(sel);
    const bad = els.filter((e) => (e.getAttribute(a) || '').trim() === '');
    return { ok: els.length > 0 && bad.length === 0, msg: els.length ? bad.length + ' «' + sel + '» sin atributo ' + a : 'No encuentro ' + sel };
  }
  if (c.labels) {
    const els = U.qa('input:not([type=hidden]):not([type=submit]):not([type=button]):not([type=reset]), select, textarea');
    const bad = els.filter((e) => !e.labels || e.labels.length === 0);
    return { ok: els.length > 0 && bad.length === 0, msg: els.length ? bad.length + ' campo(s) sin <label> asociado' : 'No hay campos de formulario' };
  }
  if (c.css) {
    const [sel, props] = c.css;
    const ue = U.qa(sel), se = S.qa(sel);
    if (!ue.length) return { ok: false, msg: 'No encuentro ' + sel };
    if (ue.length !== se.length) return { ok: false, msg: 'Hay ' + ue.length + ' «' + sel + '», se esperan ' + se.length };
    const list = props.flatMap((p) => EXPAND[p] || [p]);
    const diffs = []; const detail = [];
    se.forEach((s, i) => {
      const undo = c.state ? [forceState(U, ue[i], c.state), forceState(S, s, c.state)] : [];
      try {
        list.forEach((p) => {
          const a = U.css(ue[i], p, c.pseudo), b = S.css(s, p, c.pseudo);
          if (a !== b && !diffs.includes(p)) { diffs.push(p); detail.push(p + ': tienes ' + a + ' · objetivo ' + b); }
        });
      } finally { undo.forEach((f) => f()); }
    });
    const where = (c.state ? 'Con ' + c.state + ': ' : '') + (c.pseudo ? 'En ' + c.pseudo + ': ' : '');
    return { ok: diffs.length === 0, msg: (where ? where + 'revisa ' : 'Revisa ') + diffs.join(', '), detail: detail.join('\n') };
  }
  if (c.rect) {
    const sel = c.rect, tol = c.tol ?? 2;
    const ue = U.qa(sel), se = S.qa(sel);
    if (!ue.length) return { ok: false, msg: 'No encuentro ' + sel };
    if (ue.length !== se.length) return { ok: false, msg: 'Hay ' + ue.length + ' «' + sel + '», se esperan ' + se.length };
    for (let i = 0; i < se.length; i++) {
      const a = U.rect(ue[i]), b = S.rect(se[i]);
      if (Math.abs(a.x - b.x) > tol || Math.abs(a.y - b.y) > tol || Math.abs(a.w - b.w) > tol || Math.abs(a.h - b.h) > tol) {
        const which = se.length > 1 ? ' nº' + (i + 1) : '';
        return { ok: false, msg: sel + which + ': ' + fmtRect(a) + ' · objetivo ' + fmtRect(b) };
      }
    }
    return { ok: true };
  }
  if (c.src) { const [w, re] = c.src; return { ok: re.test(src[w]), msg: c.msg || 'No aparece en tu código' }; }
  if (c.nosrc) { const [w, re] = c.nosrc; return { ok: !re.test(src[w]), msg: c.msg || 'Hay algo en tu código que no debería estar' }; }
  if (c.js) {
    const r = c.js(U, S, src);
    if (r === true) return { ok: true };
    return { ok: false, msg: typeof r === 'string' ? r : (c.msg || 'Todavía no') };
  }
  return { ok: false, msg: 'Comprobación mal definida' };
}

function iou(a, b) {
  const x1 = Math.max(a.x, b.x), y1 = Math.max(a.y, b.y);
  const x2 = Math.min(a.x + a.w, b.x + b.w), y2 = Math.min(a.y + a.h, b.y + b.h);
  const inter = Math.max(0, x2 - x1) * Math.max(0, y2 - y1);
  const uni = a.w * a.h + b.w * b.h - inter;
  if (uni <= 0) return (Math.abs(a.x - b.x) < 2 && Math.abs(a.y - b.y) < 2) ? 1 : 0;
  return inter / uni;
}
function similarity(U, S) {
  const ue = U.qa('body *'), se = S.qa('body *');
  if (!se.length) return 0;
  let sum = 0;
  se.forEach((s, i) => { const u = ue[i]; if (u && u.tagName === s.tagName) sum += iou(U.rect(u), S.rect(s)); });
  return sum / Math.max(se.length, ue.length);
}

async function evaluate(ex, code) {
  const up = userParts(ex, code), sp = solParts(ex);
  const udoc = buildDoc(up.html, up.css), sdoc = buildDoc(sp.html, sp.css);
  const widths = Array.from(new Set([ex.w].concat(ex.checks.map((c) => c.w).filter(Boolean))));
  const ctx = {};
  for (const w of widths) {
    const [u, s] = await Promise.all([renderProbe('u' + w, w, ex.h, udoc), renderProbe('s' + w, w, ex.h, sdoc)]);
    if (u._doc !== udoc) return null; // ya hay una versión más nueva en camino
    ctx[w] = { U: H(u.contentDocument), S: H(s.contentDocument) };
  }
  const src = { html: stripHtml(up.html), css: stripCss(up.css) };
  const results = ex.checks.map((c) => {
    const k = ctx[c.w || ex.w];
    try { return Object.assign({ d: c.d, w: c.w }, evalCheck(c, k.U, k.S, src)); }
    catch (e) { return { d: c.d, w: c.w, ok: false, msg: 'Error al comprobar: ' + e.message }; }
  });
  const score = similarity(ctx[ex.w].U, ctx[ex.w].S);
  return { results, score };
}

/* ---------- editores ---------- */
function makeEditor(host, mode) {
  if (window.CodeMirror) {
    const cm = window.CodeMirror(host, {
      mode, lineNumbers: true, tabSize: 2, indentUnit: 2, indentWithTabs: false, lineWrapping: true,
      autoCloseTags: mode === 'htmlmixed', autoCloseBrackets: true, matchBrackets: true,
      extraKeys: { Tab: (c) => c.somethingSelected() ? c.indentSelection('add') : c.replaceSelection('  ', 'end'), 'Shift-Tab': (c) => c.indentSelection('subtract') }
    });
    return {
      get: () => cm.getValue(),
      set: (v) => { cm.setValue(v); cm.clearHistory(); },
      ro: (b) => { cm.setOption('readOnly', b); host.classList.toggle('readonly', b); },
      onChange: (f) => cm.on('change', (_, ch) => { if (ch.origin !== 'setValue') f(); }),
      refresh: () => cm.refresh()
    };
  }
  const ta = document.createElement('textarea');
  ta.className = 'fallback'; ta.spellcheck = false; ta.setAttribute('aria-label', mode === 'css' ? 'Código CSS' : 'Código HTML');
  host.appendChild(ta);
  ta.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && !ta.readOnly) {
      e.preventDefault();
      const s = ta.selectionStart; ta.setRangeText('  ', s, ta.selectionEnd, 'end');
      ta.dispatchEvent(new Event('input'));
    }
  });
  return {
    get: () => ta.value, set: (v) => { ta.value = v; },
    ro: (b) => { ta.readOnly = b; host.classList.toggle('readonly', b); },
    onChange: (f) => ta.addEventListener('input', f), refresh: () => {}
  };
}
const edHtml = makeEditor($('editorHtml'), 'htmlmixed');
const edCss = makeEditor($('editorCss'), 'css');

/* ---------- estado ---------- */
let cur = null, curIdx = 0, viewW = 0, mode = 'side', runToken = 0, debounce = null;
const editable = () => cur.edit === 'html' ? edHtml : edCss;

function selectTab(which) {
  const isHtml = which === 'html';
  $('tabHtml').setAttribute('aria-selected', String(isHtml));
  $('tabCss').setAttribute('aria-selected', String(!isHtml));
  $('editorHtml').hidden = !isHtml; $('editorCss').hidden = isHtml;
  (isHtml ? edHtml : edCss).refresh();
}
$('tabHtml').onclick = () => selectTab('html');
$('tabCss').onclick = () => selectTab('css');

/* ---------- barra lateral ---------- */
const RECURSOS_URL = '@RECURSOS_URL'; // lo rellena scripts/build.mjs
const CHULETAS = [['chuleta-html.pdf', 'Chuleta de HTML', 'UP01–UP03'], ['chuleta-css.pdf', 'Chuleta de CSS', 'UP04–UP06']];
function buildSide() {
  const side = $('side'); side.innerHTML = '';
  const box = document.createElement('div'); box.className = 'side-links';
  CHULETAS.forEach(([file, name, ups]) => {
    const a = document.createElement('a');
    a.className = 'side-link'; a.href = RECURSOS_URL + file; a.target = '_blank'; a.rel = 'noopener';
    a.innerHTML = '<span>' + name + '</span><small>PDF · ' + ups + '</small>';
    box.appendChild(a);
  });
  side.appendChild(box);
  BLOCKS.forEach((b) => {
    const list = EX.filter((e) => e.block === b.id);
    const done = list.filter((e) => store.done[e.id]).length;
    const div = document.createElement('div'); div.className = 'blk';
    div.innerHTML = '<h3>' + esc(b.name) + '<span>' + done + '/' + list.length + '</span></h3>';
    list.forEach((e) => {
      const i = EX.indexOf(e);
      const btn = document.createElement('button');
      btn.className = 'ex-link';
      btn.setAttribute('aria-current', String(cur && cur.id === e.id));
      const st = store.done[e.id] ? 'done' : (store.code[e.id] != null && store.code[e.id] !== starter(e) ? 'wip' : '');
      btn.innerHTML = '<span class="dot ' + st + '"></span><span class="ex-num">' + String(i + 1).padStart(2, '0') + '</span><span>' + esc(e.title) + '</span>';
      btn.onclick = () => { location.hash = e.id; $('side').classList.remove('open'); $('menuBtn').setAttribute('aria-expanded', 'false'); };
      div.appendChild(btn);
    });
    side.appendChild(div);
  });
  const total = EX.length, done = EX.filter((e) => store.done[e.id]).length;
  $('progText').textContent = done + ' / ' + total + ' hechos';
  $('progBar').style.width = (100 * done / total) + '%';
}
$('menuBtn').onclick = () => {
  const open = $('side').classList.toggle('open');
  $('menuBtn').setAttribute('aria-expanded', String(open));
};

/* ---------- enunciado ---------- */
function buildBrief() {
  const b = BLOCKS.find((x) => x.id === cur.block);
  const el = $('brief');
  el.innerHTML =
    '<div><div class="eyebrow">' + esc(b.name) + ' · ejercicio ' + (curIdx + 1) + ' de ' + EX.length + '</div>' +
    '<h1>' + esc(cur.title) + '</h1>' +
    '<div class="tags">' + cur.tags.map((t) => '<span class="tag">' + esc(t) + '</span>').join('') + '</div></div>' +
    '<div class="brief-actions"><button class="btn" id="resetBtn"></button><button class="btn" id="solBtn">Ver solución</button><button class="btn primary" id="nextBtn">Siguiente</button></div>' +
    '<div class="brief-text">' + cur.brief + '</div>' +
    (cur.hint ? '<details class="hint"><summary>Pista</summary><div>' + cur.hint + '</div></details>' : '');
  $('resetBtn').textContent = 'Reiniciar';
  $('resetBtn').onclick = () => modal({
    title: '¿Reiniciar este ejercicio?', danger: true,
    html: '<p>Tu código de <strong>' + esc(cur.title) + '</strong> se sustituirá por el de partida. El resto de ejercicios no se toca.</p>',
    actions: [{ label: 'Cancelar' }, { label: 'Reiniciar ejercicio', cls: 'danger', onClick: () => { editable().set(starter(cur)); onEdit(true); } }]
  });
  $('solBtn').onclick = toggleSol;
  $('nextBtn').onclick = goNext;
}
function toggleSol() {
  const p = $('solPanel'); const show = !p.classList.contains('show');
  p.classList.toggle('show', show);
  $('solBtn').textContent = show ? 'Ocultar solución' : 'Ver solución';
  if (show) p.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
$('copySol').onclick = async () => {
  try { await navigator.clipboard.writeText(cur.sol); $('copySol').textContent = 'Copiado'; }
  catch (e) { $('copySol').textContent = 'No se pudo copiar'; }
  setTimeout(() => { $('copySol').textContent = 'Copiar'; }, 1800);
};
$('loadSol').onclick = () => modal({
  title: '¿Cargar la solución?',
  html: '<p>Tu código actual de este ejercicio se sustituirá por la solución de referencia.</p>',
  actions: [{ label: 'Cancelar' }, { label: 'Cargar solución', cls: 'primary', onClick: () => { editable().set(cur.sol); onEdit(true); } }]
});
function goNext() { location.hash = EX[(curIdx + 1) % EX.length].id; }
$('nextBtn2').onclick = goNext;
// Modo aleatorio: un ejercicio sin resolver cualquiera (si ya están todos, uno cualquiera distinto del actual).
function goRandom() {
  const others = EX.filter((e) => e !== cur);
  const pending = others.filter((e) => !store.done[e.id]);
  const pool = pending.length ? pending : others;
  if (pool.length) location.hash = pool[Math.floor(Math.random() * pool.length)].id;
}
$('randBtn').onclick = goRandom;

/* ---------- vista previa ---------- */
let frames = {};
function buildStage() {
  const stage = $('stage'); stage.innerHTML = ''; frames = {};
  const mk = (cls) => { const f = document.createElement('iframe'); f.setAttribute('sandbox', 'allow-same-origin'); f.className = cls; f.title = cls === 'sol' ? 'Objetivo' : 'Tu resultado'; return f; };
  const label = (t) => '<div class="view-label"><span>' + t + '</span><span>' + viewW + ' × ' + cur.h + '</span></div>';
  if (mode === 'side') {
    ['user', 'sol'].forEach((k) => {
      const v = document.createElement('div'); v.className = 'view';
      v.innerHTML = label(k === 'user' ? 'Tu resultado' : 'Objetivo');
      const box = document.createElement('div'); box.className = 'frame-box';
      const f = mk(k); box.appendChild(f); v.appendChild(box); stage.appendChild(v);
      frames[k] = f;
    });
  } else {
    const v = document.createElement('div'); v.className = 'view overlay';
    v.innerHTML = label('Tu resultado | Objetivo');
    const box = document.createElement('div'); box.className = 'frame-box';
    const fu = mk('user'), fs = mk('sol');
    const line = document.createElement('div'); line.className = 'split-line';
    const catcher = document.createElement('div'); catcher.style.cssText = 'position:absolute;inset:0;cursor:ew-resize;touch-action:none';
    box.append(fu, fs, line, catcher); v.appendChild(box); stage.appendChild(v);
    frames.user = fu; frames.sol = fs;
    const setPct = (p) => { fs.style.clipPath = 'inset(0 0 0 ' + p + '%)'; line.style.left = 'calc(' + p + '% - 1px)'; };
    setPct(50);
    catcher.addEventListener('pointermove', (e) => { const r = box.getBoundingClientRect(); setPct(Math.max(0, Math.min(100, 100 * (e.clientX - r.left) / r.width))); });
  }
  const sp = solParts(cur);
  frames.sol.srcdoc = buildDoc(sp.html, sp.css);
  const up = userParts(cur, editable().get());
  frames.user.srcdoc = buildDoc(up.html, up.css);
  layoutStage();
}
function layoutStage() {
  if (!cur) return;
  const stage = $('stage');
  if (mode === 'side') {
    const avail = stage.clientWidth - 24;
    const sStack = Math.min(1, avail / viewW), sSide = Math.min(1, (avail - 12) / 2 / viewW);
    // apila «Tu resultado» y «Objetivo» si caben a mayor escala sin hacerse demasiado altos
    stage.classList.toggle('stacked', sStack > sSide * 1.15 && 2 * cur.h * sStack <= 560);
  } else stage.classList.remove('stacked');
  document.querySelectorAll('#stage .frame-box').forEach((box) => {
    const wAvail = box.parentElement.clientWidth;
    const s = Math.min(1, wAvail / viewW);
    box.style.width = (viewW * s) + 'px'; box.style.height = (cur.h * s) + 'px';
    box.querySelectorAll('iframe').forEach((f) => { f.style.width = viewW + 'px'; f.style.height = cur.h + 'px'; f.style.transform = 'scale(' + s + ')'; });
  });
}
new ResizeObserver(() => layoutStage()).observe($('stage'));
function setMode(m) {
  mode = m;
  $('modeSide').setAttribute('aria-pressed', String(m === 'side'));
  $('modeOver').setAttribute('aria-pressed', String(m === 'over'));
  $('overTip').hidden = m !== 'over';
  buildStage();
}
$('modeSide').onclick = () => setMode('side');
$('modeOver').onclick = () => setMode('over');
function buildWidthSeg() {
  const seg = $('widthSeg'); seg.innerHTML = '';
  const views = cur.views || [cur.w];
  seg.hidden = views.length < 2;
  views.forEach((w) => {
    const b = document.createElement('button'); b.textContent = w + ' px';
    b.setAttribute('aria-pressed', String(w === viewW));
    b.onclick = () => { viewW = w; buildWidthSeg(); buildStage(); };
    seg.appendChild(b);
  });
}

/* ---------- comprobaciones ---------- */
function renderChecks(r) {
  const ul = $('checkList');
  ul.innerHTML = '';
  r.results.forEach((x) => {
    const li = document.createElement('li'); li.className = x.ok ? 'ok' : 'bad';
    li.innerHTML = '<span class="ic">' + (x.ok ? '✓' : '✕') + '</span><span>' + x.d +
      (x.w ? '<span class="w">a ' + x.w + ' px</span>' : '') +
      (x.ok ? '' : '<span class="msg"' + (x.detail ? ' title="' + esc(x.detail) + '"' : '') + '>' + esc(x.msg || '') + '</span>') + '</span>';
    ul.appendChild(li);
  });
  const okN = r.results.filter((x) => x.ok).length, all = okN === r.results.length;
  const pct = Math.round(r.score * 100);
  $('scoreBar').style.width = pct + '%'; $('scoreText').textContent = pct + ' %';
  const st = $('status'); st.className = 'status' + (all ? ' ok' : '');
  st.textContent = all ? 'Resuelto' : okN + ' de ' + r.results.length;
  $('doneBanner').classList.toggle('show', all);
  if (all && !store.done[cur.id]) { store.done[cur.id] = true; save(); buildSide(); }
}
function pendingChecks() {
  $('checkList').innerHTML = cur.checks.map((c) => '<li class="pending"><span class="ic"></span><span>' + c.d + '</span></li>').join('');
  $('status').className = 'status'; $('status').textContent = 'Comprobando…';
}
async function runChecks() {
  const tok = ++runToken; const ex = cur;
  const r = await evaluate(ex, editable().get());
  if (!r || tok !== runToken || ex !== cur) return;
  renderChecks(r);
}

function onEdit(now) {
  store.code[cur.id] = editable().get(); save();
  clearTimeout(debounce);
  debounce = setTimeout(() => {
    const up = userParts(cur, editable().get());
    frames.user.srcdoc = buildDoc(up.html, up.css);
    runChecks();
    const dot = document.querySelector('.ex-link[aria-current="true"] .dot');
    if (dot && !dot.classList.contains('done')) dot.className = 'dot' + (store.code[cur.id] !== starter(cur) ? ' wip' : '');
  }, now ? 0 : 300);
}
edHtml.onChange(() => { if (cur && cur.edit === 'html') onEdit(); });
edCss.onChange(() => { if (cur && cur.edit === 'css') onEdit(); });

/* ---------- ventanas modales ---------- */
const dlg = $('modal');
function modal({ title, html, actions, danger }) {
  dlg.classList.toggle('danger', !!danger);
  $('modalTitle').textContent = title;
  $('modalBody').innerHTML = html || '';
  const box = $('modalActions'); box.innerHTML = '';
  (actions || [{ label: 'Cerrar' }]).forEach((a) => {
    const b = document.createElement('button');
    b.className = 'btn' + (a.cls ? ' ' + a.cls : ''); b.textContent = a.label;
    b.onclick = () => { if (!a.keepOpen) dlg.close(); if (a.onClick) a.onClick(); };
    box.appendChild(b);
  });
  if (!dlg.open) dlg.showModal();
  const last = box.lastElementChild; if (last && !danger) last.focus(); else if (box.firstElementChild) box.firstElementChild.focus();
}
dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });

function stats() {
  const done = EX.filter((e) => store.done[e.id]).length;
  const touched = EX.filter((e) => store.code[e.id] != null && store.code[e.id] !== starter(e)).length;
  return { done, touched };
}
function exportJson() {
  return JSON.stringify({ app: 'lmsgi-trainer-html-css', version: 1, exported: new Date().toISOString(), done: store.done, code: store.code }, null, 2);
}
function setNote(text, bad) {
  let n = document.getElementById('progNote');
  if (!n) { n = document.createElement('p'); n.id = 'progNote'; $('modalBody').querySelector('.backup').appendChild(n); }
  n.className = 'note' + (bad ? ' bad' : ''); n.textContent = text;
}
function openProgress() {
  const st = stats();
  modal({
    title: 'Mi progreso',
    html:
      '<div class="stats"><div class="stat"><b>' + st.done + ' / ' + EX.length + '</b><span>ejercicios resueltos</span></div>' +
      '<div class="stat"><b>' + st.touched + '</b><span>con código tuyo guardado</span></div></div>' +
      (canStore
        ? '<p class="muted">Se guarda solo en este navegador. Si borras los datos de navegación o cambias de ordenador o de navegador, se pierde. Haz una copia de vez en cuando.</p>'
        : '<p class="note bad">Este navegador no deja guardar datos: el progreso se pierde al cerrar la página. Descarga una copia antes de salir.</p>') +
      '<div class="backup"><div class="row">' +
      '<button class="btn" id="expDl">Descargar copia (.json)</button>' +
      '<button class="btn" id="expCp">Copiar al portapapeles</button>' +
      '<button class="btn" id="impBtn">Importar copia…</button></div></div>' +
      '<div class="zone"><h3>Zona peligrosa</h3><p class="muted">Borra los ejercicios resueltos y todo tu código. No se puede deshacer.</p>' +
      '<button class="btn warn" id="wipeBtn">Borrar todo el progreso</button></div>',
    actions: [{ label: 'Cerrar' }]
  });
  $('expDl').onclick = async () => {
    const filename = 'lmsgi-trainer-html-css-progreso-' + new Date().toISOString().slice(0, 10) + '.json';
    if (claudeDl) {
      try { await claudeDl.save({ filename, data: exportJson() }); setNote('Copia descargada.'); }
      catch (e) {
        if (e && e.code === 'declined') setNote('Descarga cancelada.');
        else if (e && e.code === 'rate_limited') setNote('Hay otra descarga pendiente. Prueba en un momento.', true);
        else setNote('No se pudo descargar aquí. Usa «Copiar».', true);
      }
      return;
    }
    try {
      const url = URL.createObjectURL(new Blob([exportJson()], { type: 'application/json' }));
      const a = document.createElement('a');
      a.href = url; a.download = filename;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      setNote('Copia descargada. Si no aparece, usa «Copiar» y pégalo en un archivo .json.');
    } catch (e) { setNote('No se pudo descargar. Usa «Copiar».', true); }
  };
  $('expCp').onclick = async () => {
    try { await navigator.clipboard.writeText(exportJson()); setNote('Copia en el portapapeles. Pégala en un archivo .json y guárdalo.'); }
    catch (e) { setNote('El navegador no ha dejado copiar.', true); }
  };
  $('impBtn').onclick = () => { $('importFile').value = ''; $('importFile').click(); };
  $('wipeBtn').onclick = confirmWipe;
}
$('importFile').addEventListener('change', async () => {
  const f = $('importFile').files[0]; if (!f) return;
  try {
    const data = JSON.parse(await f.text());
    if (!data || data.app !== 'lmsgi-trainer-html-css' || typeof data.done !== 'object' || typeof data.code !== 'object') throw new Error('formato');
    const ids = new Set(EX.map((e) => e.id));
    let nd = 0, nc = 0;
    Object.keys(data.done).forEach((k) => { if (ids.has(k) && data.done[k] && !store.done[k]) { store.done[k] = true; nd++; } });
    Object.keys(data.code).forEach((k) => { if (ids.has(k) && typeof data.code[k] === 'string') { store.code[k] = data.code[k]; nc++; } });
    save(); go(cur.id);
    modal({ title: 'Copia importada', html: '<p>' + nd + ' ejercicio(s) resuelto(s) nuevos y código de ' + nc + ' ejercicio(s) recuperado.</p><p class="muted">Se combina con lo que ya tenías: los resueltos se suman y el código de la copia sustituye al actual.</p>' });
  } catch (e) {
    modal({ title: 'No se pudo importar', danger: true, html: '<p>El archivo no es una copia válida de lmsgi-trainer: HTML &amp; CSS.</p>' });
  }
});
function confirmWipe() {
  const st = stats();
  modal({
    title: '¡Cuidado! Se borrará todo el progreso', danger: true,
    html: '<p>Vas a perder <strong>' + st.done + ' ejercicio(s) resuelto(s)</strong> y tu código de <strong>' + st.touched + ' ejercicio(s)</strong>.</p><p>No se puede deshacer. Si quieres conservarlo, descarga antes una copia.</p>',
    actions: [
      { label: 'Cancelar', onClick: openProgress },
      { label: 'Sí, borrar todo', cls: 'danger', onClick: () => {
        store = { done: {}, code: {} }; save(); go(EX[0].id);
        if (location.hash.slice(1) !== EX[0].id) location.hash = EX[0].id;
        modal({ title: 'Progreso borrado', html: '<p>Empiezas de cero desde el primer ejercicio.</p>' });
      } }
    ]
  });
}
$('progBtn').onclick = openProgress;
// Dentro de Claude, las descargas pasan por la capacidad «downloads»; abierto como archivo local se usa un enlace normal.
let claudeDl = null;
if (window.claude && typeof window.claude.use === 'function') {
  window.claude.use('downloads').then((d) => { claudeDl = d; }).catch(() => {});
}
$('storeWarn').hidden = canStore;

/* ---------- navegación ---------- */
function go(id) {
  const i = Math.max(0, EX.findIndex((e) => e.id === id));
  cur = EX[i]; curIdx = i;
  viewW = (cur.views || [cur.w])[cur.views ? cur.views.length - 1 : 0];
  const code = store.code[cur.id] != null ? store.code[cur.id] : starter(cur);
  editable().set(code); editable().ro(false);
  const fixed = cur.edit === 'html' ? edCss : edHtml;
  fixed.set(fixedCode(cur)); fixed.ro(true);
  const lock = '<span class="lock">solo lectura</span>';
  $('tabHtml').innerHTML = 'HTML' + (cur.edit === 'html' ? '' : lock);
  $('tabCss').innerHTML = 'CSS' + (cur.edit === 'css' ? '' : lock);
  $('editHint').textContent = cur.edit === 'html' ? 'Escribes el HTML; el CSS ya está hecho' : 'Escribes el CSS; el HTML ya está hecho';
  selectTab(cur.edit);
  $('solCode').textContent = cur.sol;
  $('solPanel').classList.remove('show');
  $('doneBanner').classList.remove('show');
  buildSide(); buildBrief(); buildWidthSeg(); buildStage(); pendingChecks(); runChecks();
  document.querySelector('.main').scrollTop = 0;
}
window.addEventListener('hashchange', () => go(location.hash.slice(1)));
go(location.hash.slice(1) || (EX.find((e) => !store.done[e.id]) || EX[0]).id);

window.__trainer = { EX, evaluate, starter, store: () => store };
})();
