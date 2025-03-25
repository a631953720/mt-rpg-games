import { Request, Response } from 'express';
import { MergedGameState, roundManager } from '#RoundManager';
import { setGameState } from '#utils';

export async function playerDoAction(
  req: Request,
  res: Response<any, { gameState: MergedGameState | null }>,
): Promise<void> {
  try {
    const gameState = res.locals.gameState;

    // TODO: add validator
    const { action, skillID } = req.query;

    if (!gameState) {
      res.status(400).json({ errors: ['missing game state'] });
      return;
    }

    if (!gameState.monster) {
      res
        .status(400)
        .json({ errors: ['missing monster state. please start a game'] });
      return;
    }

    const { player, monster, gameLogs, currentRoundLogs } = gameState;

    if (!monster.isAlive() || !player.isAlive()) {
      res.status(400).json({ errors: ['someone dead. can not do anything'] });
      return;
    }

    // TODO: roleWillDo 就有判斷了，可以合併
    if (action === 'attack') {
      roundManager.roleWillDo({
        role: player,
        actionType: 'attack',
        target: monster,
        gameLogs,
      });
    } else if (action === 'defense') {
      roundManager.roleWillDo({
        role: player,
        actionType: 'defense',
        target: player,
        gameLogs,
      });
    } else if (action === 'rest') {
      roundManager.roleWillDo({
        role: player,
        actionType: 'rest',
        target: player,
        gameLogs,
      });
    } else if (action === 'skill') {
      const skill = player.skills.find((s) => s.id === Number(skillID));
      if (!skill) {
        res.status(400).json({
          errors: [
            `missing skill id ${Number(skillID)} in player ${player.name}`,
          ],
        });
        return;
      }

      if (skill.consumeMp > player.mp) {
        res.status(400).json({
          errors: [`${player.name} mp is not enough to us ${skill.name}`],
        });
        return;
      }

      if (skill.actionType === 'attack') {
        roundManager.roleWillDo({
          role: player,
          actionType: 'attack',
          target: monster,
          gameLogs,
          skill,
        });
      } else if (skill.actionType === 'defense') {
        roundManager.roleWillDo({
          role: player,
          actionType: 'defense',
          target: player,
          gameLogs,
          skill,
        });
      } else if (skill.actionType === 'rest') {
        roundManager.roleWillDo({
          role: player,
          actionType: 'rest',
          target: player,
          gameLogs,
          skill,
        });
      } else {
        console.error(`un-support skill type ${skill.actionType}`);
        res.status(500);
        return;
      }
    } else {
      res.status(400).json({ errors: [`un-support ${action} action`] });
      return;
    }

    const isMonsterAttack = Math.random() < 0.8;

    if (isMonsterAttack) {
      roundManager.roleWillDo({
        role: monster,
        actionType: 'attack',
        target: player,
        gameLogs,
      });
    } else {
      roundManager.roleWillDo({
        role: monster,
        actionType: 'defense',
        target: monster,
        gameLogs,
      });
    }

    const newGameState = roundManager.calculateRound(
      {
        player,
        monster,
        gameLogs,
        currentRoundLogs,
      },
      true,
    );

    setGameState(req, res, newGameState);

    res.status(201).json({ data: newGameState });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
