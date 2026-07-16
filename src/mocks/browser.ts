import { setupWorker } from "msw/browser";

import { handlers } from "@/mocks/handlers";

// 브라우저 요청을 가로채 handlers의 Mock 응답을 반환
export const worker = setupWorker(...handlers);