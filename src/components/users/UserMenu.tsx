import { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import {
  ChevronDown,
  LoaderCircle,
  LogOut,
  Settings,
  UserRound,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AuthService from "@/services/AuthService";
import { useAuthStore } from "@/stores/useAuthStore";
import { canOpen } from "@/config/access";

// 현재 사용자 정보와 계정 관련 메뉴를 표시합니다.
function UserMenu() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const userName = user?.name ?? "-";
  const userId = user?.userId ?? "-";

  const canOpenSettings = user
    ? canOpen(user.role, "/settings")
    : false;
  const userRole = user
    ? t(`users.roles.${user.role}`)
    : "-";

  // 사용자 이미지가 없으면 이름의 첫 글자를 표시합니다.
  const userInitial =
    user?.name.trim().charAt(0).toUpperCase() || "U";

  const logoutText = isLoggingOut
    ? t("auth.loggingOut")
    : t("auth.logout");

  // 시스템 설정 페이지로 이동합니다.
  function openSettings() {
    navigate("/settings");
  }

  // 서버와 클라이언트에 저장된 인증 정보를 제거합니다.
  async function logout() {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);

    try {
      // 서버의 Refresh Token Cookie를 제거합니다.
      await AuthService.logout();

      // 이전 사용자에게 속한 서버 조회 캐시를 제거합니다.
      queryClient.clear();

      // 메모리의 Access Token과 사용자 정보를 제거합니다.
      clearAuth();

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      // 서버 로그아웃 실패 시 현재 인증 상태를 유지합니다.
      console.error("Logout failed.", error);
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <DropdownMenu>
      {/* 사용자 정보 전체를 계정 메뉴 버튼으로 사용합니다. */}
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            className="group flex min-h-12 items-center gap-3 rounded-xl border border-transparent px-3 py-2 outline-none transition-all hover:border-line hover:bg-panel-soft focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20 data-popup-open:border-line data-popup-open:bg-panel-soft"
            aria-label={t("auth.accountMenu")}
          />
        }
      >
        <div className="min-w-24 text-right">
          <p className="truncate text-sm font-semibold leading-5 text-main">
            {userName}
          </p>

          <p className="truncate text-xs leading-4 text-sub">
            {userRole}
          </p>
        </div>

        <Avatar
          size="lg"
          className="ring-2 ring-line"
        >
          <AvatarFallback className="bg-brand-soft font-bold text-brand">
            {userInitial}
          </AvatarFallback>
        </Avatar>

        <ChevronDown className="size-4 text-sub transition-transform duration-200 group-data-[popup-open]:rotate-180" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-60 p-2 shadow-xl"
      >
        {/* 현재 로그인한 사용자의 상세 정보를 표시합니다. */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="p-3">
            <div className="flex items-center gap-3">
              <Avatar className="size-11 ring-2 ring-line">
                <AvatarFallback className="bg-brand-soft font-bold text-brand">
                  {userInitial}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold leading-5 text-main">
                  {userName}
                </p>

                <p className="truncate text-xs font-normal leading-5 text-sub">
                  {userId}
                </p>

                <p className="truncate text-xs font-medium leading-5 text-brand">
                  {userRole}
                </p>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-2" />

        {/* 계정 관련 메뉴를 표시합니다. */}
        <DropdownMenuGroup>
          {/* 프로필 페이지 구현 전까지 비활성화합니다. */}
          <DropdownMenuItem
            disabled
            className="h-10 gap-3 px-3"
          >
            <UserRound className="size-4" />
            {t("auth.profile")}
          </DropdownMenuItem>

          {canOpenSettings && (
            <DropdownMenuItem
              className="h-10 gap-3 px-3"
              onClick={openSettings}
            >
              <Settings className="size-4" />
              {t("menu.settings")}
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-2" />

        {/* 현재 계정에서 로그아웃합니다. */}
        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="destructive"
            className="h-10 gap-3 px-3"
            disabled={isLoggingOut}
            onClick={() => {
              void logout();
            }}
          >
            {isLoggingOut ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <LogOut className="size-4" />
            )}

            {logoutText}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;