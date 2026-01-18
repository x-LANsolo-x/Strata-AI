export interface StartupProfile {
  id: string;
  name: string;
  industry: string;
  stage: 'idea' | 'mvp' | 'growth' | 'scale';
  initialCash?: number;
  monthlyBurn?: number;
}

export type UpdateStartupInput = Partial<Omit<StartupProfile, 'id'>>;
