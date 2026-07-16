import { LoaderCircle, LockKeyhole } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { useTranslation } from "react-i18next";
import {
  Navigate,
  useLocation,
  useNavigate,
} from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AuthService from "@/services/AuthService";
import { useAuthStore } from "@/stores/useAuthStore";
import type { LoginRequestDto } from "@/types/AuthDto";

interface LoginRouteState {
  from?: {
    pathname: string;
    search?: string;
    hash?: string;
  };
}

// 사용자 로그인과 개발 환경 자동 로그인을 처리합니다.
function LoginPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [isBusy, setIsBusy] = useState(false);

  // 자동 로그인이 여러 번 실행되지 않도록 기록합니다.
  const didAutoLogin = useRef(false);

  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated,
  );

  const setAuth = useAuthStore(
    (state) => state.setAuth,
  );

  const routeState =
    location.state as LoginRouteState | null;

  const from = routeState?.from;

  // 로그인 완료 후 사용자가 원래 요청한 주소로 이동합니다.
  const movePath =
    `${from?.pathname ?? "/"}` +
    `${from?.search ?? ""}` +
    `${from?.hash ?? ""}`;

  const canAutoLogin =
    import.meta.env.DEV &&
    import.meta.env.VITE_AUTO_ADMIN_LOGIN === "true";

  // 입력한 계정 정보를 서버로 보내고 인증 정보를 저장합니다.
  const runLogin = useCallback(
    async (request: LoginRequestDto) => {
      setIsBusy(true);
      setErrorText("");

      try {
        const auth =
          await AuthService.login(request);

        setAuth(auth);

        navigate(movePath, {
          replace: true,
        });
      } catch {
        setErrorText(
          t("auth.loginError"),
        );
      } finally {
        setIsBusy(false);
      }
    },
    [
      movePath,
      navigate,
      setAuth,
      t,
    ],
  );

  useEffect(() => {
    // 개발 환경에서 설정값이 켜져 있으면 Mock 관리자로 자동 로그인합니다.
    if (
      !canAutoLogin ||
      didAutoLogin.current
    ) {
      return;
    }

    didAutoLogin.current = true;

    void runLogin({
      id: "admin",
      password: "1234",
    });
  }, [
    canAutoLogin,
    runLogin,
  ]);

  // 로그인 Form에 입력된 계정 정보를 전송합니다.
  function submitLogin(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (isBusy) {
      return;
    }

    void runLogin({
      id,
      password,
    });
  }

  // 로그인한 사용자가 로그인 화면에 접근하면 Dashboard로 이동합니다.
  if (isAuthenticated) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-page p-6">
      {/* 배경에 Theme 색상을 사용한 은은한 강조 효과를 추가합니다. */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -left-32 size-96 rounded-full bg-brand/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute -right-40 -bottom-40 size-[30rem] rounded-full bg-brand-soft opacity-70 blur-3xl"
      />

      <Card className="relative w-full max-w-[440px] gap-0 overflow-hidden py-0 shadow-xl shadow-slate-900/5 ring-1 ring-line dark:shadow-black/20">
        <CardHeader className="items-center gap-0 px-8 pt-9 pb-7 text-center">
          {/* 로그인 화면의 목적을 나타내는 아이콘입니다. */}
          <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/20">
            <LockKeyhole className="size-6" />
          </div>

          <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-brand uppercase">
            {t("app.name")}
          </p>

          <CardTitle className="text-2xl font-bold text-main">
            {t("auth.title")}
          </CardTitle>

          <CardDescription className="mt-3 max-w-xs leading-6">
            {t("auth.description")}
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 pb-9">
          <form
            className="space-y-5"
            onSubmit={submitLogin}
          >
            {/* 사용자 아이디를 입력합니다. */}
            <div className="space-y-2">
              <label
                htmlFor="login-id"
                className="text-sm font-semibold text-main"
              >
                {t("auth.id")}
              </label>

              <Input
                id="login-id"
                type="text"
                className="h-11 bg-panel px-3.5"
                value={id}
                placeholder={t("auth.idPlaceholder")}
                autoComplete="username"
                autoFocus={!canAutoLogin}
                disabled={isBusy}
                aria-invalid={Boolean(errorText)}
                onChange={(event) => {
                  setId(event.target.value);
                }}
              />
            </div>

            {/* 사용자 비밀번호를 입력합니다. */}
            <div className="space-y-2">
              <label
                htmlFor="login-password"
                className="text-sm font-semibold text-main"
              >
                {t("auth.password")}
              </label>

              <Input
                id="login-password"
                type="password"
                className="h-11 bg-panel px-3.5"
                value={password}
                placeholder={t("auth.passwordPlaceholder")}
                autoComplete="current-password"
                disabled={isBusy}
                aria-invalid={Boolean(errorText)}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>

            {errorText && (
              <p className="rounded-lg border border-destructive/20 bg-destructive/10 px-3.5 py-3 text-sm font-medium leading-5 text-destructive">
                {errorText}
              </p>
            )}

            {canAutoLogin && isBusy && (
              <p className="text-center text-xs leading-5 text-sub">
                {t("auth.autoLogin")}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              className="h-11 w-full rounded-lg font-semibold shadow-sm"
              disabled={
                isBusy ||
                !id.trim() ||
                !password
              }
            >
              {isBusy ? (
                <>
                  <LoaderCircle className="animate-spin" />
                  {t("auth.loggingIn")}
                </>
              ) : (
                t("auth.login")
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

export default LoginPage;