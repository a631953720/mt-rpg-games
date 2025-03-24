import { Request, Response, NextFunction } from 'express';
import { getGameState } from './helpers';
import { MergedGameState, RoundManager } from '#/packages';

export function parseGameState(
  req: Request,
  res: Response<any, { gameState: MergedGameState | null }>,
  next: NextFunction,
) {
  const gameState = getGameState(req);
  res.locals.gameState = gameState
    ? RoundManager.fromGameState(gameState)
    : null;
  next();
}
