# MARSHALL - 기능 리스트

> 할일 관리(Todo) 웹 애플리케이션

---

## 1. 사용자 인증

### 1.1 Google OAuth 로그인
- Google 계정을 통한 소셜 로그인
- JWT 토큰 디코딩을 통한 사용자 정보 추출
- 로그인 상태 유지 (localStorage 활용)

### 1.2 로그아웃
- Google OAuth 연동 해제
- 로컬 저장소 및 Redux 상태 초기화

---

## 2. 할일(Task) 관리

### 2.1 할일 조회
- 로그인한 사용자의 모든 할일 목록 조회
- 최신순 정렬 (created_at DESC)
- 로딩 중 스켈레톤 UI 표시

### 2.2 할일 생성
- 모달 폼을 통한 새 할일 추가
- 입력 항목:
  - 제목 (필수)
  - 설명 (필수)
  - 날짜 (필수)
  - 완료 여부
  - 중요 여부
- UUID 자동 생성
- 입력값 검증 (빈 값 체크)

### 2.3 할일 수정
- 기존 할일의 전체 정보 수정
- 수정 가능 항목: 제목, 설명, 날짜, 완료 여부, 중요 여부
- 수정 시간 자동 기록 (updated_at)

### 2.4 할일 완료 상태 토글
- 카드에서 버튼 클릭으로 빠른 상태 변경
- 완료 ↔ 진행 중 상태 전환

### 2.5 할일 삭제
- 확인 후 할일 영구 삭제

### 2.6 할일 상세 보기
- 모달을 통한 상세 정보 조회 (읽기 전용)

---

## 3. 필터링 기능

### 3.1 전체 보기 (Home)
- 모든 할일 표시 (완료/진행 중 모두)

### 3.2 완료된 할일 (Completed)
- 완료 상태인 할일만 필터링

### 3.3 진행 중인 할일 (Proceeding)
- 미완료 상태인 할일만 필터링

### 3.4 중요 할일 (Important)
- 중요 표시된 할일만 필터링

---

## 4. UI/UX 기능

### 4.1 네비게이션
- 좌측 사이드바 메뉴
- 4개 페이지 네비게이션 (Home, Completed, Proceeding, Important)
- 아이콘과 함께 표시

### 4.2 카드 레이아웃
- 3열 반응형 그리드 레이아웃
- 각 카드에 제목, 설명, 날짜 표시
- 완료/중요 상태 시각적 표시

### 4.3 모달 시스템
- 생성/수정/상세보기 3가지 모드 지원
- 폼 입력 및 검증
- 배경 클릭 또는 X 버튼으로 닫기

### 4.4 알림 시스템
- Toast 알림을 통한 작업 결과 피드백
- 성공/실패 메시지 표시

### 4.5 로딩 상태
- 데이터 로딩 중 스켈레톤 UI 표시
- 사용자 경험 향상

### 4.6 다크 테마
- Tailwind CSS 기반 다크 모드 디자인

---

## 5. 기술 스택

### Frontend
| 기술 | 버전 | 용도 |
|------|------|------|
| React | 19.2.0 | UI 프레임워크 |
| Vite | 7.2.4 | 빌드 도구 |
| Redux Toolkit | 2.11.2 | 상태 관리 |
| React Router DOM | 7.13.0 | 클라이언트 라우팅 |
| Tailwind CSS | 3.4.19 | 스타일링 |
| React Icons | 5.5.0 | 아이콘 |
| React Toastify | 11.0.5 | 알림 |
| @react-oauth/google | - | Google OAuth |
| jwt-decode | 4.0.0 | JWT 토큰 디코딩 |

### Backend
| 기술 | 버전 | 용도 |
|------|------|------|
| Express | 5.2.1 | 웹 프레임워크 |
| PostgreSQL | - | 메인 데이터베이스 |
| MySQL2 | - | 대체 데이터베이스 |
| UUID | 13.0.0 | 고유 ID 생성 |
| CORS | 2.8.6 | Cross-Origin 허용 |
| dotenv | 17.2.3 | 환경 변수 관리 |

---

## 6. 데이터 모델

### Tasks 테이블
| 필드 | 타입 | 설명 |
|------|------|------|
| _id | TEXT (PK) | UUID 고유 아이디 |
| title | TEXT | 할일 제목 |
| description | TEXT | 할일 설명 |
| date | TEXT | 할일 날짜 (YYYY-MM-DD) |
| isCompleted | BOOLEAN | 완료 여부 |
| isImportant | BOOLEAN | 중요 여부 |
| userId | TEXT | 사용자 ID (Google OAuth sub) |
| created_at | TIMESTAMP | 생성 시간 |
| updated_at | TIMESTAMP | 수정 시간 (자동 갱신) |

---

## 7. 페이지 구조

```
/                 → Home (전체 할일)
/completed        → 완료된 할일
/proceeding       → 진행 중인 할일
/important        → 중요 할일
```

---

## 8. 핵심 컴포넌트

| 컴포넌트 | 위치 | 기능 |
|----------|------|------|
| Navbar | Common | 네비게이션, Google OAuth 로그인 |
| ItemPanel | Common | 할일 목록 표시, 필터링 |
| Item | Common | 개별 할일 카드 |
| Modal | Common | 생성/수정/상세보기 폼 |
| AddItem | Common | 할일 추가 버튼 |
| LoadingSkeleton | Common | 로딩 스켈레톤 |
| PageTitle | Common | 페이지 제목 |

---

## 9. 상태 관리 (Redux)

### Slices
| Slice | 역할 |
|-------|------|
| authSlice | 사용자 인증 상태 관리 |
| modalSlice | 모달 열림/닫힘 상태 관리 |
| apiSlice | API 비동기 작업 및 데이터 관리 |

### 비동기 작업 (Thunks)
- `fetchGetItem` - 할일 조회
- `fetchPostItem` - 할일 생성
- `fetchPutTaskItem` - 할일 수정
- `fetchUpdateCompleted` - 완료 상태 업데이트
- `fetchDeleteItem` - 할일 삭제
