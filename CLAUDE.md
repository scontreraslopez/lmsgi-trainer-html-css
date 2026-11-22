# lmsgi-trainer: HTML & CSS

Entrenador de HTML y CSS para el módulo **LMSGI (0373, 1º DAM semipresencial)** del IES Severo Ochoa. Muchos ejercicios cortos y prácticos con corrección automática, al estilo de cssbattle pero **sin competición** (sin tiempo ni ranking). Primero lo usa el profesor (Sergio) para practicar antes de clase y después los alumnos.

## Comandos

```bash
npm install                 # solo Playwright (para los tests)
npx playwright install chromium
npm run build               # src/ + vendor/ → index.html (un único archivo, funciona sin internet)
npm run dev                 # recompila index.html al guardar
npm test                    # build + verificación de todos los ejercicios y del flujo de progreso
npm test -- navbar          # solo los ejercicios cuyo id contenga «navbar»
npm run build:cdn           # dist/index.cdn.html con CodeMirror desde cdnjs (para publicarlo como artifact en Claude)
```

`index.html` se versiona: los alumnos descargan el repo y lo abren con doble clic, sin Node. Las chuletas van al lado (`recursos/`); en `build:cdn` los enlaces apuntan a las copias de GitHub. Si cambian en los apuntes, vuelve a copiar los PDF.

## Estructura

```
src/shell.html          esqueleto HTML con marcadores (@STYLES, @EXERCISES, @APP, @CODEMIRROR_*)
src/styles.css          estilos de la app (tokens en :root, tema claro y oscuro)
src/app.js              motor: editores, vistas previas, corrección, progreso, diálogos
src/exercises/00-comun.js     BLOCKS, constantes (IMG, FONDO, AVATAR, FORM_CSS), helpers de checks y window.EXERCISES = []
src/exercises/0N-*.js         un archivo por bloque (01–06 = UP01–UP06, 07 = ampliación de Grid)
vendor/codemirror/      CodeMirror 5.65.16 (MIT), incrustado en el build
recursos/chuleta-*.pdf    chuletas de HTML (UP01–UP03) y CSS (UP04–UP06) copiadas de los apuntes (markdown-2026/recursos;
                        se generan con assets/tools/md_to_pdf.py --size 8.8pt); enlazadas desde la barra lateral
scripts/build.mjs       concatena todo en index.html
tests/run.mjs           verificación con Playwright
```

El orden de los ejercicios en la app es el orden alfabético de los archivos de `src/exercises/` y, dentro de cada uno, el orden del array.

## Formato de un ejercicio

```js
{
  id: 'navbar-flex',           // único, kebab-case; también es el #hash de la URL y la clave del progreso (no renombrar a la ligera)
  block: 'lay',                // id de BLOCKS: sem | med | form (UP01–03) · sel (UP04) · pos (UP05) · lay (UP06) · grid (ampliación)
  title: 'Barra de navegación con flexbox',
  edit: 'css',                 // qué escribe el alumno: 'html' o 'css'; la otra parte va en solo lectura
  w: 560, h: 130,              // tamaño de la ventana de previsualización (px)
  views: [400, 720],           // opcional: botones de ancho para ejercicios responsive
  tags: ['display:flex', 'gap'],
  brief: '<p>Enunciado en HTML…</p>',
  hint: 'Pista en HTML',
  html: `...`,                 // si edit='html' es el código de partida; si edit='css' es el HTML fijo
  css: `...`,                  // si edit='css' es el código de partida; si edit='html' es el CSS fijo
  sol: `...`,                  // solución de referencia, SOLO de la parte editable
  checks: [ ... ]
}
```

### Comprobaciones (`checks`)

Cada una lleva `d` (descripción en HTML que ve el alumno) y una de estas claves. Se evalúan renderizando el código del alumno y la solución en iframes ocultos y comparándolos.

| clave | qué comprueba |
|---|---|
| `exists: sel` | hay al menos un elemento |
| `count: [sel, n]` / `min: [sel, n]` | número exacto / mínimo |
| `none: sel` | no hay ninguno |
| `attr: [sel, atributo]` | todos los que casan tienen el atributo no vacío |
| `labels: true` | todos los campos de formulario tienen `<label>` asociado |
| `css: [sel, [props]]` | `getComputedStyle` igual que en la solución, elemento a elemento (expande `padding`, `margin`, `border`, `border-radius`, `border-width`, `gap`) |
| `css` + `state: ':hover'` | lo mismo, simulando `:hover`, `:focus` o `:active` en cada elemento (duplica las reglas cambiando la pseudoclase por una clase; sin transiciones) |
| `css` + `pseudo: '::before'` | lo mismo, en un pseudoelemento (`::before`, `::after`, `::first-letter`…); sirve para comparar `content` |
| `rect: sel`, `tol?` | posición y tamaño iguales a la solución (±2 px por defecto) |
| `src: ['css'\|'html', /re/]`, `msg?` | la regex aparece en el código del alumno (sin comentarios) |
| `nosrc: [...]`, `msg?` | la regex NO aparece |
| `js: (U, S, src) => true \| 'mensaje'` | comprobación libre. `U`/`S` = helpers del alumno/solución: `q`, `qa`, `css(el, prop, pseudo?)`, `rect(el)`, `doc` |
| `w: 400` | (en cualquier check) evalúa con la ventana a ese ancho |

Helpers de `00-comun.js` para `js:`: `patternCheck(sel, válidos, inválidos)` compila el `pattern` como el navegador y lo prueba; `rectAfterScroll(sel, y)` compara posiciones tras bajar `y` px (para `sticky`/`fixed`).

Preferencias al diseñar checks:
- Comparar con la solución (`css`, `rect`) mejor que valores literales: así da igual `#fff` o `white`, `rem` o `px`, flex o grid.
- `rect` acepta soluciones distintas que dan el mismo resultado; úsalo para layout.
- `src`/`nosrc` solo para lo que no se ve (usar `var()`, prohibir `!important`, exigir `@media`).
- Los mensajes de error dicen qué falla, no cómo arreglarlo (para eso está la pista).
- Si un check usa `state`, `pseudo` o `js`, añade en `NEGATIVAS` (`tests/run.mjs`) una respuesta equivocada que tenga que suspenderlo: así se garantiza que no aprueba «en vacío».

## Cómo añadir un ejercicio

1. Añádelo al archivo del bloque en `src/exercises/`.
2. Escribe la solución y luego el código de partida (que tenga sentido, no vacío salvo que el ejercicio sea construir desde cero).
3. `npm test -- <id>`: la solución debe pasar todo y el código de partida NO debe pasar todo.
4. Si hay otra forma correcta de resolverlo, añádela a `ALTERNATIVAS` en `tests/run.mjs` para garantizar que también se acepta (y las equivocadas que deban fallar, a `NEGATIVAS`).
5. `npm test` completo antes de hacer commit.

## Convenciones

- Toda la interfaz y los enunciados en **español**, tuteando. Ejercicios prácticos y con contenido realista del ciclo (UP, módulos de DAM, el centro…), nunca lorem ipsum.
- Sin frameworks ni dependencias en tiempo de ejecución salvo CodeMirror. El resultado es **un único HTML** autocontenido.
- Los iframes de previsualización van con `sandbox="allow-same-origin"` (sin scripts ni formularios) y `<base target="_blank">`: el código del alumno no se ejecuta como JS. Además llevan una CSP `frame-src 'none'`: los `<iframe>` del alumno (YouTube, Maps) no se cargan.
- Ejercicios con `edit: 'html'` de documento completo (`<!DOCTYPE>`, `<head>`…): todo acaba dentro del `<body>` de la vista previa, así que `meta`, `title` y `link` se pueden consultar con `qa`; el doctype y `lang`, con `src`.
- Progreso en `localStorage`, clave `lmsgi-trainer-html-css-v1`, formato `{done: {id: true}, code: {id: string}}`. Si cambias el formato, sube la versión de la clave y migra. Todo acceso a `localStorage` va en try/catch.
- Nada de `alert`/`confirm`/`prompt`: usar la función `modal()` de `app.js` (los diálogos nativos no funcionan dentro de Claude).
- `window.__trainer` (`EX`, `evaluate`, `starter`, `store`) lo usan los tests: no lo quites.
- Diseño: tokens de color y fuentes en `:root` de `styles.css`, con tema oscuro. Sergio prefiere que las propuestas visuales vengan como maqueta anotada antes de tocar mucho CSS.

## Estado y pendientes

- 75 ejercicios alineados con el temario de LMSGI 2026/27 (repo de apuntes `markdown-2026`, UP01–UP06, y los apartados de Eniun que enlaza):
  - UP01–03 estructura, texto y enlaces (11) · tablas, multimedia y metadatos (10) · formularios (10)
  - UP04 selectores, texto y modelo de cajas (14) · UP05 display, posición, pseudoclases, tablas y formularios con CSS (14) · UP06 Flexbox y media queries (13)
  - Ampliación: CSS Grid (3). En el temario Grid es solo ampliación de la UP06; por eso este bloque es corto.
- Botón «Aleatorio»: salta a un ejercicio sin resolver al azar.
- Nada pendiente del plan inicial. Las UP07+ (XML, JSON, XPath…) quedan fuera: este entrenador es solo de HTML y CSS.
