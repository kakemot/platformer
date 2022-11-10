class AnimatedBody {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.limbs = [];
        this.frames = [];
        this.player;
        this.created = false;
        this.currentFrame = 0;
        this.play = true;
        this.currentAnimation = idle;
        this.canChange = true;
        this.shouldStep = false;
    }

    update() {

      if (fpsCount >= 60/fps) {
        this.shouldStep = true;
        fpsCount = 0;
      } else {
        this.shouldStep = false;
        fpsCount ++;
      }

      if (this.frames.length - 1 == this.currentFrame) {
        this.frames = JSON.parse(JSON.stringify(this.currentAnimation.frames));
        this.currentFrame = 0;
        this.canChange = true;
      }

      if (this.player.status == "breaking") {
        this.changeAnimation(breaking);
      }

      if (this.player.status == "falling") {
        this.changeAnimation(falling);
      }

      if (this.player.status == "landing") {
        this.changeAnimation(landing);
      }

      if (this.player.status == "jumping") {
        this.changeAnimation(jump);
      }

      if (this.player.status == "running") {
        this.changeAnimation(walking);
      }

      if (this.player.status == "backwards") {
        this.changeAnimation(backwards);
      }

      if (this.player.status == "crouchwalking") {
        this.changeAnimation(crouchwalking);
      }

      if (this.player.status == "crouchidle") {
        this.changeAnimation(crouchidle);
      }

      if (this.player.status == "idle") {
        this.changeAnimation(idle);
      }

      if (this.player.status == "kicking") {
        this.changeAnimation(kick);
      }

        if (this.created) {
            this.player.update();
            this.limbs[6].x = this.player.x;
            this.limbs[6].y = this.player.y + this.frames[this.currentFrame].relativeY;

            if (this.play == true && this.shouldStep) {
                this.currentFrame = (this.currentFrame == this.frames.length - 1 ? 0 : this.currentFrame + 1);
                this.setBodyPositionToFrame();
              }
        }
    }

    show() {
      //this.player.show();
        for (let i = 0; i < this.limbs.length; i++) {
            this.limbs[i].display();
          }
    }
        buildBody() {
            let head = new Limb(100, 120, 18, 18, 270, 0, 0);
            let body = new Limb(100, 120, 12, 34, 270, 0, 0);
        
            let upperarm_r = new Limb(100, 200, 10, 22, 270, 0, 0, "right");
            let lowerarm_r = new Limb(100, 200, 10, 26, 270, 22, 0, "right");
        
            let upperarm_l = new Limb(100, 200, 10, 22, 270, 0, 0, "left");
            let lowerarm_l = new Limb(100, 200, 10, 26, 270, 22, 0, "left");
        
            let upperleg_r = new Limb(100, 200, 12, 24, 270, 34, 0, "right");
            let lowerleg_r = new Limb(100, 264, 12, 24, 270, 24, 0, "right");
            let foot_r = new Limb(100, 350, 8, 14, 270, 24, 0, "right");
            
            let upperleg_l = new Limb(100, 200, 12, 24, 270, 34, 0, "left")
            let lowerleg_l = new Limb(100, 264, 12, 24, 270, 24, 0, "left");
            let foot_l = new Limb(100, 350, 8, 14, 270, 24, 0, "left");
            
            body.sprite = bodypng;
        
            head.parent = body;
            head.sprite = headpng;
            head.hasParent = true;
            head.pivot_y = -head.h;
            
            upperarm_r.parent = body;
            upperarm_r.hasParent = true;
            upperarm_r.sprite = upperarmpng;
            lowerarm_r.parent = upperarm_r;
            lowerarm_r.hasParent = true;
            lowerarm_r.sprite = lowerarmpng;
        
            upperarm_l.parent = body;
            upperarm_l.hasParent = true;
            upperarm_l.sprite = upperarmpng;
            lowerarm_l.parent = upperarm_l;
            lowerarm_l.hasParent = true;
            lowerarm_l.sprite = lowerarmpng;
        
            upperleg_r.parent = body;
            upperleg_r.hasParent = true;
            upperleg_r.sprite = upperlegpng;
            
            upperleg_l.parent = body;
            upperleg_l.hasParent = true;
            upperleg_l.sprite = upperlegpng;
            
            lowerleg_r.parent = upperleg_r;
            lowerleg_r.hasParent = true;
            lowerleg_r.sprite = lowerlegpng;
        
            foot_r.hasParent = true;
            foot_r.parent = lowerleg_r;
            foot_r.sprite = upperarmpng;
            
            lowerleg_l.parent = upperleg_l;
            lowerleg_l.hasParent = true;
            lowerleg_l.sprite = lowerlegpng;
            foot_l.hasParent = true;
            foot_l.parent = lowerleg_l;
            foot_l.sprite = upperarmpng;
        
            this.limbs.push(upperarm_l);
            this.limbs.push(lowerarm_l);
            this.limbs.push(upperleg_l);
            this.limbs.push(lowerleg_l);
            this.limbs.push(foot_l);
            this.limbs.push(head);
            this.limbs.push(body);
            this.limbs.push(upperarm_r);
            this.limbs.push(upperleg_r);
            this.limbs.push(lowerarm_r);
            this.limbs.push(lowerleg_r);
            this.limbs.push(foot_r);
            this.created = true;
            //updateValue();
            this.frames.push(new Frame(true));
            this.setBodyPositionToFrame();
            this.setAnimation(this.currentAnimation);
        }

        setBodyPositionToFrame() {
            for (let i = 0; i < this.limbs.length; i++) {
                this.limbs[i].setRotation(this.frames[this.currentFrame].value[i]);
            }
        }

        changeAnimation(animation) {
          if (this.currentAnimation != animation) {
            this.currentAnimation = animation;
            console.log(animation);
            this.interpolateAnimation(animation);
            this.calculateFrameValues();
          }
          this.canChange = false;
        }

        setAnimation(animation) {
            this.frames = animation.frames;
            this.calculateFrameValues();
        }

        //Add some empty frames and merge with the next animation
        interpolateAnimation(nextanimation) {
            let startFrame = this.frames[this.currentFrame];
            this.frames = this.frames.splice(0, this.currentFrame);
            startFrame.isKeyframe = true;
            let emptyframes = [];
            emptyframes.push(new Frame(false));
            emptyframes.push(new Frame(false));
            emptyframes.push(new Frame(false));

            let newframes = this.frames.concat(startFrame, emptyframes, nextanimation.frames);
            this.frames = newframes;
            console.log(this.frames);
        }
        
        calculateFrameValues() {
            var keyframeStartValue = 90;
            var relativeYStartValue = 0;
            var count = 1;
            for (let l = 0; l<this.limbs.length; l++) {
              for (let i = 0; i<this.frames.length; i++) {
                if (this.frames[i].isKeyframe == true) {
                  keyframeStartValue = this.frames[i].value[l];
                  relativeYStartValue = this.frames[i].relativeY;
                  count = 1;
                } else {
                  var obj = this.getDistanceToNextKeyFrame(i, l);
                  var result = keyframeStartValue + Math.round((obj.rotationValue - keyframeStartValue) / obj.originalDistance * count);
                  var relativeYResult = relativeYStartValue + Math.round((obj.relativeYValue - relativeYStartValue) / obj.originalDistance * count);
                  this.frames[i].value[l] = result;
                  this.frames[i].relativeY = relativeYResult;
                  count ++;
                }
              }
            }
          }

            getDistanceToNextKeyFrame(frame = 0, limb = 0) {
            var keyframeValue = 0;
            var keyframeRelativeY = 0;
            for (let i = frame; i<this.frames.length; i++) {
              if (this.frames[i].isKeyframe) {
                var distance = i - frame; //get distance from current frame
                var originalDistance = i - this.getPreviousKeyFrame(frame); //get distance from keyframe to keyframe
                keyframeValue = this.frames[i].value[limb];
                keyframeRelativeY = this.frames[i].relativeY;
                return {originalDistance: originalDistance, distance: distance, rotationValue: keyframeValue, relativeYValue: keyframeRelativeY};
              }
            }
              return {distance: 0, value: 0};
            }
          
            getPreviousKeyFrame(frame) {
              for (let i = frame; i>=0; i--) {
                if (this.frames[i].isKeyframe) {
                  return i;
                }
              }
            }
}
