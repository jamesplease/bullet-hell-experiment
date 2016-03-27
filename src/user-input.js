const keyMap = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  90: 'shoot'
};

// The direction that the user is inputting
var userInput = {
  // These four properties are for movement
  left: false,
  up: false,
  down: false,
  right: false,

  // This property is for shooting bullets
  shoot: false
};

function onKeyDown(e) {
  let arrowPressed = keyMap[e.keyCode];
  if (arrowPressed) {
    userInput[arrowPressed] = true;
  }
}

function onKeyUp(e) {
  let arrowPressed = keyMap[e.keyCode];
  if (arrowPressed) {
    userInput[arrowPressed] = false;
  }
}

// Begin receiving user's keyboard input
function enableUserInput() {
  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);
}

// Stop receiving user's keyboard input
function disableUserInput() {
  document.removeEventListener('keydown', onKeyDown);
  document.removeEventListener('keyup', onKeyUp);
}

console.log('hello');

export default {
  enableUserInput,
  disableUserInput,
  userInput
};
