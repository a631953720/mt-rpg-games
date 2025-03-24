import { Router } from 'express';
import { gameControllers } from '#services/controllers';
import { parseGameState } from '#services/middlewares';

const router = Router();

router.post('/play', parseGameState, gameControllers.startGame);
router.post('/player', parseGameState, gameControllers.createPlayer);
router.post('/player/action', parseGameState, gameControllers.playerDoAction);

export default router;
