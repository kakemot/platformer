function setup() {
    limbpng = loadImage("/img/limb.png");
    headpng = loadImage("/img/head.png");
    upperarmpng = loadImage("/img/upperarm.png");
    lowerarmpng = loadImage("/img/lowerarm.png");
    upperlegpng = loadImage("/img/upperleg.png");
    lowerlegpng = loadImage("/img/lowerleg.png");
    bodypng = loadImage("/img/body.png");
    backgroundImage = loadImage("/img/background.png");
    groundjpg = loadImage("/img/ground.jpg");

    createCanvas(worldWidth, worldHeight);

    loadLevel();
    animatedBody = new AnimatedBody(50, 100);
    animatedBody.buildBody();
    //Connect animatedBody to player controller object
    animatedBody.player = new Player(100, 200, 16, 83);
    bg = new Background(0, 0, 128, 128, backgroundImage);
}

function draw() {
    background(0);
    bg.show();
    displayObjects();
    update();
}

function displayObjects() {
    animatedBody.show();
    for (let i = 0; i<wall.length; i++) {
        wall[i].show();
    }
}

function update() {
    //A key
    if (keyIsDown(65)) {
        animatedBody.player.move(-1);
    }

        //D key
        if (keyIsDown(68)) {
            let moveSpeed = this.animatedBody.player.crouching ? 1 : 2;
            animatedBody.player.move(moveSpeed);
        }

        //S
        if (keyIsDown(83)) {
            animatedBody.player.crouch();
        }

        //W
        if (keyIsDown(87)) {
            animatedBody.player.stand();
        }

        //SPACE
        if (keyIsDown(32)) {
            animatedBody.player.jump();
        }
    
    animatedBody.update();
}

function keyReleased() {
    if (key == 'd') {
        animatedBody.player.stopmove();
    }
  }

function windowResized() {

}