import type { Idea } from '@/types/ideation.types';
import { Zap, Target, Gauge, GanttChartSquare, Loader2 } from 'lucide-react';
import { useGenerateRoadmap } from '@/hooks/useRoadmaps';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

const MarketOpportunityIndicator = ({ level }: { level: Idea['marketOpportunity'] }) => {
  const styles = {
    low: 'bg-gray-200 text-gray-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-green-100 text-green-800',
  };
  return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${styles[level]}`}>{level}</span>;
};

export function IdeaCard({ idea }: { idea: Idea }) {
  const navigate = useNavigate();
  const { mutate: generate, isPending } = useGenerateRoadmap();

  const handleGenerateRoadmap = () => {
    generate(idea.title, {
      onSuccess: (newRoadmap) => {
        navigate(`/roadmaps/${newRoadmap.id}`);
      },
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col h-full">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-blue-100 p-2 rounded-lg">
          <Zap className="h-5 w-5 text-blue-600" />
        </div>
        <h3 className="font-bold text-lg text-gray-900">{idea.title}</h3>
      </div>
      <p className="text-gray-600 flex-grow">{idea.description}</p>
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm">
        <div className="flex items-center gap-2 text-gray-700">
          <Gauge className="h-4 w-4 text-gray-500" />
          <span className="font-semibold">Feasibility: {idea.feasibility}/10</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Target className="h-4 w-4 text-gray-500" />
          <span className="font-semibold">Market:</span>
          <MarketOpportunityIndicator level={idea.marketOpportunity} />
        </div>
      </div>
      <div className="mt-6">
        <Button onClick={handleGenerateRoadmap} disabled={isPending} variant="secondary">
          {isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <GanttChartSquare className="h-4 w-4 mr-2" />}
          {isPending ? 'Generating...' : 'Generate Roadmap'}
        </Button>
      </div>
    </div>
  );
}
