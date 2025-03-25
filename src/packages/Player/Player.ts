import { Role } from '#packages/Role';
import {
  BasePlayer,
  Player as IPlayer,
  PlayerJSON,
  PlayerNameBindings,
} from './types';
import { Skill } from '#packages/Skills';

export class Player extends Role implements IPlayer {
  public currentExp: number;
  public nextLevelExp: number;
  public skills: Skill[];

  public constructor(data: BasePlayer) {
    super(data);

    this.currentExp = data.currentExp;
    this.nextLevelExp = data.nextLevelExp;
    this.skills = data.skills.map((skill) => new Skill(skill));
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
      name: this.name,
      skills: this.skills,
    };
  }

  public toJSON(): PlayerJSON {
    return {
      attack: this.attack,
      criticalRate: this.criticalRate,
      defense: this.defense,
      dodgeRate: this.dodgeRate,
      hp: this.hp,
      id: Number(this.id),
      level: this.level,
      maxHp: this.maxHp,
      maxMp: this.maxMp,
      mp: this.mp,
      currentExp: this.currentExp,
      nextLevelExp: this.nextLevelExp,
      name: this.name,
      skills: this.skills.map((skill) => skill.toJSON()),
    };
  }
}
