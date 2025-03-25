import { MergedGameState } from '#packages';

declare module 'express-session' {
  interface SessionData {
    gameState: MergedGameState | null;
  }
}
