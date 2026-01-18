import { useDashboard } from '@/hooks/useDashboard';
import { StatCard } from '@/components/shared/StatCard';
import { CashFlowChart } from '@/components/charts/CashFlowChart';
import { RunwayGauge } from '@/components/charts/RunwayGauge'; // 1. Import the new component
import { Loader2 } from 'lucide-react';

export function DashboardPage() {
  const { data, isLoading, isError, error } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline ml-2">{error.message}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {data?.metrics.map(metric => (
          <StatCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 2. Replace the placeholder with the RunwayGauge */}
        {data?.runwayMonths && <RunwayGauge months={data.runwayMonths} />}

        {data?.cashFlow && <CashFlowChart data={data.cashFlow} />}
      </div>
    </div>
  );
}
