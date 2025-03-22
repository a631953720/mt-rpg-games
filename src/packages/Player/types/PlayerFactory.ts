import { BasePlayer } from './BasePlayer';
import { Player } from './Player';

export interface PlayerFactory {
  createDefault(data: Partial<BasePlayer>): Player;
}
