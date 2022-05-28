import { Enemy } from "../enemy/enemy.js";
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
        this.canvas = canvas;
        this.createEnemies();
    }
    EnemyController.prototype.draw = function (ctx) {
        this.drawEnemies(ctx);
    };
    EnemyController.prototype.drawEnemies = function (ctx) {
        this.enemyRows.flat().forEach(function (enemy) {
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
