import { BulletController } from "../bullet-controller/BulletController.js";

export class Player {
  public canvas: HTMLCanvasElement;
  public velocity: number;
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public image: HTMLImageElement;
  public rightPressed: boolean = false;
  public leftPressed: boolean = false;
  public shootPressed: boolean = false;
  public bulletController: BulletController;

  constructor(canvas: HTMLCanvasElement, velocity: number, bulletController: BulletController) {
    this.canvas = canvas;
    this.velocity = velocity;
    this.bulletController = bulletController;

    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 75;
    this.width = 50;
    this.height = 48;
    this.image = new Image();
    this.image.src = "/src/assets/images/player.png";

    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    if (this.shootPressed) {
      this.bulletController.shoot(this.x + this.width / 2, this.y, 4, 20);
    }

    this.move();
    this.collideWithWalls();
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  public collideWithWalls(): void {
    if(this.x < 0) {
      this.x = 0;
    }

    if(this.x > this.canvas.width -this.width) {
      this.x = this.canvas.width - this.width;
    }
  }

  public move(): void {
    if(this.rightPressed) {
      this.x += this.velocity;
    } else if(this.leftPressed) {
      this.x += -this.velocity;
    }
  }

  public keydown = (event: { code: string; }): void => {
    if(event.code === 'ArrowRight') {
      this.rightPressed = true;
    }

    if(event.code === 'ArrowLeft') {
      this.leftPressed = true;
    }

    if(event.code === "Space") {
      this.shootPressed = true;
    }
  }

  public keyup = (event: { code: string; }): void => {
    if(event.code === 'ArrowRight') {
      this.rightPressed = false;
    }

    if(event.code === 'ArrowLeft') {
      this.leftPressed = false;
    }

    if(event.code === "Space") {
      this.shootPressed = false;
    }
  }
}