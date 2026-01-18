import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { DashboardMetric } from '@/types/dashboard.types';

interface StatCardProps {
  metric: DashboardMetric;
}

export function StatCard({ metric }: StatCardProps) {
  const isPositive = metric.changeType === 'positive';
  const ChangeIcon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{metric.label}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <h3 className="text-3xl font-bold text-gray-900">{metric.value}</h3>
        {metric.change && (
          <span className={`flex items-center text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            <ChangeIcon className="h-4 w-4" />
            {metric.change}
          </span>
        )}
      </div>
    </div>
  );
}
