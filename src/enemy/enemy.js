var Enemy = /** @class */ (function () {
    function Enemy(x, y, imageNumber) {
        this.x = x;
        this.y = y;
        this.width = 44;
        this.height = 32;
        this.image = new Image();
        this.image.src = "/src/assets/images/enemy".concat(imageNumber, ".png");
    }
    Enemy.prototype.draw = function (ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    };
    Enemy.prototype.move = function (xVelocity, yVelocity) {
        this.x += xVelocity;
        this.y += yVelocity;
    };
    Enemy.prototype.collideWith = function (sprite) {
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
    return Enemy;
}());
export { Enemy };
