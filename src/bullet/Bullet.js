var Bullet = /** @class */ (function () {
    function Bullet(canvas, x, y, velocity, bulletColor) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.bulletColor = bulletColor;
        this.width = 5;
        this.height = 20;
    }
    Bullet.prototype.draw = function (ctx) {
        this.y -= this.velocity;
        ctx.fillStyle = this.bulletColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    return Bullet;
}());
export { Bullet };
