import apiClient from "@/api/apiClient";
import type {
  AuthResponseDto,
  LoginRequestDto,
} from "@/types/AuthDto";
import type { UserDto } from "@/types/UserDto";

async function login(
  request: LoginRequestDto,
): Promise<AuthResponseDto> {
  const response = await apiClient.post<AuthResponseDto>(
    "/auth/login",
    request,
  );

  return response.data;
}

async function refresh(): Promise<AuthResponseDto> {
  const response = await apiClient.post<AuthResponseDto>(
    "/auth/refresh",
  );

  return response.data;
}

// 현재 Access Token에 해당하는 사용자 정보를 조회합니다.
async function getMe(): Promise<UserDto> {
  const response = await apiClient.get<UserDto>(
    "/auth/me",
  );

  return response.data;
}

async function logout(): Promise<void> {
  await apiClient.post("/auth/logout");
}

const AuthService = {
  login,
  refresh,
  getMe,
  logout,
};

export default AuthService;