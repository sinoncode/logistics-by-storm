// src/services/notification.service.ts

import axiosInstance from "@/lib/axios";

export const getNotifications = async () => {
  const response = await axiosInstance.get(
    "/admin/notifications"
  );

  return response.data?.data || response.data;
};