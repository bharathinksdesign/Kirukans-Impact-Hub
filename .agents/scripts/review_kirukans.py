from pathlib import Path
import fitz
from PIL import Image, ImageDraw

out = Path("/tmp/kirukans-review")
out.mkdir(parents=True, exist_ok=True)
doc = fitz.open("attached_assets/kirukans_1791912889672.pdf")
print(f"PAGES: {len(doc)}")
thumbs = []
for i, page in enumerate(doc):
    print(f"\n--- PAGE {i+1} ---\n{page.get_text()}")
    pix = page.get_pixmap(matrix=fitz.Matrix(0.7, 0.7))
    target = out / f"page-{i+1:02}.png"
    pix.save(target)
    im = Image.open(target).convert("RGB")
    im.thumbnail((480, 330))
    tile = Image.new("RGB", (500, 360), "white")
    tile.paste(im, ((500-im.width)//2, 25))
    ImageDraw.Draw(tile).text((10, 5), f"PAGE {i+1}", fill="black")
    thumbs.append(tile)
for start in range(0, len(thumbs), 8):
    subset = thumbs[start:start+8]
    sheet = Image.new("RGB", (1000, 360*((len(subset)+1)//2)), "#dddddd")
    for j, tile in enumerate(subset):
        sheet.paste(tile, ((j%2)*500, (j//2)*360))
    sheet.save(out/f"sheet-{start//8+1}.jpg")
