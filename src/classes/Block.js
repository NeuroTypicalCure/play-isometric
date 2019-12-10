export default class Block{
    constructor(x,y,h,color){
        this.x = x||0;
        this.y = y||0;
        this.h = h||1;
        this.color = color||"rgb(100,100,100)";
    }
}