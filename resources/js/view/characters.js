export class CharacterProperty {
    constructor({hp, damage, velocity}) {
        this.hp = hp;
        this.damage = damage;
        this.velocity = velocity;
    }
}
export class Player {
    constructor ({sprite, properties, collider, boundaries}) {
        this.sprite = sprite;
        this.properties = properties;
        this.collider = collider;
        this.boundaries = boundaries;
    }
    canMove (position) {
        for (let i = 0; i < this.boundaries.length; i++) {
            const boundary = this.boundaries[i];

            if(collisionDetection(
                this.collider, 
                {
                    ...boundary, position: {
                        x: boundary.position.x + position.x,
                        y: boundary.position.y + position.y
                    }
                })) {
                return false;
            }

        }
        return true;
    }
}
export class Enemy {
    constructor ({sprite, properties, possibleMoves, boundaries, triggersOffset, collider}) {
        this.sprite = sprite;
        this.properties = properties;
        this.forbiddenDir = -1;
        this.collider = collider;
        this.possibleMoves = possibleMoves;
        this.targetDir = Math.floor(Math.random() * this.possibleMoves.length);
        this.direction = (this.targetDir === 0)? 0: this.targetDir - 1;
        this.setMovementAnimation();
        this.boundaries = boundaries;
        this.moveEnemy();
        this.changeDirection();
        this.intervalId = 0;
        this.triggersOffset = triggersOffset;
        this.triggers = [];
        this.updateTriggers();
        this.isAttacking = false;
        this.isPreAttacking = false;
        this.isDetectingPlayer = false;
    }

    updateTriggers () {
        this.triggers = 
            [
                {
                    x: this.collider.position.x,
                    y: this.collider.position.y + this.collider.height
                },
                {
                    x: this.collider.position.x - this.collider.width,
                    y: this.collider.position.y
                },
                {
                    x: this.collider.position.x,
                    y: this.collider.position.y - this.collider.height
                },
                {
                    x: this.collider.position.x + this.collider.width,
                    y: this.collider.position.y
                }  
            ];
    }
    moveEnemy () {
        setInterval(() => {
            this.forbiddenDir = this.canMove();
            if(!this.isPreAttacking && !this.isAttacking && this.targetDir !== this.forbiddenDir) {
                this.sprite.position.x += this.properties.velocity * this.possibleMoves[this.targetDir].x;
                this.sprite.position.y += this.properties.velocity * this.possibleMoves[this.targetDir].y;
            }
        }, 100);
    }

    detectPlayer (player) {
        this.updateTriggers();
        for (let i = 0; i < this.triggers.length; i++) {
            this.isDetectingPlayer = 
                (!this.isAttacking && !this.isDetectingPlayer && collisionDetection(player.collider, 
                    {
                        position: this.triggers[i],
                        width: this.collider.width, 
                        height: this.collider.height
                    }
                ));
            if(this.isDetectingPlayer && !this.isAttacking) {
                // this.isDetectingPlayer = true;
                console.log(`OnTrigger: ${i}`);
                let timeToAtack = Math.floor(Math.random() * (1500 - 500 + 1)) + 500;
                let timeToFace = 400 - Math.floor(Math.random() * (400 - 200));
                
                // this.sprite.animation.setAnimation('idle', i);
                setTimeout(() => { 
                    this.targetDir = i + 1;
                    this.setMovementAnimation();
                    
                }, timeToFace);
                setTimeout(() => { 
                    this.isPreAttacking = true;
                    this.targetDir = 0;
                    this.setMovementAnimation();
                }, 400);
            
                setTimeout(() => {
                    
                    if(!this.isAttacking) {
                        this.isAttacking = collisionDetection(player.collider, {
                            position: this.triggers[i],
                            width: this.collider.width, 
                            height: this.collider.height});
                        if(this.isAttacking) {
                            this.isPreAttacking = false;
                            this.sprite.animation.setAnimation('melee', i);
                            setTimeout(() => {this.isAttacking = false}, 500);
                        } else {
                            this.isPreAttacking = false;
                        }
                    } 
                }, timeToAtack);

                // setTimeout(() => {this.isAttacking = false}, 1500);
            }
        }
    }
    changeDirection () {
        let randomInterval = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
        let executionCount = 0; 
        const maxExecutionsBeforeChange = 5; 
        this.intervalId = setInterval(() => {
            do {
                this.targetDir = Math.floor(Math.random() * this.possibleMoves.length);
            }while(this.targetDir  === this.forbiddenDir);

            this.setMovementAnimation();
            executionCount++;

            if (executionCount >= maxExecutionsBeforeChange) {
                clearInterval(this.intervalId); 
                executionCount = 0;  
                this.changeDirection();  
            }
        
        }, randomInterval);

    }

    setMovementAnimation () {
        if(this.targetDir === 0)
            this.sprite.animation.setAnimation('idle', this.direction);
        else {
            this.direction = this.targetDir - 1;
            this.sprite.animation.setAnimation('walk', this.direction);
        }
    }


    canMove () {
        for (let i = 0; i < this.boundaries.length; i++) {
            const boundary = this.boundaries[i];
    
            if (collisionDetection(
                {
                    position: {
                        x: this.collider.position.x + (this.possibleMoves[this.targetDir].x * this.properties.velocity),
                        y: this.collider.position.y + (this.possibleMoves[this.targetDir].y * this.properties.velocity), 

                    },
                    width: this.collider.width,
                    height: this.collider.height
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