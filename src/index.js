var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;
var background = new Image();
background.src = "./src/assets/images/space.png";
function game() {
    console.log("g");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height); // TODO error
}
setInterval(game, 1000 / 60);
