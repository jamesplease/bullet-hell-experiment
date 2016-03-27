import enemyPool from './pools/enemy-pool';
import player from './objects/player';
import userInput from './user-input';

export default function setInitialGameState() {
  player.activate({x: 250, y: 560, creationFrame: 0});

  var firstEnemy = enemyPool.shift();
  firstEnemy.activate({x: 50, y: 50, creationFrame: 0});

  userInput.enableUserInput();
}
