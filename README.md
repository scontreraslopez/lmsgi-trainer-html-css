# lmsgi-trainer: HTML & CSS

Ejercicios cortos de HTML y CSS con corrección automática para el módulo **Lenguajes de Marcas y Sistemas de Gestión de Información (0373)**. Escribes el código a la izquierda y lo comparas con el objetivo a la derecha. Las comprobaciones te dicen qué falta.

La idea está inspirada en [CSSBattle](https://cssbattle.dev/), pero en lugar de retos abstractos (reproducir formas con el menor código posible), cada ejercicio se centra en lo que se practica y se evalúa en el módulo: maquetar con HTML semántico, montar formularios que validen, dar estilo a partir de una guía de diseño o adaptar una página al móvil. Y sin competir: no hay cronómetro ni ranking.

> [!IMPORTANT]
> **Versión «best effort».** Buena parte de este entrenador (la aplicación, los ejercicios y sus comprobaciones) se ha generado con **Claude**, el asistente de IA de Anthropic. Todavía no he podido revisarlo todo a fondo, pero lo que sí he revisado me parece muy útil, así que prefiero compartirlo ya, tal como está, en vez de esperar a tenerlo perfecto. Este proyecto nace de que en ningún lado encontré una plataforma de mini-ejercicios alineada con el temario del módulo, y me pareció que podía ser útil a otros estudiantes.
>
> Por eso puede que te encuentres algún enunciado poco claro o una comprobación que rechace una solución correcta (o que acepte una que no lo es). Si te pasa:
>
> - **Ante la duda, mandan los apuntes del módulo**, Eniun y [MDN](https://developer.mozilla.org/es/), no el entrenador.
> - **Avísame**, en el foro de Aules o abriendo un *issue* en GitHub, con el nombre del ejercicio y el código que has escrito. Así lo arreglo para todos.
>
> Es práctica extra: no sustituye a las actividades ni a las prácticas de Aules.

## Usarlo

1. Descarga el repositorio (botón **Code → Download ZIP**) y descomprímelo.
2. Abre `index.html` con el navegador (Chrome, Edge o Firefox).

No hace falta internet ni instalar nada.

### Tu progreso

Se guarda automáticamente en tu navegador. Si cambias de ordenador o de navegador, o si borras los datos de navegación, se pierde. En **Mi progreso** puedes:

- **Descargar copia**: guarda un `.json` con tus ejercicios resueltos y tu código.
- **Importar copia**: recupera ese archivo en otro ordenador.
- **Borrar todo el progreso**: empieza de cero (pide confirmación).

## Bloques

Siguen las unidades del módulo (75 ejercicios):

1. UP01–03 · Estructura, texto y enlaces
2. UP02–03 · Tablas, multimedia y metadatos
3. UP02–03 · Formularios
4. UP04 · Selectores, texto y modelo de cajas
5. UP05 · Display, posición y pseudoclases (también tablas y formularios con CSS)
6. UP06 · Flexbox y media queries
7. Ampliación · CSS Grid

¿No sabes por dónde seguir? El botón **Aleatorio** te lleva a un ejercicio que aún no has resuelto.

Arriba de la lista de ejercicios tienes las **chuletas de HTML y de CSS** en PDF (carpeta `recursos/`): imprímelas y tenlas a mano.

## Desarrollo

Necesitas Node 20 o superior.

```bash
npm install
npx playwright install chromium
npm run dev     # recompila index.html al guardar
npm test        # comprueba todos los ejercicios
```

Los ejercicios están en `src/exercises/`. En `CLAUDE.md` está el formato y cómo añadir más.

CodeMirror © Marijn Haverbeke y colaboradores, licencia MIT (`vendor/codemirror/LICENSE`).
