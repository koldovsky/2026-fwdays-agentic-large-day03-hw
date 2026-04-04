import { KEYS } from "@excalidraw/common";

// Animation constants — all values are per-second for frame-rate independence
const MAX_VELOCITY = 1200; // px/s
const ACCELERATION = 5500; // px/s² — reaches max in ~220ms
const FRICTION = 0.0005; // exponential decay base (per ms); velocity *= FRICTION^dt
const DEAD_ZONE = 5; // px/s — stop loop when velocity is below this

type ScrollUpdateCallback = (dx: number, dy: number) => void;

export class KeyboardPanEngine {
  private pressedKeys: Set<string> = new Set();
  private velocityX = 0;
  private velocityY = 0;
  private rafId: number | null = null;
  private lastFrameTime: number | null = null;
  private onScrollUpdate: ScrollUpdateCallback;

  constructor(onScrollUpdate: ScrollUpdateCallback) {
    this.onScrollUpdate = onScrollUpdate;
  }

  pressKey(key: string): void {
    if (!this.isArrowKey(key)) {
      return;
    }
    this.pressedKeys.add(key);
    this.startLoop();
  }

  releaseKey(key: string): void {
    this.pressedKeys.delete(key);
  }

  clearKeys(): void {
    this.pressedKeys.clear();
  }

  destroy(): void {
    this.clearKeys();
    this.stopLoop();
    this.velocityX = 0;
    this.velocityY = 0;
  }

  private isArrowKey(key: string): boolean {
    return (
      key === KEYS.ARROW_LEFT ||
      key === KEYS.ARROW_RIGHT ||
      key === KEYS.ARROW_UP ||
      key === KEYS.ARROW_DOWN
    );
  }

  private getDirectionX(): number {
    let dx = 0;
    if (this.pressedKeys.has(KEYS.ARROW_LEFT)) {
      dx += 1; // scrollX increases = viewport moves left
    }
    if (this.pressedKeys.has(KEYS.ARROW_RIGHT)) {
      dx -= 1; // scrollX decreases = viewport moves right
    }
    return dx;
  }

  private getDirectionY(): number {
    let dy = 0;
    if (this.pressedKeys.has(KEYS.ARROW_UP)) {
      dy += 1; // scrollY increases = viewport moves up
    }
    if (this.pressedKeys.has(KEYS.ARROW_DOWN)) {
      dy -= 1; // scrollY decreases = viewport moves down
    }
    return dy;
  }

  private startLoop(): void {
    if (this.rafId !== null) {
      return;
    }
    this.lastFrameTime = performance.now();
    this.rafId = requestAnimationFrame(this.tick);
  }

  private stopLoop(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.lastFrameTime = null;
  }

  private tick = (now: number): void => {
    const dt = this.lastFrameTime !== null ? (now - this.lastFrameTime) / 1000 : 0; // seconds
    this.lastFrameTime = now;

    const dirX = this.getDirectionX();
    const dirY = this.getDirectionY();

    const hasKeysPressed = this.pressedKeys.size > 0;

    // Apply acceleration when keys are pressed
    if (dirX !== 0) {
      this.velocityX += dirX * ACCELERATION * dt;
    }
    if (dirY !== 0) {
      this.velocityY += dirY * ACCELERATION * dt;
    }

    // Apply friction (exponential decay) — always applied
    // friction = FRICTION^(dt*1000) since FRICTION is per-ms
    const frictionFactor = Math.pow(FRICTION, dt);
    this.velocityX *= frictionFactor;
    this.velocityY *= frictionFactor;

    // Clamp velocity to max
    const speed = Math.sqrt(
      this.velocityX * this.velocityX + this.velocityY * this.velocityY,
    );
    if (speed > MAX_VELOCITY) {
      const scale = MAX_VELOCITY / speed;
      this.velocityX *= scale;
      this.velocityY *= scale;
    }

    // Compute displacement this frame
    const dx = this.velocityX * dt;
    const dy = this.velocityY * dt;

    if (dx !== 0 || dy !== 0) {
      this.onScrollUpdate(dx, dy);
    }

    // Check if we should keep the loop running
    const currentSpeed = Math.sqrt(
      this.velocityX * this.velocityX + this.velocityY * this.velocityY,
    );
    if (!hasKeysPressed && currentSpeed < DEAD_ZONE) {
      this.velocityX = 0;
      this.velocityY = 0;
      this.stopLoop();
      return;
    }

    this.rafId = requestAnimationFrame(this.tick);
  };
}
