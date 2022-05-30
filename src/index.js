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
var enemyController = new EnemyController(canvas, enemyBulletController);
var player = new Player(canvas, 3, playerBulletController);
function game() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);
}
setInterval(game, 1000 / 60);
