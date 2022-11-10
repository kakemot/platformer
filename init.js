//WORLD
let gravity = 0.4;
let worldWidth = 1200;
let worldHeight = 700;

//ENTITIES
let player;
let wall = [];

//GRAPHICS
let bodypng;
let headpng;
let legpng;
let limbpng;
let backgroundImage;
let groundjpg;

//ANIMATION
let limbs = [];
let frames = [];
let play = false;
let currentFrame = 0;
let fps = 60;
let fpsCount = 0;