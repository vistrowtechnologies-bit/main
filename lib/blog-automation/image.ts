// Generates a featured image via OpenAI's Images API from the prompt the
// text-generation step already wrote. Returns null on any failure so the
// caller can fall back to leaving the image slot empty rather than failing
// the whole post - a missing image is recoverable (someone adds it later),
// a failed post is not.
export async function generateBlogImage(prompt: string): Promise<{ buffer: Buffer; contentType: string } | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || !prompt) return null;

  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt,
        // 1536x1024 (1.5:1) is gpt-image-1's widest option - closest available
        // match to the 16:9 (1.78:1) framing the prompt already specifies.
        // gpt-image-1 always returns b64_json - it has no response_format param.
        size: "1536x1024",
        quality: "medium",
        n: 1,
      }),
    });

    if (!response.ok) {
      console.error("Blog image generation failed", response.status, await response.text());
      return null;
    }

    const data = await response.json();
    const b64 = data?.data?.[0]?.b64_json;
    if (typeof b64 !== "string" || b64.length === 0) return null;

    return { buffer: Buffer.from(b64, "base64"), contentType: "image/png" };
  } catch (error) {
    console.error("Blog image generation error", error);
    return null;
  }
}
