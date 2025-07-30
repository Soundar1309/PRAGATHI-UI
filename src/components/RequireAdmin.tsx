import type { JSX } from 'react';
import { useGetProfileQuery } from '../features/auth/userApi';
import { Navigate, useLocation } from 'react-router-dom';

export function RequireAdmin({ children }: { children: JSX.Element }) {
  const { data, isLoading } = useGetProfileQuery();
  const location = useLocation();

  if (isLoading) return null;
  if (!data || data.role !== 'admin') {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}
