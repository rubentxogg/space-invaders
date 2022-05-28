import { EnemyController } from "./enemy-controller/EnemyController.js";

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const background = new Image(canvas.width, canvas.height);
background.src = "/src/assets/images/space.png";

const enemyController = new EnemyController(canvas);

function game() {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  enemyController.draw(ctx);
}

setInterval(game, 1000/60);