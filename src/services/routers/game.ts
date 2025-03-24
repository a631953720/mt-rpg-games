import { Response, Router } from 'express';
import { gameControllers } from '#services/controllers';
import { parseGameState } from '#services/middlewares';
import { MergedGameState } from '#packages';

const router = Router();

router.post('/play', parseGameState, gameControllers.startGame);
router.post('/player', parseGameState, gameControllers.createPlayer);
router.post('/player/action', parseGameState, gameControllers.playerDoAction);

router.get(
  '/state',
  parseGameState,
  (req, res: Response<any, { gameState: MergedGameState | null }>) => {
    if (!res.locals.gameState) {
      res.status(400).json({ errors: ['cannot get the game state'] });
      return;
    }

    res.status(200).json({ data: { gameState: res.locals.gameState } });
  },
);

export default router;
