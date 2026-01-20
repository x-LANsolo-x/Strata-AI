import type { Roadmap, Phase, Task } from '@/types/roadmap.types';
import { apiClient } from './api.client';

interface APITask {
  id: string;
  title: string;
  description: string;
  estimated_hours?: number;
  assignee_role?: string;
  is_completed: boolean;
}

interface APIKPI {
  metric: string;
  target: string;
  measurement_method: string;
}

interface APIPhase {
  phase_number: number;
  title: string;
  description: string;
  duration_weeks: number;
  tasks: APITask[];
  kpis: APIKPI[];
  resources_needed: string[];
  dependencies: string[];
  risks: string[];
}

interface APIRoadmapResponse {
  id: string;
  title: string;
  strategy_description: string;
  total_duration_weeks: number;
  phases: APIPhase[];
  success_criteria: string[];
  budget_estimate?: string;
  created_at: string;
}

// Local storage for roadmaps
const roadmapsDB: Roadmap[] = [];

// Transform API response to frontend Roadmap type
const transformAPIRoadmap = (apiRoadmap: APIRoadmapResponse): Roadmap => {
  const phases: Phase[] = apiRoadmap.phases.map((phase) => ({
    id: `phase_${phase.phase_number}`,
    phaseNumber: phase.phase_number,
    name: phase.title,
    description: phase.description,
    durationWeeks: phase.duration_weeks,
    tasks: phase.tasks.map((task): Task => ({
      id: task.id,
      title: task.title,
      isCompleted: task.is_completed,
    })),
  }));

  return {
    id: apiRoadmap.id,
    title: apiRoadmap.title,
    totalDurationWeeks: apiRoadmap.total_duration_weeks,
    progress: 0, // Calculate based on completed tasks if needed
    phases,
  };
};

export const getRoadmaps = async (): Promise<Roadmap[]> => {
  console.log('Fetching roadmaps...');
  return [...roadmapsDB];
};

export const getRoadmapById = async (id: string): Promise<Roadmap | undefined> => {
  console.log(`Fetching roadmap by id: ${id}`);
  return roadmapsDB.find(r => r.id === id);
};

export const generateRoadmapFromIdea = async (ideaTitle: string, ideaDescription?: string): Promise<Roadmap> => {
  console.log(`Generating roadmap for idea: ${ideaTitle}`);

  try {
    const response = await apiClient.post<APIRoadmapResponse>('/roadmaps/generate', {
      strategy_title: ideaTitle,
      strategy_description: ideaDescription || `Execute the strategy: ${ideaTitle}. Focus on validating the concept, building an MVP, and acquiring early customers.`,
      available_runway_months: 12,
      team_size: 3,
      priority: 'high',
    });

    const roadmap = transformAPIRoadmap(response);
    roadmapsDB.push(roadmap);
    
    console.log('Roadmap generated from API.');
    return roadmap;
  } catch (error) {
    console.error('Failed to generate roadmap:', error);
    
    // Fallback to local generation
    const fallbackRoadmap: Roadmap = {
      id: `rdmp_${Date.now()}`,
      title: `${ideaTitle} Execution Plan`,
      totalDurationWeeks: 12,
      progress: 0,
      phases: [
        { id: 'p1', phaseNumber: 1, name: 'Planning & Research', description: 'Research and plan the execution', durationWeeks: 2, tasks: [] },
        { id: 'p2', phaseNumber: 2, name: 'Development', description: 'Build the core product/feature', durationWeeks: 6, tasks: [] },
        { id: 'p3', phaseNumber: 3, name: 'Launch & Iterate', description: 'Launch and gather feedback', durationWeeks: 4, tasks: [] },
      ],
    };
    roadmapsDB.push(fallbackRoadmap);
    return fallbackRoadmap;
  }
};

// Get roadmap templates from API
export const getRoadmapTemplates = async () => {
  try {
    const response = await apiClient.get<{ templates: Array<{ id: string; title: string; description: string; suggested_team_size: number; typical_duration_weeks: number }> }>('/roadmaps/templates');
    return response.templates;
  } catch (error) {
    console.error('Failed to fetch roadmap templates:', error);
    return [];
  }
};
