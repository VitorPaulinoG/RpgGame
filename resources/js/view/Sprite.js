export class Sprite {
    constructor ({animation, position, velocity, ctx, width, height, opacity}) {
        this.ctx = ctx;
        this.animation = animation;
        this.velocity = velocity;
        this.width = width ?? this.animation.image.width;
        this.height = height ?? this.animation.image.height;
        this.position = position;
        this.opacity = opacity;

    }

    draw () {
        this.ctx.globalAlpha = this.opacity;
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
        this.ctx.globalAlpha = 1;
        this.animation.processAnimation();

    }
    
}

