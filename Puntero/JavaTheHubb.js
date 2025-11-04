function updateClock() {
  const now     = new Date();
  let h24       = now.getHours();
  let amPm      = h24 < 12 ? 'AM' : 'PM';
  let h12       = h24 % 12 || 12;
  const minute  = String(now.getMinutes()).padStart(2, '0');
  const second  = String(now.getSeconds()).padStart(2, '0');
  const local   = `${h12}:${minute}:${second} ${amPm}`;

  document.getElementById('localClock').textContent    = local;

  // Formatear hora de Bogotá
  const bogota = now.toLocaleTimeString('en-US', {
    timeZone: 'America/Bogota',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  document.getElementById('timezoneClock').textContent = bogota;
}

// Función de saludo
function updateGreeting() {
  const hour = new Date().getHours();
  let greeting;

  if (hour < 12) {
    greeting = 'good morning, User!';
  } else if (hour < 18) {
    greeting = 'good afternoon, User!';
  } else {
    greeting = 'good evening, User!';
  }

  document.getElementById('AMGreeting').textContent = greeting;
}

//fecha actual
function updateDate() {
  const now = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = now.toLocaleDateString('en-US', options);
  document.getElementById('currentDate').textContent = formattedDate;
}

// Arrancar todo al cargar
updateClock();
updateGreeting();
updateDate();

// Programar actualizaciones
setInterval(updateClock, 1000);       // reloj cada segundo
setInterval(updateGreeting, 60000);   // saludo cada minuto