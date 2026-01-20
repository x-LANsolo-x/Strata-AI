import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import type { ExpenseCategory } from '@/types/dashboard.types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ExpenseBreakdownProps {
  data?: ExpenseCategory[];
  totalExpenses?: number;
}

// Default data if none provided
const defaultData: ExpenseCategory[] = [
  { name: 'Marketing', value: 65600, percentage: 28, color: '#1B8A6B' },
  { name: 'Operations', value: 45200, percentage: 22, color: '#34d399' },
  { name: 'Services', value: 18300, percentage: 11, color: '#6ee7b7' },
  { name: 'Infrastructure', value: 65600, percentage: 28, color: '#a7f3d0' },
];

export function ExpenseBreakdown({ data = defaultData, totalExpenses }: ExpenseBreakdownProps) {
  // Calculate total if not provided
  const total = totalExpenses || data.reduce((sum, item) => sum + item.value, 0);

  const chartData = {
    labels: data.map(d => d.name),
    datasets: [
      {
        data: data.map(d => d.value),
        backgroundColor: data.map(d => d.color),
        borderColor: '#ffffff',
        borderWidth: 3,
        hoverBorderWidth: 4,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        display: false, // Custom legend below
      },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#1f2937',
        bodyColor: '#6b7280',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context: { label: string; parsed: number }) {
            return `${context.label}: $${context.parsed.toLocaleString()}`;
          }
        }
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-card">
      {/* Header */}
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Expense Breakdown</h3>

      {/* Chart with center text */}
      <div className="relative h-48 mb-6">
        <Doughnut data={chartData} options={options} />
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-xs text-gray-500 font-medium">Total Expenses</p>
          <p className="text-2xl font-bold text-gray-900">
            ${total.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span 
                className="flex-shrink-0 h-3 w-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-gray-500 truncate">{item.name}:</span>
            </div>
            <span className="text-xs font-semibold text-gray-900">
              ${(item.value / 1000).toFixed(1)}k
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
