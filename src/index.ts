import { PlayerFactory } from '#packages';

const playerFactory = new PlayerFactory();

function runOneRound() {
  const p1 = playerFactory.createDefault({ name: 'player 1' });
  const p2 = playerFactory.createDefault({ name: 'player 2' });

  p1.attackTo(p2);
  p2.useDefense();

  let dmg = p1.getCurrentAttack() - p2.getCurrentDefense();
  dmg = dmg > 0 ? dmg : 0;

  p2.hp -= dmg;
  p2.resetDefenseCoefficient();
  p2.resetActionBy();

  console.log(p1, p2);
}

runOneRound();
