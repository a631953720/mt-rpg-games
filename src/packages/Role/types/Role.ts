import { ActionTypes } from '#/packages/types';
import { Entity } from '#packages/BaseEntity';
import { BaseRole } from './BaseRole';
import { Skill } from '#packages/Skills';

export type ActionBy = {
  actionBy: Role;
  actionType: ActionTypes;
  skill: Skill | null;
};

export interface Role extends BaseRole, Entity {
  beActionBy: ActionBy | null;
  beActionBySelf: ActionBy | null;
  actionLogs: string[];
  currentAction: ActionTypes | null;
  addActionLog(message: string): void;
  resetActionLog(): void;

  isAlive(): boolean;
  isDodged(): boolean;
  isCritical(): boolean;
  attackTo(target: Role, skill?: Skill): void;
  useDefense(skill?: Skill): void;
  useRest(skill?: Skill): void;

  setAttackCoefficient(coefficient: number): this;
  setDefenseCoefficient(coefficient: number): this;
  setActionBy(actionBy: Role, actionType: ActionTypes): this;

  resetAttackCoefficient(): this;
  resetDefenseCoefficient(): this;
  resetActionBy(): this;
  resetActionBySelf(): this;

  getCurrentAttack(): number;
  getCurrentDefense(): number;
  // TODO: add skill instance
  // useSkill(): void;
}
