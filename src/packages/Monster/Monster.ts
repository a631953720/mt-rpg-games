import { Role } from '#packages/Role';
import {
  BaseMonster,
  Monster as IPlayer,
  MonsterJSON,
  MonsterNameBindings,
} from './types';

export class Monster extends Role implements IPlayer {
  public exp: number;

  public constructor(data: BaseMonster) {
    super(data);

    this.exp = data.exp;
  }

  public toNameBinding(): MonsterNameBindings {
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
      exp: this.exp,
    };
  }

  public toJSON(): MonsterJSON {
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
      exp: this.exp,
    };
  }
}
