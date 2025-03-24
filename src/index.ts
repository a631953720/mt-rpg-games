import express, { Request, Response } from 'express';
import session from 'express-session';
import { app } from '#configs';
import apiV1 from '#services/routers';
import { globalErrorHandler } from '#services/middlewares';

const service = express();

const oneDaySeconds = 60 * 60 * 1000;

// 一般服務沒有掛 https，就算 cookie secure = true 也無效
// 若是掛在反向代理後，則需要 trust proxy
service.set('trust proxy', 1);
service.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: oneDaySeconds * 1000,
      sameSite: true,
    },
  }),
);

service.use(express.json());
service.use('/api/v1', apiV1);

service.get('/hello', (_req: Request, res: Response) => {
  res.send('Hello, TypeScript + Express!');
});

service.use(globalErrorHandler);

service.listen(app.port, () => {
  console.log(`🚀 Server is running at http://localhost:${app.port}`);
});

// import { PlayerFactory } from '#Player';
// import { RoundManager, FullGameState } from '#RoundManager';
// import { generateMonsterByLevel, MonsterFactory } from '#Monster';
//
// const playerFactory = new PlayerFactory();
// const monsterFactory = new MonsterFactory();
// const roundManager = new RoundManager();
//
// function runOneRound2() {
//   const player = playerFactory.createDefault({
//     name: 'player 1',
//     criticalRate: 1,
//     attack: 1000,
//     currentExp: 50,
//   });
//   const monster = monsterFactory.createDefault(
//     generateMonsterByLevel('史萊姆', 10),
//   );
//
//   const gameState: FullGameState = {
//     player,
//     monster,
//     gameLogs: [],
//   };
//
//   roundManager.roleWillDo({
//     role: player,
//     actionType: 'attack',
//     target: monster,
//     gameLogs: gameState.gameLogs,
//   });
//
//   roundManager.roleWillDo({
//     role: monster,
//     actionType: 'defense',
//     target: monster,
//     gameLogs: gameState.gameLogs,
//   });
//
//   roundManager.calculateRound(gameState, true);
//
//   console.log(gameState);
// }
//
// runOneRound2();
//
// // TODO: 要實作 monster 類別來互動
