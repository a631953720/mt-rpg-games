import { Request, Response } from 'express';
import { SessionData } from 'express-session';
import { FullGameState, roundManager } from '#RoundManager';
import { Player } from '#Player';
import { Monster } from '#Monster';

export async function playerDoAction(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    // TODO: add validator
    const { action } = req.query;
    const gameState = (
      req.session as SessionData & { gameState?: FullGameState }
    )?.gameState;

    if (!gameState) {
      res.status(400).json({ errors: ['missing game state'] });
      return;
    }

    const player = new Player(gameState.player);
    const monster = new Monster(gameState.monster);
    const { gameLogs } = gameState;

    if (!monster.isAlive() || !player.isAlive()) {
      res.status(400).json({ errors: ['invalid game state'] });
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

    (req.session as SessionData & { gameState?: FullGameState }).gameState =
      newGameState;

    res.status(201).json({ data: newGameState });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
