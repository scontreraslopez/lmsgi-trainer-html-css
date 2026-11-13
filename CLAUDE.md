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

`index.html` se versiona: los alumnos descargan el repo y lo abren con doble clic, sin Node.

## Estructura

```
src/shell.html          esqueleto HTML con marcadores (@STYLES, @EXERCISES, @APP, @CODEMIRROR_*)
src/styles.css          estilos de la app (tokens en :root, tema claro y oscuro)
src/app.js              motor: editores, vistas previas, corrección, progreso, diálogos
src/exercises/00-comun.js     BLOCKS, constantes compartidas (IMG, FORM_CSS) y window.EXERCISES = []
src/exercises/0N-*.js         un archivo por bloque; cada uno hace window.EXERCISES.push(...)
vendor/codemirror/      CodeMirror 5.65.16 (MIT), incrustado en el build
scripts/build.mjs       concatena todo en index.html
tests/run.mjs           verificación con Playwright
```

El orden de los ejercicios en la app es el orden alfabético de los archivos de `src/exercises/` y, dentro de cada uno, el orden del array.

## Formato de un ejercicio

```js
{
  id: 'navbar-flex',           // único, kebab-case; también es el #hash de la URL y la clave del progreso (no renombrar a la ligera)
  block: 'lay',                // id de BLOCKS: sem | form | sel | lay
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
| `rect: sel`, `tol?` | posición y tamaño iguales a la solución (±2 px por defecto) |
| `src: ['css'\|'html', /re/]`, `msg?` | la regex aparece en el código del alumno (sin comentarios) |
| `nosrc: [...]`, `msg?` | la regex NO aparece |
| `js: (U, S, src) => true \| 'mensaje'` | comprobación libre. `U`/`S` = helpers del alumno/solución: `q`, `qa`, `css(el, prop)`, `rect(el)`, `doc` |
| `w: 400` | (en cualquier check) evalúa con la ventana a ese ancho |

Preferencias al diseñar checks:
- Comparar con la solución (`css`, `rect`) mejor que valores literales: así da igual `#fff` o `white`, `rem` o `px`, flex o grid.
- `rect` acepta soluciones distintas que dan el mismo resultado; úsalo para layout.
- `src`/`nosrc` solo para lo que no se ve (usar `var()`, prohibir `!important`, exigir `@media`).
- Los mensajes de error dicen qué falla, no cómo arreglarlo (para eso está la pista).

## Cómo añadir un ejercicio

1. Añádelo al archivo del bloque en `src/exercises/`.
2. Escribe la solución y luego el código de partida (que tenga sentido, no vacío salvo que el ejercicio sea construir desde cero).
3. `npm test -- <id>`: la solución debe pasar todo y el código de partida NO debe pasar todo.
4. Si hay otra forma correcta de resolverlo, añádela a `ALTERNATIVAS` en `tests/run.mjs` para garantizar que también se acepta.
5. `npm test` completo antes de hacer commit.

## Convenciones

- Toda la interfaz y los enunciados en **español**, tuteando. Ejercicios prácticos y con contenido realista del ciclo (UP, módulos de DAM, el centro…), nunca lorem ipsum.
- Sin frameworks ni dependencias en tiempo de ejecución salvo CodeMirror. El resultado es **un único HTML** autocontenido.
- Los iframes de previsualización van con `sandbox="allow-same-origin"` (sin scripts ni formularios) y `<base target="_blank">`: el código del alumno no se ejecuta como JS.
- Progreso en `localStorage`, clave `lmsgi-trainer-html-css-v1`, formato `{done: {id: true}, code: {id: string}}`. Si cambias el formato, sube la versión de la clave y migra. Todo acceso a `localStorage` va en try/catch.
- Nada de `alert`/`confirm`/`prompt`: usar la función `modal()` de `app.js` (los diálogos nativos no funcionan dentro de Claude).
- `window.__trainer` (`EX`, `evaluate`, `starter`, `store`) lo usan los tests: no lo quites.
- Diseño: tokens de color y fuentes en `:root` de `styles.css`, con tema oscuro. Sergio prefiere que las propuestas visuales vengan como maqueta anotada antes de tocar mucho CSS.

## Estado y pendientes

- 27 ejercicios en 4 bloques (semántica/listas/tablas 8, formularios 4, selectores/cascada/box model 7, flex/grid/responsive 8).
- Pendiente: ajustar al temario real de LMSGI, llegar a 10–15 ejercicios por bloque y quizá un modo aleatorio.
