import { Role } from '#packages';

export function damageCalculator(role: Role, target: Role): number {
  if (target.isDodged()) {
    target.addActionLog(`${target.name} 躲避了攻擊`);
    return 0;
  }

  let dmg = role.getCurrentAttack() - target.getCurrentDefense();
  dmg = dmg > 0 ? dmg : 0;

  if (role.isCritical()) {
    dmg = dmg * 1.2;
    target.addActionLog(`${role.name} 爆擊！`);
  }

  return dmg;
}
