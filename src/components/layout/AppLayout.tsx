import { useState } from "react";
import { Outlet } from "react-router";

import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import useHealth from "@/hooks/useHealth";
import { cn } from "@/utils/cn";

function AppLayout() {
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  // 현재 Route와 관계없이 앱 실행 중 Health 상태를 계속 확인합니다.
  useHealth();
  
  function toggleSidebar() {
    setIsSidebarClosed((current) => !current);
  }

  return (
    <div className="grid h-screen grid-rows-[4rem_1fr] overflow-hidden bg-page">
      {/* 모든 페이지에서 공통으로 사용하는 상단 영역입니다. */}
      <TopNav />

      <div
        className={cn(
          "grid min-h-0 overflow-hidden transition-[grid-template-columns] duration-200",
          isSidebarClosed
            ? "grid-cols-[4.5rem_minmax(0,1fr)]"
            : "grid-cols-[15rem_minmax(0,1fr)]",
        )}
      >
        {/* 모든 페이지에서 공통으로 사용하는 왼쪽 메뉴입니다. */}
        <Sidebar 
          isClosed={isSidebarClosed}
          onToggle={toggleSidebar} 
        />

        {/* 페이지마다 달라지는 실제 화면 내용이 표시됩니다. */}
        <main className="min-w-0 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout;