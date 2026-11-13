/* Bloques, constantes compartidas y registro de ejercicios.
   El orden de los ejercicios es el orden de los archivos (00, 01, 02…) y dentro de cada uno. */
window.BLOCKS = [
  { id: 'sem', name: 'HTML semántico, listas y tablas' },
  { id: 'form', name: 'Formularios' },
  { id: 'sel', name: 'Selectores, cascada y box model' },
  { id: 'lay', name: 'Flexbox, Grid y responsive' }
];

const IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 140'%3E%3Crect width='240' height='140' fill='%23dbeafe'/%3E%3Cpath d='M0 140 L80 60 L130 110 L170 80 L240 140Z' fill='%231e3a8a'/%3E%3Ccircle cx='190' cy='35' r='16' fill='%23f59e0b'/%3E%3C/svg%3E";

const FORM_CSS = `body { margin: 16px; font-size: 14px; }
form { max-width: 300px; display: flex; flex-direction: column; gap: 4px; }
label { font-weight: 600; margin-top: 4px; }
input, select, textarea {
  font: inherit;
  padding: 5px 8px;
  border: 1px solid #94a3b8;
  border-radius: 6px;
}
button {
  font: inherit;
  margin-top: 8px;
  padding: 8px;
  background: #1d4ed8;
  color: #fff;
  border: 0;
  border-radius: 6px;
  font-weight: 600;
}`;

window.EXERCISES = [];
