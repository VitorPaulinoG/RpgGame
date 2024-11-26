import { PlayerView } from './view/PlayerView.js';


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



mapImage.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(mapImage, -1270, -850);
    
    playerView.draw(ctx, canvas);

};




// const keys= {
//     w: {
//         pressed: false
//     },
//     a: {
//         pressed: false
//     },
//     s: {
//         pressed: false
//     },
//     d: {
//         pressed: false
//     },
    
// }
// //if()
// window.addEventListener('keydown', (e) =>{
//     console.log(e.key)
//     switch(e.key){
//         case 'w':
//             keys.w.pressed = true
//         break;
//         case 'a':
//             keys.a.pressed = true
//         break;
//         case 's':
//             keys.s.pressed = true
//         break;
//         case 'd':
//             keys.d.pressed = true
//         break;
//     }
//     console.log(keys)
// });