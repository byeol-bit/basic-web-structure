import { Globe2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  setLanguage,
  type AppLanguage,
} from "@/locales/i18n";

// 현재 언어를 표시하고 사용할 언어를 선택합니다.
function LanguageSelect() {
  const { t, i18n } = useTranslation();

  const language: AppLanguage =
    i18n.resolvedLanguage === "en"
      ? "en"
      : "ko";

  // 언어 선택 목록은 현재 언어에 맞게 번역합니다.
  const languageItems = [
    {
      label: t("language.korean"),
      value: "ko",
    },
    {
      label: t("language.english"),
      value: "en",
    },
  ];

  // 사용자가 선택한 언어를 앱 전체에 적용합니다.
  function selectLanguage(
    nextLanguage: string | null,
  ) {
    if (nextLanguage !== "ko" && nextLanguage !== "en") {
      return;
    }

    void setLanguage(nextLanguage);
  }

  return (
    <Select
      items={languageItems}
      value={language}
      onValueChange={selectLanguage}
    >
      <SelectTrigger
        className="h-10 w-36 bg-panel px-3"
        aria-label={t("language.select")}
      >
        <Globe2 className="size-4 text-brand" />

        <SelectValue
          placeholder={t("language.select")}
        />
      </SelectTrigger>

      <SelectContent
        alignItemWithTrigger={false}
      >
        <SelectGroup>
          {languageItems.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default LanguageSelect;