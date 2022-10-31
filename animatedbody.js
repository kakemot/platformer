class AnimatedBody {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.limbs = [];
        this.frames = [];
        this.player = new Player(this.x, this.y, 16, 118);
        this.created = false;
        this.currentFrame = 0;
    }

    update() {
        if (this.created) {
            this.player.update();
            this.limbs[6].x = this.player.x;
            this.limbs[6].y = this.player.y;
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
            frames.push(new Frame(true));
            this.setInitialBodyPosition();
        }


        setInitialBodyPosition() {
            for (let i = 0; i < this.limbs.length; i++) {
                this.limbs[i].setRotation(frames[currentFrame].value[i]);
            }
        }
}
