export class Sprite {
    constructor ({position, velocity, image}, ctx) {
        this.position = position;
        this.velocity = velocity;
        this.image = image;
        this.ctx = ctx;
    }

    draw() {
        this.ctx.drawImage(this.image, this.position.x, this.position.y);
    }
}