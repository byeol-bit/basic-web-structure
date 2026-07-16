import { useTranslation } from "react-i18next";

import PageEmptyCard from "@/components/common/PageEmptyCard";
import PageHeader from "@/components/common/PageHeader";

function MonitorPage() {
  const { t } = useTranslation();

  return (
    <section>
      <PageHeader
        category={t("monitor.category")}
        title={t("monitor.title")}
        description={t("monitor.description")}
      />

      <PageEmptyCard
        message={t("monitor.emptyMessage")}
      />
    </section>
  );
}

export default MonitorPage;