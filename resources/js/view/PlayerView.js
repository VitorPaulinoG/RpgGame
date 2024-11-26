export class PlayerView {
    constructor (src, frameCount, ctx, canvas) {
        this.playerImage = new Image();
        this.playerImage.src = src;
        this.frameCount = frameCount;
        this.ctx = ctx;
        this.canvas = canvas;

    }

    draw () {
        let frameWidth = this.playerImage.width/this.frameCount;
        let frameHeight = this.playerImage.height;


        this.ctx.drawImage(this.playerImage, 
            0,
            0,
            frameWidth,
            frameHeight,
            this.canvas.width/2 - (frameWidth)/2, 
            this.canvas.height/2 - frameHeight/2, 
            frameWidth, 
            frameHeight
        );
    }
    
}