export class Sprite {
    constructor ({animation, position, velocity, ctx}) {
        this.ctx = ctx;
        this.animation = animation;
        



        this.velocity = velocity;
        this.width = this.animation.image.width;
        this.height = this.animation.image.height
        this.position = position;
        

    }

    draw () {
        this.ctx.drawImage(this.animation.image,
            this.animation.frameNumber * this.width,
            0,
            this.width,
            this.height,
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
        );
        this.animation.processAnimation();

    }
    
}

