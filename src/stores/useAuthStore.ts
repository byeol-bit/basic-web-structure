import { create } from "zustand";

import type { AuthResponseDto } from "@/types/AuthDto";
import type { UserDto } from "@/types/UserDto";

interface AuthStore {
  // API 요청에 사용할 짧은 수명의 JWT입니다.
  accessToken: string | null;

  // 현재 로그인한 사용자 정보입니다.
  user: UserDto | null;

  // 현재 사용자의 로그인 여부입니다.
  isAuthenticated: boolean;

  // 앱 시작 시 인증 복원 확인이 끝났는지를 나타냅니다.
  isReady: boolean;

  // 로그인 또는 Token 재발급 결과를 Store에 저장합니다.
  setAuth: (auth: AuthResponseDto) => void;

  // 인증 정보를 제거하고 로그아웃 상태로 변경합니다.
  clearAuth: () => void;
}

// 앱 전체에서 공유하는 사용자 인증 상태입니다.
// Access Token은 브라우저 저장소에 남기지 않고 메모리에서만 관리합니다.
export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  user: null,
  isAuthenticated: false,
  isReady: false,

  setAuth: (auth) => {
    set({
      accessToken: auth.accessToken,
      user: auth.user,
      isAuthenticated: true,
      isReady: true,
    });
  },

  clearAuth: () => {
    set({
      accessToken: null,
      user: null,
      isAuthenticated: false,
      isReady: true,
    });
  },
}));