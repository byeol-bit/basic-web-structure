import {
  delay,
  http,
  HttpResponse,
} from "msw";

// 시스템 정상 상태를 반환합니다.
const getHealth = http.get(
  "/api/health",
  async () => {
    // 실제 서버 요청과 비슷하게 잠시 기다린 후 응답합니다.
    await delay(500);

    return HttpResponse.json({
      status: "healthy",
      checkedAt: new Date().toISOString(),
    });
  },
);

// Health 도메인에서 사용하는 Handler 목록입니다.
export const healthHandlers = [
  getHealth,
];