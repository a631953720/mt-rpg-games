import { BasePlayer } from './BasePlayer';
import { PlayerJSON } from './PlayerJSON';
import { PlayerNameBindings } from './PlayerNameBindings';
import { type Role } from '#packages/Role';
import { JSONAble, PersistAble } from '#packages/BaseEntity';

export interface Player
  extends BasePlayer,
    JSONAble<PlayerJSON>,
    PersistAble<PlayerNameBindings>,
    Role {}
