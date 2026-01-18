export interface DashboardMetric {
  id: string;
  label: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative';
}

export interface CashFlowDataPoint {
  month: string;
  balance: number;
}

export interface DashboardData {
  runwayMonths: number;
  metrics: DashboardMetric[];
  cashFlow: CashFlowDataPoint[];
}
