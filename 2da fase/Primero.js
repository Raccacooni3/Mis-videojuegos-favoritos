const items = document.querySelectorAll('.card');
const cardsView = document.getElementById('cardsView');
const detailView = document.getElementById('detailView');
const backBtns = document.querySelectorAll('.backBtn');


const sonidos = {
  "Super Mario Odyssey": "Lista de sonidos/Sonidos Mario/super-mario-coin-sound.mp3",
  "Pokemon Heartgold": "Lista de sonidos/Pokemon/12_3.mp3",
  "Skyrim": "Lista de sonidos/Skyrim/42dfb7_skyrim_level_up_sound_effect.mp3",
  "The Witcher 3: Wild Hunt": "Lista de sonidos/The Witcher/the-witcher-3-quests-completed-sound.mp3",
  "Luigi´s Mansion 3": "Lista de sonidos/Luigis/luigis-mansion-key.mp3"
};

items.forEach(item => {
  item.addEventListener('click', () => {
    // 1. Mostrar en consola
    const title = item.querySelector('h3')?.textContent;
    console.log('Item seleccionado:', title);

    // 2. Resaltar tarjeta
    items.forEach(i => i.classList.remove('selected'));
    item.classList.add('selected');

    // 3. Reproducir sonido
    const sonido = sonidos[title];
    if (sonido) {
      const audio = new Audio(sonido);
      audio.play();
    }
 // Ocultar cards y mostrar detalle
    cardsView.style.display = 'none';
    detailView.classList.add('active');

    // Ocultar todas las secciones
    document.querySelectorAll('.menu').forEach(sec => {
      sec.classList.remove('active');
    });

    // Mostrar la sección correspondiente
    const targetId = item.dataset.target;
    const section = document.getElementById(targetId);
    if (section) {
      section.classList.add('active');
    }
  });
});

// Botones volver
backBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    detailView.classList.remove('active');
    cardsView.style.display = 'block';
  });
});
