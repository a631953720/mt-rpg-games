import { Skill } from '../Skill';

export const whirlwindSlash = new Skill({
  actionType: 'attack',
  coefficient: 1.2,
  name: '旋風斬',
  id: 1,
  value: 20,
  consumeMp: 10,
});

export const emergencyHeal = new Skill({
  actionType: 'rest',
  coefficient: 1.5,
  name: '緊急治療',
  id: 2,
  value: 12,
  consumeMp: 15,
});
