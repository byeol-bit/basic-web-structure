import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type Column,
  type ColumnDef,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { UserDto } from "@/types/UserDto";
import { cn } from "@/utils/cn";
import { formatDateTime } from "@/utils/date";

interface UserTableProps {
  users: UserDto[];
}

interface UserSortHeaderProps {
  column: Column<UserDto, unknown>;
  title: string;
}

// 표의 Column 제목과 정렬 버튼을 표시합니다.
function UserSortHeader({
  column,
  title,
}: UserSortHeaderProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="-ml-3 font-bold"
      onClick={column.getToggleSortingHandler()}
    >
      {title}
      <ArrowUpDown className="size-4 text-sub" />
    </Button>
  );
}

function UserTable({
  users,
}: UserTableProps) {
  const { t, i18n } = useTranslation();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchText, setSearchText] = useState("");

  const columns = useMemo<ColumnDef<UserDto>[]>(
    () => [
      {
        accessorKey: "id",
        header: ({ column }) => (
          <UserSortHeader
            column={column}
            title={t("users.columns.id")}
          />
        ),
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <UserSortHeader
            column={column}
            title={t("users.columns.name")}
          />
        ),
      },
      {
        accessorKey: "userId",
        header: ({ column }) => (
          <UserSortHeader
            column={column}
            title={t("users.columns.userId")}
          />
        ),
      },
      {
        accessorKey: "role",
        header: ({ column }) => (
          <UserSortHeader
            column={column}
            title={t("users.columns.role")}
          />
        ),
        cell: ({ row }) => {
          const role = row.original.role;

          return t(`users.roles.${role}`);
        },
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <UserSortHeader
            column={column}
            title={t("users.columns.status")}
          />
        ),
        cell: ({ row }) => {
          const status = row.original.status;
          const isActive = status === "active";

          return (
            <span
              className={cn(
                "inline-flex rounded-full px-2.5 py-1 text-xs font-bold",
                isActive
                  ? "bg-brand-soft text-brand"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {t(`users.status.${status}`)}
            </span>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <UserSortHeader
            column={column}
            title={t("users.columns.createdAt")}
          />
        ),
        cell: ({ row }) => (
          <span className="text-sub">
            {formatDateTime(
              row.original.createdAt,
              i18n.resolvedLanguage,
            )}
          </span>
        ),
      },
    ],
    [i18n.resolvedLanguage, t],
  );

  // TanStack Table에 검색, 정렬과 페이지 기능을 연결합니다.
  const table = useReactTable({
    data: users,
    columns,
    state: {
      sorting,
      globalFilter: searchText,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setSearchText,

    // 이름과 계정만 통합 검색 대상으로 사용합니다.
    globalFilterFn: (row, _columnId, filterValue) => {
      const word = String(filterValue)
        .trim()
        .toLowerCase();

      return (
        row.original.name.toLowerCase().includes(word) ||
        row.original.userId.toLowerCase().includes(word)
      );
    },

    initialState: {
      pagination: {
        pageSize: 5,
      },
    },

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const filteredCount =
    table.getFilteredRowModel().rows.length;

  const currentPage =
    table.getState().pagination.pageIndex + 1;

  const totalPage = Math.max(
    table.getPageCount(),
    1,
  );

  return (
    <div className="space-y-4">
      {/* 사용자 이름과 이메일을 검색합니다. */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-sub" />

          <Input
            value={searchText}
            placeholder={t("users.searchPlaceholder")}
            className="pl-9"
            onChange={(event) =>
              setSearchText(event.target.value)
            }
          />
        </div>

        <p className="text-sm font-semibold text-sub">
          {t("users.resultCount", {
            count: filteredCount,
          })}
        </p>
      </div>

      {/* 검색과 정렬 결과를 표로 표시합니다. */}
      <div className="overflow-hidden rounded-lg border border-line">
        <Table>
          <TableHeader className="bg-panel-soft">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-sub"
                >
                  {t("users.empty")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 검색 결과를 5개 단위로 이동합니다. */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-sub">
          {t("users.page", {
            current: currentPage,
            total: totalPage,
          })}
        </p>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            <ChevronLeft className="size-4" />
            {t("users.previous")}
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            {t("users.next")}
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserTable;