import type { FearLevel, ReportCategory } from "../../types/gwimap";

export interface CreateReportInput {
  spotId: string;
  title: string;
  content: string;
  fearLevel: FearLevel;
  category: ReportCategory;
  occurredAtHour?: number;
  imageUrl?: string;
  isAnonymous?: boolean;
}

export function validateCreateReport(input: CreateReportInput): string | null {
  if (!input.spotId) return "spotId is required";
  if (!input.title || input.title.length < 2 || input.title.length > 80) {
    return "title must be between 2 and 80 characters";
  }
  if (!input.content || input.content.length < 10 || input.content.length > 2000) {
    return "content must be between 10 and 2000 characters";
  }
  if (input.fearLevel < 1 || input.fearLevel > 5) {
    return "fearLevel must be between 1 and 5";
  }
  if (
    input.occurredAtHour !== undefined &&
    (input.occurredAtHour < 0 || input.occurredAtHour > 23)
  ) {
    return "occurredAtHour must be between 0 and 23";
  }
  return null;
}
