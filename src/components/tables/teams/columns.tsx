"use client";

import type { ColumnDef }
from "@tanstack/react-table";

import {
  Eye,
  Trash2,
  User,
} from "lucide-react";

import { Badge }
from "@/components/ui/badge";

import { Button }
from "@/components/ui/button";

import type {
  TeamMember,
} from "@/store/teamStore";

import { useNavigate }
from "react-router-dom";

export const columns:
ColumnDef<TeamMember>[] = [

  /* =====================================================
     SERIAL NUMBER
  ===================================================== */

  {
    id: "serial",

    header: "S.No",

    cell: ({ row }) => (
      <div>
        {String(
          row.index + 1
        ).padStart(2, "0")}
      </div>
    ),
  },

  /* =====================================================
     NAME
  ===================================================== */

  {
    accessorKey: "name",

    header: "Name",

    cell: ({ row }) => {

      const member =
        row.original;

      return (
        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>

          <div>
            <p className="font-medium">
              {member.name}
            </p>
          </div>
        </div>
      );
    },
  },

  /* =====================================================
     EMAIL
  ===================================================== */

  {
    accessorKey: "email",

    header: "Email",
  },

  /* =====================================================
     PHONE
  ===================================================== */

  {
    accessorKey: "phone",

    header: "Phone",
  },

  /* =====================================================
     STATUS
  ===================================================== */

  {
    accessorKey: "status",

    header: "Status",

    cell: ({ row }) => {

      const status =
        row.original.status;

      return (
        <Badge
          className={
            status === "active"
              ? "bg-green-500"
              : "bg-red-500"
          }
        >
          {status
            .charAt(0)
            .toUpperCase() +
            status.slice(1)}
        </Badge>
      );
    },
  },

  /* =====================================================
     ACTIONS
  ===================================================== */

  {
    id: "actions",

    header: "Actions",

    cell: ({ row }) => {

      const navigate =
        useNavigate();

      const member =
        row.original;

      return (
        <div className="flex items-center gap-2">

          <Button
            size="icon"
            variant="ghost"
            onClick={() =>
              navigate(
                `/teams-list/${member.id}`
              )
            }
          >
            <Eye className="w-4 h-4" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="text-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];