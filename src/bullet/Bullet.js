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
    Bullet.prototype.collideWith = function (sprite) {
        if (this.x + this.width > sprite.x &&
            this.x < sprite.x + sprite.width &&
            this.y + this.height > sprite.y &&
            this.y < sprite.y + sprite.height) {
            return true;
        }
        else {
            return false;
        }
    };
    return Bullet;
}());
export { Bullet };
