import { SessionData } from 'express-session';
import { Request } from 'express';
import { MergedGameState } from '#packages';

export function getGameState(req: Request): MergedGameState | undefined {
  return (req.session as SessionData & { gameState?: MergedGameState })
    .gameState;
}
