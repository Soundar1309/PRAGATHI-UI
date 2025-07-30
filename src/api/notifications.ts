import api from './axios';

export interface Notification {
  id: number;
  user: number;
  title: string;
  message: string;
  notification_type: 'order_update' | 'product_restock' | 'promotion' | 'system';
  read: boolean;
  related_object_type?: string;
  related_object_id?: number;
  created_at: string;
  updated_at: string;
}

export interface CreateNotificationData {
  title: string;
  message: string;
  notification_type: 'order_update' | 'product_restock' | 'promotion' | 'system';
  related_object_type?: string;
  related_object_id?: number;
}

// Notifications API
export const notificationsApi = {
  // Get all notifications for current user
  getAll: async (params?: {
    page?: number;
    read?: boolean;
    notification_type?: string;
  }) => {
    const response = await api.get('/notifications/', { params });
    return response.data;
  },

  // Get single notification
  getById: async (id: number) => {
    const response = await api.get(`/notifications/${id}/`);
    return response.data;
  },

  // Mark notification as read
  markAsRead: async (id: number) => {
    const response = await api.patch(`/notifications/${id}/`, { read: true });
    return response.data;
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    const response = await api.patch('/notifications/mark_all_read/');
    return response.data;
  },

  // Delete notification
  delete: async (id: number) => {
    await api.delete(`/notifications/${id}/`);
  },

  // Get unread count
  getUnreadCount: async () => {
    const response = await api.get('/notifications/unread_count/');
    return response.data;
  },

  // Get notifications by type
  getByType: async (type: string) => {
    const response = await api.get('/notifications/', { params: { notification_type: type } });
    return response.data;
  },
}; 