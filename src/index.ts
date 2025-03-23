import express, { Request, Response } from 'express';
import { app } from '#configs';
import apiV1 from '#services/routers';
import { globalErrorHandler } from '#services/middlewares';

const service = express();

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
// import { RoundManager } from '#RoundManager';
// import { generateMonsterByLevel, MonsterFactory } from '#Monster';
//
// const playerFactory = new PlayerFactory();
// const monsterFactory = new MonsterFactory();
// const roundManager = new RoundManager();
//
// function runOneRound2() {
//   const p1 = playerFactory.createDefault({
//     name: 'player 1',
//     criticalRate: 1,
//     attack: 100,
//   });
//   const monster = monsterFactory.createDefault(
//     generateMonsterByLevel('史萊姆', 10),
//   );
//
//   roundManager.roleWillDo({
//     role: p1,
//     actionType: 'attack',
//     target: monster,
//   });
//
//   roundManager.roleWillDo({
//     role: monster,
//     actionType: 'defense',
//     target: monster,
//   });
//
//   roundManager.calculateRoleActionsFromActionBy([p1, monster]);
//
//   // console.log(p1, p2);
//   const finalActionLogs = [...p1.actionLogs, ...monster.actionLogs];
//   console.log(finalActionLogs);
// }
//
// runOneRound2();
//
// // TODO: 要實作 monster 類別來互動
