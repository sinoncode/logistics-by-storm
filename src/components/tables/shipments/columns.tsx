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
      className="rounded-full"
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
            className={
              status === "completed"
                ? "bg-green-500"
                : status === "pending"
                ? "bg-yellow-500"
                : "bg-red-500"
            }
          >
            {status}
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