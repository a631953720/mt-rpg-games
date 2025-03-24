import { SessionData } from 'express-session';
import { Request, Response } from 'express';
import { PlayerFactory } from '#Player';
import { BaseGameState, MergedGameState, RoundManager } from '#RoundManager';

export async function createPlayer(
  req: Request,
  res: Response<any, { gameStage: MergedGameState | null }>,
): Promise<void> {
  try {
    if (res.locals.gameStage) {
      res
        .status(400)
        .json({ errors: ['can not create player during in the game'] });
      return;
    }

    // TODO: add validator
    const data = req.body;

    const playerFactory = new PlayerFactory();

    // TODO: check is player exist
    const player = playerFactory.createDefault({
      name: data.name,
    });

    (req.session as SessionData & { gameState?: BaseGameState }).gameState =
      RoundManager.generateGameState(playerFactory.createDefault(player));

    // TODO: add to database

    res.status(201).json({ data: player.toJSON() });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
