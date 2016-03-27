import Bullet from '../objects/bullet';
import _ from 'lodash';

export default function chain({
    count, startAngle, angleIncrement,
    startSpeed, speedIncrement,
    x, xIncrement, y, yIncrement
  }) {
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
