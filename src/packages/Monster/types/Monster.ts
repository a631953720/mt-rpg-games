import { BaseMonster } from './BaseMonster';
import { MonsterJSON } from './MonsterJSON';
import { MonsterNameBindings } from './MonsterNameBindings';
import { type Role } from '#packages/Role';
import { JSONAble, PersistAble } from '#packages/BaseEntity';

export interface Monster
  extends BaseMonster,
    JSONAble<MonsterJSON>,
    PersistAble<MonsterNameBindings>,
    Role {}
