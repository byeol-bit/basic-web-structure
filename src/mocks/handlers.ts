import { authHandlers } from "@/mocks/handlers/authHandlers";
import { healthHandlers } from "@/mocks/handlers/healthHandlers";
import { userHandlers } from "@/mocks/handlers/userHandlers";

// 도메인별 Handler를 MSW에 전달할 하나의 목록으로 합칩니다.
export const handlers = [
  ...healthHandlers,
  ...userHandlers,
  ...authHandlers,
];