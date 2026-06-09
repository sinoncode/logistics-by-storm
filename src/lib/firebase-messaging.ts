import { getMessaging, getToken } from "firebase/messaging";
import { app } from "@/firebase";

const messaging = getMessaging(app);
const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY as string | undefined;

export const requestNotificationPermission = async () => {
  try {
    if (!"Notification" in window) {
      console.warn("Notifications are not supported in this browser.");
      return null;
    }

    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      return null;
    }

    if (!vapidKey) {
      console.warn(
        "VAPID key is not configured. Set VITE_FIREBASE_VAPID_KEY in your environment."
      );
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey,
    });

    return token;
  } catch (error) {
    console.error(error);
    return null;
  }
};