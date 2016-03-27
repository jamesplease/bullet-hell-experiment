import {stage, worldWidth, worldHeight} from '../world';

function Bullet() {
  var sprite = new createjs.Shape();
  sprite.graphics
    .setStrokeStyle(3)
    .beginStroke('#000')
    .beginFill('#fff')
    .drawCircle(0, 0, 5);
  this._active = false;
  this.sprite = sprite;
}

Object.assign(Bullet.prototype, {
  // Activating a bullet is the process of
  activate({speed, angle, x, y} = {}) {
    this.x = this.sprite.x = x;
    this.y = this.sprite.y = y;
    this.speed = speed;
    this.angle = angle;
    this._active = true;
    stage.addChild(this.sprite);
  },

  // All bullets travel in straight lines, which makes for a
  // simple update function
  update(time) {
    if (!this._active) { return; }
    let distance = time / 1000 * this.speed;
    this.sprite.x += Math.cos(this.angle) * distance;
    this.sprite.y += Math.sin(this.angle) * distance;
  },

  // Whether or not it's okay to dispose of this object
  isTrash() {
    return this.sprite.y + 100 < 0 ||
      this.sprite.x + 100 < 0 ||
      this.sprite.y - 100 > worldHeight ||
      this.sprite.x - 100 > worldWidth;
  },

  destroy() {
    this._active = false;
    stage.removeChild(this.sprite);
  }
});

export default Bullet;
