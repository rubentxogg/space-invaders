"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EnemyController = /** @class */ (function () {
    function EnemyController(canvas) {
        this.canvas = canvas;
    }
    EnemyController.prototype.draw = function (ctx) {
        console.log("Enemy Controller class");
    };
    return EnemyController;
}());
exports.default = EnemyController;
