/**
 * Custom hook for permission checking in React components
 * Provides easy-to-use permission checking with proper typing
 */

import { useCallback } from "react";
import { useAuthStore } from "@/store/authStore";
import {
  PermissionChecker,
  ROLE_PERMISSIONS,
  groupPermissionsByModule,
} from "@/lib/permissions";

// ============================================
// PERMISSION HOOK
// ============================================

export const usePermissions = () => {
  const user = useAuthStore((state) => state.user);
  const permissions = user?.permissions || [];

  const checker = new PermissionChecker(permissions);

  // ============================================
  // GENERIC PERMISSION CHECKS
  // ============================================

  const can = useCallback(
    (permission: string): boolean => {
      return checker.can(permission);
    },
    [checker]
  );

  const canAny = useCallback(
    (permissions: string[]): boolean => {
      return checker.canAny(permissions);
    },
    [checker]
  );

  const canAll = useCallback(
    (permissions: string[]): boolean => {
      return checker.canAll(permissions);
    },
    [checker]
  );

  // ============================================
  // ROLE-SPECIFIC PERMISSION CHECKS
  // ============================================

  const canViewRoles = useCallback(
    (): boolean => checker.canViewRoles(),
    [checker]
  );

  const canCreateRoles = useCallback(
    (): boolean => checker.canCreateRoles(),
    [checker]
  );

  const canUpdateRoles = useCallback(
    (): boolean => checker.canUpdateRoles(),
    [checker]
  );

  const canDeleteRoles = useCallback(
    (): boolean => checker.canDeleteRoles(),
    [checker]
  );

  const canManageRoles = useCallback(
    (): boolean => checker.canManageRoles(),
    [checker]
  );

  // ============================================
  // PERMISSION UTILITIES
  // ============================================

  const getAllPermissions = useCallback((): string[] => {
    return checker.getPermissions();
  }, [checker]);

  const getGroupedPermissions = useCallback((): Record<string, string[]> => {
    return groupPermissionsByModule(permissions);
  }, [permissions]);

  const hasPermissionWithin = useCallback(
    (module: string): boolean => {
      return permissions.some((p: string) => p.startsWith(module + "."));
    },
    [permissions]
  );

  return {
    // User and permissions data
    user,
    permissions,
    checker,

    // Generic checks
    can,
    canAny,
    canAll,

    // Role-specific checks
    canViewRoles,
    canCreateRoles,
    canUpdateRoles,
    canDeleteRoles,
    canManageRoles,

    // Utilities
    getAllPermissions,
    getGroupedPermissions,
    hasPermissionWithin,

    // Permission constants for external use
    ROLE_PERMISSIONS,
  };
};

// ============================================
// PERMISSION GUARD HOOK (for route protection)
// ============================================

export const usePermissionGuard = (requiredPermissions: string[]) => {
  const { canAll, canAny } = usePermissions();

  const hasAccess = useCallback((): boolean => {
    if (!Array.isArray(requiredPermissions) || requiredPermissions.length === 0) {
      return true; // No specific permissions required
    }
    // By default, require all permissions
    return canAll(requiredPermissions);
  }, [requiredPermissions, canAll]);

  const hasAnyAccess = useCallback((): boolean => {
    if (!Array.isArray(requiredPermissions) || requiredPermissions.length === 0) {
      return true;
    }
    return canAny(requiredPermissions);
  }, [requiredPermissions, canAny]);

  return {
    hasAccess,
    hasAnyAccess,
    isAllowed: hasAccess(),
    isAllowedAny: hasAnyAccess(),
  };
};
