export class PlayerView {
    constructor (src, frameCount) {
        this.playerImage = new Image();
        this.playerImage.src = src;
        this.frameCount = frameCount;

    }

    draw (ctx, canvas) {
        let frameWidth = this.playerImage.width/this.frameCount;
        let frameHeight = this.playerImage.height;


        ctx.drawImage(this.playerImage, 
            0,
            0,
            frameWidth,
            frameHeight,
            canvas.width/2 - (frameWidth)/2, 
            canvas.height/2 - frameHeight/2, 
            frameWidth, 
            frameHeight
        );
    }
    
}