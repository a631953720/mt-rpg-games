import { RoleJSON } from '#packages/Role';

export interface PlayerJSON extends RoleJSON {
  currentExp: number;
  nextLevelExp: number;
}
