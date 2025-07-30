import React, { useState } from 'react';
import { useLoginMutation } from './api';
import { register } from '../../api/auth';
import { Box, Button, TextField, Typography, Tabs, Tab } from '@mui/material';
import { usePendingActions } from '../../hooks/usePendingActions';

export function LoginRegister() {
  const [tab, setTab] = useState(0);
  const [login, { isLoading: isLoggingIn, error: loginError }] = useLoginMutation();
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const { executePendingAction } = usePendingActions();

  // Login state
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  // Register state - Updated to include all required fields
  const [registerForm, setRegisterForm] = useState({ 
    email: '', 
    username: '',
    password: '', 
    password_confirmation: '',
    first_name: '',
    last_name: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(loginForm).unwrap();
      // Execute any pending actions (like add to cart)
      await executePendingAction();
      // If no pending action, redirect to home
      if (!localStorage.getItem('pendingAction')) {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError(null);
    setIsRegistering(true);
    
    try {
      // Use the proper register function from auth.ts
      const response = await register(registerForm);
      console.log('Registration successful:', response);
      // Auto-login after successful registration
      setTab(0);
      // Optionally auto-login with the new credentials
      await login({ email: registerForm.email, password: registerForm.password }).unwrap();
      // Execute any pending actions (like add to cart)
      await executePendingAction();
      // If no pending action, redirect to home
      if (!localStorage.getItem('pendingAction')) {
        window.location.href = '/';
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      setRegisterError(
        err?.response?.data?.email?.[0] || 
        err?.response?.data?.username?.[0] || 
        err?.response?.data?.password?.[0] || 
        err?.response?.data?.non_field_errors?.[0] || 
        'Registration failed. Please check your information.'
      );
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <>
      <div className="tamil-motif" style={{ margin: '2rem auto' }} />
      <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, bgcolor: 'background.paper', p: 3, borderRadius: 3, boxShadow: 2 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        {tab === 0 && (
          <form onSubmit={handleLogin}>
            <TextField 
              label="Email" 
              fullWidth 
              margin="normal" 
              value={loginForm.email} 
              onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))} 
            />
            <TextField 
              label="Password" 
              type="password" 
              fullWidth 
              margin="normal" 
              value={loginForm.password} 
              onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))} 
            />
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              disabled={isLoggingIn} 
              sx={{ mt: 2, fontWeight: 600, fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif` }}
            >
              Login
            </Button>
            {loginError && <Typography color="error">Login failed</Typography>}
          </form>
        )}
        {tab === 1 && (
          <form onSubmit={handleRegister}>
            <TextField 
              label="Email" 
              fullWidth 
              margin="normal" 
              value={registerForm.email} 
              onChange={e => setRegisterForm(f => ({ ...f, email: e.target.value }))} 
            />
            <TextField 
              label="Username" 
              fullWidth 
              margin="normal" 
              value={registerForm.username} 
              onChange={e => setRegisterForm(f => ({ ...f, username: e.target.value }))} 
            />
            <TextField 
              label="First Name" 
              fullWidth 
              margin="normal" 
              value={registerForm.first_name} 
              onChange={e => setRegisterForm(f => ({ ...f, first_name: e.target.value }))} 
            />
            <TextField 
              label="Last Name" 
              fullWidth 
              margin="normal" 
              value={registerForm.last_name} 
              onChange={e => setRegisterForm(f => ({ ...f, last_name: e.target.value }))} 
            />
            <TextField 
              label="Password" 
              type="password" 
              fullWidth 
              margin="normal" 
              value={registerForm.password} 
              onChange={e => setRegisterForm(f => ({ ...f, password: e.target.value }))} 
            />
            <TextField 
              label="Confirm Password" 
              type="password" 
              fullWidth 
              margin="normal" 
              value={registerForm.password_confirmation} 
              onChange={e => setRegisterForm(f => ({ ...f, password_confirmation: e.target.value }))} 
            />
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              disabled={isRegistering}
              sx={{ mt: 2, fontWeight: 600, fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif` }}
            >
              {isRegistering ? 'Registering...' : 'Register'}
            </Button>
            {registerError && <Typography color="error">{registerError}</Typography>}
          </form>
        )}
      </Box>
    </>
  );
}
