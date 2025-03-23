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

  return role;
}
