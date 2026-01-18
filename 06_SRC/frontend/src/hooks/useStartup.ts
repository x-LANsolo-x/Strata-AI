import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getStartupProfile, updateStartupProfile } from '@/services/startup.service';
import type { UpdateStartupInput } from '@/types/startup.types';

export const useStartupProfile = () => {
  return useQuery({
    queryKey: ['startupProfile'],
    queryFn: getStartupProfile,
  });
};

export const useUpdateStartupProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (input: UpdateStartupInput) => updateStartupProfile(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['startupProfile'] });
    },
  });
};
