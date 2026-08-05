export const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_MISSIVE_WEBHOOK_URL ||
  "http://localhost:5678/webhook/cordial-chat";

export class MissiveApiError extends Error {}

/**
 * Sends one turn to the n8n Agent and returns its reply.
 * Contract: POST { chatInput, userEmail, sessionId } -> { output }.
 */
export async function sendChatMessage(
  params: { chatInput: string; userEmail: string; sessionId: string },
  signal?: AbortSignal
): Promise<string> {
  let res: Response;
  try {
    res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
      signal,
    });
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") throw e;
    throw new MissiveApiError(
      "Couldn't reach the server. Check your connection and try again."
    );
  }

  if (!res.ok) {
    throw new MissiveApiError(`The assistant didn't respond (status ${res.status}).`);
  }

  const data = (await res.json().catch(() => null)) as { output?: string } | null;
  if (!data || typeof data.output !== "string") {
    throw new MissiveApiError("The reply came back in an unexpected format.");
  }
  return data.output;
}
