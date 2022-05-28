import { Enemy } from "../enemy/enemy.js";

export class EnemyController {
  public canvas: HTMLCanvasElement;
  public enemyMap: number[][] = [
    [0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
    [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  ];
  public enemyRows = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.createEnemies();
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.drawEnemies(ctx);
  }

  public drawEnemies(ctx: CanvasRenderingContext2D): void {
    this.enemyRows.flat().forEach((enemy: Enemy) => {
      enemy.draw(ctx);
    });
  }

  public createEnemies(): void {
    this.enemyMap.forEach((row, rowIndex) => {
      this.enemyRows[rowIndex] = [];
      row.forEach((enemyNumber, enemyIndex) => {
        if(enemyNumber > 0) {
          this.enemyRows[rowIndex].push(new Enemy(enemyIndex * 50, rowIndex * 35, enemyNumber));
        }
      });
    })
  }
} 