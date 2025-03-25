import { RoleJSON } from '#packages/Role';
import { SkillJSON } from '#packages/Skills';

export interface PlayerJSON extends RoleJSON {
  skills: SkillJSON[];
  currentExp: number;
  nextLevelExp: number;
}
