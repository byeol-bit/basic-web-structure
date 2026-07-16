import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import App from "@/App";
import ThemeProvider from "@/components/common/ThemeProvider";
import AuthProvider from "@/components/common/AuthProvider";
import "@/locales/i18n";
import { startMock } from "@/mocks/startMock";
import "@/styles/index.css";

// 애플리케이션 전체에서 공유할 TanStack Query Client입니다.
const queryClient = new QueryClient();

/**
 * Provider를 구성하고 React 화면을 시작합니다.
 */
function showApp() {
  const root = document.getElementById("root");

  if (!root) {
    throw new Error(
      "root element를 찾을 수 없습니다.",
    );
  }

  createRoot(root).render(
    // 서버 조회 결과와 요청 상태를 앱 전체에서 공유합니다.
    <QueryClientProvider client={queryClient}>
      {/* 선택한 Light/Dark 테마를 앱 전체에 적용합니다. */}
      <ThemeProvider>
        {/* 앱 시작 시 Cookie를 사용해 인증 상태를 복원합니다. */}
        <AuthProvider>
          {/* 브라우저 URL을 React Page와 연결합니다. */}
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>

      {/* 개발 환경에서만 TanStack Query 상태 확인 도구를 표시합니다. */}
      {import.meta.env.DEV && (
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-right"
        />
      )}
    </QueryClientProvider>,
  );
}

/**
 * Mock API 준비가 끝난 뒤 React 화면을 시작합니다.
 */
async function startApp() {
  await startMock();
  showApp();
}

void startApp();