// These are also set in the HTML to ensure that the canvas loads more quickly
let worldWidth = 500;
let worldHeight = 600;

let canvas = document.querySelector('canvas');
var stage = new createjs.Stage(canvas);

// This ensures that the earliest-drawn bullets appear over other things
stage.compositeOperation = 'destination-over';

export {worldWidth, worldHeight, canvas, stage};
