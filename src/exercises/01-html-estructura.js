/* ===================== BLOQUE · UP01–UP03 · ESTRUCTURA, TEXTO Y ENLACES ===================== */
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
  ]},
{id: 'receta-listas', block: 'sem', title: 'Receta con listas', edit: 'html', w: 480, h: 320,
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
  ]},
{
  id: 'listas-tipos', block: 'sem', title: 'Listas numeradas a tu manera', edit: 'html', w: 480, h: 330,
  tags: ['ol type', 'start', 'listas anidadas'],
  brief: `<p>Alguien ha escrito los números de las listas a mano. Haz que los ponga el navegador:</p>
<ul><li>Las unidades, con <strong>números romanos en mayúscula</strong> (I, II, III).</li><li>Los apartados de la UP03 son una <strong>lista ordenada anidada</strong> dentro de su unidad, con <strong>letras minúsculas</strong> (a, b, c).</li><li>Las actividades pendientes siguen la numeración de las tres que ya entregaste: <strong>empiezan en 4</strong>.</li></ul>`,
  hint: `<code>&lt;ol type="I"&gt;</code>, <code>&lt;ol type="a"&gt;</code> y <code>&lt;ol start="4"&gt;</code>. La lista anidada va <em>dentro</em> del <code>&lt;li&gt;</code> de la UP03, no después.`,
  css: `body { margin: 16px; font-size: 15px; }
h2 { font-size: 17px; margin: 0 0 6px; }
ol, ul { margin: 0 0 12px; }`,
  html: `<h2>Temario del primer trimestre</h2>
<ol>
  <li>I. Lenguajes de marcas y HTML inicial</li>
  <li>II. HTML I</li>
  <li>III. HTML II</li>
</ol>
<ul>
  <li>a) Elementos de ordenación</li>
  <li>b) Marcadores</li>
  <li>c) Metainformación</li>
</ul>
<h2>Actividades pendientes</h2>
<ol>
  <li>4. Práctica de la UP03</li>
  <li>5. Test de la UP03</li>
</ol>`,
  sol: `<h2>Temario del primer trimestre</h2>
<ol type="I">
  <li>Lenguajes de marcas y HTML inicial</li>
  <li>HTML I</li>
  <li>HTML II
    <ol type="a">
      <li>Elementos de ordenación</li>
      <li>Marcadores</li>
      <li>Metainformación</li>
    </ol>
  </li>
</ol>
<h2>Actividades pendientes</h2>
<ol start="4">
  <li>Práctica de la UP03</li>
  <li>Test de la UP03</li>
</ol>`,
  checks: [
    { d: 'Tres unidades en una <code>&lt;ol type="I"&gt;</code>', count: ['ol[type="I"] > li', 3] },
    { d: 'Los apartados van dentro del tercer <code>&lt;li&gt;</code>, en una <code>&lt;ol type="a"&gt;</code>', count: ['ol[type="I"] > li:nth-child(3) > ol[type="a"] > li', 3] },
    { d: 'Las actividades pendientes empiezan en 4', count: ['ol[start="4"] > li', 2] },
    { d: 'Ninguna lista sin orden', none: 'ul' },
    { d: 'Sin números ni letras escritos a mano', js: (U) => U.qa('li').every((li) => !/^\s*([IVX]+\.|[a-z]\)|\d+\.)/.test(li.firstChild ? li.firstChild.textContent : '')) || 'Algún <li> empieza por «I.», «a)» o «4.»' }
  ]
},
{id: 'glosario-dl', block: 'sem', title: 'Glosario con lista de definiciones', edit: 'html', w: 480, h: 300,
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
  ]},
{id: 'texto-con-significado', block: 'sem', title: 'Texto con significado', edit: 'html', w: 480, h: 200,
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
  ]},
{
  id: 'texto-formato', block: 'sem', title: 'Superíndices, teclas y resaltados', edit: 'html', w: 480, h: 220,
  tags: ['sup', 'sub', 'kbd', 'mark', 'small'],
  brief: `<p>Estos apuntes de la UP01 se escribieron sin etiquetas. Márcalos bien:</p>
<ul><li>Los exponentes van en <strong>superíndice</strong> (escribe solo <code>10</code> y <code>20</code>, sin el <code>^</code>).</li><li>El 2 de <code>CO2</code> va en <strong>subíndice</strong>.</li><li>Cada tecla (<code>Ctrl</code> y <code>S</code>) es una <strong>entrada de teclado</strong>.</li><li>«los prefijos binarios» va <strong>resaltado</strong> como en un subrayador.</li><li>El aviso de derechos es <strong>letra pequeña</strong>.</li></ul>`,
  hint: `<code>&lt;sup&gt;</code>, <code>&lt;sub&gt;</code>, <code>&lt;kbd&gt;</code>, <code>&lt;mark&gt;</code> y <code>&lt;small&gt;</code>. Todas son de línea: van dentro del párrafo.`,
  css: `body { margin: 16px; line-height: 1.7; }
kbd { font-family: monospace; border: 1px solid #94a3b8; border-bottom-width: 2px; border-radius: 4px; padding: 0 4px; background: #f8fafc; }
mark { background: #fde68a; }`,
  html: `<p>1 KiB son 2^10 bytes y 1 MiB son 2^20 bytes.</p>
<p>El sensor del aula mide el CO2 cada minuto y guarda los datos en un CSV. Guarda el archivo con Ctrl + S.</p>
<p>Lo más importante para el examen: los prefijos binarios.</p>
<p>© 2026 Departamento de Informática</p>`,
  sol: `<p>1 KiB son 2<sup>10</sup> bytes y 1 MiB son 2<sup>20</sup> bytes.</p>
<p>El sensor del aula mide el CO<sub>2</sub> cada minuto y guarda los datos en un CSV. Guarda el archivo con <kbd>Ctrl</kbd> + <kbd>S</kbd>.</p>
<p>Lo más importante para el examen: <mark>los prefijos binarios</mark>.</p>
<p><small>© 2026 Departamento de Informática</small></p>`,
  checks: [
    { d: 'Dos superíndices: 10 y 20', js: (U) => U.qa('sup').map((s) => s.textContent.trim()).join(',') === '10,20' || 'Espero dos <sup> con 10 y 20' },
    { d: 'Sin <code>^</code> en el texto', js: (U) => !U.doc.body.textContent.includes('^') || 'Todavía hay un ^' },
    { d: 'El 2 de CO<sub>2</sub> en subíndice', js: (U) => U.qa('sub').some((s) => s.textContent.trim() === '2') || 'No veo un <sub> con el 2' },
    { d: 'Dos teclas con <code>&lt;kbd&gt;</code>', js: (U) => U.qa('kbd').map((k) => k.textContent.trim()).join('+') === 'Ctrl+S' || 'Espero <kbd>Ctrl</kbd> y <kbd>S</kbd>' },
    { d: '«los prefijos binarios» resaltado', js: (U) => U.qa('mark').some((m) => m.textContent.trim() === 'los prefijos binarios') || 'No veo el <mark>' },
    { d: 'Letra pequeña en el aviso de derechos', js: (U) => U.qa('small').some((m) => m.textContent.includes('2026')) || 'No veo el <small>' }
  ]
},
{
  id: 'citas', block: 'sem', title: 'Citas largas, cortas y títulos de obras', edit: 'html', w: 480, h: 260,
  tags: ['blockquote cite', 'q', 'cite'],
  brief: `<p>Marca las citas con su etiqueta. Las comillas ya no hacen falta: las pone el navegador.</p>
<ul><li>La misión del W3C es una <strong>cita larga</strong>, en un bloque aparte, con su fuente <code>https://www.w3.org/mission/</code> en el atributo <code>cite</code>.</li><li>La frase de Tim Berners-Lee es una <strong>cita corta</strong> dentro del párrafo.</li><li><em>Weaving the Web</em> es el <strong>título de una obra</strong>.</li></ul>`,
  hint: `Cita larga: <code>&lt;blockquote cite="…"&gt;&lt;p&gt;…&lt;/p&gt;&lt;/blockquote&gt;</code>. Cita corta: <code>&lt;q&gt;</code>. Título: <code>&lt;cite&gt;</code> (la etiqueta, que no es lo mismo que el atributo).`,
  css: `body { margin: 16px; line-height: 1.6; }
blockquote { margin: 8px 0 12px; padding: 8px 16px; border-left: 4px solid #1d4ed8; background: #eff6ff; }
blockquote p { margin: 0; }`,
  html: `<p>Como dice el W3C en su misión:</p>
<p>"Liderar la Web hacia su máximo potencial desarrollando protocolos y pautas que aseguren su crecimiento a largo plazo."</p>
<p>Tim Berners-Lee lo resumió en su libro Weaving the Web: "el poder de la Web está en su universalidad".</p>`,
  sol: `<p>Como dice el W3C en su misión:</p>
<blockquote cite="https://www.w3.org/mission/">
  <p>Liderar la Web hacia su máximo potencial desarrollando protocolos y pautas que aseguren su crecimiento a largo plazo.</p>
</blockquote>
<p>Tim Berners-Lee lo resumió en su libro <cite>Weaving the Web</cite>: <q>el poder de la Web está en su universalidad</q>.</p>`,
  checks: [
    { d: 'Cita larga con <code>&lt;blockquote&gt;</code>', exists: 'blockquote' },
    { d: 'El bloque indica su fuente en el atributo <code>cite</code>', exists: 'blockquote[cite="https://www.w3.org/mission/"]' },
    { d: 'Cita corta con <code>&lt;q&gt;</code>', js: (U) => U.qa('q').some((q) => q.textContent.includes('universalidad')) || 'No veo un <q> con la frase' },
    { d: 'Título de la obra con <code>&lt;cite&gt;</code>', js: (U) => U.qa('cite').some((c) => c.textContent.trim() === 'Weaving the Web') || 'No veo <cite>Weaving the Web</cite>' },
    { d: 'Sin comillas escritas a mano', js: (U) => !/["«»“”]/.test(U.doc.body.textContent) || 'Todavía hay comillas en el texto' }
  ]
},
{
  id: 'bloque-linea', block: 'sem', title: 'Bloque y línea: div y span', edit: 'html', w: 480, h: 220,
  tags: ['div', 'span', 'class', 'bloque / línea'],
  brief: `<p>El CSS ya tiene dos clases: <code>.aviso</code> (una caja amarilla) y <code>.resaltado</code> (texto en rojo). Solo son <strong>presentación</strong>, así que usa los elementos sin significado:</p>
<ul><li>Agrupa el título y los dos párrafos del aviso en un elemento de <strong>bloque</strong> con la clase <code>aviso</code>.</li><li>Marca «viernes 27» con un elemento de <strong>línea</strong> con la clase <code>resaltado</code>.</li></ul>`,
  hint: `<code>&lt;div class="aviso"&gt;</code> envuelve varios elementos; <code>&lt;span class="resaltado"&gt;</code> va dentro del párrafo, alrededor de las palabras.`,
  css: `body { margin: 16px; }
.aviso { padding: 10px 14px; background: #fef9c3; border: 1px solid #facc15; border-radius: 8px; }
.aviso h2 { margin: 0 0 4px; font-size: 17px; }
.aviso p { margin: 0; }
.resaltado { color: #b91c1c; font-weight: 700; }`,
  html: `<h2>Cambio de fecha</h2>
<p>La prueba objetiva se mueve al viernes 27.</p>
<p>El aula y la hora no cambian.</p>`,
  sol: `<div class="aviso">
  <h2>Cambio de fecha</h2>
  <p>La prueba objetiva se mueve al <span class="resaltado">viernes 27</span>.</p>
  <p>El aula y la hora no cambian.</p>
</div>`,
  checks: [
    { d: 'Un <code>&lt;div class="aviso"&gt;</code> con el título y los dos párrafos', js: (U) => { const d = U.q('div.aviso'); return (d && d.querySelectorAll(':scope > h2').length === 1 && d.querySelectorAll(':scope > p').length === 2) || 'El div.aviso debe contener el h2 y los dos p'; } },
    { d: '«viernes 27» en un <code>&lt;span class="resaltado"&gt;</code> dentro del párrafo', js: (U) => U.qa('p > span.resaltado').some((s) => s.textContent.trim() === 'viernes 27') || 'No veo el span.resaltado con «viernes 27»' },
    { d: 'Sin etiquetas con significado para esto', none: 'strong, b, em, mark, section, article' },
    { d: 'La caja queda igual que el objetivo', rect: '.aviso' }
  ]
},
{
  id: 'enlaces-tipos', block: 'sem', title: 'Enlaces de todo tipo', edit: 'html', w: 480, h: 220,
  tags: ['a href', 'target=_blank', 'mailto:', 'tel:', 'download'],
  brief: `<p>Convierte cada línea de recursos en un enlace que funcione:</p>
<ul><li>La referencia de MDN (<code>https://developer.mozilla.org/es/docs/Web/HTML</code>) se abre en una <strong>pestaña nueva</strong>.</li><li>«Escribir a la tutora» abre el correo para <code>tutoria.dam@example.com</code>.</li><li>«Llamar a secretaría» marca el <code>+34 600 000 000</code> (en el enlace, sin espacios).</li><li>«Descargar el horario» <strong>descarga</strong> <code>horario.pdf</code> en vez de abrirlo.</li></ul>
<p>El texto de cada enlace es lo que va antes de los dos puntos.</p>`,
  hint: `<code>target="_blank"</code>, <code>href="mailto:…"</code>, <code>href="tel:+34…"</code> y el atributo <code>download</code>.`,
  css: `body { margin: 16px; line-height: 1.8; }
a { color: #1d4ed8; }`,
  html: `<h2>Recursos</h2>
<ul>
  <li>Referencia de HTML: https://developer.mozilla.org/es/docs/Web/HTML</li>
  <li>Escribir a la tutora: tutoria.dam@example.com</li>
  <li>Llamar a secretaría: +34 600 000 000</li>
  <li>Descargar el horario: horario.pdf</li>
</ul>`,
  sol: `<h2>Recursos</h2>
<ul>
  <li><a href="https://developer.mozilla.org/es/docs/Web/HTML" target="_blank">Referencia de HTML</a></li>
  <li><a href="mailto:tutoria.dam@example.com">Escribir a la tutora</a></li>
  <li><a href="tel:+34600000000">Llamar a secretaría</a></li>
  <li><a href="horario.pdf" download>Descargar el horario</a></li>
</ul>`,
  checks: [
    { d: 'Cuatro enlaces', count: ['a', 4] },
    { d: 'MDN se abre en una pestaña nueva', exists: 'a[href="https://developer.mozilla.org/es/docs/Web/HTML"][target="_blank"]' },
    { d: 'Enlace de correo', exists: 'a[href="mailto:tutoria.dam@example.com"]' },
    { d: 'Enlace de teléfono sin espacios', js: (U) => U.qa('a[href^="tel:"]').some((a) => a.getAttribute('href') === 'tel:+34600000000') || 'Espero href="tel:+34600000000"' },
    { d: 'El horario se descarga', exists: 'a[href="horario.pdf"][download]' },
    { d: 'Los textos de los enlaces son los de la lista', js: (U) => U.qa('a').map((a) => a.textContent.trim()).join('|') === 'Referencia de HTML|Escribir a la tutora|Llamar a secretaría|Descargar el horario' || 'Algún enlace no tiene el texto indicado' }
  ]
},
{
  id: 'marcadores-indice', block: 'sem', title: 'Índice con marcadores', edit: 'html', w: 480, h: 300,
  tags: ['id', 'href="#…"', 'aside'],
  brief: `<p>El índice lateral no lleva a ningún sitio. Haz que cada enlace salte a su artículo y que «Volver arriba» lleve al título principal.</p>
<ul><li>Pon un <code>id</code> a cada artículo y al <code>&lt;h1&gt;</code> (usa <code>inicio</code> para el título).</li><li>Cada enlace del índice apunta a su artículo con <code>#id</code>.</li></ul>`,
  hint: `<code>&lt;article id="tablas"&gt;</code> y <code>&lt;a href="#tablas"&gt;</code>. El <code>id</code> no lleva espacios y no puede repetirse.`,
  css: `body { margin: 12px; font-size: 14px; }
h1 { font-size: 20px; margin: 0 0 8px; }
aside { float: right; width: 140px; margin-left: 12px; padding: 8px; background: #f1f5f9; border-radius: 6px; }
aside ul { margin: 0; padding-left: 18px; }
article { margin-bottom: 8px; }
article h2 { font-size: 16px; margin: 0; }
article p { margin: 2px 0 0; }`,
  html: `<h1>Apuntes de HTML</h1>
<aside>
  <ul>
    <li><a href="#">Listas</a></li>
    <li><a href="#">Tablas</a></li>
    <li><a href="#">Formularios</a></li>
  </ul>
</aside>
<article>
  <h2>Listas</h2>
  <p>Ordenadas, sin orden y de definiciones.</p>
</article>
<article>
  <h2>Tablas</h2>
  <p>Filas, celdas, cabeceras y títulos.</p>
</article>
<article>
  <h2>Formularios</h2>
  <p>Campos, etiquetas y validación.</p>
</article>
<p><a href="#">Volver arriba</a></p>`,
  sol: `<h1 id="inicio">Apuntes de HTML</h1>
<aside>
  <ul>
    <li><a href="#listas">Listas</a></li>
    <li><a href="#tablas">Tablas</a></li>
    <li><a href="#formularios">Formularios</a></li>
  </ul>
</aside>
<article id="listas">
  <h2>Listas</h2>
  <p>Ordenadas, sin orden y de definiciones.</p>
</article>
<article id="tablas">
  <h2>Tablas</h2>
  <p>Filas, celdas, cabeceras y títulos.</p>
</article>
<article id="formularios">
  <h2>Formularios</h2>
  <p>Campos, etiquetas y validación.</p>
</article>
<p><a href="#inicio">Volver arriba</a></p>`,
  checks: [
    { d: 'Los tres artículos tienen <code>id</code>', attr: ['article', 'id'] },
    { d: 'Cada enlace del índice lleva a su artículo', js: (U) => { const as = U.qa('aside a'), arts = U.qa('article'); if (as.length !== 3) return 'El índice debe tener 3 enlaces'; for (let i = 0; i < 3; i++) { const h = as[i].getAttribute('href') || ''; const t = h.startsWith('#') ? U.doc.getElementById(h.slice(1)) : null; if (t !== arts[i]) return '«' + as[i].textContent.trim() + '» no lleva a su artículo'; } return true; } },
    { d: 'El título principal tiene <code>id="inicio"</code>', exists: 'h1#inicio' },
    { d: '«Volver arriba» lleva al título', exists: 'body > p > a[href="#inicio"]' }
  ]
},
{id: 'migas-de-pan', block: 'sem', title: 'Migas de pan accesibles', edit: 'html', w: 480, h: 120,
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
