import type { DashboardData } from '@/types/dashboard.types';
import { apiClient } from './api.client';

interface RunwayResponse {
  current_month: string;
  cash_balance: number;
  monthly_burn_rate: number;
  runway_months: number;
  status: string;
}

interface FinancialRecord {
  id: string;
  month: string;
  revenue_recurring: number;
  revenue_one_time: number;
  expenses_salaries: number;
  expenses_marketing: number;
  expenses_infrastructure: number;
  expenses_other: number;
  cash_balance: number;
  total_revenue: number;
  total_expenses: number;
  net_burn: number;
}

// Helper to format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Helper to format month name
const formatMonthName = (monthStr: string): string => {
  const [year, month] = monthStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleString('default', { month: 'short' });
};

export const getDashboardData = async (): Promise<DashboardData> => {
  console.log('Fetching dashboard data from API...');

  try {
    // Fetch runway data
    const runway = await apiClient.get<RunwayResponse>('/financials/runway');
    
    // Fetch all financial records for historical data
    const records = await apiClient.get<FinancialRecord[]>('/financials/export');
    
    // Sort records by month
    const sortedRecords = records.sort((a, b) => a.month.localeCompare(b.month));
    const latestRecords = sortedRecords.slice(-6); // Last 6 months
    
    // Calculate metrics
    const latestRecord = sortedRecords[sortedRecords.length - 1];
    const previousRecord = sortedRecords[sortedRecords.length - 2];
    
    // Calculate changes (if we have previous data)
    let balanceChange = '0%';
    let burnChange = '0%';
    let revenueChange = '0%';
    
    if (previousRecord && latestRecord) {
      const balanceDiff = ((latestRecord.cash_balance - previousRecord.cash_balance) / previousRecord.cash_balance) * 100;
      balanceChange = `${balanceDiff >= 0 ? '+' : ''}${balanceDiff.toFixed(1)}%`;
      
      const burnDiff = ((latestRecord.net_burn - previousRecord.net_burn) / Math.abs(previousRecord.net_burn || 1)) * 100;
      burnChange = `${burnDiff >= 0 ? '+' : ''}${burnDiff.toFixed(1)}%`;
      
      const revDiff = ((latestRecord.total_revenue - previousRecord.total_revenue) / (previousRecord.total_revenue || 1)) * 100;
      revenueChange = `${revDiff >= 0 ? '+' : ''}${revDiff.toFixed(1)}%`;
    }

    const dashboardData: DashboardData = {
      runwayMonths: runway.runway_months > 100 ? 999 : runway.runway_months, // Cap at 999 for "profitable"
      metrics: [
        { 
          id: 'balance', 
          label: 'Cash Balance', 
          value: formatCurrency(runway.cash_balance), 
          change: balanceChange, 
          changeType: runway.cash_balance >= (previousRecord?.cash_balance || 0) ? 'positive' : 'negative' 
        },
        { 
          id: 'burn', 
          label: 'Net Monthly Burn', 
          value: formatCurrency(Math.abs(runway.monthly_burn_rate)), 
          change: burnChange, 
          changeType: runway.monthly_burn_rate <= 0 ? 'positive' : 'negative' // Negative burn is good (profitable)
        },
        { 
          id: 'revenue', 
          label: 'Monthly Revenue', 
          value: formatCurrency(latestRecord?.total_revenue || 0), 
          change: revenueChange, 
          changeType: revenueChange.startsWith('+') ? 'positive' : 'negative' 
        },
        { 
          id: 'runway', 
          label: 'Runway Status', 
          value: runway.status, 
          change: `${runway.runway_months > 100 ? '∞' : runway.runway_months.toFixed(1)} months`, 
          changeType: runway.status === 'Healthy' ? 'positive' : runway.status === 'Warning' ? 'neutral' : 'negative' 
        },
      ],
      cashFlow: latestRecords.map(record => ({
        month: formatMonthName(record.month),
        balance: record.cash_balance,
      })),
    };

    console.log('Dashboard data fetched from API.');
    return dashboardData;
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    // Return empty/default data on error
    return {
      runwayMonths: 0,
      metrics: [
        { id: 'balance', label: 'Cash Balance', value: '$0', change: '0%', changeType: 'neutral' },
        { id: 'burn', label: 'Net Monthly Burn', value: '$0', change: '0%', changeType: 'neutral' },
        { id: 'revenue', label: 'Monthly Revenue', value: '$0', change: '0%', changeType: 'neutral' },
        { id: 'runway', label: 'Runway Status', value: 'No Data', change: 'Add financial data', changeType: 'neutral' },
      ],
      cashFlow: [],
    };
  }
};
