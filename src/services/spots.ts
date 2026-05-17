import { createSupabaseServerClient } from "../lib/supabase/server";
import type { Spot, SpotListQuery } from "../types/gwimap";

function mapSpotRow(row: any): Spot {
  return {
    id: row.id,
    name: row.name,
    address: row.address,
    lat: row.lat,
    lng: row.lng,
    fearLevel: Number(row.fear_level) as Spot["fearLevel"],
    categories: row.categories ?? [],
    representativeImageUrl: row.representative_image_url,
    reportCount: row.report_count,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listSpots(query: SpotListQuery): Promise<Spot[]> {
  const supabase = createSupabaseServerClient();
  let q = supabase.from("spots").select("*").eq("status", "active");

  if (query.minLat !== undefined) q = q.gte("lat", query.minLat);
  if (query.maxLat !== undefined) q = q.lte("lat", query.maxLat);
  if (query.minLng !== undefined) q = q.gte("lng", query.minLng);
  if (query.maxLng !== undefined) q = q.lte("lng", query.maxLng);
  if (query.fearLevel !== undefined) q = q.eq("fear_level", String(query.fearLevel));
  if (query.category) q = q.contains("categories", [query.category]);

  const { data, error } = await q.limit(500);
  if (error) throw new Error(error.message);
  return (data ?? []).map(mapSpotRow);
}

export async function getSpotDetail(spotId: string) {
  const supabase = createSupabaseServerClient();
  const { data: spot, error: spotErr } = await supabase
    .from("spots")
    .select("*")
    .eq("id", spotId)
    .single();
  if (spotErr) throw new Error(spotErr.message);

  const { data: reports, error: reportErr } = await supabase
    .from("reports")
    .select("*")
    .eq("spot_id", spotId)
    .eq("moderation_status", "visible")
    .order("created_at", { ascending: false })
    .limit(20);
  if (reportErr) throw new Error(reportErr.message);

  return { spot: mapSpotRow(spot), reports: reports ?? [] };
}
