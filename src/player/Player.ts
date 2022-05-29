export class Player {
  public canvas: HTMLCanvasElement;
  public velocity: number;
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public image: HTMLImageElement;

  constructor(canvas: HTMLCanvasElement, velocity: number) {
    this.canvas = canvas;
    this.velocity = velocity;

    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 75;
    this.width = 50;
    this.height = 48;
    this.image = new Image();
    this.image.src = "/src/assets/images/player.png";
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}