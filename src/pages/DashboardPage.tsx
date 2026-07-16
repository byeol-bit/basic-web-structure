import { useTranslation } from "react-i18next";

import PageHeader from "@/components/common/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useHealth from "@/hooks/useHealth";
import { cn } from "@/utils/cn";
import { formatDateTime } from "@/utils/date";

// 대시보드에 표시할 임시 요약 정보와 번역 키입니다.
const summaryItems = [
  {
    key: "users",
    labelKey: "dashboard.totalUsers",
    value: "1,248",
    change: "+12%",
  },
  {
    key: "devices",
    labelKey: "dashboard.activeDevices",
    value: "328",
    change: "+5%",
  },
  {
    key: "alerts",
    labelKey: "dashboard.openAlerts",
    value: "14",
    change: "-3%",
  },
];

function DashboardPage() {
  const { t, i18n } = useTranslation();

  // tanstack query 설명용으로 남겨놓은 코드
  const { data: health, isPending, isError } = useHealth();

  const isHealthy = health?.status === "healthy";

  const healthText = isPending
    ? t("dashboard.healthLoading")
    : isError
      ? t("dashboard.healthError")
      : isHealthy
        ? t("dashboard.healthHealthy")
        : t("dashboard.healthUnhealthy");

  const checkedAtText = formatDateTime(health?.checkedAt, i18n.resolvedLanguage);

  return (
    <section>
      {/* 현재 페이지의 이름과 설명을 보여줍니다. */}
      <PageHeader
        category={t("dashboard.category")}
        title={t("dashboard.title")}
        description={t("dashboard.description")}
      />

      {/* 실제 API 상태와 주요 요약 정보를 함께 표시합니다. */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="shadow-sm">
          <CardHeader className="pb-0">
            <CardDescription>
              {t("dashboard.healthTitle")}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex items-end justify-between gap-4">
            <div>
              <strong
                className={cn(
                  "text-2xl font-bold",
                  isPending && "text-sub",
                  isError && "text-destructive",
                  !isPending &&
                    !isError &&
                    isHealthy &&
                    "text-brand",
                  !isPending &&
                    !isError &&
                    !isHealthy &&
                    "text-destructive",
                )}
              >
                {healthText}
              </strong>

              <p className="mt-1 text-xs text-sub">
                {checkedAtText}
              </p>
            </div>

            {/* 상태를 빠르게 구분할 수 있도록 작은 표시점을 제공합니다. */}
            <span
              className={cn(
                "size-3 rounded-full",
                isPending && "animate-pulse bg-muted-foreground",
                isError && "bg-destructive",
                !isPending &&
                  !isError &&
                  isHealthy &&
                  "bg-brand",
                !isPending &&
                  !isError &&
                  !isHealthy &&
                  "bg-destructive",
              )}
            />
          </CardContent>
        </Card>

        {summaryItems.map((item) => (
          <Card
            key={item.key}
            className="shadow-sm"
          >
            <CardHeader className="pb-0">
              <CardDescription>
                {t(item.labelKey)}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex items-end justify-between">
              <strong className="text-3xl font-bold">
                {item.value}
              </strong>

              <span className="rounded-full bg-brand-soft px-2.5 py-1 text-xs font-bold text-brand">
                {item.change}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 이후 차트나 테이블이 배치될 기본 Content 영역입니다. */}
      <Card className="mt-6 min-h-80 shadow-sm">
        <CardHeader>
          <CardTitle>
            {t("dashboard.operationTitle")}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-1">
          <div className="flex min-h-56 flex-1 items-center justify-center rounded-lg border border-dashed bg-muted">
            <p className="text-sm text-muted-foreground">
              {t("dashboard.emptyMessage")}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default DashboardPage;