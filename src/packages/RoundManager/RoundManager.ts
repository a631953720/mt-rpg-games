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
    skill,
  }: RoleWillDoOptions): void {
    if (role.currentAction !== null) {
      throw new Error(`${role.name} has been action: ${role.currentAction}`);
    }

    if (!skill) {
      if (actionType === 'attack') {
        role.attackTo(target);
        const msg = `${role.name} 攻擊了 ${target.name}`;
        role.addActionLog(msg);
        gameLogs.push(msg);
      } else if (actionType === 'defense') {
        role.useDefense();
        const msg = `${role.name} 使用了防禦`;
        role.addActionLog(msg);
        gameLogs.push(msg);
      } else if (actionType === 'rest') {
        role.useRest();
        const msg = `${role.name} 休息一下並恢復血量與魔力`;
        role.addActionLog(msg);
        gameLogs.push(msg);
      }

      return;
    }

    if (actionType === 'attack') {
      role.attackTo(target, skill);
      const msg = `${role.name} 使用 ${skill.name} 攻擊了 ${target.name}`;
      role.addActionLog(msg);
      gameLogs.push(msg);
    } else if (actionType === 'defense') {
      role.useDefense(skill);
      const msg = `${role.name} 使用 ${skill.name} 增強防禦`;
      role.addActionLog(msg);
      gameLogs.push(msg);
    } else if (actionType === 'rest') {
      role.useRest(skill);
      const msg = `${role.name} 使用 ${skill.name} 恢復血量`;
      role.addActionLog(msg);
      gameLogs.push(msg);
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

      const { actionBy, actionType, skill } = currentRole.beActionBy;

      if (skill) {
        actionBy.mp -= skill.consumeMp;
      }

      if (!actionBy.isAlive()) {
        gameLogs.push(`因 ${actionBy.name} 已死亡，${actionType} 指令沒有執行`);
        return;
      }

      if (actionType === 'attack') {
        const dmg = damageCalculator({
          role: actionBy as Role,
          target: currentRole,
          gameLogs,
          skill,
        });

        hpCalculator({
          role: currentRole,
          affectHp: dmg * -1,
          shouldResetActionBy: true,
          gameLogs,
        });
      }
    });
  }

  public calculateRoleActionsFromActionBySelf(
    role: Role | Role[],
    gameLogs: string[],
  ): void {
    const roles = Array.isArray(role) ? role : [role];

    roles.forEach((currentRole) => {
      if (currentRole.beActionBySelf === null) {
        return;
      }

      const { actionBy, actionType, skill } = currentRole.beActionBySelf;

      if (skill) {
        actionBy.mp -= skill.consumeMp;
      }

      if (!actionBy.isAlive()) {
        gameLogs.push(`因 ${actionBy.name} 已死亡，${actionType} 指令沒有執行`);
        return;
      }

      if (actionType === 'defense') {
        if (skill && skill.actionType === 'defense') {
          currentRole.setDefenseCoefficient(skill.coefficient);
        } else {
          currentRole.setDefenseCoefficient(1.2);
        }
        gameLogs.push(
          `${currentRole.name} 防禦力暫時提升至 ${currentRole.getCurrentDefense()}`,
        );
      } else if (actionType === 'rest') {
        let healHp = Math.floor(currentRole.maxHp / 10);

        if (skill && skill.actionType === 'rest') {
          // 治癒量乘以係數加上保底
          healHp = Math.floor(healHp * skill.coefficient + skill.value);
          this.increaseRoleHp(currentRole, healHp);

          gameLogs.push(`${currentRole.name} 恢復 ${healHp} Hp`);
          return;
        }

        this.increaseRoleHp(currentRole, healHp);

        const healMp = Math.floor(currentRole.maxMp / 10);
        this.increaseRoleMp(currentRole, healMp);

        gameLogs.push(`${currentRole.name} 恢復 ${healHp} Hp 及 ${healMp} Mp`);
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

    this.calculateRoleActionsFromActionBySelf([monster, player], gameLogs);
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
        gameLogs,
      };
    }

    // reset all coefficient
    [monster, player].forEach((r) => {
      r.resetAttackCoefficient();
      r.resetDefenseCoefficient();
    });

    return {
      player,
      monster,
      gameLogs,
    };
  }

  // TODO: move to role
  private increaseRoleHp(role: Role, increase: number): void {
    const finalHp = (role.hp += increase);
    role.hp = finalHp > role.maxHp ? role.maxHp : finalHp;
  }

  private increaseRoleMp(role: Role, increase: number): void {
    const finalMp = (role.mp += increase);
    role.mp = finalMp > role.maxMp ? role.maxMp : finalMp;
  }
}

export const roundManager = new RoundManager();
