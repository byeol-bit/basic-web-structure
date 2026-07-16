// Store는 “선택된 모드 값”만 관리
import {create} from "zustand";

export type ThemeMode = "light" | "dark";

interface ThemeStore {
  theme: ThemeMode;

  // 사용자가 선택한 테마를 화면과 브라우저 저장소에 반영합니다.
  changeTheme: (theme: ThemeMode) => void; 
}

const storageKey = "basic-web-theme";

// 브라우저에 저장된 테마를 읽습니다.
// 저장된 값이 없거나 올바르지 않으면 Light 모드를 사용합니다.
function loadTheme(): ThemeMode {
  const savedTheme = localStorage.getItem(storageKey);

  return savedTheme === "dark" ? "dark" : "light";
}

// 전체 화면에서 공유하는 테마 상태입니다.
export const useThemeStore = create<ThemeStore>((set) => ({
  theme: loadTheme(),

  changeTheme: (theme) => {
    set({ theme });
  },
}));