import { useDashboard } from '@/hooks/useDashboard';
import { StatCard } from '@/components/shared/StatCard';
import { CashFlowChart } from '@/components/charts/CashFlowChart';
import { ExpenseBreakdown } from '@/components/charts/ExpenseBreakdown';
import { RevenueComparison } from '@/components/charts/RevenueComparison';
import { Loader2 } from 'lucide-react';

export function DashboardPage() {
  const { data, isLoading, isError, error } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-danger/10 border border-danger text-danger px-4 py-3 rounded-xl" role="alert">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline ml-2">{error.message}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards Row - 4 cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {data?.metrics.map(metric => (
          <StatCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Charts Row - Cash Flow (larger) + Expense Breakdown (smaller) */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {data?.cashFlow && <CashFlowChart data={data.cashFlow} />}
        </div>
        <div className="lg:col-span-1">
          <ExpenseBreakdown 
            data={data?.expenseBreakdown} 
            totalExpenses={data?.metrics.find(m => m.id === 'expenses')?.value ? 
              parseFloat(data.metrics.find(m => m.id === 'expenses')!.value.replace(/[$,]/g, '')) : 
              undefined
            } 
          />
        </div>
      </div>

      {/* Revenue Comparison - Full Width */}
      <RevenueComparison data={data?.revenueComparison} />
    </div>
  );
}
