import { Entity, JSONAble, PersistAble } from '#BaseEntity';
import { BasicSkill } from './BasicSkill';
import { SkillNameBindings } from './SkillNameBindings';
import { SkillJSON } from './SkillJSON';

export interface Skill
  extends BasicSkill,
    Entity,
    JSONAble<SkillJSON>,
    PersistAble<SkillNameBindings> {}
