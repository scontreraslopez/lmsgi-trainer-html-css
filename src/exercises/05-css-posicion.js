/* ===================== BLOQUE · UP05 · DISPLAY, POSICIÓN, PSEUDOCLASES, TABLAS Y FORMULARIOS ===================== */
window.EXERCISES.push(
{
  id: 'display-visibilidad', block: 'pos', title: 'Ocultar con o sin hueco', edit: 'css', w: 480, h: 250,
  tags: ['display: none', 'visibility: hidden', 'inline-block'],
  brief: `<ul><li>El aviso de cookies (<code>.cookies</code>) desaparece <strong>sin dejar hueco</strong>.</li><li>El paso <code>.pendiente</code> se oculta pero <strong>conserva su hueco</strong>, para que los otros pasos no se muevan.</li><li>Las etiquetas (<code>.tag</code>) son enlaces, de línea: haz que acepten <code>width: 70px</code> y <code>padding: 4px 0</code> sin dejar de ir en línea. Texto centrado.</li></ul>`,
  hint: `<code>display: none</code> frente a <code>visibility: hidden</code>. Un elemento <code>inline</code> ignora <code>width</code>; uno <code>inline-block</code>, no.`,
  html: `<p class="cookies">Usamos cookies técnicas para guardar tu progreso.</p>
<ol class="pasos">
  <li>Preinscripción</li>
  <li class="pendiente">Pago de tasas</li>
  <li>Elección de horario</li>
</ol>
<p>Etiquetas: <a class="tag" href="#">html</a> <a class="tag" href="#">css</a> <a class="tag" href="#">xml</a></p>`,
  css: `body { margin: 16px; font-size: 14px; }
.cookies { padding: 8px; background: #fef3c7; }
.pasos li { padding: 4px; background: #e0e7ff; margin-bottom: 4px; }
.tag { background: #1e293b; color: #fff; border-radius: 4px; text-decoration: none; }
`,
  sol: `body { margin: 16px; font-size: 14px; }
.cookies { padding: 8px; background: #fef3c7; }
.pasos li { padding: 4px; background: #e0e7ff; margin-bottom: 4px; }
.tag { background: #1e293b; color: #fff; border-radius: 4px; text-decoration: none; }

.cookies { display: none; }
.pendiente { visibility: hidden; }

.tag {
  display: inline-block;
  width: 70px;
  padding: 4px 0;
  text-align: center;
}`,
  checks: [
    { d: 'El aviso de cookies no ocupa sitio', css: ['.cookies', ['display']] },
    { d: 'El paso pendiente es invisible', css: ['.pendiente', ['visibility']] },
    { d: 'Los pasos no se mueven', rect: '.pasos li' },
    { d: 'Etiquetas en línea, pero con ancho y relleno', css: ['.tag', ['display', 'width', 'padding', 'text-align']] },
    { d: 'Etiquetas en su sitio', rect: '.tag' }
  ]
},
{
  id: 'inline-block-huecos', block: 'pos', title: 'El hueco fantasma entre inline-block', edit: 'css', w: 480, h: 150,
  tags: ['inline-block', 'espacios en blanco', 'font-size: 0'],
  brief: `<p>Las tres pestañas miden <code>100px</code> y la barra, <code>300px</code>. Deberían caber justas, pero la tercera baja de línea y entre ellas aparecen huecos. <strong>Sin tocar el HTML</strong>, haz que queden pegadas y en una sola fila.</p>`,
  hint: `Los saltos de línea del HTML entre las etiquetas cuentan como un espacio de texto. Un truco clásico: <code>font-size: 0</code> en el padre y devolver el tamaño a los hijos.`,
  html: `<nav class="pestanas">
  <a href="#">HTML</a>
  <a href="#">CSS</a>
  <a href="#">XML</a>
</nav>`,
  css: `body { margin: 24px; }

.pestanas {
  width: 300px;
  background: #e2e8f0;
}

.pestanas a {
  display: inline-block;
  width: 100px;
  padding: 8px 0;
  text-align: center;
  font-size: 16px;
  background: #1e3a8a;
  color: #fff;
  text-decoration: none;
}
.pestanas a + a { background: #1d4ed8; }
.pestanas a + a + a { background: #3b82f6; }
`,
  sol: `body { margin: 24px; }

.pestanas {
  width: 300px;
  background: #e2e8f0;
  font-size: 0;
}

.pestanas a {
  display: inline-block;
  width: 100px;
  padding: 8px 0;
  text-align: center;
  font-size: 16px;
  background: #1e3a8a;
  color: #fff;
  text-decoration: none;
}
.pestanas a + a { background: #1d4ed8; }
.pestanas a + a + a { background: #3b82f6; }`,
  checks: [
    { d: 'Las tres pestañas en una fila, pegadas', rect: '.pestanas a', tol: 1 },
    { d: 'Siguen midiendo 100 px y con letra de 16 px', css: ['.pestanas a', ['width', 'font-size']] },
    { d: 'La barra sigue midiendo 300 px', css: ['.pestanas', ['width']] }
  ]
},
{
  id: 'menu-horizontal', block: 'pos', title: 'Menú horizontal', edit: 'css', w: 520, h: 120,
  tags: ['list-style: none', 'inline-block', 'display: block', ':hover'],
  brief: `<p>El menú clásico, sin Flexbox:</p>
<ul><li>La lista sin viñetas, sin márgenes ni relleno y con fondo <code>#1e293b</code>.</li><li>Cada <code>li</code> en línea (<code>inline-block</code>).</li><li>Los enlaces ocupan toda su caja (<code>display: block</code>) con relleno <code>12px 16px</code>, texto <code>#e2e8f0</code> y sin subrayado.</li><li>El enlace de la página actual (<code>.actual</code>) con fondo <code>#334155</code>.</li><li><strong>Al pasar el ratón</strong>, fondo <code>#f97316</code> y texto blanco.</li></ul>`,
  hint: `<code>.menu a:hover { … }</code>. Para que el fondo de la lista se vea, la lista tiene que tener altura: con <code>inline-block</code> la tiene; con <code>float</code> haría falta algo más.`,
  html: `<nav class="menu">
  <ul>
    <li><a class="actual" href="#">Inicio</a></li><li><a href="#">Rutas</a></li><li><a href="#">Cursos</a></li><li><a href="#">Contacto</a></li>
  </ul>
</nav>`,
  css: `body { margin: 16px; font-size: 15px; }
`,
  sol: `body { margin: 16px; font-size: 15px; }

.menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
  background: #1e293b;
}

.menu li { display: inline-block; }

.menu a {
  display: block;
  padding: 12px 16px;
  color: #e2e8f0;
  text-decoration: none;
}

.menu a.actual { background: #334155; }

.menu a:hover {
  background: #f97316;
  color: #fff;
}`,
  checks: [
    { d: 'Lista sin viñetas, márgenes ni relleno', css: ['.menu ul', ['list-style-type', 'margin', 'padding', 'background-color']] },
    { d: 'Enlaces: relleno, color y sin subrayado', css: ['.menu a', ['padding', 'color', 'text-decoration-line']] },
    { d: 'Fondo del enlace actual', css: ['.menu a', ['background-color']] },
    { d: 'Al pasar el ratón: fondo naranja y texto blanco', css: ['.menu a', ['background-color', 'color']], state: ':hover' },
    { d: 'La barra y los enlaces en su sitio', rect: '.menu ul, .menu a' }
  ]
},
{
  id: 'menu-vertical', block: 'pos', title: 'Menú vertical con separadores', edit: 'css', w: 480, h: 230,
  tags: [':first-child', ':last-child', ':hover', 'border-bottom'],
  brief: `<ul><li>Cada elemento del menú lleva un borde inferior de <code>1px</code> sólido <code>#fcd34d</code>, <strong>menos el último</strong>.</li><li>El primer enlace va en negrita.</li><li>Los enlaces ocupan toda la fila (<code>block</code>), relleno <code>8px 12px</code>, color <code>#1e293b</code>, sin subrayado y fondo <code>#fffbeb</code>. Al pasar el ratón, fondo <code>#fde68a</code>.</li></ul>
<p>No puedes añadir clases.</p>`,
  hint: `<code>.lateral li:last-child { border-bottom: none; }</code> (o <code>li:not(:last-child)</code>). Ojo: <code>a:first-child</code> no sirve, porque cada <code>a</code> es el primer hijo de su <code>li</code>.`,
  html: `<ul class="lateral">
  <li><a href="#">Apuntes</a></li>
  <li><a href="#">Prácticas</a></li>
  <li><a href="#">Tests</a></li>
  <li><a href="#">Calendario</a></li>
</ul>`,
  css: `body { margin: 16px; font-size: 14px; }
.lateral { width: 180px; margin: 0; padding: 0; list-style: none; border: 2px solid #f59e0b; border-radius: 6px; overflow: hidden; }
`,
  sol: `body { margin: 16px; font-size: 14px; }
.lateral { width: 180px; margin: 0; padding: 0; list-style: none; border: 2px solid #f59e0b; border-radius: 6px; overflow: hidden; }

.lateral li { border-bottom: 1px solid #fcd34d; }
.lateral li:last-child { border-bottom: none; }

.lateral li:first-child a { font-weight: 700; }

.lateral a {
  display: block;
  padding: 8px 12px;
  color: #1e293b;
  text-decoration: none;
  background: #fffbeb;
}

.lateral a:hover { background: #fde68a; }`,
  checks: [
    { d: 'Separador debajo de cada elemento salvo el último', css: ['.lateral li', ['border-bottom-width', 'border-bottom-style', 'border-bottom-color']] },
    { d: 'Solo el primero en negrita', css: ['.lateral a', ['font-weight']] },
    { d: 'Enlaces: color, fondo y sin subrayado', css: ['.lateral a', ['display', 'color', 'background-color', 'text-decoration-line']] },
    { d: 'Al pasar el ratón cambia el fondo', css: ['.lateral a', ['background-color']], state: ':hover' },
    { d: 'Cada enlace en su sitio', rect: '.lateral a' }
  ]
},
{id: 'selectores-atributo', block: 'pos', title: 'Selectores sin tocar el HTML', edit: 'css', w: 480, h: 260,
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
  ]},
{
  id: 'pseudoelementos', block: 'pos', title: 'Contenido generado y primera letra', edit: 'css', w: 480, h: 270,
  tags: ['::before', '::after', 'content', '::first-letter'],
  brief: `<p>Sin tocar el HTML:</p>
<ul><li>La primera letra de la entradilla, a <code>2em</code>, en negrita y en <code>#9a3412</code>.</li><li>La lista <code>.ventajas</code> sin viñetas ni sangría; delante de cada elemento, un <code>"✔"</code> en <code>#16a34a</code> con <code>6px</code> de margen a la derecha.</li><li>Detrás de cada precio, el texto <code>" €"</code> (con el espacio).</li></ul>`,
  hint: `<code>::before</code> y <code>::after</code> no aparecen si no tienen <code>content</code>. <code>.entradilla::first-letter { … }</code>, <code>.ventajas li::before { content: "✔"; … }</code> y <code>.precio::after { content: " €"; }</code>.`,
  html: `<p class="entradilla">En este curso aprenderás a maquetar páginas con HTML y CSS desde cero.</p>
<ul class="ventajas">
  <li>Ejercicios corregidos al momento</li>
  <li>Funciona sin internet</li>
  <li>Guarda tu progreso</li>
</ul>
<p>Matrícula: <span class="precio">0</span> · Material: <span class="precio">12</span></p>`,
  css: `body { margin: 16px; font-size: 15px; }
p { margin: 0 0 10px; }
`,
  sol: `body { margin: 16px; font-size: 15px; }
p { margin: 0 0 10px; }

.entradilla::first-letter {
  font-size: 2em;
  font-weight: 700;
  color: #9a3412;
}

.ventajas {
  list-style: none;
  padding-left: 0;
}

.ventajas li::before {
  content: "✔";
  color: #16a34a;
  margin-right: 6px;
}

.precio::after { content: " €"; }`,
  checks: [
    { d: 'Primera letra grande, en negrita y en color', css: ['.entradilla', ['font-size', 'font-weight', 'color']], pseudo: '::first-letter' },
    { d: 'Lista sin viñetas ni sangría', css: ['.ventajas', ['list-style-type', 'padding-left']] },
    { d: 'Marca ✔ verde delante de cada ventaja', css: ['.ventajas li', ['content', 'color', 'margin-right']], pseudo: '::before' },
    { d: 'Símbolo del euro detrás de cada precio', css: ['.precio', ['content']], pseudo: '::after' },
    { d: 'Todo en su sitio', rect: '.ventajas li, .precio' }
  ]
},
{
  id: 'tabla-css', block: 'pos', title: 'Tabla de notas con estilo', edit: 'css', w: 480, h: 280,
  tags: ['border-collapse', 'nth-child(even)', 'caption-side', 'tr:hover'],
  brief: `<ul><li>La tabla ocupa todo el ancho y sus bordes no salen dobles.</li><li>Celdas con borde de <code>1px</code> sólido <code>#cbd5e1</code>, relleno <code>6px 10px</code> y texto a la izquierda.</li><li>Cabecera con fondo <code>#1e3a8a</code> y texto blanco.</li><li>Filas <strong>pares</strong> del cuerpo con fondo <code>#f1f5f9</code>, y la fila que tiene el ratón encima, <code>#fef3c7</code>.</li><li>El título de la tabla, <strong>debajo</strong>, en <code>13px</code> y <code>#64748b</code>.</li></ul>`,
  hint: `<code>border-collapse: collapse</code>, <code>tbody tr:nth-child(even)</code>, <code>tbody tr:hover</code> (ponlo después del <code>nth-child</code>, que pesa lo mismo) y <code>caption-side: bottom</code>.`,
  html: `<table>
  <caption>Notas de la 1ª evaluación</caption>
  <thead>
    <tr><th>Alumno</th><th>UP01</th><th>UP02</th><th>UP03</th></tr>
  </thead>
  <tbody>
    <tr><td>Ana</td><td>8</td><td>7</td><td>9</td></tr>
    <tr><td>Luis</td><td>6</td><td>5</td><td>7</td></tr>
    <tr><td>Marta</td><td>9</td><td>9</td><td>8</td></tr>
    <tr><td>Pablo</td><td>5</td><td>6</td><td>6</td></tr>
  </tbody>
</table>`,
  css: `body { margin: 16px; font-size: 14px; }
`,
  sol: `body { margin: 16px; font-size: 14px; }

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #cbd5e1;
  padding: 6px 10px;
  text-align: left;
}

thead th {
  background: #1e3a8a;
  color: #fff;
}

tbody tr:nth-child(even) { background: #f1f5f9; }
tbody tr:hover { background: #fef3c7; }

caption {
  caption-side: bottom;
  font-size: 13px;
  color: #64748b;
}`,
  checks: [
    { d: 'Bordes sencillos y todo el ancho', css: ['table', ['border-collapse']] },
    { d: 'Celdas: borde, relleno y alineación', css: ['th, td', ['border', 'padding', 'text-align']] },
    { d: 'Cabecera oscura con texto blanco', css: ['thead th', ['background-color', 'color']] },
    { d: 'Filas pares con fondo', css: ['tbody tr', ['background-color']] },
    { d: 'Fila resaltada al pasar el ratón', css: ['tbody tr', ['background-color']], state: ':hover' },
    { d: 'Título debajo, pequeño y gris', css: ['caption', ['caption-side', 'font-size', 'color']] },
    { d: 'Tabla en su sitio', rect: 'table, caption' }
  ]
},
{
  id: 'botones-estados', block: 'pos', title: 'Botón con hover, foco y transición', edit: 'css', w: 480, h: 130,
  tags: [':hover', ':focus', 'cursor', 'transition', 'outline'],
  brief: `<p>El botón de reservar necesita reaccionar:</p>
<ul><li>Siempre: cursor de mano y una transición de <code>0.3s</code> en el color de fondo.</li><li><strong>Al pasar el ratón</strong>: fondo <code>#9e4e20</code>.</li><li><strong>Con el foco</strong> (al llegar con el tabulador): un contorno de <code>3px</code> sólido <code>#f59e0b</code> separado <code>2px</code> del botón.</li></ul>`,
  hint: `<code>cursor: pointer</code>, <code>transition: background-color 0.3s</code>, <code>.boton:hover</code> y <code>.boton:focus</code> con <code>outline</code> y <code>outline-offset</code>. El <code>outline</code> no ocupa espacio: el botón no se mueve.`,
  html: `<a class="boton" href="#">Reservar plaza</a>`,
  css: `body { margin: 32px; }

.boton {
  display: inline-block;
  padding: 10px 24px;
  background: #c0622b;
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  border-radius: 4px;
}
`,
  sol: `body { margin: 32px; }

.boton {
  display: inline-block;
  padding: 10px 24px;
  background: #c0622b;
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.boton:hover { background: #9e4e20; }

.boton:focus {
  outline: 3px solid #f59e0b;
  outline-offset: 2px;
}`,
  checks: [
    { d: 'Cursor de mano', css: ['.boton', ['cursor']] },
    { d: 'Transición de 0.3 s en el fondo', css: ['.boton', ['transition-property', 'transition-duration']] },
    { d: 'Al pasar el ratón, fondo más oscuro', css: ['.boton', ['background-color']], state: ':hover' },
    { d: 'Con el foco, contorno separado del botón', css: ['.boton', ['outline-style', 'outline-width', 'outline-color', 'outline-offset']], state: ':focus' },
    { d: 'Sin foco ni ratón, el botón no cambia', css: ['.boton', ['background-color', 'outline-style']] }
  ]
},
{
  id: 'formulario-css', block: 'pos', title: 'Formulario con estilo', edit: 'css', w: 480, h: 380,
  tags: ['font: inherit', 'width: 100%', 'resize', ':focus'],
  brief: `<ul><li>Cada <code>label</code> encima de su campo (<code>block</code>), en negrita (<code>600</code>) y con <code>12px</code> de margen arriba.</li><li>Los campos (<code>input</code> y <code>textarea</code>): todo el ancho <strong>sin salirse</strong>, relleno de <code>8px</code>, la misma fuente que la página, borde de <code>1px</code> sólido <code>#94a3b8</code> y esquinas de <code>6px</code>.</li><li>El <code>textarea</code> solo se puede agrandar en vertical.</li><li>El campo con el foco: borde <code>#1d4ed8</code> y sombra <code>0 0 0 3px #bfdbfe</code> en lugar del contorno del navegador.</li></ul>`,
  hint: `Los campos no heredan la fuente: <code>font: inherit</code>. Para que <code>width: 100%</code> con relleno no se salga: <code>box-sizing: border-box</code>. Si quitas el <code>outline</code>, pon otro indicador de foco.`,
  html: `<form>
  <label for="nombre">Nombre</label>
  <input type="text" id="nombre" name="nombre">
  <label for="correo">Correo</label>
  <input type="email" id="correo" name="correo">
  <label for="mensaje">Mensaje</label>
  <textarea id="mensaje" name="mensaje" rows="3"></textarea>
</form>`,
  css: `body { margin: 16px; font-family: Georgia, serif; font-size: 15px; }
form { max-width: 320px; }
`,
  sol: `body { margin: 16px; font-family: Georgia, serif; font-size: 15px; }
form { max-width: 320px; }

label {
  display: block;
  margin-top: 12px;
  font-weight: 600;
}

input, textarea {
  box-sizing: border-box;
  width: 100%;
  padding: 8px;
  font: inherit;
  border: 1px solid #94a3b8;
  border-radius: 6px;
}

textarea { resize: vertical; }

input:focus, textarea:focus {
  outline: none;
  border-color: #1d4ed8;
  box-shadow: 0 0 0 3px #bfdbfe;
}`,
  checks: [
    { d: 'Etiquetas encima, en negrita y separadas', css: ['label', ['display', 'margin-top', 'font-weight']] },
    { d: 'Campos con la fuente de la página', css: ['input, textarea', ['font-family', 'font-size']] },
    { d: 'Campos: relleno, borde y esquinas', css: ['input, textarea', ['padding', 'border', 'border-radius']] },
    { d: 'Los campos ocupan todo el ancho sin salirse', rect: 'input, textarea' },
    { d: 'El área de texto solo crece en vertical', css: ['textarea', ['resize']] },
    { d: 'Con el foco: borde azul y sombra', css: ['input, textarea', ['border-top-color', 'box-shadow']], state: ':focus' }
  ]
},
{
  id: 'overflow-caja', block: 'pos', title: 'Contenido que no cabe', edit: 'css', w: 480, h: 280,
  tags: ['overflow', 'white-space: nowrap', 'text-overflow: ellipsis'],
  brief: `<ul><li>Las condiciones (<code>.condiciones</code>) se salen de su caja de <code>110px</code>. Haz que aparezca una barra de desplazamiento vertical <strong>solo si hace falta</strong>.</li><li>Los titulares de <code>.noticias</code> deben ocupar <strong>una sola línea</strong>: lo que no quepa se corta con «…».</li></ul>`,
  hint: `<code>overflow-y: auto</code> solo funciona si la caja tiene la altura limitada. Para una línea con puntos suspensivos hacen falta tres: <code>white-space: nowrap; overflow: hidden; text-overflow: ellipsis;</code>.`,
  html: `<div class="condiciones">
  <p>1. La inscripción se hace a través de la secretaría virtual.</p>
  <p>2. El material del curso se entrega el primer día.</p>
  <p>3. Las faltas se justifican en un plazo de tres días.</p>
  <p>4. La evaluación es continua y hay una prueba objetiva por trimestre.</p>
</div>
<ul class="noticias">
  <li>Abierto el plazo de preinscripción para los ciclos de grado superior en modalidad semipresencial</li>
  <li>Nuevo horario de tutorías colectivas</li>
</ul>`,
  css: `body { margin: 16px; font-size: 14px; }
.condiciones { height: 110px; padding: 0 8px; border: 1px solid #cbd5e1; border-radius: 6px; }
.condiciones p { margin: 6px 0; }
.noticias { width: 300px; padding-left: 20px; }
`,
  sol: `body { margin: 16px; font-size: 14px; }
.condiciones { height: 110px; padding: 0 8px; border: 1px solid #cbd5e1; border-radius: 6px; }
.condiciones p { margin: 6px 0; }
.noticias { width: 300px; padding-left: 20px; }

.condiciones { overflow-y: auto; }

.noticias li {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}`,
  checks: [
    { d: 'Barra de desplazamiento vertical cuando hace falta', css: ['.condiciones', ['overflow-y']] },
    { d: 'La caja sigue midiendo lo mismo', rect: '.condiciones' },
    { d: 'Titulares en una sola línea', css: ['.noticias li', ['white-space']] },
    { d: 'Lo que no cabe se corta con «…»', css: ['.noticias li', ['overflow-x', 'text-overflow']] },
    { d: 'Cada titular mide una línea', rect: '.noticias li' }
  ]
},
{
  id: 'float-imagen', block: 'pos', title: 'Imagen flotante y padre que no crece', edit: 'css', w: 480, h: 330,
  tags: ['float', 'clearfix', 'overflow: hidden', 'clear'],
  brief: `<ul><li>La miniatura de cada noticia <strong>flota a la izquierda</strong>, con <code>110px</code> de ancho y un margen de <code>0 12px 8px 0</code>, para que el texto la rodee.</li><li>Al flotar, la imagen sale del flujo y la tarjeta ya no la contiene: se mete en la noticia siguiente. Haz que cada <code>.noticia</code> crezca para envolver su imagen.</li></ul>`,
  hint: `El padre de un flotante no crece por él. Soluciones: <code>overflow: hidden</code> en el padre, el <em>clearfix</em> (<code>.noticia::after { content: ""; display: block; clear: both; }</code>) o <code>display: flow-root</code>.`,
  html: `<article class="noticia">
  <img src="${IMG}" alt="Montañas">
  <h2>Salida a la Serra Gelada</h2>
  <p>Ruta costera.</p>
</article>
<article class="noticia">
  <img src="${IMG}" alt="Montañas">
  <h2>Curso de nudos</h2>
  <p>Sábado por la mañana.</p>
</article>`,
  css: `body { margin: 16px; font-size: 14px; }
.noticia { background: #f1f5f9; border-radius: 8px; padding: 10px; margin-bottom: 10px; }
.noticia h2 { margin: 0 0 4px; font-size: 16px; }
.noticia p { margin: 0; }
.noticia img { display: block; height: 70px; border-radius: 6px; }
`,
  sol: `body { margin: 16px; font-size: 14px; }
.noticia { background: #f1f5f9; border-radius: 8px; padding: 10px; margin-bottom: 10px; }
.noticia h2 { margin: 0 0 4px; font-size: 16px; }
.noticia p { margin: 0; }
.noticia img { display: block; height: 70px; border-radius: 6px; }

.noticia img {
  float: left;
  width: 110px;
  margin: 0 12px 8px 0;
}

.noticia { overflow: hidden; }`,
  checks: [
    { d: 'La imagen flota a la izquierda', css: ['.noticia img', ['float']] },
    { d: 'Ancho y margen de la imagen', css: ['.noticia img', ['width', 'margin']] },
    { d: 'Cada noticia envuelve su imagen', rect: '.noticia' },
    { d: 'Los textos rodean la imagen', rect: '.noticia h2, .noticia p' }
  ]
},
{id: 'contador-posicion', block: 'pos', title: 'Contador de notificaciones', edit: 'css', w: 480, h: 140,
  tags: ['position: relative', 'position: absolute', 'top/right'],
  brief: `<p>Coloca el contador rojo sobre la esquina superior derecha del botón, desplazado <code>8px</code> hacia fuera en ambos ejes. Es un círculo de <code>22px</code> con el número centrado.</p>`,
  hint: `El botón es la referencia: <code>position: relative</code>. El contador: <code>position: absolute; top: -8px; right: -8px</code>.`,
  html: `<button class="campana">Avisos<span class="contador">3</span></button>`,
  css: `body { margin: 32px; }

.campana {
  padding: 10px 16px;
  font: inherit;
  border: 0;
  border-radius: 8px;
  background: #e2e8f0;
}

.contador {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #e11d48;
  color: #fff;
  font-size: 12px;
}
`,
  sol: `body { margin: 32px; }

.campana {
  position: relative;
  padding: 10px 16px;
  font: inherit;
  border: 0;
  border-radius: 8px;
  background: #e2e8f0;
}

.contador {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #e11d48;
  color: #fff;
  font-size: 12px;
  display: grid;
  place-items: center;
}`,
  checks: [
    { d: 'El botón es la referencia de posición', css: ['.campana', ['position']] },
    { d: 'El contador está posicionado de forma absoluta', css: ['.contador', ['position']] },
    { d: 'El botón no cambia de tamaño', rect: '.campana' },
    { d: 'Contador en la esquina, 22 × 22', rect: '.contador' }
  ]
},
{
  id: 'capas-z-index', block: 'pos', title: 'Capas: relative, absolute y z-index', edit: 'css', w: 480, h: 230,
  tags: ['position: relative', 'z-index', 'top / left'],
  brief: `<p>Tres cartas apiladas. Sin cambiar el orden del HTML:</p>
<ul><li>La carta <code>.destacada</code> debe quedar <strong>encima</strong> de las otras dos.</li><li>La carta <code>.torcida</code> se desplaza <code>10px</code> hacia abajo y <code>10px</code> hacia la derecha <strong>respecto a su sitio</strong>, sin mover nada más.</li></ul>`,
  hint: `<code>z-index</code> solo funciona en elementos posicionados (las cartas ya lo están). El número mayor queda delante. Para mover algo respecto a su sitio sin que los demás se enteren: <code>position: relative</code> con <code>top</code> y <code>left</code>.`,
  html: `<div class="mesa">
  <div class="carta destacada">A</div>
  <div class="carta">B</div>
  <div class="carta">C</div>
</div>
<p class="torcida">Carta suelta</p>`,
  css: `body { margin: 16px; }
.mesa { position: relative; height: 120px; }
.carta {
  position: absolute;
  top: 0;
  width: 80px;
  height: 110px;
  border: 2px solid #1e293b;
  border-radius: 8px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 700;
}
.carta:nth-child(1) { left: 60px; background: #fde68a; }
.carta:nth-child(2) { left: 0; }
.carta:nth-child(3) { left: 120px; }
.torcida { display: inline-block; margin: 16px 0 0; padding: 6px 10px; background: #e0e7ff; }
`,
  sol: `body { margin: 16px; }
.mesa { position: relative; height: 120px; }
.carta {
  position: absolute;
  top: 0;
  width: 80px;
  height: 110px;
  border: 2px solid #1e293b;
  border-radius: 8px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 700;
}
.carta:nth-child(1) { left: 60px; background: #fde68a; }
.carta:nth-child(2) { left: 0; }
.carta:nth-child(3) { left: 120px; }
.torcida { display: inline-block; margin: 16px 0 0; padding: 6px 10px; background: #e0e7ff; }

.destacada { z-index: 1; }

.torcida {
  position: relative;
  top: 10px;
  left: 10px;
}`,
  checks: [
    { d: 'La carta destacada queda encima de las otras', js: (U) => { const d = U.q('.destacada'); if (!d) return 'No encuentro .destacada'; const r = d.getBoundingClientRect(); const pts = [[r.left + 6, r.top + r.height / 2], [r.right - 6, r.top + r.height / 2]]; return pts.every(([x, y]) => d.contains(U.doc.elementFromPoint(x, y))) || 'Alguna carta tapa a la destacada'; } },
    { d: 'Las cartas no se mueven', rect: '.carta' },
    { d: 'La carta suelta se desplaza 10 px abajo y a la derecha', rect: '.torcida' },
    { d: 'La carta suelta se mueve con <code>position: relative</code>', css: ['.torcida', ['position']] }
  ]
},
{
  id: 'cabecera-sticky', block: 'pos', title: 'Cabecera pegajosa y botón fijo', edit: 'css', w: 480, h: 260,
  tags: ['position: sticky', 'position: fixed', 'z-index'],
  brief: `<p>Haz scroll en la vista previa:</p>
<ul><li>La cabecera se queda <strong>pegada arriba</strong> al bajar, por encima del contenido.</li><li>El botón «Subir» está <strong>siempre</strong> en la esquina inferior derecha de la ventana, a <code>16px</code> de cada borde.</li></ul>`,
  hint: `<code>position: sticky; top: 0;</code> (sin el <code>top</code> no se pega) y <code>z-index</code> para que el texto pase por debajo. El botón: <code>position: fixed; right: 16px; bottom: 16px;</code>.`,
  html: `<header class="cabecera">Apuntes de CSS · UP05</header>
<main>
  <p>El valor por defecto de position es static: los elementos siguen el flujo normal.</p>
  <p>Con relative el elemento se desplaza respecto a su posición normal, pero su hueco se conserva.</p>
  <p>Con absolute sale del flujo y se coloca respecto al ancestro posicionado más cercano.</p>
  <p>Con fixed se coloca respecto a la ventana y no se mueve al hacer scroll.</p>
  <p>Con sticky se comporta como relative hasta que llega al umbral; entonces se queda pegado.</p>
  <p>z-index decide qué elemento queda delante, pero solo en elementos posicionados.</p>
  <p>Un elemento absolute dentro de un padre static se coloca respecto a la página.</p>
  <p>Las propiedades top, right, bottom y left no hacen nada en un elemento static.</p>
  <p>float saca el elemento del flujo y el texto lo rodea.</p>
</main>
<a class="subir" href="#">Subir</a>`,
  css: `body { margin: 0; font-size: 14px; }
.cabecera { padding: 12px 16px; background: #0f172a; color: #fff; font-weight: 700; }
main { padding: 0 16px; }
main p { margin: 0; padding: 12px 0; border-bottom: 1px solid #e2e8f0; position: relative; }
.subir { padding: 8px 12px; background: #f97316; color: #fff; border-radius: 999px; text-decoration: none; }
`,
  sol: `body { margin: 0; font-size: 14px; }
.cabecera { padding: 12px 16px; background: #0f172a; color: #fff; font-weight: 700; }
main { padding: 0 16px; }
main p { margin: 0; padding: 12px 0; border-bottom: 1px solid #e2e8f0; position: relative; }
.subir { padding: 8px 12px; background: #f97316; color: #fff; border-radius: 999px; text-decoration: none; }

.cabecera {
  position: sticky;
  top: 0;
  z-index: 10;
}

.subir {
  position: fixed;
  right: 16px;
  bottom: 16px;
}`,
  checks: [
    { d: 'Cabecera <code>sticky</code> pegada arriba', css: ['.cabecera', ['position', 'top']] },
    { d: 'Al bajar, la cabecera sigue arriba', js: rectAfterScroll('.cabecera', 150) },
    { d: 'La cabecera queda por encima del texto', js: (U) => { const se = U.doc.scrollingElement; se.scrollTop = 150; const h = U.q('.cabecera'); const r = h.getBoundingClientRect(); const top = U.doc.elementFromPoint(r.left + 40, r.top + r.height / 2); se.scrollTop = 0; return (top && h.contains(top)) || 'Al bajar, el texto tapa la cabecera'; } },
    { d: 'Botón fijo en la esquina inferior derecha', rect: '.subir' },
    { d: 'Al bajar, el botón no se mueve', js: rectAfterScroll('.subir', 150) }
  ]
}
);
