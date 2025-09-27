import api from './axios';

export interface LoginResponse {
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
    phone?: string;
  };
  access: string;
  refresh: string;
}

export interface RegisterData {
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
  phone?: string;
}

export async function register(data: RegisterData): Promise<LoginResponse> {
  const response = await api.post('/users/register/', data);
  const { access, refresh } = response.data;
  
  if (access) {
    localStorage.setItem('jwt', access);
  }
  if (refresh) {
    localStorage.setItem('refreshToken', refresh);
  }
  
  return response.data;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await api.post('/users/login/', { email, password });
  const { access, refresh } = response.data;
  
  if (access) {
    localStorage.setItem('jwt', access);
  }
  if (refresh) {
    localStorage.setItem('refreshToken', refresh);
  }
  
  return response.data;
}

export async function logout(): Promise<void> {
  try {
    await api.delete('/users/logout/');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('jwt');
    localStorage.removeItem('refreshToken');
  }
}

export async function getProfile() {
  const response = await api.get('/users/profile/');
  return response.data;
}

export async function updateProfile(data: Partial<RegisterData>) {
  const response = await api.patch('/users/profile/update/', data);
  return response.data;
}
