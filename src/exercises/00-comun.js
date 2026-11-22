/* Bloques, constantes compartidas y registro de ejercicios.
   El orden de los ejercicios es el orden de los archivos (00, 01, 02…) y dentro de cada uno.
   Los bloques siguen las unidades del temario de LMSGI 2026/27 (UP01–UP06). */
window.BLOCKS = [
  { id: 'sem', name: 'UP01–03 · Estructura, texto y enlaces' },
  { id: 'med', name: 'UP02–03 · Tablas, multimedia y metadatos' },
  { id: 'form', name: 'UP02–03 · Formularios' },
  { id: 'sel', name: 'UP04 · Selectores, texto y cajas' },
  { id: 'pos', name: 'UP05 · Display, posición y pseudoclases' },
  { id: 'lay', name: 'UP06 · Flexbox y media queries' },
  { id: 'grid', name: 'Ampliación · CSS Grid' }
];

// Imagen genérica (paisaje) sin tamaño intrínseco: se adapta a la caja.
const IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 140'%3E%3Crect width='240' height='140' fill='%23dbeafe'/%3E%3Cpath d='M0 140 L80 60 L130 110 L170 80 L240 140Z' fill='%231e3a8a'/%3E%3Ccircle cx='190' cy='35' r='16' fill='%23f59e0b'/%3E%3C/svg%3E";

// Misma imagen con tamaño fijo (120 × 70): como fondo, se repite en mosaico.
const FONDO = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='70' viewBox='0 0 240 140'%3E%3Crect width='240' height='140' fill='%23fde68a'/%3E%3Cpath d='M0 140 L80 60 L130 110 L170 80 L240 140Z' fill='%23b45309'/%3E%3Ccircle cx='190' cy='35' r='16' fill='%23fff7ed'/%3E%3C/svg%3E";

// Avatar cuadrado (silueta).
const AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23c7d2fe'/%3E%3Ccircle cx='50' cy='38' r='18' fill='%234338ca'/%3E%3Cpath d='M18 100 C18 70 82 70 82 100Z' fill='%234338ca'/%3E%3C/svg%3E";

const FORM_CSS = `body { margin: 16px; font-size: 14px; }
form { max-width: 300px; display: flex; flex-direction: column; gap: 4px; }
label { font-weight: 600; margin-top: 4px; }
input, select, textarea {
  font: inherit;
  padding: 5px 8px;
  border: 1px solid #94a3b8;
  border-radius: 6px;
}
button {
  font: inherit;
  margin-top: 8px;
  padding: 8px;
  background: #1d4ed8;
  color: #fff;
  border: 0;
  border-radius: 6px;
  font-weight: 600;
}`;

// Comprobación de un atributo pattern: lo compila como hace el navegador (todo el valor, flag v)
// y lo prueba con valores que deben pasar y valores que no.
function patternCheck(sel, oks, bads) {
  return (U) => {
    const el = U.q(sel);
    if (!el) return 'No encuentro ' + sel;
    const p = el.getAttribute('pattern');
    if (!p) return 'Falta el atributo pattern';
    let re;
    try { re = new RegExp('^(?:' + p + ')$', 'v'); } catch (e) {
      try { re = new RegExp('^(?:' + p + ')$', 'u'); } catch (e2) { return 'El pattern no es una expresión regular válida'; }
    }
    const fallaOk = oks.find((v) => !re.test(v));
    if (fallaOk !== undefined) return 'Rechaza «' + fallaOk + '», que es válido';
    const pasaMal = bads.find((v) => re.test(v));
    if (pasaMal !== undefined) return 'Acepta «' + pasaMal + '», que no es válido';
    return true;
  };
}

// Comprobación tras hacer scroll: compara la posición de los elementos con la solución.
function rectAfterScroll(sel, y) {
  return (U, S) => {
    const at = (H) => {
      const se = H.doc.scrollingElement; se.scrollTop = y;
      const r = H.qa(sel).map((el) => H.rect(el));
      se.scrollTop = 0;
      return r;
    };
    const a = at(U), b = at(S);
    if (a.length !== b.length) return 'Hay ' + a.length + ' «' + sel + '», se esperan ' + b.length;
    for (let i = 0; i < b.length; i++) {
      if (Math.abs(a[i].x - b[i].x) > 2 || Math.abs(a[i].y - b[i].y) > 2) {
        return 'Tras bajar ' + y + ' px, ' + sel + ' está en (' + Math.round(a[i].x) + ', ' + Math.round(a[i].y) + ') · objetivo (' + Math.round(b[i].x) + ', ' + Math.round(b[i].y) + ')';
      }
    }
    return true;
  };
}

window.EXERCISES = [];
