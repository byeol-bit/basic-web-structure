// API 날짜 문자열이나 Date를 화면용 날짜 문구로 변경합니다.
export function formatDateTime(
  value: string | Date | null | undefined,
  language?: string,
): string {
  // 날짜가 전달되지 않으면 빈 날짜 표시를 반환합니다.
  if (!value) {
    return "-";
  }

  const date =
    value instanceof Date
      ? value
      : new Date(value);

  // 올바르지 않은 날짜가 한 행에 포함되어도 전체 화면이 멈추지 않게 합니다.
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat(language, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}