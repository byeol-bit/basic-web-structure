import { useQuery } from "@tanstack/react-query";

import HealthService from "@/services/HealthService";

// Health API를 다시 호출할 간격
const HEALTH_CHECK_TIME = 10_000;

function useHealth() {
  return useQuery({
    queryKey: ["health"],
    queryFn: HealthService.getHealth,

    // 최초 조회 이후 HEALTH_CHECK_TIME마다 Health 상태를 다시 확인함
    refetchInterval: HEALTH_CHECK_TIME,

    // 브라우저 탭이 비활성 상태여도 Health 확인을 계속함
    refetchIntervalInBackground: true,

    // 화면으로 돌아올 때 주기 외의 추가 요청을 발생시키지 않음
    refetchOnWindowFocus: false,

    // 실패 시 즉시 반복하지 않고 다음 주기에 다시 확인
    retry: false,
  });
}

export default useHealth;