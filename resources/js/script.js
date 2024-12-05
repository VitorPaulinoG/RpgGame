

const GameState = {
    MENU: 'menu',
    GAME: 'game'
  };

let isPaused = true;
let rewardEvent = new CustomEvent('reward', {
    detail: {
        sound: () => audio.Reward.play()
    }
})

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
    const ancientDialogueBeforeReward = [
        "Jovem... Estou vendo que sua jornada é desafiadora. Enfrentar monstros terríveis não é uma tarefa fácil!",
        "Por isso, se você quiser eu posso recuperar um pouco da sua vida. O que acha?",
        { 
            condition: (playerProperties) => playerProperties.hp === 3, 
            messages: [
                "Hmm... Parece que você já está com sua vida cheia.",
                "Volte aqui quando estiver precisando de ajuda novamente."
            ]
        }
    ];
    
    const ancientDialogueAfterReward = [
        "Hmm... Você deve estar precisando de outra recuperação, certo? Contudo, tenho algo pra te dizer...",
        "Se vira, macho!!! HAHAHAHAAA...."
    ];
    
    
    const masterDialogueBeforeReward = [
        "Você quer melhorar suas habilidades, viajante?",
        "Eu posso ensinar novas técnicas se você estiver pronto."
    ];
    
    const masterDialogueAfterReward = [
        "Agora você está mais forte, continue sua jornada!",
        "Volte quando tiver mais experiência."
    ];
    
    const fmDialogue = ["Esses malditos monstros! Estão destruindo a vila!"];
    
    const ancientDialogue = new Dialogue(ancient, ancientDialogueBeforeReward);
    const masterDialogue = new Dialogue(master, masterDialogueBeforeReward);
    const farmerDialogue = new Dialogue(farmer, fmDialogue);
    
    ancientDialogue.rewardGiven = false;
    masterDialogue.rewardGiven = false;
    
    
    function gereciamentoDialogos(playerProperties, npc) {
        let currentDialogue;
    
        if (npc === ancient) {
            currentDialogue = ancientDialogue;
        } else if (npc === master) {
            currentDialogue = masterDialogue;
        } else if (npc === farmer) {
            currentDialogue = farmerDialogue;
        }
    
        if (currentDialogue) {
            if (!isDialogDisplaying) {
                // Inicia o diálogo
                isDialogDisplaying = true;
                isPaused = true;
                currentDialogue.currentTextIndex = 0;
    
                // Verifica condições no diálogo
                
            } else {
                const nextText = currentDialogue.texts[currentDialogue.currentTextIndex + 1];
    
                if (typeof nextText === 'object' && nextText.condition) {
                    if (nextText.condition(player.properties)) {   
                        currentDialogue.nextText();
                    } else {
                        currentDialogue.currentTextIndex = -1;
                    }
                
                } else {
                    currentDialogue.nextText();
                }
    
                
                if (currentDialogue.currentTextIndex === -1) {
                    isDialogDisplaying = false;
                    isPaused = false;
    
                    // Oferece recompensas
                    if (npc === ancient && !ancientDialogue.rewardGiven) {
                        if (player.properties.hp < 3) {
                            player.properties.hp += 1;
                            window.dispatchEvent(rewardEvent);
                            hud.animation.setAnimation('idle', player.properties.hp); // Ganha 1 de vida
                            ancientDialogue.rewardGiven = true;
                            ancientDialogue.texts = ancientDialogueAfterReward;
                        }
                    } else if (npc === master && !masterDialogue.rewardGiven) {
                        window.dispatchEvent(rewardEvent);
                        player.properties.damage += 1;
                        masterDialogue.rewardGiven = true;
                        masterDialogue.texts = masterDialogueAfterReward;
                    }
                }
            }
        }
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
        },

        r:{
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
    

    let minY = 90;
    let countY = 300;
    let step = 3;
    let pressStartFontSize = 40;
    let sizeVariant = 1;
    let targetSize = 50;

    function animate () {
        
        if(running) {
            animationFrameId = window.requestAnimationFrame(animate);
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        switch (currentState) {
            case GameState.GAME: 
                game();
            break;
            case GameState.MENU:
                menu();
            break;
        }

        
    }
    
    animate();

    function game () {
        background.draw();
        
        for(let enemy of enemies ) {
            if(enemy.properties.isAlive) {
                enemy.detectPlayer(player);
            }
            enemy.collider.updateCollider()
            
        }
    
        
        toOrderCharacters();
    
        
        let currentDialogue = null;

        if (ancientDialogue.verificarProximidadePlayer(player.sprite)) {
            currentDialogue = ancientDialogue;
        } else if (masterDialogue.verificarProximidadePlayer(player.sprite)) {
            currentDialogue = masterDialogue;
        } else if (farmerDialogue.verificarProximidadePlayer(player.sprite)) {
            currentDialogue = farmerDialogue;
        }

        // Desenhar diálogo se ele já estiver sendo exibido
        if (isDialogDisplaying && currentDialogue) {
            currentDialogue.drawDialogue(ctx, canvas);
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
                            enemy.pushEnemy(player.properties.damage, enemy.possibleMoves[direction + 1], 100, 3);
                        
            
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

            ctx.font = '40px zelda-font';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
        
            ctx.fillStyle= 'black';
            ctx.fillRect(0,0, canvas.width, canvas.height);
            ctx.fillStyle = 'red';
            ctx.fillText(message, centerX, centerY - 10); 
            ctx.font = '20px zelda-font';
            ctx.fillStyle= 'gray';
            ctx.fillText('Try again press "r"', centerX, centerY + 50);
        }
    }


    function menu () {

        const centerX = canvas.width / 2;  
        const centerY = canvas.height / 2;
        let firstLineY = countY + 140;
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        ctx.font = '50px zelda-font';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
    
        ctx.fillStyle= 'black';
        ctx.fillText('The Legend Of', centerX, firstLineY); 
        ctx.font = '150px zelda-font';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText('Zezo', centerX, centerY + countY);
        
        if(countY > minY) {
            countY -= step;
        } else {
            ctx.font = `${pressStartFontSize}px zelda-font`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillText('Press Start', centerX, centerY + countY + 50); 

            if(pressStartFontSize < targetSize) {
                pressStartFontSize+=sizeVariant/4;
            } else if (pressStartFontSize === targetSize) {
                sizeVariant = -sizeVariant;
                targetSize = pressStartFontSize + (sizeVariant*10);
            } else {
                pressStartFontSize+=sizeVariant/4;
            }
        }
    }

    canvas.addEventListener('click', (event) => {
        if(currentState === GameState.MENU) {
            const rect = canvas.getBoundingClientRect(); // Obtém as coordenadas do canvas
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            let button = {
                text: 'Start', 
                x: canvas.width / 2 - 150, 
                y: canvas.height / 2 + minY, 
                width: 300, 
                height: 50, 
                }
            if (
                mouseX >= button.x &&
                mouseX <= button.x + button.width &&
                mouseY >= button.y &&
                mouseY <= button.y + button.height
              ) {
                console.log("Clicou");
                isPaused = false;
                currentState = GameState.GAME;
                // button.action(); // Executa a ação associada ao botão
              }
        }

    });
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
               
                if(!keys.s.pressed && !isPaused) {
                    keys.w.pressed = true;
                    lastkey = 'w';
                }
            
            break;
            case 's':
                if(!keys.w.pressed && !isPaused) {
                    keys.s.pressed = true;
                    lastkey = 's';
                }
            break;
            case 'a':
                if(!keys.d.pressed && !isPaused) {
                    keys.a.pressed = true;
                    lastkey = 'a';
                }
            break;
            case 'd':
                if(!keys.a.pressed && !isPaused) {
                    keys.d.pressed = true;
                    lastkey = 'd';
                }
            break;
            case ' ':
                keys.space.pressed = true;
                break;
            case 'q':
                keys.q.pressed = true;
                if (ancientDialogue.verificarProximidadePlayer(player.sprite)) {
                    gereciamentoDialogos(player, ancient);
                } else if (masterDialogue.verificarProximidadePlayer(player.sprite)) {
                    gereciamentoDialogos(player, master);
                } else if (farmerDialogue.verificarProximidadePlayer(player.sprite)) {
                    gereciamentoDialogos(player, farmer);
                }
                break;
    
            case 'r':
                keys.r.pressed = true;
                if(isGameOVer){
                    location.reload(); 
                }
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
        audio.LinkDamage.play();
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
        audio.EnemyKill.play();
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
    window.addEventListener('reward', (event) => {
        event.detail.sound();
            
    });
    
});





