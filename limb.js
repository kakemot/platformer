class Limb {
    constructor(x, y, w, h, rotation_offset, ax, ay, side = "none") {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.rotation = 0;
        this.rotation_offset = rotation_offset;
        this.selected = false;
        this.hasParent = false;
        this.parent;
        this.pivot_x = -w/2;
        this.pivot_y = 0;
        this.side = side;
        this.id = "";
        this.sprite = limbpng;
        this.xoffset = ax;
        this.yoffset = ay;
    }

    display() {    
        // Draw it!
        push();

        if (this.hasParent) {
          var degtorad = (this.parent.rotation) * (Math.PI/180);

          var rotatedxoffset = this.xoffset * Math.cos(degtorad) - this.yoffset * Math.sin(degtorad);
          var rotatedyoffset = this.xoffset * Math.sin(degtorad) + this.yoffset * Math.cos(degtorad);
      
          this.x = this.parent.x + rotatedxoffset;
          this.y = this.parent.y + rotatedyoffset;
        }

        angleMode(DEGREES);
        translate(this.x, this.y);
        //circle(0, 0, 30);
        rotate(this.rotation + this.rotation_offset);
        translate(this.pivot_x, this.pivot_y);
        if (this.side == "left") {
          tint(0, 153, 204);
        }
        //rect(0, 0, this.w, this.h);
        image(this.sprite, 0, 0, this.w, this.h);
        
        pop();
      }

      setRotation(rotation) {
        this.rotation = rotation;
      }
}
