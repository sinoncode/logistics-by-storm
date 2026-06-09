// src/types/notification.ts

export interface Notification {
  id: string;
  title: string;
  body: string;
  created_at: string;
  is_read?: boolean;
}