// 개발 환경에서 Mock 사용이 설정된 경우에만 MSW를 시작
export async function startMock() {
  const canStart =
    import.meta.env.DEV &&
    import.meta.env.VITE_USE_MOCK === "true";

  // 개발모드이고, VITE_USE_MOCK=true일때만 실행
  if (!canStart) {
    return;
  }

  const { worker } = await import("@/mocks/browser");

  await worker.start({
    // 등록하지 않은 요청은 에러로 처리합니다.
    onUnhandledRequest: "error",
  });
}