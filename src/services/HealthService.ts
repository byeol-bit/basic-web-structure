import apiClient from "@/api/apiClient";
import type { HealthDto } from "@/types/HealthDto";

// Backend 또는 MSW에서 현재 Health 상태를 조회합니다.
async function getHealth(): Promise<HealthDto> {
  const response = await apiClient.get<HealthDto>(
    "/health",
  );

  return response.data;
}

// Health 상태와 관련된 API 기능을 제공합니다.
const HealthService = {
  getHealth,
};

export default HealthService;