class Food {
    color = "blue";
    canvasContext;
    currentPositionX;
    currentPositionY;
    foodWidth;
    foodHeight;
    food;
    randomX;
    randomY;

    constructor(x, y, w, h, ctx) {
        this.currentPositionX = x;
        this.currentPositionY = y;
        this.foodWidth = w;
        this.foodHeight = h;
        this.canvasContext = ctx;
        this.food = new FoodCell(this.currentPositionX, this.currentPositionY, this.foodWidth, this.foodHeight, ctx);
        this.food.color = this.color;
    }

    draw = () => {
        this.food.draw();
    };

    update = () => {
        this.food.update();
    };

    constructFood = () => {
        this.food.color = this.color;
        this.food.drawingContext.fillStyle = "white";
        this.food.drawingContext.fillRect(this.food.position.x, this.food.position.y, this.food.dimension.width, this.food.dimension.height);
    };

    removeFood = () => {
        this.food.color = "white";
        this.food.drawingContext.fillStyle = "white";
        this.food.drawingContext.fillRect(this.food.position.x, this.food.position.y, this.food.dimension.width, this.food.dimension.height);
    };
}