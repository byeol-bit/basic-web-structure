import { useEffect, type ReactNode } from "react";
import { useThemeStore } from "@/stores/useThemeStore";

interface ThemeProviderProps {
  children: ReactNode;
}

// Store에서 선택된 테마를 실제 HTML 문서에 적용합니다.
// 사용자가 선택한 값은 브라우저 저장소에 함께 저장합니다.
function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    // CSS에서 data-theme 값을 기준으로 Light/Dark 색상을 선택합니다.
    document.documentElement.dataset.theme = theme;

    // 프로그램을 다시 실행해도 선택한 테마가 유지되도록 저장합니다.
    localStorage.setItem("basic-web-theme", theme);
  }, [theme]);

  return children;
}

export default ThemeProvider;