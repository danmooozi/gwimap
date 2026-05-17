import { listSpots } from "../../../../services/spots";
import { fail, ok } from "../../../../lib/api/response";
import type { SpotListQuery } from "../../../../types/gwimap";

export async function GET(request: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const query: SpotListQuery = {
      minLat: searchParams.get("minLat") ? Number(searchParams.get("minLat")) : undefined,
      maxLat: searchParams.get("maxLat") ? Number(searchParams.get("maxLat")) : undefined,
      minLng: searchParams.get("minLng") ? Number(searchParams.get("minLng")) : undefined,
      maxLng: searchParams.get("maxLng") ? Number(searchParams.get("maxLng")) : undefined,
      fearLevel: searchParams.get("fearLevel")
        ? (Number(searchParams.get("fearLevel")) as SpotListQuery["fearLevel"])
        : undefined,
      category: (searchParams.get("category") as SpotListQuery["category"]) ?? undefined,
    };
    const spots = await listSpots(query);
    return ok(spots);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to list spots";
    return fail(message, 500);
  }
}
