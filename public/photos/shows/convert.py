import os
from PIL import Image
import pillow_avif  # noqa: F401 - ensures AVIF plugin is loaded

# Set the root directory of your image folders
root_dir = "/Users/charlieward/Documents/Coding Things/Visual Studio Code/cw-lighting/public/photos"

# Valid input formats
valid_extensions = ('.jpg', '.jpeg', '.png')

def convert_to_avif(image_path):
    base, ext = os.path.splitext(image_path)
    if ext.lower() not in valid_extensions:
        return

    output_path = base + '.avif'

    try:
        with Image.open(image_path) as img:
            img.save(output_path, format='AVIF', quality=50)  # adjust quality if needed
            print(f"Converted: {image_path} -> {output_path}")
    except Exception as e:
        print(f"Failed to convert {image_path}: {e}")

# Walk through all directories and convert images
for folder, subfolders, files in os.walk(root_dir):
    for file in files:
        if file.lower().endswith(valid_extensions):
            full_path = os.path.join(folder, file)
            convert_to_avif(full_path)
