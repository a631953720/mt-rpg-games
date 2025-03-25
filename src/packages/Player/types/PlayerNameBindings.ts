import { RoleNameBinding } from '#packages/Role';
import { Skill } from '#packages/Skills';

export interface PlayerNameBindings extends RoleNameBinding {
  currentExp: number;
  nextLevelExp: number;
  skills: Skill[];
}
