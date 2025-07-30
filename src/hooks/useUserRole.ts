import { useGetProfileQuery } from '../features/auth/userApi';

export function useUserRole() {
  const { data, isLoading } = useGetProfileQuery();
  return { role: data?.role, isLoading };
}
