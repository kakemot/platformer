var player;
var gravity = 0.4;
var wall = [];

function setup() {
    createCanvas(1200, 700);
    player = new Player(30, 10);
    wall.push(new Wall(1, 500, 300, 64));
    wall.push(new Wall(400, 500, 700, 64));
    wall.push(new Wall(450, 322, 300, 100));
    wall.push(new Wall(810, 372, 64, 64));
}

function draw() {
    background(199);
    displayObjects();
    update();
}

function displayObjects() {
    player.show();
    for (let i = 0; i<wall.length; i++) {
        wall[i].show();
    }
}

function update() {
    player.update();
    keyboardInput();
}

function windowResized() {

}