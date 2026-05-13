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
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
  <TableRow className="bg-muted/50 hover:bg-muted/50">

    <TableHead className="w-[240px] font-semibold">
      Module
    </TableHead>

    <TableHead className="text-center font-semibold">
      View
    </TableHead>

    <TableHead className="text-center font-semibold">
      Create
    </TableHead>

    <TableHead className="text-center font-semibold">
      Update
    </TableHead>

    <TableHead className="text-center font-semibold">
      Delete
    </TableHead>

  </TableRow>
</TableHeader>

           <TableBody>

  {moduleEntries.map(([module, permissions]) => {

    const permissionMap = {
      view: permissions.find((p) =>
        p.endsWith(".view")
      ),

      create: permissions.find((p) =>
        p.endsWith(".create")
      ),

      update: permissions.find((p) =>
        p.endsWith(".update")
      ),

      delete: permissions.find((p) =>
        p.endsWith(".delete")
      ),
    };

    return (
      <TableRow
        key={module}
        className="hover:bg-muted/30 transition-colors"
      >

        {/* MODULE */}
        <TableCell className="font-medium py-5">
          {formatModuleLabel(module)}
        </TableCell>

        {/* VIEW */}
        <TableCell className="text-center">
          {permissionMap.view ? (
            <Checkbox
              checked={hasPermission(
                permissionMap.view
              )}
              disabled={!canEdit}
              onCheckedChange={(checked) =>
                onPermissionChange(
                  permissionMap.view!,
                  checked === true
                )
              }
            />
          ) : (
            "-"
          )}
        </TableCell>

        {/* CREATE */}
        <TableCell className="text-center">
          {permissionMap.create ? (
            <Checkbox
              checked={hasPermission(
                permissionMap.create
              )}
              disabled={!canEdit}
              onCheckedChange={(checked) =>
                onPermissionChange(
                  permissionMap.create!,
                  checked === true
                )
              }
            />
          ) : (
            "-"
          )}
        </TableCell>

        {/* UPDATE */}
        <TableCell className="text-center">
          {permissionMap.update ? (
            <Checkbox
              checked={hasPermission(
                permissionMap.update
              )}
              disabled={!canEdit}
              onCheckedChange={(checked) =>
                onPermissionChange(
                  permissionMap.update!,
                  checked === true
                )
              }
            />
          ) : (
            "-"
          )}
        </TableCell>

        {/* DELETE */}
        <TableCell className="text-center">
          {permissionMap.delete ? (
            <Checkbox
              checked={hasPermission(
                permissionMap.delete
              )}
              disabled={!canEdit}
              onCheckedChange={(checked) =>
                onPermissionChange(
                  permissionMap.delete!,
                  checked === true
                )
              }
            />
          ) : (
            "-"
          )}
        </TableCell>

      </TableRow>
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