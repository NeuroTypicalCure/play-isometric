export default class Grid{
    constructor(cellWidth,cellHeight,rows,columns){
        this.cellWidth = cellWidth;
        this.cellHeight = 0.5*cellHeight;
        this.rows = rows;
        this.cols = columns;
    }
}