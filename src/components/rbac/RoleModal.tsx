import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { Role } from "@/types/rbac";
import { toast } from "sonner";

const roleSchema = z.object({
  name: z.string().min(2, "Role name must be at least 2 characters").max(50, "Role name must be less than 50 characters"),
});

type RoleFormValues = z.infer<typeof roleSchema>;

interface PermissionState {
  users: { view: boolean; create: boolean; edit: boolean; delete: boolean };
  shipmentControl: { view: boolean; create: boolean; edit: boolean; delete: boolean };
  changeRequest: { view: boolean; create: boolean; edit: boolean; delete: boolean };
  checkPayments: { view: boolean; create: boolean; edit: boolean; delete: boolean };
}

interface RoleModalProps {
  open: boolean;
  role?: Role | null;
  existingRoles?: Role[];
  onClose: () => void;
  onSave: (data: { name: string; permissions: PermissionState; id?: string }) => void;
  isLoading?: boolean;
}

const modules = [
  { key: "users", label: "Users" },
  { key: "shipmentControl", label: "Shipment Control" },
  { key: "changeRequest", label: "Change Request" },
  { key: "checkPayments", label: "Check Payments" },
] as const;

const actions = [
  { key: "view", label: "View" },
  { key: "create", label: "Create" },
  { key: "edit", label: "Edit" },
  { key: "delete", label: "Delete" },
] as const;

export const RoleModal = ({
  open,
  role,
  existingRoles = [],
  onClose,
  onSave,
  isLoading = false,
}: RoleModalProps) => {
  const isEditing = !!role;

  const [permissions, setPermissions] = useState<PermissionState>({
    users: { view: false, create: false, edit: false, delete: false },
    shipmentControl: { view: false, create: false, edit: false, delete: false },
    changeRequest: { view: false, create: false, edit: false, delete: false },
    checkPayments: { view: false, create: false, edit: false, delete: false },
  });

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: role?.name || "",
    },
  });

  // Initialize permissions when modal opens
  useEffect(() => {
    if (open) {
      if (isEditing && role) {
        setPermissions(role.permissions);
        form.setValue("name", role.name);
      } else {
        // Reset to all false for new roles
        setPermissions({
          users: { view: false, create: false, edit: false, delete: false },
          shipmentControl: { view: false, create: false, edit: false, delete: false },
          changeRequest: { view: false, create: false, edit: false, delete: false },
          checkPayments: { view: false, create: false, edit: false, delete: false },
        });
        form.setValue("name", "");
      }
    }
  }, [open, isEditing, role, form]);

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      form.reset();
      onClose();
    }
  };

  const updatePermission = (
    module: keyof PermissionState,
    action: keyof PermissionState[keyof PermissionState],
    value: boolean
  ) => {
    setPermissions(prev => ({
      ...prev,
      [module]: {
        ...prev[module],
        [action]: value,
      },
    }));
  };

  const toggleSelectAll = (module: keyof PermissionState) => {
    const modulePermissions = permissions[module];
    const allSelected = Object.values(modulePermissions).every(Boolean);
    const newValue = !allSelected;

    setPermissions(prev => ({
      ...prev,
      [module]: {
        view: newValue,
        create: newValue,
        edit: newValue,
        delete: newValue,
      },
    }));
  };

  const isModuleAllSelected = (module: keyof PermissionState) => {
    return Object.values(permissions[module]).every(Boolean);
  };

  const onSubmit = (data: RoleFormValues) => {
    // Check for duplicate role names
    const isDuplicate = existingRoles.some(
      existingRole => existingRole.name.toLowerCase() === data.name.toLowerCase() &&
                     existingRole.id !== role?.id
    );

    if (isDuplicate) {
      form.setError("name", {
        type: "manual",
        message: "A role with this name already exists",
      });
      return;
    }

    onSave({
      name: data.name,
      permissions,
      id: role?.id,
    });

    if (!isEditing) {
      toast.success("Role created successfully!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Role" : "Create New Role"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the role name and permissions."
              : "Create a new role and configure its permissions."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Role Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="name">Role Name</Label>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="e.g., Manager, Supervisor, Analyst"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Give your role a descriptive name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Permissions Section */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Permissions</Label>
              <div className="space-y-4">
                {modules.map((module) => (
                  <div key={module.key} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">{module.label}</Label>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`select-all-${module.key}`}
                          checked={isModuleAllSelected(module.key)}
                          onCheckedChange={() => toggleSelectAll(module.key)}
                        />
                        <Label
                          htmlFor={`select-all-${module.key}`}
                          className="text-sm text-muted-foreground cursor-pointer"
                        >
                          Select All
                        </Label>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {actions.map((action) => (
                        <div key={action.key} className="flex items-center space-x-2">
                          <Checkbox
                            id={`${module.key}-${action.key}`}
                            checked={permissions[module.key][action.key]}
                            onCheckedChange={(checked) =>
                              updatePermission(module.key, action.key, checked as boolean)
                            }
                          />
                          <Label
                            htmlFor={`${module.key}-${action.key}`}
                            className="text-sm cursor-pointer"
                          >
                            {action.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : isEditing ? "Update Role" : "Create Role"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
