import { useQuery } from '@tanstack/react-query';
import { getDashboardData } from '@/services/dashboard.service';

export const useDashboard = () => {
  return useQuery({
    queryKey: ['dashboardData'], // A unique key for this query
    queryFn: getDashboardData, // The function that will fetch the data
    staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
  });
};
