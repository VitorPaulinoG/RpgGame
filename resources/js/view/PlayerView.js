export class PlayerView {
    constructor (src, frameCount, velocity, ctx, canvas) {
        this.playerImage = new Image();
        this.playerImage.src = src;
        this.ctx = ctx;
        this.canvas = canvas;
        this.frameCount = frameCount;
        this.velocity = velocity;

        this.width = this.playerImage.width/this.frameCount;
        this.height = this.playerImage.height;

        this.position = {
            x: this.canvas.width/2 - (this.width)/2,
            y: this.canvas.height/2 - this.height/2
        };
        
        
        

    }

    draw () {
        this.ctx.drawImage(this.playerImage, 
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