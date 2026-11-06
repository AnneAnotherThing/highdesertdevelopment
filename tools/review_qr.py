"""Build the Google review QR codes for High Desert Development.

Run from the repo root:  python tools/review_qr.py

This file lives outside site/ on purpose. `wrangler deploy` uploads the site/
folder from disk rather than from git, so a generator kept in there would be
published along with the website.

The codes encode https://highdesertdevelopment.com/review, never the Google
link itself. /review is a 302 defined in site/_redirects, so if Google ever
changes the review address, that one line changes and every code already
printed on a card, a sign or an invoice still works.

Design: ink modules on white, bronze finder squares, the company badge in the
middle, and a 4 module quiet zone, which is the scanner standard.

Nothing here is trusted on looks. The badge eats modules and bronze is a
lighter ink than a red or a black, so every file produced is decoded again
with OpenCV before the script will keep it. If the preferred design does not
read, the script steps down a ladder, badge and bronze first, and says which
rung it settled on rather than quietly shipping a code that half-scans.
"""

import base64
import io
import os
import subprocess
import sys
import tempfile

import qrcode
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "site", "images", "qr")
LOGO_PATH = os.path.join(ROOT, "site", "images", "high-desert-development-logo.png")
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

REVIEW_URL = "https://highdesertdevelopment.com/review"

INK = "#0d2133"      # --ink
BRONZE = "#9b6025"   # --bronze
PAPER = "#ffffff"

QUIET = 4            # modules of white border
LOGO_MODULES = 9     # badge width in modules; error correction H recovers 30%

BASENAME = "high-desert-review-qr"


# --------------------------------------------------------------------------
# geometry


def matrix(url):
    qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H, border=0)
    qr.add_data(url)
    qr.make(fit=True)
    return qr.get_matrix()


def layout(url, with_logo):
    """Return the module grid split into the parts that get drawn differently."""
    m = matrix(url)
    n = len(m)
    finders = [(0, 0), (0, n - 7), (n - 7, 0)]

    def in_finder(r, c):
        return any(fr <= r < fr + 7 and fc <= c < fc + 7 for fr, fc in finders)

    if with_logo:
        lo = (n - LOGO_MODULES) // 2
        hi = lo + LOGO_MODULES

        def in_logo(r, c):
            return lo - 1 <= r <= hi and lo - 1 <= c <= hi
    else:
        lo = None

        def in_logo(r, c):
            return False

    dots = [
        (r, c)
        for r in range(n)
        for c in range(n)
        if m[r][c] and not in_finder(r, c) and not in_logo(r, c)
    ]
    return n, lo, finders, dots


def badge_image(px):
    """The badge, fitted into a square of px on a white plate.

    The logo is 800 x 709, so it is letterboxed rather than squashed. The white
    plate is what the knock-out in the module grid is for: it gives the mark
    clean air instead of leaving it to fight the code behind it.
    """
    im = Image.open(LOGO_PATH).convert("RGBA")
    w, h = im.size
    scale = min(px / w, px / h)
    im = im.resize((max(1, int(w * scale)), max(1, int(h * scale))), Image.LANCZOS)
    plate = Image.new("RGBA", (px, px), (255, 255, 255, 255))
    plate.paste(im, ((px - im.width) // 2, (px - im.height) // 2), im)
    return plate.convert("RGB")


# --------------------------------------------------------------------------
# drawing


def build_svg(url, with_logo, bronze_finders):
    n, lo, finders, dots = layout(url, with_logo)
    side = n + QUIET * 2
    finder_ink = BRONZE if bronze_finders else INK

    parts = [
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {0} {0}" '
        'width="{0}" height="{0}" shape-rendering="crispEdges" '
        'role="img" aria-label="QR code that opens High Desert Development\'s '
        'Google review page">'.format(side),
        '<rect width="{0}" height="{0}" fill="{1}"/>'.format(side, PAPER),
    ]

    # plain modules, one path so the file stays small
    d = []
    for r, c in dots:
        d.append("M{} {}h1v1h-1z".format(c + QUIET, r + QUIET))
    parts.append('<path fill="{}" d="{}"/>'.format(INK, "".join(d)))

    # finders drawn by hand: 7x7 ring with a 3x3 core
    for fr, fc in finders:
        x, y = fc + QUIET, fr + QUIET
        parts.append(
            '<path fill="{}" d="M{} {}h7v7h-7z M{} {}h5v5h-5z"/>'.format(
                finder_ink, x, y, x + 1, y + 1
            )
        )
        parts.append(
            '<rect x="{}" y="{}" width="5" height="5" fill="{}"/>'.format(
                x + 1, y + 1, PAPER
            )
        )
        parts.append(
            '<rect x="{}" y="{}" width="3" height="3" fill="{}"/>'.format(
                x + 2, y + 2, finder_ink
            )
        )

    if with_logo:
        px = 240
        buf = io.BytesIO()
        badge_image(px).save(buf, "PNG", optimize=True)
        uri = "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode("ascii")
        parts.append(
            '<image x="{}" y="{}" width="{}" height="{}" href="{}"/>'.format(
                lo + QUIET, lo + QUIET, LOGO_MODULES, LOGO_MODULES, uri
            )
        )

    parts.append("</svg>")
    return "".join(parts)


def build_png(url, size, with_logo, bronze_finders):
    n, lo, finders, dots = layout(url, with_logo)
    side = n + QUIET * 2
    scale = max(1, size // side)
    px = side * scale

    ink = tuple(int(INK[i:i + 2], 16) for i in (1, 3, 5))
    bronze = tuple(int(BRONZE[i:i + 2], 16) for i in (1, 3, 5))
    finder_ink = bronze if bronze_finders else ink

    im = Image.new("RGB", (px, px), (255, 255, 255))
    pix = im.load()

    def block(r, c, colour):
        x0, y0 = (c + QUIET) * scale, (r + QUIET) * scale
        for y in range(y0, y0 + scale):
            for x in range(x0, x0 + scale):
                pix[x, y] = colour

    for r, c in dots:
        block(r, c, ink)

    for fr, fc in finders:
        for r in range(fr, fr + 7):
            for c in range(fc, fc + 7):
                edge = r in (fr, fr + 6) or c in (fc, fc + 6)
                core = fr + 2 <= r <= fr + 4 and fc + 2 <= c <= fc + 4
                if edge or core:
                    block(r, c, finder_ink)

    if with_logo:
        lpx = LOGO_MODULES * scale
        badge = badge_image(lpx)
        im.paste(badge, ((lo + QUIET) * scale, (lo + QUIET) * scale))

    if px != size:
        im = im.resize((size, size), Image.LANCZOS)
    return im


# --------------------------------------------------------------------------
# verification


def decode_png_bytes(data):
    import numpy as np
    import cv2

    arr = np.frombuffer(data, dtype=np.uint8)
    img = cv2.imdecode(arr, cv2.IMREAD_COLOR)
    if img is None:
        return None
    text, _, _ = cv2.QRCodeDetector().detectAndDecode(img)
    if text:
        return text
    # a second look at double size helps a dense code with a logo in it
    big = cv2.resize(img, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)
    text, _, _ = cv2.QRCodeDetector().detectAndDecode(big)
    return text or None


def decode_svg(svg_text):
    """Render the SVG with headless Chrome, then decode the screenshot.

    The SVG sizes itself in modules, so opening it directly gives Chrome a
    picture about 45 pixels square and the decode fails on resolution rather
    than on anything wrong with the code. It goes in an HTML wrapper that
    blows it up to 900px first, which is the size a printed code is read at.
    """
    if not os.path.exists(CHROME):
        return "SKIPPED: chrome not found"
    with tempfile.TemporaryDirectory() as tmp:
        svg_path = os.path.join(tmp, "code.html")
        png_path = os.path.join(tmp, "shot.png")
        wrapper = (
            "<!doctype html><meta charset='utf-8'>"
            "<style>html,body{margin:0;background:#fff}"
            "svg{width:900px;height:900px;display:block}</style>" + svg_text
        )
        with open(svg_path, "w", encoding="utf-8") as fh:
            fh.write(wrapper)
        subprocess.run(
            [CHROME, "--headless", "--disable-gpu", "--force-device-scale-factor=1",
             "--window-size=900,900", "--screenshot=" + png_path,
             "--default-background-color=FFFFFFFF", svg_path],
            capture_output=True, timeout=90,
        )
        if not os.path.exists(png_path):
            return None
        with open(png_path, "rb") as fh:
            return decode_png_bytes(fh.read())


def png_bytes(im):
    buf = io.BytesIO()
    im.save(buf, "PNG", optimize=True)
    return buf.getvalue()


# --------------------------------------------------------------------------
# the ladder


def attempt(url, with_logo, bronze_finders):
    """Build all three files for one design and decode every one of them."""
    svg_text = build_svg(url, with_logo, bronze_finders)
    big = png_bytes(build_png(url, 1200, with_logo, bronze_finders))
    small = png_bytes(build_png(url, 600, with_logo, bronze_finders))

    results = {
        "png1200": decode_png_bytes(big),
        "png600": decode_png_bytes(small),
        "svg": decode_svg(svg_text),
    }
    ok = all(v == url or (isinstance(v, str) and v.startswith("SKIPPED"))
             for v in results.values())
    return ok, results, svg_text, big, small


def main():
    rungs = [
        ("badge in the middle, bronze finders", True, True),
        ("badge in the middle, all ink", True, False),
        ("no badge, bronze finders", False, True),
        ("no badge, all ink", False, False),
    ]

    os.makedirs(OUT, exist_ok=True)
    print("encoding:", REVIEW_URL)
    print()

    for label, with_logo, bronze in rungs:
        ok, results, svg_text, big, small = attempt(REVIEW_URL, with_logo, bronze)
        print("  {:38s} {}".format(label, "PASS" if ok else "fail"))
        for k, v in results.items():
            print("      {:8s} {}".format(k, v if v else "DID NOT DECODE"))
        if ok:
            with open(os.path.join(OUT, BASENAME + ".svg"), "w", encoding="utf-8") as fh:
                fh.write(svg_text)
            with open(os.path.join(OUT, BASENAME + ".png"), "wb") as fh:
                fh.write(big)
            with open(os.path.join(OUT, BASENAME + "-600.png"), "wb") as fh:
                fh.write(small)
            print()
            print("wrote three files to site/images/qr/ using:", label)
            for name in (BASENAME + ".svg", BASENAME + ".png", BASENAME + "-600.png"):
                p = os.path.join(OUT, name)
                print("   {:34s} {:>8,} bytes".format(name, os.path.getsize(p)))
            return 0
        print()

    print("No design decoded cleanly. Nothing written.", file=sys.stderr)
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
