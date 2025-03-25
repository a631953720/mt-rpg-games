import { Request, Response } from 'express';
import { PlayerFactory } from '#Player';
import { whirlwindSlash, emergencyHeal } from '#packages/Skills';
import { MergedGameState, RoundManager } from '#RoundManager';
import { setGameState } from '#utils';

export async function createPlayer(
  req: Request,
  res: Response<any, { gameState: MergedGameState | null }>,
): Promise<void> {
  try {
    if (res.locals.gameState) {
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
      skills: [whirlwindSlash, emergencyHeal],
    });

    setGameState(
      req,
      res,
      RoundManager.generateGameState(playerFactory.createDefault(player)),
    );

    // TODO: add to database

    res.status(201).json({ data: player.toJSON() });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
