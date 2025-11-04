import pygame
import sys

# Inicializar pygame
pygame.init()

# Dimensiones de la ventana
ANCHO, ALTO = 800, 600
pantalla = pygame.display.set_mode((ANCHO, ALTO))
pygame.display.set_caption("Pong Retro")

# Colores
BLANCO = (255, 255, 255)
NEGRO = (0, 0, 0)

# Paletas
ANCHO_PAL = 10
ALTO_PAL = 100
vel_pal = 7

paleta_izq = pygame.Rect(50, ALTO//2 - ALTO_PAL//2, ANCHO_PAL, ALTO_PAL)
paleta_der = pygame.Rect(ANCHO - 60, ALTO//2 - ALTO_PAL//2, ANCHO_PAL, ALTO_PAL)

# Pelota
radio = 10
pelota = pygame.Rect(ANCHO//2 - radio, ALTO//2 - radio, radio*2, radio*2)
vel_x, vel_y = 5, 5

# Reloj
reloj = pygame.time.Clock()

# Bucle principal
while True:
    for evento in pygame.event.get():
        if evento.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

    # Movimiento de paletas
    teclas = pygame.key.get_pressed()
    if teclas[pygame.K_w] and paleta_izq.top > 0:
        paleta_izq.y -= vel_pal
    if teclas[pygame.K_s] and paleta_izq.bottom < ALTO:
        paleta_izq.y += vel_pal
    if teclas[pygame.K_UP] and paleta_der.top > 0:
        paleta_der.y -= vel_pal
    if teclas[pygame.K_DOWN] and paleta_der.bottom < ALTO:
        paleta_der.y += vel_pal

    # Movimiento de pelota
    pelota.x += vel_x
    pelota.y += vel_y

    # Colisiones con bordes
    if pelota.top <= 0 or pelota.bottom >= ALTO:
        vel_y *= -1

    # Colisiones con paletas
    if pelota.colliderect(paleta_izq) or pelota.colliderect(paleta_der):
        vel_x *= -1

    # Reinicio si sale
    if pelota.left <= 0 or pelota.right >= ANCHO:
        pelota.center = (ANCHO//2, ALTO//2)
        vel_x *= -1

    # Dibujar
    pantalla.fill(NEGRO)
    pygame.draw.rect(pantalla, BLANCO, paleta_izq)
    pygame.draw.rect(pantalla, BLANCO, paleta_der)
    pygame.draw.ellipse(pantalla, BLANCO, pelota)
    pygame.draw.aaline(pantalla, BLANCO, (ANCHO//2, 0), (ANCHO//2, ALTO))

    pygame.display.flip()
    reloj.tick(60)