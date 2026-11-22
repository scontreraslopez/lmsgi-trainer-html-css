/* ===================== BLOQUE · UP02–UP03 · FORMULARIOS ===================== */
window.EXERCISES.push(
{
  id: 'form-suscripcion', block: 'form', title: 'Formulario de suscripción', edit: 'html', w: 480, h: 190,
  tags: ['form action/method', 'label for', 'type=email', 'name'],
  brief: `<p>Como en la actividad 2 de la UP02, haz que este formulario funcione de verdad:</p>
<ul><li>Envía por <code>post</code> a <code>https://old-butterfly-esp.contry-1990.workers.dev/api/suscribir</code>.</li><li>La etiqueta «Tu email:» está vinculada al campo, que tiene <code>id="emailNoticias"</code>.</li><li>El campo es de tipo correo, se llama <code>user_email</code> (si no, el servidor no lo reconoce) y tiene un texto de ejemplo.</li><li>Botón de envío con <code>&lt;button&gt;</code> y el texto «Suscribirme».</li></ul>`,
  hint: `<code>&lt;form action="…" method="post"&gt;</code>, <code>&lt;label for="emailNoticias"&gt;</code> y <code>&lt;input type="email" id="emailNoticias" name="user_email" placeholder="…"&gt;</code>. Haz clic en «Tu email:» en la vista previa: si se activa el campo, está bien vinculado.`,
  css: `body { margin: 16px; font-size: 14px; }
h2 { font-size: 18px; margin: 0 0 8px; }
form { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
input { font: inherit; padding: 6px 8px; border: 1px solid #94a3b8; border-radius: 6px; }
button { font: inherit; padding: 6px 14px; background: #1d4ed8; color: #fff; border: 0; border-radius: 6px; font-weight: 600; }`,
  html: `<section>
  <h2>¡Recibe novedades!</h2>
  <form>
    Tu email:
    <input>
    <input type="submit">
  </form>
</section>`,
  sol: `<section>
  <h2>¡Recibe novedades!</h2>
  <form action="https://old-butterfly-esp.contry-1990.workers.dev/api/suscribir" method="post">
    <label for="emailNoticias">Tu email:</label>
    <input type="email" id="emailNoticias" name="user_email" placeholder="nombre@ejemplo.com">
    <button type="submit">Suscribirme</button>
  </form>
</section>`,
  checks: [
    { d: 'Envía por POST a la dirección del servicio', exists: 'form[method="post" i][action="https://old-butterfly-esp.contry-1990.workers.dev/api/suscribir"]' },
    { d: 'Campo de correo con <code>id="emailNoticias"</code> y <code>name="user_email"</code>', exists: 'input#emailNoticias[type="email"][name="user_email"]' },
    { d: '«Tu email:» es un <code>&lt;label&gt;</code> vinculado al campo', js: (U) => { const i = U.q('#emailNoticias'); return (i && i.labels && [...i.labels].some((l) => l.textContent.trim() === 'Tu email:')) || 'El label «Tu email:» no está vinculado al campo'; } },
    { d: 'El campo tiene <code>placeholder</code>', attr: ['input[type="email"]', 'placeholder'] },
    { d: 'Botón «Suscribirme»', js: (U) => U.qa('button[type="submit"], button:not([type])').some((b) => b.textContent.trim() === 'Suscribirme') || 'No veo <button type="submit">Suscribirme</button>' },
    { d: 'Sin <code>&lt;input type="submit"&gt;</code>', none: 'input[type="submit"]' }
  ]
},
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
  ]},
{id: 'form-radios', block: 'form', title: 'Radios y casillas agrupados', edit: 'html', w: 480, h: 220,
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
  ]},
{
  id: 'form-tipos', block: 'form', title: 'Cada dato con su tipo de campo', edit: 'html', w: 480, h: 420,
  tags: ['date', 'time', 'url', 'range', 'color', 'file'],
  brief: `<p>Encuesta de inicio de curso. Todos los campos son <code>text</code>: cambia cada uno al <code>type</code> que le corresponde para que el navegador muestre el control adecuado y valide solo.</p>
<ul><li><strong>Fecha de nacimiento</strong>: un selector de fecha.</li><li><strong>Hora preferida de tutoría</strong>: un selector de hora.</li><li><strong>Tu portfolio</strong>: una dirección web.</li><li><strong>Nivel de HTML</strong>: un deslizador de 0 a 10.</li><li><strong>Color del perfil</strong>: un selector de color.</li><li><strong>Foto</strong>: subir un archivo que sea una imagen.</li></ul>`,
  hint: `<code>date</code>, <code>time</code>, <code>url</code>, <code>range</code> (con <code>min</code> y <code>max</code>), <code>color</code> y <code>file</code> con <code>accept="image/*"</code>.`,
  css: FORM_CSS,
  html: `<form>
  <label for="nac">Fecha de nacimiento</label>
  <input type="text" id="nac" name="nac">
  <label for="hora">Hora preferida de tutoría</label>
  <input type="text" id="hora" name="hora">
  <label for="web">Tu portfolio</label>
  <input type="text" id="web" name="web">
  <label for="nivel">Nivel de HTML (0-10)</label>
  <input type="text" id="nivel" name="nivel">
  <label for="color">Color del perfil</label>
  <input type="text" id="color" name="color">
  <label for="foto">Foto</label>
  <input type="text" id="foto" name="foto">
  <button type="submit">Enviar</button>
</form>`,
  sol: `<form>
  <label for="nac">Fecha de nacimiento</label>
  <input type="date" id="nac" name="nac">
  <label for="hora">Hora preferida de tutoría</label>
  <input type="time" id="hora" name="hora">
  <label for="web">Tu portfolio</label>
  <input type="url" id="web" name="web">
  <label for="nivel">Nivel de HTML (0-10)</label>
  <input type="range" id="nivel" name="nivel" min="0" max="10">
  <label for="color">Color del perfil</label>
  <input type="color" id="color" name="color">
  <label for="foto">Foto</label>
  <input type="file" id="foto" name="foto" accept="image/*">
  <button type="submit">Enviar</button>
</form>`,
  checks: [
    { d: 'Fecha de nacimiento', exists: 'input#nac[type="date"]' },
    { d: 'Hora de tutoría', exists: 'input#hora[type="time"]' },
    { d: 'Portfolio', exists: 'input#web[type="url"]' },
    { d: 'Nivel: deslizador de 0 a 10', exists: 'input#nivel[type="range"][min="0"][max="10"]' },
    { d: 'Color del perfil', exists: 'input#color[type="color"]' },
    { d: 'Foto: solo imágenes', js: (U) => { const f = U.q('input#foto[type="file"]'); return (f && /image\//.test(f.accept)) || 'Espero type="file" con accept de imágenes'; } },
    { d: 'Ningún campo de texto', none: 'input[type="text"], input:not([type])' }
  ]
},
{id: 'form-registro', block: 'form', title: 'Registro con validación HTML5', edit: 'html', w: 480, h: 470,
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
  ]},
{
  id: 'form-patrones', block: 'form', title: 'Validar con patrones', edit: 'html', w: 480, h: 280,
  tags: ['pattern', 'expresiones regulares', 'title', 'required'],
  brief: `<p>Añade un <code>pattern</code> a cada campo, todos obligatorios, y un <code>title</code> que explique el formato (el navegador lo muestra si el dato no vale):</p>
<ul><li><strong>Código postal</strong>: exactamente 5 cifras (<code>03203</code>).</li><li><strong>DNI</strong>: 8 cifras y una letra mayúscula (<code>12345678Z</code>).</li><li><strong>Usuario de Aules</strong>: de 3 a 12 caracteres, solo letras minúsculas y cifras (<code>ana23</code>).</li></ul>`,
  hint: `Una cifra es <code>[0-9]</code> (o <code>\\d</code>); <code>{5}</code> repite exactamente 5 veces y <code>{3,12}</code> entre 3 y 12. En <code>pattern</code> no hace falta <code>^</code> ni <code>$</code>: el valor entero tiene que encajar.`,
  css: FORM_CSS,
  html: `<form>
  <label for="cp">Código postal</label>
  <input type="text" id="cp" name="cp">
  <label for="dni">DNI</label>
  <input type="text" id="dni" name="dni">
  <label for="usuario">Usuario de Aules</label>
  <input type="text" id="usuario" name="usuario">
  <button type="submit">Comprobar</button>
</form>`,
  sol: `<form>
  <label for="cp">Código postal</label>
  <input type="text" id="cp" name="cp" pattern="[0-9]{5}" title="5 cifras, por ejemplo 03203" required>
  <label for="dni">DNI</label>
  <input type="text" id="dni" name="dni" pattern="[0-9]{8}[A-Z]" title="8 cifras y una letra mayúscula" required>
  <label for="usuario">Usuario de Aules</label>
  <input type="text" id="usuario" name="usuario" pattern="[a-z0-9]{3,12}" title="De 3 a 12 letras minúsculas o cifras" required>
  <button type="submit">Comprobar</button>
</form>`,
  checks: [
    { d: 'Código postal: acepta 03203, rechaza 3203, 032031 y 0320A', js: patternCheck('#cp', ['03203', '46001'], ['3203', '032031', '0320A', '']) },
    { d: 'DNI: acepta 12345678Z, rechaza 1234567Z, 12345678z y 123456789', js: patternCheck('#dni', ['12345678Z', '00000001R'], ['1234567Z', '12345678z', '123456789', '12345678ZZ']) },
    { d: 'Usuario: acepta ana23, rechaza an, Ana23, ana_23 y uno de 13 caracteres', js: patternCheck('#usuario', ['ana23', 'abc', 'abcdefghijkl'], ['an', 'Ana23', 'ana_23', 'ana 23', 'abcdefghijklm']) },
    { d: 'Los tres son obligatorios', count: ['input[required]', 3] },
    { d: 'Los tres explican el formato en <code>title</code>', attr: ['input', 'title'] }
  ]
},
{
  id: 'form-desplegables', block: 'form', title: 'Desplegables agrupados y sugerencias', edit: 'html', w: 480, h: 260,
  tags: ['select', 'optgroup', 'selected', 'datalist'],
  brief: `<p>Mejora el formulario de preinscripción:</p>
<ul><li>El <strong>ciclo</strong> se elige en un desplegable con dos grupos: «Informática» (DAM, DAW, ASIR) y «Administración» (Administración y Finanzas, Gestión Administrativa). DAM sale elegido por defecto.</li><li>La <strong>localidad</strong> se escribe libremente, pero el campo sugiere Elche, Alicante, Crevillent y Santa Pola mientras escribes.</li></ul>`,
  hint: `<code>&lt;optgroup label="Informática"&gt;</code> agrupa opciones y <code>selected</code> marca la de por defecto. Para las sugerencias: <code>&lt;input list="localidades"&gt;</code> y <code>&lt;datalist id="localidades"&gt;&lt;option value="Elche"&gt;…</code>.`,
  css: FORM_CSS,
  html: `<form>
  <label for="ciclo">Ciclo</label>
  <input type="text" id="ciclo" name="ciclo">
  <label for="localidad">Localidad</label>
  <input type="text" id="localidad" name="localidad">
  <button type="submit">Preinscribirme</button>
</form>`,
  sol: `<form>
  <label for="ciclo">Ciclo</label>
  <select id="ciclo" name="ciclo">
    <optgroup label="Informática">
      <option value="dam" selected>DAM</option>
      <option value="daw">DAW</option>
      <option value="asir">ASIR</option>
    </optgroup>
    <optgroup label="Administración">
      <option value="af">Administración y Finanzas</option>
      <option value="ga">Gestión Administrativa</option>
    </optgroup>
  </select>
  <label for="localidad">Localidad</label>
  <input type="text" id="localidad" name="localidad" list="localidades">
  <datalist id="localidades">
    <option value="Elche">
    <option value="Alicante">
    <option value="Crevillent">
    <option value="Santa Pola">
  </datalist>
  <button type="submit">Preinscribirme</button>
</form>`,
  checks: [
    { d: 'El ciclo es un <code>&lt;select&gt;</code>', exists: 'select#ciclo' },
    { d: 'Dos <code>&lt;optgroup&gt;</code> con <code>label</code>', js: (U) => U.qa('select#ciclo > optgroup').map((g) => g.label).join('|') === 'Informática|Administración' || 'Espero los grupos «Informática» y «Administración»' },
    { d: '3 + 2 opciones en sus grupos', js: (U) => { const g = U.qa('select#ciclo > optgroup'); return (g.length === 2 && g[0].querySelectorAll('option').length === 3 && g[1].querySelectorAll('option').length === 2) || 'Revisa cuántas opciones hay en cada grupo'; } },
    { d: 'DAM elegido por defecto', js: (U) => { const o = U.q('select#ciclo option[selected]'); return (o && o.textContent.trim() === 'DAM') || 'Marca DAM con selected'; } },
    { d: 'Localidad con sugerencias de un <code>&lt;datalist&gt;</code>', js: (U) => { const i = U.q('input#localidad'); const id = i && i.getAttribute('list'); const dl = id && U.doc.getElementById(id); return (dl && dl.tagName === 'DATALIST' && dl.querySelectorAll('option').length === 4) || 'El campo debe tener list="…" apuntando a un datalist con 4 opciones'; } }
  ]
},
{
  id: 'form-estados', block: 'form', title: 'Campos fijos, desactivados y botones', edit: 'html', w: 480, h: 330,
  tags: ['value', 'readonly', 'disabled', 'maxlength', 'reset'],
  brief: `<p>Formulario de matrícula:</p>
<ul><li>El <strong>curso</strong> ya viene puesto (<code>2026/27</code>): se envía, pero no se puede cambiar.</li><li>La <strong>solicitud de beca</strong> está desactivada porque el plazo terminó (ni se edita ni se envía).</li><li>El <strong>código de matrícula</strong> admite como máximo 6 caracteres.</li><li>Además del botón de enviar, añade uno que <strong>borre</strong> el formulario.</li></ul>`,
  hint: `<code>value</code> + <code>readonly</code> (se envía) frente a <code>disabled</code> (no se envía). El botón de borrar es <code>&lt;button type="reset"&gt;</code>.`,
  css: FORM_CSS + `
input[readonly] { background: #f1f5f9; }
input:disabled { opacity: .5; }
button[type="reset"] { background: #e2e8f0; color: #0f172a; }`,
  html: `<form>
  <label for="curso">Curso</label>
  <input type="text" id="curso" name="curso">
  <label for="beca">Solicitud de beca</label>
  <input type="text" id="beca" name="beca">
  <label for="codigo">Código de matrícula</label>
  <input type="text" id="codigo" name="codigo">
  <button type="submit">Matricularme</button>
</form>`,
  sol: `<form>
  <label for="curso">Curso</label>
  <input type="text" id="curso" name="curso" value="2026/27" readonly>
  <label for="beca">Solicitud de beca</label>
  <input type="text" id="beca" name="beca" disabled>
  <label for="codigo">Código de matrícula</label>
  <input type="text" id="codigo" name="codigo" maxlength="6">
  <button type="submit">Matricularme</button>
  <button type="reset">Borrar</button>
</form>`,
  checks: [
    { d: 'El curso vale 2026/27 y no se puede cambiar, pero se envía', exists: 'input#curso[value="2026/27"][readonly]:not([disabled])' },
    { d: 'La beca está desactivada', exists: 'input#beca[disabled]' },
    { d: 'El código admite 6 caracteres como máximo', exists: 'input#codigo[maxlength="6"]' },
    { d: 'Botón de enviar y botón de borrar', js: (U) => (U.qa('button[type="submit"]').length === 1 && U.qa('button[type="reset"], input[type="reset"]').length === 1) || 'Necesito un botón submit y otro reset' }
  ]
},
{
  id: 'form-consulta', block: 'form', title: 'Formulario de consulta completo', edit: 'html', w: 480, h: 470,
  tags: ['required', 'maxlength', 'pattern', 'autofocus', 'placeholder'],
  brief: `<p>Al estilo de la práctica de la UP03. Formulario de consulta del club de robótica:</p>
<ul><li><strong>Nombre</strong>: máximo 30 caracteres; solo letras, cifras y espacios.</li><li><strong>Email</strong>.</li><li><strong>Edad</strong>: entre 14 y 99.</li><li><strong>Consulta</strong>: texto largo.</li><li>Casilla de aceptación de la política de privacidad.</li></ul>
<p>Todos los campos son <strong>obligatorios</strong>, todos tienen <code>&lt;label&gt;</code>, los que se escriben llevan <code>placeholder</code> y el foco empieza en «Nombre».</p>`,
  hint: `El email y la edad ya se validan por su <code>type</code> (con <code>min</code>/<code>max</code>): solo el nombre necesita <code>pattern</code>, por ejemplo <code>[A-Za-z0-9 ]+</code>. El foco inicial es <code>autofocus</code>.`,
  css: FORM_CSS,
  html: `<form>
  Nombre <input type="text">
  Email <input type="text">
  Edad <input type="text">
  Consulta <input type="text">
  <input type="checkbox"> Acepto la política de privacidad
  <button type="submit">Enviar consulta</button>
</form>`,
  sol: `<form>
  <label for="nombre">Nombre</label>
  <input type="text" id="nombre" name="nombre" maxlength="30" pattern="[A-Za-z0-9 ]+" placeholder="Ana García" required autofocus>
  <label for="email">Email</label>
  <input type="email" id="email" name="email" placeholder="ana@ejemplo.com" required>
  <label for="edad">Edad</label>
  <input type="number" id="edad" name="edad" min="14" max="99" placeholder="16" required>
  <label for="consulta">Consulta</label>
  <textarea id="consulta" name="consulta" rows="4" placeholder="Escribe aquí tu consulta" required></textarea>
  <label><input type="checkbox" name="privacidad" required> Acepto la política de privacidad</label>
  <button type="submit">Enviar consulta</button>
</form>`,
  checks: [
    { d: 'Nombre: máximo 30 caracteres', exists: 'input#nombre[maxlength="30"]' },
    { d: 'Nombre: acepta «Ana 2», rechaza «Ana!» y «ana@b»', js: patternCheck('#nombre', ['Ana 2', 'Luis', 'MariaJose 1990'], ['Ana!', 'ana@b', '']) },
    { d: 'Email de tipo correo', exists: 'input#email[type="email"]' },
    { d: 'Edad numérica entre 14 y 99', exists: 'input#edad[type="number"][min="14"][max="99"]' },
    { d: 'Consulta en un <code>&lt;textarea&gt;</code>', exists: 'textarea#consulta' },
    { d: 'Los cinco campos son obligatorios', js: (U) => U.qa('input, textarea').filter((e) => e.required).length === 5 || 'Hay ' + U.qa('input[required], textarea[required]').length + ' campos obligatorios; se esperan 5' },
    { d: 'Todos los campos tienen <code>&lt;label&gt;</code>', labels: true },
    { d: 'Placeholder en nombre, email, edad y consulta', js: (U) => ['#nombre', '#email', '#edad', '#consulta'].every((s) => { const e = U.q(s); return e && e.placeholder.trim(); }) || 'Falta algún placeholder' },
    { d: 'El foco empieza en el nombre', exists: 'input#nombre[autofocus]' }
  ]
},
{id: 'form-buscador', block: 'form', title: 'Buscador', edit: 'html', w: 480, h: 110,
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
