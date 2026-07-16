import {
  ArrowLeft,
  ShieldX,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

// 권한이 없는 페이지에 접근했을 때 403 안내 화면을 표시합니다.
function ForbiddenPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // 사용자가 접근할 수 있는 Dashboard로 이동합니다.
  function goHome() {
    navigate("/", {
      replace: true,
    });
  }

  return (
    <section className="flex min-h-[60vh] items-center justify-center">
      <Card className="w-full max-w-lg shadow-sm">
        <CardContent className="flex flex-col items-center px-8 py-12 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
            <ShieldX className="size-7" />
          </div>

          <strong className="mt-6 text-6xl font-bold tracking-tight text-destructive">
            {t("forbidden.code")}
          </strong>

          <h1 className="mt-4 text-xl font-semibold text-main">
            {t("forbidden.title")}
          </h1>

          <p className="mt-2 max-w-sm text-sm leading-6 text-sub">
            {t("forbidden.description")}
          </p>

          <Button
            type="button"
            className="mt-8 h-11 px-5"
            onClick={goHome}
          >
            <ArrowLeft className="size-4" />
            {t("forbidden.backHome")}
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}

export default ForbiddenPage;