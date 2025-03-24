import { ActionTypes } from '#/packages/types';
import { Player, Role } from '#packages';
import { Monster } from '#Monster';

export type RoleWillDoOptions = {
  role: Role;
  actionType: ActionTypes;
  target: Role;
  gameLogs: string[];
};

export type BaseGameState = {
  player: Player;
  gameLogs: string[];
};

export type FullGameState = BaseGameState & {
  monster: Monster;
};

export type MergedGameState = BaseGameState & {
  monster?: Monster;
};

export interface RoundManager {
  roleWillDo(options: RoleWillDoOptions): void;
  calculateRoleActionsFromActionBy(
    role: Role | Role[],
    gameLogs: string[],
  ): void;
  calculateRound(
    gameState: FullGameState,
    shouldResetCurrentAction: boolean,
  ): MergedGameState;
}
