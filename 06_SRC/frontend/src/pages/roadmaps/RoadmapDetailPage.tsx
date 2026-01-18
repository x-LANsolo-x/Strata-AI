import { useParams } from 'react-router-dom';
import { useRoadmap } from '@/hooks/useRoadmaps';
import { Loader2, CheckCircle, Circle } from 'lucide-react';

export function RoadmapDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: roadmap, isLoading, isError } = useRoadmap(id!);

  if (isLoading) return <div data-testid="loader" className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  if (isError || !roadmap) return <div>Roadmap not found.</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{roadmap.title}</h1>
      <div className="space-y-8">
        {roadmap.phases.map(phase => (
          <div key={phase.id} className="pl-4 border-l-4 border-gray-200">
            <h2 className="text-xl font-semibold mb-2">Phase {phase.phaseNumber}: {phase.name}</h2>
            <p className="text-gray-500 mb-4">{phase.description} ({phase.durationWeeks} weeks)</p>
            <div className="space-y-3">
              {phase.tasks.map(task => (
                <div key={task.id} className="flex items-center gap-3">
                  {task.isCompleted ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Circle className="h-5 w-5 text-gray-400" />}
                  <span className={`${task.isCompleted ? 'line-through text-gray-500' : 'text-gray-700'}`}>{task.title}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
