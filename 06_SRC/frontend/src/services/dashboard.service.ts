import type { DashboardData } from '@/types/dashboard.types';

// This function simulates an API call
export const getDashboardData = async (): Promise<DashboardData> => {
  console.log('Fetching dashboard data...');

  // Mock data
  const mockData: DashboardData = {
    runwayMonths: 8.9,
    metrics: [
      { id: 'balance', label: 'Cash Balance', value: '$120,000', change: '+2.1%', changeType: 'positive' },
      { id: 'burn', label: 'Net Monthly Burn', value: '$13,500', change: '+5.4%', changeType: 'negative' },
      { id: 'revenue', label: 'Monthly Revenue', value: '$10,000', change: '-1.5%', changeType: 'negative' },
      { id: 'mrr', label: 'MRR Growth', value: '13%', change: '+0.8%', changeType: 'positive' },
    ],
    cashFlow: [
      { month: 'Jul', balance: 180000 },
      { month: 'Aug', balance: 168000 },
      { month: 'Sep', balance: 155000 },
      { month: 'Oct', balance: 142000 },
      { month: 'Nov', balance: 133000 },
      { month: 'Dec', balance: 120000 },
    ],
  };

  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Dashboard data fetched.');
      resolve(mockData);
    }, 1000); // 1 second delay
  });
};
