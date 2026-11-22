#!/usr/bin/env node
// Junta src/ + vendor/ en un único HTML autocontenido.
//   node scripts/build.mjs          → index.html (CodeMirror incrustado, funciona sin internet)
//   node scripts/build.mjs --cdn    → dist/index.cdn.html (CodeMirror desde cdnjs; para publicar como artifact en Claude)
//   node scripts/build.mjs --watch  → recompila index.html al guardar cualquier cosa de src/
import { readFileSync, writeFileSync, readdirSync, mkdirSync, watch } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const cdn = args.includes('--cdn');
const watchMode = args.includes('--watch');

const CM_VERSION = '5.65.16';
const CM_JS = [
  'lib/codemirror.js',
  'mode/xml/xml.js',
  'mode/css/css.js',
  'mode/javascript/javascript.js',
  'mode/htmlmixed/htmlmixed.js',
  'addon/fold/xml-fold.js',
  'addon/edit/closetag.js',
  'addon/edit/closebrackets.js',
  'addon/edit/matchbrackets.js'
];

const read = (p) => readFileSync(join(root, p), 'utf8');
// Dentro de <script> no puede aparecer «</script» y conviene neutralizar «<!--».
const safeJs = (s) => s.replace(/<!--/g, '<\\!--').replace(/<\/script/gi, '<\\/script');

function build() {
  const exDir = 'src/exercises';
  const exFiles = readdirSync(join(root, exDir)).filter((f) => f.endsWith('.js')).sort();
  const exercises = exFiles.map((f) => `/* ---- ${f} ---- */\n` + read(join(exDir, f))).join('\n');

  const cmJs = cdn
    ? CM_JS.map((p) => {
        const file = p.replace(/^lib\//, '').replace(/\.js$/, '.min.js');
        return `<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/${CM_VERSION}/${file}"></script>`;
      }).join('\n')
    : '<script>\n' + CM_JS.map((p) => safeJs(read('vendor/codemirror/' + p))).join('\n;\n') + '\n</script>';

  let out = read('src/shell.html');
  const put = (marker, value) => {
    if (!out.includes(marker)) throw new Error('Falta el marcador ' + marker + ' en src/shell.html');
    out = out.split(marker).join(value); // split/join: sin sorpresas con «$» en el contenido
  };
  put('/* @CODEMIRROR_CSS */', read('vendor/codemirror/lib/codemirror.css'));
  put('/* @STYLES */', read('src/styles.css'));
  put('<!-- @CODEMIRROR_JS -->', cmJs);
  put('/* @EXERCISES */', safeJs(exercises));
  put('/* @APP */', safeJs(read('src/app.js')));
  // Las chuletas van al lado de index.html en el repo; publicada como artifact no hay archivos al lado: se enlazan las de GitHub.
  put('@RECURSOS_URL', cdn ? 'https://github.com/scontreraslopez/lmsgi-trainer-html-css/blob/main/recursos/' : 'recursos/');

  const target = cdn ? 'dist/index.cdn.html' : 'index.html';
  if (cdn) mkdirSync(join(root, 'dist'), { recursive: true });
  writeFileSync(join(root, target), out);
  console.log(`✔ ${target} · ${(out.length / 1024).toFixed(0)} KB · ${exFiles.length} archivos de ejercicios`);
}

try { build(); } catch (e) { console.error('✘ ' + e.message); if (!watchMode) process.exit(1); }

if (watchMode) {
  let t = null;
  watch(join(root, 'src'), { recursive: true }, () => {
    clearTimeout(t);
    t = setTimeout(() => { try { build(); } catch (e) { console.error('✘ ' + e.message); } }, 100);
  });
  console.log('… vigilando src/ (Ctrl+C para salir)');
}
