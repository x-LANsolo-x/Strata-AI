import { Link } from 'react-router-dom';
import type { Roadmap } from '@/types/roadmap.types';
import { GanttChartSquare, Timer, TrendingUp } from 'lucide-react';

export function RoadmapCard({ roadmap }: { roadmap: Roadmap }) {
  return (
    <Link to={`/roadmaps/${roadmap.id}`} className="block">
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-500 transition-all cursor-pointer h-full">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-purple-100 p-2 rounded-lg">
            <GanttChartSquare className="h-5 w-5 text-purple-600" />
          </div>
          <h3 className="font-bold text-lg text-gray-900">{roadmap.title}</h3>
        </div>
        <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
          <span className="flex items-center gap-2">
            <Timer className="h-4 w-4" /> {roadmap.totalDurationWeeks} weeks
          </span>
          <span className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" /> {roadmap.progress}% complete
          </span>
        </div>
      </div>
    </Link>
  );
}
