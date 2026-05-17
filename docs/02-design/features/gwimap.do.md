# gwimap Implementation Guide

> **Summary**: Supabase 기반 gwimap MVP Do 단계 구현 가이드 및 1차 산출물
>
> **Project**: gwimap
> **Author**: Codex
> **Date**: 2026-05-17
> **Status**: In Progress
> **Design Doc**: [gwimap.design.md](./gwimap.design.md)

---

## 1. Pre-Implementation Checklist

- [x] Plan document reviewed
- [x] Design document reviewed
- [x] Backend option finalized to Supabase
- [x] Dependencies declared (`package.json`)
- [ ] Dependencies installed (`npm install`)
- [ ] Development server running
- [x] Environment variable template added (`.env.example`)

---

## 2. Implementation Order

### 2.1 Phase 1: Data Layer

| Priority | Task | File/Location | Status |
|:--------:|------|---------------|:------:|
| 1 | Supabase schema definition | `supabase/schema.sql` | Done |
| 2 | Type definitions | `src/types/gwimap.ts` | Done |
| 3 | Supabase server client | `src/lib/supabase/server.ts` | Done |

### 2.2 Phase 2: Business Logic

| Priority | Task | File/Location | Status |
|:--------:|------|---------------|:------:|
| 4 | Spot query service | `src/services/spots.ts` | Done |
| 5 | Report create service | `src/services/reports.ts` | Done |
| 6 | Report flag service | `src/services/flags.ts` | Done |
| 7 | Input validation | `src/lib/validation/report.ts` | Done |

### 2.3 Phase 3: API Routes

| Priority | Task | File/Location | Status |
|:--------:|------|---------------|:------:|
| 8 | Spots list API | `src/app/api/spots/route.ts` | Done |
| 9 | Spot detail API | `src/app/api/spots/[id]/route.ts` | Done |
| 10 | Report create API | `src/app/api/reports/route.ts` | Done |
| 11 | Report flag API | `src/app/api/reports/[id]/flags/route.ts` | Done |
| 12 | Image upload token API | `src/app/api/uploads/image/route.ts` | Done |

### 2.4 Phase 4: Integration

| Priority | Task | File/Location | Status |
|:--------:|------|---------------|:------:|
| 13 | Next.js app runtime skeleton | `package.json`, `src/app/*` | Done |
| 14 | Map/Detail/Report UI 연결 | `src/app`, `src/components` | Done |
| 15 | Loading/Error UI | UI components | Done (basic) |
| 16 | 이미지 업로드 UI/API 연동 | `report-form`, `/api/uploads/image` | Done |
| 17 | 신고 UI/API 연동 | `spot-detail`, `/api/reports/:id/flags` | Done |
| 18 | E2E 시나리오 검증 | Playwright | Pending |

---

## 3. Key Files

### 3.1 New Files

| File Path | Purpose |
|-----------|---------|
| `supabase/schema.sql` | 테이블/RLS/트리거 정의 |
| `src/types/gwimap.ts` | 도메인 타입 |
| `src/services/*.ts` | 핵심 비즈니스 로직 |
| `src/app/api/**/route.ts` | REST API 핸들러 |
| `.env.example` | Supabase 환경변수 템플릿 |

---

## 4. Dependencies

```bash
# Next.js 프로젝트 기준
npm install @supabase/supabase-js
```

---

## 5. Post-Implementation

### 5.1 Self-Review Checklist

- [x] Design 문서의 데이터 모델 반영
- [x] Design 문서의 핵심 API 경로 반영
- [x] 기본 입력 검증 추가
- [x] 실제 앱 라우트/UI와 통합(기본 목록/상세/제보)
- [x] 이미지 업로드/신고 흐름 연결
- [ ] 통합/E2E 테스트 완료

### 5.2 Ready for Check Phase

UI 통합과 테스트가 완료되면 갭 분석 진행:

```bash
$pdca analyze gwimap
```

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 0.1 | 2026-05-17 | Initial Do guide + Supabase/API scaffold | Codex |
