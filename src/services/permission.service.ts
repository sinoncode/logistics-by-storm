import api from "./api";

export const getPermissions = async () => {
  const response = await api.get("/admin/permissions");
  return response.data;
};