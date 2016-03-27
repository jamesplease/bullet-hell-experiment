import _ from 'lodash';
import MainLoop from 'mainloop.js';

import {stage} from './world';
import initialState from './initial-state';
import bulletPool from './pools/bullet-pool';
import enemyPool from './pools/enemy-pool';
import player from './objects/player';
import userInput from './user-input';

// The 0th frame is the `initialState` function,
// so we start the rest of the game at frame 1
var frame = 1;

// This runs before each frame to parse user input
function begin() {
  // _.each(userInput.userInput, (active, type) => {
  //   if (active) {
  //     console.log(`Doing ${type}`);
  //   }
  // });
}

// Our update function computes new positions of objects,
// detects collisions, and every other calculation.
// It also increments our frame
function update(delta) {
  // Limit our game to 1000 frames for now
  if (frame === 1000) {
    MainLoop.stop();
    return;
  }

  enemyPool.update(delta, frame);
  bulletPool.update(delta, frame);
  player.update(delta, frame);
  frame++;
}

var fpsEl = document.querySelector('.fps');
function draw() {
  fpsEl.innerText = MainLoop.getFPS().toFixed(2);
  stage.update();
}

const fps = 30;

MainLoop
  .setMaxAllowedFPS(fps)
  .setSimulationTimestep(1000 / fps)
  .setBegin(begin)
  .setUpdate(update)
  .setDraw(draw);

window.MainLoop = MainLoop;

export default {
  // Start the game
  start() {
    initialState();
    MainLoop.start();
  },

  // Stop the game
  stop() {
    MainLoop.stop();
  }
};
