/**
 * Laser trail persistence lives in this module (not AppState) so we do not need
 * to extend protected core types; React views subscribe via
 * subscribeLaserPersistence / useSyncExternalStore.
 */
export type LaserTrailPersistenceMode = "temporary" | "persistent";

type AppWithLaserTrails = {
  laserTrails: { clearLocalTrails: () => void };
};

let mode: LaserTrailPersistenceMode = "temporary";

const listeners = new Set<() => void>();
let uiVersion = 0;

export const subscribeLaserPersistence = (onStoreChange: () => void) => {
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
};

export const getLaserPersistenceVersion = () => uiVersion;

export const bumpLaserPersistenceUi = () => {
  uiVersion += 1;
  listeners.forEach((l) => l());
};

export const getLaserTrailPersistenceMode = (): LaserTrailPersistenceMode =>
  mode;

export const setLaserTrailPersistenceMode = (
  next: LaserTrailPersistenceMode,
  opts?: { app?: AppWithLaserTrails },
) => {
  const prev = mode;
  if (prev === next) {
    return;
  }
  mode = next;
  if (prev === "persistent" && next === "temporary" && opts?.app) {
    opts.app.laserTrails.clearLocalTrails();
  } else {
    bumpLaserPersistenceUi();
  }
};

export const clearPersistentLaserMarks = (app: AppWithLaserTrails) => {
  app.laserTrails.clearLocalTrails();
};

export const resetLaserPersistenceForNewScene = (app: AppWithLaserTrails) => {
  mode = "temporary";
  app.laserTrails.clearLocalTrails();
};
