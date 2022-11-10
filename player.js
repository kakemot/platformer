class Player {
    constructor(x,y,w,h) {
        this.x = x;
        this.y = y;
        this.prevx = x;
        this.prevy = y;
        this.width = w;
        this.height = h;
        this.vspeed = 0;
        this.hspeed = 0;
        this.maxSpeed = 3;
        this.acceleration = 1;
        this.direction = 0;
        this.friction = 0.5;
        this.gravityMultiplier = 1;
        this.status = "idle";
        this.crouching = false;
        this.waitFrames = 0;
    }

    changeStatus(status, waitFrames = 0) {
        if (this.waitFrames == 0) {
            this.status = status;
            this.waitFrames = waitFrames;
        }
    }

    //Draw the player
    show() {
        rect(this.x, this.y, this.width, this.height);
    }

    //Makes the player do a jump
    jump() {
        if (this.vspeed == 0) {
            this.gravityMultiplier = 1;
            this.vspeed = -10;
            this.crouching = false;
            this.changeStatus("jumping");
        }
    }

    crouch() {
        this.crouching = true;
    }

    stand() {
        this.crouching = false;
    }

    kick() {
        this.changeStatus("kicking");
    }

    stopmove() {
        if (this.status == "running") {
            this.changeStatus("breaking");
        }
    }

    //Moves and accelerates the player
    move(direction) {
        if (this.status != "jumping" && this.status != "falling" && this.crouching == false) {
            let newStatus = this.direction > 0 ? "running" : "backwards";
            this.changeStatus(newStatus);
            console.log(this.status);
        }

        if (this.status != "jumping" && this.status != "falling" && this.crouching == true) {
            this.changeStatus("crouchwalking");
        }
        this.hspeed += this.acceleration;
        this.direction = direction;
    }

    // Increment gravity, friction, start collision check
    update() {
        if (this.vspeed > 1) {
            this.changeStatus("falling");
        }

        this.waitFrames = this.waitFrames == 0 ? this.waitFrames = 0 : this.waitFrames -= 1;
        console.log(this.waitFrames);
        if (this.hspeed == 0 && this.status != "jumping" && this.status != "falling") {
            let newStatus = this.crouching ? "crouchidle" : "idle";
            this.changeStatus(newStatus);
        }

        this.x += this.hspeed * this.direction;
        this.hspeed = Math.max(this.hspeed - this.friction, 0);
        this.hspeed = Math.min(this.hspeed, this.maxSpeed);
        this.vspeed += gravity*this.gravityMultiplier;
        this.y += this.vspeed;

        for (var i=0; i<wall.length; i++) {
            this.rectIntersect(wall[i])
        }
    }

    // Check if player hitbox overlaps with any edges of given solid object obj1. Turns on gravity if no collision
    rectIntersect(obj1) {
        if (this.x > obj1.width + obj1.x || obj1.x > this.width + this.x || this.y > obj1.height + obj1.y || obj1.y > this.height + this.y) {
            this.gravityMultiplier = 1;
            this.prevy = this.y;
            this.prevx = this.x;
        }  else {
            this.snap(obj1);
        }
    }

    //This is called only when player hitbox is overlapping another object. Check where player came from and snap to correct edge (collide)
    snap(obj) {
        if (this.prevy + this.height - this.vspeed < obj.y) {
            this.snapOnTop(obj);
            if (this.status == "jumping" || this.status == "falling") {
                this.changeStatus("landing", 5);
            }
        }
        else 
        if (this.prevy - this.vspeed > obj.y + obj.height) {
           this.snapOnBottom(obj);
        }
        else {
            this.snapOnSide(obj);
        }
    }

    //Snap to top edge and stop gravity
    snapOnTop(obj) {
        this.gravityMultiplier = 0;
        this.y = obj.y - this.height-1;
        this.vspeed = 0;
        if (this.status == "jumping") {
            this.status == "landing";
        }
    }

    //Snap to bottom edge and upward motion
    snapOnBottom(obj) {
        this.y = obj.height + obj.y + 1;
        this.vspeed = -1;
    }

    //Snap to correct side and stop horizontal speed
    snapOnSide(obj) {
        if (this.x > obj.x + obj.width/2 && this.y < obj.y + obj.height) {
            this.x = obj.width + obj.x;
        }

        if (this.x < obj.x + obj.width/2 && this.y < obj.y + obj.height) {
            this.x = obj.x - this.width;
        }
        
        this.hspeed = 0;
    }
}