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

const TeamsPermissions = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load roles from localStorage on mount
  useEffect(() => {
    try {
      const storedRoles = localStorage.getItem(STORAGE_KEY);
      if (storedRoles) {
        const parsedRoles = JSON.parse(storedRoles);
        setRoles(parsedRoles);
        if (parsedRoles.length > 0) {
          setSelectedRole(parsedRoles[0]);
        }
      } else {
        // Initialize with default roles
        setRoles(DEFAULT_ROLES);
        setSelectedRole(DEFAULT_ROLES[0]);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ROLES));
      }
    } catch (error) {
      console.error("Error loading roles from localStorage:", error);
      setRoles(DEFAULT_ROLES);
      setSelectedRole(DEFAULT_ROLES[0]);
      toast.error("Failed to load roles");
    }
  }, []);

  // Auto-save roles to localStorage
  const saveRolesToStorage = useCallback((rolesToSave: Role[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rolesToSave));
      setHasUnsavedChanges(false);
      toast.success("Changes saved automatically");
    } catch (error) {
      console.error("Error saving roles:", error);
      toast.error("Failed to save changes");
    }
  }, []);

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
    const updatedRole = updatedRoles.find((r) => r.id === selectedRole.id);
    if (updatedRole) {
      setSelectedRole(updatedRole);
    }
    setHasUnsavedChanges(true);
    saveRolesToStorage(updatedRoles);
  };

  // Handle role selection
  const handleSelectRole = (role: Role) => {
    setSelectedRole(role);
  };

  // Handle add role
  const handleAddRole = () => {
    setIsModalOpen(true);
  };

  // Handle save role (create or update)
  const handleSaveRole = (data: { name: string; id?: string }) => {
    setIsLoading(true);
    try {
      if (data.id) {
        // Update existing role
        const updatedRoles = roles.map((role) =>
          role.id === data.id ? { ...role, name: data.name } : role
        );
        setRoles(updatedRoles);
        const updatedRole = updatedRoles.find((r) => r.id === data.id);
        if (updatedRole) {
          setSelectedRole(updatedRole);
        }
        toast.success("Role updated successfully");
        saveRolesToStorage(updatedRoles);
      } else {
        // Create new role
        const newRole: Role = {
          id: `role-${Date.now()}`,
          name: data.name,
          permissions: {
            users: { view: false, create: false, edit: false, delete: false },
            shipmentControl: { view: false, create: false, edit: false, delete: false },
            changeRequest: { view: false, create: false, edit: false, delete: false },
            checkPayments: { view: false, create: false, edit: false, delete: false },
          },
        };
        const newRoles = [...roles, newRole];
        setRoles(newRoles);
        setSelectedRole(newRole);
        toast.success("Role created successfully");
        saveRolesToStorage(newRoles);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving role:", error);
      toast.error("Failed to save role");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete role
  const handleDeleteRole = (roleId: string) => {
    const role = roles.find((r) => r.id === roleId);
    if (role) {
      setRoleToDelete(role);
      setIsDeleteDialogOpen(true);
    }
  };

  // Confirm delete role
  const handleConfirmDelete = () => {
    if (!roleToDelete) return;

    setIsLoading(true);
    try {
      const updatedRoles = roles.filter((r) => r.id !== roleToDelete.id);
      setRoles(updatedRoles);
      
      // Select first role after deletion
      if (selectedRole?.id === roleToDelete.id) {
        setSelectedRole(updatedRoles.length > 0 ? updatedRoles[0] : null);
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

  // Handle duplicate role
  const handleDuplicateRole = (role: Role) => {
    try {
      const duplicatedRole: Role = {
        ...role,
        id: `role-${Date.now()}`,
        name: `${role.name} (Copy)`,
      };
      const newRoles = [...roles, duplicatedRole];
      setRoles(newRoles);
      setSelectedRole(duplicatedRole);
      saveRolesToStorage(newRoles);
      toast.success("Role duplicated successfully");
    } catch (error) {
      console.error("Error duplicating role:", error);
      toast.error("Failed to duplicate role");
    }
  };

  return (
    <>
      <Breadcrumb title="Teams & Permissions" text="Manage roles and access control" />
      <LazyWrapper>
        <div className="space-y-6 p-4 md:p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
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
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
            >
              + Add New Role
            </Button>
          </div>

          {/* Auto-save indicator */}
          {hasUnsavedChanges && (
            <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
              <Save className="h-4 w-4" />
              <span>Saving changes...</span>
            </div>
          )}

          <Separator />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Role List */}
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

            {/* Right Section - Permission Table */}
            <div className="lg:col-span-3">
              <PermissionTable
                role={selectedRole}
                onPermissionChange={handlePermissionChange}
              />
            </div>
          </div>

          {/* Summary Statistics */}
          {roles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="p-4 rounded-lg border bg-card">
                <p className="text-sm text-muted-foreground">Total Roles</p>
                <p className="text-2xl font-bold mt-2">{roles.length}</p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <p className="text-sm text-muted-foreground">Default Roles</p>
                <p className="text-2xl font-bold mt-2">{roles.filter(r => r.id.includes('role-')).length}</p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <p className="text-sm text-muted-foreground">Selected Role</p>
                <p className="text-2xl font-bold mt-2">{selectedRole?.name || "None"}</p>
              </div>
            </div>
          )}
        </div>
      </LazyWrapper>

      {/* Modals */}
      <RoleModal
        open={isModalOpen}
        role={null}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveRole}
        isLoading={isLoading}
      />

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
