import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ToggleSwitch } from "./ToggleSwitch";
import type { Role, PermissionModule } from "@/types/rbac";
import { AlertCircle } from "lucide-react";

interface PermissionTableProps {
  role: Role | null;
  onPermissionChange: (module: PermissionModule, action: keyof Role["permissions"][PermissionModule], value: boolean) => void;
}

const MODULES: PermissionModule[] = ["users", "shipmentControl", "changeRequest", "checkPayments"];
const ACTIONS: (keyof Role["permissions"][PermissionModule])[] = ["view", "create", "edit", "delete"];

const MODULE_LABELS: Record<PermissionModule, string> = {
  users: "Users",
  shipmentControl: "Shipment Control",
  changeRequest: "Change Request",
  checkPayments: "Check Payments",
};

export const PermissionTable = ({
  role,
  onPermissionChange,
}: PermissionTableProps) => {
  if (!role) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="mb-3 h-10 w-10 text-muted-foreground" />
          <p className="text-muted-foreground">Select a role to view permissions</p>
        </CardContent>
      </Card>
    );
  }

  const handleSelectAllModule = (module: PermissionModule) => {
    const currentModule = role.permissions[module];
    const allTrue = ACTIONS.every((action) => currentModule[action] === true);
    
    ACTIONS.forEach((action) => {
      onPermissionChange(module, action, !allTrue);
    });
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="border-b">
        <CardTitle className="text-lg">
          {role.name} - Permissions
        </CardTitle>
        <CardDescription>
          Manage permissions for {role.name} role. Changes are saved automatically.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="w-[180px] font-semibold">Module</TableHead>
                <TableHead className="text-center">
                  <span className="inline-flex items-center gap-2">
                    View
                  </span>
                </TableHead>
                <TableHead className="text-center">Create</TableHead>
                <TableHead className="text-center">Edit</TableHead>
                <TableHead className="text-center">Delete</TableHead>
                <TableHead className="text-center">Select All</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MODULES.map((module) => {
                const modulePerms = role.permissions[module];
                const allSelected = ACTIONS.every((action) => modulePerms[action] === true);
                
                return (
                  <TableRow
                    key={module}
                    className="hover:bg-muted/40 transition-colors"
                  >
                    <TableCell className="font-medium text-sm">
                      {MODULE_LABELS[module]}
                    </TableCell>
                    {ACTIONS.map((action) => (
                      <TableCell key={action} className="text-center py-4">
                        <div className="flex justify-center">
                          <ToggleSwitch
                            checked={modulePerms[action] === true}
                            onCheckedChange={(checked) =>
                              onPermissionChange(module, action, checked)
                            }
                          />
                        </div>
                      </TableCell>
                    ))}
                    <TableCell className="text-center py-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSelectAllModule(module)}
                        className={allSelected ? "bg-green-50 border-green-200 text-green-700 hover:bg-green-100" : ""}
                      >
                        {allSelected ? "All" : "None"}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        
        {/* Summary Section */}
        <div className="mt-6 pt-6 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {MODULES.map((module) => {
              const modulePerms = role.permissions[module];
              const enabledCount = ACTIONS.filter((action) => modulePerms[action] === true).length;
              
              return (
                <div key={module} className="text-sm">
                  <p className="text-muted-foreground text-xs uppercase tracking-wide">
                    {MODULE_LABELS[module]}
                  </p>
                  <p className="text-base font-semibold mt-1">
                    {enabledCount}/{ACTIONS.length}
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
