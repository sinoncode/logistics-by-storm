"use client";

import type { ColumnDef } from "@tanstack/react-table";

import {
  Eye,
  Trash2,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import type {
  Customer,
} from "@/store/customerStore";

import { useNavigate } from "react-router-dom";

export const columns:
ColumnDef<Customer>[] = [

  // ======================================================
  // SERIAL NUMBER
  // ======================================================

  {
    id: "serial",

    header: "S.No",

    cell: ({ row }) => (
      <div className="font-medium text-left">
        {String(row.index + 1).padStart(2, "0")}
      </div>
    ),
  },

  // ======================================================
  // CUSTOMER
  // ======================================================

  {
    accessorKey: "name",

    header: "Customer",

    cell: ({ row }) => {

      const customer =
        row.original;

      return (
        <div className="flex items-center gap-3 min-w-[220px]">

          {/* IMAGE PLACEHOLDER */}

          <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/10">
            <User className="w-5 h-5 text-primary" />
          </div>

          {/* CUSTOMER INFO */}

          <div className="space-y-1">
            <p className="font-semibold text-sm text-slate-900 dark:text-white">
              {customer.name}
            </p>

            <p className="text-xs text-muted-foreground">
              {customer.customer_code ||
                "No Customer Code"}
            </p>
          </div>
        </div>
      );
    },
  },

  // ======================================================
  // EMAIL
  // ======================================================

  {
    accessorKey: "email",

    header: "Email",

    cell: ({ row }) => (
      <span className="text-sm">
        {row.original.email}
      </span>
    ),
  },

  // ======================================================
  // PHONE
  // ======================================================

  {
    accessorKey: "phone",

    header: "Phone",

    cell: ({ row }) => (
      <span className="font-medium">
        +91 {row.original.phone}
      </span>
    ),
  },

  // ======================================================
  // ADDRESSES
  // ======================================================

  // {
  //   accessorKey: "addresses_count",

  //   header: "Addresses",

  //   cell: ({ row }) => (
  //     <div className="text-center font-semibold">
  //       {row.original.addresses_count}
  //     </div>
  //   ),
  // },

  // ======================================================
  // SHIPMENTS
  // ======================================================

  // {
  //   accessorKey: "shipments_count",

  //   header: "Shipments",

  //   cell: ({ row }) => (
  //     <div className="text-center font-semibold">
  //       {row.original.shipments_count}
  //     </div>
  //   ),
  // },

  // ======================================================
  // CREATED DATE
  // ======================================================

  // {
  //   accessorKey: "created_at",

  //   header: "Created At",

  //   cell: ({ row }) => {

  //     const date = new Date(
  //       row.original.created_at
  //     );

  //     return (
  //       <span className="text-sm">
  //         {date.toLocaleDateString()}
  //       </span>
  //     );
  //   },
  // },

  // ======================================================
  // ACTIONS
  // ======================================================

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
            className="rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300"
            onClick={() =>
              navigate(
                `/customer-details/${row.original.id}`
              )
            }
          >
            <Eye className="w-4 h-4" />
          </Button>

          {/* DELETE */}

          <Button
            size="icon"
            variant="ghost"
            className="rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];