import { useEffect } from "react";

import {
  getMessaging,
  onMessage,
} from "firebase/messaging";

import { app } from "@/firebase";

import { useNotificationStore } from "@/store/notificationStore";

import { toast } from "react-toastify";

export const useNotifications = () => {
  const addNotification =
    useNotificationStore(
      (state) => state.addNotification
    );

  useEffect(() => {
    const messaging =
      getMessaging(app);

    const unsubscribe = onMessage(
      messaging,
      (payload) => {
        const notification = {
          id: Date.now().toString(),

          title:
            payload.notification?.title ||
            "Notification",

          body:
            payload.notification?.body ||
            "",

          createdAt:
            new Date().toISOString(),
        };

        addNotification(notification);

        toast.info(notification.title);
      }
    );

    return () => unsubscribe();
  }, [addNotification]);
};