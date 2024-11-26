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



let playerView = new PlayerView('./resources/assets/player/walk/down (3x).png', 10, ctx, canvas);

const mapImage = new Image();
mapImage.src = './resources/assets/map.png';

const background = new Sprite ({
    position: {
        x: -1270,
        y: -850
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




function animate () {
    window.requestAnimationFrame(animate);
    background.draw();
    playerView.draw();

    if (keys.w.pressed && lastkey === 'w') {
        background.position.y = background.position.y + background.velocity;
    }
    if (keys.s.pressed && lastkey === 's') {
        background.position.y = background.position.y - background.velocity;
    }
    if (keys.a.pressed && lastkey === 'a') {
        background.position.x = background.position.x + background.velocity;
    }
    if (keys.d.pressed && lastkey === 'd') {
        background.position.x = background.position.x - background.velocity;
    }
}
animate();




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