import { Sprite } from './view/Sprite.js';
import { Animation } from './view/Animation.js';

import { Boundary } from './data/Boundary.js'

const canvas = document.querySelector('canvas');
canvas.width = 1024;
canvas.height = 576;
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false; // Não embaça/borra os pixels 


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
playerImage.src = './resources/assets/player/walk/down (3x).png';

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
            }
        },
        image: playerImage,
        isPlaying: true,
        frameRate: 5
    }),
    position: {
        x: canvas.width/2 - playerImage.width/2, 
        y: canvas.height/2 - playerImage.height/2
    },
    velocity: 3, 
    ctx: ctx
});

// const player = new Sprite({
//     image: playerImage, 
//     position: {
//         x: canvas.width/2 - (playerImage.width/10)/2,
//         y: canvas.height/2 - playerImage.height/2
//     }, 
//     frameCount: 10, 
//     frameRate: 5,
//     velocity: 3, 
//     ctx: ctx
// });


const mapImage = new Image();
mapImage.src = './resources/assets/map.png';

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
        image: mapImage,
        isPlaying: false
    }),
    position: {
        x: offset.x,
        y: offset.y
    },
    ctx: ctx
});

// const background = new Sprite ({
//     position: {
//         x: offset.x,
//         y: offset.y
//     },
//     frameCount: 1,
//     image: mapImage,
//     ctx: ctx
// });

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
    ctx: ctx
});

// const foregroundImage = new Image();
// foregroundImage.src = './resources/assets/map-foreground.png';
// const foreground = new Sprite ({
//     position: {
//         x: offset.x,
//         y: offset.y
//     },
//     frameCount: 1,
//     image: foregroundImage,
//     ctx: ctx,
// });


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
    }
}



const movables = [background, ...boundaries, foreground];

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


    player.draw();
    foreground.draw();
    
    let moving = true;
    if(!player.animation.isPlaying) {
        player.animation.setAnimation('idle', currentAnimationNumber);
    }
    player.animation.isPlaying = false;
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
animate();

function canMove (position) {
    for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i];
        if(collision(player, {
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
    }
});