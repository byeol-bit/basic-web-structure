import {
  delay,
  http,
  HttpResponse,
} from "msw";

import {
  mockAccounts,
  mockUsers,
} from "@/mocks/mockData";
import type {
  AuthResponseDto,
  LoginRequestDto,
} from "@/types/AuthDto";
import type { UserDto } from "@/types/UserDto";

const refreshCookieName = "refreshToken";
const refreshTokenPrefix = "mock-refresh-token-";

// 자동 갱신 테스트를 위해 Access Token을 5초 동안 유지합니다.
const accessTokenLife = 5_000;

// 현재 발급된 Access Token 상태입니다.
let accessToken = "";
let accessTokenExpiresAt = 0;
let accessUserId = "";

// 입력한 계정 정보에 해당하는 활성 사용자를 찾습니다.
function findLoginUser(
  userId: string,
  password: string,
): UserDto | undefined {
  const account = mockAccounts.find(
    (item) =>
      item.userId === userId &&
      item.password === password,
  );

  if (!account) {
    return undefined;
  }

  return mockUsers.find(
    (user) =>
      user.userId === account.userId &&
      user.status === "active",
  );
}

// 사용자 정보를 구분할 Mock Refresh Token을 만듭니다.
function makeRefreshToken(
  user: UserDto,
): string {
  return `${refreshTokenPrefix}${user.id}`;
}

// Refresh Token에 해당하는 활성 사용자를 찾습니다.
function findRefreshUser(
  refreshToken?: string,
): UserDto | undefined {
  if (
    !refreshToken ||
    !refreshToken.startsWith(
      refreshTokenPrefix,
    )
  ) {
    return undefined;
  }

  const id = refreshToken.slice(
    refreshTokenPrefix.length,
  );

  return mockUsers.find(
    (user) =>
      user.id === id &&
      user.status === "active",
  );
}

// 로그인과 Token 갱신에 사용할 인증 정보를 만듭니다.
function makeAuth(
  user: UserDto,
): AuthResponseDto {
  // 사용자와 발급 시간을 포함한 새로운 Access Token을 만듭니다.
  accessToken =
    `mock-access-token-${user.id}-${Date.now()}`;

  accessTokenExpiresAt =
    Date.now() + accessTokenLife;

  accessUserId = user.id;

  return {
    accessToken,
    user,
  };
}

// 요청에 포함된 Access Token이 유효한지 확인합니다.
function isAccessTokenValid(
  request: Request,
): boolean {
  const authorization =
    request.headers.get("Authorization");

  const hasValidToken =
    authorization ===
    `Bearer ${accessToken}`;

  const isNotExpired =
    Date.now() < accessTokenExpiresAt;

  return hasValidToken && isNotExpired;
}

// Access Token이 유효하면 현재 사용자를 반환합니다.
// 사용자 API에서도 동일한 권한 검사를 사용하기 위해 공개합니다.
export function getAccessUser(
  request: Request,
): UserDto | undefined {
  if (!isAccessTokenValid(request)) {
    return undefined;
  }

  return mockUsers.find(
    (user) =>
      user.id === accessUserId &&
      user.status === "active",
  );
}

// 계정 정보를 확인하고 인증 정보를 반환합니다.
const login = http.post(
  "/api/auth/login",
  async ({ request }) => {
    await delay(500);

    const body =
      (await request.json()) as LoginRequestDto;

    const user = findLoginUser(
      body.id,
      body.password,
    );

    // 계정 정보가 다르거나 비활성 사용자이면 로그인을 거부합니다.
    if (!user) {
      return HttpResponse.json(
        {
          message:
            "아이디 또는 비밀번호가 올바르지 않습니다.",
        },
        {
          status: 401,
        },
      );
    }

    const refreshToken =
      makeRefreshToken(user);

    return HttpResponse.json(
      makeAuth(user),
      {
        headers: {
          // 개발 환경에서는 Secure를 제외합니다.
          // 실제 HTTPS Backend에서는 Secure를 추가해야 합니다.
          "Set-Cookie":
            `${refreshCookieName}=${refreshToken}; ` +
            "HttpOnly; SameSite=Lax; Path=/; Max-Age=86400",
        },
      },
    );
  },
);

// Refresh Cookie가 있으면 새로운 Access Token을 반환합니다.
const refresh = http.post(
  "/api/auth/refresh",
  async ({ cookies }) => {
    await delay(300);

    const refreshToken =
      cookies[refreshCookieName];

    const user =
      findRefreshUser(refreshToken);

    // Refresh Token이 없거나 사용자가 비활성 상태이면 갱신을 거부합니다.
    if (!user) {
      return HttpResponse.json(
        {
          message:
            "로그인 정보가 만료되었습니다.",
        },
        {
          status: 401,
        },
      );
    }

    return HttpResponse.json(
      makeAuth(user),
    );
  },
);

// 현재 Access Token의 사용자 정보를 반환합니다.
const getMe = http.get(
  "/api/auth/me",
  async ({ request }) => {
    await delay(300);

    const user =
      getAccessUser(request);

    if (!user) {
      return HttpResponse.json(
        {
          message:
            "Access Token이 만료되었습니다.",
        },
        {
          status: 401,
        },
      );
    }

    return HttpResponse.json(user);
  },
);

// Refresh Cookie를 제거하고 로그아웃합니다.
const logout = http.post(
  "/api/auth/logout",
  async () => {
    await delay(300);

    return new HttpResponse(null, {
      status: 204,
      headers: {
        "Set-Cookie":
          `${refreshCookieName}=; ` +
          "HttpOnly; SameSite=Lax; Path=/; Max-Age=0",
      },
    });
  },
);

// 인증 도메인에서 사용하는 Handler 목록입니다.
export const authHandlers = [
  login,
  refresh,
  getMe,
  logout,
];