import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import PageHeader from "@/components/common/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/utils/cn";

type LibraryStatus = "current" | "development" | "planned";

interface LibraryItem {
  name: string;
  version?: string;
  textKey: string;
  status: LibraryStatus;
}

interface LibraryGroup {
  key: string;
  titleKey: string;
  descriptionKey: string;
  items: LibraryItem[];
}

// 프로젝트에서 현재 사용하거나 도입할 라이브러리를 영역별로 관리합니다.
const libraryGroups: LibraryGroup[] = [
  {
    key: "core",
    titleKey: "libraries.groups.core.title",
    descriptionKey: "libraries.groups.core.description",
    items: [
      { name: "React", version: "19", textKey: "libraries.items.react", status: "current" },
      { name: "TypeScript", version: "6", textKey: "libraries.items.typescript", status: "current" },
      { name: "Vite", version: "8", textKey: "libraries.items.vite", status: "current" },
    ],
  },
  {
    key: "ui",
    titleKey: "libraries.groups.ui.title",
    descriptionKey: "libraries.groups.ui.description",
    items: [
      { name: "Tailwind CSS", version: "4", textKey: "libraries.items.tailwind", status: "current" },
      { name: "shadcn/ui + Base UI", textKey: "libraries.items.shadcn", status: "current" },
      { name: "Lucide React", textKey: "libraries.items.lucide", status: "current" },
      { name: "clsx + tailwind-merge", textKey: "libraries.items.classTools", status: "current" },
      { name: "Class Variance Authority", textKey: "libraries.items.cva", status: "current" },
      { name: "Geist Variable Font", textKey: "libraries.items.geist", status: "current" },
      { name: "tw-animate-css", textKey: "libraries.items.animate", status: "current" },
      { name: "Apache ECharts", textKey: "libraries.items.echarts", status: "planned" },
    ],
  },
  {
    key: "data",
    titleKey: "libraries.groups.data.title",
    descriptionKey: "libraries.groups.data.description",
    items: [
      { name: "Zustand", version: "5", textKey: "libraries.items.zustand", status: "current" },
      { name: "TanStack Query", version: "5", textKey: "libraries.items.query", status: "current" },
      { name: "Axios", version: "1", textKey: "libraries.items.axios", status: "current" },
      { name: "MSW", version: "2", textKey: "libraries.items.msw", status: "development" },
      { name: "SignalR", textKey: "libraries.items.signalr", status: "planned" },
    ],
  },
  {
    key: "app",
    titleKey: "libraries.groups.app.title",
    descriptionKey: "libraries.groups.app.description",
    items: [
      { name: "React Router", version: "8", textKey: "libraries.items.router", status: "current" },
      { name: "i18next", version: "26", textKey: "libraries.items.i18n", status: "current" },
      { name: "TanStack Table", version: "8", textKey: "libraries.items.table", status: "current" },
    ],
  },
];

// 라이브러리 상태에 맞는 Badge 스타일을 반환합니다.
function getStatusClass(status: LibraryStatus) {
  return cn(
    "rounded-full px-2.5 py-1 text-xs font-bold",
    status === "current" && "bg-brand-soft text-brand",
    status === "development" && "bg-panel-soft text-sub",
    status === "planned" && "border border-dashed border-line text-sub",
  );
}

// 현재 사용하는 라이브러리와 도입 예정 기술의 역할을 설명합니다.
function LibrariesPage() {
  const { t } = useTranslation();

  const [openGroupKey, setOpenGroupKey] = useState<string | null>(libraryGroups[0].key);

  function toggleGroup(groupKey: string) {
    setOpenGroupKey((currentKey) =>
      currentKey === groupKey ? null : groupKey,
    );
  }

  return (
    <section>
      <PageHeader
        category={t("libraries.category")}
        title={t("libraries.title")}
        description={t("libraries.description")}
      />

      <div className="grid gap-4">
        {libraryGroups.map((group) => {
          const isOpen = openGroupKey === group.key;

          return (
            <Card
              key={group.key}
              className="overflow-hidden py-0 shadow-sm"
            >
              {/* 카드 제목 영역을 누르면 하위 라이브러리 목록을 열고 닫습니다. */}
              <button
                type="button"
                className="w-full text-left"
                aria-expanded={isOpen}
                onClick={() => toggleGroup(group.key)}
              >
                <CardHeader className="flex flex-row items-center justify-between gap-4 py-5">
                  <div className="min-w-0">
                    <CardTitle>
                      {t(group.titleKey)}
                    </CardTitle>

                    <CardDescription className="mt-1">
                      {t(group.descriptionKey)}
                    </CardDescription>
                  </div>

                  <ChevronDown
                    className={cn(
                      "size-5 shrink-0 text-sub transition-transform duration-200",
                      isOpen && "rotate-180 text-brand",
                    )}
                  />
                </CardHeader>
              </button>

              {/* 펼쳐진 그룹의 하위 라이브러리만 화면에 표시합니다. */}
              {isOpen && (
                <CardContent className="grid gap-3 border-t border-line py-5">
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      className="rounded-lg border border-line bg-panel-soft p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-main">
                            {item.name}
                          </h3>

                          {item.version && (
                            <span className="text-xs font-semibold text-sub">
                              v{item.version}
                            </span>
                          )}
                        </div>

                        <span className={getStatusClass(item.status)}>
                          {t(`libraries.status.${item.status}`)}
                        </span>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-sub">
                        {t(item.textKey)}
                      </p>
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export default LibrariesPage;