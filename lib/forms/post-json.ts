// Posts a form to one of our API routes and turns every failure into a readable message.
// The route may answer with HTML (a platform timeout or crash page), so the body is parsed defensively.
export async function postJson(url: string, body: unknown): Promise<void> {
  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: typeof AbortSignal.timeout === "function" ? AbortSignal.timeout(25_000) : undefined,
    });
  } catch (error) {
    throw new Error(
      error instanceof Error && error.name === "TimeoutError"
        ? "This is taking longer than it should."
        : "We couldn't reach our server. Please check your connection and try again.",
    );
  }

  let result: { ok?: boolean; error?: string } = {};
  try {
    result = (await response.json()) as typeof result;
  } catch {
    // Not JSON: fall through to the status-based message below.
  }
  if (response.ok && result.ok) return;
  throw new Error(
    result.error ||
      (response.status === 429
        ? "Too many attempts. Please wait a few minutes and try again."
        : "We couldn't send this right now."),
  );
}
