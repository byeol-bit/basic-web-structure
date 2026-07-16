import { useTranslation } from "react-i18next";

import PageEmptyCard from "@/components/common/PageEmptyCard";
import PageHeader from "@/components/common/PageHeader";

function HistoryPage() {
  const { t } = useTranslation();

  return (
    <section>
      <PageHeader
        category={t("history.category")}
        title={t("history.title")}
        description={t("history.description")}
      />

      <PageEmptyCard
        message={t("history.emptyMessage")}
      />
    </section>
  );
}

export default HistoryPage;