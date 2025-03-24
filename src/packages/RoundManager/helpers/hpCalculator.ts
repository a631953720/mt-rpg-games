import { Role } from '#/packages';

type Options = {
  role: Role;
  affectHp: number;
  shouldResetActionBy: boolean;
  gameLogs: string[];
};

export function hpCalculator({
  role,
  shouldResetActionBy,
  affectHp,
  gameLogs,
}: Options): Role {
  role.hp += affectHp;

  if (shouldResetActionBy) {
    role.resetActionBy();
  }

  gameLogs.push(`${role.name} 剩餘 ${role.hp} 血量`);

  if (!role.isAlive()) {
    gameLogs.push(`${role.name} 已死亡`);
  }

  return role;
}
