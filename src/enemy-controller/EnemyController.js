import { Enemy } from "../enemy/enemy.js";
import MovingDirection from "../moving-direction/MovingDirection.js";
var EnemyController = /** @class */ (function () {
    function EnemyController(canvas) {
        this.enemyMap = [
            [0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
            [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        ];
        this.enemyRows = [];
        this.currentDirection = MovingDirection.right;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.defaultXVelocity = 1;
        this.defaultYVelocity = 1;
        this.moveDownTimerDefault = 30;
        this.moveDownTimer = this.moveDownTimerDefault;
        this.canvas = canvas;
        this.createEnemies();
    }
    EnemyController.prototype.draw = function (ctx) {
        this.decrementMoveDownTimer();
        this.updateVelocityAndDirection();
        this.drawEnemies(ctx);
        this.resetMoveDownTimer();
    };
    EnemyController.prototype.resetMoveDownTimer = function () {
        if (this.moveDownTimer <= 0) {
            this.moveDownTimer = this.moveDownTimerDefault;
        }
    };
    EnemyController.prototype.decrementMoveDownTimer = function () {
        if (this.currentDirection === MovingDirection.downLeft ||
            this.currentDirection === MovingDirection.downRight) {
            this.moveDownTimer--;
        }
    };
    EnemyController.prototype.updateVelocityAndDirection = function () {
        for (var _i = 0, _a = this.enemyRows; _i < _a.length; _i++) {
            var enemyRow = _a[_i];
            if (this.currentDirection === MovingDirection.right) {
                this.xVelocity = this.defaultXVelocity;
                this.yVelocity = 0;
                var rightMostEnemy = enemyRow[enemyRow.length - 1];
                if (rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width) {
                    this.currentDirection = MovingDirection.downLeft;
                    break;
                }
            }
            else if (this.currentDirection === MovingDirection.downLeft) {
                if (this.moveDown(MovingDirection.left)) {
                    break;
                }
            }
            else if (this.currentDirection === MovingDirection.left) {
                this.xVelocity = -this.defaultXVelocity;
                this.yVelocity = 0;
                var leftMostEnemy = enemyRow[0];
                if (leftMostEnemy.x <= 0) {
                    this.currentDirection = MovingDirection.downRight;
                    break;
                }
            }
            else if (this.currentDirection === MovingDirection.downRight) {
                if (this.moveDown(MovingDirection.right)) {
                    break;
                }
            }
        }
    };
    EnemyController.prototype.moveDown = function (newDirection) {
        this.xVelocity = 0;
        this.yVelocity = this.defaultYVelocity;
        if (this.moveDownTimer <= 0) {
            this.currentDirection = newDirection;
            return true;
        }
        return false;
    };
    EnemyController.prototype.drawEnemies = function (ctx) {
        var _this = this;
        this.enemyRows.flat().forEach(function (enemy) {
            enemy.move(_this.xVelocity, _this.yVelocity);
            enemy.draw(ctx);
        });
    };
    EnemyController.prototype.createEnemies = function () {
        var _this = this;
        this.enemyMap.forEach(function (row, rowIndex) {
            _this.enemyRows[rowIndex] = [];
            row.forEach(function (enemyNumber, enemyIndex) {
                if (enemyNumber > 0) {
                    _this.enemyRows[rowIndex].push(new Enemy(enemyIndex * 50, rowIndex * 35, enemyNumber));
                }
            });
        });
    };
    return EnemyController;
}());
export { EnemyController };
