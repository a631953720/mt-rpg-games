import './express-session';
import { Request, Response } from 'express';
import { MergedGameState } from '#packages';

export function setGameState(
  req: Request,
  _res: Response,
  gameState: MergedGameState,
): MergedGameState | null {
  return (req.session.gameState = gameState);
}
