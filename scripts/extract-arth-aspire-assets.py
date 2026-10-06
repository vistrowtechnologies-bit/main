"""Extract client-owned images embedded in Arth Aspire's public homepage."""

import base64
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.request import urlopen


SOURCE = "https://arthaspireinstitute.netlify.app/"
OUTPUT = Path(__file__).resolve().parents[1] / "public" / "demo" / "arth-aspire"
WANTED = {
    "Arth Aspire Institute logo": "logo.jpg",
    "Krishna Ranjana More": "krishna-more.jpg",
    "International Herald Magazine cover, October 2026": "herald-cover.jpg",
}
SCRIPT_IMAGES = {
    "l1": "brain-booster-1.jpg",
    "l2": "brain-booster-2.jpg",
    "l3": "brain-booster-3.jpg",
    "l4": "brain-booster-4.jpg",
    "maths": "maths-mastery.jpg",
}


class ImageExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.saved = set()

    def handle_starttag(self, tag, attrs):
        if tag != "img":
            return
        attributes = dict(attrs)
        name = WANTED.get(attributes.get("alt"))
        src = attributes.get("src", "")
        if not name or name in self.saved or not src.startswith("data:image/jpeg;base64,"):
            return
        OUTPUT.mkdir(parents=True, exist_ok=True)
        (OUTPUT / name).write_bytes(base64.b64decode(src.split(",", 1)[1]))
        self.saved.add(name)


with urlopen(SOURCE, timeout=20) as response:
    html = response.read().decode("utf-8")
extractor = ImageExtractor()
extractor.feed(html)
for key, encoded in re.findall(r'(\w+):"data:image/jpeg;base64,([^"]+)"', html):
    name = SCRIPT_IMAGES.get(key)
    if name:
        (OUTPUT / name).write_bytes(base64.b64decode(encoded))
        extractor.saved.add(name)
missing = set(WANTED.values()) | set(SCRIPT_IMAGES.values())
missing -= extractor.saved
if missing:
    raise SystemExit(f"Missing images on source site: {', '.join(sorted(missing))}")
print(f"Extracted {len(extractor.saved)} original images to {OUTPUT}")
