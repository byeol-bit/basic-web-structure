import {
  LoaderCircle,
  RefreshCw,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import PageHeader from "@/components/common/PageHeader";
import UserTable from "@/components/users/UserTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useUsers from "@/hooks/useUsers";

function UsersPage() {
  const { t } = useTranslation();

  const {data: users, isPending, isError, refetch} = useUsers();

  function reloadUsers() {
    void refetch();
  }

  return (
    <section>
      <PageHeader
        category={t("users.category")}
        title={t("users.title")}
        description={t("users.description")}
      />

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>
            {t("users.listTitle")}
          </CardTitle>

          <CardDescription>
            {t("users.listDescription")}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* 사용자 목록을 조회하는 동안 Loading 상태를 표시합니다. */}
          {isPending && (
            <div className="flex min-h-52 items-center justify-center gap-2 rounded-lg border border-dashed border-line">
              <LoaderCircle className="size-5 animate-spin text-brand" />

              <p className="text-sm text-sub">
                {t("users.loading")}
              </p>
            </div>
          )}

          {/* 사용자 목록 조회에 실패하면 재조회 기능을 표시합니다. */}
          {isError && (
            <div className="flex min-h-52 flex-col items-center justify-center gap-4 rounded-lg border border-destructive/30 bg-destructive/5">
              <p className="text-sm font-semibold text-destructive">
                {t("users.error")}
              </p>

              <Button
                type="button"
                variant="outline"
                onClick={reloadUsers}
              >
                <RefreshCw className="size-4" />
                {t("users.retry")}
              </Button>
            </div>
          )}

          {/* 조회가 완료되면 사용자 목록을 표로 표시합니다. */}
          {!isPending && !isError && (
            <UserTable users={users ?? []} />
          )}
        </CardContent>
      </Card>
    </section>
  );
}

export default UsersPage;