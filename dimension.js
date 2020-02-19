class Dimensions {
    width;
    height;
    static get zeroDimension() {
        let dimension = new Dimensions();
        dimension.width = 0;
        dimension.height = 0;
        return dimension;
    }
}