import { PlayerFactory } from '#Player';
import {
  RoundManager,
  damageCalculator,
  hpCalculator,
  ActionCallback,
} from '#RoundManager';

const playerFactory = new PlayerFactory();
const roundManager = new RoundManager();

function runOneRound() {
  const p1 = playerFactory.createDefault({
    name: 'player 1',
    criticalRate: 1,
    attack: 1000,
  });
  const p2 = playerFactory.createDefault({ name: 'player 2', dodgeRate: 0 });

  const p1Actions: ActionCallback[] = [];
  const p2Actions: ActionCallback[] = [];

  p1Actions.push((role) => {
    role.attackTo(p2);
    role.addActionLog(`${role.name} 攻擊了 ${p2.name}`);
  });

  p2Actions.push((role) => {
    role.useDefense();
    role.addActionLog(`${role.name} 使用了防禦`);

    const dmg = damageCalculator(p1, p2);
    role.addActionLog(`${p1.name} 造成了 ${dmg} 傷害.`);

    hpCalculator({
      role,
      affectHp: dmg * -1,
      shouldResetActionBy: true,
    });

    p2.resetDefenseCoefficient();
  });

  roundManager.assignRoleActions(p1, p1Actions);
  roundManager.assignRoleActions(p2, p2Actions);

  roundManager.consumeRoleActions([p1, p2]);

  // console.log(p1, p2);
  const finalActionLogs = [...p1.actionLogs, ...p2.actionLogs];
  console.log(finalActionLogs);
}

runOneRound();

// TODO: 要實作 monster 類別來互動
