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

  constructor(canvas: HTMLCanvasElement, velocity: number) {
    this.canvas = canvas;
    this.velocity = velocity;

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
    this.move();
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
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
  }

  public keyup = (event: { code: string; }): void => {
    if(event.code === 'ArrowRight') {
      this.rightPressed = false;
    }

    if(event.code === 'ArrowLeft') {
      this.leftPressed = false;
    }
  }
}