"""Place page captures and clearly labeled sample UI into service photos."""

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
IMAGES = ROOT / "public/images/services"
SCALE = 1800 / 1536


def perspective_coefficients(destination, source):
    equations = []
    values = []
    for (x, y), (u, v) in zip(destination, source):
        equations.append([x, y, 1, 0, 0, 0, -u * x, -u * y])
        values.append(u)
        equations.append([0, 0, 0, x, y, 1, -v * x, -v * y])
        values.append(v)
    return np.linalg.solve(np.array(equations), np.array(values))


def add_screen(photo, screenshot, native_corners):
    corners = [(x * SCALE, y * SCALE) for x, y in native_corners]
    width, height = screenshot.size
    source = [(4, 4), (width - 5, 4), (width - 5, height - 5), (4, height - 5)]
    coefficients = perspective_coefficients(corners, source)
    screenshot = ImageEnhance.Contrast(screenshot.convert("RGB")).enhance(0.92)
    screenshot = ImageEnhance.Brightness(screenshot).enhance(0.92)
    screenshot = screenshot.filter(ImageFilter.GaussianBlur(0.25))
    warped = screenshot.transform(
        photo.size, Image.Transform.PERSPECTIVE, coefficients,
        resample=Image.Resampling.BICUBIC,
    )
    mask = Image.new("L", photo.size, 0)
    ImageDraw.Draw(mask).polygon(corners, fill=242)
    photo.paste(warped, (0, 0), mask)


def load_base(name):
    return Image.open(IMAGES / f"{name}-base.png").convert("RGB").resize(
        (1800, 1200), Image.Resampling.LANCZOS
    )


def main():
    google = Image.open(IMAGES / "svc-performance-advertising-screen.png")
    meta = Image.open(IMAGES / "svc-performance-advertising-screen-meta.png")
    leads = Image.open(IMAGES / "svc-lead-generation-screen.png")
    portfolio = Image.open(IMAGES / "svc-website-development-screen.png")
    portfolio_mobile = Image.open(IMAGES / "svc-website-development-screen-mobile.png")
    roofing = Image.open(IMAGES / "svc-landing-pages-screen.png")
    roofing_mobile = Image.open(IMAGES / "svc-landing-pages-screen-mobile.png")

    performance = load_base("svc-performance-advertising")
    add_screen(performance, google, [(517, 207), (1060, 202), (1043, 582), (500, 549)])
    add_screen(performance, meta, [(1130, 422), (1479, 438), (1444, 695), (1095, 665)])
    performance.save(IMAGES / "svc-performance-advertising.png")

    lead_generation = load_base("svc-lead-generation")
    add_screen(lead_generation, leads, [(640, 577), (1043, 576), (1061, 816), (616, 813)])
    lead_generation.save(IMAGES / "svc-lead-generation.png")

    development = load_base("svc-website-development")
    add_screen(development, portfolio, [(493, 235), (1056, 231), (1053, 548), (492, 540)])
    add_screen(development, portfolio_mobile, [(1024, 550), (1084, 551), (1080, 685), (1021, 685)])
    development.save(IMAGES / "svc-website-development.png")

    landing = load_base("svc-landing-pages")
    add_screen(landing, roofing, [(414, 335), (1018, 336), (1030, 708), (396, 708)])
    add_screen(landing, roofing_mobile, [(1137, 455), (1288, 453), (1295, 750), (1133, 748)])
    landing.save(IMAGES / "svc-landing-pages.png")


if __name__ == "__main__":
    main()
