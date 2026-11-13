# lmsgi-trainer: HTML & CSS

Ejercicios cortos de HTML y CSS con corrección automática para el módulo **Lenguajes de Marcas y Sistemas de Gestión de Información (0373)**. Escribes el código a la izquierda y lo comparas con el objetivo a la derecha. Las comprobaciones te dicen qué falta.

> Disclaimer:
> Buena parte de la app se ha hecho con Claude Opus 5.5. Lo que he visto está fetén pero puede haber alguna cosa un poco rara.

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

1. HTML semántico, listas y tablas
2. Formularios
3. Selectores, cascada y box model
4. Flexbox, Grid y responsive

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
