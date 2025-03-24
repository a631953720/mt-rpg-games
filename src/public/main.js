const informationDiv = document.getElementById('information');
const gameLogDiv = document.getElementById('gameLog');

getState();

function log(message) {
  gameLogDiv.innerText += message + '\n';
  gameLogDiv.scrollTop = gameLogDiv.scrollHeight;
}

async function createPlayer() {
  const name = document.getElementById('playerName').value || '勇者';
  try {
    await axios.post('http://localhost:3000/api/v1/game/player', { name });
    // log(`✅ 已建立角色：${name}`);
    await getState();
  } catch (err) {
    log('❌ 建立角色失敗：' + err.message);
  }
}

async function startGame() {
  try {
    await axios.post('http://localhost:3000/api/v1/game/play');
    // log('🎮 遊戲開始！');
    await getState();
  } catch (err) {
    log('❌ 無法開始遊戲：' + err.message);
  }
}

async function playerAction(action) {
  try {
    const res = await axios.post(
      `http://localhost:3000/api/v1/game/player/action?action=${action}`,
    );
    await getState();
    // if (res.data && typeof res.data === 'object') {
    //   log(`🗡️ 執行動作：${action}`);
    //   log(`📝 ${JSON.stringify(res.data, null, 2)}`);
    // } else {
    //   log(`✅ 執行 ${action} 成功`);
    // }
  } catch (err) {
    log('❌ 執行動作失敗：' + err.message);
  }
}

async function getState() {
  try {
    const res = await axios.get('http://localhost:3000/api/v1/game/state');
    if (res.data && typeof res.data === 'object') {
      const { player, monster, gameLogs } = res.data.data.gameState;

      // 清空舊內容
      informationDiv.innerText = '';

      // 玩家資訊
      informationDiv.innerText += '👤 玩家資訊\n';
      informationDiv.innerText += `玩家：${player.name}\n`;
      informationDiv.innerText += `等級：${player.level}\n`;
      informationDiv.innerText += `HP：${player.hp} / ${player.maxHp}\n`;
      informationDiv.innerText += `MP：${player.mp} / ${player.maxMp}\n`;
      informationDiv.innerText += `攻擊力：${player.attack}\n`;
      informationDiv.innerText += `防禦力：${player.defense}\n`;
      informationDiv.innerText += `爆擊率：${(player.criticalRate * 100).toFixed(1)}%\n`;
      informationDiv.innerText += `閃避率：${(player.dodgeRate * 100).toFixed(1)}%\n`;
      informationDiv.innerText += `經驗值：${player.currentExp}\n`;
      informationDiv.innerText += `升級需求：${player.nextLevelExp}\n`;
      informationDiv.innerText += `ID：${player.id}\n\n`;

      if (monster) {
        // 怪物資訊
        informationDiv.innerText += '👾 怪物資訊\n';
        informationDiv.innerText += `名稱：${monster.name}\n`;
        informationDiv.innerText += `等級：${monster.level}\n`;
        informationDiv.innerText += `HP：${monster.hp} / ${monster.maxHp}\n`;
        informationDiv.innerText += `MP：${monster.mp} / ${monster.maxMp}\n`;
        informationDiv.innerText += `攻擊力：${monster.attack}\n`;
        informationDiv.innerText += `防禦力：${monster.defense}\n`;
        informationDiv.innerText += `爆擊率：${(monster.criticalRate * 100).toFixed(1)}%\n`;
        informationDiv.innerText += `閃避率：${(monster.dodgeRate * 100).toFixed(1)}%\n`;
        informationDiv.innerText += `經驗值：${monster.exp}\n`;
        informationDiv.innerText += `ID：${monster.id}\n\n`;
      }

      // 遊戲紀錄
      gameLogDiv.innerText = '📜 遊戲紀錄\n';
      gameLogDiv.innerText += gameLogs.map((msg) => `${msg}\n`).join('');
      gameLogDiv.scrollTop = gameLogDiv.scrollHeight;
    }
  } catch (err) {
    console.error(err);
    informationDiv.innerText = '⚠️ 無法取得遊戲狀態';
  }
}
