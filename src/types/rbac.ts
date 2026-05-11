/* =========================================
   PERMISSION TYPES
========================================= */

export interface Permission {
  id?: string;
  name: string;
  guard_name?: string;
  created_at?: string;
  updated_at?: string;
}

/* =========================================
   ROLE TYPES
========================================= */

export interface Role {
  id: string;
  name: string;
  permissions: string[];
  created_at?: string;
  updated_at?: string;
}

/* =========================================
   ROLE API PAYLOADS
========================================= */

export interface CreateRolePayload {
  name: string;
  permissions: string[];
}

export interface UpdateRolePayload {
  name: string;
  permissions: string[];
}

/* =========================================
   API RESPONSE TYPES
========================================= */

export interface PermissionsResponse {
  success?: boolean;
  message?: string;
  data: Permission[];
}

export interface RolesResponse {
  success?: boolean;
  message?: string;
  data: Role[];
}

export interface SingleRoleResponse {
  success?: boolean;
  message?: string;
  data: Role;
}

/* =========================================
   USER TYPES
========================================= */

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string[];
  permissions: string[];
}

/* =========================================
   AUTH RESPONSE TYPES
========================================= */

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    access_token: string;
    token_type: string;
    user: User;
  };
}

/* =========================================
   PERMISSION GROUPING TYPES
========================================= */

export interface GroupedPermissions {
  [module: string]: Permission[];
}

/* =========================================
   TABLE TYPES
========================================= */

export interface RoleTableColumn {
  key: string;
  label: string;
}

/* =========================================
   MODAL TYPES
========================================= */

export interface RoleModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

/* =========================================
   HELPER TYPES
========================================= */

export type PermissionAction =
  | "view"
  | "create"
  | "update"
  | "delete";


  export type PermissionModule =
  | "users"
  | "shipmentControl"
  | "changeRequest"
  | "checkPayments";

export type PermissionString = `${string}.${PermissionAction}`;

/* =========================================
   STATIC FALLBACKS (OPTIONAL)
========================================= */

export const DEFAULT_PERMISSION_ACTIONS: PermissionAction[] = [
  "view",
  "create",
  "update",
  "delete",
];
/* =========================================
   PERMISSION HELPERS
========================================= */

export const hasPermission = (
  permissions: string[],
  permission: string
): boolean => {
  return permissions.includes(permission);
};

export const hasAnyPermission = (
  permissions: string[],
  requiredPermissions: string[]
): boolean => {
  return requiredPermissions.some((permission) =>
    permissions.includes(permission)
  );
};

export const hasAllPermissions = (
  permissions: string[],
  requiredPermissions: string[]
): boolean => {
  return requiredPermissions.every((permission) =>
    permissions.includes(permission)
  );
};

/* =========================================
   GROUP PERMISSIONS BY MODULE
========================================= */

export const groupPermissionsByModule = (
  permissions: Permission[]
): GroupedPermissions => {
  return permissions.reduce((acc, permission) => {
    const module = permission.name.split(".")[0];

    if (!acc[module]) {
      acc[module] = [];
    }

    acc[module].push(permission);

    return acc;
  }, {} as GroupedPermissions);
};