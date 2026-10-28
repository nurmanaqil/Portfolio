"""Create optimized local derivatives, preserving all owner-supplied originals."""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "public" / "assets"
OUTPUT.mkdir(parents=True, exist_ok=True)

portrait = ImageOps.exif_transpose(Image.open(ROOT / "asset" / "IMG_3856.jpg")).convert("RGB")
# Center crop keeps the owner's face and upper body in the portrait composition.
portrait = ImageOps.fit(portrait, (960, 1200), method=Image.Resampling.LANCZOS, centering=(0.5, 0.4))
portrait.save(OUTPUT / "aqil-portrait.webp", quality=85, method=6)
for index, source in enumerate(sorted((ROOT / "asset").glob("Screenshot*.png")), start=1):
    image = ImageOps.exif_transpose(Image.open(source)).convert("RGB")
    image.thumbnail((1440, 900), Image.Resampling.LANCZOS)
    image.save(OUTPUT / f"session-{index:02}.webp", quality=79, method=6)
print(f"Prepared portrait and {index} session images in {OUTPUT}")
additional = ['FullSizeRender.jpeg', 'IMG_0243.jpg', 'IMG_1868.jpeg', 'IMG_6413.jpg', 'IMG_9294.jpeg']
for index, name in enumerate(additional, start=11):
    image = ImageOps.exif_transpose(Image.open(ROOT / 'asset' / name)).convert('RGB')
    image.thumbnail((1440, 1440), Image.Resampling.LANCZOS)
    image.save(OUTPUT / f'session-{index:02}.webp', quality=82, method=6)
print(f'Prepared {len(additional)} additional archive photos (duplicates excluded).')

# Trim empty transparent margins and preserve the owner's existing cutout.
background = ImageOps.exif_transpose(Image.open(ROOT / 'asset' / 'Background Picture.png')).convert('RGBA')
background = background.crop(background.getchannel('A').getbbox())
background.thumbnail((1100, 1400), Image.Resampling.LANCZOS)
background.save(OUTPUT / 'background-portrait.webp', quality=88, method=6)
print(f'Prepared transparent background portrait: {background.size}')
