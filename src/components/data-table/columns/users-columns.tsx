import type { ColumnDef } from "@tanstack/react-table";

import { Eye, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: number;
  designation: string;
  status: "Active" | "Inactive";
  avatar: string;
}

export const columns: ColumnDef<User>[] = [
  {
    header: "S.No",

    cell: ({ row }) => (
      <div className="font-medium">
        {String(row.index + 1).padStart(2, "0")}
      </div>
    ),
  },

  {
    accessorKey: "name",

    header: "User",

    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex items-center gap-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-11 h-11 rounded-full object-cover border"
          />

          <div>
            <p className="font-semibold text-sm">
              {user.name}
            </p>

            <p className="text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "phone",

    header: "Phone",

    cell: ({ row }) => (
      <span>
        +91 {row.original.phone}
      </span>
    ),
  },

  {
    accessorKey: "designation",

    header: "Role",
  },

  {
    accessorKey: "status",

    header: "Status",

    cell: ({ row }) => {
      const status =
        row.original.status;

      return (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            status === "Active"
              ? "bg-green-500/10 text-green-600"
              : "bg-red-500/10 text-red-500"
          }`}
        >
          {status}
        </span>
      );
    },
  },

  {
    id: "actions",

    header: "Actions",

    cell: ({ row }) => {
      const user = row.original;

      return <ActionButtons user={user} />;
    },
  },
];

function ActionButtons({
  user,
}: {
  user: User;
}) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        size="icon"
        variant="ghost"
        className="rounded-full bg-primary/10 text-primary hover:bg-primary/20"
        onClick={() =>
          navigate(`/customer-details/${user.id}`)
        }
      >
        <Eye className="w-4 h-4" />
      </Button>

      <Button
        size="icon"
        variant="ghost"
        className="rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}