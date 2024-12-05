import { Sprite } from './view/Sprite.js';
import { Animation } from './view/Animation.js';
import { Dialogue } from './view/Dialogue.js';

import { Boundary } from './data/Boundary.js'
import { Enemy, Player, CharacterProperty } from './view/characters.js';
import { BoxCollider } from './data/BoxCollider.js';

const canvas = document.querySelector('canvas');
canvas.width = 1024;
canvas.height = 576;
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false; // Não embaça/borra os pixels 
let running = true;
let animationFrameId;



// Audios
let audioInitialized = false;
window.addEventListener('load', () => {
    if(!audioInitialized){
        if(Howler.ctx.state === 'suspended'){
            Howler.ctx.resume().then(() => {
                console.log("AudioContext resumed");
            });
        }
        audioInitialized = true;
   }

if(!audio.Map.playing()){
    audio.Map.loop(true)
    audio.Map.play();
}else{
    console.log("Audio already playing");
}
});


const collisionsMap = [];
for (let i = 0; i < collisions.length; i+=70) {
    collisionsMap.push(collisions.slice(i, 70 + i));
}

const offset = {
    x: -1270,
    y: -850
}

let boundaries = [];
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            boundaries.push(new Boundary({
                position: {
                    x: j-35.2,
                    y: i-23.8
                }
            }, 
            ctx))
        }
    });
});



const enemyPossibleMoves = [
    {x: 0, y: 0}, 
    {x: 0, y: 1 },
    {x: -1, y: 0 },
    {x: 0, y: -1 },
    {x: 1, y: 0 }
];


// -------   Game Objects    -----

const backgroundImage = new Image();
backgroundImage.src = './resources/assets/map.png';
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

const foregroundImage = new Image();
foregroundImage.src = './resources/assets/map-foreground.png';
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

const playerImage = new Image();
playerImage.src = './resources/assets/player/idle/down (3x).png';
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



const hudImage = new Image();
hudImage.src = './resources/assets/hud/hp 00.png';
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
    width: hudImage.width,
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


const atackEffectImage = new Image();
atackEffectImage.src = './resources/assets/player/atack-effect/down.png';
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



const fox01Image = new Image();
fox01Image.src = './resources/assets/enemies/fox/idle/down.png';
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

const ancientImage = new Image();
ancientImage.src = './resources/assets/npc/ancient/ancient.png';
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


const masterImage = new Image();
masterImage.src = './resources/assets/npc/master/master.png';
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


const farmerImage = new Image();
farmerImage.src = './resources/assets/npc/farmer/farmer.png';
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

                // Oferece recompensas
                if (npc === ancient && !ancientDialogue.rewardGiven) {
                    if (player.properties.hp < 3) {
                        player.properties.hp += 1;
                        hud.animation.setAnimation('idle', player.properties.hp); // Ganha 1 de vida
                        ancientDialogue.rewardGiven = true;
                        ancientDialogue.texts = ancientDialogueAfterReward;
                    }
                } else if (npc === master && !masterDialogue.rewardGiven) {
                    playerProperties.damage += 1;
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
    }   
}

const movables = [background, ...boundaries, foreground, ancient, fox01Sprite, master, farmer];



let playerDirection = 0;

function drawGzimos () {
    
    boundaries.forEach(boundary => {
        boundary.draw();
    });

    if(fox01.properties.hp > 0) {
        // Fox Collision
        ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
        ctx.fillRect(
            fox01.collider.position.x, 
            fox01.collider.position.y, 
            fox01.collider.width, 
            fox01.collider.height);
        // Fox Pivot 
        ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
        ctx.fillRect(
            fox01.sprite.position.x, 
            fox01.sprite.position.y,
            10,
            10);
    
        // Fox Triggers
        for(let trigger of fox01.triggers) {
            ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
            ctx.fillRect(
                trigger.x, 
                trigger.y,
                fox01.collider.width,
                fox01.collider.height);
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
        {
            position: {
                x: fox01.sprite.position.x,
                y: fox01.sprite.position.y + 15
            },
            width: fox01.sprite.width,
            height: fox01.sprite.height,
            draw: () => {
                fox01.sprite.draw();
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
                x: master.position.x,
                y: master.position.y
            },
            width: master.width,
            height: master.height,
            draw: () => {
                master.draw();
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

    ];
    
    let wasPlayerDrawn = false;
    
    // if(fox01.properties.hp <= 0) {
    //     characters.splice(0, 1);
    // }

    for (let character of characters) {
        if(!wasPlayerDrawn && collisionDetection(playerSprite, character) && player.sprite.position.y - 10 < character.position.y){

            if(playerDirection === 2) {
                atackEffect.draw();
                player.sprite.draw();
            } else {
                player.sprite.draw();
                atackEffect.draw();
            }
            wasPlayerDrawn = true;
        }
        character.draw();
    }
    if(!wasPlayerDrawn) {
        if(playerDirection === 2) {
            atackEffect.draw();
            player.sprite.draw();
        } else {
            player.sprite.draw();
            atackEffect.draw();
        }
    }
        
}

function animate () {
    if(running) {
        animationFrameId = window.requestAnimationFrame(animate);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    background.draw();
    
    if(fox01.properties.hp > 0) {
        fox01.detectPlayer(player);
    }
    fox01.collider.updateCollider()

    
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
    
            if(collisionDetection(atackTrigger, fox01.collider)) {
                let direction = playerDirection;
                fox01.pushEnemy(fox01.possibleMoves[direction + 1], 100, 3);
                
    
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

}
animate();

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pausa a animação quando a aba não está visível
        running = false;
        cancelAnimationFrame(animationFrameId);
        console.log('Canvas pausado.');
    } else {
        // Retoma a animação quando a aba volta a ser visível
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
            if (ancientDialogue.verificarProximidadePlayer(player.sprite)) {
                gereciamentoDialogos(player, ancient);
            } else if (masterDialogue.verificarProximidadePlayer(player.sprite)) {
                gereciamentoDialogos(player, master);
            } else if (farmerDialogue.verificarProximidadePlayer(player.sprite)) {
                gereciamentoDialogos(player, farmer);
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




