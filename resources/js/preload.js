

const canvas = document.querySelector('canvas');
canvas.width = 1024;
canvas.height = 576;
const ctx = canvas.getContext('2d');

ctx.imageSmoothingEnabled = false; // Não embaça/borra os pixels 
let running = true;
let animationFrameId;
let isGameOVer = false;
let score=0;
let message= 'Game Over';
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
for (let i = 0; i < collisions.length; i+=100) {
    collisionsMap.push(collisions.slice(i, 100 + i));
}

const offset = {
    x: -1270,
    y: -850
}

let boundaries = [];
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 6840) {
            boundaries.push(new Boundary({
                position: {
                    x: j -26.5,
                    y: i -17.7
                }
            }, 
            ctx))
        } else if (symbol === 6841) {
            let boundary = new Boundary({
                position: {
                    x: j -26.5,
                    y: i -17.7 + 0.5
                }
            }, 
            ctx);
            boundary.height = Boundary.height/2;

            boundaries.push(boundary);
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
const img = new Image();
img.src ='./resources/assets/zelda (1).png';

const backgroundImage = new Image();
backgroundImage.src = './resources/assets/map/background.png';

const foregroundImage = new Image();
foregroundImage.src = './resources/assets/map/foreground.png';

const playerImage = new Image();
playerImage.src = './resources/assets/player/idle/down (3x).png';

const hudImage = new Image();
hudImage.src = './resources/assets/hud/hp 00.png';

const atackEffectImage = new Image();
atackEffectImage.src = './resources/assets/player/atack-effect/down.png';

const fox01Image = new Image();
fox01Image.src = './resources/assets/enemies/fox/idle/down.png';
const fox02Image = new Image();
fox02Image.src = './resources/assets/enemies/fox/idle/down.png';
const fox03Image = new Image();
fox03Image.src = './resources/assets/enemies/fox/idle/down.png';

const ancientImage = new Image();
ancientImage.src = './resources/assets/npc/ancient/ancient.png';

const masterImage = new Image();
masterImage.src = './resources/assets/npc/master/master.png';

const farmerImage = new Image();
farmerImage.src = './resources/assets/npc/farmer/farmer.png';


loadFonts();
async function loadFonts () {
    const font = new FontFace('zelda-font', 'url(./resources/css/fonts/zelda-font.otf)');
    await font.load();
    document.fonts.add(font);
}

const imgs = [
    img, backgroundImage, foregroundImage, playerImage, 
    fox01Image, fox02Image, fox03Image, hudImage, 
    atackEffectImage, ancientImage, masterImage, 
    farmerImage];

    
let i = 0;
for (let img of imgs) {
    img.onload = () => {
        i++;
        if(i === imgs.length){
            window.dispatchEvent(new CustomEvent('preloaded', { 
                detail: {
                    msg: "preloaded!"
                }
            }))

        }
    }
}

