import type { UserRole } from "@/types/UserDto";

// 권한 검사를 적용할 애플리케이션 경로
export type AppPath =
  | "/"
  | "/users"
  | "/monitor"
  | "/history"
  | "/settings"
  | "/structure"
  | "/libraries";

  // 비로그인 사용자는 조회자와 같은 화면 접근 권한을 사용합니다.
  const guestRole: UserRole = "viewer";

  // 사용자 역할별로 접근할 수 있는 화면을 정의합니다.
const pathsByRole: Record<UserRole, readonly AppPath[]> = {
  administrator: [
    "/",
    "/users",
    "/monitor",
    "/history",
    "/settings",
    "/structure",
    "/libraries",
  ],

  operator: [
    "/",
    "/monitor",
    "/history",
    "/structure",
    "/libraries",
  ],

  viewer: [
    "/",
    "/monitor",
    "/structure",
    "/libraries",
  ],
};

export function canOpen(
  role: UserRole | null | undefined,
  path: AppPath,
): boolean {
  const currentRole = role ?? guestRole;

  return pathsByRole[currentRole].includes(path);
}