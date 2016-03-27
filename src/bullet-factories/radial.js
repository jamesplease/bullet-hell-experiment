import bulletPool from '../pools/bullet-pool';
import _ from 'lodash';

export default function radial({count, startAngle, speed, angleSize, x, y}) {
  let angularDiff = angleSize / (count - 1);
  _.times(count, n => {
    let angle = startAngle + (n * angularDiff);
    bulletPool.shift().activate({
      x,
      y,
      speed,
      angle
    });
  });
}
