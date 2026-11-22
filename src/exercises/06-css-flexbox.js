/* ===================== BLOQUE · UP06 · FLEXBOX Y MEDIA QUERIES ===================== */
window.EXERCISES.push(
{
  id: 'navbar-flex', block: 'lay', title: 'Barra de navegación con flexbox', edit: 'css', w: 560, h: 130,
  tags: ['display:flex', 'justify-content', 'align-items', 'gap'],
  brief: `<p>Logo a la izquierda, menú a la derecha, todo centrado en vertical. Los enlaces del menú en fila, separados <code>20px</code>, sin viñetas ni márgenes de lista.</p>`,
  hint: `Dos contenedores flex: <code>.nav</code> (reparte logo y menú con <code>space-between</code>) y <code>.menu</code> (pone los <code>li</code> en fila con <code>gap</code>).`,
  html: `<header class="nav">
  <a class="logo" href="#">LMSGI</a>
  <ul class="menu">
    <li><a href="#">Apuntes</a></li>
    <li><a href="#">Prácticas</a></li>
    <li><a href="#">Contacto</a></li>
  </ul>
</header>`,
  css: `body { margin: 0; }

.nav {
  padding: 12px 20px;
  background: #0f172a;
}

.logo { color: #fff; font-weight: 800; text-decoration: none; font-size: 20px; }
.menu a { color: #cbd5e1; text-decoration: none; }
`,
  sol: `body { margin: 0; }

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: #0f172a;
}

.logo { color: #fff; font-weight: 800; text-decoration: none; font-size: 20px; }

.menu {
  display: flex;
  gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu a { color: #cbd5e1; text-decoration: none; }`,
  checks: [
    { d: '<code>.nav</code> es flex con reparto y centrado vertical', css: ['.nav', ['display', 'justify-content', 'align-items']] },
    { d: '<code>.menu</code> en fila con separación de 20px', css: ['.menu', ['display', 'column-gap']] },
    { d: 'Lista sin viñetas ni márgenes', css: ['.menu', ['list-style-type', 'margin', 'padding']] },
    { d: 'Altura de la barra correcta', rect: '.nav' },
    { d: 'Logo y enlaces en su sitio', rect: '.logo, .menu li' }
  ]},
{
  id: 'flex-justify', block: 'lay', title: 'Tres filas, tres repartos', edit: 'css', w: 480, h: 250,
  tags: ['justify-content', 'align-items', 'eje principal'],
  brief: `<p>Las tres filas ya son contenedores flex. Reparte sus hijos en el eje principal:</p>
<ul><li><code>.fila-1</code>: todo pegado a la <strong>derecha</strong>.</li><li><code>.fila-2</code>: el primero al principio, el último al final y el sobrante repartido <strong>entre</strong> ellos.</li><li><code>.fila-3</code>: el mismo espacio alrededor de cada uno, también en los extremos (<code>space-evenly</code>), y centrados en vertical en su fila de <code>70px</code>.</li></ul>`,
  hint: `<code>justify-content</code>: <code>flex-end</code>, <code>space-between</code>, <code>space-evenly</code>. El centrado vertical en una fila es el eje secundario: <code>align-items: center</code>.`,
  html: `<div class="fila fila-1"><span>Guardar</span><span>Enviar</span></div>
<div class="fila fila-2"><span>« Anterior</span><span>1 / 6</span><span>Siguiente »</span></div>
<div class="fila fila-3"><span>HTML</span><span>CSS</span><span>XML</span><span>JS</span></div>`,
  css: `body { margin: 16px; font-size: 14px; }
.fila { display: flex; gap: 8px; padding: 8px; margin-bottom: 10px; background: #f1f5f9; border-radius: 8px; }
.fila span { padding: 6px 10px; background: #1e3a8a; color: #fff; border-radius: 6px; }
.fila-3 { height: 70px; box-sizing: border-box; gap: 0; }
`,
  sol: `body { margin: 16px; font-size: 14px; }
.fila { display: flex; gap: 8px; padding: 8px; margin-bottom: 10px; background: #f1f5f9; border-radius: 8px; }
.fila span { padding: 6px 10px; background: #1e3a8a; color: #fff; border-radius: 6px; }
.fila-3 { height: 70px; box-sizing: border-box; gap: 0; }

.fila-1 { justify-content: flex-end; }
.fila-2 { justify-content: space-between; }
.fila-3 {
  justify-content: space-evenly;
  align-items: center;
}`,
  checks: [
    { d: 'Fila 1 pegada a la derecha', rect: '.fila-1 span' },
    { d: 'Fila 2 con el sobrante entre los elementos', rect: '.fila-2 span' },
    { d: 'Fila 3 repartida y centrada en vertical', rect: '.fila-3 span' },
    { d: 'Usas <code>justify-content</code>', css: ['.fila', ['justify-content']] }
  ]
},
{id: 'centrado-total', block: 'lay', title: 'Centrado perfecto', edit: 'css', w: 480, h: 240,
  tags: ['flex', 'grid', 'place-items', '100vh'],
  brief: `<p>El mensaje debe quedar justo en el centro de la pantalla, en horizontal y en vertical. La sección ocupa toda la altura de la ventana.</p>`,
  hint: `Dos opciones: <code>display: flex; justify-content: center; align-items: center</code> o <code>display: grid; place-items: center</code>. Y <code>height: 100vh</code> en la sección.`,
  html: `<section class="hero">
  <div class="msg">Centrado perfecto</div>
</section>`,
  css: `body { margin: 0; }

.hero {
  background: #e0e7ff;
}

.msg {
  padding: 16px 24px;
  background: #fff;
  border-radius: 10px;
  font-weight: 700;
}
`,
  sol: `body { margin: 0; }

.hero {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e0e7ff;
}

.msg {
  padding: 16px 24px;
  background: #fff;
  border-radius: 10px;
  font-weight: 700;
}`,
  checks: [
    { d: 'La sección ocupa toda la ventana', rect: '.hero' },
    { d: 'El mensaje está centrado', rect: '.msg' }
  ]},
{
  id: 'flex-columna', block: 'lay', title: 'En columna, los ejes se cambian', edit: 'css', w: 480, h: 290,
  tags: ['flex-direction: column', 'align-items', 'gap'],
  brief: `<ul><li><code>.perfil</code>: sus hijos uno debajo de otro, <strong>centrados en horizontal</strong> y separados <code>8px</code>.</li><li><code>.acciones</code>: los dos botones en fila, separados <code>12px</code>.</li></ul>
<p>Pista visual: con <code>flex-direction: column</code>, ¿qué propiedad centra ahora en horizontal?</p>`,
  hint: `Con <code>column</code> el eje principal es el vertical: <code>justify-content</code> reparte de arriba abajo y <code>align-items</code> alinea de izquierda a derecha.`,
  html: `<div class="perfil">
  <img src="${AVATAR}" alt="Foto de perfil">
  <h2>Laura Ferrer</h2>
  <p>Tutora de 1º de DAM</p>
  <div class="acciones">
    <a href="#">Escribir</a>
    <a href="#">Ver horario</a>
  </div>
</div>`,
  css: `body { margin: 16px; font-size: 14px; }
.perfil { padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; }
.perfil img { width: 72px; height: 72px; border-radius: 50%; }
.perfil h2, .perfil p { margin: 0; }
.acciones a { padding: 6px 12px; background: #4338ca; color: #fff; border-radius: 6px; text-decoration: none; }
`,
  sol: `body { margin: 16px; font-size: 14px; }
.perfil { padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; }
.perfil img { width: 72px; height: 72px; border-radius: 50%; }
.perfil h2, .perfil p { margin: 0; }
.acciones a { padding: 6px 12px; background: #4338ca; color: #fff; border-radius: 6px; text-decoration: none; }

.perfil {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.acciones {
  display: flex;
  gap: 12px;
}`,
  checks: [
    { d: '<code>.perfil</code> en columna', css: ['.perfil', ['display', 'flex-direction']] },
    { d: 'Hijos del perfil centrados y separados', rect: '.perfil > *' },
    { d: '<code>.acciones</code> en fila con su hueco', css: ['.acciones', ['display', 'column-gap']] },
    { d: 'Botones en su sitio', rect: '.acciones a' }
  ]
},
{id: 'tarjetas-flex-wrap', block: 'lay', title: 'Tarjetas que se reparten', edit: 'css', w: 480, h: 260,
  tags: ['flex-wrap', 'flex: 1 1 140px', 'gap'],
  brief: `<p>Las tarjetas se colocan en fila y saltan de línea cuando no caben. Cada una mide como mínimo <code>140px</code> y crece para rellenar el hueco. Separación de <code>12px</code> en ambas direcciones.</p>`,
  hint: `<code>.cards { display: flex; flex-wrap: wrap; gap: 12px }</code> y <code>.card { flex: 1 1 140px }</code>. Fíjate en que la última fila se estira: eso con grid no sale igual.`,
  html: `<div class="cards">
  <article class="card"><h3>UP01</h3><p>Lenguajes de marcas</p></article>
  <article class="card"><h3>UP02</h3><p>HTML</p></article>
  <article class="card"><h3>UP03</h3><p>CSS</p></article>
  <article class="card"><h3>UP04</h3><p>XML</p></article>
  <article class="card"><h3>UP05</h3><p>Sindicación</p></article>
</div>`,
  css: `body { margin: 16px; }

.card {
  padding: 12px;
  background: #f1f5f9;
  border-radius: 8px;
}
.card h3 { margin: 0 0 4px; font-size: 16px; }
.card p { margin: 0; font-size: 13px; color: #475569; }
`,
  sol: `body { margin: 16px; }

.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.card {
  flex: 1 1 140px;
  padding: 12px;
  background: #f1f5f9;
  border-radius: 8px;
}
.card h3 { margin: 0 0 4px; font-size: 16px; }
.card p { margin: 0; font-size: 13px; color: #475569; }`,
  checks: [
    { d: '<code>.cards</code> flex con salto de línea y gap', css: ['.cards', ['display', 'flex-wrap', 'gap']] },
    { d: 'Las tarjetas crecen desde 140px', css: ['.card', ['flex-grow', 'flex-shrink', 'flex-basis']] },
    { d: 'Cada tarjeta en su sitio', rect: '.card' }
  ]},
{
  id: 'flex-crecer', block: 'lay', title: 'Lateral fijo y contenido elástico', edit: 'css', w: 560, h: 230,
  tags: ['flex: 1', 'flex: 0 0 160px', 'flex-basis'],
  brief: `<ul><li><code>.pagina</code>: lateral y contenido en fila, separados <code>16px</code>.</li><li><code>.lateral</code>: siempre <code>160px</code>, ni crece ni encoge.</li><li><code>.contenido</code>: ocupa todo el espacio que sobre.</li><li>En el <code>.buscador</code>, el campo se estira y el botón mide lo que su texto.</li></ul>`,
  hint: `<code>flex: 0 0 160px</code> (no crece, no encoge, parte de 160px) y <code>flex: 1</code> (crece para repartirse lo que sobra). El buscador es otro contenedor flex.`,
  html: `<div class="pagina">
  <aside class="lateral">
    <p>UP01 · UP02 · UP03 · UP04 · UP05 · UP06</p>
  </aside>
  <main class="contenido">
    <form class="buscador">
      <input type="search" aria-label="Buscar" placeholder="Buscar en los apuntes">
      <button>Buscar</button>
    </form>
    <p>Flexbox reparte el espacio sobrante entre los hijos según su flex-grow.</p>
  </main>
</div>`,
  css: `body { margin: 16px; font-size: 14px; }
.lateral { padding: 12px; background: #1e293b; color: #e2e8f0; border-radius: 8px; }
.lateral p { margin: 0; }
.contenido { padding: 12px; background: #f1f5f9; border-radius: 8px; }
.contenido p { margin: 12px 0 0; }
.buscador { gap: 8px; }
.buscador input, .buscador button { font: inherit; padding: 6px 10px; border-radius: 6px; border: 1px solid #94a3b8; }
.buscador button { background: #1d4ed8; color: #fff; border-color: #1d4ed8; }
`,
  sol: `body { margin: 16px; font-size: 14px; }
.lateral { padding: 12px; background: #1e293b; color: #e2e8f0; border-radius: 8px; }
.lateral p { margin: 0; }
.contenido { padding: 12px; background: #f1f5f9; border-radius: 8px; }
.contenido p { margin: 12px 0 0; }
.buscador { gap: 8px; }
.buscador input, .buscador button { font: inherit; padding: 6px 10px; border-radius: 6px; border: 1px solid #94a3b8; }
.buscador button { background: #1d4ed8; color: #fff; border-color: #1d4ed8; }

.pagina {
  display: flex;
  gap: 16px;
}

.lateral { flex: 0 0 160px; }
.contenido { flex: 1; }

.buscador { display: flex; }
.buscador input { flex: 1; }`,
  checks: [
    { d: 'Lateral de 160 px que ni crece ni encoge', css: ['.lateral', ['flex-grow', 'flex-shrink', 'flex-basis']] },
    { d: 'Lateral y contenido en su sitio', rect: '.lateral, .contenido' },
    { d: 'El campo de búsqueda se estira', rect: '.buscador input, .buscador button' }
  ]
},
{
  id: 'flex-order-align', block: 'lay', title: 'order y align-self', edit: 'css', w: 480, h: 200,
  tags: ['order', 'align-self', 'align-items'],
  brief: `<p>Tarjeta de oferta. Sin tocar el HTML:</p>
<ul><li>Los hijos de <code>.oferta</code> van en fila, centrados en vertical y separados <code>12px</code>.</li><li>El precio se muestra <strong>el primero</strong>, aunque en el HTML vaya el último.</li><li>La insignia «Nuevo» se alinea <strong>arriba</strong>, ella sola.</li></ul>`,
  hint: `<code>order: -1</code> adelanta un elemento (todos tienen <code>0</code> por defecto). <code>align-self: flex-start</code> cambia la alineación de un hijo concreto.`,
  html: `<article class="oferta">
  <span class="insignia">Nuevo</span>
  <div class="texto">
    <h2>Curso de Flexbox</h2>
    <p>Seis sesiones prácticas con ejercicios de examen.</p>
  </div>
  <p class="precio">25 €</p>
</article>`,
  css: `body { margin: 16px; font-size: 14px; }
.oferta { height: 130px; box-sizing: border-box; padding: 12px; background: #fff7ed; border: 1px solid #fdba74; border-radius: 10px; }
.insignia { padding: 2px 8px; background: #ea580c; color: #fff; border-radius: 999px; font-size: 12px; font-weight: 700; }
.texto h2 { margin: 0 0 4px; font-size: 17px; }
.texto p { margin: 0; }
.precio { margin: 0; font-size: 26px; font-weight: 800; color: #9a3412; }
`,
  sol: `body { margin: 16px; font-size: 14px; }
.oferta { height: 130px; box-sizing: border-box; padding: 12px; background: #fff7ed; border: 1px solid #fdba74; border-radius: 10px; }
.insignia { padding: 2px 8px; background: #ea580c; color: #fff; border-radius: 999px; font-size: 12px; font-weight: 700; }
.texto h2 { margin: 0 0 4px; font-size: 17px; }
.texto p { margin: 0; }
.precio { margin: 0; font-size: 26px; font-weight: 800; color: #9a3412; }

.oferta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.precio { order: -1; }
.insignia { align-self: flex-start; }`,
  checks: [
    { d: 'Fila centrada en vertical con hueco', css: ['.oferta', ['display', 'align-items', 'column-gap']] },
    { d: 'El precio va el primero', rect: '.precio' },
    { d: 'La insignia, arriba', rect: '.insignia' },
    { d: 'El texto en su sitio', rect: '.texto' },
    { d: 'Sin tocar el orden del HTML: con <code>order</code>', css: ['.precio', ['order']] }
  ]
},
{id: 'pie-pegado', block: 'lay', title: 'Pie pegado abajo', edit: 'css', w: 480, h: 300,
  tags: ['flex-direction: column', 'flex: 1', 'height: 100%'],
  brief: `<p>Hay poco contenido y el pie se queda a media pantalla. Haz que el pie quede siempre abajo del todo, estirando el <code>main</code>.</p>`,
  hint: `<code>body</code> como columna flex de al menos toda la altura (<code>min-height: 100vh</code>) y <code>main { flex: 1 }</code>.`,
  html: `<header>LMSGI</header>
<main><p>Poco contenido por aquí.</p></main>
<footer>© 2026 IES Severo Ochoa</footer>`,
  css: `body {
  margin: 0;
}

header { padding: 12px; background: #0f172a; color: #fff; }
main { padding: 12px; }
main p { margin: 0; }
footer { padding: 12px; background: #e2e8f0; }
`,
  sol: `body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header { padding: 12px; background: #0f172a; color: #fff; }
main { padding: 12px; flex: 1; }
main p { margin: 0; }
footer { padding: 12px; background: #e2e8f0; }`,
  checks: [
    { d: 'El <code>main</code> se estira', rect: 'main' },
    { d: 'El pie toca el borde inferior', rect: 'footer' }
  ]},
{id: 'variables-css', block: 'lay', title: 'Etiquetas con variables CSS', edit: 'css', w: 480, h: 110,
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
},
{
  id: 'botones-sombras', block: 'lay', title: 'Sombras, cursor y una transición', edit: 'css', w: 480, h: 220,
  tags: ['box-shadow', 'text-shadow', 'cursor', 'transform', 'transition'],
  brief: `<ul><li>El título lleva una sombra de texto <code>1px 1px 2px rgba(0, 0, 0, 0.3)</code>.</li><li><code>.cta</code>: sombra <code>0 4px 12px rgba(0, 0, 0, 0.2)</code>, cursor de mano y una transición de <code>0.2s</code> en <code>transform</code>.</li><li><strong>Al pasar el ratón</strong>: crece un 10 % (<code>scale(1.1)</code>).</li><li><code>.ayuda</code> muestra el cursor de ayuda (la flecha con interrogación).</li></ul>`,
  hint: `<code>text-shadow</code> y <code>box-shadow</code> se escriben igual: desplazamiento x, y, desenfoque y color. <code>cursor: pointer</code> y <code>cursor: help</code>. <code>transform: scale(1.1)</code> en el <code>:hover</code>.`,
  html: `<section class="portada">
  <h1>Semana de la programación</h1>
  <a class="cta" href="#">Apúntate</a>
  <p><abbr class="ayuda" title="Hackatón: maratón de programación por equipos">¿Qué es un hackatón?</abbr></p>
</section>`,
  css: `body { margin: 0; }
.portada { padding: 24px; text-align: center; background: #ecfeff; }
h1 { margin: 0 0 16px; font-size: 26px; color: #155e75; }
.cta { display: inline-block; padding: 10px 24px; background: #0891b2; color: #fff; font-weight: 700; border-radius: 999px; text-decoration: none; }
p { margin: 16px 0 0; font-size: 14px; }
`,
  sol: `body { margin: 0; }
.portada { padding: 24px; text-align: center; background: #ecfeff; }
h1 { margin: 0 0 16px; font-size: 26px; color: #155e75; }
.cta { display: inline-block; padding: 10px 24px; background: #0891b2; color: #fff; font-weight: 700; border-radius: 999px; text-decoration: none; }
p { margin: 16px 0 0; font-size: 14px; }

h1 { text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3); }

.cta {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.2s;
}

.cta:hover { transform: scale(1.1); }

.ayuda { cursor: help; }`,
  checks: [
    { d: 'Sombra de texto en el título', css: ['h1', ['text-shadow']] },
    { d: 'Sombra y cursor del botón', css: ['.cta', ['box-shadow', 'cursor']] },
    { d: 'Transición de 0.2 s en <code>transform</code>', css: ['.cta', ['transition-property', 'transition-duration']] },
    { d: 'Al pasar el ratón, crece un 10 %', css: ['.cta', ['transform']], state: ':hover' },
    { d: 'Cursor de ayuda', css: ['.ayuda', ['cursor']] }
  ]
},
{id: 'responsive-planes', block: 'lay', title: 'Mobile first: de 1 a 3 columnas', edit: 'css', w: 720, h: 300, views: [400, 720],
  tags: ['@media', 'min-width', 'mobile first', 'flex-direction'],
  brief: `<p>En móvil las tarjetas van una debajo de otra (ya funciona). A partir de <code>600px</code> de ancho deben ponerse en <strong>3 columnas iguales</strong>. Usa los botones de ancho para ver las dos versiones.</p>`,
  hint: `Mobile first: el CSS base es el del móvil y la media query añade lo de pantallas grandes: dentro de <code>@media (min-width: 600px) { … }</code>, <code>.planes</code> pasa a <code>flex-direction: row</code> y cada <code>.plan</code> lleva <code>flex: 1</code> para medir lo mismo.`,
  html: `<div class="planes">
  <article class="plan"><h3>Básico</h3><p>Apuntes y ejercicios</p></article>
  <article class="plan"><h3>Pro</h3><p>Más corrección guiada</p></article>
  <article class="plan"><h3>Centro</h3><p>Para todo el ciclo</p></article>
</div>`,
  css: `body { margin: 16px; }

.planes {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.plan { padding: 16px; border: 1px solid #cbd5e1; border-radius: 10px; }
.plan h3 { margin: 0 0 4px; }
.plan p { margin: 0; color: #475569; }
`,
  sol: `body { margin: 16px; }

.planes {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.plan { padding: 16px; border: 1px solid #cbd5e1; border-radius: 10px; }
.plan h3 { margin: 0 0 4px; }
.plan p { margin: 0; color: #475569; }

@media (min-width: 600px) {
  .planes { flex-direction: row; }
  .plan { flex: 1; }
}`,
  checks: [
    { d: 'Usas una media query <code>min-width</code>', src: ['css', /@media[^{]*min-width/], msg: 'No veo @media (min-width: …)' },
    { d: 'En móvil, una columna', rect: '.plan', w: 400 },
    { d: 'En escritorio, tres columnas', rect: '.plan', w: 720 }
  ]},
{
  id: 'cabecera-responsive', block: 'lay', title: 'Cabecera móvil y de escritorio', edit: 'css', w: 800, h: 230, views: [400, 800],
  tags: ['mobile first', '@media (min-width)', 'space-between'],
  brief: `<p>Como en la actividad de la UP06: en el móvil la cabecera ya está bien (todo centrado, en columna). A partir de <code>768px</code>:</p>
<ul><li>La cabecera es una <strong>fila</strong>: logo a la izquierda, botón a la derecha y el menú entre los dos, todo centrado en vertical.</li><li>El logo y el menú pierden su margen inferior, que en el móvil separaba las líneas y ahora descoloca la fila.</li></ul>
<p>El menú ya es flex en las dos versiones. Prueba los dos anchos.</p>`,
  hint: `Todo dentro de <code>@media (min-width: 768px) { … }</code>, al final de la hoja: <code>.cabecera { display: flex; justify-content: space-between; align-items: center; }</code> y <code>.logo, .menu { margin-bottom: 0; }</code>.`,
  html: `<header class="cabecera">
  <p class="logo">Club <span>Granito</span></p>
  <ul class="menu">
    <li><a href="#">Rutas</a></li>
    <li><a href="#">Cursos</a></li>
    <li><a href="#">Contacto</a></li>
  </ul>
  <a class="boton" href="#">Hazte socio</a>
</header>`,
  css: `body { margin: 0; font-family: system-ui, sans-serif; }

.cabecera {
  padding: 16px;
  text-align: center;
  background: #eee7df;
  border-bottom: 1px solid #d6cbc0;
}

.logo { margin: 0 0 12px; font-size: 1.5rem; font-weight: 700; }
.logo span { color: #c0622b; }

.menu {
  display: flex;
  justify-content: center;
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
}
.menu a { color: #2b2622; text-decoration: none; }

.boton { display: inline-block; padding: 8px 20px; background: #c0622b; color: #fff; border-radius: 4px; text-decoration: none; }

/* Escritorio */
`,
  sol: `body { margin: 0; font-family: system-ui, sans-serif; }

.cabecera {
  padding: 16px;
  text-align: center;
  background: #eee7df;
  border-bottom: 1px solid #d6cbc0;
}

.logo { margin: 0 0 12px; font-size: 1.5rem; font-weight: 700; }
.logo span { color: #c0622b; }

.menu {
  display: flex;
  justify-content: center;
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
}
.menu a { color: #2b2622; text-decoration: none; }

.boton { display: inline-block; padding: 8px 20px; background: #c0622b; color: #fff; border-radius: 4px; text-decoration: none; }

/* Escritorio */
@media (min-width: 768px) {
  .cabecera {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo,
  .menu { margin-bottom: 0; }
}`,
  checks: [
    { d: 'Usas <code>@media (min-width: 768px)</code>', src: ['css', /@media[^{]*min-width\s*:\s*768px/], msg: 'No veo @media (min-width: 768px)' },
    { d: 'En el móvil, todo sigue centrado en columna', rect: '.logo, .menu, .boton', w: 400 },
    { d: 'En escritorio, logo, menú y botón en fila', rect: '.logo, .menu, .boton', w: 800 },
    { d: 'Altura de la cabecera en escritorio', rect: '.cabecera', w: 800 }
  ]
},
{
  id: 'form-flex-campos', block: 'lay', title: 'Campos que comparten fila', edit: 'css', w: 720, h: 330, views: [400, 720],
  tags: ['flex: 1', 'gap', '@media', 'mobile first'],
  brief: `<p>Formulario de reserva de una salida:</p>
<ul><li>En el móvil, cada campo debajo del anterior, con <code>12px</code> entre ellos (dentro de cada <code>.fila</code> y entre filas).</li><li>A partir de <code>600px</code>, los campos de cada <code>.fila</code> se ponen <strong>uno al lado del otro</strong> y ocupan <strong>lo mismo</strong>.</li><li>El formulario mide como mucho <code>560px</code> y va centrado.</li></ul>`,
  hint: `Base: <code>.fila { display: flex; flex-direction: column; gap: 12px; }</code>. En la <em>media query</em>: <code>.fila { flex-direction: row; }</code> y <code>.campo { flex: 1; }</code>. Cada <code>.campo</code> agrupa su <code>label</code> y su <code>input</code>.`,
  html: `<form class="reserva">
  <div class="fila">
    <div class="campo"><label for="nombre">Nombre</label><input id="nombre" name="nombre"></div>
    <div class="campo"><label for="correo">Correo</label><input id="correo" name="correo" type="email"></div>
  </div>
  <div class="fila">
    <div class="campo"><label for="fecha">Fecha</label><input id="fecha" name="fecha" type="date"></div>
    <div class="campo"><label for="personas">Personas</label><input id="personas" name="personas" type="number" min="1"></div>
  </div>
  <button type="submit">Reservar</button>
</form>`,
  css: `body { margin: 16px; font-size: 14px; }
* { box-sizing: border-box; }
label { display: block; font-weight: 600; margin-bottom: 4px; }
input { width: 100%; font: inherit; padding: 6px 8px; border: 1px solid #94a3b8; border-radius: 6px; }
button { margin-top: 12px; font: inherit; padding: 8px 20px; border: 0; border-radius: 6px; background: #c0622b; color: #fff; }
`,
  sol: `body { margin: 16px; font-size: 14px; }
* { box-sizing: border-box; }
label { display: block; font-weight: 600; margin-bottom: 4px; }
input { width: 100%; font: inherit; padding: 6px 8px; border: 1px solid #94a3b8; border-radius: 6px; }
button { margin-top: 12px; font: inherit; padding: 8px 20px; border: 0; border-radius: 6px; background: #c0622b; color: #fff; }

.reserva {
  max-width: 560px;
  margin: 0 auto;
}

.fila {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
}

@media (min-width: 600px) {
  .fila { flex-direction: row; }
  .campo { flex: 1; }
}`,
  checks: [
    { d: 'Usas una <em>media query</em> con <code>min-width: 600px</code>', src: ['css', /@media[^{]*min-width\s*:\s*600px/], msg: 'No veo @media (min-width: 600px)' },
    { d: 'En el móvil, un campo debajo de otro', rect: '.campo', w: 400 },
    { d: 'En escritorio, dos campos por fila del mismo ancho', rect: '.campo', w: 720 },
    { d: 'Formulario de 560 px como máximo y centrado', rect: '.reserva', w: 720 },
    { d: 'El botón en su sitio', rect: 'button', w: 720 }
  ]
}
);
