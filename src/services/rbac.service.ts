// src/services/rbac.service.ts

import api from "@/lib/axios";

// Get all permissions
export const getPermissions = async () => {
  return api.get("/permissions");
};

// Get all roles
export const getRoles = async () => {
  return api.get("/roles");
};

// Create role
export const createRole = async (data: {
  name: string;
  permissions: string[];
}) => {
  return api.post("/roles", data);
};

// Update role
export const updateRole = async (
  roleId: string,
  data: {
    name: string;
    permissions: string[];
  }
) => {
  return api.put(`/roles/${roleId}`, data);
};

// Delete role
export const deleteRole = async (roleId: string) => {
  return api.delete(`/roles/${roleId}`);
};