import { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";

import Breadcrumb from "@/layouts/Breadcrumb";
import LazyWrapper from "@/components/LazyWrapper";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useAuthStore } from "@/store/authStore";

import { RoleList } from "@/components/rbac/RoleList";
import { PermissionTable } from "@/components/rbac/PermissionTable";
import { RoleModal } from "@/components/rbac/RoleModal";
import { DeleteRoleDialog } from "@/components/rbac/DeleteRoleDialog";

import { ShieldCheck, Save, Loader2 } from "lucide-react";

import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
} from "@/services/rbac.service";

import type {
  Role,
} from "@/types/rbac";

import type {
  CreateRolePayload,
} from "@/types/rbac";

const TeamsPermissions = () => {
  const [roles, setRoles] = useState<Role[]>([]);

  const [selectedRole, setSelectedRole] =
    useState<Role | null>(null);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    useState(false);

  const [roleToDelete, setRoleToDelete] =
    useState<Role | null>(null);

  const [isLoading, setIsLoading] =
    useState(false);

  const [isSaving, setIsSaving] =
    useState(false);

  const user = useAuthStore((state) => state.user);
  const userPermissions = user?.permissions || [];

  const can = (permission: string) =>
    userPermissions.includes(permission);

  const canViewRoles = can("roles.view");
  const canCreateRoles = can("roles.create");
  const canUpdateRoles = can("roles.update");
  const canDeleteRoles = can("roles.delete");

  const availablePermissions = useMemo(
    () => [...new Set(userPermissions)].sort(),
    [userPermissions]
  );

  // FETCH ROLES
  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setIsLoading(true);

      const response = await getRoles();

      const rolesData = response?.data || [];

      setRoles(rolesData);

      if (rolesData.length > 0) {
        setSelectedRole(rolesData[0]);
      }

    } catch (error) {

      console.error(error);

      toast.error("Failed to load roles");

    } finally {

      setIsLoading(false);
    }
  };

  // SELECT ROLE
  const handleSelectRole = (role: Role) => {
    setSelectedRole(role);
  };

  // OPEN ADD MODAL
  const handleAddRole = () => {
    if (!canCreateRoles) {
      toast.error(
        "You do not have permission to add roles."
      );
      return;
    }

    setIsModalOpen(true);
  };

  // CREATE ROLE
  const handleSaveRole = async (
    data: { name: string }
  ) => {
    if (!canCreateRoles) {
      toast.error(
        "You do not have permission to add roles."
      );
      return;
    }
    try {
      setIsSaving(true);

      const payload: CreateRolePayload = {
        name: data.name,
        permissions: [],
      };

      const response = await createRole(payload);

      const newRole = response.data;

      const updatedRoles = [
        ...roles,
        newRole,
      ];

      setRoles(updatedRoles);

      setSelectedRole(newRole);

      toast.success(
        "Role created successfully"
      );

      setIsModalOpen(false);

    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to create role"
      );

    } finally {
      setIsSaving(false);
    }
  };

  // SAVE PERMISSION CHANGES
  const handleSavePermissions = async () => {
    if (!selectedRole) return;
    if (!canUpdateRoles) {
      toast.error(
        "You do not have permission to update roles."
      );
      return;
    }

    try {
      setIsSaving(true);

      await updateRole(selectedRole.id, {
        name: selectedRole.name,
        permissions: selectedRole.permissions,
      });

      toast.success(
        "Permissions updated successfully"
      );

    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to update permissions"
      );

    } finally {
      setIsSaving(false);
    }
  };

  // DELETE ROLE
  const handleDeleteRole = (roleId: string) => {
    if (!canDeleteRoles) {
      toast.error(
        "You do not have permission to delete roles."
      );
      return;
    }

    const role = roles.find(
      (r) => r.id === roleId
    );

    if (role) {
      setRoleToDelete(role);
      setIsDeleteDialogOpen(true);
    }
  };

  // CONFIRM DELETE
  const handleConfirmDelete = async () => {
    if (!roleToDelete) return;

    try {
      setIsSaving(true);

      await deleteRole(roleToDelete.id);

      toast.success("Role deleted successfully");

      await fetchRoles();

      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete role");
    } finally {
      setIsSaving(false);
    }
  };

  // DUPLICATE ROLE
  const handleDuplicateRole = async (
    role: Role
  ) => {
    if (!canUpdateRoles) {
      toast.error(
        "You do not have permission to duplicate roles."
      );
      return;
    }

    try {
      setIsSaving(true);

      await createRole({
        name: `${role.name} Copy`,
        permissions: role.permissions || [],
      });

      toast.success(
        "Role duplicated successfully"
      );

      await fetchRoles();
    } catch (error) {
      console.error(error);

      toast.error("Failed to duplicate role");
    } finally {
      setIsSaving(false);
    }
  };

  // UPDATE PERMISSION
  const handlePermissionChange = (
    permission: string,
    value: boolean
  ) => {
    if (!selectedRole) return;
    if (!canUpdateRoles) return;

    const updatedRoles = roles.map((role) => {
      if (role.id !== selectedRole.id) {
        return role;
      }

      let updatedPermissions = [...role.permissions];

      if (value) {
        if (!updatedPermissions.includes(permission)) {
          updatedPermissions.push(permission);
        }
      } else {
        updatedPermissions = updatedPermissions.filter(
          (perm) => perm !== permission
        );
      }

      return {
        ...role,
        permissions: updatedPermissions,
      };
    });

    setRoles(updatedRoles);

    const updatedRole = updatedRoles.find(
      (r) => r.id === selectedRole.id
    );

    if (updatedRole) {
      setSelectedRole(updatedRole);
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

          {/* HEADER */}
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
                  Manage roles and assign permissions
                </p>

              </div>
            </div>

            <Button
              onClick={handleAddRole}
              disabled={!canCreateRoles}
              title={
                !canCreateRoles
                  ? "You need roles.create permission to add a new role."
                  : undefined
              }
              className="w-full sm:w-auto bg-green-600 hover:bg-[#02374C] text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              + Add New Role
            </Button>

          </div>

          {/* SAVING */}
          {isSaving && (
            <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">

              <Save className="h-4 w-4" />

              <span>Saving changes...</span>

            </div>
          )}

          <Separator />

          {/* LOADING */}
          {isLoading ? (

            <div className="flex items-center justify-center py-20">

              <Loader2 className="h-8 w-8 animate-spin text-primary" />

            </div>

          ) : (

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

              {/* SIDEBAR */}
              <div className="lg:col-span-1">
                {canViewRoles ? (
                  <RoleList
                    roles={roles}
                    selectedRole={selectedRole}
                    onSelectRole={handleSelectRole}
                    onDeleteRole={handleDeleteRole}
                    onDuplicateRole={handleDuplicateRole}
                    onAddRole={handleAddRole}
                    canCreate={canCreateRoles}
                    canUpdate={canUpdateRoles}
                    canDelete={canDeleteRoles}
                  />
                ) : (
                  <div className="rounded-3xl border border-muted p-6 bg-card text-sm text-muted-foreground">
                    <p className="font-semibold text-base text-slate-900 dark:text-white mb-2">
                      Permission required
                    </p>
                    <p>
                      You do not have permission to view roles. Contact your administrator if this is incorrect.
                    </p>
                  </div>
                )}
              </div>

              {/* PERMISSIONS */}
              <div className="lg:col-span-3 space-y-4">

                <PermissionTable
                  role={selectedRole}
                  availablePermissions={availablePermissions}
                  canEdit={canUpdateRoles}
                  onPermissionChange={
                    handlePermissionChange
                  }
                />

                {selectedRole && (
                  <Button
                    onClick={handleSavePermissions}
                    disabled={isSaving}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Permissions
                      </>
                    )}
                  </Button>
                )}

              </div>

            </div>
          )}

          {/* STATS */}
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
                  Permissions Count
                </p>

                <p className="text-2xl font-bold mt-2">
                  {selectedRole?.permissions
                    ?.length || 0}
                </p>

              </div>

            </div>
          )}

        </div>

      </LazyWrapper>

      {/* CREATE ROLE MODAL */}
      <RoleModal
        open={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        onSave={handleSaveRole}
        isLoading={isSaving}
      />

      {/* DELETE DIALOG */}
      <DeleteRoleDialog
        open={isDeleteDialogOpen}
        role={roleToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() =>
          setIsDeleteDialogOpen(false)
        }
        isLoading={isSaving}
      />
    </>
  );
};

export default TeamsPermissions;