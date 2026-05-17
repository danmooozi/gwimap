# gwimap Design Document

> **Summary**: 심령 스팟 탐색/상세/제보 MVP를 위한 지도 중심 풀스택 설계
>
> **Project**: gwimap
> **Version**: 0.1
> **Author**: Codex
> **Date**: 2026-05-17
> **Status**: Draft
> **Planning Doc**: [gwimap.plan.md](../../01-plan/features/gwimap.plan.md)

---

## 1. Overview

### 1.1 Design Goals

- 지도 탐색, 스팟 상세, 제보 등록의 핵심 사용자 흐름을 단일 서비스에서 안정적으로 제공한다.
- BaaS 기반으로 빠르게 구현하되, 추후 랭킹/커뮤니티 확장을 고려한 데이터 구조를 유지한다.
- 익명 UGC 특성에 맞게 최소한의 검증/신고/블라인드 정책을 시스템에 포함한다.

### 1.2 Design Principles

- Feature-first: 화면 단위 기능 모듈을 중심으로 구조화한다.
- API contract-first: 프론트와 백엔드 간 요청/응답 스키마를 먼저 고정한다.
- Safety baseline: 법적 리스크 대응을 위한 콘텐츠 정책 필드를 초기부터 포함한다.

---

## 2. Architecture

### 2.1 Component Diagram

```text
Web Client (Next.js)
  -> API Route Layer (Next.js Route Handlers)
    -> BaaS Service (Supabase: Postgres/Auth/Storage)
```

### 2.2 Data Flow

```text
Map View
  -> load spots by bounds/filter
  -> render marker cluster
  -> open spot detail
  -> load reports by spot

Report Submit
  -> validate input
  -> upload image (optional)
  -> create report
  -> increment spot reportCount / recalc aggregates
```

### 2.3 Dependencies

| Component | Depends On | Purpose |
|-----------|-----------|---------|
| `map-feature` | Kakao Map SDK | 지도 렌더링, 마커/클러스터 |
| `spot-service` | Supabase JS SDK | 스팟 조회/상세 조회 |
| `report-service` | Supabase JS SDK + Storage | 제보 저장, 이미지 업로드 |
| `moderation-service` | Supabase JS SDK | 신고/블라인드 상태 관리 |
| `filter-store` | Zustand | 필터/지도 bounds 상태 공유 |

---

## 3. Data Model

### 3.1 Entity Definition

```typescript
type FearLevel = 1 | 2 | 3 | 4 | 5;

interface Spot {
  id: string;
  name: string;
  address?: string;
  lat: number;
  lng: number;
  fearLevel: FearLevel;
  categories: string[]; // e.g. ["sighting", "sound"]
  representativeImageUrl?: string;
  reportCount: number;
  status: "active" | "hidden";
  createdAt: string;
  updatedAt: string;
}

interface Report {
  id: string;
  spotId: string;
  title: string;
  content: string;
  fearLevel: FearLevel;
  category: "sighting" | "sound" | "presence" | "other";
  occurredAtHour?: number;
  imageUrl?: string;
  isAnonymous: boolean;
  moderationStatus: "visible" | "flagged" | "hidden";
  createdAt: string;
  updatedAt: string;
}

interface ReportFlag {
  id: string;
  reportId: string;
  reason: "defamation" | "false_info" | "abuse" | "other";
  detail?: string;
  createdAt: string;
}
```

### 3.2 Entity Relationships

```text
[Spot] 1 ---- N [Report]
  |
  +---- 1 ---- N [ReportFlag] (via Report)
```

---

## 4. API Specification

### 4.1 Endpoint List

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | /api/spots | bounds + filter 기준 스팟 목록 조회 | Optional |
| GET | /api/spots/:id | 스팟 상세 + 최근 제보 요약 조회 | Optional |
| POST | /api/reports | 신규 제보 생성 | Optional (익명 허용) |
| POST | /api/uploads/image | 제보 이미지 업로드 URL 발급 | Optional |
| POST | /api/reports/:id/flags | 제보 신고 등록 | Optional |

### 4.2 Response Format

```json
{
  "data": {},
  "meta": {
    "timestamp": "2026-05-17T00:00:00Z",
    "requestId": "req_xxx"
  },
  "error": null
}
```

---

## 5. UI/UX Design

### 5.1 Screen Layout

```text
Main Map
+--------------------------------------------------+
| Header (logo, search, filters)                  |
+--------------------------------------------------+
| Map + marker cluster                             |
|  -> bottom sheet: spot preview                  |
+--------------------------------------------------+

Spot Detail
+--------------------------------------------------+
| Hero image + fear level badge                    |
| Address/map snippet                              |
| Report list (time/category/content/media)        |
+--------------------------------------------------+

Report Submit
+--------------------------------------------------+
| Spot selector(map/search)                        |
| title/content/category/fear level/image          |
| submit CTA + policy note                          |
+--------------------------------------------------+
```

### 5.2 Component List

| Component | Location | Responsibility |
|-----------|----------|----------------|
| `MapCanvas` | `src/features/map/components/` | 지도/마커/클러스터 렌더링 |
| `SpotFilterPanel` | `src/features/map/components/` | 지역/레벨/카테고리 필터 |
| `SpotDetailCard` | `src/features/spot/components/` | 상세 정보 및 제보 리스트 |
| `ReportForm` | `src/features/report/components/` | 제보 작성/검증/전송 |
| `PolicyNotice` | `src/components/common/` | 엔터테인먼트 고지 문구 |

---

## 6. Error Handling

| Code | Message | Handling |
|------|---------|----------|
| 400 | Invalid report input | 필드별 에러 표시, 재입력 유도 |
| 404 | Spot not found | 지도 화면으로 복귀 유도 |
| 413 | Image too large | 용량 제한 안내 및 재선택 |
| 429 | Too many requests | 재시도 시간 안내 |
| 500 | Internal error | 토스트 에러 + fallback 로깅 |

---

## 7. Security Considerations

- [ ] 입력값 길이/금칙어/스크립트 문자열 서버 검증
- [ ] 이미지 MIME/확장자/크기 검증
- [ ] 제보·신고 API rate limit 적용
- [ ] 정책 고지 및 신고 기능 UI 노출

---

## 8. Test Plan

| Type | Target | Tool |
|------|--------|------|
| Unit Test | fear level mapper, filter parser, validator | Vitest |
| Integration Test | `/api/spots`, `/api/reports` contract | Supertest |
| E2E Test | 지도 탐색 -> 상세 -> 제보 등록 플로우 | Playwright |

---

## 9. Implementation Guide

### 9.1 Implementation Order

1. [ ] BaaS 스키마 생성 (`spots`, `reports`, `report_flags`)
2. [ ] `/api/spots`, `/api/spots/:id` 구현
3. [ ] `/api/uploads/image`, `/api/reports` 구현
4. [ ] 지도 UI + 필터 + 상세/제보 화면 통합
5. [ ] 신고 API 및 정책 고지 반영
6. [ ] 핵심 E2E 시나리오 검증

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 0.1 | 2026-05-17 | Initial draft from gwimap plan | Codex |
| 0.2 | 2026-05-17 | Backend stack finalized to Supabase | Codex |
