function keyboardInput(object) {

  if (keyIsDown(LEFT_ARROW)) {
    object.move(-1);
  }

  if (keyIsDown(RIGHT_ARROW)) {
    object.move(2);
  }

  if (keyIsDown(UP_ARROW)) {
    object.jump();
  }

  if (keyIsDown(DOWN_ARROW)) {
    object.crouch();
  }

  if (keyIsDown(CONTROL)) {
    object.kick();
  }
}