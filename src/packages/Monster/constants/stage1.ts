import { monsterFactory } from '../MonsterFactory';
import { generateMonsterByLevel } from '../helpers';
import { Monster } from '../Monster';

const monsters = [
  {
    level: 1,
    name: '史萊姆',
  },
  {
    level: 1,
    name: '青年地精',
  },
  {
    level: 1,
    name: '中年地精',
  },
];

export function makeRandomStage1Monster(increaseLevel = 0): Monster {
  const baseMonster = monsters[Math.floor(Math.random() * monsters.length)];

  return monsterFactory.createDefault(
    generateMonsterByLevel(baseMonster.name, baseMonster.level + increaseLevel),
  );
}
