var Player = /** @class */ (function () {
    function Player(canvas, velocity, bulletController) {
        var _this = this;
        this.rightPressed = false;
        this.leftPressed = false;
        this.shootPressed = false;
        this.keydown = function (event) {
            if (event.code === 'ArrowRight') {
                _this.rightPressed = true;
            }
            if (event.code === 'ArrowLeft') {
                _this.leftPressed = true;
            }
            if (event.code === "Space") {
                _this.shootPressed = true;
            }
        };
        this.keyup = function (event) {
            if (event.code === 'ArrowRight') {
                _this.rightPressed = false;
            }
            if (event.code === 'ArrowLeft') {
                _this.leftPressed = false;
            }
            if (event.code === "Space") {
                _this.shootPressed = false;
            }
        };
        this.canvas = canvas;
        this.velocity = velocity;
        this.bulletController = bulletController;
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - 75;
        this.width = 50;
        this.height = 48;
        this.image = new Image();
        this.image.src = "/src/assets/images/player.png";
        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
    }
    Player.prototype.draw = function (ctx) {
        if (this.shootPressed) {
            this.bulletController.shoot(this.x + this.width / 2, this.y, 4, 20);
        }
        this.move();
        this.collideWithWalls();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    };
    Player.prototype.collideWithWalls = function () {
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x > this.canvas.width - this.width) {
            this.x = this.canvas.width - this.width;
        }
    };
    Player.prototype.move = function () {
        if (this.rightPressed) {
            this.x += this.velocity;
        }
        else if (this.leftPressed) {
            this.x += -this.velocity;
        }
    };
    return Player;
}());
export { Player };
