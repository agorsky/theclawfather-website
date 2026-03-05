export interface ScoringRule {
  points: number;
  description: string;
  type: 'positive' | 'negative';
}

export interface CaseStage {
  stage: number;
  name: string;
  description: string;
}

export const scoringRules: ScoringRule[] = [
  { points: 2, description: 'On-time session delivery', type: 'positive' },
  { points: 1, description: 'Clean PR (no review cycles)', type: 'positive' },
  { points: 1, description: 'Test coverage maintained', type: 'positive' },
  { points: 3, description: 'Zero rework required', type: 'positive' },
  { points: 5, description: 'Exceptional quality flagged by reviewer', type: 'positive' },
  { points: -2, description: 'Minor violation', type: 'negative' },
  { points: -5, description: 'Major violation', type: 'negative' },
  { points: -15, description: 'Critical violation', type: 'negative' },
];

export const scoringParams = {
  repeatOffenseMultiplier: 1.5,
  floor: 0,
  ceiling: 100,
  startingScore: 50,
};

export const caseLifecycle: CaseStage[] = [
  {
    stage: 1,
    name: 'Submitted',
    description: 'Case filed by Barney after implementation review.',
  },
  {
    stage: 2,
    name: 'Reviewed',
    description: 'Evidence examined against compliance laws.',
  },
  {
    stage: 3,
    name: 'Verdict',
    description: 'The Judge rules: upheld, dismissed, or reduced.',
  },
  {
    stage: 4,
    name: 'Enforcement',
    description: 'Score adjusted, outcome logged.',
  },
];
