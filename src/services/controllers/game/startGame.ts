import { Request, Response } from 'express';
import { SessionData } from 'express-session';
import {
  BaseGameState,
  FullGameState,
  MergedGameState,
  RoundManager,
} from '#RoundManager';
import { makeRandomStage1Monster } from '#Monster';
import { setGameState } from '#utils';

export async function startGame(
  req: Request,
  res: Response<any, { gameState: MergedGameState | null }>,
): Promise<void> {
  if (res.locals.gameState?.monster) {
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
    gameLogs: [],
  });

  setGameState(req, res, newGameState);

  res.status(200).json({ data: { gameState: newGameState } });
}
