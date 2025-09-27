import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

export const AuthTest: React.FC = () => {
  const { user, isAuthenticated, logout, refreshToken } = useAuth();

  const handleRefreshToken = async () => {
    try {
      const success = await refreshToken();
      if (success) {
        alert('Token refreshed successfully!');
      } else {
        alert('Token refresh failed!');
      }
    } catch (error) {
      console.error('Refresh error:', error);
      alert('Token refresh error!');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      alert('Logged out successfully!');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout error!');
    }
  };

  if (!isAuthenticated) {
    return (
      <Paper sx={{ p: 2, m: 2 }}>
        <Typography variant="h6" color="error">
          Not authenticated
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2, m: 2 }}>
      <Typography variant="h6" color="success.main">
        Authentication Test
      </Typography>
      <Typography variant="body1">
        User: {user?.name} ({user?.email})
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Status: {isAuthenticated ? 'Authenticated' : 'Not authenticated'}
      </Typography>
      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
        <Button variant="outlined" onClick={handleRefreshToken}>
          Test Token Refresh
        </Button>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Paper>
  );
};
