import { Request, Response, NextFunction } from 'express';
import { getGameState } from './helpers';
import { MergedGameState, RoundManager } from '#/packages';

export function parseGameState(
  req: Request,
  res: Response<any, { gameStage: MergedGameState | null }>,
  next: NextFunction,
) {
  const gameState = getGameState(req);
  res.locals.gameStage = gameState
    ? RoundManager.fromGameState(gameState)
    : null;
  next();
}
