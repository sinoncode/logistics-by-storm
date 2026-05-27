import type {
  ColumnDef,
} from "@tanstack/react-table";

import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import { useNavigate } from "react-router-dom";

import type {
  Shipment,
} from "@/types/shipments-track";

interface ActionCellProps {
  shipment: Shipment;
}

function ActionCell({
  shipment,
}: ActionCellProps) {
  const navigate = useNavigate();

  return (
    <Button
      size="icon"
      variant="ghost"
      className="rounded-4xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300"
      onClick={() =>
        navigate(
          `/shipments-detail/${shipment.id}`
        )
      }
    >
      <Eye className="h-4 w-4" />
    </Button>
  );
}

const statusColors: Record<
  string,
  string
> = {
  pending:
    "bg-yellow-100 text-yellow-700 border border-yellow-200",

  received_at_origin:
    "bg-blue-100 text-blue-700 border border-blue-200",

  dispatched:
    "bg-indigo-100 text-indigo-700 border border-indigo-200",

  in_transit:
    "bg-cyan-100 text-cyan-700 border border-cyan-200",

  arrived_at_destination:
    "bg-purple-100 text-purple-700 border border-purple-200",

  out_for_delivery:
    "bg-orange-100 text-orange-700 border border-orange-200",

  delivered:
    "bg-green-100 text-green-700 border border-green-200",

  exception:
    "bg-red-100 text-red-700 border border-red-200",

  cancelled:
    "bg-red-100 text-red-700 border border-red-200",

  returned:
    "bg-gray-100 text-gray-700 border border-gray-200",
};

export const columns: ColumnDef<Shipment>[] =
  [
    {
      id: "serial",

      header: "S.No",

      cell: ({ row }) =>
        String(row.index + 1).padStart(
          2,
          "0"
        ),
    },

    {
      accessorKey:
        "tracking_number",

      header: "Tracking Number",
    },

    {
      accessorKey: "user.name",

      header: "Customer Name",
    },

    {
      accessorKey: "user.email",

      header: "Email",
    },

    {
      accessorKey:
        "current_status",

      header: "Current Status",

      cell: ({ row }) => {
        const status =
          row.original.current_status;

        return (
          <Badge
  className={`capitalize rounded-full px-3 py-1 font-medium ${statusColors[status]}`}
>
  {status
    .replace(/_/g, " ")
    .replace(
      /\b\w/g,
      (char) =>
        char.toUpperCase()
    )}
</Badge>
        );
      },
    },

    {
      accessorKey:
        "delivery_type",

      header: "Delivery Type",

      cell: ({ row }) => (
        <span className="capitalize">
          {
            row.original
              .delivery_type
          }
        </span>
      ),
    },

    {
      id: "actions",

      header: "Actions",

      cell: ({ row }) => (
        <ActionCell
          shipment={row.original}
        />
      ),
    },
  ];