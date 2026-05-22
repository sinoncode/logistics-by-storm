import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export const trackingColumns: ColumnDef<any>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <Badge>
          {row.original.status}
        </Badge>
      );
    },
  },

  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return row.original.description || "-";
    },
  },

  {
    accessorKey: "created_at",
    header: "Created At",
  },
];