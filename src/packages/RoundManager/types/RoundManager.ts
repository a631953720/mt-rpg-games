import { Role } from '#packages';

export type ActionCallback = (role: Role) => void;

export interface RoundManager {
  assignRoleActions(role: Role, callbacks: ActionCallback[]): void;
  consumeRoleActions(role: Role | Role[]): void;
}
