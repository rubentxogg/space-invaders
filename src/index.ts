import { EnemyController } from "./enemy-controller/EnemyController.js";
import { Player } from "./player/Player.js";
import { BulletController } from "./bullet-controller/BulletController.js";

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const background = new Image(canvas.width, canvas.height);
background.src = "/src/assets/images/space.png";

const playerBulletController = new BulletController(canvas, 4, "red", true);
const enemyBulletController = new BulletController(canvas, 10, 'white', false);
const enemyController = new EnemyController(
  canvas, 
  enemyBulletController,
  playerBulletController
);
const player = new Player(canvas, 3, playerBulletController);

let isGameOver: boolean = false;
let didWin: boolean = false;

function game() {
  checkGameOver();
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  displayGameOver();
  if(!isGameOver) {
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);
  }
}

function displayGameOver(): void {
  if (isGameOver) {
    let text = didWin ? "You Win" : "Game Over";
    let textOffset = didWin ? 3.5 : 5;

    ctx.fillStyle = "white";
    ctx.font = "70px Arial";
    ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
  }
}

function checkGameOver(): void {
  if(isGameOver) {
    return;
  }

  if(enemyBulletController.collideWith(player)) {
    isGameOver = true;
  }

  if(enemyController.collideWith(player)) {
    isGameOver = true;
  }

  if(enemyController.enemyRows.length === 0) {
    didWin = true;
    isGameOver = true;
  }
}

setInterval(game, 1000/60);