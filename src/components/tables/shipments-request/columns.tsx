"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import {
  Eye,
  Trash2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export interface ShipmentRequest {
  id: number;

  request_number: string;

  booking_status: string;

  user: {
    name: string;
    email: string;
  };

  items: {
    price: string;
  }[];
}

const getStatusStyles = (
  status: string
) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "bg-yellow-500/15 text-yellow-600 border-yellow-500/30";

    case "approved":
      return "bg-blue-500/15 text-blue-600 border-blue-500/30";

    case "invoiced":
      return "bg-purple-500/15 text-purple-600 border-purple-500/30";

    case "delivered":
      return "bg-green-500/15 text-green-600 border-green-500/30";

    default:
      return "bg-slate-500/15 text-slate-600 border-slate-500/30";
  }
};

export const columns: ColumnDef<ShipmentRequest>[] = [
  {
    id: "sno",

    header: "S.No",

    cell: ({ row }) =>
      String(row.index + 1).padStart(2, "0"),
  },

  {
    accessorKey: "request_number",

    header: "Request Number",
  },

  {
    accessorFn: (row) => row.user?.name,

    id: "customer_name",

    header: "Customer Name",
  },

  {
    accessorFn: (row) => row.user?.email,

    id: "email",

    header: "Email",
  },

  {
    accessorKey: "booking_status",

    header: "Booking Status",

    cell: ({ row }) => {
      const status =
        row.original.booking_status;

      return (
        <span
          className={`inline-flex items-center justify-center rounded-full px-4 py-1.5 text-xs font-semibold border capitalize ${getStatusStyles(
            status
          )}`}
        >
          {status}
        </span>
      );
    },
  },

  {
    id: "price",

    header: "Price",

    cell: ({ row }) => {
      const total =
        row.original.items?.reduce(
          (acc, item) =>
            acc +
            Number(item.price || 0),
          0
        ) || 0;

      return `$${total.toFixed(2)}`;
    },
  },

  {
    id: "actions",

    header: "Actions",

    cell: ({ row }) => {
      const navigate = useNavigate();

      return (
        <div className="flex items-center justify-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-2xl bg-blue-500/10 text-blue-600 hover:bg-blue-500 hover:text-white"
            onClick={() =>
              navigate(
                `/shipment-request-detail/${row.original.id}`
              )
            }
          >
            <Eye className="w-5 h-5" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white"
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      );
    },
  },
];