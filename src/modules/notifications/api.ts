import { apiClient } from "@/lib/api/client";
import type {
    MarkNotificationsRead,
    MarkReadEnvelope,
    NotificationListEnvelope,
    UnreadCountEnvelope,
} from "./schema";

export const notificationsApi = {
  getUserNotifications: async (params?: {
    unreadOnly?: boolean;
    page?: number;
    pageSize?: number;
  }): Promise<NotificationListEnvelope> => {
    const response = await apiClient.get<NotificationListEnvelope>(
      "/notifications/user",
      {
        params: {
          unread_only: params?.unreadOnly,
          page: params?.page,
          page_size: params?.pageSize,
        },
      }
    );
    return response.data;
  },

  markRead: async (data: MarkNotificationsRead): Promise<MarkReadEnvelope> => {
    const response = await apiClient.post<MarkReadEnvelope>(
      "/notifications/user/mark-read",
      data
    );
    return response.data;
  },

  markAllRead: async (): Promise<MarkReadEnvelope> => {
    const response = await apiClient.post<MarkReadEnvelope>(
      "/notifications/user/mark-all-read"
    );
    return response.data;
  },

  getUnreadCount: async (): Promise<UnreadCountEnvelope> => {
    const response = await apiClient.get<UnreadCountEnvelope>(
      "/notifications/user/unread-count"
    );
    return response.data;
  },
};
