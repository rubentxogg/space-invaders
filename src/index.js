import { EnemyController } from "./enemy-controller/EnemyController.js";
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;
var background = new Image(canvas.width, canvas.height);
background.src = "/src/assets/images/space.png";
var enemyController = new EnemyController(canvas);
function game() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    enemyController.draw(ctx);
}
setInterval(game, 1000 / 60);
