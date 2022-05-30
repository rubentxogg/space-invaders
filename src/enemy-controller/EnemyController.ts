import { BulletController } from "../bullet-controller/BulletController.js";
import { Enemy } from "../enemy/enemy.js";
import MovingDirection from "../moving-direction/MovingDirection.js";

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
  public enemyRows: any = [];

  public currentDirection: number = MovingDirection.right;
  public xVelocity: number = 0;
  public yVelocity: number = 0;
  public defaultXVelocity: number = 1;
  public defaultYVelocity: number = 1;
  public moveDownTimerDefault: number = 30;
  public moveDownTimer: number = this.moveDownTimerDefault;
  public enemyBulletController: BulletController;
  public fireBulletTimerDefault: number = 100;
  public fireBulletTimer: number = this.fireBulletTimerDefault;

  constructor(canvas: HTMLCanvasElement, enemyBulletController: BulletController) {
    this.canvas = canvas;
    this.enemyBulletController = enemyBulletController;

    this.createEnemies();
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this.decrementMoveDownTimer();
    this.updateVelocityAndDirection();
    this.drawEnemies(ctx);
    this.resetMoveDownTimer();
    this.fireBullet();
  }

  public fireBullet(): void {
    this.fireBulletTimer--;

    if(this.fireBulletTimer <= 0) {
      this.fireBulletTimer = this.fireBulletTimerDefault;
      const allEnemies = this.enemyRows.flat();
      const enemyIndex = Math.floor(Math.random() * allEnemies.length);
      const enemy = allEnemies[enemyIndex];
      this.enemyBulletController.shoot(enemy.x, enemy.y, -3);
    }
  }

  public resetMoveDownTimer(): void {
    if(this.moveDownTimer <= 0) {
      this.moveDownTimer = this.moveDownTimerDefault;
    }
  }

  public decrementMoveDownTimer(): void {
    if(
      this.currentDirection === MovingDirection.downLeft ||
      this.currentDirection === MovingDirection.downRight
    ) {
      this.moveDownTimer--;
    }
  }

  public updateVelocityAndDirection(): void {
    for(const enemyRow of this.enemyRows) {
      if(this.currentDirection === MovingDirection.right) {
        this.xVelocity = this.defaultXVelocity;
        this.yVelocity = 0;

        const rightMostEnemy = enemyRow[enemyRow.length - 1];

        if(rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width) {
          this.currentDirection = MovingDirection.downLeft;
          break;
        }
      } else if(this.currentDirection === MovingDirection.downLeft) {
        if(this.moveDown(MovingDirection.left)) {
          break;
        }
      } else if(this.currentDirection === MovingDirection.left) {
        this.xVelocity = -this.defaultXVelocity;
        this.yVelocity = 0;
        
        const leftMostEnemy = enemyRow[0];
        
        if(leftMostEnemy.x <= 0) {
          this.currentDirection = MovingDirection.downRight;
          break;
        }
      } else if(this.currentDirection === MovingDirection.downRight) {
        if(this.moveDown(MovingDirection.right)) {
          break;
        }
      }
    }
  }

  public moveDown(newDirection): boolean {
    this.xVelocity = 0;
    this.yVelocity = this.defaultYVelocity;

    if(this.moveDownTimer <= 0) {
      this.currentDirection = newDirection;
      return true;
    }
    return false;
  }

  public drawEnemies(ctx: CanvasRenderingContext2D): void {
    this.enemyRows.flat().forEach((enemy: Enemy) => {
      enemy.move(this.xVelocity, this.yVelocity);
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
    });
  }
} 