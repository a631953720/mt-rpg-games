import { Entity } from '#packages/BaseEntity';
import { BaseRole } from './BaseRole';

export type ActionTypes = 'attack';

export interface Role extends BaseRole, Entity {
  isAlive(): boolean;
  isDodged(): boolean;
  isCritical(): boolean;
  attackTo(target: Role): void;
  useDefense(): void;

  setAttackCoefficient(coefficient: number): this;
  setDefenseCoefficient(coefficient: number): this;
  setActionBy(actionBy: Role, actionType: ActionTypes): this;

  resetAttackCoefficient(): this;
  resetDefenseCoefficient(): this;
  resetActionBy(): this;

  getCurrentAttack(): number;
  getCurrentDefense(): number;
  // TODO: add skill instance
  // useSkill(): void;
}
