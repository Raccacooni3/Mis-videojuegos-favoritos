const items = document.querySelectorAll('.card');

const sonidos = {
  "Super Mario Odyssey": "D:/Feli/Developer/Lista de sonidos/Sonidos Mario/super-mario-coin-sound.mp3",
  "Pokemon Heartgold": "D:/Feli/Developer/Lista de sonidos/Pokemon/12_3.mp3",
  "Skyrim": "D:/Feli/Developer/Lista de sonidos/Skyrim/42dfb7_skyrim_level_up_sound_effect.mp3",
  "The Witcher 3: Wild Hunt": "D:/Feli/Developer/Lista de sonidos/The Witcher/the-witcher-3-quests-completed-sound.mp3",
  "Luigi´s Mansion 3": "D:/Feli/Developer/Lista de sonidos/Luigis/luigis-mansion-key.mp3"
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

    // 4. Scroll hacia seccion oculta
    const targetId = item.dataset.target;
    const section = document.getElementById(targetId);
    
    // ocultar todas las secciones primero
    // Ocultar todas las secciones
    document.querySelectorAll('.section').forEach(sec => {
      sec.classList.add('hidden');
  });
    // mostrar la sección objetivo
    if (section) {
      section.classList.remove('hidden'); 
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
