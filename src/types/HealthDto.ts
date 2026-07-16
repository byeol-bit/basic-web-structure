export type HealthStatus = "healthy" | "unhealthy";

export interface HealthDto {
  status: HealthStatus;
  checkedAt: string;
}