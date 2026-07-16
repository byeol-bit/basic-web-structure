import { NavLink } from "react-router";

import { cn } from "@/utils/cn";

interface SidebarNavItemProps {
  to: string;
  label: string;
  mark: string;
  isClosed: boolean;
}

function SidebarNavItem({
  to,
  label,
  mark,
  isClosed,
}: SidebarNavItemProps) {
  return (
    <li>
      <NavLink
        to={to}
        end={to === "/"}
        title={isClosed ? label : undefined}
        className={({ isActive }) =>
          cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-side-sub",
            "hover:bg-side-hover hover:text-side-text",
            isClosed && "justify-center px-2",
            isActive &&
              "bg-brand font-semibold text-white hover:bg-brand-hover hover:text-white",
          )
        }
      >
        {({ isActive }) => (
          <>
            {/* Sidebar가 접혀도 메뉴 표시는 유지합니다. */}
            <span
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-md",
                "bg-panel-soft text-xs font-bold text-side-text",
                isActive && "bg-white/15 text-white",
              )}
            >
              {mark}
            </span>

            <span className={cn(isClosed && "sr-only")}>
              {label}
            </span>
          </>
        )}
      </NavLink>
    </li>
  );
}

export default SidebarNavItem;