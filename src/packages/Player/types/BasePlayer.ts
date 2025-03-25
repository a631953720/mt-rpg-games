import { Skill } from '#packages/Skills';
import { BaseRole } from '#packages/Role';

export interface BasePlayer extends BaseRole {
  skills: Skill[];
  currentExp: number;
  nextLevelExp: number;
}
