


const canvas = document.querySelector('canvas');
canvas.width = 1024;
canvas.height = 576;


const ctx = canvas.getContext('2d');



const mapImage = new Image();
mapImage.src = './resources/assets/map.png';

const playerImage = new Image();
playerImage.src = './resources/assets/player/walk/down.png';

const keys= {
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
    
}
mapImage.onload = () => {
    ctx.drawImage(mapImage, -1250, -850)
    ctx.drawImage(playerImage, 0, 0, playerImage.width/5/2, playerImage.height, canvas.width/2, canvas.height/3, playerImage.width/4, playerImage.height)
   
};

//if()
window.addEventListener('keydown', (e) =>{
    console.log(e.key)
    switch(e.key){
        case 'w':
               keys.w.pressed = true
        break
        case 'a':
            keys.a.pressed = true
        break
        case 's':
            keys.s.pressed = true
        break
        case 'd':
            keys.d.pressed = true
        break
        
    }
    console.log(keys)
});