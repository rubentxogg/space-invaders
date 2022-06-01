import { Player } from "../player/Player.js";

export class Enemy {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public image: HTMLImageElement;

  constructor(x: number, y: number, imageNumber: number) {
    this.x = x;
    this.y = y;
    this.width = 44;
    this.height = 32;

    this.image = new Image();
    this.image.src = `/src/assets/images/enemy${imageNumber}.png`;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  public move(xVelocity: number, yVelocity: number): void {
    this.x += xVelocity;
    this.y += yVelocity;
  }

  public collideWith(sprite: Player): boolean {
    if (
      this.x + this.width > sprite.x &&
      this.x < sprite.x + sprite.width &&
      this.y + this.height > sprite.y &&
      this.y < sprite.y + sprite.height
    ) {
      return true;
    } else {
      return false;
    }
  }
}