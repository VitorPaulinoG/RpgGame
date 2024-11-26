import { PlayerView } from './view/PlayerView.js';
import { Sprite } from './view/Sprite.js';


const canvas = document.querySelector('canvas');
canvas.width = 1024;
canvas.height = 576;
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false; // Não embaça/borra os pixels 


const collisionsMap = [];
for (let i = 0; i < collisions.length; i+=70) {
    collisionsMap.push(collisions.slice(i, 70 + i));
}

class Boundary {
    static width = 36;
    static height = 36;
    constructor ({position} ) {
        this.position = {
            x: position.x * Boundary.width,
            y: position.y * Boundary.height
        },
        this.width = Boundary.width;
        this.height = Boundary.height;
    }

    draw () {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.fillRect(this.position.x, this.position.y, Boundary.width, Boundary.height);
    }
}

let boundaries = [];
const offset = {
    x: -1270,
    y: -850
}
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
            }))
        }
    });
});

let playerView = new PlayerView('./resources/assets/player/walk/down (3x).png', 10, 3, ctx, canvas);

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
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y)
}

function animate () {
    window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw();
    boundaries.forEach(boundary => {
        boundary.draw();
    });
    
    playerView.draw();

    let moving = true;

    if (keys.w.pressed && lastkey === 'w') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if(collision(playerView, {
                ...boundary, position: {
                    x: boundary.position.x,
                    y: boundary.position.y + playerView.velocity
                } 
            })) {
                moving = false;
                break;
            }

        }

        if(moving)
            movables.forEach(movable => {
                movable.position.y = movable.position.y + playerView.velocity;
            });    
    }
    if (keys.s.pressed && lastkey === 's') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if(collision(playerView, {
                ...boundary, position: {
                    x: boundary.position.x,
                    y: boundary.position.y - playerView.velocity
                } 
            })) {
                moving = false;
                break;
            }

        }
        if(moving)
            movables.forEach(movable => {
                movable.position.y = movable.position.y - playerView.velocity;
            });   
    }
    if (keys.a.pressed && lastkey === 'a') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if(collision(playerView, {
                ...boundary, position: {
                    x: boundary.position.x + playerView.velocity,
                    y: boundary.position.y 
                } 
            })) {
                moving = false;
                break;
            }

        }
        if(moving)
            movables.forEach(movable => {
                movable.position.x = movable.position.x + playerView.velocity;
            });   
    }
    if (keys.d.pressed && lastkey === 'd') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if(collision(playerView, {
                ...boundary, position: {
                    x: boundary.position.x - playerView.velocity,
                    y: boundary.position.y 
                } 
            })) {
                moving = false;
                break;
            }

        }
        if(moving)
            movables.forEach(movable => {
                movable.position.x = movable.position.x - playerView.velocity;
            });   
    }

}
animate();






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