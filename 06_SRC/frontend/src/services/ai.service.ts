import type { Idea, GenerateIdeasInput } from '@/types/ideation.types';

const mockIdeas: Idea[] = [
  {
    id: 'idea_1',
    title: 'White-label for Coaching Institutes',
    description: 'License your platform technology to coaching institutes who need digital infrastructure but lack technical capability.',
    feasibility: 8,
    marketOpportunity: 'high',
  },
  {
    id: 'idea_2',
    title: 'Corporate Training Vertical',
    description: 'Pivot focus from general EdTech to B2B corporate training and compliance, targeting larger, more predictable budgets.',
    feasibility: 7,
    marketOpportunity: 'high',
  },
  {
    id: 'idea_3',
    title: 'Certification Marketplace',
    description: 'Create a marketplace for industry-recognized certifications, taking a commission on courses sold through your platform.',
    feasibility: 6,
    marketOpportunity: 'medium',
  },
];

export const generateIdeas = async (input: GenerateIdeasInput): Promise<Idea[]> => {
  console.log('Generating AI ideas with input:', input);

  // Simulate a longer delay for AI generation
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('AI ideas generated.');
      resolve(mockIdeas);
    }, 2000); // 2-second delay
  });
};
