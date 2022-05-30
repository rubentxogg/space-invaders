export class Bullet {
  public canvas: HTMLCanvasElement;
  public x: number;
  public y: number;
  public velocity: number;
  public bulletColor: string;

  public width: number;
  public height: number;

  constructor(canvas: HTMLCanvasElement, x: number, y: number, velocity: number, bulletColor: string) {
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.bulletColor = bulletColor;

    this.width = 5;
    this.height = 20;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this.y -= this.velocity;
    ctx.fillStyle = this.bulletColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  public collideWith(sprite): boolean {
    if(
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