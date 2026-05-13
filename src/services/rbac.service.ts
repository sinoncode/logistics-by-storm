// src/services/rbac.service.ts

import api from "@/lib/axios";

// ============================================
// TYPES
// ============================================

type RoleResponse = {
  permissions?: any[];
  [key: string]: any;
};

// ============================================
// NORMALIZERS
// ============================================

/**
 * Normalize role permissions
 * Converts permission objects into string[]
 */
const normalizeRole = (role: RoleResponse) => ({
  ...role,

  permissions: Array.isArray(role?.permissions)
    ? role.permissions
        .map((p: any) =>
          typeof p === "string"
            ? p
            : p?.name
        )
        .filter(Boolean)
    : [],
});

/**
 * Normalize array of roles
 */
const normalizeRoles = (roles: any[]) => {
  if (!Array.isArray(roles)) {
    return [];
  }

  return roles.map(normalizeRole);
};

// ============================================
// PERMISSIONS
// ============================================

/**
 * Fetch all available permissions
 */
export const getPermissions = async () => {
  console.log("🌐 [RBAC Service] Fetching permissions from /permissions");

  try {
    const response = await api.get("/permissions");

    console.log("📨 [RBAC Service] Permissions response:", response);
    console.log("📨 [RBAC Service] Status:", response.status);
    console.log("📨 [RBAC Service] Data:", response.data);

    // Handle different API response formats (same as getRoles)
    // CASE 1: API response => { success: true, message: "...", data: [...] }
    if (response?.data?.success === true && Array.isArray(response?.data?.data)) {
      response.data = response.data.data;
    }

    // CASE 2: API response => { success: true, message: "...", data: { data: [...] } } (paginated)
    else if (response?.data?.success === true && Array.isArray(response?.data?.data?.data)) {
      response.data = response.data.data.data;
    }

    // CASE 3: API response => { success: true, message: "...", data: { permissions: [...] } }
    else if (response?.data?.success === true && Array.isArray(response?.data?.data?.permissions)) {
      response.data = response.data.data.permissions;
    }

    // CASE 4: API response => { data: [...] }
    else if (Array.isArray(response?.data?.data)) {
      response.data = response.data.data;
    }

    // CASE 5: API response => [...]
    else if (!Array.isArray(response?.data)) {
      // If it's not an array and not a recognized format, ensure we return an empty array
      response.data = [];
    }

    return response;
  } catch (error: any) {
    console.error("❌ [RBAC Service] Error fetching permissions:", error);
    console.error("❌ [RBAC Service] Error status:", error?.response?.status);
    console.error("❌ [RBAC Service] Error data:", error?.response?.data);
    throw error;
  }
};

// ============================================
// ROLES - GET
// ============================================

/**
 * Fetch all roles with optional filters
 */
export const getRoles = async (options?: {
  createdBy?: string;
  limit?: number;
  offset?: number;
}) => {
  const params = new URLSearchParams();

  if (options?.createdBy) {
    params.append("created_by", options.createdBy);
  }

  if (options?.limit) {
    params.append("limit", options.limit.toString());
  }

  if (options?.offset) {
    params.append("offset", options.offset.toString());
  }

  const queryString = params.toString();
  const url = queryString
    ? `/roles?${queryString}`
    : "/roles";

  try {
    const response = await api.get(url);

    // Handle different API response formats
    // CASE 1: API response => { success: true, message: "...", data: [...] }
    if (response?.data?.success === true && Array.isArray(response?.data?.data)) {
      response.data = normalizeRoles(response.data.data);
    }

    // CASE 2: API response => { success: true, message: "...", data: { data: [...] } } (paginated)
    else if (response?.data?.success === true && Array.isArray(response?.data?.data?.data)) {
      response.data = normalizeRoles(response.data.data.data);
    }

    // CASE 3: API response => { success: true, message: "...", data: { roles: [...] } }
    else if (response?.data?.success === true && Array.isArray(response?.data?.data?.roles)) {
      response.data = normalizeRoles(response.data.data.roles);
    }

    // CASE 4: API response => { data: [...] }
    else if (Array.isArray(response?.data?.data)) {
      response.data = normalizeRoles(response.data.data);
    }

    // CASE 5: API response => [...]
    else if (Array.isArray(response?.data)) {
      response.data = normalizeRoles(response.data);
    }

    return response;
  } catch (error: any) {
    console.error("❌ [RBAC Service] Error fetching roles:", error);
    console.error("❌ [RBAC Service] Error status:", error?.response?.status);
    console.error("❌ [RBAC Service] Error data:", error?.response?.data);
    throw error;
  }
};

/**
 * Fetch single role by ID
 */
export const getRoleById = async (
  roleId: string
) => {
  const response = await api.get(
    `/roles/${roleId}`
  );

  // CASE 1:
  // API response => { data: {...} }
  if (
    response?.data?.data &&
    typeof response.data.data === "object"
  ) {
    response.data.data = normalizeRole(
      response.data.data
    );
  }

  // CASE 2:
  // API response => {...}
  else if (
    response?.data &&
    typeof response.data === "object" &&
    "permissions" in response.data
  ) {
    response.data = normalizeRole(
      response.data
    );
  }

  return response;
};

// ============================================
// ROLES - CREATE
// ============================================

/**
 * Create a new role
 */
export const createRole = async (data: {
  name: string;
  permissions: string[];
}) => {
  const response = await api.post(
    "/roles",
    data
  );

  if (
    response?.data?.data &&
    typeof response.data.data === "object"
  ) {
    response.data.data = normalizeRole(
      response.data.data
    );
  }

  else if (
    response?.data &&
    typeof response.data === "object" &&
    "permissions" in response.data
  ) {
    response.data = normalizeRole(
      response.data
    );
  }

  return response;
};

// ============================================
// ROLES - UPDATE
// ============================================

/**
 * Update role
 */
export const updateRole = async (
  roleId: string,
  data: {
    name: string;
    permissions: string[];
  }
) => {
  const response = await api.put(
    `/roles/${roleId}`,
    data
  );

  if (
    response?.data?.data &&
    typeof response.data.data === "object"
  ) {
    response.data.data = normalizeRole(
      response.data.data
    );
  }

  else if (
    response?.data &&
    typeof response.data === "object" &&
    "permissions" in response.data
  ) {
    response.data = normalizeRole(
      response.data
    );
  }

  return response;
};

// ============================================
// ROLES - DELETE
// ============================================

/**
 * Delete role
 */
export const deleteRole = async (
  roleId: string
) => {
  return api.delete(`/roles/${roleId}`);
};