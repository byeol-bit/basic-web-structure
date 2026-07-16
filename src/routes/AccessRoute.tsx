import type { ReactNode } from "react";
import {
  Navigate,
  useLocation,
} from "react-router";

import {
  canOpen,
  type AppPath,
} from "@/config/access";
import { useAuthStore } from "@/stores/useAuthStore";

interface AccessRouteProps {
  path: AppPath;
  children: ReactNode;
}

// 현재 사용자가 요청한 화면에 접근할 수 있는지 확인합니다.
function AccessRoute({
  path,
  children,
}: AccessRouteProps) {
  const location = useLocation();

  const user = useAuthStore(
    (state) => state.user,
  );

  // 비로그인 사용자는 조회자 권한으로 공개 페이지에 접근합니다.
  // 로그인 사용자는 실제 사용자 역할로 접근 여부를 확인합니다.
  if (canOpen(user?.role, path)) {
    return children;
  }

  // 로그인이 필요한 페이지라면 원래 위치를 저장하고 로그인 화면으로 이동합니다.
  if (!user) {
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

  // 로그인했지만 역할 권한이 없다면 403 화면으로 이동합니다.
  return (
    <Navigate
      to="/forbidden"
      replace
    />
  );
}

export default AccessRoute;