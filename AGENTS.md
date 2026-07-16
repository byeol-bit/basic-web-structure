1. # AGENTS.md

   ## 프로젝트 목적

   본 프로젝트는 React 기반의 재사용 가능한 Frontend 플랫폼을 구축한다.

   ### 기술 스택

   - React
   - TypeScript
   - Vite
   - Tailwind CSS
   - shadcn/ui
   - Zustand
   - TanStack Query
   - Axios
   - React Router
   - react-i18next
   - SignalR
   - Apache ECharts
   - ASP.NET Core Web API
   - Tauri (선택)

   ------

   # 폴더 구조

   ```txt
   apps/
   ├─ web
   ├─ server
   └─ desktop
   
   apps/web/src/
   ├─ api             # API 호출 모듈
   ├─ components      # UI 컴포넌트
   │  ├─ ui           # shadcn/ui
   │  ├─ common       # 공통 컴포넌트
   │  ├─ layout       # Header, Sidebar, 페이지 Layout
   │  └─ charts       # ECharts
   ├─ config          # 메뉴, 권한, 환경설정
   ├─ constants       # 상수 정의
   ├─ hooks           # Custom Hooks
   ├─ locales         # 다국어 리소스
   ├─ pages           # 화면(Page)
   ├─ routes          # Route Guard
   ├─ services        # 비즈니스 서비스
   ├─ signalr         # SignalR 연결 및 이벤트 처리
   ├─ stores          # Zustand Store
   ├─ styles          # Tailwind, Global CSS, Theme Variables
   ├─ types           # DTO, Interface, Type
   ├─ utils           # 유틸 함수
   ├─ App.tsx
   └─ main.tsx
   ```

   ------

   # 아키텍처 규칙

   기본 흐름은 다음 구조를 따른다.

   ```txt
   Page
    ↓
   Hook
    ├─ Store
    └─ Service
         ↓
         API
   ```

   ## 역할

   ### Page

   - 화면 구성
   - 이벤트 연결
   - Hook 사용
   - API 직접 호출 금지
   - 비즈니스 로직 작성 금지

   ### Hook

   - 화면 비즈니스 로직 관리
   - Store 사용
   - Service 호출
   - TanStack Query 사용
   - Page와 Store/Service 연결
   - UI 컴포넌트를 포함하지 않음

   ### Store

   - 전역 상태 관리
   - 상태 변경 함수 제공
   - API 호출 금지
   - Service 직접 호출 금지
   - SignalR 연결 금지

   ### Service

   - API 호출 담당
   - Backend 응답 데이터 가공
   - 공통 비즈니스 로직 관리
   - 여러 화면에서 사용하는 기능 재사용
   - Hook 사용 금지
   - Store 사용 금지
   - UI 상태 관리 금지

   ### API

   - Axios 기반 통신
   - Backend 호출
   - 공통 Header 관리
   - JWT Token 처리
   - Error 처리

   ------

   # 의존성 규칙

   허용

   ```txt
   Page → Hook
   Hook → Store
   Hook → Service
   Service → API
   ```

   금지

   ```txt
   Page → API
   Page → Service
   Store → API
   Store → Service
   API → Store
   Service → Hook
   ```

   ------

   # 상태 관리

   ## Zustand

   클라이언트 상태 관리

   ### 관리 대상

   - 로그인 상태
   - 사용자 정보
   - 메뉴 상태
   - 다크모드
   - 선택 상태
   - Dialog 상태
   - Toast 상태
   - 전역 UI 상태

   ### 규칙

   - 상태 관리만 담당
   - API 호출 금지
   - Service 호출 금지
   - SignalR 연결 금지

   ------

   ## TanStack Query

   서버 상태 관리

   ### 관리 대상

   - 사용자 목록
   - 설정 정보
   - Dashboard 데이터
   - 알람 목록
   - 로그 목록
   - 조회성 데이터

   ### 규칙

   - 서버 조회 데이터는 Query 사용
   - 캐싱이 필요한 데이터는 Query 사용
   - Query 내부 API 호출은 Service 사용
   - Query 내부 axios 직접 호출 금지

   ### 구분 기준

   ```txt
   클라이언트 상태
    ↓
   Zustand
   
   서버 상태
    ↓
   TanStack Query
   ```

   ------

   # Hook 규칙

   Custom Hook 사용

   ### 예시

   ```txt
   UserPage
    ↓
   useUsers
    ↓
   UserService
   ```

   ### 규칙

   - 화면 로직은 Hook으로 분리
   - Store 사용 가능
   - Service 사용 가능
   - TanStack Query 사용 가능
   - axios 직접 호출 금지

   ------

   # Service 규칙

   Service는 Hook과 API 사이의 비즈니스 계층이다.

   ### 역할

   - API 호출
   - 응답 데이터 변환
   - 공통 비즈니스 로직
   - 기능 재사용

   ### 예시

   ```txt
   UserPage
    ↓
   useUsers
    ↓
   UserService
    ↓
   ApiClient
   ```

   ### 규칙

   - API 호출은 Service에서만 수행
   - axios 사용 가능
   - Hook 사용 금지
   - Store 사용 금지
   - React 의존성 금지

   ------

   # UI 규칙

   ## 사용 라이브러리

   - Tailwind CSS
   - shadcn/ui

   ### 규칙

   - 공통 UI는 components/common 사용
   - shadcn 컴포넌트는 components/ui 사용
   - 레이아웃은 components/layout 사용
   - 차트는 components/charts 사용
   - CSS 변수 기반 Theme 사용
   - UI 문자열 하드코딩 금지

   ------

   # API 규칙

   Axios 사용

   ### 규칙

   - API 호출은 Service에서만 수행
   - 공통 설정은 ApiClient 사용
   - baseURL 하드코딩 금지
   - 환경 변수 사용

   ### 예시

   ```txt
   UserPage
    ↓
   useUsers
    ↓
   UserService
    ↓
   ApiClient
   ```

   ------

   # 라우팅 규칙

   React Router 사용

   ### 구성

   - Public Route
   - Protected Route

   필요 시

   - Permission Route

   ### 규칙

   - Page에서 Layout 직접 사용 금지
   - Layout은 Router에서 적용
   - 인증 화면은 Protected Route 사용

   ------

   # 인증 규칙

   JWT 사용

   ### 규칙

   - Access Token 사용
   - cookie에 저장
     - Refresh token은 httpOnly cookie에서 관리
     - Access Token은 Zustand(메모리)에만 저장하고 사용
   - 인증 상태는 Store 관리
   - 권한 검사는 Route 수행
   - 보안 판단은 Backend 기준

   ------

   # SignalR 규칙

   ## 사용 목적

   - 실시간 알람
   - 실시간 로그
   - 상태 변경 알림
   - Dashboard 데이터 갱신

   ### 규칙

   - 일반 CRUD는 API 사용
   - 실시간 이벤트만 SignalR 사용
   - SignalR 연결 관리는 signalr 폴더 사용
   - Store에서 SignalR 사용 금지

   ------

   # 다국어(i18n) 규칙

   react-i18next 사용

   ## 폴더 구조

   ```txt
   locales/
   ├─ ko
   │  └─ common.json
   ├─ en
   │  └─ common.json
   └─ ja
      └─ common.json
   ```

   ### 규칙

   - UI 문자열 하드코딩 금지
   - 모든 UI 문자열은 다국어 리소스 사용
   - 기본 언어는 한국어
   - 최소 지원 언어는 한국어, 영어

   ### 잘못된 예

   ```tsx
   <Button>로그인</Button>
   ```

   ### 올바른 예

   ```tsx
   <Button>{t("login")}</Button>
   ```

   ------

   # 차트 규칙

   Apache ECharts 사용

   ### 규칙

   - 차트 옵션 생성은 Hook 또는 Service
   - 차트 렌더링은 components/charts
   - Page에서 ECharts 직접 생성 금지

   ------

   # 환경설정 규칙

   환경 변수 사용

   예시

   ```env
   VITE_API_URL=
   VITE_SIGNALR_URL=
   ```

   금지

   ```ts
   const API_URL = "http://localhost:5000";
   ```

   ------

   # 네이밍 규칙

   ## 폴더

   - kebab-case

   ## 컴포넌트

   - PascalCase

   ## 페이지

   - PascalCase + Page

   ## Hook

   - useXXX

   ## Store

   - useXXXStore

   ## Service

   - XXXService

   ## DTO

   - XXXDto

   ## Interface

   - IXXX (선택)

   ------

   # 코드 품질 규칙

   ## ESLint

   - 코드 품질 검사

   ## Prettier

   - 코드 포맷 통일

   ## 권장

   - Husky
   - lint-staged

   ### 커밋 전 검사

   ```txt
   git commit
    ↓
   eslint
    ↓
   typecheck
    ↓
   commit
   ```

   ------

   # 파일 보호 규칙

   - 사용자가 명시적으로 요청하지 않은 파일 삭제 금지
   - 사용자가 명시적으로 요청하지 않은 폴더 삭제 금지
   - 관련 없는 파일 수정 금지
   - 기존 구조 유지
   - 폴더 구조 변경은 사용자 승인 후 수행
   - 대량 리팩토링 금지
   - 설정 파일(package.json, vite.config.ts, tsconfig.json 등)은 요청 시에만 수정

   ------

   # AI 코드 생성 규칙

   - 기존 구조를 우선 유지한다.
   - 요청하지 않은 라이브러리를 추가하지 않는다.
   - 새로운 폴더를 임의로 생성하지 않는다.
   - 기존 네이밍 규칙을 준수한다.
   - 과도한 추상화를 하지 않는다.
   - 요청 범위를 벗어난 리팩토링을 하지 않는다.

   ------

   # 개발 원칙

   - 단순하게 구현한다.
   - 요청 범위를 벗어난 기능을 추가하지 않는다.
   - 과도한 추상화를 하지 않는다.
   - 관련 없는 파일은 수정하지 않는다.
   - 리팩토링은 별도 요청이 있을 때만 수행한다.
   - 미래 기능을 미리 구현하지 않는다.
   - 삭제 처리에 대해선 반드시 다시 한 번 되묻는다.

   ## 우선순위

   1. 단순성
   2. 가독성
   3. 유지보수성
   4. 확장성
   5. 재사용성
