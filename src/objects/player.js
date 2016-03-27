import {stage} from '../world';
import userInput from '../user-input';

function Player() {
  var sprite = new createjs.Shape();
  sprite.graphics
    .beginStroke('#000')
    .beginFill('#fff')
    .drawCircle(0,0,7);
  this.sprite = sprite;
  this.health = 100;

  this._active = false;
}

Object.assign(Player.prototype, {
  speed: 7,

  activate({x, y, creationFrame, health} = {}) {
    this._active = true;
    this.x = this.sprite.x = x;
    this.y = this.sprite.y = y;
    this.health = health;
    this.creationFrame = creationFrame;
    stage.addChild(this.sprite);
  },

  update() {
    if (userInput.userInput.left) {
      this.sprite.x -= this.speed;
    }
    if (userInput.userInput.right) {
      this.sprite.x += this.speed;
    }
    if (userInput.userInput.up) {
      this.sprite.y -= this.speed;
    }
    if (userInput.userInput.down) {
      this.sprite.y += this.speed;
    }
  }
});

export default new Player();
