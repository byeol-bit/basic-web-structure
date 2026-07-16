import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

import { useAuthStore } from "@/stores/useAuthStore";
import type { AuthResponseDto } from "@/types/AuthDto";

// 재시도 여부를 기록할 Axios 요청 설정입니다.
interface RetryRequestConfig
  extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const baseURL = import.meta.env.VITE_API_URL;
const timeout = 10_000;

// 모든 Service에서 함께 사용할 Axios Client입니다.
const apiClient = axios.create({
  baseURL,
  timeout,

  // Refresh Token Cookie를 API 요청에 함께 전송합니다.
  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

// Token 갱신 전용 Axios Client입니다.
// 일반 apiClient와 분리해 Refresh 요청이 다시 Interceptor를 타는 것을 막습니다.
const refreshClient = axios.create({
  baseURL,
  timeout,
  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

// 동시에 여러 요청이 실패해도 Refresh 요청은 하나만 실행되도록 공유합니다.
let refreshTask: Promise<AuthResponseDto> | null = null;

// 자동 Token 갱신을 수행하지 않을 인증 API인지 확인합니다.
function isAuthPath(url?: string): boolean {
  if (!url) {
    return false;
  }

  return [
    "/auth/login",
    "/auth/refresh",
    "/auth/logout",
  ].some((path) => url.includes(path));
}

// Refresh Cookie를 사용해 새로운 Access Token을 요청합니다.
function getNewAuth(): Promise<AuthResponseDto> {
  // 이미 Refresh 요청이 실행 중이면 같은 결과를 함께 기다립니다.
  if (refreshTask) {
    return refreshTask;
  }

  refreshTask = refreshClient
    .post<AuthResponseDto>("/auth/refresh")
    .then((response) => response.data)
    .finally(() => {
      // 요청이 끝나면 다음 Refresh 요청을 받을 수 있도록 초기화합니다.
      refreshTask = null;
    });

  return refreshTask;
}

// API 요청 직전에 현재 Access Token을 Header에 추가합니다.
apiClient.interceptors.request.use((config) => {
  const accessToken =
    useAuthStore.getState().accessToken;

  // 로그인하지 않은 상태에서는 Authorization Header를 추가하지 않습니다.
  if (!accessToken) {
    return config;
  }

  config.headers.Authorization =
    `Bearer ${accessToken}`;

  return config;
});

// Access Token 만료로 401이 발생하면 Token을 갱신하고 원래 요청을 재실행합니다.
apiClient.interceptors.response.use(
  // 정상 응답은 별도 처리 없이 그대로 반환합니다.
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest =
      error.config as RetryRequestConfig | undefined;

    const isUnauthorized =
      error.response?.status === 401;

    // 401이 아니거나 요청 정보가 없으면 원래 오류를 반환합니다.
    if (!isUnauthorized || !originalRequest) {
      return Promise.reject(error);
    }

    // 로그인 실패나 Refresh 실패는 자동 Token 갱신 대상으로 처리하지 않습니다.
    if (isAuthPath(originalRequest.url)) {
      return Promise.reject(error);
    }

    // 이미 한 번 재시도한 요청은 다시 Refresh하지 않습니다.
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      // Refresh Cookie로 새로운 인증 정보를 발급받습니다.
      const auth = await getNewAuth();

      // 새 Access Token과 사용자 정보를 메모리에 저장합니다.
      useAuthStore.getState().setAuth(auth);

      // apiClient로 원래 요청을 다시 실행합니다.
      // Request Interceptor가 새로운 Access Token을 Header에 넣습니다.
      return apiClient(originalRequest);
    } catch (refreshError) {
      // Refresh Token까지 만료되었다면 인증 상태를 제거합니다.
      useAuthStore.getState().clearAuth();

      return Promise.reject(refreshError);
    }
  },
);

export default apiClient;