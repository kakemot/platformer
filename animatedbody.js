class AnimatedBody {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.limbs = [];
        this.frames = [];
        this.player = new Player(this.x, this.y, 16, 118);
        this.created = false;
        this.currentFrame = 0;
        this.play = true;
        this.currentAnimation = idle;
        this.canChange = true;
    }

    update() {
      if (this.frames.length - 1 == this.currentFrame) {
        this.frames = JSON.parse(JSON.stringify(this.currentAnimation.frames));
        this.currentFrame = 0;
        this.canChange = true;
      }

        if (this.player.hspeed != 0) {
          this.changeAnimation(walking);
        } else {
          this.changeAnimation(idle);
        }

        if (this.created) {
            this.player.update();
            this.limbs[6].x = this.player.x;
            this.limbs[6].y = this.player.y;

            if (this.play == true) {
                this.currentFrame = (this.currentFrame == this.frames.length - 1 ? 0 : this.currentFrame + 1);
                this.setBodyPositionToFrame();
              }
        }
    }

    show() {
        for (let i = 0; i < this.limbs.length; i++) {
            this.limbs[i].display();
          }
    }
        buildBody() {
            let head = new Limb(100, 120, 32, 32, 270, 0, 0);
            let body = new Limb(this.x, this.y, 24, 48, 270, 0, 0);
        
            let upperarm_r = new Limb(100, 200, 16, 32, 270, 0, 0, "right");
            let lowerarm_r = new Limb(100, 200, 16, 32, 270, 32, 0, "right");
        
            let upperarm_l = new Limb(100, 200, 16, 32, 270, 0, 0, "left");
            let lowerarm_l = new Limb(100, 200, 16, 32, 270, 32, 0, "left");
        
            let upperleg_r = new Limb(100, 200, 16, 32, 270, 48, 0, "right");
            let lowerleg_r = new Limb(100, 264, 16, 32, 270, 32, 0, "right");
            let foot_r = new Limb(100, 350, 12, 24, 270, 32, 0, "right");
            
            let upperleg_l = new Limb(100, 200, 16, 32, 270, 48, 0, "left")
            let lowerleg_l = new Limb(100, 264, 16, 32, 270, 32, 0, "left");
            let foot_l = new Limb(100, 350, 12, 24, 270, 32, 0, "left");
            
            body.sprite = bodypng;
        
            head.parent = body;
            head.sprite = headpng;
            head.hasParent = true;
            head.pivot_y = -head.h;
            
            upperarm_r.parent = body;
            upperarm_r.hasParent = true;
            upperarm_r.sprite = legpng;
            lowerarm_r.parent = upperarm_r;
            lowerarm_r.hasParent = true;
            lowerarm_r.sprite = legpng;
        
            upperarm_l.parent = body;
            upperarm_l.hasParent = true;
            upperarm_l.sprite = legpng;
            lowerarm_l.parent = upperarm_l;
            lowerarm_l.hasParent = true;
            lowerarm_l.sprite = legpng;
        
            upperleg_r.parent = body;
            upperleg_r.hasParent = true;
            upperleg_r.sprite = legpng;
            
            upperleg_l.parent = body;
            upperleg_l.hasParent = true;
            upperleg_l.sprite = legpng;
            
            lowerleg_r.parent = upperleg_r;
            lowerleg_r.hasParent = true;
            lowerleg_r.sprite = legpng;
        
            foot_r.hasParent = true;
            foot_r.parent = lowerleg_r;
            foot_r.sprite = legpng;
            
            lowerleg_l.parent = upperleg_l;
            lowerleg_l.hasParent = true;
            lowerleg_l.sprite = legpng;
            foot_l.hasParent = true;
            foot_l.parent = lowerleg_l;
            foot_l.sprite = legpng;
        
            this.limbs.push(upperarm_l);
            this.limbs.push(lowerarm_l);
            this.limbs.push(upperleg_l);
            this.limbs.push(lowerleg_l);
            this.limbs.push(foot_l);
            this.limbs.push(head);
            this.limbs.push(body);
            this.limbs.push(upperarm_r);
            this.limbs.push(lowerarm_r);
            this.limbs.push(upperleg_r);
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
            var count = 1;
            for (let l = 0; l<this.limbs.length; l++) {
              for (let i = 0; i<this.frames.length; i++) {
                if (this.frames[i].isKeyframe == true) {
                  keyframeStartValue = this.frames[i].value[l];
                  count = 1;
                } else {
                  var obj = this.getDistanceToNextKeyFrame(i, l);
                  var result = keyframeStartValue + Math.round((obj.value - keyframeStartValue) / obj.originalDistance * count);
                  this.frames[i].value[l] = result;
                  count ++;
                }
              }
            }
          }

            getDistanceToNextKeyFrame(frame = 0, limb = 0) {
            var keyframeValue = 0;
            for (let i = frame; i<this.frames.length; i++) {
              if (this.frames[i].isKeyframe) {
                var distance = i - frame; //get distance from current frame
                var originalDistance = i - this.getPreviousKeyFrame(frame); //get distance from keyframe to keyframe
                keyframeValue = this.frames[i].value[limb];
              return {originalDistance: originalDistance, distance: distance, value: keyframeValue};
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
