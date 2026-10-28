"""Generate browser metadata icons from the owner's original logo."""
from pathlib import Path
from PIL import Image, ImageOps

root = Path(__file__).resolve().parent.parent
logo = ImageOps.exif_transpose(Image.open(root / 'asset' / 'Logo.png')).convert('RGBA')
public = root / 'public'
for name, size in [('favicon-logo.png', 96), ('apple-touch-icon.png', 180), ('site-logo.png', 512)]:
    icon = ImageOps.contain(logo, (size, size), Image.Resampling.LANCZOS)
    canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    canvas.alpha_composite(icon, ((size - icon.width) // 2, (size - icon.height) // 2))
    canvas.save(public / name, optimize=True)
logo.resize((256, 256), Image.Resampling.LANCZOS).save(public / 'favicon.ico', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
print('Generated favicon, Apple touch icon, and social logo.')
