import { Router } from 'express';
import { gameControllers } from '#services/controllers';

const router = Router();

router.post('/play', gameControllers.startGame);
router.post('/player', gameControllers.createPlayer);
router.post('/player/action', gameControllers.playerDoAction);

export default router;
