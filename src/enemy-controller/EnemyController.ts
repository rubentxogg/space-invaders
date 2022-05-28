export class EnemyController {
  public canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    console.log("Enemy Controller class");
  }
} 