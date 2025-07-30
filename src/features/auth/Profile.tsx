import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Avatar,
  Divider,
  Skeleton,
  Alert,
  useTheme,
  Grid,
  Fade,
  Grow,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useGetProfileQuery, useUpdateProfileMutation } from './userApi';
import { useLogoutMutation } from './api';
import { useSnackbar } from 'notistack';

//----------------------------------------------------------------------------------------------

export function Profile() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { data: user, isLoading, isError, refetch } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        phone: user.phone || '',
      });
    }
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData).unwrap();
      enqueueSnackbar('Profile updated successfully!', { variant: 'success' });
      setIsEditing(false);
      refetch(); // Refresh the data
    } catch (error: any) {
      enqueueSnackbar('Failed to update profile. Please try again.', { variant: 'error' });
    }
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      enqueueSnackbar('Logged out successfully!', { variant: 'success' });
      navigate('/');
    } catch (error: any) {
      enqueueSnackbar('Failed to logout. Please try again.', { variant: 'error' });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getFullName = () => {
    if (!user) return '';
    const firstName = user.first_name || '';
    const lastName = user.last_name || '';
    return `${firstName} ${lastName}`.trim() || 'User';
  };

  const getInitials = () => {
    const name = getFullName();
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Handle authentication error
  if (isError) {
    return (
      <Box sx={{
        maxWidth: 800,
        mx: 'auto',
        px: { xs: 2, sm: 4 },
        py: 4
      }}>
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small" onClick={() => navigate('/login')}>
              Login
            </Button>
          }
        >
          You need to be logged in to view your profile.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{
      maxWidth: 800,
      mx: 'auto',
      px: { xs: 2, sm: 4 },
      py: 4
    }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography 
          variant="h3" 
          fontWeight={700} 
          color="primary" 
          sx={{ 
            fontFamily: `'Playfair Display', 'Merriweather', serif`,
            mb: 1
          }}
        >
          My Profile
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary" 
          sx={{ 
            fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
            mb: 3
          }}
        >
          Manage your account information and preferences
        </Typography>
        <Button
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          disabled={isLoggingOut}
          sx={{
            borderRadius: 2,
            fontWeight: 600,
            px: 3,
            py: 1
          }}
        >
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </Button>
      </Box>

      {isLoading ? (
        // Loading skeleton
        <Grow in timeout={500}>
          <Card sx={{
            boxShadow: theme.shadows[4],
            borderRadius: 3,
            overflow: 'visible'
          }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Skeleton variant="circular" width={80} height={80} sx={{ mr: 3 }} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="60%" height={32} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="40%" height={24} />
                </Box>
              </Box>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Skeleton variant="text" width="100%" height={56} sx={{ mb: 2 }} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Skeleton variant="text" width="100%" height={56} sx={{ mb: 2 }} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Skeleton variant="text" width="100%" height={56} sx={{ mb: 2 }} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Skeleton variant="text" width="100%" height={56} sx={{ mb: 2 }} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grow>
      ) : (
        // Profile content
        <Fade in timeout={600}>
          <Card sx={{
            boxShadow: theme.shadows[4],
            borderRadius: 3,
            overflow: 'visible'
          }}>
            <CardContent sx={{ p: 4 }}>
              {/* Profile Header */}
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 4,
                flexDirection: { xs: 'column', sm: 'row' },
                textAlign: { xs: 'center', sm: 'left' }
              }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: theme.palette.primary.main,
                    fontSize: 32,
                    fontWeight: 600,
                    mr: { xs: 0, sm: 3 },
                    mb: { xs: 2, sm: 0 }
                  }}
                >
                  {getInitials()}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    sx={{
                      fontFamily: `'Playfair Display', 'Merriweather', serif`,
                      mb: 1
                    }}
                  >
                    {getFullName()}
                  </Typography>
                  <Chip
                    label={user?.role === 'admin' ? 'Administrator' : 'Customer'}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                </Box>
                {!isEditing && (
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={handleEdit}
                    sx={{
                      borderRadius: 2,
                      fontWeight: 600,
                      px: 3,
                      mt: { xs: 2, sm: 0 }
                    }}
                  >
                    Edit Profile
                  </Button>
                )}
              </Box>

              <Divider sx={{ mb: 4 }} />

              {/* Profile Information */}
              <Grid container spacing={3}>
                {/* Email */}
                <Grid size={{ xs: 12 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <EmailIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />
                    <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
                      Email Address
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                      pl: 4
                    }}
                  >
                    {user?.email}
                  </Typography>
                </Grid>

                {/* Full Name */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PersonIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />
                    <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
                      First Name
                    </Typography>
                  </Box>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      value={formData.first_name}
                      onChange={handleInputChange('first_name')}
                      placeholder="Enter your first name"
                      sx={{ pl: 4 }}
                    />
                  ) : (
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                        pl: 4
                      }}
                    >
                      {user?.first_name || 'Not provided'}
                    </Typography>
                  )}
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PersonIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />
                    <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
                      Last Name
                    </Typography>
                  </Box>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      value={formData.last_name}
                      onChange={handleInputChange('last_name')}
                      placeholder="Enter your last name"
                      sx={{ pl: 4 }}
                    />
                  ) : (
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                        pl: 4
                      }}
                    >
                      {user?.last_name || 'Not provided'}
                    </Typography>
                  )}
                </Grid>

                {/* Phone */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PhoneIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />
                    <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
                      Phone Number
                    </Typography>
                  </Box>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      value={formData.phone}
                      onChange={handleInputChange('phone')}
                      placeholder="Enter your phone number"
                      sx={{ pl: 4 }}
                    />
                  ) : (
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                        pl: 4
                      }}
                    >
                      {user?.phone || 'Not provided'}
                    </Typography>
                  )}
                </Grid>

                {/* Joined Date */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CalendarIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />
                    <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
                      Member Since
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                      pl: 4
                    }}
                  >
                    {user?.date_joined ? formatDate(user.date_joined) : 'Unknown'}
                  </Typography>
                </Grid>
              </Grid>

              {/* Edit Actions */}
              {isEditing && (
                <Box sx={{
                  display: 'flex',
                  gap: 2,
                  mt: 4,
                  justifyContent: { xs: 'center', sm: 'flex-end' }
                }}>
                  <Button
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    onClick={handleCancel}
                    sx={{
                      borderRadius: 2,
                      fontWeight: 600,
                      px: 3
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    disabled={isUpdating}
                    sx={{
                      borderRadius: 2,
                      fontWeight: 600,
                      px: 3
                    }}
                  >
                    {isUpdating ? 'Saving...' : 'Save Changes'}
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Fade>
      )}
    </Box>
  );
}
