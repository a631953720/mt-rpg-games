import { Role } from '#Role';
import { RoleWillDoOptions, RoundManager as IRoundManager } from './types';
import { damageCalculator, hpCalculator } from './helpers';

export class RoundManager implements IRoundManager {
  public roleWillDo({ role, actionType, target }: RoleWillDoOptions): void {
    if (role.currentAction !== null) {
      throw new Error(`${role.name} has been action: ${role.currentAction}`);
    }

    if (actionType === 'attack') {
      role.attackTo(target);
      role.addActionLog(`${role.name} 攻擊了 ${target.name}`);
    } else if (actionType === 'defense') {
      role.useDefense();
      role.addActionLog(`${role.name} 使用了防禦`);
    }
  }

  public calculateRoleActionsFromActionBy(role: Role | Role[]): void {
    const roles = Array.isArray(role) ? role : [role];

    roles.forEach((currentRole) => {
      if (currentRole.beActionBy === null) {
        return;
      }

      const { actionBy, actionType } = currentRole.beActionBy;

      if (actionType === 'attack') {
        const dmg = damageCalculator(actionBy as Role, currentRole);
        currentRole.addActionLog(`${actionBy.name} 造成了 ${dmg} 傷害.`);

        hpCalculator({
          role: currentRole,
          affectHp: dmg * -1,
          shouldResetActionBy: true,
        });

        if (currentRole.currentAction === 'defense') {
          currentRole.resetDefenseCoefficient();
        }
      }
    });
  }
}
