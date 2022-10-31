function keyboardInput(object) {

  if (keyIsDown(LEFT_ARROW)) {
    object.move(-2);
  }

  if (keyIsDown(RIGHT_ARROW)) {
    object.move(2);
  }

  if (keyIsDown(UP_ARROW)) {
    object.jump();
  }
}