import { fail, ok } from "../../../../lib/api/response";
import { checkRateLimit, getClientKey } from "../../../../lib/server/rate-limit";
import { validateCreateReport, type CreateReportInput } from "../../../../lib/validation/report";
import { createReport } from "../../../../services/reports";

export async function POST(request: Request): Promise<Response> {
  try {
    const clientKey = getClientKey(request);
    if (!checkRateLimit(`reports:${clientKey}`, 20, 60_000)) {
      return fail("Too many requests", 429);
    }

    const body = (await request.json()) as CreateReportInput;
    const validationError = validateCreateReport(body);
    if (validationError) {
      return fail(validationError, 400);
    }

    const report = await createReport(body);
    return ok(report, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create report";
    return fail(message, 500);
  }
}
