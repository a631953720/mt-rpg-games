import { Request, Response } from 'express';
import { SessionData } from 'express-session';
import {
  BaseGameState,
  FullGameState,
  MergedGameState,
  RoundManager,
} from '#RoundManager';
import { makeRandomStage1Monster } from '#Monster';

export async function startGame(
  req: Request,
  res: Response<any, { gameStage: MergedGameState | null }>,
): Promise<void> {
  if (res.locals.gameStage?.monster) {
    res
      .status(400)
      .json({ errors: ['can not start game during in the fight'] });
    return;
  }

  const gameState = (req.session as SessionData & { gameState?: BaseGameState })
    ?.gameState;

  if (!gameState) {
    res.status(400).json({ errors: ['missing game state'] });
    return;
  }

  const newGameState: FullGameState = RoundManager.fromGameState({
    ...gameState,
    // TODO: 根據玩家等級選擇不同階段
    monster: makeRandomStage1Monster(gameState.player.level - 1),
  });

  (req.session as SessionData & { gameState?: FullGameState }).gameState =
    newGameState;

  res.status(200).json({ data: { gameState: newGameState } });
}
