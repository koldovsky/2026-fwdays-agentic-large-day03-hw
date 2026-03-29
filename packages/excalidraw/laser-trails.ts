import { DEFAULT_LASER_COLOR, easeOut } from "@excalidraw/common";

import type { LaserPointerOptions } from "@excalidraw/laser-pointer";

import { AnimatedTrail } from "./animated-trail";
import {
  bumpLaserPersistenceUi,
  getLaserTrailPersistenceMode,
} from "./laser-persistence";
import { getClientColor } from "./clients";

import type { Trail } from "./animated-trail";
import type { AnimationFrameHandler } from "./animation-frame-handler";
import type App from "./components/App";
import type { SocketId } from "./types";

/** Time window (ms) over which temporary laser stroke width decays. */
const TRAIL_DECAY_TIME_MS = 1000;
/** Path length (px) over which temporary laser stroke width decays along the trail. */
const TRAIL_DECAY_LENGTH_PX = 50;
/** Persistence mode value when laser strokes do not time-decay locally. */
const TRAIL_LIFETIME_PERSISTENT = "persistent";

export class LaserTrails implements Trail {
  public localTrail: AnimatedTrail;
  private collabTrails = new Map<SocketId, AnimatedTrail>();

  private container?: SVGSVGElement;

  constructor(
    private animationFrameHandler: AnimationFrameHandler,
    private app: App,
  ) {
    this.animationFrameHandler.register(this, this.onFrame.bind(this));

    this.localTrail = new AnimatedTrail(animationFrameHandler, app, {
      ...this.getLocalTrailOptions(),
      fill: () => DEFAULT_LASER_COLOR,
    });
  }

  private getCollaboratorTrailOptions() {
    return {
      simplify: 0,
      streamline: 0.4,
      sizeMapping: (c) => {
        const t = Math.max(
          0,
          1 - (performance.now() - c.pressure) / TRAIL_DECAY_TIME_MS,
        );
        const l =
          (TRAIL_DECAY_LENGTH_PX -
            Math.min(TRAIL_DECAY_LENGTH_PX, c.totalLength - c.currentIndex)) /
          TRAIL_DECAY_LENGTH_PX;

        return Math.min(easeOut(l), easeOut(t));
      },
    } as Partial<LaserPointerOptions>;
  }

  private getLocalTrailOptions() {
    return {
      simplify: 0,
      streamline: 0.4,
      sizeMapping: (c) => {
        if (getLaserTrailPersistenceMode() === TRAIL_LIFETIME_PERSISTENT) {
          return 1;
        }
        const t = Math.max(
          0,
          1 - (performance.now() - c.pressure) / TRAIL_DECAY_TIME_MS,
        );
        const l =
          (TRAIL_DECAY_LENGTH_PX -
            Math.min(TRAIL_DECAY_LENGTH_PX, c.totalLength - c.currentIndex)) /
          TRAIL_DECAY_LENGTH_PX;

        return Math.min(easeOut(l), easeOut(t));
      },
    } as Partial<LaserPointerOptions>;
  }

  clearLocalTrails() {
    this.localTrail.clearTrails();
  }

  hasLocalContent() {
    return this.localTrail.hasContent();
  }

  startPath(x: number, y: number): void {
    this.localTrail.startPath(x, y);
    if (getLaserTrailPersistenceMode() === TRAIL_LIFETIME_PERSISTENT) {
      bumpLaserPersistenceUi();
    }
  }

  addPointToPath(x: number, y: number): void {
    this.localTrail.addPointToPath(x, y);
  }

  endPath(): void {
    this.localTrail.endPath();
    if (getLaserTrailPersistenceMode() === TRAIL_LIFETIME_PERSISTENT) {
      bumpLaserPersistenceUi();
    }
  }

  start(container: SVGSVGElement) {
    this.container = container;

    this.animationFrameHandler.start(this);
    this.localTrail.start(container);
  }

  stop() {
    this.animationFrameHandler.stop(this);
    this.localTrail.stop();
  }

  onFrame() {
    this.updateCollabTrails();
  }

  private updateCollabTrails() {
    if (!this.container || this.app.state.collaborators.size === 0) {
      return;
    }

    for (const [key, collaborator] of this.app.state.collaborators.entries()) {
      let trail!: AnimatedTrail;

      if (!this.collabTrails.has(key)) {
        trail = new AnimatedTrail(this.animationFrameHandler, this.app, {
          ...this.getCollaboratorTrailOptions(),
          fill: () =>
            collaborator.pointer?.laserColor ||
            getClientColor(key, collaborator),
        });
        trail.start(this.container);

        this.collabTrails.set(key, trail);
      } else {
        trail = this.collabTrails.get(key)!;
      }

      if (collaborator.pointer && collaborator.pointer.tool === "laser") {
        if (collaborator.button === "down" && !trail.hasCurrentTrail) {
          trail.startPath(collaborator.pointer.x, collaborator.pointer.y);
        }

        if (
          collaborator.button === "down" &&
          trail.hasCurrentTrail &&
          !trail.hasLastPoint(collaborator.pointer.x, collaborator.pointer.y)
        ) {
          trail.addPointToPath(collaborator.pointer.x, collaborator.pointer.y);
        }

        if (collaborator.button === "up" && trail.hasCurrentTrail) {
          trail.addPointToPath(collaborator.pointer.x, collaborator.pointer.y);
          trail.endPath();
        }
      }
    }

    for (const key of this.collabTrails.keys()) {
      if (!this.app.state.collaborators.has(key)) {
        const trail = this.collabTrails.get(key)!;
        trail.stop();
        this.collabTrails.delete(key);
      }
    }
  }
}
