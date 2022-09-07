class Player {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.width = 55;
        this.height = 55;
        this.vspeed = 0;
        this.hspeed = 0;
        this.maxSpeed = 5;
        this.acceleration = 1;
        this.direction = 0;
        this.friction = 0.5;
        this.isColliding = false;
        this.gravityMultiplier = 1;
    }

    show() {
        rect(this.x, this.y, this.width, this.height);
    }

    jump() {
        if (this.vspeed == 0) {
            this.gravityMultiplier = 1;
            this.vspeed = -12;
        }
    }

    move(direction) {
        this.hspeed += this.acceleration;
        this.direction = direction;
    }

    update() {
        this.x += this.hspeed * this.direction;
        this.hspeed = Math.max(this.hspeed - this.friction, 0);
        this.hspeed = Math.min(this.hspeed, this.maxSpeed);
        this.vspeed += gravity*this.gravityMultiplier;
        this.y += this.vspeed;

        for (var i=0; i<wall.length; i++) {
            this.rectIntersect(wall[i], this)
        }
    }

    snapOnTop(obj) {
        this.gravityMultiplier = 0;
        this.y = obj.y - this.height-1;
        this.vspeed = 0;
    }

    snapOnSide(obj) {
        if (this.x > obj.x + obj.width/2) {
            this.x = obj.width + obj.x;
        }

        if (this.x < obj.x + obj.width/2) {
            this.x = obj.x - this.width;
        }
        
        this.hspeed = 0;
    }

    rectIntersect(obj1, obj2) {
  // Check x and y for overlap
    if (obj2.x > obj1.width + obj1.x || obj1.x > obj2.width + obj2.x || obj2.y > obj1.height + obj1.y || obj1.y > obj2.height + obj2.y) {
        this.gravityMultiplier = 1;
    } else {
    this.snapOnTop(obj1);
  }
}

}