import { ActionTypes } from '#/packages/types';
import { Role } from '#packages';

export type RoleWillDoOptions = {
  role: Role;
  actionType: ActionTypes;
  target: Role;
};

export interface RoundManager {
  roleWillDo(options: RoleWillDoOptions): void;
  calculateRoleActionsFromActionBy(role: Role | Role[]): void;
}
