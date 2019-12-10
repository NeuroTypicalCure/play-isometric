import pSBC from '../services/color-service'
import Grid from './Grid'
import Block from './Block'

export default class Map extends Grid{
    constructor(){
        super(32,32,16,16);
    }

    genRandBlocks(){
        let result = [];
        for(let j=0;j<this.rows;j++){
            result[j] = [];
            for(let i=0;i<this.cols;i++){
                let color = {};
                color.r = Math.floor(Math.random()*255);
                color.g = Math.floor(Math.random()*255);
                color.b = Math.floor(Math.random()*255);
                result[j][i] = new Block(i,j,Math.floor(Math.random()*5),`rgb(${color.r},${color.g},${color.b})`);
            }
        }
        return this.data = result;
    }

    drawBlock(ctx,block){

        ctx.save();
        ctx.translate((block.x - block.y) * this.cellWidth / 2, (block.x + block.y) * this.cellHeight / 2);
    
        drawTop(block.h,this.cellWidth,this.cellHeight,block.color);
        drawLeft(block.h,this.cellWidth,this.cellHeight,pSBC(0.2,block.color,false,true));
        drawRight(block.h,this.cellWidth,this.cellHeight,pSBC(-0.2,block.color,false,true));
    
        ctx.restore();
        
        function drawTop(z,w,h,color){
            ctx.beginPath();
            ctx.moveTo(0, -z * h);
            ctx.lineTo(w / 2, h / 2 - z * h);
            ctx.lineTo(0, h - z * h);
            ctx.lineTo(-w / 2, h / 2 - z * h);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
        }
        
        function drawLeft(z,w,h,color){
            ctx.beginPath();
            ctx.moveTo(-w / 2, h / 2 - z * h);
            ctx.lineTo(0, h - z * h);
            ctx.lineTo(0, h);
            ctx.lineTo(-w / 2, h / 2);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
        }
    
        function drawRight(z,w,h,color){
            ctx.beginPath();
            ctx.moveTo(w / 2, h / 2 - z * h);
            ctx.lineTo(0, h - z * h);
            ctx.lineTo(0, h);
            ctx.lineTo(w / 2, h / 2);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
        }

    }

    draw(ctx,mapX,mapY){
        this.x = mapX;
        this.y = mapY;

        for(let j=0;j<this.rows;j++){
            for(let i=0;i<this.cols;i++){
                this.drawBlock(ctx,this.data[j][i]);
            }
        }
    }
}