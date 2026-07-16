import type { ReactNode } from "react";
import { Navigate } from "react-router";

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
  const user = useAuthStore(
    (state) => state.user,
  );

  // 인증 정보가 올바르지 않다면 로그인 화면으로 이동합니다.
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // 로그인했지만 권한이 없다면 403 화면으로 이동합니다.
  if (!canOpen(user.role, path)) {
    return (
      <Navigate
        to="/forbidden"
        replace
      />
    );
  }

  return children;
}

export default AccessRoute;