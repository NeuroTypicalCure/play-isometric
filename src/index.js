import Map from './classes/Map'

let c = document.getElementById('c');
let ctx = c.getContext('2d');

c.width = 800;
c.height = 600;

const tileW = 32;
const tileH = 32;
const rotationX = 0.8;

// camera
ctx.translate(c.width/2, 100)

let map = new Map();
map.genRandBlocks();
map.draw(ctx,100,100);