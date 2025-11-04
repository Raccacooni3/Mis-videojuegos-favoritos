import pygame

pygame.init()
screen = pygame.display.set_mode((800, 600))
clock = pygame.time.Clock()

# --- Configuración jugador ---
player = pygame.Rect(100, 450, 50, 50)
vel_y = 0
GRAVITY = 1000
JUMP_V = -500

# --- Lista inicial de plataformas ---
platforms = [
    pygame.Rect(230, 408, 200, 20),
    pygame.Rect(489, 333, 100, 20),
    pygame.Rect(629, 271, 150, 20)
]
#selected_index = 0  # Plataforma seleccionada para mover

running = True
while running:
    dt = clock.tick(60) / 1000

    # --- Eventos ---
    for e in pygame.event.get():
        if e.type == pygame.QUIT:
            running = False

        elif e.type == pygame.KEYDOWN:
            # Saltar
            if e.key == pygame.K_SPACE:
                vel_y = JUMP_V

            # ---------------Selección de plataforma-----------------
            if e.key == pygame.K_1:
                selected_index = 0
            elif e.key == pygame.K_2 and len(platforms) >= 2:
                selected_index = 1
            elif e.key == pygame.K_3 and len(platforms) >= 3:
                selected_index = 2

            # Imprimir coordenadas actuales
            if e.key == pygame.K_RETURN:
                print("\nCoordenadas actuales de las plataformas:")
                for p in platforms:
                    print(f"pygame.Rect({int(p.x)}, {int(p.y)}, {p.width}, {p.height})")

    # --- Movimiento de plataforma seleccionada ---
    keys = pygame.key.get_pressed()
    plat = platforms[selected_index]

    if keys[pygame.K_UP]:
        plat.y -= 200 * dt
    if keys[pygame.K_DOWN]:
        plat.y += 200 * dt
    if keys[pygame.K_LEFT]:
        plat.x -= 200 * dt
    if keys[pygame.K_RIGHT]:
        plat.x += 200 * dt

    # --- Física del jugador ---
    vel_y += GRAVITY * dt
    player.y += vel_y * dt

    # --- Colisiones con plataformas ---
    grounded = False
    for p in platforms:
        if player.colliderect(p):
            # Colisión desde arriba
            if vel_y > 0 and player.bottom - vel_y * dt <= p.top:
                player.bottom = p.top
                vel_y = 0
                grounded = True

    # --- Suelo ---
    if player.bottom >= 500:
        player.bottom = 500
        vel_y = 0
        grounded = True

    # --- Dibujado ---
    screen.fill((135, 206, 235))  # Cielo

    # Dibujar suelo
    pygame.draw.rect(screen, (139, 69, 19), (0, 500, 800, 100))

    # Dibujar todas las plataformas
    for idx, p in enumerate(platforms):
        color = (255, 0, 0) if idx == selected_index else (160, 82, 45)
        pygame.draw.rect(screen, color, p)

    # Dibujar jugador
    pygame.draw.rect(screen, (0, 255, 0), player)

    pygame.display.flip()

pygame.quit()