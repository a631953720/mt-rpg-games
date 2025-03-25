import { ActionTypes } from '#packages/types';

export interface SkillJSON {
  id: number;
  name: string;
  actionType: ActionTypes;
  value: number;
  coefficient: number;
  consumeMp: number;
}
