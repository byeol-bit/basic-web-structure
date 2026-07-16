import type { UserDto } from "@/types/UserDto";

interface MockAccount {
  userId: string;
  password: string;
}

// 역할별 로그인 테스트에 사용할 계정입니다.
export const mockAccounts: MockAccount[] = [
  {
    userId: "admin",
    password: "1234",
  },
  {
    userId: "operator01",
    password: "1234",
  },
  {
    userId: "viewer01",
    password: "1234",
  },
];

// 사용자 목록과 인증 테스트에 사용할 데이터입니다.
export const mockUsers: UserDto[] = [
  {
    id: "USR001",
    name: "김관리",
    userId: "admin",
    role: "administrator",
    status: "active",
    createdAt: "2026-07-01T09:00:00.000Z",
  },
  {
    id: "USR002",
    name: "이운영",
    userId: "operator01",
    role: "operator",
    status: "active",
    createdAt: "2026-07-02T10:30:00.000Z",
  },
  {
    id: "USR003",
    name: "박운영",
    userId: "operator02",
    role: "operator",
    status: "active",
    createdAt: "2026-07-03T11:20:00.000Z",
  },
  {
    id: "USR004",
    name: "최조회",
    userId: "viewer01",
    role: "viewer",
    status: "active",
    createdAt: "2026-07-04T13:10:00.000Z",
  },
  {
    id: "USR005",
    name: "정조회",
    userId: "viewer02",
    role: "viewer",
    status: "inactive",
    createdAt: "2026-07-05T15:40:00.000Z",
  },
  {
    id: "USR006",
    name: "강조회",
    userId: "viewer03",
    role: "viewer",
    status: "active",
    createdAt: "2026-07-06T09:20:00.000Z",
  },
  {
    id: "USR007",
    name: "윤조회",
    userId: "viewer04",
    role: "viewer",
    status: "active",
    createdAt: "2026-07-07T10:40:00.000Z",
  },
  {
    id: "USR008",
    name: "장조회",
    userId: "viewer05",
    role: "viewer",
    status: "inactive",
    createdAt: "2026-07-08T11:30:00.000Z",
  },
  {
    id: "USR009",
    name: "임조회",
    userId: "viewer06",
    role: "viewer",
    status: "active",
    createdAt: "2026-07-09T14:10:00.000Z",
  },
  {
    id: "USR010",
    name: "한조회",
    userId: "viewer07",
    role: "viewer",
    status: "active",
    createdAt: "2026-07-10T16:20:00.000Z",
  },
];