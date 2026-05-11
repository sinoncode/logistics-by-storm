import api from "./api";

import type {
  CreateRolePayload,
} from "@/types/rbac";

export const getRoles = async () => {
  const response = await api.get("/roles");

  return response.data;
};

export const getRoleById = async (
  id: string
) => {
  const response = await api.get(
    `/roles/${id}`
  );

  return response.data;
};

export const createRole = async (
  data: CreateRolePayload
) => {
  const response = await api.post(
    "/roles",
    data
  );

  return response.data;
};

export const updateRole = async (
  id: string,
  data: CreateRolePayload
) => {
  const response = await api.put(
    `/roles/${id}`,
    data
  );

  return response.data;
};

export const deleteRole = async (
  id: string
) => {
  const response = await api.delete(
    `/roles/${id}`
  );

  return response.data;
};