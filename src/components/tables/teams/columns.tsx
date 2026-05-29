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

  {/* PROFILE AVATAR */}
  <div
    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold uppercase shadow-md"
    style={{
      backgroundColor: (() => {

        const colors = [
          "#2563EB",
          "#7C3AED",
          "#059669",
          "#DC2626",
          "#EA580C",
          "#0891B2",
          "#DB2777",
          "#4F46E5",
        ];

        const name =
          member.name || "";

        let hash = 0;

        for (
          let i = 0;
          i < name.length;
          i++
        ) {
          hash =
            name.charCodeAt(i) +
            ((hash << 5) - hash);
        }

        return colors[
          Math.abs(hash) %
            colors.length
        ];
      })(),
    }}
  >

    {
  member.name
    ?.trim()
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "U"
}

  </div>

  {/* USER INFO */}
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
     ROLE
  ===================================================== */

  {
    accessorKey: "role",

    header: "Role",

    cell: ({ row }) => {

      const member =
        row.original;

      return (
        <div className="flex items-center gap-3">

          <div>
            <p className="font-medium">
              {member.role}
            </p>
          </div>
        </div>
      );
    },
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

          {/* <Button
            size="icon"
            variant="ghost"
            className="text-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </Button> */}
        </div>
      );
    },
  },
];