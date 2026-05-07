import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

import Breadcrumb from "@/layouts/Breadcrumb";
import LazyWrapper from "@/components/LazyWrapper";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import type { Role, PermissionModule } from "@/types/rbac";
import { DEFAULT_ROLES } from "@/types/rbac";

import { RoleList } from "@/components/rbac/RoleList";
import { PermissionTable } from "@/components/rbac/PermissionTable";
import { RoleModal } from "@/components/rbac/RoleModal";
import { DeleteRoleDialog } from "@/components/rbac/DeleteRoleDialog";

import { ShieldCheck, Save } from "lucide-react";

const STORAGE_KEY = "rbac_roles";

// const DEFAULT_PERMISSIONS = {
//   dashboard: {
//     view: false,
//     create: false,
//     edit: false,
//     delete: false,
//   },
//   users: {
//     view: false,
//     create: false,
//     edit: false,
//     delete: false,
//   },
//   teams: {
//     view: false,
//     create: false,
//     edit: false,
//     delete: false,
//   },
//   reports: {
//     view: false,
//     create: false,
//     edit: false,
//     delete: false,
//   },
// };

const TeamsPermissions = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // Load roles from localStorage
  useEffect(() => {
    try {
      const storedRoles = localStorage.getItem(STORAGE_KEY);

      if (storedRoles) {
        const parsedRoles: Role[] = JSON.parse(storedRoles);

        setRoles(parsedRoles);

        if (parsedRoles.length > 0) {
          setSelectedRole(parsedRoles[0]);
        }
      } else {
        setRoles(DEFAULT_ROLES);
        setSelectedRole(DEFAULT_ROLES[0]);

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(DEFAULT_ROLES)
        );
      }
    } catch (error) {
      console.error("Error loading roles:", error);

      setRoles(DEFAULT_ROLES);
      setSelectedRole(DEFAULT_ROLES[0]);

      toast.error("Failed to load roles");
    }
  }, []);

  // Save roles
  const saveRolesToStorage = useCallback(
    (rolesToSave: Role[]) => {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(rolesToSave)
        );

        setHasUnsavedChanges(false);
      } catch (error) {
        console.error("Error saving roles:", error);

        toast.error("Failed to save changes");
      }
    },
    []
  );

  // Handle permission change
  const handlePermissionChange = (
    module: PermissionModule,
    action: keyof Role["permissions"][PermissionModule],
    value: boolean
  ) => {
    if (!selectedRole) return;

    const updatedRoles = roles.map((role) => {
      if (role.id === selectedRole.id) {
        return {
          ...role,
          permissions: {
            ...role.permissions,
            [module]: {
              ...role.permissions[module],
              [action]: value,
            },
          },
        };
      }

      return role;
    });

    setRoles(updatedRoles);

    const updatedRole = updatedRoles.find(
      (r) => r.id === selectedRole.id
    );

    if (updatedRole) {
      setSelectedRole(updatedRole);
    }

    setHasUnsavedChanges(true);

    saveRolesToStorage(updatedRoles);
  };

  // Select role
  const handleSelectRole = (role: Role) => {
    setSelectedRole(role);
  };

  // Open add modal
  const handleAddRole = () => {
    setIsModalOpen(true);
  };

  // Create role
  const handleSaveRole = (data: { name: string }) => {
    setIsLoading(true);

    try {
      const newRole: Role = {
        id: `role-${Date.now()}`,
        name: data.name,

        // Important: clone permissions
        permissions: structuredClone(DEFAULT_ROLES[0].permissions),
      };

      const updatedRoles = [...roles, newRole];

      setRoles(updatedRoles);

      setSelectedRole(newRole);

      saveRolesToStorage(updatedRoles);

      toast.success("Role created successfully");

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating role:", error);

      toast.error("Failed to create role");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete role
  const handleDeleteRole = (roleId: string) => {
    const role = roles.find((r) => r.id === roleId);

    if (role) {
      setRoleToDelete(role);

      setIsDeleteDialogOpen(true);
    }
  };

  // Confirm delete
  const handleConfirmDelete = () => {
    if (!roleToDelete) return;

    setIsLoading(true);

    try {
      const updatedRoles = roles.filter(
        (r) => r.id !== roleToDelete.id
      );

      setRoles(updatedRoles);

      // Select another role if deleted
      if (selectedRole?.id === roleToDelete.id) {
        setSelectedRole(
          updatedRoles.length > 0 ? updatedRoles[0] : null
        );
      }

      saveRolesToStorage(updatedRoles);

      toast.success("Role deleted successfully");

      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting role:", error);

      toast.error("Failed to delete role");
    } finally {
      setIsLoading(false);
    }
  };

  // Duplicate role
  const handleDuplicateRole = (role: Role) => {
    try {
      const duplicatedRole: Role = {
        ...role,
        id: `role-${Date.now()}`,
        name: `${role.name} (Copy)`,

        permissions: structuredClone(role.permissions),
      };

      const updatedRoles = [...roles, duplicatedRole];

      setRoles(updatedRoles);

      setSelectedRole(duplicatedRole);

      saveRolesToStorage(updatedRoles);

      toast.success("Role duplicated successfully");
    } catch (error) {
      console.error("Error duplicating role:", error);

      toast.error("Failed to duplicate role");
    }
  };

  return (
    <>
      <Breadcrumb
        title="Teams & Permissions"
        text="Manage roles and access control"
      />

      <LazyWrapper>
        <div className="space-y-6 p-4 md:p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>

              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                  Teams & Permissions
                </h1>

                <p className="text-sm text-muted-foreground mt-1">
                  Manage roles and assign permissions to modules
                </p>
              </div>
            </div>

            <Button
              onClick={handleAddRole}
              className="w-full sm:w-auto bg-green-600 hover:bg-[#02374C] text-white"
            >
              + Add New Role
            </Button>
          </div>

          {/* Auto Save */}
          {hasUnsavedChanges && (
            <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
              <Save className="h-4 w-4" />

              <span>Saving changes...</span>
            </div>
          )}

          <Separator />

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <RoleList
                roles={roles}
                selectedRole={selectedRole}
                onSelectRole={handleSelectRole}
                onDeleteRole={handleDeleteRole}
                onDuplicateRole={handleDuplicateRole}
                onAddRole={handleAddRole}
              />
            </div>

            {/* Permissions */}
            <div className="lg:col-span-3">
              <PermissionTable
                role={selectedRole}
                onPermissionChange={handlePermissionChange}
              />
            </div>
          </div>

          {/* Statistics */}
          {roles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="p-4 rounded-xl border bg-card">
                <p className="text-sm text-muted-foreground">
                  Total Roles
                </p>

                <p className="text-2xl font-bold mt-2">
                  {roles.length}
                </p>
              </div>

              <div className="p-4 rounded-xl border bg-card">
                <p className="text-sm text-muted-foreground">
                  Active Role
                </p>

                <p className="text-2xl font-bold mt-2">
                  {selectedRole?.name || "None"}
                </p>
              </div>

              <div className="p-4 rounded-xl border bg-card">
                <p className="text-sm text-muted-foreground">
                  Permission Modules
                </p>

                <p className="text-2xl font-bold mt-2">
                  {
  selectedRole
    ? Object.keys(selectedRole.permissions).length
    : 0
}
                </p>
              </div>
            </div>
          )}
        </div>
      </LazyWrapper>

      {/* Create Role Modal */}
      <RoleModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveRole}
        isLoading={isLoading}
      />

      {/* Delete Modal */}
      <DeleteRoleDialog
        open={isDeleteDialogOpen}
        role={roleToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteDialogOpen(false)}
        isLoading={isLoading}
      />
    </>
  );
};

export default TeamsPermissions;