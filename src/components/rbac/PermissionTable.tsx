import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { Checkbox } from "@/components/ui/checkbox";

import type { Role } from "@/types/rbac";

import { AlertCircle } from "lucide-react";

interface PermissionTableProps {
  role: Role | null;
  availablePermissions: string[];
  canEdit: boolean;
  onPermissionChange: (
    permission: string,
    value: boolean
  ) => void;
}

const formatLabel = (value: string) => {
  return value
    .replace(/[-_]/g, " ")
    .split(".")
    .pop()
    ?.split(" ")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ") || value;
};

const formatModuleLabel = (module: string) => {
  return module
    .replace(/[-_]/g, " ")
    .split(" ")
    .map(
      (part) =>
        part.charAt(0).toUpperCase() + part.slice(1)
    )
    .join(" ");
};

const groupPermissionsByModule = (
  permissions: string[]
) => {
  return permissions.reduce(
    (acc, permission) => {
      const [module] = permission.split(".");

      if (!module) return acc;

      if (!acc[module]) {
        acc[module] = [];
      }

      if (!acc[module].includes(permission)) {
        acc[module].push(permission);
      }

      return acc;
    },
    {} as Record<string, string[]>
  );
};

export const PermissionTable = ({
  role,
  availablePermissions,
  canEdit,
  onPermissionChange,
}: PermissionTableProps) => {
  if (!role) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="mb-3 h-10 w-10 text-muted-foreground" />

          <p className="text-muted-foreground">
            Select a role to view permissions
          </p>
        </CardContent>
      </Card>
    );
  }

  const permissionGroups = groupPermissionsByModule(
    availablePermissions
  );

  const moduleEntries = Object.entries(
    permissionGroups
  ).sort(([a], [b]) => a.localeCompare(b));

  if (moduleEntries.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="mb-3 h-10 w-10 text-muted-foreground" />

          <p className="text-muted-foreground text-center">
            No permission definitions available. Verify your login permissions or backend permission metadata.
          </p>
        </CardContent>
      </Card>
    );
  }

  const hasPermission = (permission: string) =>
    role.permissions.includes(permission);

  const handleSelectAll = (
    permissions: string[]
  ) => {
    const allSelected = permissions.every(
      hasPermission
    );

    permissions.forEach((permission) => {
      onPermissionChange(permission, !allSelected);
    });
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="border-b">
        <CardTitle className="text-lg">
          {role.name} - Permissions
        </CardTitle>

        <CardDescription>
          Manage permissions for {role.name} role.
          {canEdit
            ? " Select permissions below and save changes."
            : " You can view permissions, but updates are disabled."}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="w-[220px] font-semibold">
                  Module
                </TableHead>
                <TableHead className="font-semibold">
                  Permission
                </TableHead>
                <TableHead className="text-center font-semibold">
                  Allow
                </TableHead>
                <TableHead className="text-center font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {moduleEntries.map(([module, permissions]) => {
                const allSelected = permissions.every(
                  hasPermission
                );

                return permissions.map(
                  (permission, index) => {
                    const action = permission.split(".").pop() || permission;

                    return (
                      <TableRow
                        key={permission}
                        className="hover:bg-muted/40 transition-colors"
                      >
                        {index === 0 ? (
                          <TableCell
                            rowSpan={permissions.length}
                            className="font-medium text-sm"
                          >
                            {formatModuleLabel(module)}
                          </TableCell>
                        ) : null}

                        <TableCell className="py-4">
                          {formatLabel(action)}
                        </TableCell>

                        <TableCell className="text-center py-4">
                          <div className="flex justify-center">
                            <Checkbox
                              checked={hasPermission(permission)}
                              disabled={!canEdit}
                              onCheckedChange={(checked) =>
                                onPermissionChange(
                                  permission,
                                  checked === true
                                )
                              }
                              title={
                                !canEdit
                                  ? "You need roles.update permission to edit this role."
                                  : undefined
                              }
                              className="h-5 w-5"
                            />
                          </div>
                        </TableCell>

                        {index === 0 ? (
                          <TableCell
                            rowSpan={permissions.length}
                            className="text-center py-4"
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleSelectAll(permissions)
                              }
                              disabled={!canEdit}
                              className="disabled:cursor-not-allowed disabled:opacity-50"
                              title={
                                !canEdit
                                  ? "You need roles.update permission to toggle all permissions for this module."
                                  : undefined
                              }
                            >
                              {allSelected
                                ? "All Selected"
                                : "Select All"}
                            </Button>
                          </TableCell>
                        ) : null}
                      </TableRow>
                    );
                  }
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* SUMMARY */}
        <div className="mt-6 pt-6 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {moduleEntries.map(([module, permissions]) => {
              const enabledCount = permissions.filter(
                hasPermission
              ).length;

              return (
                <div key={module} className="text-sm">
                  <p className="text-muted-foreground text-xs uppercase tracking-wide">
                    {formatModuleLabel(module)}
                  </p>

                  <p className="text-base font-semibold mt-1">
                    {enabledCount}/{permissions.length}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};