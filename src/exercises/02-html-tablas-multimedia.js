/* ===================== BLOQUE · UP02–UP03 · TABLAS, MULTIMEDIA Y METADATOS ===================== */
window.EXERCISES.push(
{id: 'tabla-horario', block: 'med', title: 'Tabla de horario', edit: 'html', w: 480, h: 240,
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
  ]},
{id: 'tabla-colspan', block: 'med', title: 'Cabecera doble con colspan y rowspan', edit: 'html', w: 480, h: 220,
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
  ]},
{
  id: 'tabla-tfoot', block: 'med', title: 'Presupuesto con pie de tabla', edit: 'html', w: 480, h: 250,
  tags: ['caption', 'thead', 'tbody', 'tfoot', 'colspan'],
  brief: `<p>Termina la tabla del presupuesto del viaje de fin de curso:</p>
<ul><li>Título «Viaje a Valencia» con <code>&lt;caption&gt;</code>.</li><li>La fila de cabecera, dentro de <code>&lt;thead&gt;</code>; los gastos, en <code>&lt;tbody&gt;</code>.</li><li>La fila del total va en el <strong>pie de la tabla</strong>: la celda «Total» es una cabecera que ocupa <strong>dos columnas</strong> y a su lado va <code>355 €</code>.</li></ul>`,
  hint: `<code>&lt;tfoot&gt;&lt;tr&gt;&lt;th colspan="2"&gt;Total&lt;/th&gt;&lt;td&gt;355 €&lt;/td&gt;&lt;/tr&gt;&lt;/tfoot&gt;</code>. El <code>&lt;tfoot&gt;</code> va después del <code>&lt;tbody&gt;</code>.`,
  css: `body { margin: 16px; }
table { border-collapse: collapse; font-size: 14px; }
caption { font-weight: 700; padding-bottom: 6px; }
th, td { border: 1px solid #cbd5e1; padding: 6px 12px; text-align: left; }
thead th { background: #e0e7ff; }
tfoot th, tfoot td { background: #f1f5f9; font-weight: 700; }
td:last-child { text-align: right; }`,
  html: `<table>
  <tr><td>Concepto</td><td>Unidades</td><td>Importe</td></tr>
  <tr><td>Autobús</td><td>1</td><td>180 €</td></tr>
  <tr><td>Entradas al Oceanogràfic</td><td>5</td><td>125 €</td></tr>
  <tr><td>Comida</td><td>5</td><td>50 €</td></tr>
  <tr><td>Total</td><td></td><td>355 €</td></tr>
</table>`,
  sol: `<table>
  <caption>Viaje a Valencia</caption>
  <thead>
    <tr><th>Concepto</th><th>Unidades</th><th>Importe</th></tr>
  </thead>
  <tbody>
    <tr><td>Autobús</td><td>1</td><td>180 €</td></tr>
    <tr><td>Entradas al Oceanogràfic</td><td>5</td><td>125 €</td></tr>
    <tr><td>Comida</td><td>5</td><td>50 €</td></tr>
  </tbody>
  <tfoot>
    <tr><th colspan="2">Total</th><td>355 €</td></tr>
  </tfoot>
</table>`,
  checks: [
    { d: 'Título con <code>&lt;caption&gt;</code>', js: (U) => { const c = U.q('table > caption'); return (c && c.textContent.trim() === 'Viaje a Valencia') || 'Falta <caption>Viaje a Valencia</caption>'; } },
    { d: 'Cabecera en <code>&lt;thead&gt;</code> con 3 <code>&lt;th&gt;</code>', count: ['thead > tr > th', 3] },
    { d: 'Tres gastos en <code>&lt;tbody&gt;</code>', count: ['tbody > tr', 3] },
    { d: 'Fila del total en <code>&lt;tfoot&gt;</code>', count: ['tfoot > tr', 1] },
    { d: '«Total» es un <code>&lt;th colspan="2"&gt;</code>', js: (U) => U.qa('tfoot th[colspan="2"]').some((t) => t.textContent.trim() === 'Total') || 'No veo <th colspan="2">Total</th> en el pie' },
    { d: 'Las celdas quedan en su sitio', rect: 'td' }
  ]
},
{id: 'figura-pie', block: 'med', title: 'Imagen con pie de foto', edit: 'html', w: 480, h: 260,
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
  ]},
{
  id: 'imagen-enlace', block: 'med', title: 'Miniaturas que enlazan', edit: 'html', w: 480, h: 170,
  tags: ['img', 'alt', 'width / height', 'a > img'],
  brief: `<p>Galería de fotos de la excursión. Cada miniatura:</p>
<ul><li>Lleva <code>width="120"</code> y <code>height="70"</code> para que el navegador reserve su sitio antes de cargarla.</li><li>Tiene un <code>alt</code> que describe <strong>esa</strong> foto (no vale el mismo texto para las tres).</li><li>Es un enlace a la imagen grande (el mismo <code>src</code>) que se abre en una pestaña nueva.</li></ul>`,
  hint: `<code>&lt;a href="…" target="_blank"&gt;&lt;img src="…" alt="…" width="120" height="70"&gt;&lt;/a&gt;</code>. Copia el <code>src</code> de cada imagen al <code>href</code> de su enlace.`,
  css: `body { margin: 16px; }
p { margin: 0 0 8px; }
a { display: inline-block; margin-right: 8px; }
img { border-radius: 6px; vertical-align: top; }`,
  html: `<p>Excursión al Montgó</p>
<img src="${IMG}">
<img src="${IMG}">
<img src="${IMG}">`,
  sol: `<p>Excursión al Montgó</p>
<a href="${IMG}" target="_blank"><img src="${IMG}" alt="Grupo de clase en la salida del sendero" width="120" height="70"></a>
<a href="${IMG}" target="_blank"><img src="${IMG}" alt="Vista de Dénia desde la cumbre" width="120" height="70"></a>
<a href="${IMG}" target="_blank"><img src="${IMG}" alt="Comida en el merendero del parque" width="120" height="70"></a>`,
  checks: [
    { d: 'Tres imágenes dentro de enlaces', count: ['a > img', 3] },
    { d: 'Todas con <code>width="120"</code> y <code>height="70"</code>', count: ['img[width="120"][height="70"]', 3] },
    { d: 'Todas con <code>alt</code>', attr: ['img', 'alt'] },
    { d: 'Cada <code>alt</code> es distinto', js: (U) => new Set(U.qa('img').map((i) => (i.getAttribute('alt') || '').trim().toLowerCase())).size === 3 || 'Hay textos alternativos repetidos' },
    { d: 'Los enlaces llevan a la imagen y se abren en otra pestaña', js: (U) => U.qa('a').length === 3 && U.qa('a').every((a) => a.target === '_blank' && a.querySelector('img') && a.getAttribute('href') === a.querySelector('img').getAttribute('src')) || 'Algún enlace no lleva a su imagen o no tiene target="_blank"' }
  ]
},
{
  id: 'multimedia', block: 'med', title: 'Vídeo y audio con alternativas', edit: 'html', w: 480, h: 330,
  tags: ['video controls', 'source', 'audio', 'texto alternativo'],
  brief: `<p>La página de la UP06 enlaza un vídeo y un pódcast, pero no se pueden reproducir. Incrústalos:</p>
<ul><li>Un <code>&lt;video&gt;</code> de <code>320</code> de ancho con <strong>controles</strong> y dos formatos: <code>media/flexbox.webm</code> y <code>media/flexbox.mp4</code>, cada uno con su <code>type</code>.</li><li>Dentro del vídeo, un texto para navegadores que no lo reproduzcan.</li><li>Un <code>&lt;audio&gt;</code> con controles para <code>media/podcast-up06.mp3</code>.</li></ul>
<p class="muted">La vista previa no encuentra los archivos: lo que importa es el código.</p>`,
  hint: `<code>&lt;video width="320" controls&gt;&lt;source src="…webm" type="video/webm"&gt;&lt;source src="…mp4" type="video/mp4"&gt;Tu navegador…&lt;/video&gt;</code>. El audio funciona igual, con <code>type="audio/mpeg"</code> o con <code>src</code> directamente.`,
  css: `body { margin: 16px; }
h2 { font-size: 17px; margin: 0 0 6px; }
video { display: block; background: #0f172a; margin-bottom: 12px; }
audio { display: block; }`,
  html: `<h2>Flexbox en 10 minutos</h2>
<p><a href="media/flexbox.mp4">Ver el vídeo</a></p>
<h2>Pódcast de la UP06</h2>
<p><a href="media/podcast-up06.mp3">Escuchar el pódcast</a></p>`,
  sol: `<h2>Flexbox en 10 minutos</h2>
<video width="320" controls>
  <source src="media/flexbox.webm" type="video/webm">
  <source src="media/flexbox.mp4" type="video/mp4">
  Tu navegador no puede reproducir el vídeo. <a href="media/flexbox.mp4">Descárgalo aquí</a>.
</video>
<h2>Pódcast de la UP06</h2>
<audio controls src="media/podcast-up06.mp3"></audio>`,
  checks: [
    { d: '<code>&lt;video&gt;</code> con controles y 320 de ancho', exists: 'video[controls][width="320"]' },
    { d: 'Dos <code>&lt;source&gt;</code> con su <code>type</code>', js: (U) => { const s = U.qa('video > source'); const t = s.map((x) => x.getAttribute('type')).join(','); return (s.length === 2 && t === 'video/webm,video/mp4' && s[0].getAttribute('src') === 'media/flexbox.webm' && s[1].getAttribute('src') === 'media/flexbox.mp4') || 'Espero los dos source (webm y mp4) con src y type'; } },
    { d: 'Texto alternativo dentro del vídeo', js: (U) => { const v = U.q('video'); return (v && v.textContent.trim().length > 10) || 'Añade un texto dentro de <video>'; } },
    { d: '<code>&lt;audio&gt;</code> con controles para el pódcast', js: (U) => { const a = U.q('audio[controls]'); if (!a) return 'No veo <audio controls>'; const src = a.getAttribute('src') || (a.querySelector('source') || { getAttribute: () => '' }).getAttribute('src'); return src === 'media/podcast-up06.mp3' || 'El audio no apunta a media/podcast-up06.mp3'; } },
    { d: 'Ya no hacen falta los enlaces sueltos', none: 'body > p > a' }
  ]
},
{
  id: 'iframe-limpio', block: 'med', title: 'Limpiar el código de YouTube y Maps', edit: 'html', w: 480, h: 420,
  tags: ['iframe', 'title', 'validación W3C', 'sin style'],
  brief: `<p>Has pegado los códigos de inserción de YouTube y Google Maps, pero el validador del W3C protesta y en la práctica no se admiten estilos dentro del HTML. Déjalos limpios:</p>
<ul><li>Quita <code>frameborder</code> (obsoleto) y <code>style</code> (los estilos van en el CSS).</li><li>Añade a cada <code>&lt;iframe&gt;</code> un <code>title</code> que diga qué contiene (lo leen los lectores de pantalla).</li><li>Conserva el resto: <code>src</code>, <code>width</code>, <code>height</code> y <code>allowfullscreen</code>.</li></ul>
<p class="muted">La vista previa no carga contenido externo.</p>`,
  hint: `Un atributo booleano como <code>allowfullscreen</code> no necesita valor. Los demás atributos se quedan tal cual.`,
  css: `body { margin: 16px; }
h2 { font-size: 16px; margin: 0 0 6px; }
iframe { display: block; border: 2px dashed #94a3b8; background: #f1f5f9; margin-bottom: 12px; }`,
  html: `<h2>Cómo funciona Flexbox</h2>
<iframe width="320" height="180" src="https://www.youtube.com/embed/abc123XYZ00" frameborder="0" allow="accelerometer; encrypted-media; picture-in-picture" allowfullscreen></iframe>
<h2>Dónde está el instituto</h2>
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12" width="320" height="140" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`,
  sol: `<h2>Cómo funciona Flexbox</h2>
<iframe width="320" height="180" src="https://www.youtube.com/embed/abc123XYZ00" title="Vídeo: cómo funciona Flexbox" allow="accelerometer; encrypted-media; picture-in-picture" allowfullscreen></iframe>
<h2>Dónde está el instituto</h2>
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12" width="320" height="140" title="Mapa: ubicación del IES Severo Ochoa" allowfullscreen loading="lazy"></iframe>`,
  checks: [
    { d: 'Siguen los dos <code>&lt;iframe&gt;</code>', count: ['iframe', 2] },
    { d: 'Sin <code>frameborder</code> ni <code>style</code>', none: 'iframe[frameborder], iframe[style], [style]' },
    { d: 'Cada <code>&lt;iframe&gt;</code> tiene <code>title</code>', attr: ['iframe', 'title'] },
    { d: 'Los <code>title</code> son distintos', js: (U) => { const t = U.qa('iframe').map((i) => (i.title || '').trim()); return t[0] !== t[1] || 'Los dos title son iguales'; } },
    { d: 'Se conservan <code>src</code>, <code>width</code> y <code>height</code>', js: (U, S) => U.qa('iframe').length === 2 && U.qa('iframe').every((f, i) => { const s = S.qa('iframe')[i]; return ['src', 'width', 'height'].every((a) => f.getAttribute(a) === s.getAttribute(a)); }) || 'Has cambiado algún src, width o height' },
    { d: 'Ambos permiten pantalla completa', count: ['iframe[allowfullscreen]', 2] }
  ]
},
{
  id: 'head-metadatos', block: 'med', title: 'Metainformación en el head', edit: 'html', w: 480, h: 150,
  tags: ['meta charset', 'viewport', 'description', 'author', 'favicon'],
  brief: `<p>Esta vez escribes el documento entero. Completa el <code>&lt;head&gt;</code>:</p>
<ul><li>Codificación <code>UTF-8</code>.</li><li>Metaetiqueta <code>viewport</code> con el ancho igual al del dispositivo y escala inicial 1.</li><li>Un <code>&lt;title&gt;</code> que describa la página (no «Documento»).</li><li>Descripción y autor con sus <code>&lt;meta name="…"&gt;</code>.</li><li>Favicon <code>favicon.ico</code> con una ruta relativa.</li></ul>
<p class="muted">En la vista previa solo se ve el <code>&lt;body&gt;</code>.</p>`,
  hint: `<code>&lt;meta charset="UTF-8"&gt;</code>, <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code>, <code>&lt;meta name="description" content="…"&gt;</code>, <code>&lt;meta name="author" content="…"&gt;</code> y <code>&lt;link rel="icon" href="favicon.ico"&gt;</code>. Emmet <code>!</code> genera casi todo.`,
  css: `body { margin: 16px; }
h1 { font-size: 20px; margin: 0 0 6px; }
p { margin: 0; }`,
  html: `<!DOCTYPE html>
<html lang="es">
<head>
  <title>Documento</title>
</head>
<body>
  <h1>Club de robótica del IES Severo Ochoa</h1>
  <p>Nos vemos los jueves por la tarde en el aula 21.</p>
</body>
</html>`,
  sol: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Club de robótica · IES Severo Ochoa</title>
  <meta name="description" content="Horario, proyectos y cómo apuntarse al club de robótica del IES Severo Ochoa.">
  <meta name="author" content="Departamento de Informática">
  <link rel="icon" href="favicon.ico">
</head>
<body>
  <h1>Club de robótica del IES Severo Ochoa</h1>
  <p>Nos vemos los jueves por la tarde en el aula 21.</p>
</body>
</html>`,
  checks: [
    { d: 'Empieza por <code>&lt;!DOCTYPE html&gt;</code> y el idioma es español', js: (U, S, src) => (/^\s*<!doctype html>/i.test(src.html) && /<html[^>]*\blang=["']?es\b/i.test(src.html)) || 'Revisa el doctype y <html lang="es">' },
    { d: 'Codificación UTF-8', src: ['html', /<meta\s+charset=["']?utf-8["']?\s*\/?>/i], msg: 'Falta <meta charset="UTF-8">' },
    { d: 'Viewport con <code>width=device-width</code> e <code>initial-scale=1</code>', js: (U) => { const m = U.q('meta[name="viewport"]'); const c = m ? m.content.replace(/\s/g, '') : ''; return (/width=device-width/.test(c) && /initial-scale=1(\.0)?(,|$)/.test(c)) || 'Revisa el content del viewport'; } },
    { d: 'Título descriptivo', js: (U) => { const t = U.q('title'); const s = t ? t.textContent.trim() : ''; return (s.length >= 10 && !/^documento$/i.test(s)) || 'El <title> debe describir la página'; } },
    { d: 'Descripción y autor', js: (U) => ['description', 'author'].every((n) => { const m = U.q('meta[name="' + n + '"]'); return m && m.content.trim().length > 0; }) || 'Falta <meta name="description"> o <meta name="author"> con content' },
    { d: 'Favicon con ruta relativa', exists: 'link[rel~="icon"][href="favicon.ico"]' }
  ]
},
{
  id: 'seo-encabezados', block: 'med', title: 'HTML pensado para el SEO', edit: 'html', w: 480, h: 400,
  tags: ['un solo h1', 'jerarquía', 'alt', 'texto de enlace'],
  brief: `<p>Los buscadores (y los lectores de pantalla) entienden la página por su estructura. Corrige estos fallos:</p>
<ul><li>Solo puede haber <strong>un</strong> <code>&lt;h1&gt;</code>. «Presentación» es un apartado.</li><li>Los niveles no se saltan: después de un <code>h2</code> viene un <code>h3</code>, no un <code>h4</code>.</li><li>«Horario de tutorías» es un apartado, aunque ahora esté puesto como párrafo en negrita.</li><li>La imagen necesita texto alternativo.</li><li>«pincha aquí» no dice nada: el texto del enlace debe explicar adónde lleva.</li></ul>`,
  hint: `Estructura final: <code>h1</code> → <code>h2</code> Presentación → <code>h3</code> Requisitos → <code>h2</code> Horario. El enlace puede quedar como «…<a>información sobre la matrícula</a>».`,
  css: `body { margin: 16px; font-size: 14px; }
h1 { font-size: 22px; margin: 0 0 8px; }
h2 { font-size: 18px; margin: 12px 0 4px; }
h3 { font-size: 15px; margin: 8px 0 4px; }
p { margin: 0 0 6px; }
img { width: 160px; display: block; }`,
  html: `<h1>Ciclo de DAM semipresencial</h1>
<h1>Presentación</h1>
<p>Dos cursos para aprender a desarrollar aplicaciones compaginándolo con el trabajo.</p>
<h4>Requisitos de acceso</h4>
<p>Bachillerato, un ciclo de grado medio o la prueba de acceso.</p>
<p><b>Horario de tutorías</b></p>
<p>Tutorías colectivas de lunes a jueves, de 16:00 a 21:00.</p>
<img src="${IMG}">
<p>Para matricularte, <a href="matricula.html">pincha aquí</a>.</p>`,
  sol: `<h1>Ciclo de DAM semipresencial</h1>
<h2>Presentación</h2>
<p>Dos cursos para aprender a desarrollar aplicaciones compaginándolo con el trabajo.</p>
<h3>Requisitos de acceso</h3>
<p>Bachillerato, un ciclo de grado medio o la prueba de acceso.</p>
<h2>Horario de tutorías</h2>
<p>Tutorías colectivas de lunes a jueves, de 16:00 a 21:00.</p>
<img src="${IMG}" alt="Alumnado del ciclo en una tutoría colectiva">
<p>Para matricularte, consulta la <a href="matricula.html">información sobre la matrícula</a>.</p>`,
  checks: [
    { d: 'Un único <code>&lt;h1&gt;</code>', count: ['h1', 1] },
    { d: 'Dos apartados <code>&lt;h2&gt;</code> y un <code>&lt;h3&gt;</code>', js: (U) => (U.qa('h2').length === 2 && U.qa('h3').length === 1 && U.qa('h4, h5, h6').length === 0) || 'Espero 2 h2, 1 h3 y ningún h4' },
    { d: 'Los niveles de encabezado no se saltan', js: (U) => { let prev = 0; for (const h of U.qa('h1, h2, h3, h4, h5, h6')) { const n = +h.tagName[1]; if (n > prev + 1) return 'Saltas de h' + prev + ' a h' + n; prev = n; } return true; } },
    { d: '«Horario de tutorías» es un encabezado, sin <code>&lt;b&gt;</code>', js: (U) => (!U.q('b') && U.qa('h2').some((h) => h.textContent.trim() === 'Horario de tutorías')) || 'Debe ser un <h2> y sin <b>' },
    { d: 'La imagen tiene <code>alt</code>', attr: ['img', 'alt'] },
    { d: 'El texto del enlace explica adónde lleva', js: (U) => U.qa('a').every((a) => a.textContent.trim().length >= 12 && !/aqu[ií]|pincha|clic/i.test(a.textContent)) || 'El texto del enlace no describe el destino' }
  ]
},
{
  id: 'ficha-tecnica', block: 'med', title: 'Ficha técnica completa', edit: 'html', w: 480, h: 560,
  tags: ['h1/h2', 'img', 'a', 'table', 'ul', 'footer'],
  brief: `<p>Como en la actividad 1 de la UP02, monta la ficha técnica con los datos del comentario:</p>
<ol><li><code>&lt;h1&gt;</code> con el título y <code>&lt;h2&gt;</code> con el género.</li><li>Justo debajo, la imagen de portada con su <code>alt</code>.</li><li>Un párrafo con la trama y otro con el enlace «Leer más en Wikipedia».</li><li><code>&lt;h2&gt;</code> «Personajes principales» y una tabla con <code>&lt;thead&gt;</code> y <code>&lt;tbody&gt;</code> de tres columnas.</li><li><code>&lt;h2&gt;</code> «Características» y una lista sin orden.</li><li>Un <code>&lt;footer&gt;</code> con el enlace a la Biblioteca Virtual Cervantes.</li></ol>`,
  hint: `Emmet te ahorra la tabla: <code>table&gt;thead&gt;tr&gt;th*3^^tbody&gt;tr*3&gt;td*3</code> y pulsa <kbd>Tab</kbd>. En <code>href</code> va la URL completa, con <code>https://</code>.`,
  css: `body { margin: 16px; font-size: 14px; }
h1 { font-size: 22px; margin: 0; }
h2 { font-size: 16px; margin: 12px 0 6px; }
h1 + h2 { margin-top: 0; color: #64748b; font-weight: 500; }
img { width: 200px; display: block; margin: 6px 0; border-radius: 6px; }
p { margin: 0 0 6px; }
table { border-collapse: collapse; }
th, td { border: 1px solid #cbd5e1; padding: 4px 8px; text-align: left; }
thead th { background: #f1f5f9; }
ul { margin: 0; }
footer { margin-top: 10px; font-size: 13px; }`,
  html: `<!--
Título: Don Quijote de la Mancha
Género: Novela
Portada: ${IMG}
Trama: Un hidalgo enloquece leyendo libros de caballerías y sale a recorrer La Mancha como caballero andante, acompañado de su escudero.
Wikipedia: https://es.wikipedia.org/wiki/Don_Quijote_de_la_Mancha

Personajes (Personaje · Rol · Rasgo):
  Don Quijote · Protagonista · Idealista
  Sancho Panza · Escudero · Práctico
  Dulcinea · Dama soñada · Idealizada

Características:
  Publicada en dos partes (1605 y 1615)
  Parodia de los libros de caballerías
  Considerada la primera novela moderna

Pie: Leer la obra completa en https://www.cervantesvirtual.com/
-->
`,
  sol: `<h1>Don Quijote de la Mancha</h1>
<h2>Novela</h2>
<img src="${IMG}" alt="Portada de Don Quijote de la Mancha">
<p>Un hidalgo enloquece leyendo libros de caballerías y sale a recorrer La Mancha como caballero andante, acompañado de su escudero.</p>
<p><a href="https://es.wikipedia.org/wiki/Don_Quijote_de_la_Mancha">Leer más en Wikipedia</a></p>
<h2>Personajes principales</h2>
<table>
  <thead>
    <tr><th>Personaje</th><th>Rol</th><th>Rasgo</th></tr>
  </thead>
  <tbody>
    <tr><td>Don Quijote</td><td>Protagonista</td><td>Idealista</td></tr>
    <tr><td>Sancho Panza</td><td>Escudero</td><td>Práctico</td></tr>
    <tr><td>Dulcinea</td><td>Dama soñada</td><td>Idealizada</td></tr>
  </tbody>
</table>
<h2>Características</h2>
<ul>
  <li>Publicada en dos partes (1605 y 1615)</li>
  <li>Parodia de los libros de caballerías</li>
  <li>Considerada la primera novela moderna</li>
</ul>
<footer>
  <p><a href="https://www.cervantesvirtual.com/">Leer la obra completa en la Biblioteca Virtual Cervantes</a></p>
</footer>`,
  checks: [
    { d: '<code>&lt;h1&gt;</code> con el título seguido del <code>&lt;h2&gt;</code> del género', js: (U) => { const h = U.q('h1 + h2'); return (h && U.q('h1').textContent.trim() === 'Don Quijote de la Mancha' && h.textContent.trim() === 'Novela') || 'Revisa el h1 y el h2 que va justo detrás'; } },
    { d: 'Imagen justo debajo del género, con <code>alt</code>', exists: 'h1 + h2 + img[alt]:not([alt=""])' },
    { d: 'Enlace «Leer más en Wikipedia» con la URL completa', js: (U) => U.qa('a[href="https://es.wikipedia.org/wiki/Don_Quijote_de_la_Mancha"]').some((a) => a.textContent.trim() === 'Leer más en Wikipedia') || 'No veo el enlace a Wikipedia con ese texto' },
    { d: 'Tabla con 3 cabeceras en <code>&lt;thead&gt;</code>', count: ['table > thead > tr > th', 3] },
    { d: 'Tres personajes en <code>&lt;tbody&gt;</code> (9 celdas)', count: ['table > tbody > tr > td', 9] },
    { d: 'Características en una lista sin orden', count: ['ul > li', 3] },
    { d: 'Pie con el enlace a la Biblioteca Virtual Cervantes', exists: 'footer a[href^="https://www.cervantesvirtual.com"]' },
    { d: 'Tres encabezados <code>&lt;h2&gt;</code>', count: ['h2', 3] }
  ]
}
);
