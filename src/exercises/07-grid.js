/* ===================== AMPLIACIÓN · CSS GRID (no entra en el temario de la UP06) ===================== */
window.EXERCISES.push(
{id: 'galeria-grid', block: 'grid', title: 'Galería con grid', edit: 'css', w: 480, h: 300,
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
  ]},
{id: 'layout-areas', block: 'grid', title: 'Maqueta con grid-template-areas', edit: 'css', w: 480, h: 320,
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
  ]},
{
  id: 'grid-auto-fill', block: 'grid', title: 'Rejilla que se adapta sola', edit: 'css', w: 640, h: 300, views: [400, 640],
  tags: ['repeat(auto-fill)', 'minmax()', 'gap'],
  brief: `<p>Rejilla de módulos del ciclo, <strong>sin media queries</strong>: tantas columnas como quepan, cada una de <code>140px</code> como mínimo, que se reparten el espacio sobrante a partes iguales. Separación de <code>12px</code>. Prueba los dos anchos.</p>`,
  hint: `<code>grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));</code>. A diferencia de <code>flex-wrap</code>, la última fila no se estira: las columnas son iguales en todas las filas.`,
  html: `<div class="modulos">
  <div class="modulo">LMSGI</div>
  <div class="modulo">Programación</div>
  <div class="modulo">Bases de datos</div>
  <div class="modulo">Sistemas</div>
  <div class="modulo">Entornos</div>
  <div class="modulo">Digitalización</div>
  <div class="modulo">Sostenibilidad</div>
</div>`,
  css: `body { margin: 16px; font-size: 14px; }

.modulo {
  padding: 16px 8px;
  text-align: center;
  font-weight: 600;
  background: #ede9fe;
  color: #5b21b6;
  border-radius: 8px;
}
`,
  sol: `body { margin: 16px; font-size: 14px; }

.modulos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
}

.modulo {
  padding: 16px 8px;
  text-align: center;
  font-weight: 600;
  background: #ede9fe;
  color: #5b21b6;
  border-radius: 8px;
}`,
  checks: [
    { d: '<code>.modulos</code> es un grid', css: ['.modulos', ['display']] },
    { d: 'Sin <em>media queries</em>', nosrc: ['css', /@media/], msg: 'Este se resuelve sin @media' },
    { d: 'En el móvil, dos columnas', rect: '.modulo', w: 400 },
    { d: 'En pantalla ancha, cuatro columnas', rect: '.modulo', w: 640 }
  ]
}
);
