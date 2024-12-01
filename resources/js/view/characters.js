export class CharacterProperty {
    constructor({hp, damage, velocity}) {
        this.hp = hp;
        this.damage = damage;
        this.velocity = velocity;
        this.isAlive = true;
    }
}
export class Player {
    constructor ({sprite, properties, collider, boundaries}) {
        this.sprite = sprite;
        this.properties = properties;
        this.collider = collider;
        this.boundaries = boundaries;
        this.isAttacking = false;
        this.canAttack = true; // Para atacar, é preciso soltar e pressionar o espaço de novo
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
        if(!this.properties.isAlive) 
            return
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
        if(!this.properties.isAlive) 
            return
        setInterval(() => {
            this.forbiddenDir = this.canMove();
            if(!this.isPreAttacking && !this.isAttacking && this.targetDir !== this.forbiddenDir) {
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
                (!this.isAttacking && !this.isDetectingPlayer && collisionDetection(player.collider, 
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

            }
        }
    }
    
    changeDirection () {
        if(!this.properties.isAlive) 
            return
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
        if(!this.properties.isAlive) 
            return
        if(this.targetDir === 0)
            this.sprite.animation.setAnimation('idle', this.direction);
        else {
            this.direction = this.targetDir - 1;
            this.sprite.animation.setAnimation('walk', this.direction);
        }
    }

    pushEnemy(pushDirection, pushForce, pushStep) {
        if(!this.properties.isAlive) 
            return
        let distanceMoved = 0;
        this.properties.hp--;
        const maxDistance = pushForce; // Máxima distância que o inimigo deve ser empurrado
        
    
        // Intervalo para deslocar o inimigo gradualmente
        this.sprite.filter = "saturate(1.2) hue-rotate(-30deg)";
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
                // this.collider.position.x = newPosition.x;
                // this.collider.position.y = newPosition.y;
                distanceMoved += pushStep;
    
                if (distanceMoved >= maxDistance) {
                    clearInterval(pushInterval); // Parar o empurrão após atingir a distância máxima
                }
            } else {
                clearInterval(pushInterval); // Parar o empurrão ao encontrar uma colisão
            }
            
        }, 16); 
        setTimeout(() => {
            this.sprite.filter = "none";
            if(this.properties.hp <= 0) {
                console.log('O inimigo morreu');
                this.removeEnemy();
            }
        }, 10 * maxDistance);
        
    }

    removeEnemy() {
        // Remove o inimigo visualmente
        this.isAlive = false;
        let opacity = 100;
        
        let interval = setInterval(() => {
            opacity -= 20;
            this.sprite.filter = `opacity(${opacity/100})`; // Exemplo para esconder o sprite
            if(opacity <= 0) {
                clearInterval(interval);
                this.sprite.position = {
                    x: 20000, y: 20000.
                }
            }
        }, 16);
        // this.collider = null;

        // clearInterval(this.intervalId); 
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