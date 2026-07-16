import type { UserDto } from "@/types/UserDto";

export interface LoginRequestDto {
  id: string;
  password: string;
}

// 로그인 또는 Token 재발급 성공 시 받을 인증 정보입니다.
export interface AuthResponseDto {
  accessToken: string;
  user: UserDto;
}