/* ===================== BLOQUE 3 · SELECTORES, CASCADA, BOX MODEL ===================== */
window.EXERCISES.push(
{
  id: 'boton-css', block: 'sel', title: 'Botones a partir de una ficha de diseño', edit: 'css', w: 480, h: 130,
  tags: ['padding', 'background', 'border-radius', 'display'],
  brief: `<p>Diseño te pasa esta ficha. Aplícala:</p>
<ul><li><code>.btn</code>: <code>inline-block</code>, relleno <code>12px 24px</code>, fondo <code>#1d4ed8</code>, texto blanco en negrita 600, sin subrayado, esquinas de <code>8px</code>.</li><li><code>.btn-sec</code>: fondo transparente, texto <code>#1d4ed8</code> y borde de <code>2px</code> sólido del mismo color.</li></ul>`,
  hint: `<code>.btn-sec</code> solo sobrescribe lo que cambia; el resto lo hereda de <code>.btn</code> porque el elemento tiene las dos clases.`,
  html: `<a class="btn" href="#">Matricularme</a>
<a class="btn btn-sec" href="#">Más info</a>`,
  css: `body { margin: 24px; }

.btn {

}
`,
  sol: `body { margin: 24px; }

.btn {
  display: inline-block;
  padding: 12px 24px;
  background: #1d4ed8;
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
}

.btn-sec {
  background: transparent;
  color: #1d4ed8;
  border: 2px solid #1d4ed8;
}`,
  checks: [
    { d: '<code>.btn</code>: display, padding, colores y radio', css: ['.btn:not(.btn-sec)', ['display', 'padding', 'background-color', 'color', 'border-radius']] },
    { d: '<code>.btn</code>: negrita y sin subrayado', css: ['.btn', ['font-weight', 'text-decoration-line']] },
    { d: '<code>.btn-sec</code>: fondo, color y borde', css: ['.btn-sec', ['background-color', 'color', 'border']] },
    { d: 'Tamaño y posición correctos', rect: '.btn' }
  ]
},
{
  id: 'box-model', block: 'sel', title: 'Una caja de 200 × 100, ni un píxel más', edit: 'css', w: 480, h: 200,
  tags: ['box model', 'box-sizing', 'padding', 'border'],
  brief: `<p>La caja tiene que medir <strong>exactamente 200 × 100 px en pantalla</strong>, con <code>20px</code> de relleno y un borde de <code>5px</code>. Ahora mismo mide más. Arréglalo sin quitar ni el relleno ni el borde.</p>`,
  hint: `Por defecto <code>width</code> es solo el contenido (<code>content-box</code>). O cambias a <code>box-sizing: border-box</code>, o restas tú: 200 − 2·20 − 2·5 = 150.`,
  html: `<div class="caja">Soy una caja</div>`,
  css: `body { margin: 24px; }

.caja {
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 5px solid #1d4ed8;
  background: #dbeafe;
}
`,
  sol: `body { margin: 24px; }

.caja {
  box-sizing: border-box;
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 5px solid #1d4ed8;
  background: #dbeafe;
}`,
  checks: [
    { d: 'Mide 200 × 100 en pantalla', rect: '.caja' },
    { d: 'Mantiene relleno de 20px y borde de 5px', css: ['.caja', ['padding', 'border']] },
    { d: 'Mismo fondo', css: ['.caja', ['background-color']] }
  ]
},
{
  id: 'centrar-tarjeta', block: 'sel', title: 'Centrar un bloque', edit: 'css', w: 480, h: 180,
  tags: ['margin auto', 'text-align', 'colapso de márgenes'],
  brief: `<p>Centra la tarjeta en horizontal con márgenes automáticos y deja <code>24px</code> de margen arriba. Su texto va centrado. Quita los márgenes por defecto de <code>h2</code> y <code>p</code>, salvo <code>4px</code> bajo el título.</p>`,
  hint: `<code>margin: 24px auto</code> centra un bloque con anchura fija. <code>text-align: center</code> centra el contenido en línea, no la caja.`,
  html: `<div class="tarjeta">
  <h2>Tutoría colectiva</h2>
  <p>Martes, 16:00 · Aula 12</p>
</div>`,
  css: `body { margin: 0; }

.tarjeta {
  width: 260px;
  padding: 16px;
  background: #f1f5f9;
  border-radius: 10px;
}
`,
  sol: `body { margin: 0; }

.tarjeta {
  width: 260px;
  margin: 24px auto;
  padding: 16px;
  background: #f1f5f9;
  border-radius: 10px;
  text-align: center;
}

.tarjeta h2 { margin: 0 0 4px; }
.tarjeta p { margin: 0; }`,
  checks: [
    { d: 'La tarjeta está centrada y a 24px del borde superior', rect: '.tarjeta' },
    { d: 'Texto centrado', css: ['.tarjeta', ['text-align']] },
    { d: 'Márgenes de <code>h2</code> y <code>p</code>', css: ['.tarjeta > *', ['margin']] },
    { d: 'El título queda en su sitio', rect: '.tarjeta h2' }
  ]
},
{
  id: 'selectores-atributo', block: 'sel', title: 'Selectores sin tocar el HTML', edit: 'css', w: 480, h: 260,
  tags: [':nth-child', 'atributo ^= $=', 'clases'],
  brief: `<p>No puedes añadir clases. Usa solo selectores:</p>
<ul><li><code>.tareas</code> sin viñetas ni sangría; cada tarea con relleno <code>4px 8px</code>.</li><li>Tareas impares con fondo <code>#f1f5f9</code>.</li><li>Las <code>.hecha</code>, tachadas y en color <code>#94a3b8</code>.</li><li>Enlaces externos (empiezan por <code>http</code>) en <code>#059669</code>.</li><li>Enlaces a PDF (acaban en <code>.pdf</code>) en negrita.</li></ul>`,
  hint: `<code>li:nth-child(odd)</code>, <code>a[href^="http"]</code>, <code>a[href$=".pdf"]</code>.`,
  html: `<ul class="tareas">
  <li>Leer la UP03</li>
  <li class="hecha">Instalar VS Code</li>
  <li class="hecha">Hacer la práctica de tablas</li>
  <li>Subir el formulario</li>
  <li>Repasar selectores</li>
</ul>
<p>Material: <a href="https://developer.mozilla.org">MDN</a>, <a href="apuntes.pdf">apuntes.pdf</a> y <a href="#up03">UP03</a>.</p>`,
  css: `body { margin: 16px; font-size: 15px; }

.tareas {

}
`,
  sol: `body { margin: 16px; font-size: 15px; }

.tareas {
  list-style: none;
  padding: 0;
}

.tareas li { padding: 4px 8px; }
.tareas li:nth-child(odd) { background: #f1f5f9; }

.hecha {
  text-decoration: line-through;
  color: #94a3b8;
}

a[href^="http"] { color: #059669; }
a[href$=".pdf"] { font-weight: 700; }`,
  checks: [
    { d: 'Lista sin viñetas ni sangría', css: ['.tareas', ['list-style-type', 'padding-left']] },
    { d: 'Relleno de cada tarea', css: ['.tareas li', ['padding']] },
    { d: 'Fondo en las impares', css: ['.tareas li', ['background-color']] },
    { d: 'Tareas hechas tachadas y en gris', css: ['.tareas li', ['text-decoration-line', 'color']] },
    { d: 'Enlaces externos y PDF', css: ['a', ['color', 'font-weight']] }
  ]
},
{
  id: 'especificidad', block: 'sel', title: 'Gana la cascada sin !important', edit: 'css', w: 480, h: 150,
  tags: ['especificidad', 'cascada', '!important'],
  brief: `<p>El aviso <code>.importante</code> debe tener texto y borde izquierdo en <code>#b91c1c</code>. Las dos reglas que hay no se pueden tocar y no vale <code>!important</code>.</p>`,
  hint: `<code>#contenido p</code> tiene especificidad (1,0,1). <code>.importante</code> solo (0,1,0) y pierde. Necesitas algo como <code>#contenido .importante</code> (1,1,0).`,
  html: `<main id="contenido">
  <p class="aviso">Plazo de la UP03: viernes</p>
  <p class="aviso importante">¡Hoy hay tutoría colectiva!</p>
</main>`,
  css: `body { margin: 16px; }

/* No toques estas dos reglas */
#contenido p { color: #475569; }
.aviso { padding: 8px; border-left: 4px solid #94a3b8; }

/* Tu regla aquí (sin !important) */
.importante { color: #b91c1c; }
`,
  sol: `body { margin: 16px; }

/* No toques estas dos reglas */
#contenido p { color: #475569; }
.aviso { padding: 8px; border-left: 4px solid #94a3b8; }

/* Tu regla aquí (sin !important) */
#contenido .importante {
  color: #b91c1c;
  border-left-color: #b91c1c;
}`,
  checks: [
    { d: 'El aviso importante en rojo', css: ['.aviso', ['color']] },
    { d: 'Borde izquierdo rojo solo en el importante', css: ['.aviso', ['border-left-color', 'border-left-width', 'padding']] },
    { d: 'Sin <code>!important</code>', nosrc: ['css', /!\s*important/i], msg: 'Has usado !important' },
    { d: 'Las dos reglas originales siguen ahí', src: ['css', /#contenido\s+p\s*\{\s*color:\s*#475569;?\s*\}[\s\S]*\.aviso\s*\{\s*padding:\s*8px;\s*border-left:\s*4px solid #94a3b8;?\s*\}/], msg: 'Has modificado #contenido p o .aviso' }
  ]
},
{
  id: 'tipografia', block: 'sel', title: 'Tipografía de un artículo', edit: 'css', w: 480, h: 300,
  tags: ['font-family', 'rem/em', 'line-height', 'letter-spacing', 'ch'],
  brief: `<p>Ficha tipográfica:</p>
<ul><li><code>article</code>: ancho máximo <code>42ch</code>, fuente <code>Georgia, serif</code>.</li><li><code>h1</code>: <code>1.75rem</code>, interlineado <code>1.2</code>, sin márgenes.</li><li>Párrafos: interlineado <code>1.6</code>, sin márgenes.</li><li><code>.meta</code>: <code>system-ui, sans-serif</code>, <code>0.75rem</code>, mayúsculas, espaciado de letras <code>0.08em</code>, color <code>#64748b</code>, margen <code>4px 0 12px</code>.</li></ul>`,
  hint: `Las mayúsculas se hacen con <code>text-transform: uppercase</code>, no reescribiendo el texto. Cuidado con el orden: si pones <code>p { margin: 0 }</code> después de <code>.meta</code> no pasa nada, porque la clase es más específica.`,
  html: `<article>
  <h1>Introducción a CSS</h1>
  <p class="meta">UP03 · 10 min de lectura</p>
  <p>CSS describe cómo se presentan los documentos HTML. Separar contenido y presentación permite reutilizar estilos y mantener el código.</p>
</article>`,
  css: `body { margin: 24px; }

article {

}
`,
  sol: `body { margin: 24px; }

article {
  max-width: 42ch;
  font-family: Georgia, serif;
}

h1 {
  font-size: 1.75rem;
  line-height: 1.2;
  margin: 0;
}

p {
  line-height: 1.6;
  margin: 0;
}

.meta {
  font-family: system-ui, sans-serif;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #64748b;
  margin: 4px 0 12px;
}`,
  checks: [
    { d: 'Fuente del artículo', css: ['article', ['font-family']] },
    { d: 'Ancho máximo del artículo', rect: 'article' },
    { d: 'Título: tamaño, interlineado y márgenes', css: ['h1', ['font-size', 'line-height', 'margin']] },
    { d: '<code>.meta</code>: fuente, tamaño, mayúsculas, espaciado y color', css: ['.meta', ['font-family', 'font-size', 'text-transform', 'letter-spacing', 'color', 'margin']] },
    { d: 'Párrafos con interlineado 1.6', css: ['p:not(.meta)', ['line-height', 'margin']] },
    { d: 'Todo cae en su sitio', rect: 'article > *' }
  ]
},
{
  id: 'variables-css', block: 'sel', title: 'Etiquetas con variables CSS', edit: 'css', w: 480, h: 110,
  tags: [':root', 'custom properties', 'var()'],
  brief: `<p>Define en <code>:root</code> las variables <code>--html: #e34c26</code>, <code>--css: #264de4</code>, <code>--js: #f0db4f</code> y <code>--radio: 999px</code>, y úsalas con <code>var()</code>:</p>
<ul><li><code>.badge</code>: <code>inline-block</code>, relleno <code>4px 12px</code>, radio <code>var(--radio)</code>, fondo <code>var(--html)</code>, texto blanco en negrita 700, tamaño <code>14px</code>.</li><li><code>.badge-css</code> y <code>.badge-js</code> cambian el fondo. La de JS lleva texto <code>#1f2937</code>.</li></ul>`,
  hint: `<code>:root { --html: #e34c26; }</code> y luego <code>background: var(--html);</code>.`,
  html: `<span class="badge">HTML</span>
<span class="badge badge-css">CSS</span>
<span class="badge badge-js">JS</span>`,
  css: `body { margin: 24px; }

:root {

}
`,
  sol: `body { margin: 24px; }

:root {
  --html: #e34c26;
  --css: #264de4;
  --js: #f0db4f;
  --radio: 999px;
}

.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: var(--radio);
  background: var(--html);
  color: #fff;
  font-weight: 700;
  font-size: 14px;
}

.badge-css { background: var(--css); }
.badge-js { background: var(--js); color: #1f2937; }`,
  checks: [
    { d: 'Variables <code>--html</code>, <code>--css</code>, <code>--js</code> y <code>--radio</code> en <code>:root</code>', js: (U) => { const cs = U.doc.defaultView.getComputedStyle(U.doc.documentElement); const miss = ['--html', '--css', '--js', '--radio'].filter((v) => cs.getPropertyValue(v).trim() === ''); return miss.length === 0 || 'Faltan: ' + miss.join(', '); } },
    { d: 'Usas <code>var()</code> al menos 4 veces', js: (U, S, src) => (src.css.match(/var\(\s*--/g) || []).length >= 4 || 'Solo ' + (src.css.match(/var\(\s*--/g) || []).length + ' usos de var()' },
    { d: 'Colores de fondo y texto de cada etiqueta', css: ['.badge', ['background-color', 'color']] },
    { d: 'Forma: display, relleno, radio, tipografía', css: ['.badge', ['display', 'padding', 'border-radius', 'font-weight', 'font-size']] }
  ]
}
);
