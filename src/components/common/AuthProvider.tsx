import {
  useEffect,
  type ReactNode,
} from "react";

import { useQueryClient } from "@tanstack/react-query";

import AuthService from "@/services/AuthService";
import { useAuthStore } from "@/stores/useAuthStore";

interface AuthProviderProps {
  children: ReactNode;
}

// 앱 시작 시 인증을 복원하고 로그아웃 상태의 서버 캐시를 정리합니다.
function AuthProvider({
  children,
}: AuthProviderProps) {
  const queryClient = useQueryClient();

  const isReady = useAuthStore((state) => state.isReady);
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    // 브라우저를 새로고침한 경우 Cookie를 사용해 사용자 인증을 복원합니다.
    async function loadAuth() {
      try {
        const auth = await AuthService.refresh();
        setAuth(auth);
      } catch {
        // Refresh Cookie가 없거나 만료되었으면 로그아웃 상태로 시작합니다.
        clearAuth();
      }
    }

    void loadAuth();
  }, [
    clearAuth,
    setAuth,
  ]);

  useEffect(() => {
    // 인증 확인이 끝났고 로그아웃 상태라면 이전 사용자의 조회 캐시를 제거합니다.
    if (!isReady || isAuthenticated) {
      return;
    }

    queryClient.clear();
    
  }, [
    isAuthenticated,
    isReady,
    queryClient,
  ]);

  // 인증 확인이 끝나기 전에는 보호 화면을 먼저 표시하지 않습니다.
  // isReady가 필요한 이유
  // isReady=false
  // → 인증 확인 중
  // isReady=true + isAuthenticated=false
  // → 인증 확인 완료, 로그인 필요
  // isReady=true + isAuthenticated=true
  // → 인증 확인 완료, 로그인 상태
  if (!isReady) {
    return null;
  }

  return children;
}

export default AuthProvider;