import { BaseMonster } from '../types';

export function generateMonsterByLevel(
  name: string,
  level: number,
): BaseMonster {
  const isIncrease = Math.random() > 0.5;
  const coefficients = isIncrease
    ? 1 + Math.random() * 0.1
    : 1 - Math.random() * 0.1;

  const hp = Math.floor(25 * level * 2 * coefficients);
  const mp = Math.floor(50 * level * coefficients);

  return {
    attack: Math.floor(10 * level * coefficients) + 1,
    criticalRate: 0.05 * Math.floor(level / 5),
    defense: Math.floor(5 * level * coefficients),
    dodgeRate: 0.05 * Math.floor(level / 5),
    hp,
    id: null,
    level,
    maxHp: hp,
    maxMp: mp,
    mp,
    exp: Math.floor(10 + (10 * level) / 2),
    name,
  };
}
