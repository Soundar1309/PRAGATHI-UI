// src/components/RequireRole.tsx
import type { JSX } from 'react';
import { useUserRole } from '../hooks/useUserRole';
import { Navigate, useLocation } from 'react-router-dom';

export function RequireRole({ children, role: requiredRole }: { children: JSX.Element, role: string }) {
  const { role, isLoading } = useUserRole();
  const location = useLocation();

  if (isLoading) return null;
  if (role !== requiredRole) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}
