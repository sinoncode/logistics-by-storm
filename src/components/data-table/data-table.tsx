import type {
  ColumnDef,
} from "@tanstack/react-table";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<
  TData,
  TValue
> {
  columns: ColumnDef<
    TData,
    TValue
  >[];

  data: TData[];
}

export function DataTable<
  TData,
  TValue
>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,

    getCoreRowModel:
      getCoreRowModel(),
  });

  return (
    <div className="rounded-3xl border bg-white dark:bg-slate-900 overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/40">
          {table
            .getHeaderGroups()
            .map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
              >
                {headerGroup.headers.map(
                  (header) => (
                    <TableHead
                      key={header.id}
                      className="h-12 font-semibold"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column
                              .columnDef
                              .header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                )}
              </TableRow>
            ))}
        </TableHeader>

        <TableBody>
          {table
            .getRowModel()
            .rows?.length ? (
            table
              .getRowModel()
              .rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-muted/40 transition-colors"
                >
                  {row
                    .getVisibleCells()
                    .map((cell) => (
                      <TableCell
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column
                            .columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                </TableRow>
              ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={
                  columns.length
                }
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}