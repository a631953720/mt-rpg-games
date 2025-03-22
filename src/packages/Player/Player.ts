import { Role } from '#packages/Role';
import {
  BasePlayer,
  Player as IPlayer,
  PlayerJSON,
  PlayerNameBindings,
} from './types';

export class Player extends Role implements IPlayer {
  public currentExp: number;
  public nextLevelExp: number;

  public constructor(data: BasePlayer) {
    super(data);

    this.currentExp = data.currentExp;
    this.nextLevelExp = data.nextLevelExp;
  }

  public toNameBinding(): PlayerNameBindings {
    return {
      attack: this.attack,
      criticalRate: this.criticalRate,
      defense: this.defense,
      dodgeRate: this.dodgeRate,
      hp: this.hp,
      id: this.id,
      level: this.level,
      maxHp: this.maxHp,
      maxMp: this.maxMp,
      mp: this.mp,
      currentExp: this.currentExp,
      nextLevelExp: this.nextLevelExp,
    };
  }

  public toJSON(): PlayerJSON {
    return {
      attack: this.attack,
      criticalRate: this.criticalRate,
      defense: this.defense,
      dodgeRate: this.dodgeRate,
      hp: this.hp,
      id: this.id,
      level: this.level,
      maxHp: this.maxHp,
      maxMp: this.maxMp,
      mp: this.mp,
      currentExp: this.currentExp,
      nextLevelExp: this.nextLevelExp,
    };
  }
}
