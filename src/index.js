import { EnemyController } from "./enemy-controller/EnemyController.js";
import { Player } from "./player/Player.js";
import { BulletController } from "./bullet-controller/BulletController.js";
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;
var background = new Image(canvas.width, canvas.height);
background.src = "/src/assets/images/space.png";
var playerBulletController = new BulletController(canvas, 10, "red", true);
var enemyBulletController = new BulletController(canvas, 4, 'white', false);
var enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController);
var player = new Player(canvas, 3, playerBulletController);
var isGameOver;
function game() {
    checkGameOver();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    if (!isGameOver) {
        enemyController.draw(ctx);
        player.draw(ctx);
        playerBulletController.draw(ctx);
        enemyBulletController.draw(ctx);
    }
}
function checkGameOver() {
    if (isGameOver) {
        return;
    }
    if (enemyBulletController.collideWith(player)) {
        isGameOver = true;
    }
}
setInterval(game, 1000 / 60);
