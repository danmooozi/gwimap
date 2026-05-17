# gwimap Planning Document

> **Summary**: 지도 기반 심령 스팟 탐색과 사용자 제보를 제공하는 MVP 웹 서비스 기획
>
> **Project**: gwimap
> **Version**: 0.1
> **Author**: Codex
> **Date**: 2026-05-17
> **Status**: Draft

---

## 1. Overview

### 1.1 Purpose

사용자가 주변의 심령 스팟을 탐색하고 직접 경험을 제보할 수 있는 참여형 지도 서비스를 MVP로 구축한다.

### 1.2 Background

여름 시즌성 공포 콘텐츠 수요를 활용해 트래픽을 확보하고, UGC 기반 데이터 축적으로 장기 확장(랭킹/커뮤니티/코스 추천)의 기반을 만든다.

### 1.3 Related Documents

- Requirements: [gwimap_prd.md](../../../gwimap_prd.md)
- References: [DESIGN.md](../../../DESIGN.md)

---

## 2. Scope

### 2.1 In Scope

- [ ] 지도 위 심령 스팟 마커 표시(클러스터링 포함)
- [ ] 스팟 상세 조회(위치, 제보 리스트, 공포 레벨/태그)
- [ ] 사용자 제보 등록(익명, 텍스트, 이미지 선택 첨부, 공포 레벨)

### 2.2 Out of Scope

- 커뮤니티(댓글/좋아요/유저 레벨)
- AR 기능 및 공포 코스 추천
- 고도화 랭킹 로직

---

## 3. Requirements

### 3.1 Functional Requirements

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-01 | 사용자는 지도에서 심령 스팟 마커를 탐색할 수 있어야 한다 | High | Pending |
| FR-02 | 사용자는 스팟 상세 화면에서 제보/이미지/공포 정보를 볼 수 있어야 한다 | High | Pending |
| FR-03 | 사용자는 익명으로 새로운 제보를 등록할 수 있어야 한다 | High | Pending |
| FR-04 | 사용자는 지역/공포 레벨/카테고리 기준으로 필터링할 수 있어야 한다 | Medium | Pending |
| FR-05 | 운영자는 신고된 콘텐츠를 비노출 처리할 수 있어야 한다 | Medium | Pending |

### 3.2 Non-Functional Requirements

| Category | Criteria | Measurement Method |
|----------|----------|-------------------|
| Performance | 지도 초기 로딩 3초 이내(일반 4G 환경 기준) | Lighthouse, Web Vitals |
| Security | 기본 입력 검증 및 악성 콘텐츠 필터링 | 수동 테스트 + 서버 검증 로그 |
| Availability | 핵심 API 성공률 99% 이상 | BaaS 모니터링 대시보드 |
| Usability | 제보 등록 완료까지 60초 이내 | 사용자 시나리오 테스트 |

---

## 4. Success Criteria

### 4.1 Definition of Done

- [ ] MVP 범위 기능(지도/상세/제보) 구현 완료
- [ ] 핵심 사용자 시나리오 테스트 통과
- [ ] 콘텐츠 고지 문구 및 신고 경로 반영
- [ ] 기본 운영 문서(배포/운영 체크리스트) 작성

### 4.2 Quality Criteria

- [ ] 주요 사용자 흐름(탐색/상세/제보) 동작 확인
- [ ] 런타임 에러(치명적) 0건
- [ ] 빌드 및 린트 통과

---

## 5. Risks and Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| 허위/비방 제보로 인한 법적 이슈 | High | Medium | 고지 문구, 신고/블라인드 플로우, 운영 검수 기준 정의 |
| 지도 데이터 증가 시 성능 저하 | Medium | Medium | 마커 클러스터링, 지연 로딩, 페이징/범위 쿼리 적용 |
| 초기 UGC 부족으로 서비스 매력 저하 | Medium | High | 샘플 데이터 시딩, 시즌성 콘텐츠 기획 병행 |

---

## 6. Architecture Considerations

### 6.1 Project Level Selection

| Level | Characteristics | Selected |
|-------|-----------------|:--------:|
| **Starter** | Simple structure, static sites | - |
| **Dynamic** | Feature-based modules, BaaS integration | O |
| **Enterprise** | Strict layer separation, microservices | - |

### 6.2 Key Architectural Decisions

| Decision | Options | Selected | Rationale |
|----------|---------|----------|-----------|
| Framework | Next.js / React / Vue | Next.js | 라우팅/배포 단순화, 향후 확장 용이 |
| Backend | Supabase / Firebase | Supabase | 관계형 데이터 모델과 RLS 정책 적용에 유리 |
| State Management | Context / Zustand / Redux | Zustand | 지도/필터 상태 관리 단순화 |
| Styling | Tailwind / CSS Modules | Tailwind | 빠른 UI 구현 및 일관된 토큰 관리 |

---

## 7. Next Steps

1. [ ] 디자인 문서 작성 (`gwimap.design.md`)
2. [ ] 데이터 스키마(Spot, Report, Moderation) 확정
3. [ ] 구현 우선순위(지도 -> 상세 -> 제보)로 Do 단계 착수

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 0.1 | 2026-05-17 | Initial draft from PRD | Codex |
| 0.2 | 2026-05-17 | Backend option finalized to Supabase | Codex |
