import { Role } from '#/packages';

type Options = {
  role: Role;
  affectHp: number;
  shouldResetActionBy: boolean;
};

export function hpCalculator({
  role,
  shouldResetActionBy,
  affectHp,
}: Options): Role {
  role.hp += affectHp;

  if (shouldResetActionBy) {
    role.resetActionBy();
  }

  role.addActionLog(`${role.name} 剩餘 ${role.hp} 血量`);

  if (!role.isAlive()) {
    role.addActionLog(`${role.name} 已死亡`);
  }

  return role;
}
