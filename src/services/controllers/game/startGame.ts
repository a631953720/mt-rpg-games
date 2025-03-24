import { Request, Response } from 'express';
import { SessionData } from 'express-session';
import { BaseGameState, FullGameState } from '#RoundManager';
import { makeRandomStage1Monster } from '#Monster';

export async function startGame(req: Request, res: Response): Promise<void> {
  const gameState = (req.session as SessionData & { gameState?: BaseGameState })
    ?.gameState;

  if (!gameState) {
    res.status(400).json({ errors: ['missing game state'] });
    return;
  }

  const newGameState: FullGameState = {
    ...gameState,
    // TODO: 根據玩家等級選擇不同階段
    monster: makeRandomStage1Monster(gameState.player.level - 1),
  };

  (req.session as SessionData & { gameState?: FullGameState }).gameState =
    newGameState;

  res.status(200).json({ data: { gameState: newGameState } });
}
