from pathlib import Path
from PIL import Image


COLOR_MAP = {
    (0, 0, 0, 255): '0',        # Black
    (74, 80, 87, 255): 'L',     # Dark Gray
    (145, 151, 156, 255): '1',  # Light Gray
    (248, 249, 250, 255): '2',  # White
    (230, 49, 73, 255): '3',    # Red
    (136, 66, 47, 255): 'C',    # Brown
    (62, 174, 247, 255): '7',   # Light Blue
    (50, 0, 223, 255): '5',     # Dark Blue
    (250, 232, 31, 255): '6',   # Yellow
    (147, 141, 52, 255): 'F',   # Gold
    (53, 226, 64, 255): '4',    # Light Green
    (33, 149, 19, 255): 'D',    # Dark Green
    (242, 109, 187, 255): '8',  # Pink
    (170, 52, 196, 255): 'H',   # Purple
    (240, 116, 31, 255): '9',   # Orange
    (0, 0, 0, 0): '.',          # Transparent
}


def convert_to_character_map(image_path):
    img = Image.open(image_path).convert("RGBA")
    width, height = img.size

    if width > 160 or height > 128:
        raise ValueError(f"Warning: Image {image_path} exceeds 160x160 pixels. It may not display correctly.")

    file_stem = Path(image_path).stem
    script_dir = Path(__file__).resolve().parent
    output_dir = (script_dir / "../character-maps").resolve()
    output_filename = (output_dir / f"{file_stem}.txt").resolve()

    output_dir.mkdir(parents=True, exist_ok=True)

    with open(output_filename, "w", encoding="utf-8") as f:
        f.write(f"const {file_stem.upper()} = [\n")

        for y in range(height):
            row_str = "".join(COLOR_MAP.get(img.getpixel((x, y)), ".") for x in range(width))
            comma = "" if y == height - 1 else ","

            f.write(f'  "{row_str}"{comma}\n')
        f.write("]")


script_dir = Path(__file__).resolve().parent
png_folder = (script_dir / "../assets/png").resolve()

for image_path in png_folder.glob("*.png"):
    convert_to_character_map(str(image_path))
