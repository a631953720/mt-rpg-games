import { Request, Response } from 'express';
import { PlayerFactory } from '#Player';

export async function createPlayer(req: Request, res: Response): Promise<void> {
  try {
    // TODO: add validator
    const data = req.body;

    const playerFactory = new PlayerFactory();

    const player = playerFactory.createDefault({
      name: data.name,
    });

    // TODO: add to database

    res.status(201).json({ data: player });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
