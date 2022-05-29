var Player = /** @class */ (function () {
    function Player(canvas, velocity) {
        this.canvas = canvas;
        this.velocity = velocity;
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - 75;
        this.width = 50;
        this.height = 48;
        this.image = new Image();
        this.image.src = "/src/assets/images/player.png";
    }
    Player.prototype.draw = function (ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    };
    return Player;
}());
export { Player };
