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

import { groupPermissionsByModule } from "@/lib/permissions";

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
       <div className="space-y-4">
  {moduleEntries.map(([module, permissions]) => {
    const selectedCount =
      permissions.filter(hasPermission).length;

    const allSelected =
      selectedCount === permissions.length;

    return (
      <Card
        key={module}
        className="border shadow-none"
      >
        <CardContent className="p-5">

          {/* Module Header */}
          <div className="flex items-center justify-between mb-4">

            <div>
              <h3 className="font-semibold text-xl">
                {formatModuleLabel(module)}
              </h3>

              <p className="text-sm text-muted-foreground">
                {selectedCount} of {permissions.length}
                {" "}permissions selected
              </p>
            </div>

            <div className="flex items-center gap-2">

              <Checkbox
                checked={allSelected}
                disabled={!canEdit}
                onCheckedChange={() =>
                  handleSelectAll(permissions)
                } className="border border-green-500"
              />

              <span className="text-sm">
                Select All
              </span>
            </div>
          </div>

          {/* Permissions */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {permissions.map((permission) => (
              <label
                key={permission}
                className={`
                  flex items-center w-fit gap-2
                  rounded-md border px-5 py-2
                  cursor-pointer transition-colors
                  ${
                    hasPermission(permission)
                      ? "bg-primary/5 border-primary/20"
                      : ""
                  }
                `}
              >
                <Checkbox
                  checked={hasPermission(permission)}
                  disabled={!canEdit}
                  onCheckedChange={(checked) =>
                    onPermissionChange(
                      permission,
                      checked === true
                    )
                  } className="border border-green-500"
                />

                <span className="text-sm">
                  {formatLabel(permission)}
                </span>
              </label>
            ))}
          </div>

        </CardContent>
      </Card>
    );
  })}
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