#!/usr/bin/env node
// Verifica index.html en Chromium (Playwright):
//   1. Cada solución pasa TODAS sus comprobaciones.
//   2. Ningún código de partida las pasa todas (si no, el ejercicio está «regalado»).
//   3. Las soluciones alternativas válidas de ALTERNATIVAS también pasan.
//   4. El flujo de progreso (resolver → copia → borrar → importar → recargar) funciona.
// Uso: npm test            (todo)
//      npm test -- navbar  (solo ejercicios cuyo id contenga «navbar»)
import { createRequire } from 'node:module';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdtempSync, readFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const url = pathToFileURL(join(root, 'index.html')).href;
const filter = process.argv[2] || '';

// Otras formas correctas de resolver: deben pasar igual que la solución oficial.
// Cada entrada transforma la solución de referencia.
const ALTERNATIVAS = {
  'box-model': (s) => s.replace('box-sizing: border-box;\n  width: 200px;\n  height: 100px;', 'width: 150px;\n  height: 50px;'),
  'centrado-total': (s) => s.replace('display: flex;\n  justify-content: center;\n  align-items: center;', 'display: grid;\n  place-items: center;'),
  'pie-pegado': (s) => s.replace('min-height: 100vh;', 'height: 100vh;'),
  'form-login': (s) => s.replace('<label for="email">Correo</label>\n  <input type="email" id="email" name="email" required>', '<label>Correo <input type="email" name="email" required></label>'),
  'responsive-planes': (s) => s.replace('display: flex;\n  flex-direction: column;', 'display: grid;').replace('.planes { flex-direction: row; }\n  .plan { flex: 1; }', '.planes { grid-template-columns: repeat(3, 1fr); }'),
  'inline-block-huecos': (s) => s.replace('font-size: 0;', 'display: flex;'),
  'float-imagen': (s) => s.replace('.noticia { overflow: hidden; }', '.noticia::after { content: ""; display: block; clear: both; }'),
  'menu-vertical': (s) => s.replace('.lateral li { border-bottom: 1px solid #fcd34d; }\n.lateral li:last-child { border-bottom: none; }', '.lateral li:not(:last-child) { border-bottom: 1px solid #fcd34d; }'),
  'menu-horizontal': (s) => s.replace('.menu li { display: inline-block; }', '.menu li { float: left; }\n.menu ul { overflow: hidden; }'),
  'capas-z-index': (s) => s.replace('.destacada { z-index: 1; }', '.carta:first-child { z-index: 99; }'),
  'tamanos-max-width': (s) => s.replace('.contenido {\n  width: 90%;\n  max-width: 400px;', '.contenido {\n  width: min(90%, 400px);'),
  'selectores-basicos': (s) => s.replace('h1, h2 {', 'h2, h1 {'),
  'form-patrones': (s) => s.replace('pattern="[0-9]{5}"', 'pattern="\\d{5}"').replace('pattern="[0-9]{8}[A-Z]"', 'pattern="\\d{8}[A-Z]"'),
  'cabecera-responsive': (s) => s.replace('justify-content: space-between;\n    align-items: center;', 'align-items: center;\n    gap: 0;\n  }\n  .menu { margin-left: auto; margin-right: auto;')
};

// Respuestas equivocadas: cada una debe suspender la comprobación cuya descripción contiene el texto indicado.
// Sirven para asegurar que las comprobaciones de :hover, :focus, pseudoelementos, scroll… no aprueban «en vacío».
const NEGATIVAS = {
  'menu-horizontal': [[(s) => s.replace(/\.menu a:hover \{[^}]*\}/, ''), 'pasar el ratón']],
  'menu-vertical': [[(s) => s.replace(/\.lateral a:hover \{[^}]*\}/, ''), 'pasar el ratón']],
  'tabla-css': [[(s) => s.replace('tbody tr:hover { background: #fef3c7; }', ''), 'pasar el ratón'],
                [(s) => s.replace('tbody tr:hover { background: #fef3c7; }', '').replace('tbody tr:nth-child(even)', 'tbody tr:hover { background: #fef3c7; }\ntbody tr:nth-child(even)'), 'pasar el ratón']],
  'botones-estados': [[(s) => s.replace(/\.boton:focus \{[^}]*\}/, ''), 'foco'], [(s) => s.replace('.boton:hover { background: #9e4e20; }', '.boton { background: #9e4e20; }'), 'no cambia']],
  'formulario-css': [[(s) => s.replace(/input:focus, textarea:focus \{[^}]*\}/, ''), 'foco']],
  'botones-sombras': [[(s) => s.replace('.cta:hover { transform: scale(1.1); }', ''), 'pasar el ratón']],
  'pseudoelementos': [[(s) => s.replace(/\.entradilla::first-letter \{[^}]*\}/, ''), 'Primera letra'], [(s) => s.replace('content: "✔";', 'content: "✓";'), 'Marca'], [(s) => s.replace('content: " €";', 'content: "€";'), 'euro']],
  'cabecera-sticky': [[(s) => s.replace('position: sticky;', 'position: relative;'), 'Al bajar, la cabecera'], [(s) => s.replace('z-index: 10;', ''), 'por encima'], [(s) => s.replace('position: fixed;', 'position: absolute;'), 'el botón no se mueve']],
  'capas-z-index': [[(s) => s.replace('.destacada { z-index: 1; }', ''), 'encima']],
  'head-metadatos': [[(s) => s.replace(/  <meta name="viewport"[^>]*>\n/, ''), 'Viewport'], [(s) => s.replace('<meta charset="UTF-8">', ''), 'UTF-8']],
  'form-patrones': [[(s) => s.replace('pattern="[0-9]{5}"', 'pattern="[0-9]+"'), 'Código postal'], [(s) => s.replace('pattern="[a-z0-9]{3,12}"', 'pattern="\\w{3,12}"'), 'Usuario']],
  'combinadores': [[(s) => s.replace('.noticia > p', '.noticia p'), 'Color de los párrafos']],
  'tamanos-max-width': [[(s) => s.replace('max-width: 400px;', ''), 'pantalla ancha']],
  'grid-auto-fill': [[(s) => s.replace('repeat(auto-fill, minmax(140px, 1fr))', 'repeat(4, 1fr)'), 'móvil']]
};

let fails = 0;
const bad = (msg) => { fails++; console.log('  ✘ ' + msg); };

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true });
const page = await context.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.route(/^https?:\/\//, (r) => r.fulfill({ body: '' })); // sin red en tests (fuentes, vídeos, mapas…)
await page.goto(url);
await page.waitForFunction(() => window.__trainer);

console.log('Ejercicios');
const results = await page.evaluate(async ([filter, altSrc, negSrc]) => {
  const alts = Object.fromEntries(Object.entries(altSrc).map(([k, v]) => [k, eval(v)]));
  const negs = Object.fromEntries(Object.entries(negSrc).map(([k, list]) => [k, list.map(([f, d]) => [eval(f), d])]));
  const T = window.__trainer, out = [];
  for (const ex of T.EX) {
    if (filter && !ex.id.includes(filter)) continue;
    const sol = await T.evaluate(ex, ex.sol);
    const st = await T.evaluate(ex, T.starter(ex));
    const r = {
      id: ex.id,
      solFail: sol.results.filter((x) => !x.ok).map((x) => x.d.replace(/<[^>]+>/g, '') + ' → ' + x.msg),
      score: Math.round(sol.score * 100),
      starterAll: st.results.every((x) => x.ok)
    };
    if (alts[ex.id]) {
      const a = await T.evaluate(ex, alts[ex.id](ex.sol));
      r.altFail = a.results.filter((x) => !x.ok).map((x) => x.d.replace(/<[^>]+>/g, '') + ' → ' + x.msg);
    }
    if (negs[ex.id]) {
      r.negFail = [];
      for (const [f, d] of negs[ex.id]) {
        const code = f(ex.sol);
        if (code === ex.sol) { r.negFail.push('la respuesta equivocada no cambia nada («' + d + '»)'); continue; }
        const n = await T.evaluate(ex, code);
        const target = n.results.filter((x) => x.d.replace(/<[^>]+>/g, '').includes(d));
        if (!target.length) r.negFail.push('no hay ninguna comprobación con «' + d + '»');
        else if (target.every((x) => x.ok)) r.negFail.push('una respuesta equivocada aprueba «' + d + '»');
      }
      // y, después de todo eso, la solución sigue aprobando (la simulación de estados no deja restos)
      const again = await T.evaluate(ex, ex.sol);
      if (!again.results.every((x) => x.ok)) r.negFail.push('tras evaluar respuestas equivocadas, la solución ya no aprueba');
    }
    out.push(r);
  }
  return out;
}, [filter, Object.fromEntries(Object.entries(ALTERNATIVAS).map(([k, f]) => [k, f.toString()])),
  Object.fromEntries(Object.entries(NEGATIVAS).map(([k, list]) => [k, list.map(([f, d]) => [f.toString(), d])]))]);

for (const r of results) {
  const problems = [];
  if (r.solFail.length) problems.push('la solución falla: ' + r.solFail.join(' | '));
  if (r.starterAll) problems.push('el código de partida ya pasa todo');
  if (r.altFail && r.altFail.length) problems.push('la alternativa falla: ' + r.altFail.join(' | '));
  if (r.negFail && r.negFail.length) problems.push(...r.negFail);
  if (r.score < 100) problems.push('parecido de la solución consigo misma = ' + r.score + '%');
  if (problems.length) { console.log('✘ ' + r.id); problems.forEach(bad); }
  else console.log('✔ ' + r.id + (r.altFail ? ' (+ alternativa)' : '') + (r.negFail ? ' (+ equivocadas)' : ''));
}
if (!results.length) bad('ningún ejercicio coincide con «' + filter + '»');

if (!filter) {
  console.log('\nProgreso');
  try {
    const first = await page.evaluate(() => window.__trainer.EX[0].id);
    await page.goto(url + '#' + first); await page.waitForFunction(() => window.__trainer);
    await page.click('#solBtn'); await page.click('#loadSol'); await page.click('#modalActions .btn.primary');
    await page.waitForSelector('#status.ok', { timeout: 5000 });
    await page.click('#progBtn');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.click('#expDl')]);
    const file = join(mkdtempSync(join(tmpdir(), 'lmsgi-')), 'copia.json');
    await dl.saveAs(file);
    const copy = JSON.parse(readFileSync(file, 'utf8'));
    if (!copy.done[first]) bad('la copia no incluye el ejercicio resuelto');
    await page.click('#wipeBtn'); await page.click('#modalActions .btn.danger');
    const wiped = await page.evaluate(() => window.__trainer.store());
    if (Object.keys(wiped.done).length || Object.keys(wiped.code).length) bad('«Borrar todo» no ha vaciado el progreso');
    await page.click('#modalActions .btn');
    await page.click('#progBtn'); await page.setInputFiles('#importFile', file); await page.waitForTimeout(300);
    await page.reload(); await page.waitForFunction(() => window.__trainer);
    const after = await page.evaluate(() => window.__trainer.store());
    if (!after.done[first]) bad('tras importar y recargar no se recupera el progreso');
    console.log(fails ? '' : '✔ resolver → copia → borrar → importar → recargar');
  } catch (e) { bad('flujo de progreso: ' + e.message); }

  const cm = await page.evaluate(() => !!window.CodeMirror);
  if (!cm) bad('CodeMirror no se ha cargado');

  const chuletas = await page.evaluate(() => [...document.querySelectorAll('.side-link')].map((a) => a.getAttribute('href')));
  if (chuletas.length !== 2) bad('se esperan los enlaces a las chuletas de HTML y CSS; hay ' + chuletas.length);
  chuletas.filter((h) => !existsSync(join(root, h))).forEach((h) => bad('la chuleta enlazada no existe: ' + h));
}

if (errors.length) errors.forEach((e) => bad('error JS en la página: ' + e));
await browser.close();
console.log(fails ? `\n${fails} problema(s)` : '\nTodo OK');
process.exit(fails ? 1 : 0);
