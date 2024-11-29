export class Enemy {
    constructor ({sprite, properties, possibleMoves, boundaries}) {
        this.sprite = sprite;
        this.properties = properties;
        this.forbiddenDir = -1;
        this.possibleMoves = possibleMoves;
        this.targetDir = Math.floor(Math.random() * this.possibleMoves.length);
        this.direction = (this.targetDir === 0)? 0: this.targetDir - 1;
        this.setAnimation();
        this.moveEnemy(boundaries);
        this.changeDirection();
        this.intervalId = 0;
    }

    moveEnemy (boundaries) {
        setInterval(() => {
            this.forbiddenDir = this.enemyCanMove(boundaries);
            if(this.targetDir !== this.forbiddenDir) {
                this.sprite.position.x += this.properties.velocity * this.possibleMoves[this.targetDir].x;
                this.sprite.position.y += this.properties.velocity * this.possibleMoves[this.targetDir].y;
            }
        }, 100);
    }

    changeDirection () {
        let randomInterval = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
        let executionCount = 0; 
        const maxExecutionsBeforeChange = 5; 
        this.intervalId = setInterval(() => {
            do {
                this.targetDir = Math.floor(Math.random() * this.possibleMoves.length);
            }while(this.targetDir  === this.forbiddenDir);

            this.setAnimation();
            executionCount++;

            if (executionCount >= maxExecutionsBeforeChange) {
                clearInterval(this.intervalId); 
                executionCount = 0;  
                this.changeDirection();  
            }
        
        }, randomInterval);

    }

    setAnimation () {
        if(this.targetDir === 0)
            this.sprite.animation.setAnimation('idle', this.direction);
        else {
            this.direction = this.targetDir - 1;
            this.sprite.animation.setAnimation('walk', this.direction);
        }
    }


    enemyCanMove (boundaries) {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
    
            if (collisionDetection(
                {
                    position: {
                        x: this.sprite.position.x + (this.properties.velocity * this.possibleMoves[this.targetDir].x) + 30, 
                        y: this.sprite.position.y + (this.properties.velocity * this.possibleMoves[this.targetDir].y) + 40
                    }, 
                    width: this.sprite.width - 40, 
                    height: this.sprite.height - 40
                }, 
                {
                    ...boundary, 
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y
                    }
                })) 
            {
                return this.possibleMoves.findIndex((move) => move.x === this.possibleMoves[this.targetDir].x && 
                    move.y === this.possibleMoves[this.targetDir].y);   
            }
    
        }
        return -1;
    }
}