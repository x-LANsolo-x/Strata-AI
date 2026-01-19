import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import type { RevenueComparison as RevenueComparisonData } from '@/types/dashboard.types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface RevenueComparisonProps {
  data?: RevenueComparisonData[];
  currentYearLabel?: string;
  previousYearLabel?: string;
}

// Default data if none provided
const defaultData: RevenueComparisonData[] = [
  { month: 'Jan', currentYear: 280000, previousYear: 220000 },
  { month: 'Feb', currentYear: 320000, previousYear: 280000 },
  { month: 'Mar', currentYear: 350000, previousYear: 300000 },
  { month: 'Apr', currentYear: 380000, previousYear: 320000 },
  { month: 'May', currentYear: 420000, previousYear: 350000 },
  { month: 'Jun', currentYear: 385000, previousYear: 325000 },
  { month: 'Jul', currentYear: 450000, previousYear: 380000 },
  { month: 'Aug', currentYear: 480000, previousYear: 400000 },
  { month: 'Sep', currentYear: 420000, previousYear: 360000 },
  { month: 'Oct', currentYear: 390000, previousYear: 340000 },
  { month: 'Nov', currentYear: 360000, previousYear: 320000 },
  { month: 'Dec', currentYear: 400000, previousYear: 350000 },
];

export function RevenueComparison({ 
  data = defaultData, 
  currentYearLabel = '2026',
  previousYearLabel = '2025'
}: RevenueComparisonProps) {
  const chartData = {
    labels: data.map(d => d.month),
    datasets: [
      {
        label: currentYearLabel,
        data: data.map(d => d.currentYear),
        backgroundColor: '#1B8A6B',
        borderRadius: 4,
        borderSkipped: false,
        barPercentage: 0.7,
        categoryPercentage: 0.8,
      },
      {
        label: previousYearLabel,
        data: data.map(d => d.previousYear),
        backgroundColor: '#d1fae5',
        borderRadius: 4,
        borderSkipped: false,
        barPercentage: 0.7,
        categoryPercentage: 0.8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false, // Custom legend
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#1f2937',
        bodyColor: '#6b7280',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        callbacks: {
          label: function(context: { dataset: { label: string }; parsed: { y: number } }) {
            return `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9ca3af',
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: '#f3f4f6',
        },
        ticks: {
          color: '#9ca3af',
          font: {
            size: 12,
          },
          callback: function(value: number | string) {
            const numValue = Number(value);
            if (numValue >= 1000) {
              return '$' + (numValue / 1000) + 'k';
            }
            return '$' + numValue;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Revenue Comparison</h3>
        
        {/* Custom Legend */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-primary-500" />
            <span className="text-sm text-gray-600">{currentYearLabel}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-primary-100" />
            <span className="text-sm text-gray-600">{previousYearLabel}</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <Bar options={options} data={chartData} />
      </div>
    </div>
  );
}
