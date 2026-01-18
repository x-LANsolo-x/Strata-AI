import { useRoadmaps } from '@/hooks/useRoadmaps';
import { RoadmapCard } from '@/components/shared/RoadmapCard';
import { Loader2 } from 'lucide-react';

export function RoadmapsPage() {
  const { data: roadmaps, isLoading } = useRoadmaps();

  if (isLoading) return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Execution Roadmaps</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {roadmaps?.map(roadmap => (
          <RoadmapCard key={roadmap.id} roadmap={roadmap} />
        ))}
      </div>
    </div>
  );
}
