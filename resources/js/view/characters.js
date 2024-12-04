class CharacterProperty {
    constructor({hp, damage, velocity}) {
        this.hp = hp;
        this.damage = damage;
        this.velocity = velocity;
        this.isAlive = true;
    }
}
class Player {
    constructor ({sprite, properties, collider, boundaries, hud}) {
        this.sprite = sprite;
        this.properties = properties;
        this.collider = collider;
        this.boundaries = boundaries;
        this.isAttacking = false;
        this.canAttack = true; // Para atacar, é preciso soltar e pressionar o espaço de novo
        this.hud = hud;
        this.isTakingDamage = false;
    }


    applyDamage(enemy) {
        
        if (!this.isTakingDamage) {
            if(this.properties.hp > 0) {
                this.properties.hp -= enemy.properties.damage; 

                this.hud.animation.setAnimation('idle', this.properties.hp); 
                
                this.isTakingDamage = true;
                let i = 0;
                let maxCount = 5;
                let interval = setInterval(() => {
                    
                    
                    setTimeout(() => {
                        this.sprite.filter = "opacity(0)";   
                    }, 100);
                    
                    setTimeout(() => {
                        this.sprite.filter = "none";
                    }, 200);

                    if(i < maxCount) {  
                        i++;
                    } else {
                        this.isTakingDamage = false;
                        clearInterval(interval);
                    }
                    
                }, 300);
                

                if(this.properties.hp <= 0) {
                    console.log('Game Over!'); 
                    audio.GameOver.play();
                    audio.Map.stop();
                    window.dispatchEvent(new CustomEvent('gameOver',{
                        detail: {
                            message: 'Game Over',
                            
                           
                        }
                    }));
                }
            } 
        } 
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

class Enemy {
    constructor ({sprite, properties, possibleMoves, boundaries, triggersOffset, 
            collider, intervalToChangeDirection = {max: 5000, min: 2000}}) {
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
        this.isTakingDamage = false;
        this.intervalToChangeDirection = intervalToChangeDirection;
    }

    updateTriggers () {
        if(!this.properties.isAlive) 
            return;
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
            if(this.properties.isAlive && !this.isPreAttacking && !this.isAttacking && 
                this.targetDir !== this.forbiddenDir) {
                this.sprite.position.x += this.properties.velocity * this.possibleMoves[this.targetDir].x;
                this.sprite.position.y += this.properties.velocity * this.possibleMoves[this.targetDir].y;
            }
        }, 100);
    }

    detectPlayer (player) {
        if(!this.properties.isAlive) 
            return
        this.updateTriggers();
        for (let i = 0; i < this.triggers.length; i++) {
            this.isDetectingPlayer = 
                (!this.isAttacking && !this.isDetectingPlayer && !this.isTakingDamage && collisionDetection(player.collider, 
                    {
                        position: this.triggers[i],
                        width: this.collider.width, 
                        height: this.collider.height
                    }
                ));
            if(this.isDetectingPlayer && !this.isPreAttacking && !this.isAttacking) {
                let timeToAtack = Math.floor(Math.random() * (1500 - 500 + 1)) + 500;
                let timeToFace = 400 - Math.floor(Math.random() * (400 - 200));                
                
                setTimeout(() => { 
                    this.targetDir = i + 1;
                    this.setMovementAnimation();
                    
                }, timeToFace);
                setTimeout(() => { 
                    this.isPreAttacking = true;
                    this.targetDir = 0;
                    this.setMovementAnimation();
                    
                }, 400);
            
                let meleeInterval = setTimeout(() => {
                    if(!this.isAttacking) {
                        this.isAttacking = collisionDetection(player.collider, {
                            position: this.triggers[i],
                            width: this.collider.width, 
                            height: this.collider.height});
                        if(this.properties.isAlive && this.isAttacking && !this.isTakingDamage) {
                            this.isPreAttacking = false;
                            this.sprite.animation.setAnimation('melee', i);
                            
                            let hitInterval = setInterval(() => {
                                if(this.sprite.animation.frameNumber >= 1) {
                                    if(collisionDetection(player.collider, {
                                        position: this.triggers[i],
                                        width: this.collider.width, 
                                        height: this.collider.height
                                    })) {
                                        if(!this.isTakingDamage && this.properties.isAlive) {
                                            player.applyDamage(this);
                                        }
                                        
                                    }
                                    clearInterval(hitInterval);
                                }
                            }, 100);


                            setTimeout(() => {
                                this.isAttacking = false;
                            }, 500);
                        } else {
                            this.isPreAttacking = false;
                            this.isAttacking = false;
                            return;
                        }
                    } 
                    else {
                        clearInterval(meleeInterval);
                        return;
                    }
                }, timeToAtack);

            }
        }
    }
    
    changeDirection () {
        if(!this.properties.isAlive) 
            return;
        
        let randomInterval = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
        let executionCount = 0; 
        const maxExecutionsBeforeChange = 5; 
        this.intervalId = setInterval(() => {
            // if(!this.properties.isAlive) {
            //     clearInterval(this.intervalId);
            //     return;
            // }
            if(!this.isAttacking) {    
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
            }
        
        }, randomInterval);

    }

    setMovementAnimation () {
        if(!this.properties.isAlive) 
            return;
        if(this.targetDir === 0)
            this.sprite.animation.setAnimation('idle', this.direction);
        else {
            this.direction = this.targetDir - 1;
            this.sprite.animation.setAnimation('walk', this.direction);
        }
    }

    pushEnemy(pushDirection, pushForce, pushStep) {
        if(!this.properties.isAlive) 
            return;
        let distanceMoved = 0;
        this.properties.hp--;
        const maxDistance = pushForce; 

        
        
        
        if(!this.isTakingDamage) {
            this.sprite.filter = "saturate(1.2) hue-rotate(-30deg)";
            window.dispatchEvent(new CustomEvent('hit', {
                detail: {
                    enemy: this
                }
            }));
            this.isTakingDamage = true;
            
            const pushInterval = setInterval(() => {
                const newPosition = {
                    x: pushDirection.x * pushStep,
                    y: pushDirection.y * pushStep
                };
                if (!this.willCollide(
                        {
                            x: this.collider.position.x + newPosition.x,
                            y: this.collider.position.y + newPosition.y
                        }
                    )) {
                    this.sprite.position.x += newPosition.x;
                    this.sprite.position.y += newPosition.y;
                    distanceMoved += pushStep;
        
                    if (distanceMoved >= maxDistance) {
                        clearInterval(pushInterval); 
                    }
                } else {
                    this.isTakingDamage = false;
                    clearInterval(pushInterval); 
                }
                setTimeout(() => {
                    this.sprite.filter = "none";
                    if(this.properties.isAlive && this.properties.hp <= 0) {
                        window.dispatchEvent(new CustomEvent('final-hit', {
                            detail: {
                                enemy: this
                            }
                        }));
                    }
                    setTimeout(() => this.isTakingDamage = false, 600);
                }, 10 * maxDistance);
                
            }, 16); 
        }
        
        
    }

    removeEnemy() {
        if(this.properties.isAlive) {
            this.properties.isAlive = false;
            let opacity = 100;
            
            let interval = setInterval(() => {
                opacity -= 30;
                if(opacity <= 0) {
                    this.sprite.opacity = 0; 
                    clearInterval(interval);
                } else {
                    this.sprite.opacity = opacity/100;
                }
            }, 16);
        }
    }

    willCollide(position) {
        for (let i = 0; i < this.boundaries.length; i++) {
            const boundary = this.boundaries[i];
    
            if (collisionDetection(
                {
                    position: position,
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
                return true; 
            }
    
        }
        return false;
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