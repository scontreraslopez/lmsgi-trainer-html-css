/* ===================== BLOQUE 1 · SEMÁNTICA ===================== */
window.EXERCISES.push(
{
  id: 'esqueleto-semantico', block: 'sem', title: 'Adiós a la sopa de divs', edit: 'html', w: 480, h: 340,
  tags: ['header', 'nav', 'main', 'article', 'footer'],
  brief: `<p>Este blog está hecho solo con <code>&lt;div&gt;</code>. Reescríbelo con etiquetas semánticas. El CSS ya está preparado para ellas, así que si eliges bien, se pinta solo.</p>
<ul><li>Cabecera con el título como <code>&lt;h1&gt;</code>.</li><li>Menú de navegación con una lista de 3 enlaces.</li><li>Contenido principal con un artículo (título <code>&lt;h2&gt;</code> y un párrafo).</li><li>Pie con un párrafo.</li></ul>`,
  hint: `Un menú es una <code>&lt;nav&gt;</code> que contiene una <code>&lt;ul&gt;</code> con un <code>&lt;li&gt;</code> por enlace. Mira las reglas del CSS para saber qué etiquetas espera.`,
  css: `body { margin: 0; }
header { background: #1e3a8a; color: #fff; padding: 12px 16px; }
header h1 { margin: 0; font-size: 20px; }
nav ul { display: flex; gap: 16px; list-style: none; margin: 0; padding: 8px 16px; background: #dbeafe; }
nav a { color: #1e3a8a; }
main { padding: 16px; }
article h2 { margin: 0 0 8px; font-size: 18px; }
article p { margin: 0; }
footer { padding: 8px 16px; background: #f1f5f9; font-size: 13px; }
footer p { margin: 0; }`,
  html: `<div class="cabecera">
  <div class="titulo">Mi blog de LMSGI</div>
</div>
<div class="menu">
  <a href="#">Inicio</a> <a href="#">Apuntes</a> <a href="#">Contacto</a>
</div>
<div class="contenido">
  <div class="entrada">
    <div class="titulo-entrada">HTML semántico</div>
    <div>Usar la etiqueta adecuada ayuda a buscadores y lectores de pantalla.</div>
  </div>
</div>
<div class="pie">© 2026 IES Severo Ochoa</div>`,
  sol: `<header>
  <h1>Mi blog de LMSGI</h1>
</header>
<nav>
  <ul>
    <li><a href="#">Inicio</a></li>
    <li><a href="#">Apuntes</a></li>
    <li><a href="#">Contacto</a></li>
  </ul>
</nav>
<main>
  <article>
    <h2>HTML semántico</h2>
    <p>Usar la etiqueta adecuada ayuda a buscadores y lectores de pantalla.</p>
  </article>
</main>
<footer>
  <p>© 2026 IES Severo Ochoa</p>
</footer>`,
  checks: [
    { d: '<code>&lt;header&gt;</code> con un <code>&lt;h1&gt;</code> dentro', exists: 'header h1' },
    { d: '<code>&lt;nav&gt;</code> con una lista de 3 enlaces', count: ['nav ul > li > a', 3] },
    { d: 'Un <code>&lt;article&gt;</code> dentro de <code>&lt;main&gt;</code>', exists: 'main > article' },
    { d: 'El artículo tiene <code>&lt;h2&gt;</code> y <code>&lt;p&gt;</code>', exists: 'article > h2 + p' },
    { d: '<code>&lt;footer&gt;</code> con un párrafo', exists: 'footer > p' },
    { d: 'Ni un solo <code>&lt;div&gt;</code>', none: 'div' }
  ]
},
{
  id: 'receta-listas', block: 'sem', title: 'Receta con listas', edit: 'html', w: 480, h: 320,
  tags: ['h1', 'h2', 'ul', 'ol', 'li'],
  brief: `<p>La receta está escrita a mano con guiones y <code>&lt;br&gt;</code>. Pásala a HTML de verdad:</p>
<ul><li>El nombre del plato es el título principal.</li><li>«Ingredientes» y «Pasos» son subtítulos.</li><li>Los ingredientes no tienen orden; los pasos sí.</li></ul>`,
  hint: `Lista sin orden: <code>&lt;ul&gt;</code>. Lista ordenada: <code>&lt;ol&gt;</code>. Los números y viñetas los pone el navegador, no los escribas tú.`,
  css: `body { margin: 16px; }
h1 { font-size: 22px; margin: 0 0 8px; }
h2 { font-size: 16px; margin: 12px 0 4px; color: #9a3412; }
ul, ol { margin: 0; padding-left: 24px; }
li { margin: 2px 0; }`,
  html: `<p>Tortilla de patatas</p>
<p>Ingredientes</p>
<p>- 4 huevos<br>- 3 patatas<br>- 1 cebolla<br>- Aceite y sal</p>
<p>Pasos</p>
<p>1. Pelar y cortar las patatas.<br>2. Freírlas con la cebolla.<br>3. Mezclar con el huevo y cuajar.</p>`,
  sol: `<h1>Tortilla de patatas</h1>
<h2>Ingredientes</h2>
<ul>
  <li>4 huevos</li>
  <li>3 patatas</li>
  <li>1 cebolla</li>
  <li>Aceite y sal</li>
</ul>
<h2>Pasos</h2>
<ol>
  <li>Pelar y cortar las patatas.</li>
  <li>Freírlas con la cebolla.</li>
  <li>Mezclar con el huevo y cuajar.</li>
</ol>`,
  checks: [
    { d: 'Un único <code>&lt;h1&gt;</code>', count: ['h1', 1] },
    { d: 'Dos subtítulos <code>&lt;h2&gt;</code>', count: ['h2', 2] },
    { d: '4 ingredientes en una <code>&lt;ul&gt;</code>', count: ['ul > li', 4] },
    { d: '3 pasos en una <code>&lt;ol&gt;</code>', count: ['ol > li', 3] },
    { d: 'Sin <code>&lt;br&gt;</code> para separar elementos', none: 'br' },
    { d: 'Sin guiones ni números escritos a mano', js: (U) => U.qa('li').every((li) => !/^\s*(-|\d+\.)/.test(li.textContent)) || 'Algún <li> empieza por «-» o «1.»' }
  ]
},
{
  id: 'glosario-dl', block: 'sem', title: 'Glosario con lista de definiciones', edit: 'html', w: 480, h: 300,
  tags: ['dl', 'dt', 'dd'],
  brief: `<p>Convierte el glosario en una <strong>lista de definiciones</strong>: cada término y su explicación.</p>`,
  hint: `<code>&lt;dl&gt;</code> envuelve todo; cada término va en <code>&lt;dt&gt;</code> y su definición justo después en <code>&lt;dd&gt;</code>.`,
  css: `body { margin: 16px; }
h1 { font-size: 22px; margin: 0 0 12px; }
dt { font-weight: 700; color: #1e3a8a; }
dd { margin: 0 0 10px 16px; }`,
  html: `<h1>Glosario</h1>
<p><b>HTML</b>: lenguaje de marcas para estructurar contenido web.</p>
<p><b>CSS</b>: lenguaje de hojas de estilo para presentar documentos.</p>
<p><b>DOM</b>: representación en árbol del documento que maneja el navegador.</p>`,
  sol: `<h1>Glosario</h1>
<dl>
  <dt>HTML</dt>
  <dd>Lenguaje de marcas para estructurar contenido web.</dd>
  <dt>CSS</dt>
  <dd>Lenguaje de hojas de estilo para presentar documentos.</dd>
  <dt>DOM</dt>
  <dd>Representación en árbol del documento que maneja el navegador.</dd>
</dl>`,
  checks: [
    { d: 'Hay una <code>&lt;dl&gt;</code>', exists: 'dl' },
    { d: '3 términos <code>&lt;dt&gt;</code>', count: ['dl > dt', 3] },
    { d: '3 definiciones <code>&lt;dd&gt;</code>', count: ['dl > dd', 3] },
    { d: 'Cada <code>&lt;dt&gt;</code> va seguido de su <code>&lt;dd&gt;</code>', count: ['dt + dd', 3] },
    { d: 'Sin <code>&lt;b&gt;</code> ni párrafos sueltos', none: 'b, body > p' }
  ]
},
{
  id: 'texto-con-significado', block: 'sem', title: 'Texto con significado', edit: 'html', w: 480, h: 200,
  tags: ['abbr', 'time', 'code', 'strong', 'entidades'],
  brief: `<p>Marca este aviso con las etiquetas de texto adecuadas:</p>
<ul><li><code>UP03</code> es una abreviatura de «Unidad de Programación 3» (que salga al pasar el ratón).</li><li>La fecha debe ser legible por máquinas: <code>2026-11-20</code>.</li><li>La etiqueta <code>&lt;link&gt;</code> debe verse como código, con sus <code>&lt; &gt;</code> visibles.</li><li>El «no» es importante, no solo negrita.</li></ul>`,
  hint: `<code>&lt;abbr title="…"&gt;</code>, <code>&lt;time datetime="…"&gt;</code>, <code>&lt;code&gt;</code> y <code>&lt;strong&gt;</code>. Para escribir <code>&lt;</code> dentro del texto usa la entidad <code>&amp;lt;</code>.`,
  css: `body { margin: 16px; line-height: 1.6; }
code { font-family: monospace; background: #f1f5f9; padding: 1px 4px; border-radius: 4px; }
strong { color: #b91c1c; }`,
  html: `<p>La entrega de la <b>UP03</b> es el 20/11/2026. Recuerda que el CSS se enlaza con la etiqueta link y que <i>no</i> se aceptan entregas fuera de plazo.</p>`,
  sol: `<p>La entrega de la <abbr title="Unidad de Programación 3">UP03</abbr> es el <time datetime="2026-11-20">20/11/2026</time>. Recuerda que el CSS se enlaza con la etiqueta <code>&lt;link&gt;</code> y que <strong>no</strong> se aceptan entregas fuera de plazo.</p>`,
  checks: [
    { d: '<code>&lt;abbr&gt;</code> con <code>title</code>', attr: ['abbr', 'title'] },
    { d: '<code>&lt;time datetime="2026-11-20"&gt;</code>', exists: 'time[datetime="2026-11-20"]' },
    { d: '<code>&lt;code&gt;</code> que muestra «&lt;link&gt;»', js: (U) => U.qa('code').some((c) => c.textContent.trim() === '<link>') || 'No veo un <code> cuyo texto sea <link>' },
    { d: 'El «no» va en <code>&lt;strong&gt;</code>', js: (U) => U.qa('strong').some((s) => s.textContent.trim() === 'no') },
    { d: 'Nada de <code>&lt;b&gt;</code> ni <code>&lt;i&gt;</code>', none: 'b, i' }
  ]
},
{
  id: 'tabla-horario', block: 'sem', title: 'Tabla de horario', edit: 'html', w: 480, h: 240,
  tags: ['table', 'caption', 'thead', 'tbody', 'th scope'],
  brief: `<p>Monta la tabla del horario de tutorías que está en el comentario. Requisitos:</p>
<ul><li>Título de la tabla con <code>&lt;caption&gt;</code>.</li><li>Fila de cabecera dentro de <code>&lt;thead&gt;</code> con <code>scope="col"</code>.</li><li>La hora de cada fila es una cabecera de fila: <code>&lt;th scope="row"&gt;</code>.</li></ul>`,
  hint: `Estructura: <code>table &gt; caption + thead &gt; tr &gt; th</code> y <code>tbody &gt; tr &gt; th + td + td + td</code>.`,
  css: `body { margin: 16px; }
table { border-collapse: collapse; width: 100%; font-size: 14px; }
caption { font-weight: 700; text-align: left; padding-bottom: 6px; }
th, td { border: 1px solid #cbd5e1; padding: 6px 8px; text-align: left; }
thead th { background: #1e3a8a; color: #fff; }
tbody th { background: #e2e8f0; }`,
  html: `<!-- Horario de tutorías
       Lunes   Martes   Miércoles
16:00  PMDM    LMSGI    EDE
17:00  LMSGI   PMDM     PI
18:00  EDE     EDE      LMSGI
-->
`,
  sol: `<table>
  <caption>Horario de tutorías</caption>
  <thead>
    <tr>
      <th scope="col">Hora</th>
      <th scope="col">Lunes</th>
      <th scope="col">Martes</th>
      <th scope="col">Miércoles</th>
    </tr>
  </thead>
  <tbody>
    <tr><th scope="row">16:00</th><td>PMDM</td><td>LMSGI</td><td>EDE</td></tr>
    <tr><th scope="row">17:00</th><td>LMSGI</td><td>PMDM</td><td>PI</td></tr>
    <tr><th scope="row">18:00</th><td>EDE</td><td>EDE</td><td>LMSGI</td></tr>
  </tbody>
</table>`,
  checks: [
    { d: 'La tabla tiene <code>&lt;caption&gt;</code>', exists: 'table > caption' },
    { d: '4 cabeceras de columna con <code>scope="col"</code>', count: ['thead th[scope="col"]', 4] },
    { d: '3 filas en <code>&lt;tbody&gt;</code>', count: ['tbody > tr', 3] },
    { d: 'La hora es <code>&lt;th scope="row"&gt;</code>', count: ['tbody th[scope="row"]', 3] },
    { d: '9 celdas de datos', count: ['tbody td', 9] },
    { d: 'Mismo contenido que el horario', rect: 'td' }
  ]
},
{
  id: 'tabla-colspan', block: 'sem', title: 'Cabecera doble con colspan y rowspan', edit: 'html', w: 480, h: 220,
  tags: ['colspan', 'rowspan', 'thead'],
  brief: `<p>Completa el <code>&lt;thead&gt;</code> para que la cabecera quede en <strong>dos filas</strong>: «Alumno» y «Final» ocupan las dos filas, y «1ª evaluación» abarca las columnas «Teoría» y «Práctica».</p>`,
  hint: `Primera fila: <code>Alumno</code> (rowspan 2), <code>1ª evaluación</code> (colspan 2), <code>Final</code> (rowspan 2). Segunda fila: solo <code>Teoría</code> y <code>Práctica</code>, porque las otras dos celdas ya vienen ocupadas desde arriba.`,
  css: `body { margin: 16px; }
table { border-collapse: collapse; font-size: 14px; }
th, td { border: 1px solid #cbd5e1; padding: 6px 12px; text-align: center; }
th { background: #e0e7ff; }`,
  html: `<table>
  <thead>
    <!-- Construye aquí las dos filas de cabecera -->
  </thead>
  <tbody>
    <tr><td>Ana</td><td>7</td><td>8</td><td>7,5</td></tr>
    <tr><td>Luis</td><td>5</td><td>6</td><td>5,5</td></tr>
  </tbody>
</table>`,
  sol: `<table>
  <thead>
    <tr>
      <th rowspan="2">Alumno</th>
      <th colspan="2">1ª evaluación</th>
      <th rowspan="2">Final</th>
    </tr>
    <tr>
      <th>Teoría</th>
      <th>Práctica</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Ana</td><td>7</td><td>8</td><td>7,5</td></tr>
    <tr><td>Luis</td><td>5</td><td>6</td><td>5,5</td></tr>
  </tbody>
</table>`,
  checks: [
    { d: 'Dos filas en <code>&lt;thead&gt;</code>', count: ['thead > tr', 2] },
    { d: 'Una cabecera con <code>colspan="2"</code>', count: ['th[colspan="2"]', 1] },
    { d: 'Dos cabeceras con <code>rowspan="2"</code>', count: ['th[rowspan="2"]', 2] },
    { d: 'La segunda fila solo tiene 2 celdas', count: ['thead > tr:nth-child(2) > th', 2] },
    { d: 'Las cabeceras quedan en su sitio', rect: 'th' }
  ]
},
{
  id: 'figura-pie', block: 'sem', title: 'Imagen con pie de foto', edit: 'html', w: 480, h: 260,
  tags: ['figure', 'figcaption', 'img alt'],
  brief: `<p>Agrupa la imagen y su pie con las etiquetas pensadas para ello. La imagen necesita un texto alternativo que describa lo que se ve.</p>`,
  hint: `<code>&lt;figure&gt;</code> contiene la <code>&lt;img alt="…"&gt;</code> y un <code>&lt;figcaption&gt;</code>.`,
  css: `body { margin: 16px; }
figure { margin: 0; display: inline-block; border: 1px solid #cbd5e1; padding: 8px; border-radius: 6px; }
figure img { display: block; width: 240px; }
figcaption { font-size: 13px; color: #475569; margin-top: 6px; }`,
  html: `<div class="foto">
  <img src="${IMG}">
  <p>Fig. 1. Sierra de Crevillent al atardecer.</p>
</div>`,
  sol: `<figure>
  <img src="${IMG}" alt="Montañas azules con el sol sobre la cima">
  <figcaption>Fig. 1. Sierra de Crevillent al atardecer.</figcaption>
</figure>`,
  checks: [
    { d: '<code>&lt;img&gt;</code> dentro de <code>&lt;figure&gt;</code>', exists: 'figure > img' },
    { d: 'La imagen tiene <code>alt</code> descriptivo', attr: ['img', 'alt'] },
    { d: 'Pie con <code>&lt;figcaption&gt;</code>', exists: 'figure > figcaption' },
    { d: 'Sin <code>&lt;div&gt;</code> envolvente', none: 'div' }
  ]
},
{
  id: 'migas-de-pan', block: 'sem', title: 'Migas de pan accesibles', edit: 'html', w: 480, h: 120,
  tags: ['nav', 'aria-label', 'ol', 'aria-current'],
  brief: `<p>Convierte la ruta en unas <strong>migas de pan</strong> accesibles:</p>
<ul><li>Una <code>&lt;nav&gt;</code> con <code>aria-label="Migas de pan"</code>.</li><li>Una lista ordenada (el orden importa).</li><li>El último elemento es la página actual: no es enlace y lleva <code>aria-current="page"</code>.</li></ul>`,
  hint: `Los separadores «/» los pone el CSS con <code>li + li::before</code>: no los escribas.`,
  css: `body { margin: 16px; font-size: 14px; }
nav ol { list-style: none; display: flex; gap: 6px; margin: 0; padding: 0; }
nav li + li::before { content: "/"; margin-right: 6px; color: #94a3b8; }
nav a { color: #1d4ed8; }
[aria-current="page"] { color: #0f172a; font-weight: 600; }`,
  html: `<p><a href="/">Inicio</a> > <a href="/ciclos">Ciclos</a> > <a href="/ciclos/dam">DAM</a> > LMSGI</p>`,
  sol: `<nav aria-label="Migas de pan">
  <ol>
    <li><a href="/">Inicio</a></li>
    <li><a href="/ciclos">Ciclos</a></li>
    <li><a href="/ciclos/dam">DAM</a></li>
    <li aria-current="page">LMSGI</li>
  </ol>
</nav>`,
  checks: [
    { d: '<code>&lt;nav&gt;</code> con <code>aria-label</code>', attr: ['nav', 'aria-label'] },
    { d: 'Lista ordenada con 4 elementos', count: ['nav ol > li', 4] },
    { d: '3 enlaces', count: ['nav a', 3] },
    { d: 'El último es la página actual con <code>aria-current="page"</code>', exists: 'nav ol > li:last-child[aria-current="page"], nav ol > li:last-child [aria-current="page"]' },
    { d: 'Sin «&gt;» escritos a mano', js: (U) => !U.qa('nav ol').some((o) => o.textContent.includes('>')) }
  ]
}
);
