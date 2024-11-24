


const canvas = document.querySelector('canvas');
canvas.width = 1024;
canvas.height = 576;


const ctx = canvas.getContext('2d');



const mapImage = new Image();
mapImage.src = './resources/assets/map.png';

console.log(mapImage);
mapImage.onload = () => {
    ctx.drawImage(mapImage, -1250, -850);
};

