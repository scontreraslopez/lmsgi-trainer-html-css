/* ===================== BLOQUE · UP04 · SELECTORES, TEXTO Y MODELO DE CAJAS ===================== */
window.EXERCISES.push(
{
  id: 'selectores-basicos', block: 'sel', title: 'Universal, etiqueta, clase, id y grupo', edit: 'css', w: 480, h: 260,
  tags: ['*', 'etiqueta', '.clase', '#id', 'a, b', 'descendiente'],
  brief: `<p>Sin tocar el HTML, aplica estos estilos eligiendo el selector adecuado para cada uno:</p>
<ol><li><strong>Todos</strong> los elementos, sin margen.</li><li>Los párrafos, en color <code>#334155</code> y con <code>8px</code> de relleno vertical (<code>padding: 8px 0</code>).</li><li>Los <code>h1</code> y <code>h2</code>, en <strong>una sola regla</strong>: fuente <code>Georgia, serif</code> y color <code>#9a3412</code>.</li><li>La cabecera (tiene <code>id="cabecera"</code>): fondo <code>#1e293b</code> y relleno de <code>12px</code>.</li><li>El logo (clase <code>logo</code>) en blanco, y la palabra «Granito», que es un <code>&lt;span&gt;</code> dentro del logo, en <code>#f97316</code>.</li><li>Los párrafos con la clase <code>aviso</code>, en <code>#b91c1c</code> y negrita.</li></ol>`,
  hint: `<code>*</code> · <code>p</code> · <code>h1, h2</code> · <code>#cabecera</code> · <code>.logo span</code> · <code>.aviso</code>. Si el aviso no se pone rojo, mira qué regla va después: con el mismo peso gana la última, pero <code>.aviso</code> pesa más que <code>p</code>.`,
  html: `<header id="cabecera">
  <p class="logo">Club <span>Granito</span></p>
</header>
<h1>Próximas salidas</h1>
<h2>Sábado: Sierra de Bernia</h2>
<p>Ruta de nivel medio. Salimos a las 8:00 desde el instituto.</p>
<h2>Domingo: Ponoch</h2>
<p class="aviso">Plazas agotadas.</p>`,
  css: `body { font-size: 15px; }

/* 1. Todos los elementos */

/* 2. Párrafos */

/* 3. h1 y h2 (una sola regla) */

/* 4. Cabecera */

/* 5. Logo y «Granito» */

/* 6. Avisos */
`,
  sol: `body { font-size: 15px; }

/* 1. Todos los elementos */
* { margin: 0; }

/* 2. Párrafos */
p { color: #334155; padding: 8px 0; }

/* 3. h1 y h2 (una sola regla) */
h1, h2 { font-family: Georgia, serif; color: #9a3412; }

/* 4. Cabecera */
#cabecera { background: #1e293b; padding: 12px; }

/* 5. Logo y «Granito» */
.logo { color: #fff; }
.logo span { color: #f97316; }

/* 6. Avisos */
.aviso { color: #b91c1c; font-weight: 700; }`,
  checks: [
    { d: 'Selector universal para quitar los márgenes', src: ['css', /(^|[\s}])\*\s*\{[^}]*margin\s*:\s*0/], msg: 'No veo * { margin: 0 }' },
    { d: 'Ningún elemento tiene margen', css: ['body, body *', ['margin']] },
    { d: '<code>h1</code> y <code>h2</code> en una sola regla', src: ['css', /\bh1\s*,\s*h2\b|\bh2\s*,\s*h1\b/], msg: 'Agrupa h1 y h2 en el mismo selector' },
    { d: 'Fuente y color de los títulos', css: ['h1, h2', ['font-family', 'color']] },
    { d: 'Párrafos: color y relleno', css: ['p:not(.logo)', ['color', 'padding']] },
    { d: 'Cabecera: fondo y relleno', css: ['#cabecera', ['background-color', 'padding']] },
    { d: 'Logo blanco con «Granito» en naranja', css: ['.logo, .logo span', ['color']] },
    { d: 'Aviso en rojo y negrita', css: ['.aviso', ['color', 'font-weight']] }
  ]
},
{
  id: 'combinadores', block: 'sel', title: 'Hijos, hermanos y descendientes', edit: 'css', w: 480, h: 300,
  tags: ['a > b', 'a + b', 'a ~ b'],
  brief: `<p>Sin añadir clases al HTML, usa <strong>combinadores</strong>:</p>
<ul><li>Solo los párrafos <strong>hijos directos</strong> de <code>.noticia</code> (no el que está dentro de <code>.extra</code>) en color <code>#475569</code>.</li><li>El párrafo que va <strong>justo después</strong> del <code>h2</code> (la entradilla), en negrita.</li><li>Todos los elementos del menú que van <strong>después</strong> del <code>.activo</code>, en <code>#94a3b8</code>.</li></ul>`,
  hint: `<code>.noticia &gt; p</code>, <code>h2 + p</code> y <code>.activo ~ li</code>.`,
  html: `<article class="noticia">
  <h2>Nueva vía en el Espolón norte</h2>
  <p>Ya se puede escalar «Cresta del alba», un 6b de 35 metros.</p>
  <p>La equiparon dos socios del club durante el verano.</p>
  <div class="extra">
    <p>Foto: archivo del club.</p>
  </div>
</article>
<ul class="menu">
  <li>Inicio</li>
  <li class="activo">Rutas</li>
  <li>Cursos</li>
  <li>Contacto</li>
</ul>`,
  css: `body { margin: 16px; font-size: 15px; color: #0f172a; }
h2 { margin: 0 0 6px; font-size: 18px; }
p { margin: 0 0 6px; }
.extra { font-size: 13px; }
.menu { display: flex; gap: 16px; list-style: none; padding: 0; }
.activo { text-decoration: underline; }
`,
  sol: `body { margin: 16px; font-size: 15px; color: #0f172a; }
h2 { margin: 0 0 6px; font-size: 18px; }
p { margin: 0 0 6px; }
.extra { font-size: 13px; }
.menu { display: flex; gap: 16px; list-style: none; padding: 0; }
.activo { text-decoration: underline; }

.noticia > p { color: #475569; }
h2 + p { font-weight: 700; }
.activo ~ li { color: #94a3b8; }`,
  checks: [
    { d: 'Color de los párrafos (y el de <code>.extra</code> sin tocar)', css: ['p', ['color']] },
    { d: 'Solo la entradilla en negrita', css: ['p', ['font-weight']] },
    { d: 'Elementos del menú posteriores al activo', css: ['.menu li', ['color']] },
    { d: 'Usas los combinadores <code>&gt;</code>, <code>+</code> y <code>~</code>', js: (U, S, src) => { const miss = [['>', />/], ['+', /\+/], ['~', /~/]].filter(([, re]) => !re.test(src.css)).map(([s]) => s); return miss.length === 0 || 'Te falta usar: ' + miss.join(' '); } }
  ]
},
{id: 'especificidad', block: 'sel', title: 'Gana la cascada sin !important', edit: 'css', w: 480, h: 150,
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
  ]},
{
  id: 'unidades-medida', block: 'sel', title: 'px, rem, em, % y vh', edit: 'css', w: 480, h: 260,
  tags: ['vh', 'rem', 'em', '%'],
  brief: `<p>Portada del club de robótica. Usa la unidad que se indica:</p>
<ul><li><code>.portada</code>: alto de <strong>toda la ventana</strong> (<code>100vh</code>) y un relleno del <code>5%</code> (del ancho).</li><li><code>h1</code>: <code>2.5rem</code> y sin margen. <code>p</code>: <code>1.25rem</code>.</li><li><code>.boton</code>: tamaño <code>1rem</code> y relleno <code>0.5em 1em</code>: así el relleno crece si algún día cambia la letra del botón.</li></ul>`,
  hint: `<code>rem</code> se calcula con la letra de <code>&lt;html&gt;</code> (16 px): 2.5rem = 40 px. <code>em</code> usa la del propio elemento. El relleno en <code>%</code> siempre se calcula con el <strong>ancho</strong> del padre.`,
  html: `<section class="portada">
  <h1>Club de robótica</h1>
  <p>Jueves de 16:00 a 18:00 · Aula 21</p>
  <a class="boton" href="#">Apúntate</a>
</section>`,
  css: `body { margin: 0; }

.portada {
  box-sizing: border-box;
  background: #0f172a;
  color: #fff;
}

.boton {
  display: inline-block;
  background: #22c55e;
  color: #0f172a;
  font-weight: 700;
  text-decoration: none;
  border-radius: 6px;
}
`,
  sol: `body { margin: 0; }

.portada {
  box-sizing: border-box;
  height: 100vh;
  padding: 5%;
  background: #0f172a;
  color: #fff;
}

h1 { font-size: 2.5rem; margin: 0; }
p { font-size: 1.25rem; }

.boton {
  display: inline-block;
  font-size: 1rem;
  padding: 0.5em 1em;
  background: #22c55e;
  color: #0f172a;
  font-weight: 700;
  text-decoration: none;
  border-radius: 6px;
}`,
  checks: [
    { d: 'La portada ocupa toda la ventana', rect: '.portada' },
    { d: 'Relleno del 5 % del ancho', css: ['.portada', ['padding']] },
    { d: 'Tamaños de letra', css: ['h1, p, .boton', ['font-size']] },
    { d: 'Relleno del botón', css: ['.boton', ['padding']] },
    { d: 'Usas <code>vh</code>, <code>rem</code>, <code>em</code> y <code>%</code>', js: (U, S, src) => { const miss = [['vh', /\dvh\b/], ['rem', /\drem\b/], ['em', /\dem\b/], ['%', /\d%/]].filter(([, re]) => !re.test(src.css)).map(([u]) => u); return miss.length === 0 || 'Te falta usar: ' + miss.join(', '); } }
  ]
},
{
  id: 'colores-fondo', block: 'sel', title: 'Imagen de fondo que cubre la caja', edit: 'css', w: 480, h: 240,
  tags: ['background-size: cover', 'background-position', 'rgba', 'hex'],
  brief: `<p>La llamada a la acción ya tiene su imagen de fondo, pero sale repetida en mosaico. Arréglalo:</p>
<ul><li>La imagen <strong>cubre</strong> toda la caja, centrada y sin repetirse.</li><li>El texto de <code>.cta</code> es blanco y la caja de dentro (<code>.caja</code>) tiene fondo blanco con un <strong>85 % de opacidad</strong> (<code>rgba</code>) y texto <code>#1e293b</code>.</li><li>El título va en <code>#b45309</code>.</li></ul>`,
  hint: `<code>background-size: cover; background-position: center; background-repeat: no-repeat;</code>. El blanco al 85 %: <code>rgba(255, 255, 255, 0.85)</code>.`,
  html: `<section class="cta">
  <div class="caja">
    <h2>Curso de iniciación</h2>
    <p>Dos fines de semana en diciembre. ¡Plazas limitadas!</p>
  </div>
</section>`,
  css: `body { margin: 0; }

.cta {
  padding: 40px 24px;
  text-align: center;
  background-image: url("${FONDO}");
}

.caja {
  max-width: 300px;
  margin: 0 auto;
  padding: 12px 16px;
  border-radius: 8px;
}

.caja h2 { margin: 0 0 4px; }
.caja p { margin: 0; }
`,
  sol: `body { margin: 0; }

.cta {
  padding: 40px 24px;
  text-align: center;
  background-image: url("${FONDO}");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #fff;
}

.caja {
  max-width: 300px;
  margin: 0 auto;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.85);
  color: #1e293b;
}

.caja h2 { margin: 0 0 4px; color: #b45309; }
.caja p { margin: 0; }`,
  checks: [
    { d: 'La imagen cubre la caja, centrada y sin repetir', css: ['.cta', ['background-size', 'background-position-x', 'background-position-y', 'background-repeat']] },
    { d: 'Sigue la misma imagen de fondo', css: ['.cta', ['background-image']] },
    { d: 'Texto blanco en <code>.cta</code>', css: ['.cta', ['color']] },
    { d: 'Caja blanca semitransparente con texto oscuro', css: ['.caja', ['background-color', 'color']] },
    { d: 'Título en <code>#b45309</code>', css: ['.caja h2', ['color']] }
  ]
},
{
  id: 'texto-propiedades', block: 'sel', title: 'Propiedades de texto', edit: 'css', w: 480, h: 330,
  tags: ['text-align', 'text-indent', 'text-transform', 'text-decoration', 'line-height'],
  brief: `<p>Dale formato a la noticia solo con propiedades de texto:</p>
<ul><li><code>h2</code>: centrado, en mayúsculas, <strong>subrayado</strong> y con <code>2px</code> entre letras.</li><li>Párrafos: justificados, sangría de primera línea de <code>2em</code> e interlineado <code>1.5</code>.</li><li><code>.firma</code>: alineada a la derecha, en cursiva y sin sangría.</li><li>El enlace, sin subrayado.</li></ul>`,
  hint: `<code>text-align</code>, <code>text-transform: uppercase</code>, <code>text-decoration: underline</code>, <code>letter-spacing</code>, <code>text-indent</code>, <code>line-height</code> y <code>font-style: italic</code>. Escribir el título en mayúsculas en el HTML no vale: eso es presentación.`,
  html: `<article>
  <h2>Jornada de puertas abiertas</h2>
  <p>El próximo sábado el instituto abre sus aulas a las familias y a los futuros alumnos. Habrá demostraciones de los proyectos de segundo de DAM y del club de robótica, y el profesorado resolverá dudas sobre la modalidad semipresencial.</p>
  <p>Toda la información está en la <a href="#">web del centro</a>.</p>
  <p class="firma">Departamento de Informática</p>
</article>`,
  css: `body { margin: 16px; font-size: 14px; }
h2 { font-size: 18px; margin: 0 0 8px; }
p { margin: 0 0 6px; }
a { color: #1d4ed8; }
`,
  sol: `body { margin: 16px; font-size: 14px; }
h2 { font-size: 18px; margin: 0 0 8px; }
p { margin: 0 0 6px; }
a { color: #1d4ed8; }

h2 {
  text-align: center;
  text-transform: uppercase;
  text-decoration: underline;
  letter-spacing: 2px;
}

p {
  text-align: justify;
  text-indent: 2em;
  line-height: 1.5;
}

.firma {
  text-align: right;
  font-style: italic;
  text-indent: 0;
}

a { text-decoration: none; }`,
  checks: [
    { d: 'Título centrado, en mayúsculas y subrayado', css: ['h2', ['text-align', 'text-transform', 'text-decoration-line']] },
    { d: 'Espaciado entre letras del título', css: ['h2', ['letter-spacing']] },
    { d: 'Párrafos justificados con sangría e interlineado', css: ['p:not(.firma)', ['text-align', 'text-indent', 'line-height']] },
    { d: 'Firma a la derecha, en cursiva y sin sangría', css: ['.firma', ['text-align', 'font-style', 'text-indent']] },
    { d: 'Enlace sin subrayado', css: ['a', ['text-decoration-line']] },
    { d: 'El texto del título sigue en minúsculas en el HTML', js: (U) => U.q('h2').textContent === 'Jornada de puertas abiertas' }
  ]
},
{id: 'tipografia', block: 'sel', title: 'Tipografía de un artículo', edit: 'css', w: 480, h: 300,
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
  ]},
{
  id: 'listas-css', block: 'sel', title: 'Viñetas y numeración con CSS', edit: 'css', w: 480, h: 360,
  tags: ['list-style-type', 'list-style-position', 'list-style: none'],
  brief: `<p>En la UP03 cambiábamos las viñetas con atributos de HTML. La forma moderna es CSS:</p>
<ul><li><code>.material</code>: viñetas cuadradas.</li><li><code>.unidades</code>: números romanos en mayúscula.</li><li><code>.pasos</code>: letras minúsculas, con el marcador <strong>dentro</strong> de la caja (fíjate en el borde).</li><li><code>.etiquetas</code>: sin marcador y sin la sangría que deja la lista.</li></ul>`,
  hint: `<code>list-style-type</code>: <code>square</code>, <code>upper-roman</code>, <code>lower-alpha</code>, <code>none</code>. <code>list-style-position: inside</code>. La sangría es el <code>padding-left</code> de la lista.`,
  html: `<ul class="material">
  <li>Portátil</li>
  <li>Cuaderno</li>
</ul>
<ol class="unidades">
  <li>Lenguajes de marcas</li>
  <li>HTML I</li>
  <li>HTML II</li>
</ol>
<ol class="pasos">
  <li>Descarga el ZIP</li>
  <li>Descomprímelo</li>
</ol>
<ul class="etiquetas">
  <li>#html</li>
  <li>#css</li>
</ul>`,
  css: `body { margin: 16px; font-size: 14px; }
ul, ol { margin: 0 0 10px; }
.pasos { border: 1px solid #94a3b8; border-radius: 6px; padding: 6px 12px; }
.etiquetas li { display: inline-block; margin-right: 6px; padding: 2px 8px; background: #e0e7ff; border-radius: 999px; }
`,
  sol: `body { margin: 16px; font-size: 14px; }
ul, ol { margin: 0 0 10px; }
.pasos { border: 1px solid #94a3b8; border-radius: 6px; padding: 6px 12px; }
.etiquetas li { display: inline-block; margin-right: 6px; padding: 2px 8px; background: #e0e7ff; border-radius: 999px; }

.material { list-style-type: square; }
.unidades { list-style-type: upper-roman; }
.pasos {
  list-style-type: lower-alpha;
  list-style-position: inside;
}
.etiquetas {
  list-style: none;
  padding-left: 0;
}`,
  checks: [
    { d: 'Viñetas cuadradas', css: ['.material', ['list-style-type']] },
    { d: 'Romanos en mayúscula', css: ['.unidades', ['list-style-type']] },
    { d: 'Letras minúsculas con el marcador dentro', css: ['.pasos', ['list-style-type', 'list-style-position']] },
    { d: 'Etiquetas sin marcador ni sangría', css: ['.etiquetas', ['list-style-type', 'padding-left']] },
    { d: 'Todo en su sitio', rect: 'li' }
  ]
},
{id: 'box-model', block: 'sel', title: 'Una caja de 200 × 100, ni un píxel más', edit: 'css', w: 480, h: 200,
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
  ]},
{id: 'centrar-tarjeta', block: 'sel', title: 'Centrar un bloque', edit: 'css', w: 480, h: 180,
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
  ]},
{
  id: 'tamanos-max-width', block: 'sel', title: 'Anchos que se adaptan', edit: 'css', w: 480, h: 360, views: [360, 480],
  tags: ['width %', 'max-width', 'min-height', 'img max-width'],
  brief: `<p>El contenido debe verse bien en un móvil y en una pantalla más ancha (prueba los dos anchos):</p>
<ul><li><code>.contenido</code>: el <code>90%</code> del ancho, pero como mucho <code>400px</code>, y centrado.</li><li>La imagen nunca se sale de su contenedor y no se deforma.</li><li><code>.aviso</code>: al menos <code>80px</code> de alto, pero que crezca si el texto no cabe.</li></ul>`,
  hint: `<code>width: 90%; max-width: 400px; margin: 0 auto;</code>. Para la imagen: <code>max-width: 100%; height: auto;</code> (su <code>height</code> del HTML la deformaría). <code>min-height</code> pone un mínimo sin cortar el contenido.`,
  html: `<div class="contenido">
  <h2>Salida al Puig Campana</h2>
  <img src="${IMG}" alt="Montaña con el sol detrás" width="600" height="350">
  <p class="aviso">Trae agua, calzado de montaña y algo de comer.</p>
</div>`,
  css: `body { margin: 16px; font-size: 14px; }
.contenido { background: #f8fafc; }
h2 { margin: 0 0 8px; font-size: 18px; }
img { display: block; }
.aviso { margin: 8px 0 0; padding: 8px; background: #fef3c7; border-radius: 6px; }
`,
  sol: `body { margin: 16px; font-size: 14px; }
.contenido { background: #f8fafc; }
h2 { margin: 0 0 8px; font-size: 18px; }
img { display: block; }
.aviso { margin: 8px 0 0; padding: 8px; background: #fef3c7; border-radius: 6px; }

.contenido {
  width: 90%;
  max-width: 400px;
  margin: 0 auto;
}

img {
  max-width: 100%;
  height: auto;
}

.aviso { min-height: 80px; }`,
  checks: [
    { d: 'En pantalla ancha, 400 px y centrado', rect: '.contenido', w: 480 },
    { d: 'En el móvil, el 90 % del ancho', rect: '.contenido', w: 360 },
    { d: 'La imagen cabe y conserva la proporción', rect: 'img', w: 360 },
    { d: 'El aviso mide al menos 80 px', css: ['.aviso', ['min-height']] }
  ]
},
{
  id: 'perfil-bordes', block: 'sel', title: 'Bordes, esquinas y sombras', edit: 'css', w: 480, h: 220,
  tags: ['border', 'border-radius: 50%', 'box-shadow', 'dashed'],
  brief: `<p>Tarjeta de perfil de la tutora:</p>
<ul><li><code>.perfil</code>: borde de <code>1px</code> <strong>discontinuo</strong> <code>#94a3b8</code>, esquinas de <code>12px</code> y la sombra <code>0 4px 12px rgba(0, 0, 0, 0.15)</code>.</li><li>El avatar es un <strong>círculo</strong> de <code>80 × 80</code> con un borde sólido de <code>3px</code> en <code>#4338ca</code>.</li><li><code>.cargo</code>: un borde <strong>solo por debajo</strong>, punteado, de <code>2px</code> y en <code>#c7d2fe</code>.</li></ul>`,
  hint: `<code>border: 1px dashed …</code>, <code>border-radius: 50%</code> (en una caja cuadrada sale un círculo), <code>border-bottom: 2px dotted …</code> y <code>box-shadow: x y desenfoque color</code>.`,
  html: `<div class="perfil">
  <img class="avatar" src="${AVATAR}" alt="Foto de la tutora">
  <div>
    <h2>Laura Ferrer</h2>
    <p class="cargo">Tutora de 1º de DAM</p>
  </div>
</div>`,
  css: `body { margin: 24px; font-size: 14px; }
.perfil { display: flex; gap: 16px; align-items: center; padding: 16px; max-width: 340px; background: #fff; }
.avatar { display: block; }
h2 { margin: 0 0 4px; font-size: 18px; }
.cargo { margin: 0; padding-bottom: 4px; color: #475569; }
`,
  sol: `body { margin: 24px; font-size: 14px; }
.perfil { display: flex; gap: 16px; align-items: center; padding: 16px; max-width: 340px; background: #fff; }
.avatar { display: block; }
h2 { margin: 0 0 4px; font-size: 18px; }
.cargo { margin: 0; padding-bottom: 4px; color: #475569; }

.perfil {
  border: 1px dashed #94a3b8;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #4338ca;
}

.cargo { border-bottom: 2px dotted #c7d2fe; }`,
  checks: [
    { d: 'Borde discontinuo y esquinas de la tarjeta', css: ['.perfil', ['border', 'border-radius']] },
    { d: 'Sombra de la tarjeta', css: ['.perfil', ['box-shadow']] },
    { d: 'Avatar redondo con borde', css: ['.avatar', ['border', 'border-radius']] },
    { d: 'Avatar de 80 × 80 (más el borde)', rect: '.avatar' },
    { d: 'Borde punteado solo debajo del cargo', css: ['.cargo', ['border-bottom-width', 'border-bottom-style', 'border-bottom-color', 'border-top-style', 'border-left-style']] }
  ]
},
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
  ]},
{
  id: 'tarjetas-rutas', block: 'sel', title: 'Tarjetas de rutas (formato examen)', edit: 'css', w: 660, h: 380,
  tags: ['inline-block', 'vertical-align', 'box-sizing', 'box-shadow'],
  brief: `<p>Como en la actividad del club de escalada de la UP04: te dan el HTML y la guía de estilo, y tú escribes el CSS de las tarjetas (sin Flexbox).</p>
<ul><li><code>.tarjeta</code>: <code>inline-block</code>, alineada <strong>por arriba</strong>, <code>280px</code> de ancho con un máximo del <code>100%</code>, margen <code>0 12px 32px</code>, fondo blanco, esquinas de <code>8px</code>, la sombra <code>0 4px 12px rgba(0, 0, 0, 0.08)</code> y texto a la izquierda.</li><li><code>.tarjeta img</code>: <code>block</code>, <code>100%</code> de ancho, <code>140px</code> de alto, relleno de <code>16px</code>, fondo <code>#e2d8cd</code> y esquinas de <code>8px</code> <strong>solo arriba</strong>. Ojo: con el relleno, el <code>100%</code> se sale si no cambias el <code>box-sizing</code>.</li><li><code>.tarjeta-cuerpo</code>: relleno de <code>20px</code>.</li><li><code>.tarjeta h2</code>: sin margen salvo <code>8px</code> abajo, <code>1.25rem</code>. <code>.descripcion</code>: sin margen, color <code>#6b5f57</code> y <code>0.9rem</code>.</li></ul>`,
  hint: `<code>* { box-sizing: border-box; }</code> soluciona el ancho de la imagen. <code>vertical-align: top</code> evita que la tarjeta con menos texto quede más baja. Esquinas solo arriba: <code>border-radius: 8px 8px 0 0</code>.`,
  html: `<section class="rutas">
  <article class="tarjeta">
    <img src="${IMG}" alt="Espolón norte">
    <div class="tarjeta-cuerpo">
      <h2>Espolón norte</h2>
      <p class="descripcion">Vía clásica de 35 metros con vistas al valle. Ideal para la primera salida en roca.</p>
    </div>
  </article>
  <article class="tarjeta">
    <img src="${IMG}" alt="Placa del pino">
    <div class="tarjeta-cuerpo">
      <h2>Placa del pino</h2>
      <p class="descripcion">Placa tumbada y adherente.</p>
    </div>
  </article>
</section>`,
  css: `body {
  margin: 0;
  background: #eee7df;
  color: #2b2622;
  font-size: 16px;
  line-height: 1.6;
}

.rutas {
  padding: 24px 16px 0;
  text-align: center;
}
`,
  sol: `body {
  margin: 0;
  background: #eee7df;
  color: #2b2622;
  font-size: 16px;
  line-height: 1.6;
}

* { box-sizing: border-box; }

.rutas {
  padding: 24px 16px 0;
  text-align: center;
}

.tarjeta {
  display: inline-block;
  vertical-align: top;
  width: 280px;
  max-width: 100%;
  margin: 0 12px 32px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: left;
}

.tarjeta img {
  display: block;
  width: 100%;
  height: 140px;
  padding: 16px;
  background: #e2d8cd;
  border-radius: 8px 8px 0 0;
}

.tarjeta-cuerpo { padding: 20px; }

.tarjeta h2 {
  margin: 0 0 8px;
  font-size: 1.25rem;
  line-height: 1.2;
}

.descripcion {
  margin: 0;
  color: #6b5f57;
  font-size: 0.9rem;
}`,
  checks: [
    { d: 'Tarjetas en línea y alineadas por arriba', css: ['.tarjeta', ['display', 'vertical-align', 'text-align']] },
    { d: 'Fondo, esquinas y sombra de la tarjeta', css: ['.tarjeta', ['background-color', 'border-radius', 'box-shadow']] },
    { d: 'Imagen: relleno, fondo y esquinas solo arriba', css: ['.tarjeta img', ['padding', 'background-color', 'border-radius']] },
    { d: 'Textos: márgenes, tamaños y color', css: ['.tarjeta h2, .descripcion', ['margin', 'font-size', 'color']] },
    { d: 'Las imágenes no se salen de la tarjeta', rect: '.tarjeta img' },
    { d: 'Cada tarjeta en su sitio', rect: '.tarjeta', tol: 3 }
  ]
}
);
