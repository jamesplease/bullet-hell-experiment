import {stage} from '../world';
import radial from '../bullet-factories/radial';

function Enemy() {
  var sprite = new createjs.Shape();
  sprite.graphics
    .beginStroke('#000')
    .beginFill('#000')
    .drawCircle(0,0,20);
  this.sprite = sprite;
  this.health = 100;

  this.totalTime = 0;
  this.timeSinceLastShot = 0;
  this._active = false;
}

Object.assign(Enemy.prototype, {
  activate({x, y, creationFrame, health} = {}) {
    this._active = true;
    this.x = this.sprite.x = x;
    this.y = this.sprite.y = y;
    this.health = health;
    this.creationFrame = creationFrame;
    stage.addChild(this.sprite);
  },

  update(delta, frame) {
    if (!this._active) { return; }
    let relativeFrame = frame - this.creationFrame;
    this.totalTime += delta;
    var shotBefore = this.timeSinceLastShot;
    var reloaded = this.totalTime - this.timeSinceLastShot > 60;
    if (this.totalShots) {
      this.totalShots++;
    }
    var maxShots = !this.totalShots || this.totalShots < 100;

    if ((!shotBefore || reloaded) && maxShots) {
      this.shootPatternOne(this.totalTime);
      this.timeSinceLastShot = this.totalTime;
    }
  },

  isTrash() {
    return this.health <= 0;
  },

  shootPatternOne(timestamp) {
    if (!this.totalShots) {
      this.totalShots = 1;
    }
    let offset = timestamp / 6;
    var addition = 30 * 1 / Math.exp(timestamp / 190);
    var angleAddition = timestamp / 1500;
    radial({
      count: 10,
      startAngle: 0.3 * Math.PI + angleAddition,
      angleSize: 1.2 * Math.PI,
      speed: 35 + addition,
      x: this.x + offset,
      y: this.y + offset
    });

    radial({
      count: 10,
      startAngle: -0.3 * Math.PI + angleAddition,
      angleSize: -1.2 * Math.PI,
      speed: 35 + addition,
      x: this.x + 450 - offset,
      y: this.y + offset
    });

    radial({
      count: 10,
      startAngle: -0.3 * Math.PI + angleAddition,
      angleSize: -1.2 * Math.PI,
      speed: 35 + addition,
      x: this.x + 450 - offset,
      y: this.y + 300 - offset
    });

    radial({
      count: 10,
      startAngle: -0.3 * Math.PI + angleAddition,
      angleSize: -1.2 * Math.PI,
      speed: 35 + addition,
      x: this.x + offset,
      y: this.y + 300 - offset
    });
  },

  destroy() {
    this._active = false;
    stage.removeChild(this.sprite);
  }
});

export default Enemy;
