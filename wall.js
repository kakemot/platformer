class Wall {
    constructor(x, y, width, height, image) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
        this.repeatXY = 64;
    }

    show() {
        for (let i = 0; i < this.width/this.repeatXY; i++) {
            for (let j = 0; j < this.height/this.repeatXY; j++) {
                image(this.image, this.x + i*this.repeatXY, this.y + j*this.repeatXY, this.repeatXY, this.repeatXY);
            }
        }
    }
}