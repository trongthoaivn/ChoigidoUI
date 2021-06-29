class pieces{
    constructor(name,color,image,move){
        this.name = name;
        this.color = color;
        this.image = image;
        this. move = move;
    }
}
class Position{
    constructor(pieces,x,y){
        this.pieces = pieces;
        this.x = x;
        this.y = y;
    }
}