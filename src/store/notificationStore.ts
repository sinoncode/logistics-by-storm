import { create } from "zustand";
import { getNotifications } from "@/services/notification.service";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  action_url: string;
}

interface NotificationStore {
  notifications: NotificationItem[];

  fetchNotifications: () => Promise<void>;

  addNotification: (
    notification: NotificationItem
  ) => void;

  clearNotifications: () => void;
}

export const useNotificationStore =
  create<NotificationStore>((set) => ({
    notifications: [],

    fetchNotifications: async () => {
  try {
    const response =
      await getNotifications();

    const notifications =
      (response || []).map(
        (notification: NotificationItem) => ({
          ...notification,

         action_url:
  notification.action_url?.replace(
    "admin/",
    ""
  ) || "",
        })
      );

    set({
      notifications,
    });
  } catch (error) {
    console.error(
      "Failed to fetch notifications",
      error
    );
  }
},

    addNotification: (notification) =>
      set((state) => ({
        notifications: [
          notification,
          ...state.notifications,
        ],
      })),

    clearNotifications: () =>
      set({
        notifications: [],
      }),
  }));