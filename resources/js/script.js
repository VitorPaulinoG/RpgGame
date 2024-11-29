import { Sprite } from './view/Sprite.js';
import { Animation } from './view/Animation.js';

import { Boundary } from './data/Boundary.js'
import { CharacterProperty } from './view/CharacterProperty.js';
import { Enemy } from './view/Enemy.js';

const canvas = document.querySelector('canvas');
canvas.width = 1024;
canvas.height = 576;
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false; // Não embaça/borra os pixels 


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


// //Add batalha com inimigo aqui
// audio.Map.stop();
// audio.InitBattle.play();
// battle.initiated = true
// //Add configuração de gameOver
// audio.GameOver.play();


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

const possibleMoves = [
    {x: 0, y: 0}, 
    {x: 0, y: 1 },
    {x: -1, y: 0 },
    {x: 0, y: -1 },
    {x: 1, y: 0 }
];
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
const player = new Sprite({
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
        frameRate: 5
    }),
    position: {
        x: canvas.width/2 - playerImage.width/2, 
        y: canvas.height/2 - playerImage.height/2
    },
    opacity: 1,
    ctx: ctx
});
const playerProperties = new CharacterProperty({
    hp: 3, 
    damage: 1, 
    velocity: 3
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
        x: player.position.x - 20,
        y: player.position.y + 35
    }
    
});


const fox01Image = new Image();
fox01Image.src = './resources/assets/enemies/fox/idle/down.png';
const fox01 = new Sprite ({
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
            atack: {
                paths: {
                    0: './resources/assets/enemies/fox/atack/down.png',
                    1: './resources/assets/enemies/fox/atack/left.png',
                    2: './resources/assets/enemies/fox/atack/up.png',
                    3: './resources/assets/enemies/fox/atack/right.png',
                },
                frameCount: 4
            }
        }, 
        frameRate: 10,
        image: fox01Image,
        isPlaying: true
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
const fox01Enemy = new Enemy({
    sprite: fox01,
    properties: fox01Properties,
    boundaries: boundaries,
    possibleMoves: possibleMoves
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
    }
}



const movables = [background, ...boundaries, foreground, ancient, fox01, master, farmer];


let playerDirection = 0;

let enemies = [fox01Enemy.sprite];


function toOrderCharacters () {
    let characters = [...enemies, 
        {
            position: {
                x: ancient.position.x,
                y: ancient.position.y + 15
            },
            draw () {
                ancient.draw();
            }
        }
    ];
    let wasPlayerDrawn = false;

    for (let character of characters) {
        if(!wasPlayerDrawn && player.position.y - 10 < character.position.y){

            if(playerDirection === 2) {
                atackEffect.draw();
                player.draw();
            } else {
                player.draw();
                atackEffect.draw();
            }
            wasPlayerDrawn = true;
        }
        character.draw();
    }
    if(!wasPlayerDrawn) {
        if(playerDirection === 2) {
            atackEffect.draw();
            player.draw();
        } else {
            player.draw();
            atackEffect.draw();
        }
    }
        
}
function animate () {
    window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    background.draw();


    boundaries.forEach(boundary => {
        boundary.draw();
    });
    

    master.draw();
    farmer.draw();
    
    toOrderCharacters();
    foreground.draw();
    

    
    let moving = true;
    if(!player.animation.isPlaying) {
        player.animation.setAnimation('idle', playerDirection);
    }

    if (keys.space.pressed && !player.animation.isPlaying) {
        player.animation.isPlaying = true;
        player.animation.setAnimation('melee', playerDirection);
        
        atackEffect.animation.setAnimation('idle', playerDirection);
        atackEffect.opacity = 1;

        switch(playerDirection) {
            case 0:
                atackEffect.position = {
                    x: player.position.x - 18,
                    y: player.position.y + 35
                };
            break;
            case 1: 
                atackEffect.position = {
                    x: player.position.x - 57,
                    y: player.position.y - 11
                };
            break;
            case 2: 
                atackEffect.position = {
                    x: player.position.x ,
                    y: player.position.y - 40
                };
            break;
            case 3: 
                atackEffect.position = {
                    x: player.position.x + 37,
                    y: player.position.y - 11
                };
            break;
        }

        setTimeout(() => {
            player.animation.isPlaying = false;
            player.animation.setAnimation('idle', playerDirection);
            atackEffect.opacity = 0;
        }, player.animation.frameRate * player.animation.currentSource.frameCount * 16.67);
        
        moving = false;
    }
    
    if (player.animation.currentSource !== player.animation.sources.melee) {
     
        if (keys.w.pressed && lastkey === 'w') {
            player.animation.isPlaying = true;
            player.animation.setAnimation('walk', 2);
            playerDirection = 2;
            
            player.position = {
                x: canvas.width/2 - (playerImage.width/10)/2,
                y: canvas.height/2 - playerImage.height/2
            }
            
            
            moving = canMove({ x: 0, y: playerProperties.velocity}); 

            if(moving)
                movables.forEach(movable => {
                    movable.position.y = movable.position.y + playerProperties.velocity;
                });    
        }
        if (keys.s.pressed && lastkey === 's') {
            player.animation.isPlaying = true;
            player.animation.setAnimation('walk', 0);
            playerDirection = 0;

            player.position = {
                x: canvas.width/2 - (playerImage.width/10)/2,
                y: canvas.height/2 - playerImage.height/2
            }
        
            
            moving = canMove({ x: 0, y: - playerProperties.velocity});

            if(moving)
                movables.forEach(movable => {
                    movable.position.y = movable.position.y - playerProperties.velocity;
                });   
        }
        if (keys.a.pressed && lastkey === 'a') {
            player.animation.isPlaying = true;
            player.animation.setAnimation('walk', 1);
            playerDirection = 1;

            player.position = {
                x: canvas.width/2 - (playerImage.width/10)/2,
                y: canvas.height/2 - playerImage.height/2
            }


            moving = canMove({ x: playerProperties.velocity, y: 0});
            if(moving)
                movables.forEach(movable => {
                    movable.position.x = movable.position.x + playerProperties.velocity;
                });   
        }
        if (keys.d.pressed && lastkey === 'd') {
            player.animation.isPlaying = true;
            player.animation.setAnimation('walk', 3);
            playerDirection = 3;

            player.position = {
                x: canvas.width/2 - (playerImage.width/10)/2,
                y: canvas.height/2 - playerImage.height/2
            }


            moving = canMove({ x: - playerProperties.velocity, y: 0});
            if(moving)
                movables.forEach(movable => {
                    movable.position.x = movable.position.x - playerProperties.velocity;
                });   
        }
    }
    if (keys.space.pressed && player.animation.isPlaying) {
        keys.space.pressed = false; 
    }

}
animate();

function canMove (position) {
    for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i];

        if(collisionDetection(
            {
                position: {
                    x: player.position.x + 20,
                    y: player.position.y + 40
                },
                width: player.width - 40,
                height: player.height - 40
            }, {
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

    }
});
window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false;
            player.animation.isPlaying = false;
        break;
        case 's':
            keys.s.pressed = false;
            player.animation.isPlaying = false;
        break;
        case 'a':
            keys.a.pressed = false;
            player.animation.isPlaying = false;
        break;
        case 'd':
            keys.d.pressed = false;
            player.animation.isPlaying = false;
        break;
        case ' ':
            keys.space.pressed = false;
            break;
    }

});



