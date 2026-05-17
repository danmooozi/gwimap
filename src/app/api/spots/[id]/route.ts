import { getSpotDetail } from "../../../../../services/spots";
import { fail, ok } from "../../../../../lib/api/response";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
): Promise<Response> {
  try {
    const { id } = await context.params;
    const data = await getSpotDetail(id);
    return ok(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch spot detail";
    return fail(message, 500);
  }
}
