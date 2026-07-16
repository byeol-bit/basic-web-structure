import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// 조건에 따라 Tailwind 클래스를 조합하고,
// 서로 충돌하는 클래스가 있으면 마지막 클래스를 적용합니다.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}