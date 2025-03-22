import { BaseRole } from '#packages/Role';

export interface BasePlayer extends BaseRole {
  currentExp: number;
  nextLevelExp: number;
}
