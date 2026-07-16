import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import LanguageSelect from "@/components/common/LanguageSelect";
import ThemeButton from "@/components/common/ThemeButton";
import UserMenu from "@/components/users/UserMenu";

// 상단에서 브랜드, 화면 설정과 사용자 계정 메뉴를 표시합니다.
function TopNav() {
  const { t } = useTranslation();

  return (
    <header className="flex h-16 items-center justify-between border-b border-line bg-panel px-6">
      {/* 브랜드를 클릭하면 Dashboard인 루트 경로로 이동합니다. */}
      <Link
        to="/"
        aria-label={t("app.name")}
        className="group flex items-center gap-3 rounded-xl px-2 py-1.5 outline-none transition-colors hover:bg-panel-soft focus-visible:ring-2 focus-visible:ring-brand/30"
      >
        <div className="flex size-10 items-center justify-center rounded-xl bg-brand text-sm font-bold text-white shadow-sm transition-transform group-hover:scale-105">
          B
        </div>

        <div>
          <h1 className="text-base font-bold leading-5 text-main">
            {t("app.name")}
          </h1>

          <p className="text-xs leading-4 text-sub">
            {t("app.description")}
          </p>
        </div>
      </Link>

      {/* 언어, 테마와 사용자 계정 설정을 표시합니다. */}
      <div className="flex items-center gap-3">
        <LanguageSelect />
        <ThemeButton />

        {/* 화면 설정과 사용자 계정 영역을 구분합니다. */}
        <div
          aria-hidden="true"
          className="mx-1 h-8 w-px bg-line"
        />

        <UserMenu />
      </div>
    </header>
  );
}

export default TopNav;