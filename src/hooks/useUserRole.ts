import { useGetProfileQuery } from '../features/auth/userApi';

export function useUserRole() {
  const hasToken = !!localStorage.getItem('jwt');
  const { data, isLoading } = useGetProfileQuery(undefined, { 
    skip: !hasToken 
  });
  return { role: data?.role, isLoading: hasToken ? isLoading : false };
}
