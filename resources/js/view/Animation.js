export class Animation {
    constructor ({hasAnimations, sources, image, isPlaying, frameRate, aditionalConditions}) {
        this.sources = sources;
        this.image = image;
        this.hasAnimations = hasAnimations;
        this.isPlaying = isPlaying;
        this.frameElapsed = 0;
        this.frameRate = frameRate;
        this.frameNumber = 0;
        this.currentSource = this.sources['idle'];
        this.currentSource.currentPath = 0;
        this.image.src = this.currentSource.paths[0];
        this.aditionalConditions = aditionalConditions;
    }

    setAnimation(name, number) {
        if(this.sources[name] === this.currentSource && number === this.currentSource.currentPath)
            return;
        this.currentSource = this.sources[name];
        this.currentSource.currentPath = number;
        this.frameNumber = 0;
        this.image.src = this.currentSource.paths[number];
        this.frameElapsed = 0;
        
    }

    processAnimation() {
        if (!this.hasAnimations || !this.isPlaying)
            return;            

        if(this.currentSource.frameCount > 1) {
            this.frameElapsed++;
        }

        if(this.frameElapsed % this.frameRate === 0 && this.frameElapsed != 0) {
            if(this.frameNumber < this.currentSource.frameCount - 1) 
                this.frameNumber++;
            else {
                if (this.aditionalConditions !== null && this.aditionalConditions !== undefined) 
                    this.aditionalConditions(this);
                else 
                    this.frameNumber = 0;
                // if (this.currentSource === this.sources['melee']) 
                //     this.isPlaying = false;    
            }    
        }
    }
}