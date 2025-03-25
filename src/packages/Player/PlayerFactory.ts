import { BasePlayer, PlayerFactory as IPlayerFactory } from './types';
import { Player } from './Player';

export class PlayerFactory implements IPlayerFactory {
  public createDefault(data?: Partial<BasePlayer>): Player {
    // TODO: make this safe
    return new Player({
      attack: 10,
      criticalRate: 0.05,
      currentExp: 0,
      defense: 5,
      dodgeRate: 0.05,
      hp: 120,
      id: null,
      level: 1,
      maxHp: 120,
      maxMp: 50,
      mp: 50,
      nextLevelExp: 100,
      name: 'default',
      skills: data?.skills ?? [],
      ...data,
    });
  }
}
