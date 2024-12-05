class Boundary {
    static width = 36;
    static height = 36;
    constructor ({position}, ctx ) {
        this.position = {
            x: position.x * Boundary.width,
            y: position.y * Boundary.height
        },
        this.width = Boundary.width;
        this.height = Boundary.height;
        this.ctx = ctx;
    }

    draw () {
        this.ctx.fillStyle = 'rgba(100, 0, 255, 0.25)';
        this.ctx.fillRect(this.position.x, this.position.y, Boundary.width, Boundary.height);
    }
}