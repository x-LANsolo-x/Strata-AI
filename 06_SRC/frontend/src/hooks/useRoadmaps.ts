import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRoadmaps, getRoadmapById, generateRoadmapFromIdea } from '@/services/roadmap.service';

export const useRoadmaps = () => {
  return useQuery({
    queryKey: ['roadmaps'],
    queryFn: getRoadmaps,
  });
};

export const useRoadmap = (id: string) => {
  return useQuery({
    queryKey: ['roadmaps', id],
    queryFn: () => getRoadmapById(id),
    enabled: !!id, // Only run this query if an ID is provided
  });
};

export const useGenerateRoadmap = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (ideaTitle: string) => generateRoadmapFromIdea(ideaTitle),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roadmaps'] });
        }
    });
};
