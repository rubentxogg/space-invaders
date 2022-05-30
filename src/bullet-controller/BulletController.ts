import { Bullet } from "../bullet/Bullet.js";

export class BulletController {
  public canvas: HTMLCanvasElement;
  public maxBulletsAtTime: number;
  public bulletColor: string;
  public soundEnabled: boolean;
  public shootSound: HTMLAudioElement;

  public bullets: Bullet[] = [];
  public timeTillNextBulletAllowed: number = 0;

  constructor(canvas: HTMLCanvasElement, maxBulletsAtTime: number, bulletColor: string, soundEnabled: boolean) {
    this.canvas = canvas;
    this.maxBulletsAtTime = maxBulletsAtTime;
    this.bulletColor = bulletColor;

    this.soundEnabled = soundEnabled;
    this.shootSound = new Audio("/src/assets/sounds/shoot.wav");
    this.shootSound.volume = 0.5;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this.bullets = this.bullets.filter(
      (bullet) => bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height
    );
    this.bullets.forEach((bullet) => bullet.draw(ctx))

    if(this.timeTillNextBulletAllowed > 0) {
      this.timeTillNextBulletAllowed--;
    }
  }

  public shoot(x: number, y: number, velocity: number, timeTillNextBulletAllowed: number = 0): void {
    if(
      this.timeTillNextBulletAllowed <= 0 && 
      this.bullets.length < this.maxBulletsAtTime
    ) {
      const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor);
      this.bullets.push(bullet);
      
      if(this.soundEnabled) {
        this.shootSound.currentTime = 0;
        this.shootSound.play();
      }

      this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
    }
  }
}