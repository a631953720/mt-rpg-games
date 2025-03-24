import { ActionTypes } from '#/packages/types';
import { Entity } from '#packages/BaseEntity';
import { BaseRole } from './BaseRole';

export type ActionBy = {
  actionBy: Role;
  actionType: ActionTypes;
};

export interface Role extends BaseRole, Entity {
  beActionBy: ActionBy | null;
  actionLogs: string[];
  currentAction: ActionTypes | null;
  addActionLog(message: string): void;
  resetActionLog(): void;

  isAlive(): boolean;
  isDodged(): boolean;
  isCritical(): boolean;
  attackTo(target: Role): void;
  useDefense(): void;
  useRest(): void;

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
