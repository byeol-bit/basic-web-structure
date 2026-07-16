import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router";

import { useAuthStore } from "@/stores/useAuthStore";

// 로그인한 사용자만 하위 Route에 접근할 수 있게 합니다.
function ProtectedRoute() {
  const location = useLocation();

  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated,
  );

  // 로그인하지 않았다면 원래 요청 위치를 저장하고 로그인 화면으로 이동합니다.
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;