// 사용자의 역할
export type UserRole =
  | "administrator"
  | "operator"
  | "viewer";

// 사용자의 현재 사용 상태
export type UserStatus =
  | "active"
  | "inactive";

// 사용자 목록 API의 데이터 계약
export interface UserDto {
  id: string;
  name: string;
  userId: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}