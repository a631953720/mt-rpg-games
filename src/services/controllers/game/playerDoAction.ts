import { Request, Response } from 'express';
import { SessionData } from 'express-session';
import { MergedGameState, roundManager } from '#RoundManager';

export async function playerDoAction(
  req: Request,
  res: Response<any, { gameStage: MergedGameState | null }>,
): Promise<void> {
  try {
    const gameState = res.locals.gameStage;

    // TODO: add validator
    const { action } = req.query;

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

    const { player, monster, gameLogs } = gameState;

    if (!monster.isAlive() || !player.isAlive()) {
      res.status(400).json({ errors: ['someone dead. can not do anything'] });
      return;
    }

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
      },
      true,
    );

    (req.session as SessionData & { gameState?: MergedGameState }).gameState =
      newGameState;

    res.status(201).json({ data: newGameState });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
