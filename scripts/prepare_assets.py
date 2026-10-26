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
