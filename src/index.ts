const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
const background = new Image();

canvas.width = 600;
canvas.height = 600;

background.src = "./assets/images/space.png";

function game() {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}

setInterval(game, 1000/60);