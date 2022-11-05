function setup() {
    limbpng = loadImage("/img/limb.png");
    headpng = loadImage("/img/head.png");
    upperarmpng = loadImage("/img/upperarm.png");
    lowerarmpng = loadImage("/img/lowerarm.png");
    upperlegpng = loadImage("/img/upperleg.png");
    lowerlegpng = loadImage("/img/lowerleg.png");
    bodypng = loadImage("/img/body.png");

    createCanvas(1200, 700);

    wall.push(new Wall(1, 500, 300, 64));
    wall.push(new Wall(400, 500, 700, 64));
    wall.push(new Wall(450, 400, 300, 100));
    wall.push(new Wall(810, 372, 64, 64));
    player = new AnimatedBody(50, 100);
    player.buildBody();
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
    keyboardInput(player.player);
}

function windowResized() {

}