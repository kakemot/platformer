class Background {
    constructor(x,y,w,h, image) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.image = image;
    }

    show() {
        for (let i = 0; i < worldWidth/this.width; i++) {
            for (let j = 0; j < worldHeight/this.height; j++) {
                image(this.image, this.x + i*this.width, this.y + j*this.height, this.width, this.height);
            }
        }
    }
}