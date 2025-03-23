import { Router } from 'express';
import { gameControllers } from '#services/controllers';

const router = Router();

router.post('/player', gameControllers.createPlayer);

export default router;
