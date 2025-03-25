import './express-session';
import { Request } from 'express';
import { MergedGameState } from '#packages';

export function getGameState(req: Request): MergedGameState | null {
  return req.session.gameState ?? null;
}
