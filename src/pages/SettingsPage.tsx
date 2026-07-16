import { useTranslation } from "react-i18next";

import PageEmptyCard from "@/components/common/PageEmptyCard";
import PageHeader from "@/components/common/PageHeader";

function SettingsPage() {
  const { t } = useTranslation();

  return (
    <section>
      <PageHeader
        category={t("settings.category")}
        title={t("settings.title")}
        description={t("settings.description")}
      />

      <PageEmptyCard
        message={t("settings.emptyMessage")}
      />
    </section>
  );
}

export default SettingsPage;