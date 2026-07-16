import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import SidebarNavItem from "@/components/layout/SidebarNavItem";
import { Button } from "@/components/ui/button";
import {
  canOpen,
  type AppPath,
} from "@/config/access";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/utils/cn";

interface SidebarProps {
  isClosed: boolean;
  onToggle: () => void;
}

interface MenuItem {
  key: string;
  labelKey: string;
  mark: string;
  to: AppPath;
}

// Sidebar에서 사용할 주 메뉴입니다.
const menuItems: MenuItem[] = [
  {
    key: "dashboard",
    labelKey: "menu.dashboard",
    mark: "D",
    to: "/",
  },
  {
    key: "users",
    labelKey: "menu.users",
    mark: "U",
    to: "/users",
  },
  {
    key: "monitor",
    labelKey: "menu.monitor",
    mark: "M",
    to: "/monitor",
  },
  {
    key: "history",
    labelKey: "menu.history",
    mark: "H",
    to: "/history",
  },
];

// 프로젝트 구조와 라이브러리 안내 메뉴입니다.
const guideItems: MenuItem[] = [
  {
    key: "structure",
    labelKey: "menu.structure",
    mark: "F",
    to: "/structure",
  },
  {
    key: "libraries",
    labelKey: "menu.libraries",
    mark: "L",
    to: "/libraries",
  },
];

// 화면 왼쪽에서 현재 사용자가 접근할 수 있는 메뉴를 보여줍니다.
function Sidebar({
  isClosed,
  onToggle,
}: SidebarProps) {
  const { t } = useTranslation();

  const user = useAuthStore(
    (state) => state.user,
  );

  const toggleText = isClosed
    ? t("sidebar.open")
    : t("sidebar.close");

  // 로그인하지 않은 사용자는 조회자와 같은 주 메뉴를 표시합니다.
  const visibleMenuItems =
    menuItems.filter((item) =>
      canOpen(user?.role, item.to),
    );

  // 로그인하지 않은 사용자는 조회자와 같은 안내 메뉴를 표시합니다.
  const visibleGuideItems =
    guideItems.filter((item) =>
      canOpen(user?.role, item.to),
    );

  // 설정 메뉴는 관리자처럼 권한이 있는 사용자에게만 표시합니다.
  const canOpenSettings =
    canOpen(
      user?.role,
      "/settings",
    );

  return (
    <aside className="relative h-full min-h-0 border-r border-line bg-side text-side-text">
      {/* Sidebar 오른쪽 경계에서 접기와 펼치기를 제어합니다. */}
      <div className="absolute -right-4 top-1/2 z-20 -translate-y-1/2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={toggleText}
          title={toggleText}
          onClick={onToggle}
          className="rounded-full bg-panel shadow-sm"
        >
          {isClosed ? (
            <ChevronRight />
          ) : (
            <ChevronLeft />
          )}
        </Button>
      </div>

      {/* 접는 과정에서 글자가 Sidebar 밖으로 나오지 않게 합니다. */}
      <div
        className={cn(
          "flex h-full flex-col overflow-hidden",
          isClosed ? "p-3" : "p-4",
        )}
      >
        <p
          className={cn(
            "mb-3 px-3 text-xs font-bold tracking-wider text-side-sub",
            isClosed && "sr-only",
          )}
        >
          {t("menu.title_1")}
        </p>

        <nav className="flex min-h-0 flex-1 flex-col">
          {/* 현재 역할로 접근 가능한 주 메뉴입니다. */}
          <ul className="space-y-1">
            {visibleMenuItems.map((item) => (
              <SidebarNavItem
                key={item.key}
                to={item.to}
                label={t(item.labelKey)}
                mark={item.mark}
                isClosed={isClosed}
              />
            ))}
          </ul>

          {/* 접근 가능한 안내 메뉴가 있을 때만 구역을 표시합니다. */}
          {visibleGuideItems.length > 0 && (
            <div className="mt-8 border-t border-line pt-4">
              <p
                className={cn(
                  "mb-3 px-3 text-xs font-bold tracking-wider text-side-sub",
                  isClosed && "sr-only",
                )}
              >
                {t("menu.title_2")}
              </p>

              <ul className="space-y-1">
                {visibleGuideItems.map((item) => (
                  <SidebarNavItem
                    key={item.key}
                    to={item.to}
                    label={t(item.labelKey)}
                    mark={item.mark}
                    isClosed={isClosed}
                  />
                ))}
              </ul>
            </div>
          )}

          {/* 권한이 있을 때만 설정 메뉴를 표시합니다. */}
          {canOpenSettings && (
            <ul className="mt-auto border-t border-line pt-4">
              <SidebarNavItem
                to="/settings"
                label={t("menu.settings")}
                mark="S"
                isClosed={isClosed}
              />
            </ul>
          )}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;