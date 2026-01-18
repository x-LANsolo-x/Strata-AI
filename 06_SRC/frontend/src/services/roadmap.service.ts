import type { Roadmap } from '@/types/roadmap.types';

const mockRoadmaps: Roadmap[] = [
  {
    id: 'rdmp_1',
    title: 'White-label Platform Launch',
    totalDurationWeeks: 12,
    progress: 25,
    phases: [
      { id: 'p1', phaseNumber: 1, name: 'Market Research', description: 'Research target market and validate demand', durationWeeks: 2, tasks: [{ id: 't1', title: 'Identify 20 target institutes', isCompleted: true }, { id: 't2', title: 'Conduct 10 discovery calls', isCompleted: false }] },
      { id: 'p2', phaseNumber: 2, name: 'Product Adaptation', description: 'Adapt product for white-label offering', durationWeeks: 4, tasks: [{ id: 't3', title: 'Build white-label config system', isCompleted: false }] },
    ],
  },
];

export const getRoadmaps = async (): Promise<Roadmap[]> => {
  console.log('Fetching roadmaps...');
  return new Promise(resolve => setTimeout(() => resolve(mockRoadmaps), 600));
};

export const getRoadmapById = async (id: string): Promise<Roadmap | undefined> => {
  console.log(`Fetching roadmap by id: ${id}`);
  const roadmap = mockRoadmaps.find(r => r.id === id);
  return new Promise(resolve => setTimeout(() => resolve(roadmap), 400));
};

export const generateRoadmapFromIdea = async (ideaTitle: string): Promise<Roadmap> => {
  console.log(`Generating roadmap for idea: ${ideaTitle}`);
  const newRoadmap: Roadmap = {
    id: `rdmp_${Date.now()}`,
    title: `${ideaTitle} Execution Plan`,
    totalDurationWeeks: 16,
    progress: 0,
    phases: [
        { id: 'p1_new', phaseNumber: 1, name: 'Initial Setup & Planning', description: 'Set up foundation and plan execution', durationWeeks: 2, tasks: [] },
        { id: 'p2_new', phaseNumber: 2, name: 'MVP Development', description: 'Build minimum viable product', durationWeeks: 8, tasks: [] },
        { id: 'p3_new', phaseNumber: 3, name: 'Pilot Program', description: 'Run pilot with early adopters', durationWeeks: 4, tasks: [] },
        { id: 'p4_new', phaseNumber: 4, name: 'Public Launch', description: 'Launch to general public', durationWeeks: 2, tasks: [] },
    ],
  };
  mockRoadmaps.push(newRoadmap);
  return new Promise(resolve => setTimeout(() => resolve(newRoadmap), 1500));
};
