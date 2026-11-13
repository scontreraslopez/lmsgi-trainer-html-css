/* ===================== BLOQUE 4 · LAYOUT ===================== */
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
  ]
},
{
  id: 'centrado-total', block: 'lay', title: 'Centrado perfecto', edit: 'css', w: 480, h: 240,
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
  ]
},
{
  id: 'tarjetas-flex-wrap', block: 'lay', title: 'Tarjetas que se reparten', edit: 'css', w: 480, h: 260,
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
  ]
},
{
  id: 'galeria-grid', block: 'lay', title: 'Galería con grid', edit: 'css', w: 480, h: 300,
  tags: ['grid-template-columns', 'repeat()', 'fr', 'span'],
  brief: `<p>Galería de 3 columnas iguales, filas de <code>80px</code> y <code>8px</code> de separación. La primera foto es destacada: ocupa 2 columnas y 2 filas.</p>`,
  hint: `<code>grid-template-columns: repeat(3, 1fr)</code>, <code>grid-auto-rows: 80px</code>. Para la destacada: <code>grid-column: span 2; grid-row: span 2</code>.`,
  html: `<div class="galeria">
  <div class="foto">1</div>
  <div class="foto">2</div>
  <div class="foto">3</div>
  <div class="foto">4</div>
  <div class="foto">5</div>
  <div class="foto">6</div>
</div>`,
  css: `body { margin: 16px; }

.galeria {

}

.foto {
  background: #c7d2fe;
  color: #3730a3;
  font-weight: 700;
  border-radius: 6px;
  display: grid;
  place-items: center;
}
.foto:first-child { background: #818cf8; color: #fff; }
`,
  sol: `body { margin: 16px; }

.galeria {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 80px;
  gap: 8px;
}

.foto {
  background: #c7d2fe;
  color: #3730a3;
  font-weight: 700;
  border-radius: 6px;
  display: grid;
  place-items: center;
}
.foto:first-child {
  background: #818cf8;
  color: #fff;
  grid-column: span 2;
  grid-row: span 2;
}`,
  checks: [
    { d: '<code>.galeria</code> es un grid', css: ['.galeria', ['display']] },
    { d: 'La foto destacada ocupa 2 × 2', rect: '.foto:first-child' },
    { d: 'Todas las fotos en su celda', rect: '.foto' }
  ]
},
{
  id: 'layout-areas', block: 'lay', title: 'Maqueta con grid-template-areas', edit: 'css', w: 480, h: 320,
  tags: ['grid-template-areas', 'grid-area', 'fr'],
  brief: `<p>Monta la maqueta clásica con <strong>áreas con nombre</strong>:</p>
<ul><li>Columnas: <code>120px</code> y el resto. Filas: <code>56px</code>, el resto y <code>40px</code>.</li><li>Cabecera y pie a lo ancho; menú a la izquierda y contenido a la derecha.</li><li>El grid ocupa toda la ventana, con <code>8px</code> de separación y <code>8px</code> de relleno (que no sume altura).</li></ul>`,
  hint: `<code>grid-template-areas: "cab cab" "menu main" "pie pie";</code> y en cada hijo <code>grid-area: cab</code>, etc. Para que el relleno no desborde: <code>box-sizing: border-box</code> con <code>height: 100vh</code>.`,
  html: `<div class="layout">
  <header>Cabecera</header>
  <aside>Menú</aside>
  <main>Contenido</main>
  <footer>Pie</footer>
</div>`,
  css: `body { margin: 0; }

.layout {

}

header { background: #1e3a8a; color: #fff; }
aside { background: #dbeafe; }
main { background: #f1f5f9; }
footer { background: #e2e8f0; }
header, aside, main, footer { padding: 8px; border-radius: 6px; }
`,
  sol: `body { margin: 0; }

.layout {
  display: grid;
  grid-template-columns: 120px 1fr;
  grid-template-rows: 56px 1fr 40px;
  grid-template-areas:
    "cab cab"
    "menu main"
    "pie pie";
  gap: 8px;
  padding: 8px;
  height: 100vh;
  box-sizing: border-box;
}

header { grid-area: cab; background: #1e3a8a; color: #fff; }
aside { grid-area: menu; background: #dbeafe; }
main { grid-area: main; background: #f1f5f9; }
footer { grid-area: pie; background: #e2e8f0; }
header, aside, main, footer { padding: 8px; border-radius: 6px; }`,
  checks: [
    { d: 'Usas <code>grid-template-areas</code>', src: ['css', /grid-template-areas\s*:/], msg: 'No veo grid-template-areas' },
    { d: 'Usas <code>grid-area</code> en los hijos', js: (U, S, src) => (src.css.match(/grid-area\s*:/g) || []).length >= 4 || 'Asigna grid-area a los 4 hijos' },
    { d: 'Cabecera y pie a lo ancho', rect: 'header, footer' },
    { d: 'Menú y contenido en su sitio', rect: 'aside, main' }
  ]
},
{
  id: 'responsive-planes', block: 'lay', title: 'Mobile first: de 1 a 3 columnas', edit: 'css', w: 720, h: 300, views: [400, 720],
  tags: ['@media', 'min-width', 'mobile first', 'grid'],
  brief: `<p>En móvil las tarjetas van una debajo de otra (ya funciona). A partir de <code>600px</code> de ancho deben ponerse en <strong>3 columnas iguales</strong>. Usa los botones de ancho para ver las dos versiones.</p>`,
  hint: `Mobile first: el CSS base es el de móvil y la media query añade lo de pantallas grandes: <code>@media (min-width: 600px) { .planes { grid-template-columns: repeat(3, 1fr); } }</code>.`,
  html: `<div class="planes">
  <article class="plan"><h3>Básico</h3><p>Apuntes y ejercicios</p></article>
  <article class="plan"><h3>Pro</h3><p>Más corrección guiada</p></article>
  <article class="plan"><h3>Centro</h3><p>Para todo el ciclo</p></article>
</div>`,
  css: `body { margin: 16px; }

.planes {
  display: grid;
  gap: 12px;
}

.plan { padding: 16px; border: 1px solid #cbd5e1; border-radius: 10px; }
.plan h3 { margin: 0 0 4px; }
.plan p { margin: 0; color: #475569; }
`,
  sol: `body { margin: 16px; }

.planes {
  display: grid;
  gap: 12px;
}

.plan { padding: 16px; border: 1px solid #cbd5e1; border-radius: 10px; }
.plan h3 { margin: 0 0 4px; }
.plan p { margin: 0; color: #475569; }

@media (min-width: 600px) {
  .planes {
    grid-template-columns: repeat(3, 1fr);
  }
}`,
  checks: [
    { d: 'Usas una media query <code>min-width</code>', src: ['css', /@media[^{]*min-width/], msg: 'No veo @media (min-width: …)' },
    { d: 'En móvil, una columna', rect: '.plan', w: 400 },
    { d: 'En escritorio, tres columnas', rect: '.plan', w: 720 }
  ]
},
{
  id: 'pie-pegado', block: 'lay', title: 'Pie pegado abajo', edit: 'css', w: 480, h: 300,
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
  ]
},
{
  id: 'contador-posicion', block: 'lay', title: 'Contador de notificaciones', edit: 'css', w: 480, h: 140,
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
}
);
