import { Sprite } from './view/Sprite.js';
import { Animation } from './view/Animation.js';

import { Boundary } from './data/Boundary.js'

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
                console.log("AudoContext resumed");
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
                    // x: j + offset.x,
                    // y: i + offset.y
                    x: j-35.2,
                    y: i-23.8
                }
            }, 
            ctx))
        }
    });
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
    velocity: 3,
    opacity: 1,
    ctx: ctx
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
    q: {
        pressed: false
    }
}



const movables = [background, ...boundaries, foreground, ancient, master, farmer];

function collision (rectangle1, rectangle2) {
    return (rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y);
}
let currentAnimationNumber = 0;




function animate () {
    window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    background.draw();


    boundaries.forEach(boundary => {
        boundary.draw();
    });

    ancient.draw(); 
    master.draw();
    farmer.draw();
    
    if(currentAnimationNumber === 2) {
        atackEffect.draw();
        player.draw();
    } else {
        player.draw();
        atackEffect.draw();
    }
    foreground.draw();
/// REmover
    // ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    // ctx.fillRect(player.position.x + 20, player.position.y + 40, player.width-40, player.height - 40)


    let moving = true;
    if(!player.animation.isPlaying) {
        player.animation.setAnimation('idle', currentAnimationNumber);
    }

    if (keys.q.pressed && !player.animation.isPlaying) {
        player.animation.isPlaying = true;
        player.animation.setAnimation('melee', currentAnimationNumber);
        
        atackEffect.animation.setAnimation('idle', currentAnimationNumber);
        atackEffect.opacity = 1;

        switch(currentAnimationNumber) {
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
            player.animation.setAnimation('idle', currentAnimationNumber);
            atackEffect.opacity = 0;
        }, player.animation.frameRate * player.animation.currentSource.frameCount * 16.67);
        
        moving = false;
    }
    
    if (player.animation.currentSource !== player.animation.sources.melee) {
     
        if (keys.w.pressed && lastkey === 'w') {
            player.animation.isPlaying = true;
            player.animation.setAnimation('walk', 2);
            currentAnimationNumber = 2;
            
            player.position = {
                x: canvas.width/2 - (playerImage.width/10)/2,
                y: canvas.height/2 - playerImage.height/2
            }
            
            
            moving = canMove({ x: 0, y: player.velocity});

            if(moving)
                movables.forEach(movable => {
                    movable.position.y = movable.position.y + player.velocity;
                });    
        }
        if (keys.s.pressed && lastkey === 's') {
            player.animation.isPlaying = true;
            player.animation.setAnimation('walk', 0);
            currentAnimationNumber = 0;

            player.position = {
                x: canvas.width/2 - (playerImage.width/10)/2,
                y: canvas.height/2 - playerImage.height/2
            }
        
            
            moving = canMove({ x: 0, y: - player.velocity});

            if(moving)
                movables.forEach(movable => {
                    movable.position.y = movable.position.y - player.velocity;
                });   
        }
        if (keys.a.pressed && lastkey === 'a') {
            player.animation.isPlaying = true;
            player.animation.setAnimation('walk', 1);
            currentAnimationNumber = 1;

            player.position = {
                x: canvas.width/2 - (playerImage.width/10)/2,
                y: canvas.height/2 - playerImage.height/2
            }


            moving = canMove({ x: player.velocity, y: 0});
            if(moving)
                movables.forEach(movable => {
                    movable.position.x = movable.position.x + player.velocity;
                });   
        }
        if (keys.d.pressed && lastkey === 'd') {
            player.animation.isPlaying = true;
            player.animation.setAnimation('walk', 3);
            currentAnimationNumber = 3;

            player.position = {
                x: canvas.width/2 - (playerImage.width/10)/2,
                y: canvas.height/2 - playerImage.height/2
            }


            moving = canMove({ x: - player.velocity, y: 0});
            if(moving)
                movables.forEach(movable => {
                    movable.position.x = movable.position.x - player.velocity;
                });   
        }
    }
    if (keys.q.pressed && player.animation.isPlaying) {
        keys.q.pressed = false; 
    }

}

animate();

function canMove (position) {
    for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i];

        if(collision(
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
        case 'q':
            keys.q.pressed = true;
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
        case 'q':
            keys.q.pressed = false;
            break;
    }

});



