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
}