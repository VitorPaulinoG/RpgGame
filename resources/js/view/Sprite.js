export class Sprite {
    constructor ({animation, position, ctx, width, height, opacity}) {
        this.ctx = ctx;
        this.animation = animation;
        this.width = width ?? this.animation.image.width;
        this.height = height ?? this.animation.image.height;
        this.position = position;
        this.opacity = opacity;
        this.filter = "none";
    }

    draw () {
        this.ctx.filter = this.filter;
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
        this.ctx.filter = "none";
        this.animation.processAnimation();

    }
    
}

