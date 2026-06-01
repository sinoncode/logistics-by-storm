import * as React from "react";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
} from "@tanstack/react-table";

import { Skeleton } from "@/components/ui/skeleton";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Search,
  SlidersHorizontal,
} from "lucide-react";

// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading = false,
}: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] =
    React.useState<SortingState>([]);

  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([]);

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [globalFilter, setGlobalFilter] =
    React.useState("");

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },

    onSortingChange: setSorting,

    onColumnFiltersChange: setColumnFilters,

    onColumnVisibilityChange:
      setColumnVisibility,

    onGlobalFilterChange: setGlobalFilter,

    getCoreRowModel: getCoreRowModel(),

    getPaginationRowModel:
      getPaginationRowModel(),

    getSortedRowModel:
      getSortedRowModel(),

    getFilteredRowModel:
      getFilteredRowModel(),
  });

  return (
    <div className="space-y-4">

      {/* TOPBAR */}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

        {/* SEARCH */}

    {loading ? (
  <Skeleton className="h-11 w-full md:max-w-sm rounded-xl" />
) : (
  <div className="relative w-full md:max-w-sm">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

    <Input
      placeholder="Search..."
      value={globalFilter}
      onChange={(e) =>
        setGlobalFilter(e.target.value)
      }
      className="pl-10 h-11 rounded-xl"
    />
  </div>
)}

        {/* COLUMN TOGGLE */}

        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-11 rounded-2xl"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Columns
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) =>
                column.getCanHide()
              )
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>

      {/* TABLE */}

      <div className="rounded-xl border overflow-hidden">
        <Table>
  <TableHeader>
  {loading ? (
    <TableRow>
      {columns.map((_, index) => (
        <TableHead key={index}>
          <Skeleton
            className={`h-4 ${
              index % 5 === 0
                ? "w-10"
                : index % 5 === 1
                ? "w-24"
                : index % 5 === 2
                ? "w-28"
                : index % 5 === 3
                ? "w-20"
                : "w-16"
            }`}
          />
        </TableHead>
      ))}
    </TableRow>
  ) : (
    table.getHeaderGroups().map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <TableHead key={header.id}>
            {header.isPlaceholder
              ? null
              : flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
          </TableHead>
        ))}
      </TableRow>
    ))
  )}
</TableHeader>

         <TableBody>
  {loading ? (
    Array.from({ length: 8 }).map((_, rowIndex) => (
      <TableRow key={rowIndex}>
        {columns.map((_, cellIndex) => (
          <TableCell key={cellIndex}>
            <Skeleton
  className={`h-4 ${
    cellIndex % 4 === 0
      ? "w-12"
      : cellIndex % 4 === 1
      ? "w-24"
      : cellIndex % 4 === 2
      ? "w-32"
      : "w-20"
  }`}
/>
          </TableCell>
        ))}
      </TableRow>
    ))
  ) : table.getRowModel().rows?.length ? (
    table
      .getRowModel()
      .rows.map((row) => (
        <TableRow key={row.id}>
          {row
            .getVisibleCells()
            .map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </TableCell>
            ))}
        </TableRow>
      ))
  ) : (
    <TableRow>
      <TableCell
        colSpan={columns.length}
        className="h-24 text-center"
      >
        No results found.
      </TableCell>
    </TableRow>
  )}
</TableBody>
        </Table>
      </div>

      {/* PAGINATION */}
<div className="flex items-center justify-between">
  {loading ? (
    <>
      <Skeleton className="h-10 w-[130px] rounded-xl" />

      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-10 w-10 rounded-xl" />
      </div>
    </>
  ) : (
    <>
      <Select
        value={`${table.getState().pagination.pageSize}`}
        onValueChange={(value) => {
          table.setPageSize(Number(value));
        }}
      >
        <SelectTrigger className="w-[130px] h-10 rounded-xl">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {[5, 10, 20, 50].map((pageSize) => (
            <SelectItem
              key={pageSize}
              value={`${pageSize}`}
            >
              {pageSize} rows
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-xl"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="text-sm font-medium px-2">
          Page{" "}
          {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="rounded-xl"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </>
  )}
</div>
    </div>
  );
}