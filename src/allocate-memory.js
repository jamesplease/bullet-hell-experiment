import bulletPool from './pools/bullet-pool';
import enemyPool from './pools/enemy-pool';

let bulletCount = 20000;
let enemyCount = 100;

export default function allocateMemory() {
  bulletPool.allocate(bulletCount);
  enemyPool.allocate(enemyCount);
}
