class Position {
    x;
    y;
    static get zeroPosition() {
        let position = new Position();
        position.x = 0;
        position.y = 0;
        return position;
    }
}