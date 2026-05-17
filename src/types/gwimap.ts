export type FearLevel = 1 | 2 | 3 | 4 | 5;
export type ReportCategory = "sighting" | "sound" | "presence" | "other";
export type ModerationStatus = "visible" | "flagged" | "hidden";

export interface Spot {
  id: string;
  name: string;
  address: string | null;
  lat: number;
  lng: number;
  fearLevel: FearLevel;
  categories: string[];
  representativeImageUrl: string | null;
  reportCount: number;
  status: "active" | "hidden";
  createdAt: string;
  updatedAt: string;
}

export interface Report {
  id: string;
  spotId: string;
  title: string;
  content: string;
  fearLevel: FearLevel;
  category: ReportCategory;
  occurredAtHour: number | null;
  imageUrl: string | null;
  isAnonymous: boolean;
  moderationStatus: ModerationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ReportFlag {
  id: string;
  reportId: string;
  reason: "defamation" | "false_info" | "abuse" | "other";
  detail: string | null;
  createdAt: string;
}

export interface SpotListQuery {
  minLat?: number;
  maxLat?: number;
  minLng?: number;
  maxLng?: number;
  fearLevel?: FearLevel;
  category?: ReportCategory;
}
