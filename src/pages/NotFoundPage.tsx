import {
  ArrowLeft,
  FileQuestion,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

function NotFoundPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // 사용자를 Dashboard 첫 화면으로 이동시킵니다.
  function goHome() {
    navigate("/", {
      replace: true,
    });
  }

  return (
    <section className="flex min-h-[60vh] items-center justify-center">
      <Card className="w-full max-w-lg shadow-sm">
        <CardContent className="flex flex-col items-center px-8 py-12 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-brand-soft text-brand">
            <FileQuestion className="size-7" />
          </div>

          <strong className="mt-6 text-6xl font-bold tracking-tight text-brand">
            {t("notFound.code")}
          </strong>

          <h1 className="mt-4 text-xl font-semibold text-main">
            {t("notFound.title")}
          </h1>

          <p className="mt-2 max-w-sm text-sm leading-6 text-sub">
            {t("notFound.description")}
          </p>

          <Button
            type="button"
            className="mt-8 h-11 px-5"
            onClick={goHome}
          >
            <ArrowLeft className="size-4" />
            {t("notFound.backHome")}
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}

export default NotFoundPage;