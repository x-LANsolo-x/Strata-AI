import type { StartupProfile, UpdateStartupInput } from '@/types/startup.types';

let mockStartupProfile: StartupProfile | null = null;

export const getStartupProfile = async (): Promise<StartupProfile | null> => {
  console.log('Fetching startup profile...');
  return new Promise(resolve => setTimeout(() => resolve(mockStartupProfile), 500));
};

export const updateStartupProfile = async (input: UpdateStartupInput): Promise<StartupProfile> => {
  console.log('Updating startup profile:', input);
  
  const updatedProfile: StartupProfile = {
    id: mockStartupProfile?.id || `startup_${Date.now()}`,
    name: input.name || mockStartupProfile?.name || '',
    industry: input.industry || mockStartupProfile?.industry || '',
    stage: input.stage || mockStartupProfile?.stage || 'idea',
    initialCash: input.initialCash ?? mockStartupProfile?.initialCash,
    monthlyBurn: input.monthlyBurn ?? mockStartupProfile?.monthlyBurn,
  };
  
  mockStartupProfile = updatedProfile;
  
  return new Promise(resolve => setTimeout(() => {
    console.log('Startup profile updated');
    resolve(updatedProfile);
  }, 800));
};
