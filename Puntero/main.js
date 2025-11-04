import kaplay from "kaplay";

kaplay({
  background: [0, 0, 0], // Fondo negro
  width: 800,
  height: 600,
});

// Añadir un personaje simple
const player = add([
  rect(32, 32),
  pos(100, 500),
  color(0, 255, 0),
  area(),
  body()
]);

// Controles
onKeyDown("left", () => {
  player.move(-200, 0);
});

onKeyDown("right", () => {
  player.move(200, 0);
});

onKeyPress("space", () => {
  if (player.isGrounded()) {
    player.jump(500);
  }
});

// Piso
add([
  rect(800, 48),
  pos(0, 580),
  area(),
  solid(),
  color(255, 255, 255)
]);