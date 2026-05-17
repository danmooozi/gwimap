import { createSupabaseServerClient } from "../lib/supabase/server";

export async function createReportFlag(reportId: string, reason: string, detail?: string) {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("report_flags")
    .insert({
      report_id: reportId,
      reason,
      detail: detail ?? null,
    })
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  // 신고가 들어오면 운영 검토 전 상태로 전환
  await supabase
    .from("reports")
    .update({ moderation_status: "flagged" })
    .eq("id", reportId)
    .eq("moderation_status", "visible");

  return data;
}
