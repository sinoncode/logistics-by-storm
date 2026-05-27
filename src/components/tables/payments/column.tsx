import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";

import type { Payments } from "@/store/paymentsList";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";

import { useNavigate } from "react-router-dom";

export const columns:
  ColumnDef<Payments>[] = [
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
    accessorKey: "payment_reference",

    header: "Reference",

    cell: ({ row }) => (
      <div className="font-medium">
        {row.original.payment_reference || "-"}
      </div>
    ),
  },

  {
    accessorKey: "customer_name",

    header: "Customer Name",
  },

  {
    accessorKey: "customer_email",

    header: "Customer Email",
  },

  {
    accessorKey: "gateway_name",

    header: "Gateway",

    cell: ({ row }) => (
      <Badge variant="outline">
        {
  row.original.gateway_name
    ?.replaceAll("_", " ")
    ?.toLowerCase()
    ?.replace(/\b\w/g, (char) =>
      char.toUpperCase()
    )
}
      </Badge>
    ),
  },

//   {
//     accessorKey:
//       "gateway_transaction_id",

//     header: "Transaction ID",

//     cell: ({ row }) => (
//       <div className="max-w-[180px] truncate">
//         {
//           row.original
//             .gateway_transaction_id
//         }
//       </div>
//     ),
//   },

//   {
//     accessorKey: "currency_code",

//     header: "Currency",
//   },

  {
    accessorKey: "amount",

    header: "Amount",

    cell: ({ row }) => (
      <span className="font-semibold">
        {row.original.currency_code}{" "}
        {row.original.amount}
      </span>
    ),
  },

//   {
//     accessorKey: "paid_at",

//     header: "Paid At",

//     cell: ({ row }) => (
//       <div>
//         {row.original.paid_at || "-"}
//       </div>
//     ),
//   },

//   {
//     accessorKey: "created_at",

//     header: "Created At",
//   },

//   {
//     accessorKey:
//       "shipment_request_id",

//     header: "Shipment ID",

//     cell: ({ row }) => (
//       <Badge>
//         #
//         {
//           row.original
//             .shipment_request_id
//         }
//       </Badge>
//     ),
//   },
  {
    id: "actions",

    header: "Actions",

    cell: ({ row }) => {

      const navigate =
        useNavigate();

      return (
        <div className="flex  gap-2">

          {/* VIEW */}

          <Button
            size="icon"
            variant="ghost"
            className="rounded-4xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300"
            onClick={() =>
              navigate(
                `/payemnts-details/${row.original.id}`
              )
            }
          >
            <Eye className="w-4 h-4" />
          </Button>

          {/* DELETE */}

          {/* <Button
            size="icon"
            variant="ghost"
            className="rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
          >
            <Trash2 className="w-4 h-4" />
          </Button> */}
        </div>
      );
    },
  },
];