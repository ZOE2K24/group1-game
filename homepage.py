import pygame
import random
import sys

pygame.init()

SCREEN_WIDTH, SCREEN_HEIGHT = 1366, 768
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Red Deer Valley")

# The background for our homepage
background_image = pygame.image.load("startbg.png")
background_image = pygame.transform.scale(background_image, (SCREEN_WIDTH, SCREEN_HEIGHT))

WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GRAY = (200, 200, 200)
DARK_GRAY = (150, 150, 150)
BLUE = (50, 150, 255)
GREEN = (0, 255, 0)
RED = (255, 0, 0)

font_large = pygame.font.Font(None, 74)
font_small = pygame.font.Font(None, 48)
font_input = pygame.font.Font(None, 56)

input_box_width, input_box_height = 400, 60

button_width, button_height = 300, 60

button_x = (SCREEN_WIDTH - button_width) // 2
button_y = SCREEN_HEIGHT - 100

difficulty_buttons = [
    {"label": "SHORT (15 DAYS)", "x": SCREEN_WIDTH // 2, "y": SCREEN_HEIGHT // 3 + 50},
    {"label": "MEDIUM (40 DAYS)", "x": SCREEN_WIDTH // 2, "y": SCREEN_HEIGHT // 3 + 120},
    {"label": "LONG (100 DAYS)", "x": SCREEN_WIDTH // 2, "y": SCREEN_HEIGHT // 3 + 190},
    {"label": "UNLIMITED", "x": SCREEN_WIDTH // 2, "y": SCREEN_HEIGHT // 3 + 260},
]
DONE_BUTTON = {"label": "DONE", "x": (SCREEN_WIDTH - 200) // 2, "y": SCREEN_HEIGHT - 150, "width": 200, "height": 50}


def draw_centered_text(text, font, color, center_x, center_y):

    render_text = font.render(text, True, color)
    text_rect = render_text.get_rect(center=(center_x, center_y))
    screen.blit(render_text, text_rect)

def draw_homepage():

    screen.blit(background_image, (0, 0))

    title_text = font_large.render("Red Deer Valley", True, RED)
    title_rect = title_text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 3))
    screen.blit(title_text, title_rect)

    pygame.draw.rect(screen, GRAY, (button_x, button_y, button_width, button_height))
    button_text = font_small.render("Start", True, WHITE)
    button_text_rect = button_text.get_rect(center=(button_x + button_width // 2, button_y + button_height // 2))
    screen.blit(button_text, button_text_rect)

    pygame.display.flip()

def draw_difficulty_screen():

    screen.blit(background_image, (0, 0))

    draw_centered_text("NEW GAME", font_large, WHITE, SCREEN_WIDTH // 2, SCREEN_HEIGHT // 5)

    for button in difficulty_buttons:
        draw_centered_text(button["label"], font_small, WHITE, button["x"], button["y"])

    pygame.draw.rect(screen, DARK_GRAY, (DONE_BUTTON["x"], DONE_BUTTON["y"], DONE_BUTTON["width"], DONE_BUTTON["height"]))
    draw_centered_text("DONE", font_small, WHITE, DONE_BUTTON["x"] + DONE_BUTTON["width"] // 2, DONE_BUTTON["y"] + DONE_BUTTON["height"] // 2)

    pygame.display.flip()

def draw_character_screen(player_name):
    screen.blit(background_image, (0, 0))

    draw_centered_text("Enter your Character's Name", font_large, WHITE, SCREEN_WIDTH // 2, SCREEN_HEIGHT // 4)

    input_box_x = (SCREEN_WIDTH - input_box_width) // 2
    input_box_y = SCREEN_HEIGHT // 2 - input_box_height // 2
    pygame.draw.rect(screen, WHITE, (input_box_x, input_box_y, input_box_width, input_box_height), 2)

    draw_centered_text(player_name, font_input, BLACK, SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2)

    pygame.draw.rect(screen, DARK_GRAY, (DONE_BUTTON["x"], DONE_BUTTON["y"], DONE_BUTTON["width"], DONE_BUTTON["height"]))
    draw_centered_text("START GAME", font_small, WHITE, DONE_BUTTON["x"] + DONE_BUTTON["width"] // 2, DONE_BUTTON["y"] + DONE_BUTTON["height"] // 2)

    pygame.display.flip()


def homepage_loop():
    running = True
    while running:
        draw_homepage() 
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()      
                sys.exit()
            elif event.type == pygame.MOUSEBUTTONDOWN:
                mouse_x, mouse_y = event.pos
                if button_x <= mouse_x <= button_x + button_width and button_y <= mouse_y <= button_y + button_height:
                    return "difficulty"
        pygame.time.Clock().tick(60)


def difficulty_loop():
    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            elif event.type == pygame.MOUSEBUTTONDOWN:
                mouse_x, mouse_y = event.pos
                
                for button in difficulty_buttons:
                    text_width = font_small.size(button["label"])[0]
                    text_height = font_small.size(button["label"])[1]
                    if button["x"] - text_width // 2 <= mouse_x <= button["x"] + text_width // 2 and \
                       button["y"] - text_height // 2 <= mouse_y <= button["y"] + text_height // 2:
                        print(f"Selected difficulty: {button['label']}")
                
                if DONE_BUTTON["x"] <= mouse_x <= DONE_BUTTON["x"] + DONE_BUTTON["width"] and DONE_BUTTON["y"] <= mouse_y <= DONE_BUTTON["y"] + DONE_BUTTON["height"]:
                    return "character_input"

        draw_difficulty_screen()
        pygame.time.Clock().tick(60)


def character_input_loop():
    player_name = ""
    running = True
    while running:
        draw_character_screen(player_name)
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_RETURN:
                    print(f"Character Name Entered: {player_name}")
                    return "game_start"
                elif event.key == pygame.K_BACKSPACE:
                    player_name = player_name[:-1]
                else:
                    player_name += event.unicode
            elif event.type == pygame.MOUSEBUTTONDOWN:
                mouse_x, mouse_y = event.pos
                if DONE_BUTTON["x"] <= mouse_x <= DONE_BUTTON["x"] + DONE_BUTTON["width"] and DONE_BUTTON["y"] <= mouse_y <= DONE_BUTTON["y"] + DONE_BUTTON["height"]:
                    print(f"Character Name Entered: {player_name}")
                    return "game_start"
        pygame.time.Clock().tick(60)


def main():
    current_screen = "homepage"

    while True:
        if current_screen == "homepage":
            current_screen = homepage_loop()
        elif current_screen == "difficulty":
            current_screen = difficulty_loop()
        elif current_screen == "character_input":
            current_screen = character_input_loop()
        elif current_screen == "game_start":
            print("Game Started!") 
            pygame.quit()
            sys.exit()



if __name__ == "__main__":
    main()
