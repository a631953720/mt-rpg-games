import { Role } from '#Role';
import {
  BaseGameState,
  FullGameState,
  MergedGameState,
  RoleWillDoOptions,
  RoundManager as IRoundManager,
} from './types';
import { damageCalculator, hpCalculator } from './helpers';
import { Player } from '#Player';
import { Monster } from '#Monster';

export class RoundManager implements IRoundManager {
  public static generateGameState(
    player: Player,
    gameLogs?: string[],
  ): BaseGameState {
    return {
      player,
      gameLogs: gameLogs ?? [],
    };
  }

  public static fromGameState(gameState: FullGameState): FullGameState;
  public static fromGameState(gameState: BaseGameState): BaseGameState;
  public static fromGameState(
    gameState: BaseGameState | FullGameState,
  ): BaseGameState | FullGameState {
    // @ts-expect-error
    if (gameState.monster) {
      return {
        player: new Player(gameState.player),
        // @ts-expect-error
        monster: new Monster(gameState.monster),
        gameLogs: gameState.gameLogs,
      };
    }

    return {
      player: new Player(gameState.player),
      gameLogs: gameState.gameLogs,
    };
  }

  public roleWillDo({
    role,
    actionType,
    target,
    gameLogs,
  }: RoleWillDoOptions): void {
    if (role.currentAction !== null) {
      throw new Error(`${role.name} has been action: ${role.currentAction}`);
    }

    if (actionType === 'attack') {
      role.attackTo(target);
      role.addActionLog(`${role.name} 攻擊了 ${target.name}`);
      gameLogs.push(`${role.name} 攻擊了 ${target.name}`);
    } else if (actionType === 'defense') {
      role.useDefense();
      role.addActionLog(`${role.name} 使用了防禦`);
      gameLogs.push(`${role.name} 使用了防禦`);
    } else if (actionType === 'rest') {
      role.useRest();
      role.addActionLog(`${role.name} 休息一下並恢復血量`);
      gameLogs.push(`${role.name} 休息一下並恢復血量`);
    }
  }

  public calculateRoleActionsFromActionBy(
    role: Role | Role[],
    gameLogs: string[],
  ): void {
    const roles = Array.isArray(role) ? role : [role];

    roles.forEach((currentRole) => {
      if (currentRole.beActionBy === null) {
        return;
      }

      const { actionBy, actionType } = currentRole.beActionBy;

      if (!actionBy.isAlive()) {
        gameLogs.push(`因 ${actionBy.name} 已死亡，${actionType} 指令沒有執行`);
        return;
      }

      if (actionType === 'attack') {
        const dmg = damageCalculator({
          role: actionBy as Role,
          target: currentRole,
          gameLogs,
        });

        hpCalculator({
          role: currentRole,
          affectHp: dmg * -1,
          shouldResetActionBy: true,
          gameLogs,
        });

        if (currentRole.currentAction === 'defense') {
          currentRole.resetDefenseCoefficient();
        }
      }
    });
  }

  public calculateRound(
    gameState: FullGameState,
    shouldResetCurrentAction: boolean,
  ): MergedGameState {
    const { player, monster, gameLogs } = gameState;

    if (player.currentAction === null || monster.currentAction === null) {
      console.warn('player missing action');
      return gameState;
    }

    this.calculateRoleActionsFromActionBy([monster, player], gameLogs);

    // monster is dead, player can get exp
    if (!monster.isAlive()) {
      player.currentExp += monster.exp;
      player.addActionLog(`${player.name} 獲得 ${monster.exp} 經驗值.`);
      gameLogs.push(`${player.name} 獲得 ${monster.exp} 經驗值.`);
    }

    // player level up
    if (player.currentExp >= player.nextLevelExp) {
      player.level += 1;
      player.nextLevelExp = Math.floor(player.nextLevelExp * 1.37) + 25;
      player.currentExp = 0;
      player.maxHp = Math.floor(player.maxHp * 1.25) + 25;
      player.maxMp = Math.floor(player.maxMp * 1.25) + 10;
      player.attack += 15;
      player.defense += 10;
      player.hp = player.maxHp;
      player.mp = player.maxMp;
      player.addActionLog(
        `${player.name} 升級了！ 現在等級為 ${player.level}.`,
      );
      gameLogs.push(`${player.name} 升級了！ 現在等級為 ${player.level}.`);
    }

    if (shouldResetCurrentAction) {
      player.currentAction = null;
      monster.currentAction = null;
    }

    if (!monster.isAlive()) {
      return {
        player,
        gameLogs: [],
      };
    }

    return {
      player,
      monster,
      gameLogs,
    };
  }
}

export const roundManager = new RoundManager();
