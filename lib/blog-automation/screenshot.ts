// Captures a real screenshot of a public marketing page as a featured image,
// for posts where useRealProductScreenshot is true and the screenshotGuidance
// matches a known public screen. This only covers pages that need no login -
// real screens behind auth (kanban board, lead scoring, agent builder) still
// need a manually-captured image added to Sanity's asset library, since
// storing product login credentials in this pipeline isn't something to do
// without an explicit decision to do so.
type ScreenshotTarget = {
  // Matched case-insensitively against screenshotGuidance + focusKeyword.
  matchKeywords: string[];
  url: string;
  // Pixels to scroll down after load, to frame the right part of the page.
  scrollY?: number;
  altFallback: string;
};

const SCREENSHOT_TARGETS: ScreenshotTarget[] = [
  {
    matchKeywords: ["pricing", "plan", "starter", "growth tier", "enterprise tier", "cost"],
    url: "https://www.arthaleads.com/pricing",
    scrollY: 420,
    altFallback: "ArthaLeads pricing plans: Starter, Growth, and Enterprise tiers with feature comparison",
  },
];

export function findScreenshotTarget(screenshotGuidance: string, focusKeyword: string): ScreenshotTarget | null {
  const haystack = `${screenshotGuidance} ${focusKeyword}`.toLowerCase();
  return SCREENSHOT_TARGETS.find((t) => t.matchKeywords.some((k) => haystack.includes(k))) ?? null;
}

async function getExecutablePath(): Promise<string> {
  // Local macOS dev: use the real installed Chrome. Production (Vercel) and
  // any Linux environment: use the serverless-optimized Chromium binary,
  // since a real Chrome install won't exist there.
  if (process.platform === "darwin") {
    const fs = await import("fs");
    const macChrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
    if (fs.existsSync(macChrome)) return macChrome;
  }
  const chromium = (await import("@sparticuz/chromium")).default;
  return chromium.executablePath();
}

export async function captureRealScreenshot(target: ScreenshotTarget): Promise<{ buffer: Buffer; contentType: string } | null> {
  let browser;
  try {
    const puppeteer = await import("puppeteer-core");
    const chromium = (await import("@sparticuz/chromium")).default;
    const executablePath = await getExecutablePath();

    browser = await puppeteer.launch({
      executablePath,
      args: process.platform === "darwin" ? [] : chromium.args,
      headless: true,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1792, height: 1024, deviceScaleFactor: 1 });
    await page.goto(target.url, { waitUntil: "networkidle0", timeout: 30000 });
    await new Promise((r) => setTimeout(r, 1000));

    // Accept any cookie banner and hide any "install app" prompt - both are
    // transient UI chrome, not part of the real product screen being shown.
    await page.evaluate(() => {
      const clickByText = (text: string) => {
        const el = [...document.querySelectorAll("button, a")].find((e) => e.textContent?.trim() === text);
        (el as HTMLElement | undefined)?.click();
      };
      clickByText("Accept All");
      const marker = [...document.querySelectorAll("*")].find(
        (e) => e.textContent?.trim().toLowerCase().includes("install") && e.children.length === 0,
      );
      const banner = marker?.closest("div[class]")?.parentElement as HTMLElement | undefined;
      if (banner) banner.style.display = "none";
    });
    await new Promise((r) => setTimeout(r, 500));

    if (target.scrollY) {
      await page.evaluate((y) => window.scrollBy(0, y), target.scrollY);
      await new Promise((r) => setTimeout(r, 500));
    }

    const screenshot = await page.screenshot({ type: "png" });
    return { buffer: Buffer.from(screenshot), contentType: "image/png" };
  } catch (error) {
    console.error("Real screenshot capture failed", error);
    return null;
  } finally {
    await browser?.close();
  }
}
