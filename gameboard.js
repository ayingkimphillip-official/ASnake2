class Gameboard {
    backgroundColor = "white";
    width = 600;
    height = 600;
    size = 20;
    canvasElement;
    canvasContext;
    gameObjects = []; //Cells, Snake, and Food
    cells = [];
    snake;
    food;
    intervalDraw;
    intervalUpdate;
    cellWidth;
    cellHeight;

    constructor() {
        this.canvasElement = document.querySelector("canvas");
        this.canvasElement.width = this.width;
        this.canvasElement.height = this.height;
        this.canvasContext = this.canvasElement.getContext("2d");
        this.cellWidth = this.width / this.size;
        this.cellHeight = this.height / this.size;


        this.generateCells();
        this.generateSnake();
        this.generateFood();
        this.intervalDraw = setInterval(this.draw, 1000 / 30);
        this.intervalUpdate = setInterval(this.update, 100);

        // // this.draw();
        // this.update();

        document.addEventListener("keydown", this.onArrowKeyPressed);
    }

    clearCanvas = () => {
        this.canvasContext.fillStyle = this.backgroundColor;
        this.canvasContext.fillRect(0, 0, this.width, this.height);
    };

    draw = () => {
        this.clearCanvas();
        for (let x = 0; x < this.gameObjects.length; x++) {
            this.gameObjects[x].draw();
        }
    };

    update = () => {
        this.checkForBoundaries();
        this.checkCollisionOfSnakeAndFood();
        this.checkCollisionOfHeadAndBody();
        for (let x = 0; x < this.gameObjects.length; x++) {
            this.gameObjects[x].update();
        }
    };

    generateCells = () => {
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                let w = this.cellWidth;
                let h = this.cellHeight;
                let newCell = new Cell(x, y, w, h, this.canvasContext);

                if (this.cells[x] == null) {
                    this.cells[x] = []
                }
                this.cells[x][y] = newCell;
                this.gameObjects.push(newCell);
            }
        }
    };

    generateSnake = () => {
        this.snake = new Snake(0, 0, this.cellWidth, this.cellHeight, this.canvasContext);
        this.gameObjects.push(this.snake);
    };

    generateFood = () => {
        let randomX = this.generateRandomNumber(0, this.size - 1);
        let randomY = this.generateRandomNumber(0, this.size - 1);

        this.food = new Food(randomX, randomY, this.cellWidth, this.cellHeight, this.canvasContext);
        this.gameObjects.push(this.food);
    };

    onArrowKeyPressed = (e) => {
        switch (e.keyCode) {
            case 38: //Up
                this.snake.changeSnakeDirection(0);
                break;
            case 40: //Down
                this.snake.changeSnakeDirection(1);
                break;
            case 39: //Right
                this.snake.changeSnakeDirection(2);
                break;
            case 37: //Left
                this.snake.changeSnakeDirection(3);
                break;
        }
    };

    checkForBoundaries = () => {
        if (this.snake.snakeHead.position.x < 0 || this.snake.snakeHead.position.x >= this.size) {
            alert("Game Over!");
            clearInterval(this.intervalDraw);
            clearInterval(this.intervalUpdate);
        }
        if (this.snake.snakeHead.position.y < 0 || this.snake.snakeHead.position.y >= this.size) {
            alert("Game Over!");
            clearInterval(this.intervalDraw);
            clearInterval(this.intervalUpdate);
        }
    };

    checkCollisionOfHeadAndBody = () => {
        for (let i = 1; i < this.snake.body.length; i++) {
            if (this.snake.snakeHead.position.x == this.snake.body[i].position.x &&
                this.snake.snakeHead.position.y == this.snake.body[i].position.y) {
                alert("Game Over!");
                clearInterval(this.intervalDraw);
                clearInterval(this.intervalUpdate);
            }
        }
    };

    generateRandomNumber = (min, max) => {
        return Math.floor(Math.random() * max) + min;
    };

    checkCollisionOfSnakeAndFood = () => {
        let randomX = this.generateRandomNumber(0, (this.size - 1));
        let randomY = this.generateRandomNumber(0, (this.size - 1));

        if (this.snake.snakeHead.position.x == this.food.food.position.x &&
            this.snake.snakeHead.position.y == this.food.food.position.y) {
            this.food.removeFood();
            this.snake.addSnakeBody();

            for (let i = 0; i < this.snake.body.length; i++) {
                if (this.snake.body[i].position.x != randomX &&
                    this.snake.body[i].position.y != randomY) {
                        this.food.food.position.x = randomX;
                        this.food.food.position.y = randomY;
                        this.food.constructFood();
                }
                if (this.snake.body[i].position.x == randomX &&
                    this.snake.body[i].position.y == randomY) {
                        console.log("HERE!");
                        this.food.food.position.x = this.generateRandomNumber(0, (this.size - 1));
                        this.food.food.position.y = this.generateRandomNumber(0, (this.size - 1));
                        this.food.constructFood();
                }
            }
        }





        // if (this.snake.snakeHead.position.x == this.food.food.position.x &&
        //     this.snake.snakeHead.position.y == this.food.food.position.y) {

        //     if (this.snake.snakeHead.position.x != randomX &&
        //         this.snake.snakeHead.position.y != randomY) {
        //         this.food.removeFood();
        //         this.snake.addSnakeBody();
        //         console.log("SnakeBody X", this.snake.snakeBody.position.x);
        //         console.log("SnakeBody Y", this.snake.snakeBody.position.y);
        //         console.log("Random X", randomX);
        //         console.log("Random Y", randomY);

        //         if (this.snake.snakeBody.position.x != randomX &&
        //             this.snake.snakeBody.position.y != randomY) {

        //             console.log(this.snake.body);
        //             for (let i = 0; i < this.snake.body.length; i++) {
        //                 console.log("HERE!");
        //                 console.log(this.snake.body[i].position.x);
        //                 console.log(this.snake.body[i].position.y);
        //                 if (this.snake.body[i].position.x != randomX && this.snake.body[i].position.y != randomY) {
        //                     this.food.food.position.x = randomX;
        //                     this.food.food.position.y = randomY;
        //                     this.food.constructFood();
        //                 }
        //             }

        //             // this.food.food.position.x = randomX;
        //             // this.food.food.position.y = randomY;
        //             // this.food.constructFood();
        //         }

        //         // if (this.snake.snakeBody.position.x != randomX &&
        //         //     this.snake.snakeBody.position.y != randomY) {
        //         //     this.food.food.position.x = randomX;
        //         //     this.food.food.position.y = randomY;
        //         //     this.food.constructFood();
        //         //     this.snake.addSnakeBody();
        //         // }
        //     }
        // }
    };
}