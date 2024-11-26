import { PlayerView } from './view/PlayerView.js';
import { Sprite } from './view/Sprite.js';


const canvas = document.querySelector('canvas');
canvas.width = 1024;
canvas.height = 576;


const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false; // Não embaça/borra os pixels 

// const playerImage = new Image();
// playerImage.src = './resources/assets/player/walk/down (3x).png';

let playerView = new PlayerView('./resources/assets/player/walk/down (3x).png', 10);

const mapImage = new Image();
mapImage.src = './resources/assets/map.png';

const background = new Sprite ({
    position: {
        x: -1270,
        y: -850
    },
    image: mapImage 
}, ctx);


function animate () {
    window.requestAnimationFrame(animate);
    background.draw();
    playerView.draw(ctx, canvas);
}
animate();





window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            console.log('pressed w key');
        break;
        case 's':
            console.log('pressed s key');
        break;
        case 'a':
            console.log('pressed a key');
        break;
        case 'd':
            console.log('pressed d key');
        break;

    }
});
