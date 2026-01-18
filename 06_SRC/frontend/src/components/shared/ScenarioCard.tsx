import type { Scenario } from '@/types/scenario.types';
import { ArrowUpRight, ArrowDownRight, Tag } from 'lucide-react';

interface ScenarioCardProps {
  scenario: Scenario;
}

export function ScenarioCard({ scenario }: ScenarioCardProps) {
  const { name, type, result } = scenario;
  const isPositive = result.runwayDelta >= 0;
  const DeltaIcon = isPositive ? ArrowUpRight : ArrowDownRight;
  const deltaColor = isPositive ? 'text-green-600' : 'text-red-600';

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg text-gray-800">{name}</h3>
        <span className={`flex items-center text-lg font-bold ${deltaColor}`}>
          <DeltaIcon className="h-5 w-5 mr-1" />
          {result.runwayDelta.toFixed(1)} mo
        </span>
      </div>
      <div className="flex items-center gap-2 mt-3 text-gray-500">
        <Tag className="h-4 w-4" />
        <span className="text-sm font-medium capitalize">{type}</span>
      </div>
    </div>
  );
}
