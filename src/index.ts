import { PlayerFactory } from '#Player';
import {
  RoundManager,
  damageCalculator,
  hpCalculator,
  ActionCallback,
} from '#RoundManager';
import { generateMonsterByLevel, MonsterFactory } from '#Monster';

const playerFactory = new PlayerFactory();
const monsterFactory = new MonsterFactory();
const roundManager = new RoundManager();

function runOneRound() {
  const p1 = playerFactory.createDefault({
    name: 'player 1',
    criticalRate: 1,
    attack: 1000,
  });
  const monster = monsterFactory.createDefault(
    generateMonsterByLevel('史萊姆', 10),
  );
  console.log(monster);

  const p1Actions: ActionCallback[] = [];
  const monsterActions: ActionCallback[] = [];

  p1Actions.push((role) => {
    role.attackTo(monster);
    role.addActionLog(`${role.name} 攻擊了 ${monster.name}`);
  });

  monsterActions.push((role) => {
    role.useDefense();
    role.addActionLog(`${role.name} 使用了防禦`);

    const dmg = damageCalculator(p1, monster);
    role.addActionLog(`${p1.name} 造成了 ${dmg} 傷害.`);

    hpCalculator({
      role,
      affectHp: dmg * -1,
      shouldResetActionBy: true,
    });

    monster.resetDefenseCoefficient();
  });

  roundManager.assignRoleActions(p1, p1Actions);
  roundManager.assignRoleActions(monster, monsterActions);

  roundManager.consumeRoleActions([p1, monster]);

  // console.log(p1, p2);
  const finalActionLogs = [...p1.actionLogs, ...monster.actionLogs];
  console.log(finalActionLogs);
}

runOneRound();

// TODO: 要實作 monster 類別來互動
