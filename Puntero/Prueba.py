import pygame,sys
pygame.init()

size = (800, 500)
# SCREEN
screen= pygame.display.set_mode(size)

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()