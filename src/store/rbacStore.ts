import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-toastify";

import {
  getRoles,
  getPermissions,
  createRole as apiCreateRole,
  updateRole as apiUpdateRole,
  deleteRole as apiDeleteRole,
} from "@/services/rbac.service";

import type { Role, Permission } from "@/types/rbac";

interface RBACState {
  // ============================================
  // STATE
  // ============================================

  roles: Role[];
  permissions: Permission[];
  selectedRole: Role | null;

  // Hydration flag (true once persist has rehydrated from localStorage)
  hasHydrated: boolean;

  // Loading states
  isLoadingRoles: boolean;
  isLoadingPermissions: boolean;
  isSaving: boolean;

  // Error states
  rolesError: string | null;
  permissionsError: string | null;

  // ============================================
  // ACTIONS
  // ============================================

  // Hydration
  setHasHydrated: (value: boolean) => void;

  // Fetch actions
  fetchRoles: () => Promise<void>;
  fetchPermissions: () => Promise<void>;
  fetchAllData: () => Promise<void>;

  // Role selection
  selectRole: (role: Role | null) => void;

  // CRUD operations
  createRole: (data: { name: string; permissions: string[] }) => Promise<Role | null>;
  updateRole: (roleId: string, data: { name: string; permissions: string[] }) => Promise<Role | null>;
  deleteRole: (roleId: string) => Promise<boolean>;

  // Utility actions
  refreshData: () => Promise<void>;
  clearErrors: () => void;
  reset: () => void;
}

export const useRBACStore = create<RBACState>()(
  persist(
    (set, get) => ({
      // ============================================
      // INITIAL STATE
      // ============================================

      roles: [],
      permissions: [],
      selectedRole: null,

      hasHydrated: false,

      isLoadingRoles: false,
      isLoadingPermissions: false,
      isSaving: false,

      rolesError: null,
      permissionsError: null,

      // ============================================
      // HYDRATION
      // ============================================

      setHasHydrated: (value: boolean) => {
        set({ hasHydrated: value });
      },

      // ============================================
      // FETCH ACTIONS
      // ============================================

      /**
       * Fetch all roles from API and persist to store
       */
      fetchRoles: async () => {
        try {
          set({ isLoadingRoles: true, rolesError: null });

          const response = await getRoles();
          const roles = response.data;

          set({
            roles,
            isLoadingRoles: false,
            rolesError: null
          });

          // Auto-select first role if none selected
          const { selectedRole } = get();
          if (!selectedRole && roles.length > 0) {
            set({ selectedRole: roles[0] });
          }

          return roles;
        } catch (error: any) {
          const errorMessage = error?.response?.data?.message || error.message || 'Failed to fetch roles';
          set({
            rolesError: errorMessage,
            isLoadingRoles: false,
            roles: [],
            rolesError: errorMessage
          });
          throw error;
        }
      },

      /**
       * Fetch all permissions from API and persist to store
       */
      fetchPermissions: async () => {
        try {
          set({ isLoadingPermissions: true, permissionsError: null });

          const response = await getPermissions();
          let permissions = response.data;
          
          // Ensure permissions is always an array
          if (!Array.isArray(permissions)) {
            console.warn("⚠️ [RBAC Store] Permissions is not an array:", permissions);
            permissions = [];
          }

          set({
            permissions,
            isLoadingPermissions: false,
            permissionsError: null
          });

          return permissions;
        } catch (error: any) {
          const errorMessage = error?.response?.data?.message || error.message || 'Failed to fetch permissions';
          set({
            permissionsError: errorMessage,
            isLoadingPermissions: false,
            permissions: [],
            permissionsError: errorMessage
          });
          throw error;
        }
      },

      /**
       * Fetch both roles and permissions in parallel
       */
      fetchAllData: async () => {
        await Promise.all([get().fetchRoles(), get().fetchPermissions()]);
      },

      // ============================================
      // ROLE SELECTION
      // ============================================

      /**
       * Select a role (also persisted so refresh shows last selected role)
       */
      selectRole: (role: Role | null) => {
        set({ selectedRole: role });
      },

      // ============================================
      // CRUD OPERATIONS
      // ============================================

      /**
       * Create a new role, optimistically add it, then re-fetch for accuracy
       */
      createRole: async (data: { name: string; permissions: string[] }) => {
        try {
          set({ isSaving: true });

          const response = await apiCreateRole(data);
          const newRole = response?.data?.data || response?.data;

          if (newRole) {
            // Optimistically add new role immediately so UI updates instantly
            const { roles } = get();
            const updatedRoles = [...roles, newRole];

            set({
              roles: updatedRoles,
              selectedRole: newRole,
              isSaving: false,
            });

            toast.success(`Role "${newRole.name}" created successfully`);

            // Re-fetch to sync with server (ensures persisted data is accurate)
            get().fetchRoles();

            return newRole;
          }

          set({ isSaving: false });
          return null;
        } catch (error) {
          console.error("Error creating role:", error);
          set({ isSaving: false });
          toast.error("Failed to create role. Please try again.");
          return null;
        }
      },

      /**
       * Update an existing role's permissions
       */
      updateRole: async (roleId: string, data: { name: string; permissions: string[] }) => {
        try {
          set({ isSaving: true });

          const response = await apiUpdateRole(roleId, data);
          const updatedRole = response?.data?.data || response?.data;

          if (updatedRole) {
            const { roles } = get();
            const updatedRoles = roles.map((role) =>
              role.id === roleId ? updatedRole : role
            );

            set({
              roles: updatedRoles,
              selectedRole: updatedRole,
              isSaving: false,
            });

            toast.success("Permissions saved successfully");
            return updatedRole;
          }

          set({ isSaving: false });
          return null;
        } catch (error) {
          console.error("Error updating role:", error);
          set({ isSaving: false });
          toast.error("Failed to save permissions. Please try again.");
          return null;
        }
      },

      /**
       * Delete a role
       */
      deleteRole: async (roleId: string) => {
        try {
          set({ isSaving: true });

          await apiDeleteRole(roleId);

          const { roles, selectedRole } = get();
          const updatedRoles = roles.filter((role) => role.id !== roleId);

          // If deleted role was selected, select first available role
          let newSelectedRole = selectedRole;
          if (selectedRole?.id === roleId) {
            newSelectedRole = updatedRoles.length > 0 ? updatedRoles[0] : null;
          }

          set({
            roles: updatedRoles,
            selectedRole: newSelectedRole,
            isSaving: false,
          });

          toast.success("Role deleted successfully");
          return true;
        } catch (error) {
          console.error("Error deleting role:", error);
          set({ isSaving: false });
          toast.error("Failed to delete role. Please try again.");
          return false;
        }
      },

      // ============================================
      // UTILITY ACTIONS
      // ============================================

      /**
       * Refresh all data from server
       */
      refreshData: async () => {
        await get().fetchAllData();
        toast.success("Data refreshed successfully");
      },

      /**
       * Clear error states
       */
      clearErrors: () => {
        set({
          rolesError: null,
          permissionsError: null,
        });
      },

      /**
       * Reset store to initial state (clears persisted data too)
       */
      reset: () => {
        set({
          roles: [],
          permissions: [],
          selectedRole: null,
          isLoadingRoles: false,
          isLoadingPermissions: false,
          isSaving: false,
          rolesError: null,
          permissionsError: null,
        });
      },
    }),
    {
      name: "rbac-store", // localStorage key
      storage: createJSONStorage(() => localStorage),

      // Only persist data fields — NOT loading/error states
      partialize: (state) => ({
        roles: state.roles,
        permissions: state.permissions,
        selectedRole: state.selectedRole,
      }),

      // Called once localStorage data has been rehydrated into the store
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
    }
  )
);