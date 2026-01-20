import type { Idea, GenerateIdeasInput } from '@/types/ideation.types';
import { apiClient } from './api.client';

interface AISuggestion {
  title: string;
  description: string;
  impact_score: number;
  difficulty: string;
}

interface AIResponse {
  suggestions: AISuggestion[];
}

// Map difficulty to market opportunity
const difficultyToOpportunity = (difficulty: string): 'high' | 'medium' | 'low' => {
  switch (difficulty.toLowerCase()) {
    case 'low': return 'high';
    case 'medium': return 'medium';
    case 'high': return 'low';
    default: return 'medium';
  }
};

export const generateIdeas = async (input: GenerateIdeasInput): Promise<Idea[]> => {
  console.log('Generating AI ideas with input:', input);

  try {
    // Build context from input
    const context = `
      Business Context: ${input.businessContext || 'Startup looking for growth strategies'}
      Current Challenges: ${input.challenges || 'Need to improve runway and find product-market fit'}
      Goals: ${input.goals || 'Increase revenue and reduce burn rate'}
    `.trim();

    const response = await apiClient.post<AIResponse>('/ai/suggest-strategy', { context });

    // Transform API response to Idea format
    const ideas: Idea[] = response.suggestions.map((suggestion, index) => ({
      id: `idea_${Date.now()}_${index}`,
      title: suggestion.title,
      description: suggestion.description,
      feasibility: suggestion.impact_score,
      marketOpportunity: difficultyToOpportunity(suggestion.difficulty),
    }));

    console.log('AI ideas generated from API.');
    return ideas;
  } catch (error) {
    console.error('Failed to generate AI ideas:', error);
    // Return fallback ideas on error
    return [
      {
        id: 'idea_fallback_1',
        title: 'Optimize Current Operations',
        description: 'Review and optimize current business processes to reduce costs and improve efficiency.',
        feasibility: 7,
        marketOpportunity: 'medium',
      },
    ];
  }
};
