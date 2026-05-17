import { fail, ok } from "../../../../../../lib/api/response";
import { checkRateLimit, getClientKey } from "../../../../../../lib/server/rate-limit";
import { createReportFlag } from "../../../../../../services/flags";

interface FlagPayload {
  reason: "defamation" | "false_info" | "abuse" | "other";
  detail?: string;
}
const ALLOWED_REASONS = new Set(["defamation", "false_info", "abuse", "other"]);

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
): Promise<Response> {
  try {
    const clientKey = getClientKey(request);
    if (!checkRateLimit(`flags:${clientKey}`, 10, 60_000)) {
      return fail("Too many requests", 429);
    }

    const { id } = await context.params;
    const body = (await request.json()) as FlagPayload;
    if (!body.reason) return fail("reason is required", 400);
    if (!ALLOWED_REASONS.has(body.reason)) return fail("invalid reason", 400);

    const flag = await createReportFlag(id, body.reason, body.detail);
    return ok(flag, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to flag report";
    return fail(message, 500);
  }
}
