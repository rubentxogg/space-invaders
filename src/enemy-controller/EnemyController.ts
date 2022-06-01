import { BulletController } from "../bullet-controller/BulletController.js";
import { Enemy } from "../enemy/enemy.js";
import MovingDirection from "../moving-direction/MovingDirection.js";
import { Player } from "../player/Player.js";

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
  public fireBulletTimerDefault: number = 50;
  public fireBulletTimer: number = this.fireBulletTimerDefault;
  public playerBulletController: BulletController;
  public enemyDeathSound: HTMLAudioElement;

  constructor(
    canvas: HTMLCanvasElement,
    enemyBulletController: BulletController,
    playerBulletController: BulletController
  ) {
    this.canvas = canvas;
    this.enemyBulletController = enemyBulletController;
    this.playerBulletController = playerBulletController;

    this.enemyDeathSound = new Audio("/src/assets/sounds/enemy-death.wav");
    this.enemyDeathSound.volume = 0.1;

    this.createEnemies();
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this.decrementMoveDownTimer();
    this.updateVelocityAndDirection();
    this.collisionDetection();
    this.drawEnemies(ctx);
    this.resetMoveDownTimer();
    this.fireBullet();
  }

  public collisionDetection(): void {
    this.enemyRows.forEach((enemyRow) => {
      enemyRow.forEach((enemy, enemyIndex) => {
        if (this.playerBulletController.collideWith(enemy)) {
          this.enemyDeathSound.currentTime = 0;
          this.enemyDeathSound.play();
          enemyRow.splice(enemyIndex, 1);
        }
      });
    });

    this.enemyRows = this.enemyRows.filter((enemyRow) => enemyRow.length > 0);
  }

  public fireBullet(): void {
    this.fireBulletTimer--;

    if (this.fireBulletTimer <= 0) {
      this.fireBulletTimer = this.fireBulletTimerDefault;
      const allEnemies = this.enemyRows.flat();
      const enemyIndex = Math.floor(Math.random() * allEnemies.length);
      const enemy = allEnemies[enemyIndex];
      this.enemyBulletController.shoot(enemy.x, enemy.y, -5);
    }
  }

  public resetMoveDownTimer(): void {
    if (this.moveDownTimer <= 0) {
      this.moveDownTimer = this.moveDownTimerDefault;
    }
  }

  public decrementMoveDownTimer(): void {
    if (
      this.currentDirection === MovingDirection.downLeft ||
      this.currentDirection === MovingDirection.downRight
    ) {
      this.moveDownTimer--;
    }
  }

  public updateVelocityAndDirection(): void {
    for (const enemyRow of this.enemyRows) {
      if (this.currentDirection === MovingDirection.right) {
        this.xVelocity = this.defaultXVelocity;
        this.yVelocity = 0;

        const rightMostEnemy = enemyRow[enemyRow.length - 1];

        if (rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width) {
          this.currentDirection = MovingDirection.downLeft;
          break;
        }
      } else if (this.currentDirection === MovingDirection.downLeft) {
        if (this.moveDown(MovingDirection.left)) {
          break;
        }
      } else if (this.currentDirection === MovingDirection.left) {
        this.xVelocity = -this.defaultXVelocity;
        this.yVelocity = 0;

        const leftMostEnemy = enemyRow[0];

        if (leftMostEnemy.x <= 0) {
          this.currentDirection = MovingDirection.downRight;
          break;
        }
      } else if (this.currentDirection === MovingDirection.downRight) {
        if (this.moveDown(MovingDirection.right)) {
          break;
        }
      }
    }
  }

  public moveDown(newDirection: number): boolean {
    this.xVelocity = 0;
    this.yVelocity = this.defaultYVelocity;

    if (this.moveDownTimer <= 0) {
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
        if (enemyNumber > 0) {
          this.enemyRows[rowIndex].push(
            new Enemy(enemyIndex * 50, rowIndex * 35, enemyNumber)
          );
        }
      });
    });
  }

  public collideWith(sprite: Player) {
    return this.enemyRows.flat().some((enemy) => enemy.collideWith(sprite));
  }
}
