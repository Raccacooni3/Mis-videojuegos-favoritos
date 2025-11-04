import kaplay from "kaplay";

// 1. Inicializa Kaplay y saca su API
const {
  add,
  rect,
  pos,
  color,
  area,
  body,
  onKeyDown,
  onKeyPress,
  get,
  z,
} = kaplay({
  width:      400,
  height:     300,
  background: [0, 0, 0],
  gravity:    600,   // para que funcione isGrounded() y jump()
});

// 2. Colores
const colors = {
  sky:    [135, 206, 235],
  cloud:  [255, 255, 255],
  ground: [139,  69,  19],
  player: [0,   255,   0],
};

// 3. Cielo (solo color de fondo, opcional)
// Si quieres un rectángulo, usa add([...]) aquí.

// 4. Nube
add([
  rect(200, 40),
  pos(50, 30),
  color(colors.cloud),
  z(-1),
]);

// 5. Suelo (colisionable)
add([
  rect(400, 40),
  pos(0, 260),
  area(),                // habilita colisiones
  body({ isStatic: true }), // bloquea cuerpos dinámicos
  color(colors.ground),
  z(0),
]);

// 6. Jugador (con etiqueta "player")
const player = add([
  rect(32, 32),
  pos(184, 228),
  area(),               // colisiona con el suelo
  body(),               // dinámico: sujeta gravedad y salto
  color(colors.player),
  "player",             // etiqueta para get("player")
  z(1),
]);

// 7. Controles de movimiento
onKeyDown("left",  () => player.move(-200, 0));
onKeyDown("right", () => player.move( 200, 0));

// 8. Salto con espacio
onKeyPress("space", () => {
  if (player.isGrounded()) {
    player.jump(400);
  }
});