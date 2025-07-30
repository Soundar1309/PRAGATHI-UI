import api from './axios';

export interface LoginResponse {
  user: {
    id: number;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    role: string;
  };
  access: string;
  refresh: string;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
  first_name: string;
  last_name: string;
  phone?: string;
}

export async function register(data: RegisterData): Promise<LoginResponse> {
  const response = await api.post('/register/', data);
  const { access } = response.data;
  
  if (access) {
    localStorage.setItem('jwt', access);
  }
  
  return response.data;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await api.post('/login/', { email, password });
  const { access } = response.data;
  
  if (access) {
    localStorage.setItem('jwt', access);
  }
  
  return response.data;
}

export async function logout(): Promise<void> {
  try {
    await api.delete('/logout/');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
  localStorage.removeItem('jwt');
  }
}

export async function getProfile() {
  const response = await api.get('/profile/');
  return response.data;
}

export async function updateProfile(data: Partial<RegisterData>) {
  const response = await api.patch('/profile/update/', data);
  return response.data;
}
