import { ActionTypes } from '../types';
import {
  Skill as ISkill,
  BasicSkill,
  SkillJSON,
  SkillNameBindings,
} from './types';

export class Skill implements ISkill {
  public id: number | null;
  public name: string;
  public actionType: ActionTypes;
  public value: number;
  public coefficient: number;
  public consumeMp: number;

  public constructor(data: BasicSkill) {
    this.id = data.id;
    this.name = data.name;
    this.actionType = data.actionType;
    this.value = data.value;
    this.coefficient = data.coefficient;
    this.consumeMp = data.consumeMp;
  }

  public isNew(): boolean {
    return this.id === null;
  }

  public toJSON(): SkillJSON {
    return {
      actionType: this.actionType,
      coefficient: this.coefficient,
      id: Number(this.id),
      name: this.name,
      value: this.value,
      consumeMp: this.consumeMp,
    };
  }

  public toNameBinding(): SkillNameBindings {
    return {
      actionType: this.actionType,
      coefficient: this.coefficient,
      id: this.id,
      name: this.name,
      value: this.value,
      consumeMp: this.consumeMp,
    };
  }
}
