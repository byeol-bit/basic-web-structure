import {
  delay,
  http,
  HttpResponse,
} from "msw";

import { getAccessUser } from "@/mocks/handlers/authHandlers";
import { mockUsers } from "@/mocks/mockData";

// 관리자에게 사용자 목록을 반환합니다.
const getUsers = http.get(
  "/api/users",
  async ({ request }) => {
    await delay(500);

    const user = getAccessUser(request);

    // Token이 없거나 만료되었으면 인증 갱신 대상으로 처리합니다.
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

    // 로그인했지만 관리자가 아니면 사용자 목록 접근을 거부합니다.
    if (user.role !== "administrator") {
      return HttpResponse.json(
        {
          message:
            "사용자 목록에 접근할 권한이 없습니다.",
        },
        {
          status: 403,
        },
      );
    }

    return HttpResponse.json(mockUsers);
  },
);

// 사용자 도메인에서 사용하는 Handler 목록입니다.
export const userHandlers = [
  getUsers,
];