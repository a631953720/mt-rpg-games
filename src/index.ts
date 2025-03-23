import { PlayerFactory } from '#Player';
import { RoundManager } from '#RoundManager';
import { generateMonsterByLevel, MonsterFactory } from '#Monster';

const playerFactory = new PlayerFactory();
const monsterFactory = new MonsterFactory();
const roundManager = new RoundManager();

function runOneRound2() {
  const p1 = playerFactory.createDefault({
    name: 'player 1',
    criticalRate: 1,
    attack: 100,
  });
  const monster = monsterFactory.createDefault(
    generateMonsterByLevel('史萊姆', 10),
  );

  roundManager.roleWillDo({
    role: p1,
    actionType: 'attack',
    target: monster,
  });

  roundManager.roleWillDo({
    role: monster,
    actionType: 'defense',
    target: monster,
  });

  roundManager.calculateRoleActionsFromActionBy([p1, monster]);

  // console.log(p1, p2);
  const finalActionLogs = [...p1.actionLogs, ...monster.actionLogs];
  console.log(finalActionLogs);
}

runOneRound2();

// TODO: 要實作 monster 類別來互動
