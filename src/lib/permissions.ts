/**
 * Permission utility functions for RBAC operations
 * Provides centralized permission checking logic
 */

import type { User } from "@/types/rbac";

// ============================================
// PERMISSION CONSTANTS
// ============================================

export const ROLE_PERMISSIONS = {
  // Role management permissions
  ROLES_VIEW: "roles.view",
  ROLES_CREATE: "roles.create",
  ROLES_UPDATE: "roles.update",
  ROLES_DELETE: "roles.delete",
  ROLES_ASSIGN: "roles.assign",

  // Permission management
  PERMISSIONS_VIEW: "permissions.view",
  PERMISSIONS_CREATE: "permissions.create",
  PERMISSIONS_UPDATE: "permissions.update",
  PERMISSIONS_DELETE: "permissions.delete",

  // Team management
  TEAMS_VIEW: "teams.view",
  TEAMS_CREATE: "teams.create",
  TEAMS_UPDATE: "teams.update",
  TEAMS_DELETE: "teams.delete",

  // User management
  USERS_VIEW: "users.view",
  USERS_CREATE: "users.create",
  USERS_UPDATE: "users.update",
  USERS_DELETE: "users.delete",
} as const;

// ============================================
// PERMISSION CHECKER CLASS
// ============================================

export class PermissionChecker {
  private permissions: string[];

  constructor(permissions: string[] = []) {
    this.permissions = Array.isArray(permissions) ? permissions : [];
  }

  /**
   * Check if user has a specific permission
   */
  can(permission: string): boolean {
    if (!permission || typeof permission !== "string") {
      return false;
    }
    return this.permissions.includes(permission);
  }

  /**
   * Check if user has any of the provided permissions
   */
  canAny(permissions: string[]): boolean {
    if (!Array.isArray(permissions) || permissions.length === 0) {
      return false;
    }
    return permissions.some((p) => this.can(p));
  }

  /**
   * Check if user has all of the provided permissions
   */
  canAll(permissions: string[]): boolean {
    if (!Array.isArray(permissions) || permissions.length === 0) {
      return false;
    }
    return permissions.every((p) => this.can(p));
  }

  /**
   * Check if user has a specific role-based permission
   */
  canManageRoles(): boolean {
    return this.canAny([
      ROLE_PERMISSIONS.ROLES_CREATE,
      ROLE_PERMISSIONS.ROLES_UPDATE,
      ROLE_PERMISSIONS.ROLES_DELETE,
    ]);
  }

  /**
   * Check if user can view roles
   */
  canViewRoles(): boolean {
    return this.can(ROLE_PERMISSIONS.ROLES_VIEW);
  }

  /**
   * Check if user can create roles
   */
  canCreateRoles(): boolean {
    return this.can(ROLE_PERMISSIONS.ROLES_CREATE);
  }

  /**
   * Check if user can update roles
   */
  canUpdateRoles(): boolean {
    return this.can(ROLE_PERMISSIONS.ROLES_UPDATE);
  }

  /**
   * Check if user can delete roles
   */
  canDeleteRoles(): boolean {
    return this.can(ROLE_PERMISSIONS.ROLES_DELETE);
  }

  /**
   * Get all permissions
   */
  getPermissions(): string[] {
    return [...this.permissions];
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Create a permission checker from user object
 */
export const createPermissionChecker = (user: User | null | undefined) => {
  const permissions = user?.permissions || [];
  return new PermissionChecker(permissions);
};

/**
 * Format permission string for display
 * @example "roles.create" -> "Create Roles"
 */
export const formatPermissionLabel = (permission: string): string => {
  if (!permission) return "";

  const [module, action] = permission.split(".");

  if (!action) {
    return module
      .replace(/[-_]/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const formattedAction = action
    .replace(/[-_]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const formattedModule = module
    .replace(/[-_]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return `${formattedAction} ${formattedModule}`;
};

/**
 * Group permissions by module
 */
export const groupPermissionsByModule = (
  permissions: string[]
): Record<string, string[]> => {
  return permissions.reduce(
    (acc, permission) => {
      const [module] = permission.split(".");

      if (!module) return acc;

      if (!acc[module]) {
        acc[module] = [];
      }

      if (!acc[module].includes(permission)) {
        acc[module].push(permission);
      }

      return acc;
    },
    {} as Record<string, string[]>
  );
};

/**
 * Validate if user has required permissions for an operation
 */
export const validatePermissions = (
  userPermissions: string[],
  requiredPermissions: string[]
): boolean => {
  const checker = new PermissionChecker(userPermissions);
  return checker.canAll(requiredPermissions);
};
