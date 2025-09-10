import React, { useEffect, useState } from 'react';
import { Badge, IconButton, Menu, MenuItem, ListItemText } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import api from '../api/axios';
import { subscribeToNotifications } from '../utils/cable';

export function NotificationDropdown() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<{ id: number; message: string; created_at: string; read: boolean }[]>([]);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    api.get('/notifications?unread=true').then(res => {
      setNotifications(res.data.notifications || []);
      setUnread(res.data.notifications?.length || 0);
    });
    api.get('/notifications/unread_count').then(res => setUnread(res.data.unread_count || 0));
    const sub = subscribeToNotifications((notif) => {
      setNotifications((prev) => [notif, ...prev]);
      setUnread((u) => u + 1);
    });
    return () => sub?.unsubscribe();
  }, []);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleMarkAllRead = async () => {
    await api.patch('/notifications/mark_all_read');
    setUnread(0);
    setNotifications((prev) => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={unread} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        <MenuItem onClick={handleMarkAllRead}>Mark all as read</MenuItem>
        {notifications.length === 0 && <MenuItem>No notifications</MenuItem>}
        {notifications.map((n) => (
          <MenuItem key={n.id} selected={!n.read}>
            <ListItemText primary={n.message} secondary={n.created_at} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}