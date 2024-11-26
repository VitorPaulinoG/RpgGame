export class Sprite {
    constructor ({image, position, frameCount, velocity, ctx}) {
        this.image = image
        this.ctx = ctx;
        this.frameCount = frameCount;
        this.velocity = velocity;

        this.width = this.image.width/this.frameCount;
        this.height = this.image.height;
        this.position = position;

        
        

    }

    draw () {
        this.ctx.drawImage(this.image, 
            0,
            0,
            this.width,
            this.height,
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
        );
    }
    
}