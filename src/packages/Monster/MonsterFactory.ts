import { BaseMonster, MonsterFactory as IPlayerFactory } from './types';
import { Monster } from './Monster';

export class MonsterFactory implements IPlayerFactory {
  public createDefault(data?: Partial<BaseMonster>): Monster {
    // TODO: make this safe
    return new Monster({
      attack: 10,
      criticalRate: 0.05,
      defense: 5,
      dodgeRate: 0.05,
      hp: 120,
      id: null,
      level: 1,
      maxHp: 120,
      maxMp: 50,
      mp: 50,
      exp: 10,
      name: 'monster',
      ...data,
    });
  }
}

export const monsterFactory = new MonsterFactory();
