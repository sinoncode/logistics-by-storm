import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import Breadcrumb from "@/layouts/Breadcrumb";
import LazyWrapper from "@/components/LazyWrapper";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { useAuthStore } from "@/store/authStore";
import { useRBACStore } from "@/store/rbacStore";

import { RoleList } from "@/components/rbac/RoleList";
import { PermissionTable } from "@/components/rbac/PermissionTable";
import { RoleModal } from "@/components/rbac/RoleModal";
import { DeleteRoleDialog } from "@/components/rbac/DeleteRoleDialog";

import { ShieldCheck, Save, Loader2, RefreshCw } from "lucide-react";

import type { Role } from "@/types/rbac";

const TeamsPermissions = () => {
  // ============================================
  // LOCAL STATE (UI CONTROLS)
  // ============================================

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
  const [pendingPermissions, setPendingPermissions] = useState<string[] | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  // ============================================
  // GLOBAL STATE (ZUSTAND)
  // ============================================

  const {
    roles,
    permissions,
    selectedRole,
    isLoadingRoles,
    isLoadingPermissions,
    isSaving,
    fetchAllData,
    selectRole,
    createRole,
    updateRole,
    deleteRole,
    refreshData,
  } = useRBACStore();

  // ============================================
  // AUTH & PERMISSIONS
  // ============================================

  const user = useAuthStore((state) => state.user);
  const userPermissions = user?.permissions || [];

  const can = (permission: string) => userPermissions.includes(permission);

  const canViewRoles = can("roles.view");
  const canCreateRoles = can("roles.create");
  const canUpdateRoles = can("roles.update");
  const canDeleteRoles = can("roles.delete");

  // ============================================
  // EFFECTS
  // ============================================

  // Fetch data on mount
  useEffect(() => {
    fetchAllData();
  }, []);

  // Update pending permissions when selected role changes
  useEffect(() => {
    if (selectedRole) {
      setPendingPermissions([...(selectedRole.permissions || [])]);
      setIsDirty(false);
    }
  }, [selectedRole?.id]);

  // ============================================
  // HANDLERS
  // ============================================

  const handleSelectRole = (role: Role) => {
    selectRole(role);
  };

  const handleAddRole = () => {
    if (!canCreateRoles) {
      toast.error("You do not have permission to create roles.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleSaveRole = async (data: { name: string }) => {
    if (!canCreateRoles) {
      toast.error("You do not have permission to create roles.");
      return;
    }

    const newRole = await createRole({
      name: data.name.trim(),
      permissions: [],
    });

    if (newRole) {
      setIsModalOpen(false);
      toast.success(`Role "${newRole.name}" created successfully!`);
    }
  };

  const handlePermissionChange = (permission: string, value: boolean) => {
    if (!selectedRole || !canUpdateRoles) return;

    setPendingPermissions((prev) => {
      const current = prev ?? selectedRole.permissions ?? [];
      const updated = value
        ? [...current, permission].filter((p, i, arr) => arr.indexOf(p) === i)
        : current.filter((p) => p !== permission);
      return updated;
    });

    setIsDirty(true);
  };

  const handleSavePermissions = async () => {
    if (!selectedRole || !canUpdateRoles) return;

    const updated = await updateRole(selectedRole.id, {
      name: selectedRole.name,
      permissions: pendingPermissions ?? selectedRole.permissions ?? [],
    });

    if (updated) {
      setPendingPermissions([...(updated.permissions || [])]);
      setIsDirty(false);
    }
  };

  const handleDeleteRole = (roleId: string) => {
    if (!canDeleteRoles) {
      toast.error("You do not have permission to delete roles.");
      return;
    }

    const role = roles.find((r) => r.id === roleId);
    if (role) {
      setRoleToDelete(role);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (!roleToDelete) return;

    const success = await deleteRole(roleToDelete.id);
    if (success) {
      setIsDeleteDialogOpen(false);
      setRoleToDelete(null);
      setPendingPermissions(null);
      setIsDirty(false);
    }
  };

  const handleDuplicateRole = async (role: Role) => {
    if (!canCreateRoles) {
      toast.error("You do not have permission to duplicate roles.");
      return;
    }

    await createRole({
      name: `${role.name} Copy`,
      permissions: role.permissions || [],
    });
  };

  // ============================================
  // RENDER
  // ============================================

  const isLoading = isLoadingRoles || isLoadingPermissions;
  const effectiveRole = selectedRole
    ? {
        ...selectedRole,
        permissions: pendingPermissions ?? selectedRole.permissions,
      }
    : null;

  const availablePermissions = (Array.isArray(permissions) ? permissions : [])
    .map((p: any) => p.name || p.id || "")
    .filter(Boolean)
    .sort();

  return (
    <>
      <Breadcrumb
        title="Teams & Permissions"
        text="Manage roles and assign permissions dynamically"
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

            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                onClick={refreshData}
                variant="outline"
                disabled={isLoading}
                className="flex-1 sm:flex-none"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              </Button>

              <Button
                onClick={handleAddRole}
                disabled={!canCreateRoles || isSaving}
                className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white"
              >
                + Add New Role
              </Button>
            </div>
          </div>

          {/* STATUS MESSAGES */}
          {isSaving && (
            <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Saving changes...</span>
            </div>
          )}

          {isDirty && !isSaving && (
            <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
              <div className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                <span>You have unsaved permission changes</span>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setPendingPermissions([...(selectedRole?.permissions || [])]);
                    setIsDirty(false);
                  }}
                >
                  Discard
                </Button>
                <Button
                  size="sm"
                  onClick={handleSavePermissions}
                  disabled={isSaving}
                >
                  Save Now
                </Button>
              </div>
            </div>
          )}

          <Separator />

          {/* LOADING STATE */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

              {/* SIDEBAR - ROLE LIST */}
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
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground">
                        You do not have permission to view roles.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* MAIN - PERMISSIONS */}
              <div className="lg:col-span-3 space-y-4">
                {canViewRoles && selectedRole ? (
                  <>
                    <PermissionTable
                      role={effectiveRole}
                      availablePermissions={availablePermissions}
                      canEdit={canUpdateRoles}
                      onPermissionChange={handlePermissionChange}
                    />

                    {canUpdateRoles && (
                      <Button
                        onClick={handleSavePermissions}
                        disabled={isSaving || !isDirty}
                        className="w-full"
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
                  </>
                ) : (
                  <Card>
                    <CardContent className="flex items-center justify-center py-20">
                      <p className="text-muted-foreground">
                        {!canViewRoles
                          ? "You do not have permission to view permissions."
                          : "Select a role to view and manage permissions"}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

            </div>
          )}

          {/* STATS */}
          {!isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Roles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{roles.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{permissions.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Selected Role</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{selectedRole?.name || "None"}</div>
                </CardContent>
              </Card>
            </div>
          )}

        </div>
      </LazyWrapper>

      {/* MODALS */}
      <RoleModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveRole}
        isLoading={isSaving}
      />

      <DeleteRoleDialog
        open={isDeleteDialogOpen}
        role={roleToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteDialogOpen(false);
          setRoleToDelete(null);
        }}
        isLoading={isSaving}
      />
    </>
  );
};

export default TeamsPermissions;
