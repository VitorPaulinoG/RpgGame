

const GameState = {
    MENU: 'menu',
    GAME: 'game'
  };
window.addEventListener('preloaded', (e) => {
    let currentState = GameState.MENU;


    const background = new Sprite({
        animation: new Animation ({
            hasAnimations: false,
            sources: {
                idle: {
                    paths: {
                        0: './resources/assets/map.png'
                    },
                    currentPath: 0,
                    frameCount: 1
                },
            },
            image: backgroundImage,
            isPlaying: false
        }),
        position: {
            x: offset.x,
            y: offset.y
        },
        ctx: ctx,
        opacity: 1
    });
    
    const foreground = new Sprite({
        animation: new Animation ({
            hasAnimations: false,
            sources: {
                idle: {
                    paths: {
                        0: './resources/assets/map-foreground.png'
                    },
                    currentPath: 0,
                    frameCount: 1
                },
            },
            image: foregroundImage,
            isPlaying: false
        }),
        position: {
            x: offset.x,
            y: offset.y
        },
        ctx: ctx,
        opacity: 1
    });
     
    const playerSprite = new Sprite({
        animation: new Animation ({
            hasAnimations: true,
            sources: {
                idle: {
                    paths: {
                        0: './resources/assets/player/idle/down (3x).png',
                        1: './resources/assets/player/idle/left (3x).png',
                        2: './resources/assets/player/idle/up (3x).png',
                        3: './resources/assets/player/idle/right (3x).png',
                    },
                    currentPath: 0,
                    frameCount: 1
                },
                walk: {
                    paths: {
                        0: './resources/assets/player/walk/down (3x).png',
                        1: './resources/assets/player/walk/left (3x).png',
                        2: './resources/assets/player/walk/up (3x).png',
                        3: './resources/assets/player/walk/right (3x).png',
                    },
                    frameCount: 10
                },
                melee: {
                    paths: {
                        0: './resources/assets/player/melee/down (3x).png',
                        1: './resources/assets/player/melee/left (3x).png',
                        2: './resources/assets/player/melee/up (3x).png',
                        3: './resources/assets/player/melee/right (3x).png',
                    },
                    frameCount: 4
                }
            },
            image: playerImage,
            isPlaying: false,
            frameRate: 5,
            aditionalConditions: (animation) => {
                
                // if(animation.currentSource === animation.sources['melee'])
                //     animation.isPlaying = false;
                // else 
                    animation.frameNumber = 0;
    
            }
        }),
        position: {
            x: canvas.width/2 - playerImage.width/2, 
            y: canvas.height/2 - playerImage.height/2
        },
        opacity: 1,
        ctx: ctx
    }); 
    
    const hud = new Sprite({
        animation: new Animation({
            hasAnimations: false,
            sources: {
                idle: {
                    paths: {
                        0: './resources/assets/hud/hp 03.png',
                        1: './resources/assets/hud/hp 02.png',
                        2: './resources/assets/hud/hp 01.png',
                        3: './resources/assets/hud/hp 00.png',
                    },
                    frameCount: 1
                 },
            },  
            frameRate: 5,
            image: hudImage,
            isPlaying: false
        }), 
        position: {
            x: 0,
            y: 0
        },
        ctx: ctx,
        opacity: 1  
    });
    
    hud.animation.setAnimation('idle', 3);
    
    const playerProperties = new CharacterProperty({
        hp: 3, 
        damage: 1, 
        velocity: 3
    });
    const player = new Player({
        sprite: playerSprite,
        properties: playerProperties,
        hud: hud,
        collider: new BoxCollider({
            offset: {
                x: 25,
                y: 0
            },
            sprite: playerSprite
        }),
        boundaries: boundaries
    });
    
    const atackEffect = new Sprite({
        animation: new Animation({
            hasAnimations: true,
            sources: {
                idle: {
                    paths: {
                        0: './resources/assets/player/atack-effect/down.png',
                        1: './resources/assets/player/atack-effect/left.png',
                        2: './resources/assets/player/atack-effect/up.png',
                        3: './resources/assets/player/atack-effect/right.png',
                    },
                    currentPath: 0,
                    frameCount: 1
                },
            },
            isPlaying: true,
            image: atackEffectImage,
            frameRate: 5,
            
        }),
        ctx: ctx,
        opacity: 0,
        position: {
            x: player.sprite.position.x - 20,
            y: player.sprite.position.y + 35
        }
        
    });
    
    const fox01Sprite = new Sprite ({
        animation: new Animation({
            hasAnimations: true,
            sources: {
                idle: {
                    paths: {
                        0: './resources/assets/enemies/fox/idle/down.png',
                        1: './resources/assets/enemies/fox/idle/left.png',
                        2: './resources/assets/enemies/fox/idle/up.png',
                        3: './resources/assets/enemies/fox/idle/right.png',
                    },
                    frameCount: 1
                },
                walk: {
                    paths: {
                        0: './resources/assets/enemies/fox/movement/down.png',
                        1: './resources/assets/enemies/fox/movement/left.png',
                        2: './resources/assets/enemies/fox/movement/up.png',
                        3: './resources/assets/enemies/fox/movement/right.png',
                    },
                    frameCount: 4
                },
                melee: {
                    paths: {
                        0: './resources/assets/enemies/fox/melee/down.png',
                        1: './resources/assets/enemies/fox/melee/left.png',
                        2: './resources/assets/enemies/fox/melee/up.png',
                        3: './resources/assets/enemies/fox/melee/right.png',
                    },
                    frameCount: 4
                }
            }, 
            frameRate: 10,
            image: fox01Image,
            isPlaying: true,
            aditionalConditions: (animation) => {
                if(!(animation.currentSource === animation.sources['melee'] && 
                    animation.frameNumber === animation.sources['melee'].frameCount - 1)) {
                    animation.frameNumber = 0;
                } 
            }
        }),
        position: {
            x: 760, 
            y: 50
        }, 
        width: fox01Image.width,
        opacity: 1,
        ctx: ctx
    });
    const fox01Properties = new CharacterProperty({
        hp: 3, 
        damage: 1, 
        velocity: 3
    });
    const fox01 = new Enemy({
        sprite: fox01Sprite,
        properties: fox01Properties,
        boundaries: boundaries,
        possibleMoves: enemyPossibleMoves,
        triggersOffset: {
            x: 20,
            y: 40
        },
        collider: new BoxCollider({
            offset: {
                x: 25,
                y: 25
            },
            sprite: fox01Sprite
        }),
        intervalToChangeDirection: {
            max: 5000,
            min: 2000
        }
    });

    const fox02Sprite = new Sprite ({
        animation: new Animation({
            hasAnimations: true,
            sources: {
                idle: {
                    paths: {
                        0: './resources/assets/enemies/fox/idle/down.png',
                        1: './resources/assets/enemies/fox/idle/left.png',
                        2: './resources/assets/enemies/fox/idle/up.png',
                        3: './resources/assets/enemies/fox/idle/right.png',
                    },
                    frameCount: 1
                },
                walk: {
                    paths: {
                        0: './resources/assets/enemies/fox/movement/down.png',
                        1: './resources/assets/enemies/fox/movement/left.png',
                        2: './resources/assets/enemies/fox/movement/up.png',
                        3: './resources/assets/enemies/fox/movement/right.png',
                    },
                    frameCount: 4
                },
                melee: {
                    paths: {
                        0: './resources/assets/enemies/fox/melee/down.png',
                        1: './resources/assets/enemies/fox/melee/left.png',
                        2: './resources/assets/enemies/fox/melee/up.png',
                        3: './resources/assets/enemies/fox/melee/right.png',
                    },
                    frameCount: 4
                }
            }, 
            frameRate: 10,
            image: fox02Image,
            isPlaying: true,
            aditionalConditions: (animation) => {
                if(!(animation.currentSource === animation.sources['melee'] && 
                    animation.frameNumber === animation.sources['melee'].frameCount - 1)) {
                    animation.frameNumber = 0;
                } 
            }
        }),
        position: {
            x: -500, 
            y: -250
        }, 
        width: fox02Image.width,
        opacity: 1,
        ctx: ctx
    });
    const fox02Properties = new CharacterProperty({
        hp: 3, 
        damage: 1, 
        velocity: 3
    });
    const fox02 = new Enemy({
        sprite: fox02Sprite,
        properties: fox02Properties,
        boundaries: boundaries,
        possibleMoves: enemyPossibleMoves,
        triggersOffset: {
            x: 20,
            y: 40
        },
        collider: new BoxCollider({
            offset: {
                x: 25,
                y: 25
            },
            sprite: fox02Sprite
        }),
        intervalToChangeDirection: {
            max: 5000,
            min: 2000
        }
    });

    const fox03Sprite = new Sprite ({
        animation: new Animation({
            hasAnimations: true,
            sources: {
                idle: {
                    paths: {
                        0: './resources/assets/enemies/fox/idle/down.png',
                        1: './resources/assets/enemies/fox/idle/left.png',
                        2: './resources/assets/enemies/fox/idle/up.png',
                        3: './resources/assets/enemies/fox/idle/right.png',
                    },
                    frameCount: 1
                },
                walk: {
                    paths: {
                        0: './resources/assets/enemies/fox/movement/down.png',
                        1: './resources/assets/enemies/fox/movement/left.png',
                        2: './resources/assets/enemies/fox/movement/up.png',
                        3: './resources/assets/enemies/fox/movement/right.png',
                    },
                    frameCount: 4
                },
                melee: {
                    paths: {
                        0: './resources/assets/enemies/fox/melee/down.png',
                        1: './resources/assets/enemies/fox/melee/left.png',
                        2: './resources/assets/enemies/fox/melee/up.png',
                        3: './resources/assets/enemies/fox/melee/right.png',
                    },
                    frameCount: 4
                }
            }, 
            frameRate: 10,
            image: fox03Image,
            isPlaying: true,
            aditionalConditions: (animation) => {
                if(!(animation.currentSource === animation.sources['melee'] && 
                    animation.frameNumber === animation.sources['melee'].frameCount - 1)) {
                    animation.frameNumber = 0;
                } 
            }
        }),
        position: {
            x: -650, 
            y: 30
        }, 
        width: fox03Image.width,
        opacity: 1,
        ctx: ctx
    });
    const fox03Properties = new CharacterProperty({
        hp: 3, 
        damage: 1, 
        velocity: 3
    });
    const fox03 = new Enemy({
        sprite: fox03Sprite,
        properties: fox03Properties,
        boundaries: boundaries,
        possibleMoves: enemyPossibleMoves,
        triggersOffset: {
            x: 20,
            y: 40
        },
        collider: new BoxCollider({
            offset: {
                x: 25,
                y: 25
            },
            sprite: fox03Sprite
        }),
        intervalToChangeDirection: {
            max: 5000,
            min: 2000
        }
    });

    const ancient = new Sprite({
        animation: new Animation ({
            hasAnimations: true,
            sources: {
                idle: {
                    paths: {
                        0: './resources/assets/npc/ancient/ancient.png'
                    },
                    frameCount: 1
                }
            },
            image: ancientImage,
            isPlaying: false,
            frameRate: 5
        }),
        position: {
            x: 1000, 
            y: 50
        },
        opacity: 1,
        ctx: ctx
    });
    
    
    
    const master = new Sprite({
        animation: new Animation ({
            hasAnimations: true,
            sources: {
                idle: {
                    paths: {
                        0: './resources/assets/npc/master/master.png'
                    },
                    frameCount: 1
                }
            },
            image: masterImage,
            isPlaying: false,
            frameRate: 5
        }),
        position: {
            x: 250, 
            y: -400
        },
        opacity: 1,
        ctx: ctx
    });
    
    const farmer = new Sprite({
        animation: new Animation ({
            hasAnimations: true,
            sources: {
                idle: {
                    paths: {
                        0: './resources/assets/npc/farmer/farmer.png'
                    },
                    frameCount: 1
                }
            },
            image: farmerImage,
            isPlaying: false,
            frameRate: 5
        }),
        position: {
            x: -1000, 
            y: -300
        },
        opacity: 1,
        ctx: ctx
    });
    
    
    
    const dialogues = [
        new Dialogue(ancient, "Olá, viajante! Você quer mais vidas?"),
        new Dialogue(master, "Você quer melhorar suas habilidades, viajante?"),
        new Dialogue(farmer, "Esses malditos monstros! Estão destruindo a vila!")
    ];
    
    let isDialogDisplaying = false;
    function getCurrentDialogue(player) {
        for (const dialogue of dialogues) {
            if (dialogue.verificarProximidadePlayer(player)) {
                return dialogue.text;
            }
        }
        return ""; // Se não houver diálogo, retorna vazio
    }
    
    const keys = {
        w: {
            pressed: false
        },
        a: {
            pressed: false
        },
        s: {
            pressed: false
        },
        d: {
            pressed: false
        },
        space: {
            pressed: false
        },
        q: {
            pressed: false
        }   
    }
    
    let enemies = [fox01, fox02, fox03];
    const movables = [background, ...boundaries, foreground, ancient, ...enemies.map(x => x.sprite), master, farmer];
    
    let effects = [];

    let playerDirection = 0;
    
    function drawGzimos () {
        
        boundaries.forEach(boundary => {
            boundary.draw();
        });
        for (let enemy of enemies) {
            if(enemy.properties.isAlive) {
                // Fox Collision
                ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
                ctx.fillRect(
                    enemy.collider.position.x, 
                    enemy.collider.position.y, 
                    enemy.collider.width, 
                    enemy.collider.height);
                // Fox Pivot 
                ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
                ctx.fillRect(
                    enemy.sprite.position.x, 
                    enemy.sprite.position.y,
                    10,
                    10);
            
                // Fox Triggers
                for(let trigger of enemy.triggers) {
                    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
                    ctx.fillRect(
                        trigger.x, 
                        trigger.y,
                        enemy.collider.width,
                        enemy.collider.height);
                }
        
            }
            
        }
            
    
        // Player Collision
        ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
        ctx.fillRect(
            player.collider.position.x, 
            player.collider.position.y, 
            player.collider.width, 
            player.collider.height);
        // Player Pivot
        ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
        ctx.fillRect(
            player.sprite.position.x, 
            player.sprite.position.y,
            10,
            10);
    }
    
    function toOrderCharacters () {
        let characters = [
            ...enemies.map(enemy => {
                return {
                    position: {
                        x: enemy.sprite.position.x,
                        y: enemy.sprite.position.y + 25
                    },
                    width: enemy.sprite.width,
                    height: enemy.sprite.height,
                    draw: () => {
                        enemy.sprite.draw();
                    }
                }
            }), 
            {
                position: {
                    x: player.sprite.position.x,
                    y: player.sprite.position.y
                },
                width: player.sprite.width,
                height: player.sprite.height,
                draw: () => {
                    player.sprite.draw();
                } 
            },
            {
                position: {
                    x: atackEffect.position.x,
                    y: atackEffect.position.y
                },
                width: atackEffect.width,
                height: atackEffect.height,
                draw: () => {
                    atackEffect.draw();
                } 
            },
            {
                position: {
                    x: ancient.position.x,
                    y: ancient.position.y + 15
                },
                width: ancient.width,
                height: ancient.height,
                draw: () => {
                    ancient.draw();
                }
            },
            {
                position: {
                    x: farmer.position.x,
                    y: farmer.position.y
                },
                width: farmer.width,
                height: farmer.height,
                draw: () => {
                    farmer.draw();
                }
            },
            {
                position: {
                    x: master.position.x,
                    y: master.position.y
                },
                width: master.width,
                height: master.height,
                draw: () => {
                    master.draw();
                }
            }
        ];
        characters.sort((a, b) => a.position.y - b.position.y);
        for (let character of characters) {
            character.draw();
        }  
    }
    
    function animate () {
        if (currentState !== GameState.GAME) 
            return;
        if(running) {
            animationFrameId = window.requestAnimationFrame(animate);
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    
        background.draw();
        
        for(let enemy of enemies ) {
            if(enemy.properties.isAlive) {
                enemy.detectPlayer(player);
            }
            enemy.collider.updateCollider()
            
        }
    
        
        toOrderCharacters();
    
        
        if (isDialogDisplaying) {
            const currentDialogueText = getCurrentDialogue(player.sprite); 
            if(currentDialogueText) {
                const currentDialogue = dialogues.find(d => d.text === currentDialogueText);
                if (currentDialogue) {
                    currentDialogue.drawDialogue(ctx, canvas);
                }
    
            } else {
                isDialogDisplaying = false;
            }
            
        }
    
        for(let effect of effects) {
            effect.sprite.position = {
                x: effect.enemy.sprite.position.x + effect.offset.x,
                y: effect.enemy.sprite.position.y + effect.offset.y
            }
            effect.sprite.draw(); 
        }
    
        foreground.draw();
        hud.draw();
    
        if(document.getElementById('gzimos').checked){
            drawGzimos ();
        }
        
        
        let moving = true;
        if(!player.sprite.animation.isPlaying) {
            player.sprite.animation.setAnimation('idle', playerDirection);
        }
    
        if (player.canAttack && keys.space.pressed && !player.sprite.animation.isPlaying) {
            if(!player.isAttacking && player.sprite.animation.currentSource !== player.sprite.animation.sources['melee']) {
                player.sprite.animation.isPlaying = true;
                player.sprite.animation.setAnimation('melee', playerDirection);
                player.isAttacking = true;
                audio.Attack1.play();
                audio.Attack2.play();
                player.canAttack = false; 
                
    
                atackEffect.animation.setAnimation('idle', playerDirection);
                atackEffect.opacity = 1;
                let atackTrigger = {
                    position: {
                        x: atackEffect.position.x + atackEffect.width/2,
                        y: atackEffect.position.y
                    },
                    width: atackEffect.width,
                    height: atackEffect.height
                };
                switch(playerDirection) {
                    case 0:
                        atackEffect.position = {
                            x: player.sprite.position.x - 18,
                            y: player.sprite.position.y + 35
                        };
                        atackTrigger = {
                            position: {
                                x: atackEffect.position.x + (atackEffect.width/4) + 10,
                                y: atackEffect.position.y + 20
                            },
                            width: (atackEffect.width/2) - 20,
                            height: atackEffect.height - 30
                        };
                    break;
                    case 1: 
                        atackEffect.position = {
                            x: player.sprite.position.x - 57,
                            y: player.sprite.position.y - 11
                        };
                        
                        atackTrigger = {
                            position: {
                                x: atackEffect.position.x + 10,
                                y: atackEffect.position.y + (atackEffect.height/4) + 10
                            },
                            width: atackEffect.width - 30,
                            height: (atackEffect.height/2) - 20
                        };
                    break;
                    case 2: 
                        atackEffect.position = {
                            x: player.sprite.position.x ,
                            y: player.sprite.position.y - 40
                        };
                        atackTrigger = {
                            position: {
                                x: atackEffect.position.x + (atackEffect.width/4) + 10,
                                y: atackEffect.position.y + 20
                            },
                            width: (atackEffect.width/2) - 20,
                            height: atackEffect.height - 30
                        };
                    break;
                    case 3: 
                        atackEffect.position = {
                            x: player.sprite.position.x + 37,
                            y: player.sprite.position.y - 11
                        };
                        atackTrigger = {
                            position: {
                                x: atackEffect.position.x + 10,
                                y: atackEffect.position.y + (atackEffect.height/4) + 10
                            },
                            width: atackEffect.width - 30,
                            height: (atackEffect.height/2) - 20
                        };
                    break;
                }
                
                for (let enemy of enemies) {
                    if(collisionDetection(atackTrigger, enemy.collider)) {
                        let direction = playerDirection;
                        if(!enemy.isTakingDamage)
                            enemy.pushEnemy(enemy.possibleMoves[direction + 1], 100, 3);
                        
            
                    }
                }
                setTimeout(() => {
                    player.sprite.animation.isPlaying = false;
                    player.isAttacking = false;
                    player.sprite.animation.setAnimation('idle', playerDirection);
                    atackEffect.opacity = 0;
                }, player.sprite.animation.frameRate * player.sprite.animation.currentSource.frameCount * 16.67);
                
                moving = false;
            }
            
        }
        
        if (player.sprite.animation.currentSource !== player.sprite.animation.sources.melee) {
         
            if (keys.w.pressed && lastkey === 'w') {
                player.sprite.animation.isPlaying = true;
                player.sprite.animation.setAnimation('walk', 2);
                playerDirection = 2;
                
                player.sprite.position = {
                    x: canvas.width/2 - (playerImage.width/10)/2,
                    y: canvas.height/2 - playerImage.height/2
                }
                
                
                moving = player.canMove({ x: 0, y: playerProperties.velocity}); // this.player.canMove({ x: 0, y: playerProperties.velocity});
    
                if(moving)
                    movables.forEach(movable => {
                        movable.position.y = movable.position.y + playerProperties.velocity;
                    });    
            }
            if (keys.s.pressed && lastkey === 's') {
                player.sprite.animation.isPlaying = true;
                player.sprite.animation.setAnimation('walk', 0);
                playerDirection = 0;
    
                player.sprite.position = {
                    x: canvas.width/2 - (playerImage.width/10)/2,
                    y: canvas.height/2 - playerImage.height/2
                }
            
                
                moving = player.canMove({ x: 0, y: - playerProperties.velocity});
    
                if(moving)
                    movables.forEach(movable => {
                        movable.position.y = movable.position.y - playerProperties.velocity;
                    });   
            }
            if (keys.a.pressed && lastkey === 'a') {
                player.sprite.animation.isPlaying = true;
                player.sprite.animation.setAnimation('walk', 1);
                playerDirection = 1;
    
                player.sprite.position = {
                    x: canvas.width/2 - (playerImage.width/10)/2,
                    y: canvas.height/2 - playerImage.height/2
                }
    
    
                moving = player.canMove({ x: playerProperties.velocity, y: 0});
                if(moving)
                    movables.forEach(movable => {
                        movable.position.x = movable.position.x + playerProperties.velocity;
                    });   
            }
            if (keys.d.pressed && lastkey === 'd') {
                player.sprite.animation.isPlaying = true;
                player.sprite.animation.setAnimation('walk', 3);
                playerDirection = 3;
    
                player.sprite.position = {
                    x: canvas.width/2 - (playerImage.width/10)/2,
                    y: canvas.height/2 - playerImage.height/2
                }
    
    
                moving = player.canMove({ x: - playerProperties.velocity, y: 0});
                if(moving)
                    movables.forEach(movable => {
                        movable.position.x = movable.position.x - playerProperties.velocity;
                    });   
            }
        }
        if (keys.space.pressed && player.sprite.animation.isPlaying) {
            keys.space.pressed = false; 
        }
    
        if(isGameOVer){ 
            const centerX = canvas.width / 2;  
            const centerY = canvas.height / 2;

            ctx.font = '30px Pretendo';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
        
            ctx.fillStyle= 'black';
            ctx.fillRect(centerX - canvas.width / 4, centerY - canvas.height / 4, canvas.width / 2, canvas.height / 2);
            ctx.fillStyle = 'white';
            ctx.fillText(message, centerX, centerY - 50); 
            ctx.fillText(`Score: ${score}`, centerX, centerY + 50); 
        }
    }

    function chooseScreen () {
        
        animate();

    }

    
    window.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            running = false;
            cancelAnimationFrame(animationFrameId);
            console.log('Canvas pausado.');
        } else {
            running = true;
            animate();
            console.log('Canvas retomado.');
        }
    });
    

    
    // KEYMAPPING
    let lastkey = '';
    window.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'w':
               
                if(!keys.s.pressed) {
                    keys.w.pressed = true;
                    lastkey = 'w';
                }
            
            break;
            case 's':
                if(!keys.w.pressed) {
                    keys.s.pressed = true;
                    lastkey = 's';
                }
            break;
            case 'a':
                if(!keys.d.pressed) {
                    keys.a.pressed = true;
                    lastkey = 'a';
                }
            break;
            case 'd':
                if(!keys.a.pressed) {
                    keys.d.pressed = true;
                    lastkey = 'd';
                }
            break;
            case ' ':
                keys.space.pressed = true;
                break;
            case 'q':
                keys.q.pressed = true;
                isDialogDisplaying = !isDialogDisplaying;
                break;
    
        case 'r':
            keys.r.pressed = true;
           // isrestartGame = !isrestartGame;
            break;
    }
    });
    window.addEventListener('keyup', (e) => {
        switch (e.key) {
            case 'w':
                keys.w.pressed = false;
                player.sprite.animation.isPlaying = false;
            break;
            case 's':
                keys.s.pressed = false;
                player.sprite.animation.isPlaying = false;
            break;
            case 'a':
                keys.a.pressed = false;
                player.sprite.animation.isPlaying = false;
            break;
            case 'd':
                keys.d.pressed = false;
                player.sprite.animation.isPlaying = false;
            break;
            case 'q':
                keys.q.pressed = false;
                break;
            case ' ':
                keys.space.pressed = false;
                player.canAttack = true;
                break;
        }
    
    });
    
    window.addEventListener('hit', (e) => {
        let enemy = e.detail.enemy;
        let index = effects.length;
        const effect = {
            id: index,
            sprite: new Sprite({
                animation: new Animation({
                    hasAnimations: true,
                    sources: {
                        idle: {
                            paths: {
                                0: './resources/assets/effects/hit-effect (33x33).png',
                            },
                            frameCount: 5
                        } 
                    },
                    frameRate: 10,
                    image: new Image(),
                    isPlaying: true
                }),
                ctx: ctx,
                width: 99,
                height: 99,
                opacity: 1,
                position: enemy.sprite.position 
            }),
            offset: {
                x: enemy.sprite.width/2 - (99/2),
                y: 0
            },
            enemy: enemy
        };
    
        effects.push(effect);
    
        setTimeout(() => {
            effects.splice(effects.findIndex(x => x.enemy === enemy), 1);
        }, 500);
    
    });
    window.addEventListener('final-hit', (e) => {
        let enemy = e.detail.enemy;
        const effect = {
            sprite: new Sprite({
                animation: new Animation({
                    hasAnimations: true,
                    sources: {
                        idle: {
                            paths: {
                                0: './resources/assets/effects/final-hit-effect (33x33).png',
                            },
                            frameCount: 13
                        } 
                    },
                    frameRate: 5,
                    image: new Image(),
                    isPlaying: true
                }),
                ctx: ctx,
                width: 99,
                height: 99,
                opacity: 1,
                position: enemy.sprite.position 
            }),
            offset: {
                x: enemy.sprite.width/2 - (99/2),
                y: 0
            },
            enemy: enemy
        };
    
        effects.push(effect);
        enemy.removeEnemy();
        setTimeout(() => {
            effects.splice(effects.findIndex(x => x.enemy === enemy), 1);
            window.dispatchEvent(new CustomEvent('defeated', {
                detail: {
                    enemy: enemy
                }
            }));
        }, 1100);
    });
    
    window.addEventListener('defeated', (e) => {
        let enemy = e.detail.enemy;
        const effect = {
            sprite: new Sprite({
                animation: new Animation({
                    hasAnimations: true,
                    sources: {
                        idle: {
                            paths: {
                                0: './resources/assets/effects/defeated-effect.png',
                            },
                            frameCount: 9
                        } 
                    },
                    frameRate: 5,
                    image: new Image(),
                    isPlaying: true
                }),
                ctx: ctx,
                width: 99,
                height: 99,
                opacity: 1,
                position: enemy.sprite.position 
            }),
            offset: {
                x: enemy.sprite.width/2 - (99/2),
                y: 20
            },
            enemy: enemy
        };
    
        effects.push(effect);
        setTimeout(() => {
            effects.splice(effects.findIndex(x => x.enemy === enemy), 1);
            enemy.sprite.position = {
                x: 20000,
                y: 0
            };
        }, 750);
    });
    window.addEventListener('gameOver', (event) => {
        isGameOVer= true; 
            
    });
    
});





