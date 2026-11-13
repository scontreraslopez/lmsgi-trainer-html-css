/* ===================== BLOQUE 2 · FORMULARIOS ===================== */
window.EXERCISES.push(
{
  id: 'form-login', block: 'form', title: 'Formulario de acceso', edit: 'html', w: 480, h: 260,
  tags: ['label for', 'type=email', 'type=password', 'required'],
  brief: `<p>Arregla el formulario de acceso:</p>
<ul><li>Cada campo con su <code>&lt;label&gt;</code> asociado por <code>for</code>/<code>id</code>.</li><li>El correo debe validarse como email y la contraseña ocultarse.</li><li>Los dos campos son obligatorios; la contraseña, mínimo 8 caracteres.</li><li>Todos los campos llevan <code>name</code> (si no, no se envían).</li><li>Botón de envío con <code>&lt;button&gt;</code>.</li></ul>`,
  hint: `<code>&lt;label for="email"&gt;</code> + <code>&lt;input id="email" type="email" name="email" required&gt;</code>. Para el mínimo: <code>minlength="8"</code>.`,
  css: `body { margin: 16px; font-size: 14px; }
form { max-width: 280px; display: flex; flex-direction: column; gap: 6px; }
label { font-weight: 600; }
input { font: inherit; padding: 6px 8px; border: 1px solid #94a3b8; border-radius: 6px; }
button { font: inherit; margin-top: 8px; padding: 8px; background: #1d4ed8; color: #fff; border: 0; border-radius: 6px; font-weight: 600; }`,
  html: `<form>
  Correo
  <input>
  Contraseña
  <input>
  <input type="submit" value="Entrar">
</form>`,
  sol: `<form>
  <label for="email">Correo</label>
  <input type="email" id="email" name="email" required>
  <label for="pass">Contraseña</label>
  <input type="password" id="pass" name="pass" minlength="8" required>
  <button type="submit">Entrar</button>
</form>`,
  checks: [
    { d: 'Campo <code>type="email"</code>', count: ['input[type="email"]', 1] },
    { d: 'Campo <code>type="password"</code> con <code>minlength="8"</code>', exists: 'input[type="password"][minlength="8"]' },
    { d: 'Todos los campos tienen <code>&lt;label&gt;</code>', labels: true },
    { d: 'Los dos campos son <code>required</code>', count: ['input[required]', 2] },
    { d: 'Todos los <code>&lt;input&gt;</code> tienen <code>name</code>', attr: ['input', 'name'] },
    { d: 'Botón <code>&lt;button type="submit"&gt;</code>', exists: 'button[type="submit"]' }
  ]
},
{
  id: 'form-radios', block: 'form', title: 'Radios y casillas agrupados', edit: 'html', w: 480, h: 220,
  tags: ['fieldset', 'legend', 'radio', 'checkbox', 'name/value'],
  brief: `<p>Agrupa las opciones con <code>&lt;fieldset&gt;</code> y <code>&lt;legend&gt;</code>:</p>
<ul><li><strong>Turno</strong>: dos radios que se excluyan entre sí; «Mañana» marcado por defecto.</li><li><strong>Módulos</strong>: tres casillas que comparten <code>name</code>.</li><li>Cada opción con su <code>&lt;label&gt;</code> y un <code>value</code>.</li></ul>`,
  hint: `Los radios solo se excluyen si comparten el mismo <code>name</code>. El valor por defecto se marca con el atributo <code>checked</code>.`,
  css: `body { margin: 16px; font-size: 14px; }
fieldset { border: 1px solid #cbd5e1; border-radius: 6px; margin: 0 0 10px; padding: 8px 12px; }
legend { font-weight: 700; padding: 0 4px; }
label { margin-right: 12px; }`,
  html: `<form>
  <p>Turno</p>
  <input type="radio" name="manana"> Mañana
  <input type="radio" name="tarde"> Tarde
  <p>Módulos</p>
  <input type="checkbox"> LMSGI
  <input type="checkbox"> EDE
  <input type="checkbox"> BD
</form>`,
  sol: `<form>
  <fieldset>
    <legend>Turno</legend>
    <input type="radio" id="t-man" name="turno" value="manana" checked>
    <label for="t-man">Mañana</label>
    <input type="radio" id="t-tar" name="turno" value="tarde">
    <label for="t-tar">Tarde</label>
  </fieldset>
  <fieldset>
    <legend>Módulos</legend>
    <input type="checkbox" id="m-lmsgi" name="modulos" value="lmsgi">
    <label for="m-lmsgi">LMSGI</label>
    <input type="checkbox" id="m-ede" name="modulos" value="ede">
    <label for="m-ede">EDE</label>
    <input type="checkbox" id="m-bd" name="modulos" value="bd">
    <label for="m-bd">BD</label>
  </fieldset>
</form>`,
  checks: [
    { d: 'Dos <code>&lt;fieldset&gt;</code> con <code>&lt;legend&gt;</code>', count: ['fieldset > legend', 2] },
    { d: 'Los 2 radios comparten <code>name</code>', js: (U) => { const r = U.qa('input[type="radio"]'); return (r.length === 2 && r[0].name !== '' && r.every((x) => x.name === r[0].name)) || 'Necesito 2 radios con el mismo name'; } },
    { d: 'Un único radio marcado por defecto', count: ['input[type="radio"][checked]', 1] },
    { d: '3 casillas con el mismo <code>name</code>', js: (U) => { const r = U.qa('input[type="checkbox"]'); return (r.length === 3 && r[0].name !== '' && r.every((x) => x.name === r[0].name)) || 'Necesito 3 checkbox con el mismo name'; } },
    { d: 'Todas las opciones tienen <code>value</code>', attr: ['input', 'value'] },
    { d: 'Todas las opciones tienen <code>&lt;label&gt;</code>', labels: true }
  ]
},
{
  id: 'form-registro', block: 'form', title: 'Registro con validación HTML5', edit: 'html', w: 480, h: 470,
  tags: ['number min/max', 'tel pattern', 'select', 'textarea', 'required'],
  brief: `<p>Todos los campos son de texto. Elige el tipo correcto y añade la validación:</p>
<ul><li><strong>Nombre</strong> obligatorio.</li><li><strong>Edad</strong> numérica entre 16 y 99.</li><li><strong>Teléfono</strong> de exactamente 9 dígitos (usa <code>pattern</code>).</li><li><strong>Ciclo</strong>: desplegable con DAM, DAW y ASIR.</li><li><strong>Comentarios</strong>: texto de varias líneas.</li><li>Casilla obligatoria «Acepto la política de privacidad».</li></ul>`,
  hint: `<code>pattern="[0-9]{9}"</code> valida el teléfono. El desplegable es <code>&lt;select&gt;</code> con <code>&lt;option value="…"&gt;</code>. Una casilla también puede ser <code>required</code>.`,
  css: FORM_CSS,
  html: `<form>
  <label for="nombre">Nombre</label>
  <input type="text" id="nombre" name="nombre">
  <label for="edad">Edad</label>
  <input type="text" id="edad" name="edad">
  <label for="tel">Teléfono</label>
  <input type="text" id="tel" name="tel">
  <label for="ciclo">Ciclo</label>
  <input type="text" id="ciclo" name="ciclo">
  <label for="coment">Comentarios</label>
  <input type="text" id="coment" name="coment">
  <!-- casilla de aceptación -->
  <button type="submit">Enviar</button>
</form>`,
  sol: `<form>
  <label for="nombre">Nombre</label>
  <input type="text" id="nombre" name="nombre" required>
  <label for="edad">Edad</label>
  <input type="number" id="edad" name="edad" min="16" max="99">
  <label for="tel">Teléfono</label>
  <input type="tel" id="tel" name="tel" pattern="[0-9]{9}" placeholder="612345678">
  <label for="ciclo">Ciclo</label>
  <select id="ciclo" name="ciclo">
    <option value="dam">DAM</option>
    <option value="daw">DAW</option>
    <option value="asir">ASIR</option>
  </select>
  <label for="coment">Comentarios</label>
  <textarea id="coment" name="coment" rows="3"></textarea>
  <label><input type="checkbox" name="acepto" required> Acepto la política de privacidad</label>
  <button type="submit">Enviar</button>
</form>`,
  checks: [
    { d: 'Nombre obligatorio', exists: '#nombre[required]' },
    { d: 'Edad <code>type="number"</code> entre 16 y 99', exists: 'input#edad[type="number"][min="16"][max="99"]' },
    { d: 'Teléfono <code>type="tel"</code> con <code>pattern</code>', exists: 'input#tel[type="tel"][pattern]' },
    { d: 'El patrón acepta 612345678 y rechaza 6123 y 61234567a', js: (U) => { const t = U.q('#tel'); if (!t || !t.pattern) return 'Falta el pattern'; let re; try { re = new RegExp('^(?:' + t.pattern + ')$'); } catch (e) { return 'El pattern no es una expresión válida'; } return (re.test('612345678') && !re.test('6123') && !re.test('61234567a')) || 'El pattern no valida 9 dígitos exactos'; } },
    { d: 'Ciclo es un <code>&lt;select&gt;</code> con 3 opciones', count: ['select#ciclo > option', 3] },
    { d: 'Comentarios es un <code>&lt;textarea&gt;</code>', exists: 'textarea#coment' },
    { d: 'Casilla de aceptación obligatoria', exists: 'input[type="checkbox"][required]' },
    { d: 'Todos los campos tienen <code>&lt;label&gt;</code>', labels: true }
  ]
},
{
  id: 'form-buscador', block: 'form', title: 'Buscador', edit: 'html', w: 480, h: 110,
  tags: ['role=search', 'type=search', 'method=get', 'action'],
  brief: `<p>Convierte el «buscador» en un formulario de verdad:</p>
<ul><li>Envía por <code>GET</code> a <code>/buscar</code> y se identifica como búsqueda con <code>role="search"</code>.</li><li>Campo de tipo búsqueda llamado <code>q</code>, con su etiqueta «Buscar apuntes».</li><li>Botón de envío.</li></ul>`,
  hint: `Si el formulario envía por GET, la URL queda como <code>/buscar?q=flexbox</code>: por eso el campo se llama <code>q</code>.`,
  css: `body { margin: 16px; font-size: 14px; }
form { display: flex; gap: 8px; align-items: center; }
label { font-weight: 600; }
input { font: inherit; padding: 6px 8px; border: 1px solid #94a3b8; border-radius: 6px; flex: 1; }
button { font: inherit; padding: 6px 14px; background: #1d4ed8; color: #fff; border: 0; border-radius: 6px; font-weight: 600; }`,
  html: `<div class="buscador">
  <input type="text" placeholder="Buscar...">
  <a href="#">Buscar</a>
</div>`,
  sol: `<form role="search" action="/buscar" method="get">
  <label for="q">Buscar apuntes</label>
  <input type="search" id="q" name="q" placeholder="flexbox, grid…">
  <button type="submit">Buscar</button>
</form>`,
  checks: [
    { d: '<code>&lt;form role="search"&gt;</code>', exists: 'form[role="search"]' },
    { d: 'Envía por GET a <code>/buscar</code>', exists: 'form[method="get" i][action="/buscar"]' },
    { d: 'Campo <code>type="search"</code> con <code>name="q"</code>', exists: 'input[type="search"][name="q"]' },
    { d: 'El campo tiene <code>&lt;label&gt;</code>', labels: true },
    { d: 'Botón de envío', exists: 'form button:not([type="button"]):not([type="reset"])' },
    { d: 'Sin <code>&lt;div&gt;</code>', none: 'div' }
  ]
}
);
