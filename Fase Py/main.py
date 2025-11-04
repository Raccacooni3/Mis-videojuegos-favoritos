import pygame

# --- Inicialización ---
pygame.init()
screen = pygame.display.set_mode((800, 600))
clock = pygame.time.Clock()

# --- Constantes ---
GRAVITY = 1000      # px/s²
JUMP_V = -500       # impulso inicial
FLOOR_Y = 500
COYOTE_TIME = 0.1   # segundos

# --- Jugador ---
player = pygame.Rect(100, FLOOR_Y - 50, 50, 50)
vel_y = 0
grounded = False
coyote_timer = 0

# Contador de monedas
coin_count = 0
font = pygame.font.Font(None, 36)

# --- Plataformas ---
platforms = [
    pygame.Rect(230, 408, 200, 20),
    pygame.Rect(489, 333, 100, 20),
    pygame.Rect(629, 271, 150, 20)
]

# --- Monedas ---
coins = [
    pygame.Rect(250, 370, 20, 20),
    pygame.Rect(490, 300, 20, 20),
    pygame.Rect(640, 240, 20, 20)
]

running = True
while running:
    dt = clock.tick(60) / 1000

    # --- Eventos ---
    for e in pygame.event.get():
        if e.type == pygame.QUIT:
            running = False
        elif e.type == pygame.KEYDOWN:
            if e.key == pygame.K_SPACE and coyote_timer > 0:
                vel_y = JUMP_V
                grounded = False
                coyote_timer = 0

    # --- Movimiento horizontal ---
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:
        player.x -= 200 * dt
    if keys[pygame.K_RIGHT]:
        player.x += 200 * dt

    # --- Física vertical ---
    vel_y += GRAVITY * dt
    player.y += vel_y * dt

    # --- Colisiones ---
    grounded = False

    # Suelo
    if player.bottom >= FLOOR_Y:
        player.bottom = FLOOR_Y
        vel_y = 0
        grounded = True

    # Plataformas
    for plat in platforms:
        if player.colliderect(plat):
            if vel_y > 0 and player.bottom - vel_y * dt <= plat.top:
                player.bottom = plat.top
                vel_y = 0
                grounded = True

    # --- Coyote time ---
    if grounded:
        coyote_timer = COYOTE_TIME
    else:
        coyote_timer -= dt
        if coyote_timer < 0:
            coyote_timer = 0

    # --- Monedas: recogida ---
    for coin in coins[:]:  # [:] crea copia para poder quitar elementos
        if player.colliderect(coin):
            coin_count += 1
            coins.remove(coin)

    # --- Dibujado ---
    screen.fill((135, 206, 235))  # Cielo

    # Suelo
    pygame.draw.rect(screen, (139, 69, 19), (0, FLOOR_Y, 800, 100))

    # Plataformas
    for plat in platforms:
        pygame.draw.rect(screen, (160, 82, 45), plat)

    # Monedas
    for coin in coins:
        pygame.draw.rect(screen, (255, 215, 0), coin)

    # Jugador
    pygame.draw.rect(screen, (0, 255, 0), player)

    # Marcador
    score_text = font.render(f"Monedas: {coin_count}", True, (0, 0, 0))
    screen.blit(score_text, (10, 10))

    pygame.display.flip()

pygame.quit()