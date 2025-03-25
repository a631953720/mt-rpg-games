import { ActionTypes } from '#packages/types';

export interface BasicSkill {
  id: number | null;
  name: string;
  actionType: ActionTypes;
  value: number;
  coefficient: number;
  consumeMp: number;
}
