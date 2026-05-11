import { useState } from "react";

import { cn } from "@/lib/utils";

import type { Role } from "@/types/rbac";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Search,
  Trash2,
  Copy,
  Plus,
} from "lucide-react";

interface RoleListProps {
  roles: Role[];
  selectedRole: Role | null;
  onSelectRole: (role: Role) => void;
  onDeleteRole: (roleId: string) => void;
  onDuplicateRole: (role: Role) => void;
  onAddRole: () => void;
  canCreate?: boolean;
  canUpdate?: boolean;
  canDelete?: boolean;
}

export const RoleList = ({
  roles,
  selectedRole,
  onSelectRole,
  onDeleteRole,
  onDuplicateRole,
  onAddRole,
  canCreate = false,
  canUpdate = false,
  canDelete = false,
}: RoleListProps) => {
  const [searchQuery, setSearchQuery] =
    useState("");

  const filteredRoles = roles.filter((role) =>
    role.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="border shadow-sm h-full">
      <CardHeader className="border-b pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg">
              Roles
            </CardTitle>

            <CardDescription>
              {roles.length} role
              {roles.length !== 1 ? "s" : ""}
            </CardDescription>
          </div>

          <Button
            size="sm"
            onClick={onAddRole}
            disabled={!canCreate}
            title={
              !canCreate
                ? "You need roles.create permission to add a new role."
                : undefined
            }
            className="bg-green-600 hover:bg-green-700 text-white gap-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />

            <span className="hidden sm:inline">
              Add Role
            </span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex flex-col h-full">
        {/* SEARCH */}
        <div className="p-4 pb-0">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

            <Input
              placeholder="Search roles..."
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              className="pl-10 h-10"
            />
          </div>
        </div>

        {/* EMPTY STATE */}
        {filteredRoles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center flex-1">
            <p className="text-sm text-muted-foreground">
              {searchQuery
                ? "No roles found"
                : "No roles available"}
            </p>

            {!searchQuery && (
              <Button
                variant="link"
                onClick={onAddRole}
                className="mt-2"
              >
                Create your first role
              </Button>
            )}
          </div>
        ) : (
          <ScrollArea className="flex-1 mt-4">
            <div className="px-4 pb-4 space-y-3">
              {filteredRoles.map((role) => {
                const totalPermissions =
                  role.permissions.length;

                return (
                  <div
                    key={role.id}
                    onClick={() =>
                      onSelectRole(role)
                    }
                    className={cn(
                      "group relative rounded-2xl border p-4 transition-all duration-200 cursor-pointer",
                      selectedRole?.id === role.id
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "hover:border-primary/40 hover:bg-muted/40"
                    )}
                  >
                    {/* TOP */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate">
                          {role.name}
                        </h3>

                        <p className="text-xs text-muted-foreground mt-1">
                          {totalPermissions} permissions
                        </p>
                      </div>

                      {/* ACTIONS */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          disabled={!canUpdate}
                          title={
                            !canUpdate
                              ? "You need roles.update permission to duplicate roles."
                              : undefined
                          }
                          onClick={(e) => {
                            e.stopPropagation();

                            onDuplicateRole(
                              role
                            );
                          }}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:text-red-600 disabled:hover:text-current"
                          disabled={!canDelete}
                          title={
                            !canDelete
                              ? "You need roles.delete permission to delete roles."
                              : undefined
                          }
                          onClick={(e) => {
                            e.stopPropagation();

                            onDeleteRole(
                              role.id
                            );
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* FOOTER */}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[11px] text-muted-foreground truncate">
                        ID: {role.id}
                      </span>

                      {selectedRole?.id ===
                        role.id && (
                        <span className="text-[11px] font-medium text-primary">
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};