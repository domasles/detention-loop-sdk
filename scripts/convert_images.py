from pathlib import Path
from PIL import Image


COLOR_MAP = {
    (0, 0, 0, 255): '0',       # Black
    (100, 100, 100, 255): 'L', # Dark Gray
    (159, 159, 159, 255): '1', # Light Gray
    (255, 255, 255, 255): '2', # White
    (223, 23, 23, 255): '3',   # Red
    (106, 72, 39, 255): 'C',   # Brown
    (39, 133, 206, 255): '7',  # Light Blue
    (31, 48, 184, 255): '5',   # Dark Blue
    (206, 205, 23, 255): '6',  # Yellow
    (168, 157, 23, 255): 'F',  # Gold
    (65, 176, 48, 255): '4',   # Light Green
    (42, 125, 24, 255): 'D',   # Dark Green
    (239, 115, 187, 255): '8', # Pink
    (178, 28, 173, 255): 'H',  # Magenta
    (221, 131, 17, 255): '9',  # Orange
    (0, 0, 0, 0): '.',         # Transparent
}


def convert_to_raw_pixel_map(image_path):
    img = Image.open(image_path).convert("RGBA")
    width, height = img.size

    file_stem = Path(image_path).stem
    script_dir = Path(__file__).resolve().parent
    output_dir = (script_dir / "../character-maps").resolve()
    output_filename = (output_dir / f"{file_stem}.txt").resolve()

    output_dir.mkdir(parents=True, exist_ok=True)

    with open(output_filename, "w", encoding="utf-8") as f:
        f.write(f"const {file_stem.upper()} = [\n")

        for y in range(height):
            row_str = "".join(COLOR_MAP.get(img.getpixel((x, y)), "0") for x in range(width))
            comma = "" if y == height - 1 else ","

            f.write(f'  "{row_str}"{comma}\n')
        f.write("]")


script_dir = Path(__file__).resolve().parent
png_folder = (script_dir / "../assets/png").resolve()

for image_path in png_folder.glob("*.png"):
    convert_to_raw_pixel_map(str(image_path))
