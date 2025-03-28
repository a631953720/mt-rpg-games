import { Role } from '#packages';
import { Skill } from '#packages/Skills';

type Options = {
  role: Role;
  target: Role;
  gameLogs: string[];
  skill: Skill | null;
};

export function damageCalculator({
  role,
  target,
  gameLogs,
  skill,
}: Options): number {
  if (target.isDodged()) {
    gameLogs.push(`${target.name} 躲避了攻擊`);
    return 0;
  }

  let dmg;

  if (skill && skill.actionType === 'attack') {
    role.setAttackCoefficient(skill.coefficient);
    dmg = role.getCurrentAttack() - target.getCurrentDefense() + skill.value;
  } else {
    dmg = role.getCurrentAttack() - target.getCurrentDefense();
  }

  dmg = dmg > 0 ? dmg : 0;

  if (role.isCritical()) {
    dmg = dmg * 1.2;
    gameLogs.push(`${role.name} 爆擊！`);
  }

  role.addActionLog(`${role.name} 造成了 ${dmg} 傷害.`);
  gameLogs.push(`${role.name} 造成了 ${dmg} 傷害.`);

  return dmg;
}
