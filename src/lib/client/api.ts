import type { FearLevel, ReportCategory, Spot } from "../../types/gwimap";

interface ApiEnvelope<T> {
  data: T;
  error: { message: string; status: number } | null;
}

export async function fetchSpots(): Promise<Spot[]> {
  const res = await fetch("/api/spots", { cache: "no-store" });
  const body = (await res.json()) as ApiEnvelope<Spot[]>;
  if (!res.ok || body.error) {
    throw new Error(body.error?.message ?? "Failed to fetch spots");
  }
  return body.data;
}

export async function fetchSpotDetail(id: string) {
  const res = await fetch(`/api/spots/${id}`, { cache: "no-store" });
  const body = (await res.json()) as ApiEnvelope<{
    spot: Spot;
    reports: Array<{
      id: string;
      title: string;
      content: string;
      fear_level: string;
      category: string;
      created_at: string;
    }>;
  }>;
  if (!res.ok || body.error) {
    throw new Error(body.error?.message ?? "Failed to fetch spot detail");
  }
  return body.data;
}

export async function submitReport(input: {
  spotId: string;
  title: string;
  content: string;
  fearLevel: FearLevel;
  category: ReportCategory;
  imageUrl?: string;
}) {
  const res = await fetch("/api/reports", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const body = (await res.json()) as ApiEnvelope<unknown>;
  if (!res.ok || body.error) {
    throw new Error(body.error?.message ?? "Failed to submit report");
  }
}

export async function uploadReportImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const payloadRes = await fetch("/api/uploads/image", {
    method: "POST",
    body: formData,
  });
  const payloadBody = (await payloadRes.json()) as ApiEnvelope<{
    path: string;
    bucket: string;
  }>;
  if (!payloadRes.ok || payloadBody.error) {
    throw new Error(payloadBody.error?.message ?? "Failed to upload image");
  }

  const { bucket, path } = payloadBody.data;
  return `${bucket}/${path}`;
}

export async function flagReport(reportId: string, reason: "defamation" | "false_info" | "abuse" | "other") {
  const res = await fetch(`/api/reports/${reportId}/flags`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reason }),
  });
  const body = (await res.json()) as ApiEnvelope<unknown>;
  if (!res.ok || body.error) {
    throw new Error(body.error?.message ?? "Failed to flag report");
  }
}
