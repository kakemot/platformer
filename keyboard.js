function keyboardInput() {

  if (keyIsDown(LEFT_ARROW)) {
    player.move(-2);
  }

  if (keyIsDown(RIGHT_ARROW)) {
    player.move(2);
  }

  if (keyIsDown(UP_ARROW)) {
    player.jump();
  }
}