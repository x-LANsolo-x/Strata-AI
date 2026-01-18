import type { Scenario, CreateScenarioInput } from '@/types/scenario.types';
import { getDashboardData } from './dashboard.service';

// Mock a database of scenarios
const scenariosDB: Scenario[] = [
  {
    id: 'scn_1',
    name: 'Hire 2 Sales Reps',
    type: 'hire',
    createdAt: new Date().toISOString(),
    modifications: {
      expenseChange: 10000,
      revenueChange: 4000,
      oneTimeCashChange: 0,
      description: 'Added 2 sales reps at $5k/month each.'
    },
    result: {
      newRunwayMonths: 5.1,
      runwayDelta: -3.8,
    },
  },
  {
    id: 'scn_2',
    name: 'Increase Marketing Spend',
    type: 'custom',
    createdAt: new Date().toISOString(),
    modifications: {
      expenseChange: 3000,
      revenueChange: 1500,
      oneTimeCashChange: 0,
      description: 'Increased ad spend by $3k/month.'
    },
    result: {
      newRunwayMonths: 7.2,
      runwayDelta: -1.7,
    },
  },
];

// GET all scenarios
export const getScenarios = async (): Promise<Scenario[]> => {
  console.log('Fetching scenarios...');
  // Simulate network delay
  return new Promise(resolve => setTimeout(() => resolve([...scenariosDB]), 500));
};

// POST a new scenario
export const createScenario = async (input: CreateScenarioInput): Promise<Scenario> => {
  console.log('Creating new scenario...', input);
  const dashboardData = await getDashboardData(); // Get baseline for calculation

  // Super simplified result calculation
  const baselineBurn = 13500;
  const newBurn = baselineBurn + input.modifications.expenseChange - input.modifications.revenueChange;
  const newRunway = (dashboardData.runwayMonths * baselineBurn - input.modifications.oneTimeCashChange) / newBurn;

  const newScenario: Scenario = {
    id: `scn_${Date.now()}`,
    ...input,
    createdAt: new Date().toISOString(),
    result: {
      newRunwayMonths: newRunway,
      runwayDelta: newRunway - dashboardData.runwayMonths,
    },
  };

  scenariosDB.push(newScenario);
  // Simulate network delay
  return new Promise(resolve => setTimeout(() => resolve(newScenario), 800));
};
