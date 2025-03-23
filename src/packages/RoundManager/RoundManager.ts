import { Role } from '#Role';
import { ActionCallback, RoundManager as IRoundManager } from './types';

export class RoundManager implements IRoundManager {
  private inActionRoles: Set<Role>;
  private roleActions: Map<Role, ActionCallback[]>;

  public constructor() {
    this.inActionRoles = new Set();
    this.roleActions = new Map();
  }

  public assignRoleActions(role: Role, callbacks: ActionCallback[]): void {
    if (this.inActionRoles.has(role)) {
      throw new Error(`${role.id} is still action`);
    }

    const roleCallbacks = this.roleActions.get(role) ?? [];
    roleCallbacks.push(...callbacks);
    this.roleActions.set(role, roleCallbacks);
  }

  public consumeRoleActions(role: Role): void {
    if (this.inActionRoles.has(role)) {
      throw new Error(`${role.id} is still action`);
    }
    this.inActionRoles.add(role);

    const callbacks = this.roleActions.get(role) ?? [];
    if (callbacks.length === 0) {
      this.inActionRoles.delete(role);
      return;
    }

    callbacks.forEach((callback) => {
      if (!role.isAlive()) return;

      callback(role);
    });
    this.inActionRoles.delete(role);
  }
}
