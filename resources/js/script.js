import { Player } from './view/Player.js';
import { Sprite } from './view/Sprite.js';
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




// Ajeitar
let player = new Player('./resources/assets/player/walk/down (3x).png', 10, 3, ctx, canvas);

const mapImage = new Image();
mapImage.src = './resources/assets/map.png';


const background = new Sprite ({
    position: {
        x: offset.x,
        y: offset.y
    },
    velocity: 3,
    image: mapImage 
}, ctx);


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



const movables = [background, ...boundaries];

function collision (rectangle1, rectangle2) {
    return (rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y);
}

function animate () {
    window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    background.draw();


    boundaries.forEach(boundary => {
        boundary.draw();
    });


    player.draw();

    let moving = true;

    if (keys.w.pressed && lastkey === 'w') {
        moving = canMove({ x: 0, y: player.velocity});

        if(moving)
            movables.forEach(movable => {
                movable.position.y = movable.position.y + player.velocity;
            });    
    }
    if (keys.s.pressed && lastkey === 's') {
        moving = canMove({ x: 0, y: - player.velocity});

        if(moving)
            movables.forEach(movable => {
                movable.position.y = movable.position.y - player.velocity;
            });   
    }
    if (keys.a.pressed && lastkey === 'a') {
        moving = canMove({ x: player.velocity, y: 0});
        if(moving)
            movables.forEach(movable => {
                movable.position.x = movable.position.x + player.velocity;
            });   
    }
    if (keys.d.pressed && lastkey === 'd') {
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
        break;
        case 's':
            keys.s.pressed = false;
        break;
        case 'a':
            keys.a.pressed = false;
        break;
        case 'd':
            keys.d.pressed = false;
        break;
    }
});