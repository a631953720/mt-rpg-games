export type ActionTypes = 'attack' | 'defense' | 'rest';

// byFixed = affected by fixed value
// byCoefficient = affected by coefficient
// byFixedAndCoefficient = byFixed + byCoefficient
export type SkillBuffOrDeBuffTypes =
  | 'byFixed'
  | 'byCoefficient'
  | 'byFixedAndCoefficient';
