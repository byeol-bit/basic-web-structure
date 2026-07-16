import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/stores/useThemeStore";

// 현재 테마의 반대 모드로 변경하는 버튼입니다.
function ThemeButton() {
  const { t } = useTranslation();

  const theme = useThemeStore((state) => state.theme);
  const changeTheme = useThemeStore((state) => state.changeTheme);

  const nextTheme = theme === "light" ? "dark" : "light";

  // 버튼이 실행할 다음 테마를 접근성 문구로 표시합니다.
  const nextThemeText =
    nextTheme === "light"
      ? t("theme.changeToLight")
      : t("theme.changeToDark");

  // 현재 테마의 반대 모드로 변경합니다.
  function changeNextTheme() {
    changeTheme(nextTheme);
  }

  return (
    <Button
      type="button"
      size="icon-lg"
      variant="outline"
      className="size-10"
      title={nextThemeText}
      aria-label={nextThemeText}
      onClick={changeNextTheme}
    >
      {nextTheme === "light" ? (
        <Sun className="size-5 text-brand" />
      ) : (
        <Moon className="size-5 text-brand" />
      )}

      <span className="sr-only">
        {nextThemeText}
      </span>
    </Button>
  );
}

export default ThemeButton;