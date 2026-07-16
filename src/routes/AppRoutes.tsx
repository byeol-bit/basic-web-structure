import {
  Route,
  Routes,
} from "react-router";

import AppLayout from "@/components/layout/AppLayout";
import DashboardPage from "@/pages/DashboardPage";
import ForbiddenPage from "@/pages/ForbiddenPage";
import HistoryPage from "@/pages/HistoryPage";
import LibrariesPage from "@/pages/LibrariesPage";
import LoginPage from "@/pages/LoginPage";
import MonitorPage from "@/pages/MonitorPage";
import NotFoundPage from "@/pages/NotFoundPage";
import SettingsPage from "@/pages/SettingsPage";
import StructurePage from "@/pages/StructurePage";
import UsersPage from "@/pages/UsersPage";
import AccessRoute from "@/routes/AccessRoute";
import ProtectedRoute from "@/routes/ProtectedRoute";

// URL과 화면을 연결하고 사용자 인증 및 권한을 검사합니다.
function AppRoutes() {
  return (
    <Routes>
      <Route
        path="login"
        element={<LoginPage />}
      />

      {/* 아래 Route는 로그인한 사용자만 접근할 수 있습니다. */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route
            index
            element={
              <AccessRoute path="/">
                <DashboardPage />
              </AccessRoute>
            }
          />

          <Route
            path="users"
            element={
              <AccessRoute path="/users">
                <UsersPage />
              </AccessRoute>
            }
          />

          <Route
            path="monitor"
            element={
              <AccessRoute path="/monitor">
                <MonitorPage />
              </AccessRoute>
            }
          />

          <Route
            path="history"
            element={
              <AccessRoute path="/history">
                <HistoryPage />
              </AccessRoute>
            }
          />

          <Route
            path="settings"
            element={
              <AccessRoute path="/settings">
                <SettingsPage />
              </AccessRoute>
            }
          />

          <Route
            path="structure"
            element={
              <AccessRoute path="/structure">
                <StructurePage />
              </AccessRoute>
            }
          />

          <Route
            path="libraries"
            element={
              <AccessRoute path="/libraries">
                <LibrariesPage />
              </AccessRoute>
            }
          />

          {/* 권한이 없는 경로는 403 화면으로 표시합니다. */}
          <Route
            path="forbidden"
            element={<ForbiddenPage />}
          />

          {/* 등록되지 않은 주소는 404 화면으로 표시합니다. */}
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;