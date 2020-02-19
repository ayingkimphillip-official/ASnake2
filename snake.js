class Snake {
    color = "red";
    body = [];
    canvasContext;
    direction = [
        0, //Up
        1, //Down
        2, //Right
        3  //Left
    ];
    snakeHead;
    snakeBody;
    isDirectionY = false;
    isDirectionX = false;
    snakeCurrentDirection;

    constructor(x, y, cellWidth, cellHeight, ctx) {
        this.canvasContext = ctx;
        let snake = new SnakeCell(x, y, cellWidth, cellHeight, ctx);
        snake.color = this.color;
        this.body.push(snake);

        this.snakeHead = this.body[0];
        this.snakeBody = this.body[this.body.length - 1];
    }

    draw = () => {
        for (let x = 0; x < this.body.length; x++) {
            this.body[x].draw();
        }
    };

    update = () => {
        this.updateSnakePosition();
        for (let x = 0; x < this.body.length; x++) {
            this.body[x].update();
        }
    };

    changeSnakeDirection = (d) => {
        if (d == this.direction[0] && this.isDirectionY == false) {
            // this.snakeHead.position.y--;
            this.isDirectionY = true;
            this.isDirectionX = false;
            this.snakeCurrentDirection = d;
        }
        if (d == this.direction[1] && this.isDirectionY == false) {
            // this.snakeHead.position.y++;
            this.isDirectionY = true;
            this.isDirectionX = false;
            this.snakeCurrentDirection = d;
        }
        if (d == this.direction[3] && this.isDirectionX == false) {
            // this.snakeHead.position.x--;
            this.isDirectionX = true;
            this.isDirectionY = false;
            this.snakeCurrentDirection = d;
        }
        if (d == this.direction[2] && this.isDirectionX == false) {
            // this.snakeHead.position.x++;
            this.isDirectionX = true;
            this.isDirectionY = false;
            this.snakeCurrentDirection = d;
        }
    };

    updateSnakePosition = () => {
        let lastHeadPositionX = this.snakeHead.position.x;
        let lastHeadPositionY = this.snakeHead.position.y;

        switch (this.snakeCurrentDirection) {
            case 0:
                this.snakeHead.position.y--;
                break;
            case 1:
                this.snakeHead.position.y++;
                break;
            case 2:
                this.snakeHead.position.x++;
                break;
            case 3:
                this.snakeHead.position.x--;
                break;
        }

        for (let i = 1; i < this.body.length; i++) {
            let temporaryPositionX = this.body[i].position.x;
            let temporaryPositionY = this.body[i].position.y;
            this.body[i].position.x = lastHeadPositionX;
            this.body[i].position.y = lastHeadPositionY;
            lastHeadPositionX = temporaryPositionX;
            lastHeadPositionY = temporaryPositionY;
        }
    };

    addSnakeBody = () => {
        let snakeBodyX = this.snakeBody.position.x;
        let snakeBodyY = this.snakeBody.position.y;

        switch (this.snakeCurrentDirection) {
            case 0:
                snakeBodyY--;
                break;
            case 1:
                snakeBodyY++;
                break;
            case 2:
                snakeBodyX++;
                break;
            case 3:
                snakeBodyX--;
                break;
        }

        let snakeNewBody = new SnakeCell(snakeBodyX, snakeBodyY, this.snakeBody.dimension.width, this.snakeBody.dimension.height, this.canvasContext);
        snakeNewBody.color = "red";
        this.body.push(snakeNewBody);
    };
}