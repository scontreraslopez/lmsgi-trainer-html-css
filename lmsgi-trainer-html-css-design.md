# lmsgi-trainer: HTML & CSS — diseño y estado

**Fecha:** 2026-11-22 · versión 3 · 75 ejercicios

## Decisiones (Sergio)
- Prototipo como artifact en Claude → después, repo en GitHub para alumnos: descargar y abrir `index.html` en el navegador (o GitHub Pages).
- Corrección híbrida: comprobaciones concretas + parecido visual con la solución. No competitivo (sin ranking ni tiempo).
- Bloques alineados con el temario real de LMSGI 2026/27 (UP01–UP06 de `markdown-2026` y los apartados de Eniun que enlaza). Grid, que en el temario es ampliación, va en un bloque aparte.
- El progreso se guarda; reiniciar todo exige confirmación con aviso «¡Cuidado! Se borrará todo el progreso».

## Cómo funciona
- Cada ejercicio fija una parte (HTML o CSS, en solo lectura) y el alumno escribe la otra.
- Dos paneles: «Tu resultado» y «Objetivo» (lado a lado o apilados según tamaño) + modo «Superponer» con cortina al mover el ratón.
- Selector de ancho de pantalla para ejercicios responsive (`views`).
- Comprobaciones en vivo (debounce 300 ms) en iframes ocultos (`srcdoc`, sandbox `allow-same-origin` sin scripts); se renderizan usuario y solución y se comparan.
- «Parecido de maquetación»: IoU medio de las cajas de cada elemento (por orden en el DOM) frente a la solución.
- Hash = id del ejercicio (enlaces directos, ej. `#navbar-flex`).
- Editor CodeMirror 5.65.16 (cdnjs); si no carga, textarea. Para uso offline en el repo: vendorizar CodeMirror.

## Progreso
- localStorage del navegador, clave `lmsgi-trainer-html-css-v1` → `{done: {id: true}, code: {id: "código"}}`. Solo en ese navegador/ordenador.
- Botón «Mi progreso» (barra superior): resumen, descargar copia `.json`, copiar al portapapeles, importar copia (se combina: resueltos se suman, el código de la copia sustituye), zona peligrosa «Borrar todo el progreso» con diálogo de confirmación.
- Reiniciar un ejercicio y cargar la solución también piden confirmación (diálogo `<dialog>`; `confirm()` no funciona en el visor de Claude).
- Descarga: dentro de Claude usa la capacidad `downloads` (declarada); abierto como archivo local usa un enlace blob normal.
- Si el navegador bloquea localStorage aparece la pastilla «Sin guardado».
- Formato de copia: `{app: 'lmsgi-trainer-html-css', version: 1, exported, done, code}`.

## Formato de un ejercicio
```js
{
  id, block: 'sem'|'form'|'sel'|'lay', title, edit: 'html'|'css', w, h, views?: [400, 720],
  tags: [...], brief: '<p>HTML del enunciado</p>', hint: 'HTML',
  html: '...',  // starter si edit='html'; fijo si edit='css'
  css:  '...',  // starter si edit='css'; fijo si edit='html'
  sol:  '...',  // solo la parte editable
  checks: [ ... ]
}
```
### Tipos de comprobación
| clave | qué hace |
|---|---|
| `exists: sel` | existe al menos uno |
| `count: [sel, n]` / `min: [sel, n]` | número exacto / mínimo |
| `none: sel` | no debe existir |
| `attr: [sel, atributo]` | todos tienen el atributo no vacío |
| `labels: true` | todo campo de formulario tiene `<label>` asociado |
| `css: [sel, [props]]` | estilos computados iguales a la solución (expande padding, margin, border, border-radius, gap) |
| `css` + `state: ':hover'` | ídem simulando `:hover`/`:focus`/`:active` (reglas duplicadas con una clase de la misma especificidad, sin transiciones) |
| `css` + `pseudo: '::before'` | ídem en un pseudoelemento (`content` incluido) |
| `rect: sel, tol?` | posición y tamaño iguales a la solución (±2 px) |
| `src: ['css'|'html', /re/]` / `nosrc` | regex sobre el código (sin comentarios) |
| `js: (U, S, src) => true \| 'mensaje'` | comprobación libre |
| `w: 400` (en cualquier check) | se evalúa a ese ancho de ventana |

Verificación: todas las soluciones pasan sus checks y ningún starter los pasa todos (test Playwright). `ALTERNATIVAS`: soluciones distintas que también deben aprobar (box-model con width 150, centrado con grid, menú con float + overflow, clearfix, planes con grid…). `NEGATIVAS`: respuestas equivocadas que deben suspender un check concreto (sin `:hover`, sin `::first-letter`, `absolute` en vez de `fixed`, `pattern` demasiado permisivo…), para que los checks de estados, pseudoelementos y scroll no aprueben en vacío. Flujo de progreso probado: resolver → descargar copia → borrar todo → importar → recargar.

## Banco actual
1. **UP01–03 · Estructura, texto y enlaces** (11): sopa de divs, receta ul/ol, ol type/start anidadas, glosario dl, abbr/time/code/strong, sup/sub/kbd/mark/small, blockquote/q/cite, div y span, enlaces (_blank, mailto, tel, download), índice con marcadores, migas de pan.
2. **UP02–03 · Tablas, multimedia y metadatos** (10): horario (caption, scope), colspan/rowspan, tfoot, figure/figcaption, miniaturas enlazadas (width/height, alt), video/source/audio, limpiar iframes de YouTube y Maps, head completo (charset, viewport, description, author, favicon), SEO (un h1, jerarquía, alt, texto de enlace), ficha técnica (actividad 1 de la UP02).
3. **UP02–03 · Formularios** (10): suscripción (actividad 2 de la UP02), login, radios/checkbox, tipos de input, registro, patrones, optgroup/datalist, readonly/disabled/maxlength/reset, consulta completa (al estilo de la práctica de la UP03), buscador GET.
4. **UP04 · Selectores, texto y cajas** (14): selectores básicos, combinadores, especificidad, unidades, fondos (cover, rgba), propiedades de texto, tipografía, listas con CSS, box-sizing, centrar, max-width/min-height, bordes y sombras, botones, tarjetas inline-block (formato examen).
5. **UP05 · Display, posición y pseudoclases** (14): display/visibility, huecos de inline-block, menú horizontal, menú vertical, atributos y nth-child, pseudoelementos, tablas con CSS, hover/focus/transition, formularios con CSS, overflow y ellipsis, float y clearfix, contador absolute, z-index, sticky y fixed.
6. **UP06 · Flexbox y media queries** (13): navbar, justify-content, centrado, columna, flex-wrap, flex: 0 0 / flex: 1, order/align-self, pie pegado, variables CSS, sombras/cursor/transform, mobile first, cabecera responsive (actividad de la UP06), campos en fila.
7. **Ampliación · CSS Grid** (3): galería con span, grid-template-areas, auto-fill + minmax.

Botón **Aleatorio** en la cabecera: va a un ejercicio sin resolver al azar.

## Próximos pasos
- Ir añadiendo ejercicios cuando se cierren las actividades de la UP05 y la UP06 (hay TODO en sus apuntes).
