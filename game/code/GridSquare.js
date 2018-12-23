export default class GridSquare {
    constructor(x, y, image) {
        this.x = x;
        this.y = y;
        this.id = `${x}-${y}`,
        this.image = image 
    }
}