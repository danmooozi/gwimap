import { createSupabaseServerClient } from "../lib/supabase/server";
import type { CreateReportInput } from "../lib/validation/report";

export async function createReport(input: CreateReportInput) {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("reports")
    .insert({
      spot_id: input.spotId,
      title: input.title,
      content: input.content,
      fear_level: String(input.fearLevel),
      category: input.category,
      occurred_at_hour: input.occurredAtHour ?? null,
      image_url: input.imageUrl ?? null,
      is_anonymous: input.isAnonymous ?? true,
      moderation_status: "visible",
    })
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data;
}
