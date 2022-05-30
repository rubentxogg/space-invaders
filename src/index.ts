import { EnemyController } from "./enemy-controller/EnemyController.js";
import { Player } from "./player/Player.js";
import { BulletController } from "./bullet-controller/BulletController.js";

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const background = new Image(canvas.width, canvas.height);
background.src = "/src/assets/images/space.png";

const playerBulletController = new BulletController(canvas, 10, "red", true);
const enemyController = new EnemyController(canvas);
const player = new Player(canvas, 3, playerBulletController);

function game() {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  enemyController.draw(ctx);
  player.draw(ctx);
  playerBulletController.draw(ctx);
}

setInterval(game, 1000/60);