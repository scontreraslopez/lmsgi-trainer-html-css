# lmsgi-trainer: HTML & CSS — diseño y estado

**Fecha:** 2026-11-13 · versión 2 · 27 ejercicios

## Decisiones (Sergio)
- Prototipo como artifact en Claude → después, repo en GitHub para alumnos: descargar y abrir `index.html` en el navegador (o GitHub Pages).
- Corrección híbrida: comprobaciones concretas + parecido visual con la solución. No competitivo (sin ranking ni tiempo).
- Cubrir los 4 bloques; afinar con el temario real de LMSGI que pasará Sergio.
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
| `rect: sel, tol?` | posición y tamaño iguales a la solución (±2 px) |
| `src: ['css'|'html', /re/]` / `nosrc` | regex sobre el código (sin comentarios) |
| `js: (U, S, src) => true \| 'mensaje'` | comprobación libre |
| `w: 400` (en cualquier check) | se evalúa a ese ancho de ventana |

Verificación: todas las soluciones pasan sus checks y ningún starter los pasa todos (test Playwright). Alternativas válidas probadas: box-model con width 150, centrado con grid, pie pegado con height 100vh, label envolviendo el input. Flujo de progreso probado: resolver → descargar copia → borrar todo → importar → recargar.

## Banco actual
1. **Semántica, listas, tablas** (8): sopa de divs, receta ul/ol, glosario dl, abbr/time/code/strong, tabla horario (caption, scope), colspan/rowspan, figure/figcaption, migas de pan (aria-current).
2. **Formularios** (4): login, fieldset radios/checkbox, registro con validación HTML5 (pattern, min/max, select, textarea), buscador GET.
3. **Selectores, cascada, box model** (7): botones desde ficha de diseño, caja 200×100 (box-sizing), centrar con margin auto, selectores de atributo y nth-child, especificidad sin !important, tipografía, variables CSS.
4. **Flexbox, Grid, responsive** (8): navbar flex, centrado total, tarjetas flex-wrap, galería grid con span, grid-template-areas, mobile first con @media, pie pegado, contador con position absolute.

## Próximos pasos
- Ajustar al temario real de LMSGI (Sergio lo pasa).
- Más ejercicios por bloque (objetivo: «como un cosaco», 10–15 por bloque) y quizás un modo «aleatorio».
- Migrar a repo: `exercises/*.js` separados, CodeMirror vendorizado (funciona sin internet), abrir con doble clic.