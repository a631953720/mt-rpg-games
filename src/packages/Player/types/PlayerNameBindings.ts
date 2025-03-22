import { RoleNameBinding } from '#packages/Role';

export interface PlayerNameBindings extends RoleNameBinding {
  currentExp: number;
  nextLevelExp: number;
}
