let c = document.getElementById('c');
let ctx = c.getContext('2d');

c.width = 800;
c.height = 600;

const tileW = 32;
const tileH = 32;
const rotationX = 0.8;

ctx.translate(c.width/2, 100)

function drawTiles(mapX,mapY,rows,cols){
    for(let j=0;j<rows;j++){
        for(let i=0;i<cols;i++){
            let z = Math.floor(Math.random()*5);
            drawBlock(mapX+i,mapY+j,z,tileW,rotationX*tileH);
        }
    }
}

function drawBlock(x,y,z,w,h){
    let top = "red";
    let right = "green";
    let left = "blue";

    ctx.save();
    ctx.translate((x - y) * w / 2, (x + y) * h / 2);

    // top
    ctx.beginPath();
    ctx.moveTo(0, -z * h);
    ctx.lineTo(w / 2, h / 2 - z * h);
    ctx.lineTo(0, h - z * h);
    ctx.lineTo(-w / 2, h / 2 - z * h);
    ctx.closePath();
    ctx.fillStyle = top;
    ctx.fill();

    // left
    ctx.beginPath();
    ctx.moveTo(-w / 2, h / 2 - z * h);
    ctx.lineTo(0, h - z * h);
    ctx.lineTo(0, h);
    ctx.lineTo(-w / 2, h / 2);
    ctx.closePath();
    ctx.fillStyle = left;
    ctx.fill();

    // right
    ctx.beginPath();
    ctx.moveTo(w / 2, h / 2 - z * h);
    ctx.lineTo(0, h - z * h);
    ctx.lineTo(0, h);
    ctx.lineTo(w / 2, h / 2);
    ctx.closePath();
    ctx.fillStyle = right;
    ctx.fill();

    ctx.restore();		
}

drawTiles(0,0,16,16);