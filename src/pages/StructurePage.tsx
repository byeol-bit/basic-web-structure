import { useTranslation } from "react-i18next";

import PageHeader from "@/components/common/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const folderTree = `src
├─ api                   # Axios, JWT Header, 401 Token 갱신
├─ assets                # 이미지와 정적 파일
├─ components            # 재사용 UI 컴포넌트
│  ├─ common             # AuthProvider 등 앱 공통 요소
│  ├─ layout             # TopNav, Sidebar, AppLayout
│  ├─ ui                 # 프로젝트가 소유하는 shadcn/ui
│  └─ users              # 사용자와 계정 메뉴 컴포넌트
├─ config                # 역할별 접근 경로 등 공통 정책
├─ hooks                 # TanStack Query와 화면 상태 연결
├─ locales               # 다국어 번역 리소스
│  ├─ en                 # 영어 문구
│  └─ ko                 # 한국어 문구
├─ mocks                 # 인증과 업무 API의 MSW Handler
├─ pages                 # Route 화면, Login, 403, 404
├─ routes                # URL, 로그인과 역할별 접근 제어
├─ services              # AuthService 등 기능별 API 호출
├─ stores                # Theme와 인증 메모리 상태
├─ styles                # 전역 스타일과 Theme 변수
├─ types                 # DTO, 인증과 사용자 역할 계약
├─ utils                 # 작은 공통 함수
├─ App.tsx               # 애플리케이션 Route 진입점
└─ main.tsx              # 전역 Provider와 앱 시작점`;

// 현재 프로젝트의 주요 폴더와 역할을 연결합니다.
const folderItems = [
  { name: "api", textKey: "structure.folders.api" },
  { name: "assets", textKey: "structure.folders.assets" },
  { name: "components", textKey: "structure.folders.components" },
  { name: "config", textKey: "structure.folders.config" },
  { name: "hooks", textKey: "structure.folders.hooks" },
  { name: "locales", textKey: "structure.folders.locales" },
  { name: "mocks", textKey: "structure.folders.mocks" },
  { name: "pages", textKey: "structure.folders.pages" },
  { name: "routes", textKey: "structure.folders.routes" },
  { name: "services", textKey: "structure.folders.services" },
  { name: "stores", textKey: "structure.folders.stores" },
  { name: "styles", textKey: "structure.folders.styles" },
  { name: "types", textKey: "structure.folders.types" },
  { name: "utils", textKey: "structure.folders.utils" },
];

// 화면 기능이 Backend API까지 이동하는 기본 순서입니다.
const flowItems = [
  { name: "Page", textKey: "structure.flow.page" },
  { name: "Hook", textKey: "structure.flow.hook" },
  { name: "Service", textKey: "structure.flow.service" },
  { name: "API", textKey: "structure.flow.api" },
];

// 프로젝트의 폴더 구조와 계층별 책임을 설명합니다.
function StructurePage() {
  const { t } = useTranslation();

  return (
    <section>
      <PageHeader
        category={t("structure.category")}
        title={t("structure.title")}
        description={t("structure.description")}
      />

      <div className="grid grid-cols-[minmax(0,1fr)_minmax(22rem,0.9fr)] gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>{t("structure.treeTitle")}</CardTitle>
            <CardDescription>
              {t("structure.treeDescription")}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* 실제 src 폴더의 기본 구조를 코드 형태로 표시합니다. */}
            <pre className="overflow-x-auto rounded-lg border border-line bg-panel-soft p-5 text-sm leading-7 text-main">
              <code>{folderTree}</code>
            </pre>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>{t("structure.roleTitle")}</CardTitle>
            <CardDescription>
              {t("structure.roleDescription")}
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-3">
            {folderItems.map((item) => (
              <div
                key={item.name}
                className="rounded-lg border border-line bg-panel-soft px-4 py-3"
              >
                <code className="text-sm font-bold text-brand">
                  {item.name}
                </code>

                <p className="mt-1 text-sm leading-6 text-sub">
                  {t(item.textKey)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 shadow-sm">
        <CardHeader>
          <CardTitle>{t("structure.flowTitle")}</CardTitle>
          <CardDescription>
            {t("structure.flowDescription")}
          </CardDescription>
        </CardHeader>

        <CardContent className="grid grid-cols-4 gap-4">
          {flowItems.map((item, index) => (
            <div
              key={item.name}
              className="relative rounded-lg border border-line bg-panel-soft p-4"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                {index + 1}
              </div>

              <h3 className="mt-3 font-bold text-main">
                {item.name}
              </h3>

              <p className="mt-1 text-sm leading-6 text-sub">
                {t(item.textKey)}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

export default StructurePage;