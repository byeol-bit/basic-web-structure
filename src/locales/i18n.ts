import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "@/locales/en/common.json";
import koCommon from "@/locales/ko/common.json";

export type AppLanguage = "ko" | "en";

const languageKey = "basic-web-language";

// 브라우저에 저장된 언어를 읽습니다.
// 저장된 언어가 없으면 한국어를 사용합니다.
function loadLanguage(): AppLanguage {
  const savedLanguage = localStorage.getItem(languageKey);

  return savedLanguage === "en" ? "en" : "ko";
}

// React 컴포넌트에서 번역 기능을 사용할 수 있도록 초기화합니다.
void i18n
  .use(initReactI18next)
  .init({
    resources: {
      ko: {
        common: koCommon,
      },
      en: {
        common: enCommon,
      },
    },

    lng: loadLanguage(),
    fallbackLng: "ko",
    supportedLngs: ["ko", "en"],

    defaultNS: "common",
    ns: ["common"],

    interpolation: {
      // React가 기본적으로 문자열을 안전하게 처리하므로 추가 Escape를 하지 않습니다.
      escapeValue: false,
    },
  });

// 사용자가 선택한 언어를 적용하고 브라우저에 저장합니다.
export function setLanguage(language: AppLanguage) {
  localStorage.setItem(languageKey, language);

  return i18n.changeLanguage(language);
}

export default i18n;