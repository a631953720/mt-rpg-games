import { Router } from 'express';
import game from './game';

const apiV1 = Router();

apiV1.use('/game', game);

export default apiV1;
