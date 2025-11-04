// JavaTheHub.js

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.filters button');
  const items   = document.querySelectorAll('.gallery .item');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      // 1) Resaltar botón
      buttons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');

      // 2) Leer filtro y normalizar
      const filtro = button.dataset.filter.toLowerCase();

      // 3) Mostrar u ocultar items
      items.forEach(item => {
        const categoria = item.dataset.filter.toLowerCase();
        const esMatch   = filtro === 'all' || categoria === filtro;
        item.classList.toggle('hidden', !esMatch);
      });
    });
  });
});
