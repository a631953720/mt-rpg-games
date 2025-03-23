import { Role } from '#packages';

export function damageCalculator(role: Role, target: Role): number {
  if (target.isDodged()) {
    console.log(`${target.name} 躲避了攻擊`);
    return 0;
  }

  let dmg = role.getCurrentAttack() - target.getCurrentDefense();
  dmg = dmg > 0 ? dmg : 0;

  if (role.isCritical()) {
    console.log(`${role.name} 爆擊！`);
    dmg = dmg * 1.2;
  }

  return dmg;
}
