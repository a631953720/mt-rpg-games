import { BaseMonster } from './BaseMonster';
import { Monster } from './Monster';

export interface MonsterFactory {
  createDefault(data: Partial<BaseMonster>): Monster;
}
