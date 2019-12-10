export default class Map {
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.data = [];
    }

    setData(arr){
        this.data = arr;
    }
}