import { ActionTypes } from '#packages/types';
import { ActionBy, BaseRole, Role as IRole } from './types';
import { Skill } from '#packages/Skills';

export class Role implements IRole {
  public id: number | null;
  public name: string;
  public level: number;
  public hp: number;
  public maxHp: number;
  public mp: number;
  public maxMp: number;
  public attack: number;
  public defense: number;
  public criticalRate: number;
  public dodgeRate: number;
  public currentAction: ActionTypes | null;

  private readonly defaultAttackCoefficient = 1;
  private readonly defaultDefenseCoefficient = 1;
  private attackCoefficient = 1;
  private defenseCoefficient = 1;
  private _beActionBy: ActionBy | null;
  private _beActionBySelf: ActionBy | null;
  private _actionLogs: string[];

  public constructor(data: BaseRole) {
    this.id = data.id;
    this.level = data.level;
    this.hp = data.hp;
    this.maxHp = data.maxHp;
    this.mp = data.mp;
    this.maxMp = data.maxMp;
    this.attack = data.attack;
    this.defense = data.defense;
    this.criticalRate = data.criticalRate;
    this.dodgeRate = data.dodgeRate;
    this.name = data.name;
    this.currentAction = null;

    this._beActionBy = null;
    this._beActionBySelf = null;
    this._actionLogs = [];
  }

  public get actionLogs(): string[] {
    return [...this._actionLogs];
  }

  public get beActionBy(): ActionBy | null {
    return this._beActionBy;
  }

  public get beActionBySelf(): ActionBy | null {
    return this._beActionBySelf;
  }

  public addActionLog(message: string): void {
    this._actionLogs.push(message);
  }

  public resetActionLog(): void {
    this._actionLogs = [];
  }

  public setActionBy(
    actionBy: Role,
    actionType: ActionTypes,
    skill?: Skill,
  ): this {
    if (this.beActionBy !== null) {
      throw TypeError('beActionBy already set');
    }

    this._beActionBy = {
      actionBy,
      actionType,
      skill: skill ?? null,
    };
    return this;
  }

  public resetAttackCoefficient(): this {
    this.attackCoefficient = this.defaultAttackCoefficient;
    return this;
  }

  public resetDefenseCoefficient(): this {
    this.defenseCoefficient = this.defaultDefenseCoefficient;
    return this;
  }

  public resetActionBy(): this {
    this._beActionBy = null;
    return this;
  }

  public resetActionBySelf(): this {
    this._beActionBySelf = null;
    return this;
  }

  public isAlive(): boolean {
    return this.hp > 0;
  }

  public attackTo(target: Role, skill?: Skill): void {
    if (this.currentAction !== null) {
      throw new Error(`${this.name} already has action ${this.currentAction}`);
    }

    this.currentAction = 'attack';
    target.setActionBy(this, 'attack', skill);
  }

  public useDefense(skill?: Skill): void {
    if (this.currentAction !== null) {
      throw new Error(`${this.name} already has action ${this.currentAction}`);
    }

    this.currentAction = 'defense';
    this._beActionBySelf = {
      actionBy: this,
      actionType: 'defense',
      skill: skill ?? null,
    };

    // this.setDefenseCoefficient(this.defenseCoefficient + 0.2);
  }

  public useRest(skill?: Skill): void {
    if (this.currentAction !== null) {
      throw new Error(`${this.name} already has action ${this.currentAction}`);
    }

    this.currentAction = 'rest';
    this._beActionBySelf = {
      actionBy: this,
      actionType: 'rest',
      skill: skill ?? null,
    };
    // TODO: 讓外部處理治療行為會比較好管
    // const finalHp = this.hp + Math.floor(this.maxHp / 10);
    //
    // this.hp = finalHp > this.maxHp ? this.maxHp : finalHp;
    //
    // const finalMp = this.mp + Math.floor(this.maxMp / 10);
    //
    // this.mp = finalMp > this.maxMp ? this.maxMp : finalMp;
  }

  public setAttackCoefficient(coefficient: number): this {
    if (coefficient < 0) {
      this.attackCoefficient = 0;
    } else {
      this.attackCoefficient = coefficient;
    }

    return this;
  }

  public setDefenseCoefficient(coefficient: number): this {
    if (coefficient < 0) {
      this.defenseCoefficient = 0;
    } else {
      this.defenseCoefficient = coefficient;
    }

    return this;
  }

  public getCurrentAttack(): number {
    return this.attack * this.attackCoefficient;
  }

  public getCurrentDefense(): number {
    return this.defense * this.defenseCoefficient;
  }

  public isNew(): boolean {
    return !this.id;
  }

  public isDodged(): boolean {
    if (this.dodgeRate < 0) return false;

    const dodgeRate = this.dodgeRate >= 0.8 ? 0.8 : this.dodgeRate;

    return Math.random() < dodgeRate;
  }

  public isCritical(): boolean {
    if (this.criticalRate < 0) return false;

    const criticalRate = this.criticalRate >= 0.8 ? 0.8 : this.criticalRate;

    return Math.random() < criticalRate;
  }
}
