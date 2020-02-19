class Cell {
    position = Position.zeroPosition;
    dimension = Dimensions.zeroDimension;
    drawingContext;
    isFilled = false;
    color = "white";
    pixelX = 0;
    pixelY = 0;

    constructor(x, y, w, h, ctx) {
        this.position.x = x;
        this.position.y = y;
        this.dimension.width = w;
        this.dimension.height = h;
        this.drawingContext = ctx;
    }

    draw = () => {
        this.drawingContext.lineWidth = 1;
        this.drawingContext.strokeStyle = this.color;
        this.drawingContext.strokeRect(
            this.pixelX,
            this.pixelY,
            this.dimension.width,
            this.dimension.height);

        if (this.isFilled == true) {
            this.drawingContext.fillStyle = this.color;
            this.drawingContext.fillRect(
                this.pixelX,
                this.pixelY,
                this.dimension.width,
                this.dimension.height);
        }
    };

    update = () => {
        this.pixelX = this.position.x * this.dimension.width;
        this.pixelY = this.position.y * this.dimension.height;
    };
}