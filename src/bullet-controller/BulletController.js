import { Bullet } from "../bullet/Bullet.js";
var BulletController = /** @class */ (function () {
    function BulletController(canvas, maxBulletsAtTime, bulletColor, soundEnabled) {
        this.bullets = [];
        this.timeTillNextBulletAllowed = 0;
        this.canvas = canvas;
        this.maxBulletsAtTime = maxBulletsAtTime;
        this.bulletColor = bulletColor;
        this.soundEnabled = soundEnabled;
        this.shootSound = new Audio("/src/assets/sounds/shoot.wav");
        this.shootSound.volume = 0.5;
    }
    BulletController.prototype.draw = function (ctx) {
        var _this = this;
        this.bullets = this.bullets.filter(function (bullet) { return bullet.y + bullet.width > 0 && bullet.y <= _this.canvas.height; });
        this.bullets.forEach(function (bullet) { return bullet.draw(ctx); });
        if (this.timeTillNextBulletAllowed > 0) {
            this.timeTillNextBulletAllowed--;
        }
    };
    BulletController.prototype.collideWith = function (sprite) {
        var bulletThatHitSpriteIndex = this.bullets.findIndex(function (bullet) { return bullet.collideWith(sprite); });
        if (bulletThatHitSpriteIndex >= 0) {
            this.bullets.splice(bulletThatHitSpriteIndex, 1);
            return true;
        }
        return false;
    };
    BulletController.prototype.shoot = function (x, y, velocity, timeTillNextBulletAllowed) {
        if (timeTillNextBulletAllowed === void 0) { timeTillNextBulletAllowed = 0; }
        if (this.timeTillNextBulletAllowed <= 0 &&
            this.bullets.length < this.maxBulletsAtTime) {
            var bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor);
            this.bullets.push(bullet);
            if (this.soundEnabled) {
                this.shootSound.currentTime = 0;
                this.shootSound.play();
            }
            this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
        }
    };
    return BulletController;
}());
export { BulletController };
