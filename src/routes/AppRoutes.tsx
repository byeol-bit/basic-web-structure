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

// URL과 화면을 연결하고 Guest 또는 사용자 역할에 따라 접근을 검사합니다.
function AppRoutes() {
  return (
    <Routes>
      {/* 로그인 화면은 AppLayout 밖에서 표시합니다. */}
      <Route
        path="login"
        element={<LoginPage />}
      />

      {/* AppLayout은 로그인하지 않은 사용자에게도 표시합니다. */}
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

        {/* 로그인했지만 권한이 없으면 표시합니다. */}
        <Route
          path="forbidden"
          element={<ForbiddenPage />}
        />

        {/* 등록되지 않은 주소를 표시합니다. */}
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;