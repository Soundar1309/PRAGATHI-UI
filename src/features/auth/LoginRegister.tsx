import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Box, Button, TextField, Typography, Tabs, Tab } from '@mui/material';


export function LoginRegister() {
  const [tab, setTab] = useState(0);
  const { login, register: registerUser, isLoading: isAuthLoading } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);


  // Login state
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  // Register state - Updated to include name and phone fields
  const [registerForm, setRegisterForm] = useState({ 
    email: '', 
    name: '',
    password: '', 
    password_confirmation: '',
    phone: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);
    
    try {
      await login(loginForm.email, loginForm.password);
      // Redirect to home after successful login
      window.location.href = '/';
    } catch (error: any) {
      console.error('Login error:', error);
      setLoginError(
        error?.response?.data?.non_field_errors?.[0] || 
        'Login failed. Please check your credentials.'
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError(null);
    setIsRegistering(true);
    
    try {
      await registerUser(registerForm);
      // Auto-login after successful registration
      setTab(0);
      // Redirect to home after successful registration and login
      window.location.href = '/';
    } catch (err: any) {
      console.error('Registration error:', err);
      setRegisterError(
        err?.response?.data?.email?.[0] || 
        err?.response?.data?.name?.[0] || 
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
      <Box sx={{ maxWidth: 400, mx: 'auto', mt: '150px', bgcolor: 'background.paper', p: 3, borderRadius: 3, boxShadow: 2 }}>
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
            {loginError && <Typography color="error">{loginError}</Typography>}
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
              label="Full Name" 
              fullWidth 
              margin="normal" 
              value={registerForm.name} 
              onChange={e => setRegisterForm(f => ({ ...f, name: e.target.value }))} 
            />
            <TextField 
              label="Phone Number" 
              fullWidth 
              margin="normal" 
              value={registerForm.phone} 
              onChange={e => setRegisterForm(f => ({ ...f, phone: e.target.value }))} 
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
